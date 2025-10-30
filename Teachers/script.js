document.addEventListener('DOMContentLoaded', () => {
  // Select the stats section
  const statsSection = document.querySelector('#stats');
  // Select all counters inside it
  const counters = statsSection.querySelectorAll('.counter');

  // Function to start counter animation
  const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const duration = 3000; // animation time in ms
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = Math.floor(progress * target);
      counter.innerText = currentValue;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.innerText = target; // ensure final value
      }
    };

    requestAnimationFrame(animate);
  };

  // Use IntersectionObserver so counters start when visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        obs.unobserve(entry.target); // run only once
      }
    });
  }, { threshold: 0.5 });

  // Observe each counter
  counters.forEach(counter => observer.observe(counter));
});
