document.addEventListener('DOMContentLoaded', () => {
  const links = [
    { href: 'index.html', label: '首页' },
    { href: 'partners.html', label: '合作与导师' },
    { href: 'research.html', label: '研究方向' },
    { href: 'events.html', label: '活动' },
    { href: 'projects.html', label: '项目' }
  ];

  const entryScript = document.querySelector('script[src*="assets/js/main.js"]');
  const srcAttr = entryScript ? entryScript.getAttribute('src') || '' : '';
  const basePrefix = srcAttr.startsWith('../') ? '../' : '';

  const resolveHref = (href) => `${basePrefix}${href}`;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navDesktop = links
    .map((item) => {
      const current = currentPage === item.href ? ' aria-current="page"' : '';
      return `<a href="${resolveHref(item.href)}" class="nav-link text-sm font-semibold"${current}>${item.label}</a>`;
    })
    .join('');

  const navMobile = links
    .map((item) => {
      const current = currentPage === item.href ? ' aria-current="page"' : '';
      return `<a href="${resolveHref(item.href)}" class="block px-4 py-3 rounded-xl text-[15px] font-semibold nav-link"${current}>${item.label}</a>`;
    })
    .join('');

  const navbarHTML = `
    <nav class="fixed top-0 left-0 right-0 z-50 nav-shell transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="h-16 flex items-center justify-between gap-4">
          <a href="${resolveHref('index.html')}" class="flex items-center gap-3">
            <img src="${resolveHref('assets/images/logo.png')}" alt="UESTC IA Logo" class="w-9 h-9 rounded-full object-cover border border-cyan-300/40 shadow-md">
            <div>
              <p class="nav-brand text-sm font-bold text-slate-800 leading-none">UESTC IA</p>
              <p class="text-[11px] text-slate-500 leading-none mt-1">Interdisciplinary Association</p>
            </div>
          </a>

          <div class="hidden md:flex items-center gap-7">${navDesktop}
            <a href="${resolveHref('join.html')}" class="btn btn-primary">加入我们</a>
          </div>

          <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg border border-cyan-100/70 bg-white/70 text-slate-700" aria-label="切换导航菜单" aria-expanded="false" aria-controls="mobile-menu">
            <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="mobile-menu-panel hidden md:hidden absolute top-16 left-0 right-0 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 py-4">${navMobile}
          <a href="${resolveHref('join.html')}" class="btn btn-primary w-full mt-2">加入我们</a>
        </div>
      </div>
    </nav>
  `;

  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  const footerHTML = `
    <footer class="site-footer py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p class="text-en text-sm font-semibold tracking-[0.18em] text-slate-200">UESTC IA</p>
          <p class="text-xs text-slate-300/80 mt-1">电子科技大学交叉学科协会 · 2026</p>
        </div>
        <div class="flex items-center gap-5 text-sm text-slate-300">
          <a href="${resolveHref('join.html')}" class="hover:text-white transition-colors">加入我们</a>
          <a href="${resolveHref('partners.html')}" class="hover:text-white transition-colors">合作联系</a>
        </div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('beforeend', footerHTML);

  const menuBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  if (menuBtn && menu && iconMenu && iconClose) {
    menuBtn.addEventListener('click', () => {
      const isHidden = menu.classList.toggle('hidden');
      iconMenu.classList.toggle('hidden', !isHidden);
      iconClose.classList.toggle('hidden', isHidden);
      menuBtn.setAttribute('aria-expanded', String(!isHidden));
    });

    menu.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.tagName === 'A') {
        menu.classList.add('hidden');
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
