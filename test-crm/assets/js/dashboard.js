/* Greenvill CRM — Dashboard */
(async function(){
  renderShell('dashboard', 'Dashboard', `Welcome back, ${Session.get().name.split(' ')[0]}`);
  const content = document.getElementById('page-content');

  const { data } = await Api.request('/dashboard');
  const c = data.cards;

  const cardDefs = [
    { label:'Total Customers', value:Utils.numberIN(c.totalCustomers), icon:'users' },
    { label:"Today's Follow-ups", value:Utils.numberIN(c.todaysFollowups), icon:'calendar-clock' },
    { label:'Approved Loans', value:Utils.numberIN(c.approvedLoans), icon:'circle-check' },
    { label:'Rejected Loans', value:Utils.numberIN(c.rejectedLoans), icon:'circle-x' },
    { label:'Active Loans', value:Utils.numberIN(c.activeLoans), icon:'activity' },
    { label:'Completed Loans', value:Utils.numberIN(c.completedLoans), icon:'badge-check' },
  ];

  // Revenue & Commission stats are strictly visible ONLY to Admin
  if(Session.can('settings')){
    cardDefs.push(
      { label:'Commission Earned', value:Utils.money(c.commissionEarned), icon:'wallet' },
      { label:'Monthly Revenue', value:Utils.money(c.monthlyRevenue), icon:'trending-up' }
    );
  }

  content.innerHTML = `
    <div class="grid grid-cards">
      ${cardDefs.map(cd => `
        <div class="card stat-card">
          <div class="top">
            <div class="icon"><i data-lucide="${cd.icon}"></i></div>
          </div>
          <div class="value">${cd.value}</div>
          <div class="label">${cd.label}</div>
        </div>
      `).join('')}
    </div>

    <div class="section-title"><h2 style="font-size:16px;">Portfolio charts</h2></div>
    <div class="grid" style="grid-template-columns:1.3fr 1fr;">
      <div class="panel">
        <div class="panel-head"><h3>Monthly Loans</h3></div>
        <div class="panel-body chart-box"><canvas id="chartMonthly"></canvas></div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Loan Status</h3></div>
        <div class="panel-body chart-box"><canvas id="chartStatus"></canvas></div>
      </div>
    </div>
    <div class="grid" style="grid-template-columns:1fr 1fr; margin-top:18px;">
      <div class="panel">
        <div class="panel-head"><h3>Bank-wise Loans</h3></div>
        <div class="panel-body chart-box"><canvas id="chartBank"></canvas></div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Agent Performance</h3></div>
        <div class="panel-body chart-box"><canvas id="chartAgent"></canvas></div>
      </div>
    </div>
  `;
  lucide.createIcons();

  const green = ['#146C43','#2E9A63','#8FD4AC','#0B3D2C','#1B8350'];

  new Chart(document.getElementById('chartMonthly'), {
    type:'line',
    data:{ labels:Object.keys(data.charts.monthly), datasets:[{
      label:'Loans created', data:Object.values(data.charts.monthly),
      borderColor:'#146C43', backgroundColor:'rgba(20,108,67,.12)', fill:true, tension:.35, pointRadius:3,
    }]},
    options:{ plugins:{legend:{display:false}}, scales:{ y:{ beginAtZero:true, ticks:{precision:0} } }, maintainAspectRatio:false }
  });

  new Chart(document.getElementById('chartStatus'), {
    type:'doughnut',
    data:{ labels:Object.keys(data.charts.statusCount), datasets:[{
      data:Object.values(data.charts.statusCount), backgroundColor:['#2E9A63','#D68910','#C0392B'], borderWidth:0,
    }]},
    options:{ maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ boxWidth:10, font:{size:11.5} } } } }
  });

  new Chart(document.getElementById('chartBank'), {
    type:'bar',
    data:{ labels:data.charts.bankWise.map(b=>b.name), datasets:[{
      data:data.charts.bankWise.map(b=>b.count), backgroundColor:green[1], borderRadius:6, maxBarThickness:34,
    }]},
    options:{ maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ y:{ beginAtZero:true, ticks:{precision:0} }, x:{ ticks:{ font:{size:10.5} } } } }
  });

  new Chart(document.getElementById('chartAgent'), {
    type:'polarArea',
    data:{ labels:Object.keys(data.charts.agentPerf), datasets:[{
      data:Object.values(data.charts.agentPerf), backgroundColor:green.map(c=>c+'CC'),
    }]},
    options:{ maintainAspectRatio:false, plugins:{ legend:{ position:'bottom', labels:{ boxWidth:10, font:{size:11.5} } } } }
  });
})();
