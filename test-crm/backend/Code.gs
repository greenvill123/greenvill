/**
 * Greenvill CRM — Google Apps Script Backend (Auto-Setup Edition)
 *
 * FEATURES:
 * - AUTO-CREATES all required tabs: Users, Customers, Loans, Banks, FollowUps, Documents, ActivityLog, Settings
 * - AUTO-INSERTS column headers and formatting
 * - AUTO-SEEDS initial admin login user (admin / admin123) & default settings
 * - Seamlessly interfaces with Greenvill CRM frontend
 *
 * SETUP:
 * 1. Open your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste this entire file into Code.gs.
 * 3. (Optional) Run the `setupDatabase()` function once manually if you want to inspect your Sheet tabs right away.
 * 4. Deploy -> New deployment -> Select type: "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL and paste it into assets/js/config.js -> APPS_SCRIPT_URL.
 */

// Optional: Paste Sheet ID below ONLY if script is not created directly inside Google Sheet (Extensions > Apps Script)
const SHEET_ID = '';

const SCHEMA = {
  Users: {
    headers: ['UserID', 'Username', 'Password', 'Name', 'Role', 'Status', 'LastLogin'],
    initialData: [
      ['USR-001', 'admin', 'admin123', 'Govindhasamy K', 'admin', 'Active', ''],
      ['USR-002', 'manager', 'manager123', 'Priya R', 'manager', 'Active', ''],
      ['USR-003', 'agent', 'agent123', 'Suresh M', 'agent', 'Active', '']
    ]
  },
  Customers: {
    headers: ['CustomerID', 'Name', 'Phone', 'Email', 'City', 'State', 'Pincode', 'Source', 'Status', 'AssignedAgent', 'Notes', 'CreatedDate'],
    initialData: []
  },
  Loans: {
    headers: ['LoanID', 'CustomerID', 'LoanType', 'BankID', 'LoanAmount', 'TenureMonths', 'InterestRate', 'Status', 'Stage', 'AssignedAgent', 'Notes', 'CreatedDate'],
    initialData: []
  },
  Banks: {
    headers: ['BankID', 'BankName', 'Code', 'Commission', 'ContactPerson', 'Phone', 'Email', 'Status'],
    initialData: [
      ['BNK-001', 'HDFC Bank', 'HDFC', '1.50', 'Rajesh Kumar', '9876543210', 'hdfc@greenvill.com', 'Active'],
      ['BNK-002', 'ICICI Bank', 'ICICI', '1.25', 'Priya Sharma', '9876543211', 'icici@greenvill.com', 'Active'],
      ['BNK-003', 'State Bank of India', 'SBI', '1.00', 'Venkatesh Iyer', '9876543212', 'sbi@greenvill.com', 'Active']
    ]
  },
  FollowUps: {
    headers: ['FollowupID', 'CustomerID', 'LoanID', 'AssignedAgent', 'NextDate', 'Notes', 'Status', 'CreatedDate'],
    initialData: []
  },
  ActivityLog: {
    headers: ['Timestamp', 'Actor', 'Action'],
    initialData: []
  },
  Settings: {
    headers: ['companyName', 'theme', 'backupEnabled', 'loanTypes'],
    initialData: [
      ['Greenvill Associates', 'green', 'true', JSON.stringify(['Business Loan','Home Loan','Personal Loan','Education Loan','Gold Loan','Vehicle Loan'])]
    ]
  }
};

/**
 * Automatically creates all tabs, headers, and default data if they don't exist.
 */
function setupDatabase() {
  const ss = getSpreadsheet();
  if (!ss) {
    throw new Error('Spreadsheet not found. Please run this script inside Google Sheet (Extensions > Apps Script) or set SHEET_ID.');
  }

  Object.keys(SCHEMA).forEach(function(tabName) {
    let sh = ss.getSheetByName(tabName);
    const tabConfig = SCHEMA[tabName];

    if (!sh) {
      sh = ss.insertSheet(tabName);
    }

    if (sh.getLastRow() < 1) {
      // Add Headers
      sh.appendRow(tabConfig.headers);
      
      // Style Header Row
      const headerRange = sh.getRange(1, 1, 1, tabConfig.headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#E2E8F0');

      // Add Seed Rows
      if (tabConfig.initialData && tabConfig.initialData.length > 0) {
        tabConfig.initialData.forEach(function(row) {
          sh.appendRow(row);
        });
      }
    }
  });

  // Ensure default demo users (admin, manager, agent) exist in Users sheet
  const usersSheet = ss.getSheetByName('Users');
  if (usersSheet && usersSheet.getLastRow() >= 1) {
    const existingUsers = usersSheet.getDataRange().getValues();
    const usernames = existingUsers.slice(1).map(function(r) { return String(r[1]).toLowerCase().trim(); });
    
    SCHEMA.Users.initialData.forEach(function(u) {
      if (!usernames.includes(String(u[1]).toLowerCase().trim())) {
        usersSheet.appendRow(u);
      }
    });
  }

  // Clean up default Sheet1 if database tabs are created
  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && ss.getSheets().length > 1) {
    try { ss.deleteSheet(sheet1); } catch(e) {}
  }
  
  return 'Database setup complete! All tabs, headers, and users (admin, manager, agent) are ready.';
}

