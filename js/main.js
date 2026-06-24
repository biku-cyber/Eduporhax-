// ===== Loader =====
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader')?.classList.add('hide'), 500);
});

// ===== AOS =====
if (window.AOS) AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });

// ===== Theme toggle =====
const themeBtn = document.getElementById('themeToggle');
const saved = localStorage.getItem('ph-theme');
if (saved) document.body.dataset.theme = saved;
themeBtn?.addEventListener('click', () => {
  const next = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  document.body.dataset.theme = next;
  themeBtn.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('ph-theme', next);
});
if (themeBtn) themeBtn.textContent = document.body.dataset.theme === 'dark' ? '🌙' : '☀️';

// ===== Cursor blob =====
const blob = document.getElementById('cursorBlob');
if (blob && window.matchMedia('(pointer:fine)').matches) {
  let x = 0, y = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  const loop = () => { x += (tx - x) * 0.12; y += (ty - y) * 0.12; blob.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`; requestAnimationFrame(loop); };
  loop();
}

// ===== Animated counters =====
const counters = document.querySelectorAll('[data-count]');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.count, dur = 1600, start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    io.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(c => io.observe(c));

// ===== GSAP hero =====
if (window.gsap) {
  gsap.from('.hero-title .line', { y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.4 });
  gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 0.9, delay: 1, ease: 'power3.out' });
  gsap.from('.hero-cta .btn', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1, delay: 1.2 });
}

// ===== Chart =====
const ctx = document.getElementById('studyChart');
if (ctx && window.Chart) {
  const grad = ctx.getContext('2d').createLinearGradient(0, 0, 0, 280);
  grad.addColorStop(0, 'rgba(124,92,255,.65)');
  grad.addColorStop(1, 'rgba(124,92,255,0)');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্ৰ', 'শনি', 'দেও'],
      datasets: [{
        label: 'ঘণ্টা', data: [3.2, 4.5, 2.8, 5.1, 4.2, 6.0, 5.4],
        borderColor: '#7c5cff', backgroundColor: grad, borderWidth: 3, fill: true, tension: 0.4,
        pointBackgroundColor: '#22d3ee', pointRadius: 5, pointHoverRadius: 7,
      }]
    },
    options: {
      responsive: true, plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#9ca3c7' } },
        y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#9ca3c7' } }
      }
    }
  });
}
