document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) { navbar.classList.add('scrolled'); }
            else { navbar.classList.remove('scrolled'); }
        });
    }
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() { navLinks.classList.toggle('open'); });
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() { navLinks.classList.remove('open'); });
        });
    }
    var particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (var i = 0; i < 50; i++) {
            var particle = document.createElement('div');
            var size = Math.random() * 4 + 1;
            var x = Math.random() * 100;
            var y = Math.random() * 100;
            var duration = Math.random() * 20 + 10;
            var delay = Math.random() * 10;
            var opacity = Math.random() * 0.4 + 0.1;
            particle.style.cssText = 'position:absolute;width:'+size+'px;height:'+size+'px;background:rgba(167,139,250,'+opacity+');border-radius:50%;left:'+x+'%;top:'+y+'%;animation:particleFloat '+duration+'s ease-in-out '+delay+'s infinite;pointer-events:none';
            particlesContainer.appendChild(particle);
        }
        var style = document.createElement('style');
        style.textContent = '@keyframes particleFloat{0%,100%{transform:translate(0,0) scale(1);opacity:0.3}25%{transform:translate(-30px,-40px) scale(1.2);opacity:0.45}50%{transform:translate(20px,-60px) scale(0.8);opacity:0.3}75%{transform:translate(-40px,-20px) scale(1.1);opacity:0.24}}';
        document.head.appendChild(style);
    }
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            if (!target) return;
            var duration = 2200;
            var startTime = null;
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) { requestAnimationFrame(step); }
                else { counter.textContent = target; }
            }
            requestAnimationFrame(step);
        });
    }
    var statsSection = document.querySelector('.stats');
    if (statsSection) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) { animateCounters(); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }
    var filterBtns = document.querySelectorAll('.filter-btn');
    var galleryItems = document.querySelectorAll('.gallery-item');
    if (filterBtns.length && galleryItems.length) {
        filterBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                filterBtns.forEach(function(b) { b.classList.remove('active'); });
                btn.classList.add('active');
                var filter = btn.getAttribute('data-filter');
                galleryItems.forEach(function(item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) { item.classList.remove('hidden'); }
                    else { item.classList.add('hidden'); }
                });
            });
        });
    }
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = btn.closest('.faq-item');
            var wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('open'); });
            if (!wasOpen) { item.classList.add('open'); }
        });
    });
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');
        });
    }
    var revealElements = document.querySelectorAll('.feature-card, .testimonial-card, .value-card, .team-card, .pricing-card, .gallery-item, .service-row');
    if (revealElements.length) {
        var revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.dataset.delay || 0;
                    setTimeout(function() { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }, delay);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        var groupCounters = {};
        revealElements.forEach(function(el) {
            var parent = el.parentElement;
            var groupId = parent ? parent.className : 'default';
            if (!groupCounters[groupId]) groupCounters[groupId] = 0;
            el.dataset.delay = groupCounters[groupId] * 80;
            groupCounters[groupId]++;
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)';
            revealObserver.observe(el);
        });
    }
    var shapes = document.querySelectorAll('.shape');
    if (shapes.length && window.innerWidth > 768) {
        window.addEventListener('mousemove', function(e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 2;
            var y = (e.clientY / window.innerHeight - 0.5) * 2;
            shapes.forEach(function(shape, i) {
                var speed = (i + 1) * 8;
                shape.style.transform = 'translate(' + (x * speed) + 'px,' + (y * speed) + 'px)';
            });
        });
    }
});