function doGet(e){
  try {
    setupDatabase();
    return ContentService.createTextOutput(JSON.stringify({
      status: "online",
      message: "Greenvill CRM Database is online and ready."
    })).setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: err.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e){
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false,
      error: "doPost must be triggered by a web application POST request. To test/setup in the editor, select 'setupDatabase' from the top dropdown and click Run."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  const body = JSON.parse(e.postData.contents);
  const { path, payload } = body;
  let result;
  try{
    setupDatabase(); // Auto-check & auto-create missing tabs on every request
    result = route(path, payload || {});
  } catch(err){
    result = { ok:false, error: err.message };
  }
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function route(path, payload){
  switch(path){
    case '/login': return login(payload);
    case '/customers': return { ok:true, data: readSheet('Customers') };
    case '/customer/create': return { ok:true, data: appendRow('Customers', 'CustomerID', 'CUS', payload) };
    case '/customer/update': return { ok:true, data: updateRow('Customers', 'CustomerID', payload) };
    case '/customer/delete': deleteRow('Customers','CustomerID', payload.CustomerID); return { ok:true };

    case '/loans': return { ok:true, data: readSheet('Loans') };
    case '/loan/create': return { ok:true, data: appendRow('Loans','LoanID','LN', payload) };
    case '/loan/update': return { ok:true, data: updateRow('Loans','LoanID', payload) };
    case '/loan/delete': deleteRow('Loans','LoanID', payload.LoanID); return { ok:true };

    case '/banks': return { ok:true, data: readSheet('Banks') };
    case '/bank/create': return { ok:true, data: appendRow('Banks','BankID','BNK', payload) };
    case '/bank/update': return { ok:true, data: updateRow('Banks','BankID', payload) };
    case '/bank/delete': deleteRow('Banks','BankID', payload.BankID); return { ok:true };

    case '/followups': return { ok:true, data: readSheet('FollowUps') };
    case '/followup/create': return { ok:true, data: appendRow('FollowUps','FollowupID','FU', payload) };
    case '/followup/update': return { ok:true, data: updateRow('FollowUps','FollowupID', payload) };
    case '/followup/delete': deleteRow('FollowUps','FollowupID', payload.FollowupID); return { ok:true };

    case '/dashboard': return { ok:true, data: buildDashboard() };
    case '/reports': return { ok:true, data: buildReports(payload) };
    case '/activitylog': return { ok:true, data: readSheet('ActivityLog') };

    case '/settings/get': return { ok:true, data: readSettings() };
    case '/settings/update': return { ok:true, data: writeSettings(payload) };
    case '/users': return { ok:true, data: readSheet('Users') };

    default: return { ok:false, error:'Unknown endpoint ' + path };
  }
}

// ---- Database Helpers ----
function getSpreadsheet(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss && SHEET_ID) {
    try { ss = SpreadsheetApp.openById(SHEET_ID); } catch(e) {}
  }
  return ss;
}

function sheet(name){
  const ss = getSpreadsheet();
  if (!ss) {
    throw new Error('Cannot access Google Sheet. Make sure Apps Script was opened via Extensions > Apps Script inside your sheet.');
  }
  const sh = ss.getSheetByName(name);
  if (!sh) {
    throw new Error('Tab "' + name + '" not found in Google Sheet.');
  }
  return sh;
}

function readSheet(name){
  const sh = sheet(name);
  if (sh.getLastRow() < 1) return [];
  const [headers, ...rows] = sh.getDataRange().getValues();
  if (!headers || headers.length === 0) return [];
  return rows.filter(r => r.some(cell => cell !== '')).map(r => Object.fromEntries(headers.map((h,i)=>[h, r[i]])));
}

function appendRow(name, idField, prefix, payload){
  const sh = sheet(name);
  const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  const id = prefix + '-' + Utilities.getUuid().slice(0,8).toUpperCase();
  const row = { [idField]: id, ...payload };
  sh.appendRow(headers.map(h => row[h] ?? ''));
  return row;
}

function updateRow(name, idField, payload){
  const sh = sheet(name);
  const [headers, ...rows] = sh.getDataRange().getValues();
  const idCol = headers.indexOf(idField);
  const rowIdx = rows.findIndex(r => r[idCol] === payload[idField]);
  if(rowIdx === -1) return null;
  const merged = { ...Object.fromEntries(headers.map((h,i)=>[h, rows[rowIdx][i]])), ...payload };
  sh.getRange(rowIdx+2, 1, 1, headers.length).setValues([headers.map(h => merged[h] ?? '')]);
  return merged;
}

function deleteRow(name, idField, id){
  const sh = sheet(name);
  const data = sh.getDataRange().getValues();
  const idCol = data[0].indexOf(idField);
  for(let i=data.length-1;i>=1;i--){
    if(data[i][idCol] === id){ sh.deleteRow(i+1); break; }
  }
}

function login(payload){
  const users = readSheet('Users');
  const inputUser = String(payload.username || '').trim().toLowerCase();
  const inputPass = String(payload.password || '').trim();
  
  const u = users.find(function(x) {
    return String(x.Username || '').trim().toLowerCase() === inputUser && 
           String(x.Password || '').trim() === inputPass && 
           String(x.Status || '').trim().toLowerCase() === 'active';
  });
  if(!u) return { ok:false, error:'Invalid username or password' };
  return { ok:true, user:{ id:u.UserID, username:u.Username, name:u.Name, role:String(u.Role).toLowerCase() } };
}

function readSettings(){
  const sh = sheet('Settings');
  if (sh.getLastRow() < 2) {
    return {
      companyName: 'Greenvill Associates', theme: 'green', backupEnabled: true,
      loanTypes: ['Business Loan','Home Loan','Personal Loan','Education Loan','Gold Loan','Vehicle Loan']
    };
  }
  const [headers, row] = sh.getDataRange().getValues();
  const obj = Object.fromEntries(headers.map((h,i)=>[h, row[i]]));
  if (obj.loanTypes) {
    if (typeof obj.loanTypes === 'string') {
      try { obj.loanTypes = JSON.parse(obj.loanTypes); }
      catch(e) { obj.loanTypes = obj.loanTypes.split(',').map(s=>s.trim()); }
    }
  }
  if (!Array.isArray(obj.loanTypes) || obj.loanTypes.length === 0) {
    obj.loanTypes = ['Business Loan','Home Loan','Personal Loan','Education Loan','Gold Loan','Vehicle Loan'];
  }
  return obj;
}

function writeSettings(payload){
  const sh = sheet('Settings');
  const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  const current = readSettings();
  const merged = { ...current, ...payload };
  const prepareSave = { ...merged };
  if (Array.isArray(prepareSave.loanTypes)) {
    prepareSave.loanTypes = JSON.stringify(prepareSave.loanTypes);
  }
  sh.getRange(2,1,1,headers.length).setValues([headers.map(h => prepareSave[h] ?? '')]);
  return merged;
}

function buildDashboard(){
  const customers = readSheet('Customers');
  const loans = readSheet('Loans');
  const followups = readSheet('FollowUps');
  const banks = readSheet('Banks');

  const today = (new Date()).toISOString().slice(0,10);
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
    if(!l.CreatedDate) return;
    const d = new Date(l.CreatedDate);
    const key = d.toLocaleDateString('en-IN',{month:'short'});
    if(key in monthly) monthly[key]++;
  });

  const statusCount = { 
    Approved: approved.length, 
    Pending: loans.filter(l=>l.Status==='Pending').length, 
    Rejected: rejected.length 
  };

  const bankWise = banks.map(b=>({
    name: b.BankName || b.BankID,
    count: loans.filter(l=>l.BankID===b.BankID).length,
  }));

  const agentPerf = {};
  loans.forEach(l=>{ 
    if(l.AssignedAgent){
      agentPerf[l.AssignedAgent] = (agentPerf[l.AssignedAgent]||0)+1; 
    }
  });

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

function buildReports(payload){
  const loans = readSheet('Loans');
  const banks = readSheet('Banks');
  return loans.map(l=>({
    LoanID: l.LoanID, CustomerID: l.CustomerID, LoanType: l.LoanType,
    Bank: banks.find(b=>b.BankID===l.BankID)?.BankName || l.BankID,
    Amount: l.LoanAmount, Status: l.Status, Stage: l.Stage,
    Agent: l.AssignedAgent, Date: l.CreatedDate,
  }));
}
