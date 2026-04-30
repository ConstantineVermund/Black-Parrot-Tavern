const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const filterButtons = document.querySelectorAll('[data-filter]');
const menuCards = document.querySelectorAll('[data-category]');
const lightboxRoot = document.querySelector('[data-lightbox-root]');
const lightboxImg = document.querySelector('[data-lightbox-img]');
const lightboxCaption = document.querySelector('[data-lightbox-caption]');
const lightboxClose = document.querySelector('[data-lightbox-close]');

function setHeaderState() {
  header.classList.toggle('is-scrolled', window.scrollY > 16);
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    menuCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = caption || 'Image';
  lightboxCaption.textContent = caption || '';
  lightboxRoot.classList.add('is-open');
  lightboxRoot.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxRoot.classList.remove('is-open');
  lightboxRoot.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    openLightbox(button.dataset.lightbox, button.dataset.caption);
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightboxRoot?.addEventListener('click', (event) => {
  if (event.target === lightboxRoot) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightboxRoot.classList.contains('is-open')) {
    closeLightbox();
  }
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
