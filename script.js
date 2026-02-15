document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const yearSpan = document.getElementById('y');

  // 1. Set current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Toggle Mobile Menu and Hamburger Animation
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 3. Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.card, .video-grid, .tour-item');
  
  // Add the 'reveal' class to elements you want to animate
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once it's revealed, we can stop observing it
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Triggers when 15% of the element is visible
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
