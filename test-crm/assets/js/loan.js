/* Greenvill CRM — Loan Management */
(async function(){
  renderShell('loans', 'Loans', 'Track every application from enquiry to disbursal');
  const content = document.getElementById('page-content');
  let loans = [], customers = [], banks = [];
  let query = '';

  const STAGES = ['Enquiry','Document Verification','Bank Processing','Approved by Bank','Disbursed','Rejected by Bank'];

  content.innerHTML = `
    <div class="toolbar">
      <div class="search-box"><i data-lucide="search"></i><input id="searchInput" placeholder="Search loan ID, customer..."></div>
      <div class="pill-tabs" id="statusTabs">
        <button data-v="All" class="active">All</button>
        <button data-v="Approved">Approved</button>
        <button data-v="Pending">Pending</button>
        <button data-v="Rejected">Rejected</button>
      </div>
      <div class="spacer"></div>
      <button class="btn btn-ghost btn-sm" id="exportBtn"><i data-lucide="download"></i> Export CSV</button>
      <button class="btn btn-primary" id="addBtn"><i data-lucide="plus"></i> New Loan</button>
    </div>
    <div class="panel">
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Loan</th><th>Customer</th><th>Type</th><th>Amount</th><th>Bank</th><th>Stage</th><th>Status</th><th>Agent</th><th></th>
          </tr></thead>
          <tbody id="rows"></tbody>
        </table>
      </div>
      <div id="emptyState"></div>
    </div>

    <div class="overlay" id="overlay">
      <div class="modal">
        <div class="modal-head"><h3 id="modalTitle">New Loan</h3><button class="icon-btn" id="closeModal"><i data-lucide="x"></i></button></div>
        <form id="loanForm">
          <div class="modal-body">
            <div class="form-grid">
              <div class="field" style="grid-column:1/-1;"><label>Customer</label>
                <select name="CustomerID" id="customerSelect" required></select>
              </div>
              <div class="field"><label>Loan Type</label>
                <select name="LoanType" id="loanTypeSelect"></select>
              </div>
              <div class="field"><label>Bank</label>
                <select name="BankID" id="bankSelect" required></select>
              </div>
              <div class="field"><label>Loan Amount (₹)</label><input name="LoanAmount" type="number" min="0" required></div>
              <div class="field"><label>Interest Rate (%)</label><input name="Interest" type="number" step="0.1" min="0"></div>
              <div class="field"><label>Tenure (months)</label><input name="Tenure" type="number" min="1"></div>
              <div class="field"><label>Assigned Agent</label><input name="AssignedAgent" value="${Utils.escapeHtml(Session.get().name)}"></div>
              <div class="field"><label>Stage</label>
                <select name="Stage">${STAGES.map(s=>`<option>${s}</option>`).join('')}</select>
              </div>
              <div class="field"><label>Status</label>
                <select name="Status"><option>Pending</option><option>Approved</option><option>Rejected</option></select>
              </div>
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn btn-ghost" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="check"></i> Save Loan</button>
          </div>
        </form>
      </div>
    </div>
  `;
  lucide.createIcons();

  async function load(){
    const [l,c,b,settings] = await Promise.all([
      Api.request('/loans'), Api.request('/customers'), Api.request('/banks'), Api.request('/settings/get'),
    ]);
    loans = l.data.sort((a,b2)=> (b2.CreatedDate||'').localeCompare(a.CreatedDate||''));
    customers = c.data;
    banks = b.data;

    document.getElementById('customerSelect').innerHTML = customers.map(c=>`<option value="${c.CustomerID}">${Utils.escapeHtml(c.Name)} (${c.CustomerID})</option>`).join('');
    document.getElementById('bankSelect').innerHTML = banks.map(b=>`<option value="${b.BankID}">${Utils.escapeHtml(b.BankName)} — ${b.Branch}</option>`).join('');
    document.getElementById('loanTypeSelect').innerHTML = (settings.data.loanTypes||[]).map(t=>`<option>${t}</option>`).join('');
    draw();
  }

  function customerName(id){ return customers.find(c=>c.CustomerID===id)?.Name || id; }
  function bankName(id){ return banks.find(b=>b.BankID===id)?.BankName || id; }

  function statusBadge(s){
    const map = { Approved:'green', Pending:'amber', Rejected:'red' };
    return `<span class="badge ${map[s]||'gray'}">${s}</span>`;
  }
  function stageBadge(s){
    return `<span class="badge ${s==='Disbursed'?'green':(s==='Rejected by Bank'?'red':'blue')}">${s}</span>`;
  }

  function draw(){
    const statusFilter = document.querySelector('#statusTabs .active')?.dataset.v || 'All';
    let list = loans.filter(l => statusFilter==='All' || l.Status===statusFilter);
    if(query){
      const q = query.toLowerCase();
      list = list.filter(l => [l.LoanID, customerName(l.CustomerID)].some(v=>(v||'').toLowerCase().includes(q)));
    }
    const rows = document.getElementById('rows');
    const empty = document.getElementById('emptyState');
    if(!list.length){
      rows.innerHTML='';
      empty.innerHTML = `<div class="empty-state"><i data-lucide="inbox"></i><div>No loans in this view yet.</div></div>`;
      lucide.createIcons();
      return;
    }
    empty.innerHTML = '';
    rows.innerHTML = list.map(l => `
      <tr>
        <td><div class="cell-id">${l.LoanID}</div><div style="font-size:11.5px;color:var(--ink-faint);">${Utils.dateShort(l.CreatedDate)}</div></td>
        <td>${Utils.escapeHtml(customerName(l.CustomerID))}</td>
        <td>${Utils.escapeHtml(l.LoanType||'—')}</td>
        <td style="font-weight:600;">${Utils.money(l.LoanAmount)}</td>
        <td>${Utils.escapeHtml(bankName(l.BankID))}</td>
        <td>${stageBadge(l.Stage)}</td>
        <td>${statusBadge(l.Status)}</td>
        <td>${Utils.escapeHtml(l.AssignedAgent||'—')}</td>
        <td class="row-actions">
          <button class="icon-btn btn-sm edit-btn" data-id="${l.LoanID}"><i data-lucide="pencil"></i></button>
          ${Session.can('delete') ? `<button class="icon-btn btn-sm del-btn" data-id="${l.LoanID}"><i data-lucide="trash-2"></i></button>` : ''}
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
    Utils.qsa('.edit-btn').forEach(b=>b.addEventListener('click', ()=>openEdit(b.dataset.id)));
    Utils.qsa('.del-btn').forEach(b=>b.addEventListener('click', ()=>remove(b.dataset.id)));
  }

  document.getElementById('searchInput').addEventListener('input', Utils.debounce(e=>{ query=e.target.value; draw(); },200));
  document.getElementById('statusTabs').addEventListener('click', e=>{
    if(e.target.tagName!=='BUTTON') return;
    Utils.qsa('#statusTabs button').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active'); draw();
  });
  document.getElementById('exportBtn').addEventListener('click', ()=>Utils.csvDownload('loans.csv', loans.map(l=>({...l, CustomerName:customerName(l.CustomerID), BankName:bankName(l.BankID)}))));

  const overlay = document.getElementById('overlay');
  const form = document.getElementById('loanForm');
  let editingId = null;

  function openAdd(){
    editingId=null;
    document.getElementById('modalTitle').textContent='New Loan';
    form.reset();
    overlay.classList.add('show');
  }
  function openEdit(id){
    editingId=id;
    const l = loans.find(x=>x.LoanID===id);
    document.getElementById('modalTitle').textContent='Edit Loan';
    Object.entries(l).forEach(([k,v])=>{ if(form[k]) form[k].value = v ?? ''; });
    overlay.classList.add('show');
  }
  function closeModal(){ overlay.classList.remove('show'); }
  document.getElementById('addBtn').addEventListener('click', openAdd);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    payload._actor = Session.get().username;
    if(editingId){
      payload.LoanID = editingId;
      await Api.request('/loan/update', payload);
      Utils.toast('Loan updated');
    } else {
      await Api.request('/loan/create', payload);
      Utils.toast('Loan created');
    }
    closeModal();
    load();
  });

  async function remove(id){
    if(!confirm('Delete this loan record?')) return;
    await Api.request('/loan/delete', { LoanID:id, _actor:Session.get().username });
    Utils.toast('Loan deleted');
    load();
  }

  load();
})();
