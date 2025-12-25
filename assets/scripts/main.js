// Greenvill Associates — Modern Loan Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  // initBankSlider();
  // initTestimonialSlider();
  initFAQ();
  initCalculatorTabs();
  initRangeSliders();
  initFormValidation();
  initScrollAnimations();
  initNumberCounting();
  initMobileNav();

  // Bank Slider
  /* Bank Slider Removed - Replaced with CSS Marquee */

  // Number Counting Animation
  function initNumberCounting() {
    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = Math.floor(current);
      }, 16);
    };

    // Intersection Observer for counting animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  // Testimonial Slider
  /* Testimonial Slider Removed - Replaced with Grid */

  // Mobile navigation handler
  function initMobileNav() {
    const toggle = document.querySelector(".mobile-nav-toggle");
    const nav = document.querySelector(".nav");
    const header = document.querySelector(".header");

    if (!toggle || !nav || !header) {
      console.warn("Mobile navigation elements not found - this is normal on desktop");
      return;
    }
    console.log("Mobile navigation initialized");

    // Compute and set nav top position to match header height
    function setNavTop() {
      const headerHeight = header.getBoundingClientRect().height;
      nav.style.top = headerHeight + "px";
    }

    // Close menu function
    function closeMenu() {
      document.body.classList.remove("mobile-nav-open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      nav.style.top = "";
    }

    // Open menu function
    function openMenu() {
      setNavTop();
      document.body.classList.add("mobile-nav-open");
      toggle.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    }

    // Toggle menu function (single event handler)
    function toggleMenu(event) {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = document.body.classList.contains("mobile-nav-open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Attach click event listener to hamburger button
    toggle.addEventListener("click", toggleMenu);

    // Close menu when clicking on nav links
    const navLinks = nav.querySelectorAll("a");
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    // Close menu on Escape key press
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("mobile-nav-open")) {
        closeMenu();
      }
    });

    // Close menu when clicking on backdrop overlay
    document.addEventListener("click", function (e) {
      // Close menu if clicking outside the nav menu (on backdrop)
      if (document.body.classList.contains("mobile-nav-open")) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
          closeMenu();
        }
      }
    }, true);

    // Update nav position on window resize
    let resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        if (document.body.classList.contains("mobile-nav-open")) {
          setNavTop();
        }
      }, 100);
    });

    // Set initial nav position
    setNavTop();
  }

  // FAQ Accordion
  function initFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-q");
      const answer = item.querySelector(".faq-a");

      question.addEventListener("click", () => {
        const isActive = question.classList.contains("active");

        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          const otherQuestion = otherItem.querySelector(".faq-q");
          const otherAnswer = otherItem.querySelector(".faq-a");
          otherQuestion.classList.remove("active");
          otherAnswer.classList.remove("active");
        });

        // Toggle current item
        if (!isActive) {
          question.classList.add("active");
          answer.classList.add("active");
        }
      });
    });
  }

  // Calculator Tabs
  function initCalculatorTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".calculator-panel");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");

        // Remove active class from all tabs and panels
        tabBtns.forEach((tab) => tab.classList.remove("active"));
        panels.forEach((panel) => panel.classList.remove("active"));

        // Add active class to clicked tab and corresponding panel
        btn.classList.add("active");
        document.getElementById(`${targetTab}-panel`).classList.add("active");
      });
    });
  }

  // Range Sliders
  function initRangeSliders() {
    // Loan Amount Range
    const loanAmountInput = document.getElementById("loanAmount");
    const loanAmountRange = document.getElementById("loanAmountRange");

    if (loanAmountInput && loanAmountRange) {
      loanAmountRange.addEventListener("input", () => {
        loanAmountInput.value = loanAmountRange.value;
      });

      loanAmountInput.addEventListener("input", () => {
        loanAmountRange.value = loanAmountInput.value;
      });
    }

    // Interest Rate Range
    const interestRateInput = document.getElementById("interestRate");
    const interestRateRange = document.getElementById("interestRateRange");

    if (interestRateInput && interestRateRange) {
      interestRateRange.addEventListener("input", () => {
        interestRateInput.value = interestRateRange.value;
      });

      interestRateInput.addEventListener("input", () => {
        interestRateRange.value = interestRateInput.value;
      });
    }

    // Tenure Range
    const tenureInput = document.getElementById("tenure");
    const tenureRange = document.getElementById("tenureRange");

    if (tenureInput && tenureRange) {
      tenureRange.addEventListener("input", () => {
        tenureInput.value = tenureRange.value;
      });

      tenureInput.addEventListener("input", () => {
        tenureRange.value = tenureInput.value;
      });
    }
  }

  // Form Validation with enhanced security and UX
  function initFormValidation() {
    const quickForm = document.getElementById("quickForm");
    const constructionForm = document.getElementById("constructionForm");
    const contactForm = document.getElementById("contactForm");

    // Phone number validation (Indian format)
    function isValidIndianPhone(phone) {
      const phoneRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
      return phoneRegex.test(phone.replace(/[\s\-]/g, ""));
    }

    // Show loading state on button — store original label/value in a data attribute
    // so it can be restored reliably. Accepts either <button> or <input type="submit">.
    function setSubmitButtonLoading(btnOrInput, isLoading) {
      if (!btnOrInput) return;

      const isInput =
        btnOrInput.tagName && btnOrInput.tagName.toLowerCase() === "input";

      if (isLoading) {
        // store original label/value once
        if (!btnOrInput.dataset.originalText) {
          btnOrInput.dataset.originalText = isInput
            ? btnOrInput.value
            : btnOrInput.textContent;
        }
        btnOrInput.disabled = true;
        if (isInput) btnOrInput.value = "Submitting...";
        else btnOrInput.textContent = "Submitting...";
      } else {
        btnOrInput.disabled = false;
        if (btnOrInput.dataset.originalText) {
          if (isInput) btnOrInput.value = btnOrInput.dataset.originalText;
          else btnOrInput.textContent = btnOrInput.dataset.originalText;
          delete btnOrInput.dataset.originalText;
        }
      }
    }

    // CONFIGURATION: REPLACE THIS WITH YOUR DEPLOYED GOOGLE SCRIPT URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxWU6LkLxbChylE41qKGyE0FdYpUeAm_jxCu9hgg-vTQUVJnnpTeVfCcl3azsYxZh5g/exec";

    // Handle form submission
    async function handleFormSubmit(form, formType, msgDiv) {
      if (SCRIPT_URL === "INSERT_YOUR_GOOGLE_SCRIPT_URL_HERE" || !SCRIPT_URL) {
        console.warn("Script URL not set");
        // Fallback for demo only
        showMessage(msgDiv, "Setup Pending: Add Script URL in main.js", "error");
        return;
      }

      // find either a <button> or <input type="submit"> inside the form
      const submitBtn = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );
      setSubmitButtonLoading(submitBtn, true);

      try {
        const formData = new FormData(form);
        formData.append("form", formType);

        // Convert FormData to URLSearchParams for Google Scripts compatibility
        // This is often more reliable than FormData for simple text fields in GAS
        const data = new URLSearchParams();
        for (const pair of formData) {
          data.append(pair[0], pair[1]);
        }

        const response = await fetch(SCRIPT_URL, {
          method: "POST",
          body: data,
          // 'no-cors' needed because GAS redirects to a temporary URL which causes CORS issues on the redirection
          // Note: with 'no-cors', we cannot read response.ok or response.json(). 
          // We assume success if no network error travels back.
          mode: "no-cors"
        });

        // Since we use no-cors, we assume success if we reach here
        window.location.href = "form-success.html";

      } catch (error) {
        console.error("Form Error:", error);
        showMessage(
          msgDiv,
          "Sorry, connection failed. Please try again.",
          "error"
        );
        setSubmitButtonLoading(submitBtn, false);
      }
    }

    if (quickForm) {
      quickForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("qname").value.trim();
        const phone = document.getElementById("qphone").value.trim();
        const type = document.getElementById("qtype").value;
        const amount = document.getElementById("qamount").value;
        const msgDiv = document.getElementById("quickFormMsg");

        // Validation
        if (!name) {
          showMessage(msgDiv, "Please enter your name", "error");
          return;
        }

        if (!phone || !isValidIndianPhone(phone)) {
          showMessage(
            msgDiv,
            "Please enter a valid Indian mobile number",
            "error"
          );
          return;
        }

        if (!amount || amount < 10000) {
          showMessage(
            msgDiv,
            "Please enter a valid loan amount (minimum ₹10,000)",
            "error"
          );
          return;
        }

        await handleFormSubmit(quickForm, "Quick Contact", msgDiv);
      });
    }

    if (constructionForm) {
      constructionForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("cname").value.trim();
        const phone = document.getElementById("cphone").value.trim();
        const email = document.getElementById("cemail").value.trim();
        const service = document.getElementById("cservice").value;
        const message = document.getElementById("cmessage").value.trim();
        const msgDiv = document.getElementById("constructionFormMsg");

        // Validation
        if (!name) {
          showMessage(msgDiv, "Please enter your name", "error");
          return;
        }

        if (!phone || !isValidIndianPhone(phone)) {
          showMessage(
            msgDiv,
            "Please enter a valid Indian mobile number",
            "error"
          );
          return;
        }

        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showMessage(msgDiv, "Please enter a valid email address", "error");
          return;
        }

        if (!service) {
          showMessage(msgDiv, "Please select a service", "error");
          return;
        }

        await handleFormSubmit(
          constructionForm,
          "Construction Enquiry",
          msgDiv
        );
      });
    }

    if (contactForm) {
      contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const msgDiv = document.createElement("div"); // Contact form might need a msg container
        msgDiv.id = "contactFormMsg";
        if (!contactForm.querySelector("#contactFormMsg")) {
          contactForm.insertBefore(msgDiv, contactForm.firstChild);
        }

        const name = contactForm.querySelector('[name="name"]').value.trim();
        const phone = contactForm.querySelector('[name="phone"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const msg = contactForm.querySelector('[name="message"]').value.trim();

        // Basic validation
        if (!name || !phone) {
          showMessage(msgDiv, "Name and Phone are required", "error");
          return;
        }

        await handleFormSubmit(contactForm, "General Contact", msgDiv);
      });
    }
  }

  // Scroll Animations
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
      ".service-card, .testimonial-card, .faq-item"
    );
    animateElements.forEach((el) => observer.observe(el));
  }

  // Utility Functions
  function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-msg ${type}`;
    element.style.display = "block";

    setTimeout(() => {
      element.style.display = "none";
    }, 5000);
  }

  // EMI Calculation
  window.calculateEMI = function () {
    const principal =
      parseFloat(document.getElementById("loanAmount").value) || 0;
    const rate = parseFloat(document.getElementById("interestRate").value) || 0;
    const time = parseFloat(document.getElementById("tenure").value) || 0;

    if (principal <= 0 || rate <= 0 || time <= 0) {
      document.getElementById("emiResult").innerHTML =
        '<div class="error">Please enter valid values</div>';
      return;
    }

    const monthlyRate = rate / (12 * 100);
    const months = time * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    document.getElementById("emiResult").innerHTML = `
            <div class="calculator-result">
                <h3>EMI Calculation Result</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: var(--gradient-light); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--green);">₹${Math.round(
      emi
    ).toLocaleString()}</div>
                        <div style="font-size: 0.9rem; color: var(--muted);">Monthly EMI</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--gradient-light); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--navy);">₹${Math.round(
      totalAmount
    ).toLocaleString()}</div>
                        <div style="font-size: 0.9rem; color: var(--muted);">Total Amount</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--gradient-light); border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent);">₹${Math.round(
      totalInterest
    ).toLocaleString()}</div>
                        <div style="font-size: 0.9rem; color: var(--muted);">Total Interest</div>
                    </div>
                </div>
            </div>
        `;
  };

  // Eligibility Check
  window.checkEligibility = function () {
    const monthlyIncome =
      parseFloat(document.getElementById("monthlyIncome").value) || 0;
    const existingEMI =
      parseFloat(document.getElementById("existingEMI").value) || 0;
    const loanType = document.getElementById("loanType").value;
    const creditScore =
      parseFloat(document.getElementById("creditScore").value) || 750;

    if (monthlyIncome <= 0) {
      document.getElementById("eligibilityResult").innerHTML =
        '<div class="error">Please enter valid monthly income</div>';
      return;
    }

    // Calculate eligibility based on loan type
    let maxEMI,
      maxLoanAmount,
      eligibilityScore = 0;

    switch (loanType) {
      case "personal":
        maxEMI = monthlyIncome * 0.4 - existingEMI;
        maxLoanAmount = maxEMI * 60; // 5 years max
        eligibilityScore =
          creditScore >= 700 ? 90 : creditScore >= 650 ? 70 : 50;
        break;
      case "housing":
        maxEMI = monthlyIncome * 0.5 - existingEMI;
        maxLoanAmount = maxEMI * 300; // 25 years max
        eligibilityScore =
          creditScore >= 750 ? 95 : creditScore >= 700 ? 80 : 60;
        break;
      case "business":
        maxEMI = monthlyIncome * 0.3 - existingEMI;
        maxLoanAmount = maxEMI * 60; // 5 years max
        eligibilityScore =
          creditScore >= 650 ? 85 : creditScore >= 600 ? 65 : 40;
        break;
      case "vehicle":
        maxEMI = monthlyIncome * 0.35 - existingEMI;
        maxLoanAmount = maxEMI * 84; // 7 years max
        eligibilityScore =
          creditScore >= 700 ? 90 : creditScore >= 650 ? 75 : 55;
        break;
    }

    const isEligible = eligibilityScore >= 60 && maxLoanAmount > 0;

    document.getElementById("eligibilityResult").innerHTML = `
            <div class="calculator-result">
                <h3>Eligibility Check Result</h3>
                <div style="text-align: center; margin: 1rem 0;">
                    <div style="font-size: 2rem; font-weight: 700; color: ${isEligible ? "var(--success)" : "var(--error)"
      };">
                        ${isEligible ? "✓ Eligible" : "✗ Not Eligible"}
                    </div>
                    <div style="font-size: 1.2rem; color: var(--muted); margin-top: 0.5rem;">
                        Eligibility Score: ${eligibilityScore}%
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: var(--gradient-light); border-radius: 8px;">
                        <div style="font-size: 1.3rem; font-weight: 700; color: var(--navy);">₹${Math.round(
        maxLoanAmount
      ).toLocaleString()}</div>
                        <div style="font-size: 0.9rem; color: var(--muted);">Max Loan Amount</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: var(--gradient-light); border-radius: 8px;">
                        <div style="font-size: 1.3rem; font-weight: 700; color: var(--navy);">₹${Math.round(
        maxEMI
      ).toLocaleString()}</div>
                        <div style="font-size: 0.9rem; color: var(--muted);">Max Monthly EMI</div>
                    </div>
                </div>
                ${!isEligible
        ? '<div style="margin-top: 1rem; padding: 1rem; background: rgba(239,68,68,0.1); border-radius: 8px; color: var(--error); text-align: center;">Improve your eligibility by increasing income or improving credit score</div>'
        : ""
      }
            </div>
        `;
  };

  // Loan Comparison
  window.compareLoans = function () {
    const amount =
      parseFloat(document.getElementById("compareAmount").value) || 0;
    const tenure =
      parseFloat(document.getElementById("compareTenure").value) || 0;

    if (amount <= 0 || tenure <= 0) {
      document.getElementById("comparisonResult").innerHTML =
        '<div class="error">Please enter valid values</div>';
      return;
    }

    const loanTypes = [
      { name: "Personal Loan", rate: 12, maxAmount: 5000000, maxTenure: 5 },
      { name: "Housing Loan", rate: 8.5, maxAmount: 100000000, maxTenure: 30 },
      { name: "Business Loan", rate: 14, maxAmount: 20000000, maxTenure: 5 },
      { name: "Vehicle Loan", rate: 10, maxAmount: 5000000, maxTenure: 7 },
    ];

    let comparisonHTML =
      '<div class="calculator-result"><h3>Loan Comparison</h3><div style="display: grid; gap: 1rem; margin-top: 1rem;">';

    loanTypes.forEach((loan) => {
      const isEligible = amount <= loan.maxAmount && tenure <= loan.maxTenure;
      const monthlyRate = loan.rate / (12 * 100);
      const months = tenure * 12;
      const emi = isEligible
        ? (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1)
        : 0;
      const totalAmount = emi * months;
      const totalInterest = totalAmount - amount;

      comparisonHTML += `
                <div style="padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px; background: ${isEligible ? "var(--white)" : "rgba(0,0,0,0.05)"
        };">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0; color: var(--navy);">${loan.name
        }</h4>
                        <span style="padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${isEligible ? "var(--success)" : "var(--error)"
        }; color: white;">
                            ${isEligible ? "Eligible" : "Not Eligible"}
                        </span>
                    </div>
                    ${isEligible
          ? `
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 1.2rem; font-weight: 700; color: var(--green);">₹${Math.round(
            emi
          ).toLocaleString()}</div>
                                <div style="font-size: 0.8rem; color: var(--muted);">Monthly EMI</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.2rem; font-weight: 700; color: var(--navy);">${loan.rate
          }%</div>
                                <div style="font-size: 0.8rem; color: var(--muted);">Interest Rate</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.2rem; font-weight: 700; color: var(--accent);">₹${Math.round(
            totalInterest
          ).toLocaleString()}</div>
                                <div style="font-size: 0.8rem; color: var(--muted);">Total Interest</div>
                            </div>
                        </div>
                    `
          : `
                        <div style="text-align: center; color: var(--muted);">
                            ${amount > loan.maxAmount
            ? `Amount exceeds maximum limit of ₹${loan.maxAmount.toLocaleString()}`
            : tenure > loan.maxTenure
              ? `Tenure exceeds maximum limit of ${loan.maxTenure} years`
              : "Not eligible for this loan type"
          }
                        </div>
                    `
        }
                </div>
            `;
    });

    comparisonHTML += "</div></div>";
    document.getElementById("comparisonResult").innerHTML = comparisonHTML;
  };

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  console.log("✅ Greenvill Associates website initialized successfully!");
  console.log("✅ Features loaded: Bank Slider, Mobile Nav, Forms, Calculators");
});
