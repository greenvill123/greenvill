// Construction Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize construction-specific features
    initNumberCounting();
    initConstructionFormValidation();
    
    // Number Counting Animation for Construction Page
    function initNumberCounting() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + (target >= 100 ? '%' : '+');
            }, 16);
        };
        
        // Intersection Observer for counting animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Construction Form Validation
    function initConstructionFormValidation() {
        const constructionForm = document.getElementById('constructionForm');
        
        if (constructionForm) {
            constructionForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('cname').value.trim();
                const phone = document.getElementById('cphone').value.trim();
                const email = document.getElementById('cemail').value.trim();
                const service = document.getElementById('cservice').value;
                const message = document.getElementById('cmessage').value.trim();
                const msgDiv = document.getElementById('constructionFormMsg');
                
                // Validation
                if (!name) {
                    showMessage(msgDiv, 'Please enter your name', 'error');
                    return;
                }
                
                if (!phone || !/^\d{10}$/.test(phone)) {
                    showMessage(msgDiv, 'Please enter a valid 10-digit mobile number', 'error');
                    return;
                }
                
                if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    showMessage(msgDiv, 'Please enter a valid email address', 'error');
                    return;
                }
                
                if (!service) {
                    showMessage(msgDiv, 'Please select a service', 'error');
                    return;
                }
                
                // Simulate form submission
                showMessage(msgDiv, 'Thank you! We will contact you within 24 hours with a detailed quote.', 'success');
                constructionForm.reset();
            });
        }
    }
    
    // Utility Functions
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-msg ${type}`;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
    
    console.log('Construction page initialized successfully!');
});
