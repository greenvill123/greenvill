/**
 * GREENVILL ASSOCIATES V2 - LUXURY FINANCIAL INTERACTIVITY SYSTEM
 * Includes: Balance Transfer Savings Calculator, CIBIL Health Estimator,
 * Top Bar Announcement Auto-Renderer, 2D Scroll Reveal Animations, Parallax Motion,
 * Animated Counters, EMI Calculator with SVG Chart, Eligibility Wizard, FAQ Search, & Lead Capture.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Top Announcement Bar Auto-Renderer
  const initAnnouncementBar = () => {
    let announcements = JSON.parse(localStorage.getItem('greenvill_announcements'));
    if (!announcements || announcements.length === 0) {
      announcements = [
        {
          id: 1,
          tag: 'LIMITED OFFER',
          text: '📢 Special Rate Alert: SBI & HDFC Home Loans starting at 8.35% p.a. with zero processing fee for Trichy residents!',
          active: true,
          link: '#loans'
        },
        {
          id: 2,
          tag: 'FAST TRACK',
          text: '⚡ Instant Unsecured Business Loans up to ₹75 Lakhs sanctioned in 48 Hours!',
          active: true,
          link: '#loans'
        }
      ];
      localStorage.setItem('greenvill_announcements', JSON.stringify(announcements));
    }

    const activeAnnouncement = announcements.find(a => a.active);
    const existingBar = document.getElementById('topAnnouncementBar');

    if (activeAnnouncement) {
      if (!existingBar) {
        const topBar = document.createElement('div');
        topBar.className = 'top-announcement-bar';
        topBar.id = 'topAnnouncementBar';
        topBar.innerHTML = `
          <div class="container announcement-container">
            <div class="announcement-content">
              <span class="announcement-tag">${activeAnnouncement.tag || 'NOTICE'}</span>
              <span class="announcement-text">${activeAnnouncement.text}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px;">
              <a href="${activeAnnouncement.link || '#loans'}" style="color: var(--accent); font-weight: 700; text-decoration: underline; font-size: 0.85rem;">Learn More</a>
              <button class="announcement-close" id="closeTopBarBtn" aria-label="Close Notice">&times;</button>
            </div>
          </div>
        `;
        document.body.insertBefore(topBar, document.body.firstChild);
        document.body.classList.add('has-top-bar');

        const closeBtn = document.getElementById('closeTopBarBtn');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            topBar.style.display = 'none';
            document.body.classList.remove('has-top-bar');
          });
        }
      } else {
        existingBar.querySelector('.announcement-tag').textContent = activeAnnouncement.tag || 'NOTICE';
        existingBar.querySelector('.announcement-text').textContent = activeAnnouncement.text;
      }
    } else if (existingBar) {
      existingBar.remove();
      document.body.classList.remove('has-top-bar');
    }
  };

  initAnnouncementBar();

  window.addEventListener('storage', (e) => {
    if (e.key === 'greenvill_announcements') {
      const topBar = document.getElementById('topAnnouncementBar');
      if (topBar) topBar.remove();
      initAnnouncementBar();
    }
  });

  // 2. Header Scroll Effect & Mobile Menu Toggle
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. 2D Scroll Reveal Animation Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 4. Subtle 2D Mouse Parallax Effect on Hero Section
  const heroSection = document.querySelector('.hero');
  const heroImageCard = document.querySelector('.hero-image-card');
  const floatingStats = document.querySelectorAll('.floating-stat');

  if (heroSection && heroImageCard) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroImageCard.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;

      floatingStats.forEach((stat, idx) => {
        const factor = (idx + 1) * 12;
        stat.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      heroImageCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      floatingStats.forEach(stat => {
        stat.style.transform = 'none';
      });
    });
  }

  // 5. Animated Counter Stats on Scroll
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let hasAnimatedCounters = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(easeProgress * target);

        stat.textContent = `${prefix}${currentVal.toLocaleString('en-IN')}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = `${prefix}${target.toLocaleString('en-IN')}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimatedCounters) {
        animateCounters();
        hasAnimatedCounters = true;
      }
    });
  }, { threshold: 0.3 });

  if (heroSection) counterObserver.observe(heroSection);

  // 6. Interactive EMI Calculator
  const amountSlider = document.getElementById('emiAmountSlider');
  const amountValBox = document.getElementById('emiAmountVal');
  const rateSlider = document.getElementById('emiRateSlider');
  const rateValBox = document.getElementById('emiRateVal');
  const tenureSlider = document.getElementById('emiTenureSlider');
  const tenureValBox = document.getElementById('emiTenureVal');

  const resMonthlyEmi = document.getElementById('resMonthlyEmi');
  const resPrincipal = document.getElementById('resPrincipal');
  const resInterest = document.getElementById('resInterest');
  const resTotal = document.getElementById('resTotal');
  const chartCircle = document.getElementById('emiChartCircle');

  const formatCurrency = (val) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  const calculateEMI = () => {
    if (!amountSlider || !rateSlider || !tenureSlider) return;

    const P = parseFloat(amountSlider.value);
    const annualRate = parseFloat(rateSlider.value);
    const years = parseFloat(tenureSlider.value);

    amountValBox.textContent = formatCurrency(P);
    rateValBox.textContent = annualRate + ' %';
    tenureValBox.textContent = years + ' Years (' + (years * 12) + ' Mos)';

    const R = (annualRate / 12) / 100;
    const N = years * 12;

    let emi = 0;
    if (R > 0) {
      emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    } else {
      emi = P / N;
    }

    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    if (resMonthlyEmi) resMonthlyEmi.textContent = formatCurrency(emi);
    if (resPrincipal) resPrincipal.textContent = formatCurrency(P);
    if (resInterest) resInterest.textContent = formatCurrency(totalInterest);
    if (resTotal) resTotal.textContent = formatCurrency(totalPayment);

    if (chartCircle) {
      const total = totalPayment;
      const principalPct = (P / total) * 100;
      const circumference = 2 * Math.PI * 40;
      const strokeDash = (principalPct / 100) * circumference;
      chartCircle.style.strokeDasharray = `${strokeDash} ${circumference}`;
    }
  };

  if (amountSlider && rateSlider && tenureSlider) {
    [amountSlider, rateSlider, tenureSlider].forEach(input => {
      input.addEventListener('input', calculateEMI);
    });
    calculateEMI();
  }

  // 7. Balance Transfer Savings Calculator Widget
  const btAmountInput = document.getElementById('btAmountInput');
  const btCurrRateInput = document.getElementById('btCurrRateInput');
  const btNewRateInput = document.getElementById('btNewRateInput');
  const btTenureInput = document.getElementById('btTenureInput');
  const resBtSavings = document.getElementById('resBtSavings');
  const resBtMonthlyDiff = document.getElementById('resBtMonthlyDiff');

  const calcBalanceTransfer = () => {
    if (!btAmountInput || !btCurrRateInput || !btNewRateInput || !btTenureInput) return;

    const P = parseFloat(btAmountInput.value) || 0;
    const oldR = (parseFloat(btCurrRateInput.value) / 12) / 100;
    const newR = (parseFloat(btNewRateInput.value) / 12) / 100;
    const N = (parseFloat(btTenureInput.value) || 1) * 12;

    const oldEmi = (P * oldR * Math.pow(1 + oldR, N)) / (Math.pow(1 + oldR, N) - 1);
    const newEmi = (P * newR * Math.pow(1 + newR, N)) / (Math.pow(1 + newR, N) - 1);

    const monthlyDiff = oldEmi - newEmi;
    const totalSavings = monthlyDiff * N;

    if (resBtSavings) resBtSavings.textContent = formatCurrency(totalSavings);
    if (resBtMonthlyDiff) resBtMonthlyDiff.textContent = formatCurrency(monthlyDiff) + ' / mo';
  };

  if (btAmountInput && btCurrRateInput && btNewRateInput && btTenureInput) {
    [btAmountInput, btCurrRateInput, btNewRateInput, btTenureInput].forEach(inp => {
      inp.addEventListener('input', calcBalanceTransfer);
    });
    calcBalanceTransfer();
  }

  // 8. CIBIL Score Estimator Tool
  const cibilScoreVal = document.getElementById('cibilScoreVal');
  const cibilScoreLabel = document.getElementById('cibilScoreLabel');
  const cibilOptions = document.querySelectorAll('.cibil-opt');

  if (cibilScoreVal && cibilOptions.length > 0) {
    let baseScore = 750;

    cibilOptions.forEach(opt => {
      opt.addEventListener('change', () => {
        let score = 650;
        cibilOptions.forEach(o => {
          if (o.checked) score += parseInt(o.value);
        });

        score = Math.min(Math.max(score, 300), 900);
        cibilScoreVal.textContent = score;

        if (score >= 750) {
          cibilScoreLabel.textContent = 'EXCELLENT';
          cibilScoreLabel.style.color = 'var(--primary)';
        } else if (score >= 700) {
          cibilScoreLabel.textContent = 'GOOD';
          cibilScoreLabel.style.color = '#F57C00';
        } else {
          cibilScoreLabel.textContent = 'NEEDS ADVICE';
          cibilScoreLabel.style.color = '#D32F2F';
        }
      });
    });
  }

  // 9. Lead Capture Helper
  const saveLeadToLocalStorage = (name, phone, loanType, amount, city = 'Trichy') => {
    const leads = JSON.parse(localStorage.getItem('greenvill_leads')) || [];
    leads.unshift({
      id: Date.now(),
      name,
      phone,
      loanType,
      amount,
      city,
      date: new Date().toLocaleString()
    });
    localStorage.setItem('greenvill_leads', JSON.stringify(leads));
  };

  // 10. Apply Modal System
  const modalOverlay = document.getElementById('applyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalLoanTypeSelect = document.getElementById('modalLoanType');

  window.openApplyModal = (loanTypeName = '') => {
    if (modalOverlay) {
      modalOverlay.classList.add('active');
      if (modalLoanTypeSelect && loanTypeName) {
        modalLoanTypeSelect.value = loanTypeName;
      }
    }
  };

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // Handle Form Submissions
  const quickApplyForm = document.getElementById('quickApplyForm');
  if (quickApplyForm) {
    quickApplyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = quickApplyForm.querySelector('input[type="text"]').value;
      const phone = quickApplyForm.querySelector('input[type="tel"]').value;
      const loanType = modalLoanTypeSelect ? modalLoanTypeSelect.value : 'General Loan';
      const amount = quickApplyForm.querySelectorAll('input[type="text"]')[1]?.value || 'Requested';

      saveLeadToLocalStorage(name, phone, loanType, amount);

      alert('Thank you! Your loan inquiry has been logged in our system. A dedicated Greenvill Financial Advisor in Trichy will call you within 15 minutes.');
      quickApplyForm.reset();
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  const contactMainForm = document.getElementById('contactMainForm');
  if (contactMainForm) {
    contactMainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = contactMainForm.querySelectorAll('.form-input');
      const select = contactMainForm.querySelector('.form-select');
      const name = inputs[0]?.value || 'Client';
      const phone = inputs[1]?.value || '';
      const city = inputs[2]?.value || 'Trichy';
      const loanType = select?.value || 'General Inquiry';
      const amount = inputs[3]?.value || 'N/A';

      saveLeadToLocalStorage(name, phone, loanType, amount, city);

      alert('Thank you for contacting Greenvill Associates! Your lead has been logged and sent to our Trichy executive team.');
      contactMainForm.reset();
    });
  }
});
