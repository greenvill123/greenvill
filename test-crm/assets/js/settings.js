/* Greenvill CRM — Settings (admin/manager only) */
(async function(){
  if(!Session.can('settings')){
    document.getElementById('app-root').innerHTML = `<div style="padding:60px;text-align:center;color:var(--ink-faint);">You don't have access to Settings.</div>`;
    return;
  }
  renderShell('settings', 'Settings', 'Company details, users and system preferences');
  const content = document.getElementById('page-content');
  
  const settingsRes = await Api.request('/settings/get');
  const settings = settingsRes.data || {};
  if (!Array.isArray(settings.loanTypes)) {
    settings.loanTypes = ['Business Loan','Home Loan','Personal Loan','Education Loan','Gold Loan','Vehicle Loan'];
  }

  let users = [];
  try {
    const usersRes = await Api.request('/users');
    users = usersRes.data || [];
  } catch(e) {
    users = Store.get('Users') || [];
  }

  content.innerHTML = `
    <div class="grid" style="grid-template-columns:1fr 1fr; align-items:start;">
      <div class="panel">
        <div class="panel-head"><h3>Company Details</h3></div>
        <div class="panel-body">
          <form id="companyForm">
            <div class="field"><label>Company Name</label><input name="companyName" value="${Utils.escapeHtml(settings.companyName||'')}"></div>
            <div class="field"><label>Theme</label>
              <select name="theme"><option value="green" ${settings.theme==='green'?'selected':''}>Green &amp; White (default)</option></select>
            </div>
            <label style="display:flex;align-items:center;gap:8px;font-size:13px;margin:10px 0 16px;">
              <input type="checkbox" name="backupEnabled" style="width:auto;" ${settings.backupEnabled?'checked':''}> Enable automatic daily backup
            </label>
            <button class="btn btn-primary" type="submit"><i data-lucide="save"></i> Save Changes</button>
          </form>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head"><h3>Loan Types</h3></div>
        <div class="panel-body">
          <div id="typeList" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;"></div>
          <div style="display:flex;gap:8px;">
            <input id="newType" placeholder="Add a loan type...">
            <button class="btn btn-primary btn-sm" id="addTypeBtn"><i data-lucide="plus"></i> Add</button>
          </div>
        </div>
      </div>
    </div>

    <div class="panel" style="margin-top:18px;">
      <div class="panel-head"><h3>Users &amp; Roles</h3></div>
      <div class="table-wrap"><table>
        <thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Status</th><th>Last Login</th></tr></thead>
        <tbody>
          ${users.map(u=>`<tr>
            <td>${Utils.escapeHtml(u.Name || '—')}</td>
            <td class="mono">${u.Username || '—'}</td>
            <td><span class="badge blue">${u.Role || 'Agent'}</span></td>
            <td><span class="badge ${u.Status==='Active'?'green':'gray'}">${u.Status || 'Active'}</span></td>
            <td>${u.LastLogin ? Utils.dateShort(u.LastLogin) : 'Never'}</td>
          </tr>`).join('')}
        </tbody>
      </table></div>
    </div>
  `;
  lucide.createIcons();

  function drawTypes(){
    document.getElementById('typeList').innerHTML = settings.loanTypes.map((t,i) => `
      <span class="badge blue" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;padding:6px 10px;">
        ${Utils.escapeHtml(t)} <i data-lucide="x" data-i="${i}" class="rm-type" style="width:14px;height:14px;cursor:pointer;"></i>
      </span>
    `).join('');
    lucide.createIcons();
    Utils.qsa('.rm-type').forEach(el => el.addEventListener('click', async () => {
      settings.loanTypes.splice(Number(el.dataset.i), 1);
      await Api.request('/settings/update', { loanTypes: settings.loanTypes });
      drawTypes();
      Utils.toast('Loan type removed');
    }));
  }
  drawTypes();

  document.getElementById('addTypeBtn').addEventListener('click', async () => {
    const input = document.getElementById('newType');
    const v = input.value.trim();
    if(!v) return;
    if(settings.loanTypes.includes(v)){
      Utils.toast('Loan type already exists');
      return;
    }
    settings.loanTypes.push(v);
    await Api.request('/settings/update', { loanTypes: settings.loanTypes });
    input.value = '';
    drawTypes();
    Utils.toast('Loan type added successfully');
  });

  document.getElementById('companyForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    await Api.request('/settings/update', {
      companyName: fd.get('companyName'),
      theme: fd.get('theme'),
      backupEnabled: fd.get('backupEnabled') === 'on',
    });
    Utils.toast('Settings saved');
  });
})();
