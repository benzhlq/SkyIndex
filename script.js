document.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('splash-logo');
  const splash = document.getElementById('splash');
  if (!logo || !splash) return;

  // Wait exactly 1 second on initial load, then start the reveal animation
  setTimeout(() => {
    // add class that triggers CSS keyframe reveal
    logo.classList.add('animate');

    // Timings should match CSS durations for a smooth sequence
    const revealDuration = 900; // matches animation duration in ms
    const holdDuration = 600; // brief hold before fading out
    const fadeDelay = revealDuration + holdDuration;

    setTimeout(() => {
      // fade the full splash overlay to reveal the main site
      splash.classList.add('fade-out');

      // remove from DOM after fade completes to ensure aria-hidden content removed
      splash.addEventListener('transitionend', () => {
        try { localStorage.setItem('seenIntro', '1'); } catch (e) {}
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, { once: true });
    }, fadeDelay);

  }, 1000); // exact 1s delay as requested

  // Dropdown menu toggle
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.nav-btn');
    if (!btn) return;
    
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
      // Close other dropdowns
      dropdowns.forEach(other => {
        if (other !== dropdown) other.classList.remove('active');
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('active'));
  });
});
