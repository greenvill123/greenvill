// Greenvill Associates — Modern Loan Website JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initBankSlider();
  initTestimonialSlider();
  initFAQ();
  initCalculatorTabs();
  initRangeSliders();
  initFormValidation();
  initScrollAnimations();
  initNumberCounting();

  // Bank Slider
  function initBankSlider() {
    const bankSlider = document.getElementById("bankSlider");
    if (!bankSlider) return;

    const banks = [
      "SBI",
      "HDFC",
      "ICICI",
      "Axis Bank",
      "Kotak Mahindra",
      "IndusInd",
      "Yes Bank",
      "Federal Bank",
      "IDFC First",
      "Bandhan Bank",
      "RBL Bank",
      "Tata Capital",
      "Bajaj Finserv",
    ];

    // Create bank logos — prefer to show an image when available, otherwise fall back to text.
    // This tries common filename variants and extensions. If none load, it will render the bank name.
    const basePath = "assets/images/";
    const exts = [".svg", ".png", ".jpg", ".jpeg"];

    function createBankLogo(bank) {
      const container = document.createElement("div");
      container.className = "bank-logo";
      container.setAttribute("aria-label", `${bank} Bank`);

      const caption = document.createElement("span");
      caption.className = "bank-name";
      caption.textContent = bank;

      // Candidate name patterns to try
      const patterns = [];
      patterns.push(bank); // original (may contain spaces)
      patterns.push(bank.toLowerCase());
      patterns.push(bank.toLowerCase().replace(/\s+/g, ""));
      patterns.push(bank.toLowerCase().replace(/\s+/g, "-"));
      patterns.push(bank.toLowerCase().replace(/\s+/g, "_"));
      patterns.push(bank.split(" ")[0].toLowerCase());

      let tried = 0;
      let loaded = false;

      function tryNext() {
        if (loaded) return;
        if (tried >= patterns.length * exts.length) {
          // no image found — fallback to text-only (caption will show)
          container.textContent = "";
          container.appendChild(caption);
          bankSlider.appendChild(container);
          return;
        }

        const pattern = patterns[Math.floor(tried / exts.length)];
        const ext = exts[tried % exts.length];
        // encodeURIComponent to safely handle spaces and special chars
        const candidate = basePath + encodeURIComponent(pattern) + ext;

        const img = new Image();
        img.alt = bank;
        img.onload = function () {
          loaded = true;
          img.className = "bank-logo-img";
          container.appendChild(img);
          container.appendChild(caption);
          bankSlider.appendChild(container);
        };
        img.onerror = function () {
          tried++;
          tryNext();
        };
        img.src = candidate;
      }

      tryNext();
    }

    // Build logos (single instance each). We'll implement an auto-scroll instead of DOM duplication.
    banks.forEach((bank) => createBankLogo(bank));

    // Auto-scroll logic (smooth continuous scroll)
    let rafId = null;
    const speed = 0.5; // pixels per frame, tweak as needed

    function startAutoScroll() {
      const maxScroll = bankSlider.scrollWidth - bankSlider.clientWidth;
      function step() {
        if (bankSlider.scrollLeft >= maxScroll) {
          // reset to start smoothly
          bankSlider.scrollLeft = 0;
        } else {
          bankSlider.scrollLeft += speed;
        }
        rafId = window.requestAnimationFrame(step);
      }
      if (!rafId) rafId = window.requestAnimationFrame(step);
    }

    // Start when images have loaded (or after a short delay)
    window.setTimeout(startAutoScroll, 600);
  }

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
  function initTestimonialSlider() {
    const slider = document.querySelector(".testimonials-slider");
    const prevBtn = document.querySelector(".testimonial-prev");
    const nextBtn = document.querySelector(".testimonial-next");

    if (!slider) return;

    // Duplicate testimonials for seamless sliding
    const originalCards = slider.innerHTML;
    slider.innerHTML = originalCards + originalCards;

    // Hide navigation buttons since we're using auto-sliding
    if (prevBtn && nextBtn) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
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

    // Handle form submission
    async function handleFormSubmit(form, formType, msgDiv) {
      // find either a <button> or <input type="submit"> inside the form
      const submitBtn = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );
      const originalText = setSubmitButtonLoading(submitBtn, true);

      try {
        // Submit form directly to the form handler (no reCAPTCHA verification)
        const formData = new FormData(form);
        formData.append("form", formType);

        const response = await fetch(
          "https://forms.greenvillassociates.com/submit",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const result = await response.json();
        if (result.success) {
          // Successful submission — redirect to success page
          window.location.href = "form-success.html";
        } else {
          throw new Error(result.message || "Submission failed");
        }
      } catch (error) {
        showMessage(
          msgDiv,
          "Sorry, there was a problem. Please try again.",
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
                    <div style="font-size: 2rem; font-weight: 700; color: ${
                      isEligible ? "var(--success)" : "var(--error)"
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
                ${
                  !isEligible
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
                <div style="padding: 1.5rem; border: 1px solid var(--border); border-radius: 8px; background: ${
                  isEligible ? "var(--white)" : "rgba(0,0,0,0.05)"
                };">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                        <h4 style="margin: 0; color: var(--navy);">${
                          loan.name
                        }</h4>
                        <span style="padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: ${
                          isEligible ? "var(--success)" : "var(--error)"
                        }; color: white;">
                            ${isEligible ? "Eligible" : "Not Eligible"}
                        </span>
                    </div>
                    ${
                      isEligible
                        ? `
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                            <div style="text-align: center;">
                                <div style="font-size: 1.2rem; font-weight: 700; color: var(--green);">₹${Math.round(
                                  emi
                                ).toLocaleString()}</div>
                                <div style="font-size: 0.8rem; color: var(--muted);">Monthly EMI</div>
                            </div>
                            <div style="text-align: center;">
                                <div style="font-size: 1.2rem; font-weight: 700; color: var(--navy);">${
                                  loan.rate
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
                            ${
                              amount > loan.maxAmount
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

  console.log("Greenvill Associates website initialized successfully!");
});
