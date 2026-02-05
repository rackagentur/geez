// script.js - Enhanced site functionality
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // 2. Smooth Scrolling for Navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Dynamic Copyright Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 4. Interactive Elements - Hover Effects
    document.querySelectorAll('.btn, .card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-2px)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });

    // 5. Image Gallery Lightbox (Simple version)
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.background = 'rgba(0,0,0,0.8)';
            lightbox.style.zIndex = '1000';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.cursor = 'pointer';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.maxWidth = '90%';
            lightboxImg.style.maxHeight = '90%';
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
        });
    });

    // 6. Progressive Form Submission
    const contactForm = document.querySelector('.inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.8';
            
            setTimeout(() => {
                // Reset button and show success state
                submitBtn.textContent = originalText;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = 'var(--gold)';
                submitBtn.textContent = '✓ Message Sent!';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.style.background = '';
                    submitBtn.textContent = originalText;
                }, 3000);
            }, 1500);
        });
    }

    // 7. Automatic Header Background Change
    const header = document.querySelector('.sticky-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15,15,18,0.98)';
            } else {
                header.style.background = 'rgba(15,15,18,0.95)';
            }
        });
    }
});

// 8. Consent-based Cookie Banner (Minimal version)
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.style.position = 'fixed';
        banner.style.bottom = '0';
        banner.style.left = '0';
        banner.style.right = '0';
        banner.style.background = 'rgba(18, 18, 20, 0.9)';
        banner.style.color = 'var(--ink)';
        banner.style.padding = '16px';
        banner.style.zIndex = '2000';
        banner.style.display = 'flex';
        banner.style.flexWrap = 'wrap';
        banner.style.gap = '16px';
        banner.style.alignItems = 'center';
        banner.style.justifyContent = 'center';
        banner.style.textAlign = 'center';
        
        banner.innerHTML = `
            <div>This site uses minimal cookies for functionality. No tracking or ads.</div>
            <button id="acceptCookies" style="padding:8px 16px; background:var(--gold); color:var(--bg); border:none; border-radius:6px; cursor:pointer;">Accept</button>
        `;
        
        document.body.appendChild(banner);
        
        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', true);
            document.body.removeChild(banner);
        });
    }
});
