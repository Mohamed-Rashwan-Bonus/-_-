/* ================================================
   UniHub — Shared Topbar (Dark Mode + Search + User Dropdown)
   ================================================ */

function buildTopbar() {
  const mount = document.getElementById('topbar-mount');
  if (!mount) return;

  let user = { name: 'أحمد محمود', id: '29990001', role: 'طالب' };
  try {
    const u = JSON.parse(sessionStorage.getItem('unihub_user') || '{}');
    if (u.name) user = { ...user, ...u };
  } catch(e) {}

  const initial = user.name ? user.name.charAt(0) : 'م';

  const path = window.location.pathname;
  const showSearch = path.includes('home.html') || path.includes('coursework.html') || path.includes('books.html');

  const html = `
  <header class="topbar">
    <!-- Hamburger -->
    <button class="topbar-icon-btn" onclick="toggleSidebar()" aria-label="فتح القائمة">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2.5">
        <line x1="3" y1="12" x2="21" y2="12"/>
        <line x1="3" y1="6"  x2="21" y2="6"/>
        <line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

    ${showSearch ? `
    <!-- Search bar -->
    <div class="topbar-search">
      <span class="topbar-search-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </span>
      <input type="search" class="topbar-search-input" placeholder="ابحث..." aria-label="بحث" />
    </div>` : '<div style="flex:1;"></div>'}

    <!-- Right actions -->
    <div class="topbar-right">

      <!-- Dark mode toggle -->
      <button class="topbar-icon-btn" id="dark-mode-btn"
        onclick="toggleDarkMode()" aria-label="تبديل الوضع الليلي"
        title="وضع ليلي / نهاري">
        <svg id="dark-icon" width="17" height="17" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>


      <!-- User Dropdown -->
      <div class="user-dropdown" id="user-dropdown">
        <button class="user-dropdown-trigger" onclick="toggleUserDropdown()"
          aria-haspopup="true" aria-expanded="false" id="user-btn">
          <div class="sidebar-avatar" style="width:36px;height:36px;font-size:14px">
            ${initial}
          </div>
        </button>

        <div class="user-dropdown-menu" id="user-menu" role="menu">
          <!-- User info header -->
          <div class="user-dropdown-header">
            <div class="sidebar-avatar" style="width:48px;height:48px;font-size:18px;flex-shrink:0">
              ${initial}
            </div>
            <div>
              <div class="user-dropdown-name">${user.name}</div>
              <div class="user-dropdown-role">${user.role || 'طالب'}</div>
            </div>
          </div>
          <div class="user-dropdown-divider"></div>
          <a href="profile.html" class="user-dropdown-item" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            الملف الشخصي
          </a>
          <div class="user-dropdown-divider"></div>

          <a href="login.html" class="user-dropdown-item user-dropdown-logout" role="menuitem">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            تسجيل الخروج
          </a>
        </div>
      </div>

    </div>
  </header>

  <!-- Back to top button -->
  <button class="back-to-top" id="back-to-top" aria-label="العودة للأعلى"
    onclick="window.scrollTo({top:0,behavior:'smooth'})">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2.5">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  </button>`;

  mount.outerHTML = html;
  initDarkMode();
  initBackToTop();
  initClickOutside();
  initTopbarSearch(); // wire up search
}

/* ── Dark Mode ── */
function initDarkMode() {
  const saved = localStorage.getItem('unihub-theme') || 'light-theme';
  applyTheme(saved);
}

function applyTheme(theme) {
  document.documentElement.classList.remove('dark-theme', 'light-theme');
  document.documentElement.classList.add(theme);
  localStorage.setItem('unihub-theme', theme);
  const icon = document.getElementById('dark-icon');
  if (!icon) return;
  if (theme === 'dark-theme') {
    icon.innerHTML = `<circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1"  x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>`;
  } else {
    icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`;
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.classList.contains('dark-theme');
  applyTheme(isDark ? 'light-theme' : 'dark-theme');
}

/* ── Back to top ── */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });
}

/* ── User dropdown ── */
function toggleUserDropdown() {
  const menu = document.getElementById('user-menu');
  const btn  = document.getElementById('user-btn');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open);
}

function initClickOutside() {
  document.addEventListener('click', e => {
    const dd = document.getElementById('user-dropdown');
    if (dd && !dd.contains(e.target)) {
      const menu = document.getElementById('user-menu');
      if (menu) menu.classList.remove('open');
    }
  });
}

/* ── Topbar Search ── */
function initTopbarSearch() {
  const input = document.querySelector('.topbar-search-input');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.trim();
    // Dispatch custom event — pages can listen to 'topbarSearch'
    document.dispatchEvent(new CustomEvent('topbarSearch', { detail: { query: q } }));
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { input.value = ''; input.blur(); }
  });
}

document.addEventListener('DOMContentLoaded', buildTopbar);
