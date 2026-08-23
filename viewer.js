const slides = Array.from(document.querySelectorAll('.slide'));
const currentLabel = document.querySelector('[data-current-slide]');
const countLabel = document.querySelector('[data-slide-count]');
let currentIndex = 0;

countLabel.textContent = String(slides.length);

function fitSlides() {
  const horizontalPadding = window.innerWidth < 720 ? 24 : 64;
  const scale = Math.min(1, (window.innerWidth - horizontalPadding) / 1600);
  document.documentElement.style.setProperty('--preview-scale', scale.toFixed(4));
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - 1));
  slides[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
  currentLabel.textContent = String(currentIndex + 1);
}

document.querySelector('[data-direction="previous"]').addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

document.querySelector('[data-direction="next"]').addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    event.preventDefault();
    goToSlide(currentIndex - 1);
  }

  if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
    event.preventDefault();
    goToSlide(currentIndex + 1);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    currentIndex = slides.indexOf(visible.target);
    currentLabel.textContent = String(currentIndex + 1);
  },
  { threshold: [0.35, 0.6, 0.85] },
);

slides.forEach((slide) => observer.observe(slide));
window.addEventListener('resize', fitSlides);
fitSlides();
