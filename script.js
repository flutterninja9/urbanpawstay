// ============================================
// URBAN PAW STAY — JAVASCRIPT
// ============================================

// --- Copyright Year ---
document.getElementById('footer-year').textContent = new Date().getFullYear();

// --- Sticky Nav ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// --- Fade-up on scroll ---
const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// --- Stagger step animations in How It Works ---
const steps = document.querySelectorAll('.step');
steps.forEach((step, i) => {
  step.style.transitionDelay = `${i * 0.1}s`;
  step.classList.add('fade-up');
  observer.observe(step);
});

function initFAQ() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach(item => {
    const btn = item.querySelector('.faq__q');
    const wrap = item.querySelector('.faq__a-wrap');
    if (!btn || !wrap) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all items
      items.forEach(i => {
        i.classList.remove('open');
        const b = i.querySelector('.faq__q');
        const w = i.querySelector('.faq__a-wrap');
        if (b) b.setAttribute('aria-expanded', 'false');
        if (w) { w.style.maxHeight = null; w.setAttribute('aria-hidden', 'true'); }
      });

      // Open the clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        wrap.style.maxHeight = wrap.scrollHeight + 'px';
        wrap.setAttribute('aria-hidden', 'false');
      }
    });
  });
}

initFAQ();
