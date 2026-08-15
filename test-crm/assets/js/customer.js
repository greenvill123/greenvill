/* Greenvill CRM — Customer Management */
(async function(){
  renderShell('customers', 'Customers', 'Every borrower Greenvill has ever onboarded');
  const content = document.getElementById('page-content');
  let all = [];
  let query = '';

  content.innerHTML = `
    <div class="toolbar">
      <div class="search-box">
        <i data-lucide="search"></i>
        <input id="searchInput" placeholder="Search name, mobile, PAN...">
      </div>
      <div class="pill-tabs" id="statusTabs">
        <button data-v="All" class="active">All</button>
        <button data-v="Active">Active</button>
        <button data-v="Pending">Pending</button>
        <button data-v="Inactive">Inactive</button>
      </div>
      <div class="spacer"></div>
      <button class="btn btn-ghost btn-sm" id="exportBtn"><i data-lucide="download"></i> Export CSV</button>
      <button class="btn btn-primary" id="addBtn"><i data-lucide="user-plus"></i> Add Customer</button>
    </div>
    <div class="panel">
      <div class="table-wrap">
        <table>
          <thead><tr>
            <th>Customer</th><th>Mobile</th><th>Occupation</th><th>Monthly Income</th><th>PAN</th><th>Status</th><th>Created</th><th></th>
          </tr></thead>
          <tbody id="rows"></tbody>
        </table>
      </div>
      <div id="emptyState"></div>
    </div>

    <div class="overlay" id="overlay">
      <div class="modal">
        <div class="modal-head">
          <h3 id="modalTitle">Add Customer</h3>
          <button class="icon-btn" id="closeModal"><i data-lucide="x"></i></button>
        </div>
        <form id="custForm">
          <div class="modal-body">
            <div class="form-grid">
              <div class="field"><label>Full Name</label><input name="Name" required></div>
              <div class="field"><label>Father's Name</label><input name="FatherName"></div>
              <div class="field"><label>Mobile Number</label><input name="Mobile" required></div>
              <div class="field"><label>Alternative Number</label><input name="AltMobile"></div>
              <div class="field"><label>Email</label><input name="Email" type="email"></div>
              <div class="field"><label>Date of Birth</label><input name="DOB" type="date"></div>
              <div class="field" style="grid-column:1/-1;"><label>Address</label><input name="Address"></div>
              <div class="field"><label>Occupation</label><input name="Occupation"></div>
              <div class="field"><label>Monthly Income (₹)</label><input name="Income" type="number" min="0"></div>
              <div class="field"><label>PAN</label><input name="PAN" style="text-transform:uppercase"></div>
              <div class="field"><label>Aadhaar</label><input name="Aadhaar"></div>
              <div class="field"><label>Status</label>
                <select name="Status"><option>Active</option><option>Pending</option><option>Inactive</option></select>
              </div>
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn btn-ghost" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="check"></i> Save Customer</button>
          </div>
        </form>
      </div>
    </div>
  `;
  lucide.createIcons();

  async function load(){
    const res = await Api.request('/customers');
    all = res.data.sort((a,b)=> (b.CreatedDate||'').localeCompare(a.CreatedDate||''));
    draw();
  }

  function draw(){
    let statusFilter = document.querySelector('#statusTabs .active')?.dataset.v || 'All';
    let list = all.filter(c => statusFilter==='All' || c.Status===statusFilter);
    if(query){
      const q = query.toLowerCase();
      list = list.filter(c => [c.Name,c.Mobile,c.PAN,c.Email].some(v => (v||'').toLowerCase().includes(q)));
    }
    const rows = document.getElementById('rows');
    const empty = document.getElementById('emptyState');
    if(!list.length){
      rows.innerHTML = '';
      empty.innerHTML = `<div class="empty-state"><i data-lucide="user-x"></i><div>No customers match this view yet.</div></div>`;
      lucide.createIcons();
      return;
    }
    empty.innerHTML = '';
    rows.innerHTML = list.map(c => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:9px;">
            <div class="avatar-sm">${Utils.initials(c.Name)}</div>
            <div>
              <div style="font-weight:600;">${Utils.escapeHtml(c.Name)}</div>
              <div class="cell-id">${c.CustomerID}</div>
            </div>
          </div>
        </td>
        <td>${Utils.escapeHtml(c.Mobile||'—')}</td>
        <td>${Utils.escapeHtml(c.Occupation||'—')}</td>
        <td>${c.Income ? Utils.money(c.Income) : '—'}</td>
        <td class="mono">${Utils.escapeHtml(c.PAN||'—')}</td>
        <td>${statusBadge(c.Status)}</td>
        <td>${Utils.dateShort(c.CreatedDate)}</td>
        <td class="row-actions">
          <button class="icon-btn btn-sm edit-btn" data-id="${c.CustomerID}" title="Edit"><i data-lucide="pencil"></i></button>
          ${Session.can('delete') ? `<button class="icon-btn btn-sm del-btn" data-id="${c.CustomerID}" title="Delete"><i data-lucide="trash-2"></i></button>` : ''}
        </td>
      </tr>
    `).join('');
    lucide.createIcons();

    Utils.qsa('.edit-btn').forEach(b => b.addEventListener('click', () => openEdit(b.dataset.id)));
    Utils.qsa('.del-btn').forEach(b => b.addEventListener('click', () => remove(b.dataset.id)));
  }

  function statusBadge(s){
    const map = { Active:'green', Pending:'amber', Inactive:'gray' };
    return `<span class="badge ${map[s]||'gray'}">${s||'—'}</span>`;
  }

  document.getElementById('searchInput').addEventListener('input', Utils.debounce(e => { query = e.target.value; draw(); }, 200));
  document.getElementById('statusTabs').addEventListener('click', e => {
    if(e.target.tagName!=='BUTTON') return;
    Utils.qsa('#statusTabs button').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    draw();
  });
  document.getElementById('exportBtn').addEventListener('click', () => Utils.csvDownload('customers.csv', all));

  const overlay = document.getElementById('overlay');
  const form = document.getElementById('custForm');
  let editingId = null;

  function openAdd(){
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Add Customer';
    form.reset();
    overlay.classList.add('show');
  }
  function openEdit(id){
    editingId = id;
    const c = all.find(x=>x.CustomerID===id);
    document.getElementById('modalTitle').textContent = 'Edit Customer';
    Object.entries(c).forEach(([k,v]) => { if(form[k]) form[k].value = v ?? ''; });
    overlay.classList.add('show');
  }
  function closeModal(){ overlay.classList.remove('show'); }

  document.getElementById('addBtn').addEventListener('click', openAdd);
  document.getElementById('closeModal').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if(e.target===overlay) closeModal(); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    payload._actor = Session.get().username;
    if(editingId){
      payload.CustomerID = editingId;
      await Api.request('/customer/update', payload);
      Utils.toast('Customer updated');
    } else {
      await Api.request('/customer/create', payload);
      Utils.toast('Customer added');
    }
    closeModal();
    load();
  });

  async function remove(id){
    if(!confirm('Delete this customer? This cannot be undone.')) return;
    await Api.request('/customer/delete', { CustomerID:id, _actor:Session.get().username });
    Utils.toast('Customer deleted');
    load();
  }

  load();
})();
