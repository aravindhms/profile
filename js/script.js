document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.textContent = '☰';
            });
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = [
        { selector: '.section-title', class: 'fade-up' },
        { selector: '.timeline-item', class: 'slide-in-left' }, // Default left
        { selector: '.project-card', class: 'fade-up' },
        { selector: '.hobby-card', class: 'fade-up' },
        { selector: '.skill-icon', class: 'pop-in' }
    ];

    animatedElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach((el, index) => {
            el.classList.add('scroll-hidden', item.class);

            // Staggered delays for grids
            if (item.selector === '.project-card' || item.selector === '.hobby-card') {
                el.classList.add(`delay-${(index % 3 + 1) * 100}`);
            }

            // Alternate slide direction for timeline
            if (item.selector === '.timeline-item' && index % 2 !== 0) {
                el.classList.remove('slide-in-left');
                el.classList.add('slide-in-right');
            }

            observer.observe(el);
        });
    });

    // Add floating animation to profile photo
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.classList.add('floating');
    }
});
