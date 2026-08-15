/* Greenvill CRM — Bank Management */
(async function(){
  renderShell('banks', 'Banks', 'Partner banks and their commission terms');
  const content = document.getElementById('page-content');
  let banks = [], loans = [];

  content.innerHTML = `
    <div class="toolbar">
      <div class="spacer"></div>
      <button class="btn btn-primary" id="addBtn"><i data-lucide="building-2"></i> Add Bank</button>
    </div>
    <div class="grid grid-cards" id="bankGrid"></div>

    <div class="overlay" id="overlay">
      <div class="modal">
        <div class="modal-head"><h3 id="modalTitle">Add Bank</h3><button class="icon-btn" id="closeModal"><i data-lucide="x"></i></button></div>
        <form id="bankForm">
          <div class="modal-body">
            <div class="form-grid">
              <div class="field" style="grid-column:1/-1;"><label>Bank Name</label><input name="BankName" required></div>
              <div class="field"><label>Branch</label><input name="Branch"></div>
              <div class="field"><label>Manager Name</label><input name="ManagerName"></div>
              <div class="field"><label>Phone</label><input name="Phone"></div>
              <div class="field"><label>Email</label><input name="Email" type="email"></div>
              <div class="field"><label>Commission (%)</label><input name="Commission" type="number" step="0.1" min="0"></div>
              <div class="field"><label>Status</label><select name="Status"><option>Active</option><option>Inactive</option></select></div>
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn btn-ghost" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="check"></i> Save Bank</button>
          </div>
        </form>
      </div>
    </div>
  `;
  lucide.createIcons();

  async function load(){
    const [b,l] = await Promise.all([Api.request('/banks'), Api.request('/loans')]);
    banks = b.data; loans = l.data;
    draw();
  }

  function draw(){
    const grid = document.getElementById('bankGrid');
    if(!banks.length){
      grid.innerHTML = `<div class="empty-state"><i data-lucide="landmark"></i><div>No partner banks added yet.</div></div>`;
      lucide.createIcons();
      return;
    }
    grid.innerHTML = banks.map(b => {
      const count = loans.filter(l=>l.BankID===b.BankID).length;
      return `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <div style="font-weight:700;color:var(--green-900);">${Utils.escapeHtml(b.BankName)}</div>
            <div style="font-size:12px;color:var(--ink-faint);">${Utils.escapeHtml(b.Branch||'')}</div>
          </div>
          <span class="badge ${b.Status==='Active'?'green':'gray'}">${b.Status}</span>
        </div>
        <div style="margin:14px 0;font-size:12.5px;color:var(--ink-soft);line-height:1.8;">
          <div><i data-lucide="user" style="width:13px;height:13px;vertical-align:-2px;"></i> ${Utils.escapeHtml(b.ManagerName||'—')}</div>
          <div><i data-lucide="phone" style="width:13px;height:13px;vertical-align:-2px;"></i> ${Utils.escapeHtml(b.Phone||'—')}</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:12px;">
          <div><div style="font-size:11px;color:var(--ink-faint);">Commission</div><div style="font-weight:700;color:var(--green-700);">${b.Commission||0}%</div></div>
          <div><div style="font-size:11px;color:var(--ink-faint);">Loans</div><div style="font-weight:700;">${count}</div></div>
          <div class="row-actions">
            <button class="icon-btn btn-sm edit-btn" data-id="${b.BankID}"><i data-lucide="pencil"></i></button>
            ${Session.can('delete') ? `<button class="icon-btn btn-sm del-btn" data-id="${b.BankID}"><i data-lucide="trash-2"></i></button>` : ''}
          </div>
        </div>
      </div>`;
    }).join('');
    lucide.createIcons();
    Utils.qsa('.edit-btn').forEach(el=>el.addEventListener('click', ()=>openEdit(el.dataset.id)));
    Utils.qsa('.del-btn').forEach(el=>el.addEventListener('click', ()=>remove(el.dataset.id)));
  }

  const overlay = document.getElementById('overlay');
  const form = document.getElementById('bankForm');
  let editingId = null;

  function openAdd(){ editingId=null; document.getElementById('modalTitle').textContent='Add Bank'; form.reset(); overlay.classList.add('show'); }
  function openEdit(id){
    editingId=id;
    const b = banks.find(x=>x.BankID===id);
    document.getElementById('modalTitle').textContent='Edit Bank';
    Object.entries(b).forEach(([k,v])=>{ if(form[k]) form[k].value = v ?? ''; });
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
    if(editingId){ payload.BankID = editingId; await Api.request('/bank/update', payload); Utils.toast('Bank updated'); }
    else { await Api.request('/bank/create', payload); Utils.toast('Bank added'); }
    closeModal(); load();
  });

  async function remove(id){
    if(!confirm('Remove this bank partner?')) return;
    await Api.request('/bank/delete', { BankID:id });
    Utils.toast('Bank removed');
    load();
  }

  load();
})();
