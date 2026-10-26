const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const closeMenu = (returnFocus = false) => {
  nav?.classList.remove('open');
  document.body.classList.remove('nav-open');
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open navigation');
  if (toggle) toggle.querySelector('i').className = 'bi bi-list';
  if (returnFocus) toggle?.focus();
};
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('nav-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  toggle.querySelector('i').className = open ? 'bi bi-x-lg' : 'bi bi-list';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) closeMenu(true);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 991 && nav?.classList.contains('open')) closeMenu();
});

// Keep the main navigation oriented to the section currently being read.
const sectionNavMap = {
  about: 'about', services: 'services', 'sea-details': 'services',
  'air-details': 'services', containers: 'containers', gallery: 'gallery',
  network: 'network', contact: 'contact'
};
const navSections = [...document.querySelectorAll('main section[id]')]
  .filter(section => sectionNavMap[section.id]);
const navLinks = [...(nav?.querySelectorAll('a[href^="#"]') || [])];
let navUpdatePending = false;
const updateActiveNav = () => {
  const readingLine = window.scrollY + Math.min(200, window.innerHeight * 0.35);
  let activeSection = null;
  navSections.forEach(section => {
    if (section.offsetTop <= readingLine) activeSection = sectionNavMap[section.id];
  });
  navLinks.forEach(link => {
    const active = link.hash.slice(1) === activeSection;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  navUpdatePending = false;
};
window.addEventListener('scroll', () => {
  if (navUpdatePending) return;
  navUpdatePending = true;
  requestAnimationFrame(updateActiveNav);
}, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateActiveNav();
// The logo is the home control on this single-page site. Scroll to the true
// beginning, including the slim information bar above the sticky header.
document.querySelectorAll('.brand, .back-top').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (window.location.hash) history.replaceState(null, '', window.location.href.split('#')[0]);
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Add reveal classes only when the browser can actually run the observer.
// Content stays visible for older browsers, printing, and reduced-motion users.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !prefersReducedMotion.matches) {
  const revealGroups = [
    '.about-story > div', '.about-image',
    '.services .section-top > *', '.service-card', '.services-bottom',
    '.detail-section .row > div:first-child',
    '.air-image', '.air-copy h2',
    '.container-section .section-top > *', '.container-section .row > div',
    '.equipment-extra .row > div', '.equipment-air .section-heading',
    '.gallery-section .section-top > *', '.gallery-group-title', '.gallery-item',
    '.network .row > div',
    '.contact-heading',
    '.footer-lead > *', '.footer-grid > *'
  ];
  const revealTargets = document.querySelectorAll(revealGroups.join(','));
  revealTargets.forEach((element, index) => {
    element.classList.add('motion-reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 65}ms`);
  });
  document.documentElement.classList.add('motion-ready');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.04, rootMargin: '0px 0px 20px 0px' });

  revealTargets.forEach(element => revealObserver.observe(element));
}

// Keep gallery viewing inside the page instead of navigating to a raw image.
const lightbox = document.querySelector('.gallery-lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const lightboxClose = lightbox.querySelector('.lightbox-close');
  let previousFocus = null;

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      previousFocus = item;
      lightboxImage.src = item.href;
      lightboxImage.alt = item.querySelector('img')?.alt || 'WayFare Freight gallery image';
      lightboxCaption.textContent = item.querySelector('span')?.textContent || '';
      lightbox.showModal();
      document.body.classList.add('lightbox-open');
      lightboxClose.focus();
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    previousFocus?.focus();
  });
}
