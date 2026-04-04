const revealElements = document.querySelectorAll('.reveal-up');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((item) => observer.observe(item));

const counterElements = document.querySelectorAll('[data-counter]');

const animateCounter = (el) => {
  const target = Number(el.dataset.counter);
  if (Number.isNaN(target) || target <= 0) return;

  const duration = 900;
  const frameInterval = 28;
  const totalFrames = Math.ceil(duration / frameInterval);
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    // easeOutQuart for a snappy feel
    const eased = 1 - Math.pow(1 - Math.min(progress, 1), 4);
    el.textContent = String(Math.min(Math.round(eased * target), target));
    if (frame >= totalFrames) {
      el.textContent = String(target);
      clearInterval(timer);
    }
  }, frameInterval);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

counterElements.forEach((item) => counterObserver.observe(item));
