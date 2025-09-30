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

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Close menu on window resize if screen becomes larger
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
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
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0703.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0572.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0568.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0563.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0559.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/59252922f37b0387fe83fa3d8030cbe257416222/DSC_0552.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/DSC_0552.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/DSC_0559.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/DSC_0563.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/DSC_0568.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/bfe01a719a2645c0432494b8eda24af30a3e8d3a/IMG_0648.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0649.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0653.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0654.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0665.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0667.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0668.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0690.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0708.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0739.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0740.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0748.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/dozmopokkaqi70kceq9s.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/gbixcgtinpjno2lju4jv.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/jnmh5hk3bmmi3shj4ttz.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/q6bzxqmm36zmdmpincnv.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/rb3lua9p1alo73lxubps.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/rkcx69fqsgggfg6vbz1p.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/rkpxijlxbmgpfqdv6kyr.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/rpm3pegprolzskhkhnhm.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/stvdct4oecxtoa2rhcrh.avif',
            'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/vqq6tpluwtravxcvmedp.avif'
        ];

        // Pre-check images and remove broken ones
        function checkImages() {
            const validImages = [];
            let checkedCount = 0;
            const targetImage = 'https://raw.githubusercontent.com/stevenhinkel11/leadingedgeteambuilding-/Images/IMG_0703.avif';
            
            imageUrls.forEach((url, index) => {
                const img = new Image();
                img.onload = function() {
                    validImages.push(url);
                    checkedCount++;
                    if (checkedCount === imageUrls.length) {
                        imageUrls.length = 0;
                        imageUrls.push(...validImages);
                        
                        // Ensure IMG_0703.avif is at index 0
                        const targetIndex = imageUrls.indexOf(targetImage);
                        if (targetIndex > 0) {
                            // Move IMG_0703.avif to the front
                            imageUrls.splice(targetIndex, 1);
                            imageUrls.unshift(targetImage);
                        }
                        
                        // Shuffle the rest (skip index 0)
                        for (let i = imageUrls.length - 1; i > 1; i--) {
                            const j = Math.floor(Math.random() * (i - 1)) + 1;
                            [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
                        }
                        
                        start = 0; // Reset start position
                        render();
                        startAuto();
                    }
                };
                img.onerror = function() {
                    console.log('Removing broken image:', url);
                    checkedCount++;
                    if (checkedCount === imageUrls.length) {
                        imageUrls.length = 0;
                        imageUrls.push(...validImages);
                        
                        // Ensure IMG_0703.avif is at index 0
                        const targetIndex = imageUrls.indexOf(targetImage);
                        if (targetIndex > 0) {
                            // Move IMG_0703.avif to the front
                            imageUrls.splice(targetIndex, 1);
                            imageUrls.unshift(targetImage);
                        }
                        
                        // Shuffle the rest (skip index 0)
                        for (let i = imageUrls.length - 1; i > 1; i--) {
                            const j = Math.floor(Math.random() * (i - 1)) + 1;
                            [imageUrls[i], imageUrls[j]] = [imageUrls[j], imageUrls[i]];
                        }
                        
                        start = 0; // Reset start position
                        render();
                        startAuto();
                    }
                };
                img.src = url;
            });
        }
        
        // Start checking images
        checkImages();

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
                for (let i = 0; i < currentVisibleCount && i < imageUrls.length; i++) {
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

    // Activity Card Expand/Collapse - DISABLED (now using ellipses buttons)
}); 