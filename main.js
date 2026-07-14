document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();

  // ===== Theme (dark/light) =====
  const root = document.documentElement;
  const storedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');
  if (initialTheme === 'light') root.setAttribute('data-theme', 'light');

  function updateToggleIcons(theme){
    document.querySelectorAll('.theme-toggle .knob').forEach(knob => {
      knob.innerHTML = theme === 'light'
        ? '<i data-lucide="sun" class="w-3.5 h-3.5"></i>'
        : '<i data-lucide="moon" class="w-3.5 h-3.5"></i>';
    });
    lucide.createIcons();
  }
  updateToggleIcons(initialTheme);

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isLight = root.getAttribute('data-theme') === 'light';
      const next = isLight ? 'dark' : 'light';
      if (next === 'light') root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      localStorage.setItem('theme', next);
      updateToggleIcons(next);
    });
  });

  // ===== Nav scroll state =====
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ===== Scroll progress bar =====
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ===== Cursor glow (desktop only) =====
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
      cursorGlow.classList.add('active');
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  }

  // ===== Mobile menu =====
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenu.classList.toggle('flex');
      menuBtn.innerHTML = isHidden ? '<i data-lucide="x" class="w-6 h-6"></i>' : '<i data-lucide="menu" class="w-6 h-6"></i>';
      lucide.createIcons();
    });
  }

  // ===== Typewriter (home page only) =====
  const roles = ["Front-End Developer", "WordPress Builder", "UI/UX Enthusiast", "Problem Solver"];
  const el = document.getElementById('typewriter');
  if (el) {
    let ri = 0, ci = 0, deleting = false;
    function typeLoop(){
      const current = roles[ri];
      if(!deleting){
        ci++;
        el.textContent = '"' + current.slice(0, ci) + '"';
        if(ci === current.length){
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        ci--;
        el.textContent = '"' + current.slice(0, ci) + '"';
        if(ci === 0){
          deleting = false;
          ri = (ri + 1) % roles.length;
        }
      }
      setTimeout(typeLoop, deleting ? 35 : 65);
    }
    typeLoop();
  }

  // ===== Scroll reveal (supports .reveal, .reveal-left, .reveal-right, .reveal-scale) =====
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ===== Skill bar fill on view =====
  const skillBars = document.querySelectorAll('.skill-fill');
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.width + '%';
        skillIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(b => skillIO.observe(b));

  // ===== Counter animation =====
  const counters = document.querySelectorAll('[data-counter]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const target = +entry.target.dataset.counter;
        let current = 0;
        const step = Math.max(1, target / 40);
        const tick = () => {
          current += step;
          if(current >= target){
            entry.target.textContent = target;
          } else {
            entry.target.textContent = Math.floor(current);
            requestAnimationFrame(tick);
          }
        };
        tick();
        counterIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterIO.observe(c));

  // ===== Contact form (contact page only) — no backend, so show a friendly confirmation =====
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formMessage.textContent = "Thanks — this form isn't wired to a server yet, so please email me directly using the address above and I'll get back to you.";
      formMessage.classList.add('show');
    });
  }

  // ===== Footer year =====
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
