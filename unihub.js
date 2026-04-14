/* ================================================
   UniHub — Core JavaScript (Sidebar, Animations)
   ================================================ */

// ── Sidebar toggle (called from sidebar.js injected buttons) ──
function toggleSidebar() {
  if (window.innerWidth > 1024) {
    document.body.classList.toggle('sidebar-collapsed');
  } else {
    const s = document.getElementById('sidebar');
    if (s && s.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }
}

function openSidebar() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('sidebar-overlay');
  if (s) s.classList.add('open');
  if (o) o.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('sidebar-overlay');
  if (s) s.classList.remove('open');
  if (o) o.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Submenu toggle ──
function toggleSub(item) {
  const submenu = item.nextElementSibling;
  if (!submenu || !submenu.classList.contains('nav-submenu')) return;
  const isOpen = submenu.classList.contains('open');
  // Close all
  document.querySelectorAll('.nav-submenu.open').forEach(m => m.classList.remove('open'));
  document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) {
    submenu.classList.add('open');
    item.classList.add('open');
  }
}

// ── Keyboard support ──
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSidebar();
});

// ── Animate hero / card elements after sidebar is built ──
// sidebar.js dispatches 'sidebarReady' after injection
document.addEventListener('sidebarReady', () => {
  const selectors = [
    '.welcome-hero', '.stat-card', '.gpa-card', '.program-card',
    '.course-section', '.profile-strip', '.about-section',
    '.neu-card', '.neu-card-sm'
  ];
  const elements = document.querySelectorAll(selectors.join(','));
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }, 60 + i * 55);
  });
});

// ── تحديث سنة الـ Footer تلقائياً ──
document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  const footer = document.querySelector('.app-footer');
  if (footer) {
    footer.innerHTML = footer.innerHTML.replace(
      /Copyright © \d{4}/,
      `Copyright © ${currentYear}`
    );
  }
});
