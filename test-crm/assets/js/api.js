/**
 * Greenvill CRM — API layer
 * Every function here maps 1:1 to an endpoint in the PRD's API Design section
 * (/customers, /loan/create, /banks, /dashboard, etc).
 *
 * MODE="mock"        -> reads/writes Store (localStorage), resolves instantly.
 * MODE="apps-script"  -> POSTs { path, payload } to your deployed Web App URL.
 * Callers never need to know which mode is active.
 */
const Api = (() => {
  const DEFAULT_CONFIG = {
    MODE: "apps-script",
    APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbzrO4Hr02vJXXDsi6pQYD8SdEwGfqMXHMEU0t5-jbAUT7cGuptr5DyUL0Cm6Q1hdpc2/exec",
    APP_NAME: "Greenvill CRM",
    COMPANY: "Greenvill Associates",
    CURRENCY: "INR",
  };

  function getConfig() {
    return window.GREENVILL_CONFIG || DEFAULT_CONFIG;
  }

  async function callAppsScript(path, payload){
    const cfg = getConfig();
    const res = await fetch(cfg.APPS_SCRIPT_URL, {
      method:'POST',
      headers:{ 'Content-Type':'text/plain;charset=utf-8' }, // avoids CORS preflight on Apps Script
      body: JSON.stringify({ path, payload, token: Session.token() }),
    });
    if(!res.ok) throw new Error(`API error: ${res.status}`);
    const json = await res.json();
    if(json && json.ok === false) {
      throw new Error(json.error || 'Server error');
    }
    return json;
  }

  async function request(path, payload = {}){
    const cfg = getConfig();
    if(cfg.MODE === 'apps-script'){
      return callAppsScript(path, payload);
    }
    return MockBackend(path, payload);
  }

  // ---- Mock backend: simulates what Code.gs would do to the Sheets ----
  function MockBackend(path, payload){
    Store.seed();
    switch(path){
      case '/login': {
        const inputUser = String(payload.username || '').trim().toLowerCase();
        const inputPass = String(payload.password || '').trim();
        const u = Store.get('Users').find(x => 
          String(x.Username || '').trim().toLowerCase() === inputUser && 
          String(x.Password || '').trim() === inputPass && 
          String(x.Status || '').trim().toLowerCase() === 'active'
        );
        if(!u) {
          return { ok:false, error:'Invalid username or password' };
        }
        Store.update('Users','UserID', u.UserID, { LastLogin:new Date().toISOString() });
        Store.log(u.Username, 'Logged in');
        return { ok:true, user:{ id:u.UserID, username:u.Username, name:u.Name, role:String(u.Role).toLowerCase() } };
      }

      case '/customers':
        return { ok:true, data: Store.get('Customers') };

      case '/customer/create': {
        const row = { CustomerID:Utils.id('CUS'), CreatedDate:Utils.todayISO(), Status:'Active', ...payload };
        Store.insert('Customers', row);
        Store.log(payload._actor, `Added customer ${row.Name}`);
        return { ok:true, data:row };
      }
      case '/customer/update': {
        const row = Store.update('Customers','CustomerID', payload.CustomerID, payload);
        Store.log(payload._actor, `Updated customer ${payload.CustomerID}`);
        return { ok:!!row, data:row };
      }
      case '/customer/delete':
        Store.remove('Customers','CustomerID', payload.CustomerID);
        Store.log(payload._actor, `Deleted customer ${payload.CustomerID}`);
        return { ok:true };

      case '/loans':
        return { ok:true, data: Store.get('Loans') };
      case '/loan/create': {
        const row = { LoanID:Utils.id('LN'), CreatedDate:Utils.todayISO(), ...payload };
        Store.insert('Loans', row);
        Store.log(payload._actor, `Created loan ${row.LoanID}`);
        return { ok:true, data:row };
      }
      case '/loan/update': {
        const row = Store.update('Loans','LoanID', payload.LoanID, payload);
        Store.log(payload._actor, `Updated loan ${payload.LoanID}`);
        return { ok:!!row, data:row };
      }
      case '/loan/delete':
        Store.remove('Loans','LoanID', payload.LoanID);
        Store.log(payload._actor, `Deleted loan ${payload.LoanID}`);
        return { ok:true };

      case '/banks':
        return { ok:true, data: Store.get('Banks') };
      case '/bank/create': {
        const row = { BankID:Utils.id('BNK'), Status:'Active', ...payload };
        Store.insert('Banks', row);
        return { ok:true, data:row };
      }
      case '/bank/update': {
        const row = Store.update('Banks','BankID', payload.BankID, payload);
        return { ok:!!row, data:row };
      }
      case '/bank/delete':
        Store.remove('Banks','BankID', payload.BankID);
        return { ok:true };

      case '/followups':
        return { ok:true, data: Store.get('FollowUps') };
      case '/followup/create': {
        const row = { FollowupID:Utils.id('FU'), Status:'Pending', ...payload };
        Store.insert('FollowUps', row);
        return { ok:true, data:row };
      }
      case '/followup/update': {
        const row = Store.update('FollowUps','FollowupID', payload.FollowupID, payload);
        return { ok:!!row, data:row };
      }
      case '/followup/delete':
        Store.remove('FollowUps','FollowupID', payload.FollowupID);
        return { ok:true };

      case '/dashboard':
        return { ok:true, data: buildDashboard() };

      case '/reports':
        return { ok:true, data: buildReports(payload) };

      case '/settings/get':
        return { ok:true, data: Store.getSettings() };
      case '/settings/update':
        Store.setSettings(payload);
        return { ok:true, data: Store.getSettings() };

      case '/activitylog':
        return { ok:true, data: Store.get('ActivityLog') };

      default:
        return { ok:false, error:`Unknown endpoint ${path}` };
    }
  }

  function buildDashboard(){
    const customers = Store.get('Customers');
    const loans = Store.get('Loans');
    const followups = Store.get('FollowUps');
    const banks = Store.get('Banks');

    const today = Utils.todayISO();
    const approved = loans.filter(l=>l.Status==='Approved');
    const rejected = loans.filter(l=>l.Status==='Rejected');
    const active = loans.filter(l=>['Approved','Pending'].includes(l.Status));
    const completed = loans.filter(l=>l.Stage==='Disbursed');

    const commission = approved.reduce((sum,l)=>{
      const bank = banks.find(b=>b.BankID===l.BankID);
      const pct = bank ? Number(bank.Commission) : 0;
      return sum + (Number(l.LoanAmount) * pct/100);
    }, 0);

    const monthlyRevenue = completed.reduce((s,l)=>s+Number(l.LoanAmount),0) * 0.01;

    // month-wise loan counts (last 6 months incl current)
    const monthly = {};
    for(let i=5;i>=0;i--){
      const d = new Date(); d.setMonth(d.getMonth()-i);
      const key = d.toLocaleDateString('en-IN',{month:'short'});
      monthly[key] = 0;
    }
    loans.forEach(l=>{
      const d = new Date(l.CreatedDate);
      const key = d.toLocaleDateString('en-IN',{month:'short'});
      if(key in monthly) monthly[key]++;
    });

    const statusCount = { Approved:approved.length, Pending:loans.filter(l=>l.Status==='Pending').length, Rejected:rejected.length };

    const bankWise = banks.map(b=>({
      name:b.BankName,
      count: loans.filter(l=>l.BankID===b.BankID).length,
    }));

    const agentPerf = {};
    loans.forEach(l=>{ agentPerf[l.AssignedAgent] = (agentPerf[l.AssignedAgent]||0)+1; });

    return {
      cards:{
        totalCustomers: customers.length,
        todaysFollowups: followups.filter(f=>f.NextDate===today && f.Status==='Pending').length,
        approvedLoans: approved.length,
        rejectedLoans: rejected.length,
        activeLoans: active.length,
        completedLoans: completed.length,
        commissionEarned: Math.round(commission),
        monthlyRevenue: Math.round(monthlyRevenue),
      },
      charts:{ monthly, statusCount, bankWise, agentPerf },
    };
  }

  function buildReports({ range }={}){
    const loans = Store.get('Loans');
    const banks = Store.get('Banks');
    return loans.map(l=>({
      LoanID:l.LoanID, CustomerID:l.CustomerID, LoanType:l.LoanType,
      Bank: banks.find(b=>b.BankID===l.BankID)?.BankName || l.BankID,
      Amount:l.LoanAmount, Status:l.Status, Stage:l.Stage,
      Agent:l.AssignedAgent, Date:l.CreatedDate,
    }));
  }

  return { request };
})();
