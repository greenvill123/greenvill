function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current <= target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                requestAnimationFrame(updateCounter);
                observer.unobserve(counter);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
});