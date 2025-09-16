document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    if (dotsContainer && testimonials.length) {
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        if (testimonials[index]) testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentTestimonial = index;
    }

    if (testimonials.length) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !e.target.closest('.navbar')) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when clicking on nav links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 3-at-a-time Photo Album Carousel
    const viewport = document.getElementById('albumViewport');
    if (viewport) {
        const imageUrls = [
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0572.JPG',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0568.JPG',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0563.JPG',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0559.JPG',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0552.JPG',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/bfe01a719a2645c0432494b8eda24af30a3e8d3a/IMG_0648.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0649.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0653.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0654.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0665.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0667.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0668.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0690.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0703.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0708.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0739.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0740.jpg',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0748.jpg'
        ];

        // Shuffle
        for (let i = imageUrls.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
        }

        let start = 0;
        const visibleCount = window.innerWidth <= 768 ? 1 : 3;
        const prevBtn = document.querySelector('.album-prev');
        const nextBtn = document.querySelector('.album-next');
        let timerId;

        function render() {
            const currentVisibleCount = window.innerWidth <= 768 ? 1 : 3;
            viewport.style.opacity = 0; // fade out
            setTimeout(() => {
                viewport.innerHTML = '';
                for (let i = 0; i < currentVisibleCount; i++) {
                    const idx = (start + i) % imageUrls.length;
                    const div = document.createElement('div');
                    div.className = 'album-item';
                    const img = document.createElement('img');
                    img.src = imageUrls[idx];
                    img.alt = 'Team Building Activity';
                    img.loading = 'lazy';
                    img.decoding = 'async';
                    img.sizes = '(max-width: 768px) 100vw, 33vw';
                    div.appendChild(img);
                    viewport.appendChild(div);
                }
                viewport.style.opacity = 1; // fade in
            }, 120);
        }

        function next() { 
            const currentVisibleCount = window.innerWidth <= 768 ? 1 : 3;
            start = (start + currentVisibleCount) % imageUrls.length; 
            render(); 
        }
        function prev() { 
            const currentVisibleCount = window.innerWidth <= 768 ? 1 : 3;
            start = (start - currentVisibleCount + imageUrls.length) % imageUrls.length; 
            render(); 
        }

        function startAuto() { stopAuto(); timerId = setInterval(next, 3000); }
        function stopAuto() { if (timerId) clearInterval(timerId); }

        if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
        viewport.addEventListener('mouseenter', stopAuto);
        viewport.addEventListener('mouseleave', startAuto);

        render();
        startAuto();

        // Handle window resize
        window.addEventListener('resize', () => {
            render();
        });
    }

    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.15 });
        revealEls.forEach(el => io.observe(el));
    }

    // Stats counters
    const statEls = document.querySelectorAll('.stats .stat h3[data-target]');
    if (statEls.length) {
        const io2 = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const el = e.target;
                    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                    let val = 0;
                    const step = Math.max(1, Math.floor(target / 60));
                    const timer = setInterval(() => {
                        val += step;
                        if (val >= target) { val = target; clearInterval(timer); }
                        el.textContent = val;
                    }, 20);
                    io2.unobserve(el);
                }
            });
        }, { threshold: 0.3 });
        statEls.forEach(el => io2.observe(el));
    }
}); 