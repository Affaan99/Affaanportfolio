/**
 * Editorial Portfolio - Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveals Using Intersection Observer
    const reveals = document.querySelectorAll('.reveal, .stagger-reveal');
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // If staggered reveal child elements
                if (entry.target.classList.contains('stagger-reveal')) {
                    const children = entry.target.querySelectorAll('p, .stat-box, .ed-title');
                    children.forEach((child, index) => {
                        child.style.opacity = '0';
                        child.style.transform = 'translateY(20px)';
                        child.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
                        
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, 50);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 2. Parallax effect & Navbar scroll state
    const heroPortrait = document.querySelector('.hero-portrait-layer');
    const heroGiantText = document.querySelector('.giant-marquee-container');
    const heroNav = document.querySelector('.hero-nav');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Navbar scrolled state
        if (heroNav) {
            if (scrolled > 50) {
                heroNav.classList.add('scrolled');
            } else {
                heroNav.classList.remove('scrolled');
            }
        }
        
        // Only run if we are near the top of the page
        if (scrolled < window.innerHeight) {
            // Subtle parallax for the portrait (moves up slower than scrolling)
            if (heroPortrait) heroPortrait.style.transform = `translate3d(-50%, ${scrolled * 0.15}px, 0)`;
            
            // Subtle parallax for giant text (moves up slightly faster)
            if (heroGiantText) {
                heroGiantText.style.transform = `translate3d(0, calc(-50% + ${scrolled * 0.05}px), 0)`;
            }
        }
    });

    // 3. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // 6. Magnetic Form Interaction
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Very subtle pull (0.05) so inputs remain clickable
            btn.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) scale(1.01)`;
            
            const btnText = btn.querySelector('.fc-title');
            if (btnText) {
                btnText.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
            const btnText = btn.querySelector('.fc-title');
            if (btnText) {
                btnText.style.transform = 'translate(0px, 0px)';
            }
        });
    });

    // 7. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('fc-name').value;
            const email = document.getElementById('fc-email').value;
            const topic = document.getElementById('fc-topic').value;
            
            const subject = encodeURIComponent(`Portfolio Inquiry: ${topic}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nHi Mohammed,\n\n`);
            
            const mailtoLink = `mailto:mohdaffaan999@gmail.com?subject=${subject}&body=${body}`;
            
            window.location.href = mailtoLink;
            
            setTimeout(() => contactForm.reset(), 500);
        });
    }
});

