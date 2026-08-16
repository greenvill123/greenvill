/* Greenvill CRM — App Shell (sidebar, topbar, page scaffolding) */

const NAV = [
  { group:'Overview', items:[
    { key:'dashboard', label:'Dashboard', href:'pages/dashboard.html', icon:'layout-dashboard' },
  ]},
  { group:'Pipeline', items:[
    { key:'customers', label:'Customers', href:'pages/customers.html', icon:'users' },
    { key:'loans', label:'Loans', href:'pages/loans.html', icon:'landmark' },
    { key:'followups', label:'Follow-ups', href:'pages/followups.html', icon:'calendar-clock' },
  ]},
  { group:'Network', items:[
    { key:'banks', label:'Banks', href:'pages/banks.html', icon:'building-2' },
  ]},
  { group:'Insights', items:[
    { key:'reports', label:'Reports', href:'pages/reports.html', icon:'bar-chart-3' },
  ]},
  { group:'System', items:[
    { key:'settings', label:'Settings', href:'pages/settings.html', icon:'settings', perm:'settings' },
  ]},
];

function renderShell(activeKey, pageTitle, pageSub){
  Auth.guard();
  const s = Session.get();
  const root = document.getElementById('app-root');
  const isTopLevel = !window.location.pathname.includes('/pages/');
  const prefix = isTopLevel ? 'pages/' : '';
  const homePrefix = isTopLevel ? '' : '../';

  const navHtml = NAV.map(group => {
    const items = group.items.filter(i => !i.perm || Session.can(i.perm));
    if(!items.length) return '';
    return `
      <div class="nav-label">${group.group}</div>
      ${items.map(i => `
        <a class="nav-item ${i.key===activeKey?'active':''}" href="${homePrefix}${i.href}" data-key="${i.key}">
          <i data-lucide="${i.icon}"></i><span>${i.label}</span>
        </a>`).join('')}
    `;
  }).join('');

  root.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="mark">GV</div>
          <div>Greenvill CRM<small>${window.GREENVILL_CONFIG?.COMPANY || 'Greenvill Associates'}</small></div>
        </div>
        <nav class="nav-group">${navHtml}</nav>
        <div class="sidebar-foot">v1.0</div>
      </aside>
      <div class="main">
        <header class="topbar">
          <div>
            <h1>${pageTitle}</h1>
            ${pageSub ? `<div class="sub">${pageSub}</div>` : ''}
          </div>
          <div class="topbar-right">
            <button class="icon-btn" id="resetDataBtn" title="Reset demo data"><i data-lucide="refresh-ccw"></i></button>
            <div class="user-chip">
              <div class="avatar">${Utils.initials(s.name)}</div>
              <div>
                <div style="font-size:12.5px;font-weight:600;line-height:1.2;">${s.name}</div>
                <div class="role">${s.role}</div>
              </div>
            </div>
            <button class="icon-btn" id="logoutBtn" title="Logout"><i data-lucide="log-out"></i></button>
          </div>
        </header>
        <main class="content" id="page-content"></main>
      </div>
    </div>
  `;

  document.getElementById('logoutBtn').addEventListener('click', Auth.logout);
  document.getElementById('resetDataBtn').addEventListener('click', () => {
    if(confirm('Reset all demo data back to the seeded sample set?')){
      Store.resetAll();
      Utils.toast('Demo data reset');
      setTimeout(()=>window.location.reload(), 500);
    }
  });

  lucide.createIcons();
}

function guardPermOrHide(selector, perm){
  if(!Session.can(perm)){
    document.querySelectorAll(selector).forEach(el => el.remove());
  }
}
