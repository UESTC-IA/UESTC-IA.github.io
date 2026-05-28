(function () {
  const advisorsRoot = document.getElementById("advisorsGrid");
  const orgsRoot = document.getElementById("organizationsGrid");
  const partnersRoot = document.getElementById("partnersGrid");
  if (!window.IA_DATA) return;

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const isExternal = (url) => /^https?:\/\//i.test(url);
  const linkAttrs = (url) => (isExternal(url) ? ' target="_blank" rel="noopener noreferrer"' : "");

  if (advisorsRoot) {
    advisorsRoot.innerHTML = window.IA_DATA.advisors
      .map(
        (advisor) => `
          <article class="ia-card p-5">
            <div class="flex gap-4">
              <div class="ia-avatar ia-avatar-round">
                <img src="${escapeHTML(advisor.image)}" alt="${escapeHTML(advisor.name)}" onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden')">
                <span class="ia-text-primary hidden flex h-full w-full items-center justify-center text-xs font-bold">${escapeHTML(advisor.name.slice(0, 2))}</span>
              </div>
              <div class="min-w-0">
                <a class="ia-text-ink text-lg font-bold transition hover:opacity-80" href="${escapeHTML(advisor.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(advisor.name)}</a>
                <div class="ia-text-accent mt-1 text-xs font-bold uppercase">${escapeHTML(advisor.title)}</div>
              </div>
            </div>
            <p class="ia-text-muted mt-4 text-sm leading-7">${escapeHTML(advisor.description)}</p>
          </article>
        `,
      )
      .join("");
  }

  function logoTile(item) {
    const content = item.image
      ? `
        <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" onerror="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden')">
        <span class="ia-text-primary hidden text-center text-sm font-bold">${escapeHTML(item.name)}</span>
      `
      : `<span class="ia-text-primary text-center text-sm font-bold">${escapeHTML(item.name)}</span>`;

    if (!item.url) {
      return `
        <div class="ia-link-card ia-logo-tile">
          <div class="w-full">
            <div class="flex min-h-[68px] items-center justify-center">${content}</div>
            <div class="ia-text-muted mt-3 text-center text-xs font-semibold">${escapeHTML(item.type)}</div>
          </div>
        </div>
      `;
    }

    return `
      <a class="ia-link-card ia-logo-tile" href="${escapeHTML(item.url)}"${linkAttrs(item.url)} aria-label="${escapeHTML(item.name)}">
        <div class="w-full">
          <div class="flex min-h-[68px] items-center justify-center">${content}</div>
          <div class="ia-text-muted mt-3 text-center text-xs font-semibold">${escapeHTML(item.type)}</div>
        </div>
      </a>
    `;
  }

  if (orgsRoot) {
    orgsRoot.innerHTML = window.IA_DATA.organizations.map(logoTile).join("");
  }

  if (partnersRoot) {
    partnersRoot.innerHTML = window.IA_DATA.partners.map(logoTile).join("");
  }
})();
