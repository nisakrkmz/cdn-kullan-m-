// Mobil menü aç/kapat
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Tema değiştir (light/dark) + kalıcılık
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;
const THEME_KEY = 'pref-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.textContent = '🌙';
  } else {
    root.removeAttribute('data-theme');
    if (themeToggle) themeToggle.textContent = '🌞';
  }
}

const saved = localStorage.getItem(THEME_KEY);
applyTheme(saved || 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
}

// Yumuşak kaydırma
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (navLinks && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Yıl otomatik
const yilEl = document.getElementById('yil');
if (yilEl) yilEl.textContent = new Date().getFullYear();

// Basit form sahte gönderim
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    const ad = form.querySelector('input[name="ad"]');
    const email = form.querySelector('input[name="email"]');
    const mesaj = form.querySelector('textarea[name="mesaj"]');
    if (ad && email && mesaj) {
      alert('Mesajınız alındı. Teşekkürler!');
      ad.value = '';
      email.value = '';
      mesaj.value = '';
    }
  });
}