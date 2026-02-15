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
      // Toggles the 'active' class for the 'X' animation and showing the menu
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent background scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });

    // Close menu when a link is clicked (important for navigating back to Home)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 3. Scroll Reveal Animation for Videos and Cards
  // This looks for all cards, video grids, and tour items
  const revealElements = document.querySelectorAll('.card, .video-grid, .tour-item');
  
  // Add the 'reveal' class to elements automatically
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop observing once the animation has triggered
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15 // Triggers when 15% of the element is on screen
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
