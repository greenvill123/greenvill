/* Greenvill CRM — Reports */
(async function(){
  renderShell('reports', 'Reports', 'Daily, weekly, monthly and bank-wise views of the loan book');
  const content = document.getElementById('page-content');
  let rows = [], banks = [];

  content.innerHTML = `
    <div class="toolbar">
      <div class="pill-tabs" id="tabs">
        <button data-v="all" class="active">All</button>
        <button data-v="bank">Bank-wise</button>
        <button data-v="agent">Agent-wise</button>
      </div>
      <div class="spacer"></div>
      <button class="btn btn-ghost btn-sm" id="csvBtn"><i data-lucide="file-spreadsheet"></i> Export CSV</button>
      <button class="btn btn-ghost btn-sm" id="printBtn"><i data-lucide="printer"></i> Export PDF</button>
    </div>
    <div class="grid grid-cards" id="summaryCards" style="margin-bottom:18px;"></div>
    <div class="panel">
      <div class="table-wrap"><table>
        <thead><tr><th>Loan</th><th>Type</th><th>Bank</th><th>Amount</th><th>Status</th><th>Agent</th><th>Date</th></tr></thead>
        <tbody id="rowsBody"></tbody>
      </table></div>
    </div>
  `;
  lucide.createIcons();

  async function load(){
    const [r,b] = await Promise.all([Api.request('/reports'), Api.request('/banks')]);
    rows = r.data; banks = b.data;
    drawSummary();
    drawTable(rows);
  }

  function drawSummary(){
    const total = rows.reduce((s,r)=>s+Number(r.Amount||0),0);
    const approved = rows.filter(r=>r.Status==='Approved').length;
    const commission = rows.filter(r=>r.Status==='Approved').reduce((s,r)=>{
      const bank = banks.find(b=>b.BankName===r.Bank);
      return s + Number(r.Amount||0) * (bank?Number(bank.Commission):0)/100;
    },0);
    const cards = [
      { label:'Total Loan Value', value:Utils.money(total) },
      { label:'Total Applications', value:Utils.numberIN(rows.length) },
      { label:'Approved', value:Utils.numberIN(approved) },
    ];
    if(Session.can('settings')){
      cards.push({ label:'Est. Commission', value:Utils.money(Math.round(commission)) });
    }
    document.getElementById('summaryCards').innerHTML = cards.map(c=>`
      <div class="card stat-card"><div class="value">${c.value}</div><div class="label">${c.label}</div></div>
    `).join('');
  }

  function statusBadge(s){
    const map = { Approved:'green', Pending:'amber', Rejected:'red' };
    return `<span class="badge ${map[s]||'gray'}">${s}</span>`;
  }

  function drawTable(list){
    const tbody = document.getElementById('rowsBody');
    if(!list.length){ tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--ink-faint);padding:30px;">No records</td></tr>`; return; }
    tbody.innerHTML = list.map(r => `
      <tr>
        <td class="cell-id">${r.LoanID}</td>
        <td>${Utils.escapeHtml(r.LoanType||'—')}</td>
        <td>${Utils.escapeHtml(r.Bank)}</td>
        <td style="font-weight:600;">${Utils.money(r.Amount)}</td>
        <td>${statusBadge(r.Status)}</td>
        <td>${Utils.escapeHtml(r.Agent||'—')}</td>
        <td>${Utils.dateShort(r.Date)}</td>
      </tr>
    `).join('');
  }

  document.getElementById('tabs').addEventListener('click', e=>{
    if(e.target.tagName!=='BUTTON') return;
    Utils.qsa('#tabs button').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    const v = e.target.dataset.v;
    if(v==='all') return drawTable(rows);
    if(v==='bank') return drawTable([...rows].sort((a,b)=>a.Bank.localeCompare(b.Bank)));
    if(v==='agent') return drawTable([...rows].sort((a,b)=>(a.Agent||'').localeCompare(b.Agent||'')));
  });

  document.getElementById('csvBtn').addEventListener('click', () => Utils.csvDownload('greenvill-loan-report.csv', rows));
  document.getElementById('printBtn').addEventListener('click', () => window.print());

  load();
})();
