// script.js - Enhanced site functionality with accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle with ARIA & keyboard support
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');
    
    if (mobileMenuToggle && navMenu) {
        // Initialize ARIA attributes
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'Menu');
        navMenu.setAttribute('role', 'navigation');

        // Toggle menu with accessibility support
        const toggleMenu = () => {
            const expanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            mobileMenuToggle.focus(); // Return focus after toggle
        };

        mobileMenuToggle.addEventListener('click', toggleMenu);
        mobileMenuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleMenu();
        });

        // Close menu when clicking links
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && 
                !navMenu.contains(e.target) && 
                mobileMenuToggle.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. Smooth Scrolling with accessibility focus
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu for mobile users
                if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }

                // Scroll with offset for sticky header
                const headerHeight = document.querySelector('.sticky-header').offsetHeight;
                const offset = targetId === '#top' ? 0 : headerHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Set focus on target element for accessibility
                setTimeout(() => target.focus(), 500);
            }
        });
    });

    // 3. Dynamic Copyright Year
    document.getElementById('y').textContent = new Date().getFullYear();

    // 4. Interactive Elements - Use CSS classes instead of direct styling
    const hoverElements = document.querySelectorAll('.btn, .card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('lift');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('lift');
        });
        
        // Keyboard accessibility
        element.addEventListener('focus', () => {
            element.classList.add('lift');
        });
        
        element.addEventListener('blur', () => {
            element.classList.remove('lift');
        });
    });

    // 5. Image Gallery Lightbox (Enhanced version)
    let currentLightboxImg = null;
    
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('click', (e) => {
            // Prevent image drag on mobile
            e.preventDefault();
            
            // Create reusable lightbox
            if (!document.querySelector('.lightbox')) {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.style.position = 'fixed';
                lightbox.style.top = '0';
                lightbox.style.left = '0';
                lightbox.style.width = '100%';
                lightbox.style.height = '100%';
                lightbox.style.background = 'rgba(0,0,0,0.9)';
                lightbox.style.zIndex = '1000';
                lightbox.style.display = 'flex';
                lightbox.style.alignItems = 'center';
                lightbox.style.justifyContent = 'center';
                lightbox.style.cursor = 'pointer';
                lightbox.style.opacity = '0';
                lightbox.style.transition = 'opacity 0.3s';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.className = 'lightbox-img';
                lightboxImg.style.maxWidth = '90%';
                lightboxImg.style.maxHeight = '90%';
                lightboxImg.style.transform = 'scale(0.95)';
                lightboxImg.style.transition = 'transform 0.3s';
                
                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);
                
                // Fade in effect
                setTimeout(() => {
                    lightbox.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                }, 50);
                
                // Close on click or ESC
                lightbox.addEventListener('click', closeLightbox);
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeLightbox();
                });
            }
            
            currentLightboxImg = img.src;
            document.querySelector('.lightbox-img').src = img.src;
            document.querySelector('.lightbox-img').alt = img.alt || 'Gallery image';
        });
    });

    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            lightbox.style.opacity = '0';
            document.querySelector('.lightbox-img').style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }, 300);
        }
    }

    // 6. Progressive Form Submission with accessibility
    const contactForm = document.querySelector('.inquiry-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state with ARIA
            submitBtn.textContent = 'Sending...';
            submitBtn.setAttribute('aria-busy', 'true');
            submitBtn.style.opacity = '0.8';
            
            // Simulate API call
            setTimeout(() => {
                // Reset button and show success state
                submitBtn.textContent = '✓ Message Sent!';
                submitBtn.style.background = '#4CAF50';
                submitBtn.style.opacity = '1';
                submitBtn.removeAttribute('aria-busy');
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.style.background = 'var(--gold)';
                    submitBtn.textContent = originalText;
                }, 5000);
            }, 1500);
        });
    }

    // 7. Automatic Header Background Change with CSS classes
    const header = document.querySelector('.sticky-header');
    if (header) {
        const scrollHandler = () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        
        window.addEventListener('scroll', scrollHandler);
        scrollHandler(); // Initial check
    }

    // 8. Enhanced Consent-based Cookie Banner
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie Consent');
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
            <div class="cookie-text">
                This site uses essential cookies for functionality. No tracking or ads.
                <a href="/datenschutz.html" class="cookie-link" tabindex="0">Learn more</a>
            </div>
            <button id="acceptCookies" class="cookie-accept" aria-label="Accept cookies">
                Accept
            </button>
        `;
        
        document.body.appendChild(banner);
        
        // Accessibility improvements
        const cookieLink = document.querySelector('.cookie-link');
        const acceptButton = document.getElementById('acceptCookies');
        
        cookieLink.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') e.target.click();
        });
        
        acceptButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') acceptCookies();
        });
        
        function acceptCookies() {
            localStorage.setItem('cookieConsent', true);
            document.body.removeChild(banner);
        }
        
        acceptButton.addEventListener('click', acceptCookies);
    }

    // 9. Focus visible handler for interactive elements
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.querySelectorAll('a, button, input, textarea').forEach(el => {
                el.addEventListener('focus', () => {
                    el.classList.add('focus-visible');
                });
                
                el.addEventListener('blur', () => {
                    el.classList.remove('focus-visible');
                });
            });
        }
    });
});

// Add these CSS rules to your styles.css:
// .lift { transform: translateY(-2px); }
// .focus-visible { outline: 2px solid var(--gold); }
// .sticky-header.scrolled { background: rgba(15,15,18,0.98) !important; }
// .cookie-banner .cookie-link:hover { color: var(--gold); }
