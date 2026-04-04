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
  if (Number.isNaN(target) || target <= 0) {
    return;
  }

  let current = 0;
  const duration = 900;
  const stepTime = Math.max(28, Math.floor(duration / target));

  const timer = setInterval(() => {
    current += 1;
    el.textContent = String(current);
    if (current >= target) {
      clearInterval(timer);
    }
  }, stepTime);
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
