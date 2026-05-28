(function () {
  const scriptEl = document.currentScript;
  const src = scriptEl ? scriptEl.getAttribute("src") || "" : "";
  const marker = "assets/js/main.js";
  const basePath = document.body?.dataset.basePath || (src.includes(marker) ? src.slice(0, src.indexOf(marker)) : "");

  const navItems = [
    { label: "首页", href: "index.html" },
    { label: "社团活动", href: "events.html" },
    { label: "产品宣传", href: "projects.html" },
    { label: "合作与导师", href: "partners.html" },
    { label: "核心成员", href: "members.html" },
  ];

  function href(path) {
    return `${basePath}${path}`;
  }

  function currentFile() {
    const path = window.location.pathname;
    const file = path.endsWith("/") ? "index.html" : path.split("/").pop();
    return file || "index.html";
  }

  function isActive(item) {
    const path = window.location.pathname;
    if (item.href === "events.html" && path.includes("/events/")) return true;
    if (item.href === "partners.html" && path.includes("/partners/")) return true;
    return currentFile() === item.href;
  }

  function renderNavLinks(kind) {
    return navItems
      .map((item) => {
        const activeClass = isActive(item) ? " is-active" : "";
        const aria = isActive(item) ? ' aria-current="page"' : "";
        if (kind === "mobile") {
          return `<a href="${href(item.href)}" class="ia-mobile-link${activeClass}"${aria}>${item.label}</a>`;
        }
        return `<a href="${href(item.href)}" class="nav-link text-sm font-semibold${activeClass}"${aria}>${item.label}</a>`;
      })
      .join("");
  }

  function insertNavbar() {
    const navbarHTML = `
      <nav class="ia-navbar fixed top-0 z-50 w-full">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="${href("index.html")}" class="flex items-center gap-3" aria-label="UESTC IA 首页">
            <img src="${href("assets/images/logo.png")}" class="ia-brand-mark" alt="UESTC IA Logo" onerror="this.style.display='none'">
            <span class="ia-text-ink text-lg font-bold">UESTC IA</span>
          </a>

          <div class="hidden items-center gap-7 md:flex">
            ${renderNavLinks("desktop")}
          </div>

          <button id="mobile-menu-btn" class="ia-btn ia-btn-ghost h-10 w-10 p-0 md:hidden" type="button" aria-label="打开导航菜单" aria-controls="mobile-menu" aria-expanded="false">
            <svg id="icon-menu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg id="icon-close" xmlns="http://www.w3.org/2000/svg" class="hidden h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div id="mobile-menu" class="ia-navbar hidden border-t md:hidden">
          <div class="flex flex-col gap-1 px-4 py-4">
            ${renderNavLinks("mobile")}
          </div>
        </div>
      </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
  }

  function bindNavbar() {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const iconMenu = document.getElementById("icon-menu");
    const iconClose = document.getElementById("icon-close");

    if (!btn || !menu || !iconMenu || !iconClose) return;

    const setOpen = (open) => {
      menu.classList.toggle("hidden", !open);
      iconMenu.classList.toggle("hidden", open);
      iconClose.classList.toggle("hidden", !open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "关闭导航菜单" : "打开导航菜单");
    };

    btn.addEventListener("click", () => {
      setOpen(menu.classList.contains("hidden"));
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  function bindRipple() {
    document.addEventListener("click", (event) => {
      const button = event.target.closest(".ia-btn");
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ia-ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    });
  }

  function insertFooter() {
    if (document.body.dataset.noFooter === "true") return;

    const footerHTML = `
      <footer class="ia-footer">
        <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-10 sm:px-6 lg:px-8">
          <div>
            <div class="ia-text-ink font-bold">UESTC Interdisciplinary Association</div>
            <div class="mt-1 text-xs">电子科技大学交叉学科协会 © 2026</div>
          </div>
        </div>
      </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHTML);
  }

  function bindCopyButtons() {
    document.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-copy]");
      if (!btn) return;

      const text = btn.dataset.copy;
      const toast = btn.querySelector(".home-contact-copy-toast");

      // Copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }

      // Show toast animation
      if (toast) {
        toast.classList.remove("is-visible");
        // Force reflow to restart animation
        void toast.offsetWidth;
        toast.classList.add("is-visible");
        toast.addEventListener("animationend", () => {
          toast.classList.remove("is-visible");
        }, { once: true });
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    insertNavbar();
    bindNavbar();
    bindRipple();
    bindCopyButtons();
    insertFooter();
  });
})();
