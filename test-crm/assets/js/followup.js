/* Greenvill CRM — Follow-up Management */
(async function(){
  renderShell('followups', 'Follow-ups', 'Stay ahead of every promised call-back');
  const content = document.getElementById('page-content');
  let items = [], customers = [];

  content.innerHTML = `
    <div class="toolbar">
      <div class="pill-tabs" id="tabs">
        <button data-v="today" class="active">Today</button>
        <button data-v="upcoming">Upcoming</button>
        <button data-v="missed">Missed</button>
        <button data-v="completed">Completed</button>
      </div>
      <div class="spacer"></div>
      <button class="btn btn-primary" id="addBtn"><i data-lucide="plus"></i> Add Follow-up</button>
    </div>
    <div class="panel">
      <div class="table-wrap">
        <table>
          <thead><tr><th>Customer</th><th>Remarks</th><th>Next Date</th><th>Agent</th><th>Status</th><th></th></tr></thead>
          <tbody id="rows"></tbody>
        </table>
      </div>
      <div id="emptyState"></div>
    </div>

    <div class="overlay" id="overlay">
      <div class="modal">
        <div class="modal-head"><h3>Add Follow-up</h3><button class="icon-btn" id="closeModal"><i data-lucide="x"></i></button></div>
        <form id="fuForm">
          <div class="modal-body">
            <div class="field"><label>Customer</label><select name="CustomerID" id="customerSelect" required></select></div>
            <div class="field"><label>Remarks</label><textarea name="Remarks" rows="3" placeholder="What was discussed / promised?"></textarea></div>
            <div class="form-grid">
              <div class="field"><label>Next Follow-up Date</label><input name="NextDate" type="date" required></div>
              <div class="field"><label>Agent</label><input name="Agent" value="${Utils.escapeHtml(Session.get().name)}"></div>
            </div>
          </div>
          <div class="modal-foot">
            <button type="button" class="btn btn-ghost" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn btn-primary"><i data-lucide="check"></i> Save</button>
          </div>
        </form>
      </div>
    </div>
  `;
  lucide.createIcons();

  async function load(){
    const [f,c] = await Promise.all([Api.request('/followups'), Api.request('/customers')]);
    items = f.data; customers = c.data;
    document.getElementById('customerSelect').innerHTML = customers.map(c=>`<option value="${c.CustomerID}">${Utils.escapeHtml(c.Name)}</option>`).join('');
    draw();
  }

  function customerName(id){ return customers.find(c=>c.CustomerID===id)?.Name || id; }

  function draw(){
    const tab = document.querySelector('#tabs .active')?.dataset.v || 'today';
    const today = Utils.todayISO();
    let list = items.filter(f => {
      if(tab==='completed') return f.Status==='Completed';
      if(f.Status==='Completed') return false;
      if(tab==='today') return f.NextDate===today;
      if(tab==='upcoming') return f.NextDate > today;
      if(tab==='missed') return f.NextDate < today;
      return true;
    });
    const rows = document.getElementById('rows');
    const empty = document.getElementById('emptyState');
    if(!list.length){
      rows.innerHTML='';
      empty.innerHTML = `<div class="empty-state"><i data-lucide="calendar-check"></i><div>Nothing here — you're all caught up.</div></div>`;
      lucide.createIcons();
      return;
    }
    empty.innerHTML = '';
    rows.innerHTML = list.map(f => `
      <tr>
        <td style="font-weight:600;">${Utils.escapeHtml(customerName(f.CustomerID))}</td>
        <td style="max-width:320px;">${Utils.escapeHtml(f.Remarks||'—')}</td>
        <td>${Utils.dateShort(f.NextDate)}</td>
        <td>${Utils.escapeHtml(f.Agent||'—')}</td>
        <td><span class="badge ${f.Status==='Completed'?'green':'amber'}">${f.Status}</span></td>
        <td class="row-actions">
          ${f.Status!=='Completed' ? `<button class="icon-btn btn-sm done-btn" data-id="${f.FollowupID}" title="Mark done"><i data-lucide="check-circle"></i></button>` : ''}
          <button class="icon-btn btn-sm del-btn" data-id="${f.FollowupID}" title="Delete"><i data-lucide="trash-2"></i></button>
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
    Utils.qsa('.done-btn').forEach(b=>b.addEventListener('click', ()=>markDone(b.dataset.id)));
    Utils.qsa('.del-btn').forEach(b=>b.addEventListener('click', ()=>remove(b.dataset.id)));
  }

  document.getElementById('tabs').addEventListener('click', e=>{
    if(e.target.tagName!=='BUTTON') return;
    Utils.qsa('#tabs button').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active'); draw();
  });

  const overlay = document.getElementById('overlay');
  const form = document.getElementById('fuForm');
  document.getElementById('addBtn').addEventListener('click', ()=>{ form.reset(); overlay.classList.add('show'); });
  document.getElementById('closeModal').addEventListener('click', ()=>overlay.classList.remove('show'));
  document.getElementById('cancelBtn').addEventListener('click', ()=>overlay.classList.remove('show'));
  overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.classList.remove('show'); });

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(form).entries());
    await Api.request('/followup/create', payload);
    Utils.toast('Follow-up scheduled');
    overlay.classList.remove('show');
    load();
  });

  async function markDone(id){
    await Api.request('/followup/update', { FollowupID:id, Status:'Completed' });
    Utils.toast('Marked as completed');
    load();
  }
  async function remove(id){
    if(!confirm('Delete this follow-up?')) return;
    await Api.request('/followup/delete', { FollowupID:id });
    load();
  }

  load();
})();
