/* ================================================
   UniHub — Shared Sidebar Injector
   يُولّد الـ Sidebar تلقائياً في كل الصفحات
   ================================================ */

const SIDEBAR_NAV = [
  {
    id: 'home',
    label: 'الرئيسية',
    href: 'home.html',
    icon: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`
  },
  {
    id: 'results',
    label: 'النتائج وأعمال السنة',
    href: 'results.html',
    icon: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    children: [
      { label: 'المعدل التراكمي', href: 'grades.html' },
      { label: 'أعمال السنة',      href: 'coursework.html' }
    ]
  },
  {
    id: 'registration',
    label: 'تسجيل المواد',
    href: 'registration.html',
    icon: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`
  },
  {
    id: 'attendance',
    label: 'تسجيل الحضور',
    href: 'attendance.html',
    icon: `<polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>`
  },
  {
    id: 'absences',
    label: 'تفاصيل الغياب',
    href: 'absences.html',
    icon: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`
  },
  {
    id: 'military',
    label: 'التربية العسكرية',
    href: 'military.html',
    icon: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    children: [
      { label: 'حجز تربية عسكرية',     href: 'military.html' },
      { label: 'نتائج التربية العسكرية', href: 'military-results.html' }
    ]
  },
  {
    id: 'books',
    label: '(تجريبي) منصة الكتب',
    icon: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
    badge: 'تجريبي',
    children: [
      { label: 'تصفح الكتب', href: 'books.html' }
    ]
  },
  {
    id: 'lectures',
    label: 'محاضراتي',
    icon: `<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>`,
    children: [
      { label: 'تصفح المحاضرات', href: 'lectures.html' }
    ]
  }
];

function buildSidebar() {
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';

  function svgIcon(path) {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      ${path}</svg>`;
  }

  // Determine active item
  function isActive(href) {
    return href === currentPage;
  }
  function hasActiveChild(item) {
    return item.children && item.children.some(c => c.href === currentPage);
  }

  let navHTML = '';
  SIDEBAR_NAV.forEach(item => {
    if (item.type === 'divider') {
      navHTML += `<div class="nav-divider"><span class="nav-divider-label">${item.label}</span></div>`;
      return;
    }

    // active: exact page match (but NOT if this item has children — it's a toggle, not a link)
    const active     = !item.children && isActive(item.href);
    const childActive = hasActiveChild(item);
    // If current page matches both the parent href AND a child href, prefer childActive
    const openClass   = (childActive || (item.children && isActive(item.href))) ? ' open' : '';
    const activeClass = active ? ' active' : '';

    if (item.children) {
      navHTML += `
        <div class="nav-item${openClass}${active ? ' active' : ''}" onclick="toggleSub(this)">
          <span class="nav-icon">${svgIcon(item.icon)}</span>
          <span class="nav-label">${item.label}</span>
          ${item.badge ? `<span class="nav-chip">${item.badge}</span>` : ''}
          <span class="nav-arrow">▾</span>
        </div>
        <div class="nav-submenu${childActive ? ' open' : ''}">
          ${item.children.map(c => `
            <a href="${c.href}" class="nav-subitem${isActive(c.href) ? ' active' : ''}">${c.label}</a>
          `).join('')}
        </div>`;
    } else {
      navHTML += `
        <a href="${item.href}" class="nav-item${activeClass}" ${active ? 'aria-current="page"' : ''}>
          <span class="nav-icon">${svgIcon(item.icon)}</span>
          <span class="nav-label">${item.label}</span>
          ${item.badge ? `<span class="nav-chip">${item.badge}</span>` : ''}
        </a>`;
    }
  });

  // Get user data
  let user = { name: 'أحمد محمود', id: '29990001' };
  try { const u = JSON.parse(sessionStorage.getItem('unihub_user') || '{}'); if (u.name) user = u; } catch(e) {}

  const sidebarHTML = `
    <aside class="sidebar" id="sidebar" aria-label="القائمة الرئيسية">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <div class="sidebar-logo">
            <img src="https://epnu.edu.eg/wp-content/uploads/2024/01/epnu-logo.png" alt="EPNU"
              onerror="this.parentElement.innerHTML='<span class=sidebar-logo-placeholder>E</span>'" />
          </div>
          <div>
            <div class="sidebar-title">UniHub</div>
            <div class="sidebar-subtitle">EPNU Student Portal</div>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">${navHTML}</nav>

      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-avatar">${user.name ? user.name.charAt(0) : 'م'}</div>
          <div class="sidebar-user-info">
            <div class="sidebar-user-name">${user.name || 'أحمد محمود'}</div>
            <div class="sidebar-user-id">${user.id || '29990001'}</div>
          </div>
          <a href="login.html" title="تسجيل الخروج" style="color:var(--text-muted);flex-shrink:0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </a>
        </div>
      </div>
    </aside>
    <div class="sidebar-overlay" id="sidebar-overlay" onclick="closeSidebar()"></div>`;

  // Inject
  const mount = document.getElementById('sidebar-mount');
  if (mount) {
    mount.outerHTML = sidebarHTML;
    // Notify other scripts that sidebar is ready
    document.dispatchEvent(new CustomEvent('sidebarReady'));
  }
}

// Build on DOM ready
document.addEventListener('DOMContentLoaded', buildSidebar);
