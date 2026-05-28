(function () {
  const root = document.getElementById("eventsTimeline");
  if (!root || !window.IA_DATA) return;

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const isExternal = (url) => /^https?:\/\//i.test(url);
  let currentYear = "";

  function linkHTML(link) {
    const external = link.external || isExternal(link.url);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a class="ia-btn ia-btn-ghost" href="${escapeHTML(link.url)}"${attrs}>${escapeHTML(link.label)}</a>`;
  }

  root.innerHTML = window.IA_DATA.activities
    .map((activity) => {
      const year = activity.date.slice(0, 4);
      const yearLabel =
        year !== currentYear
          ? `<div class="ia-text-primary mb-2 mt-2 text-sm font-bold">${escapeHTML(year)}</div>`
          : "";
      currentYear = year;

      const links = activity.links.length
        ? `<div class="mt-5 flex flex-wrap gap-3">${activity.links.map(linkHTML).join("")}</div>`
        : "";

      return `
        ${yearLabel}
        <article class="ia-timeline-item">
          <div class="ia-timeline-card">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div class="ia-date">${escapeHTML(activity.date)}</div>
                <h2 class="ia-text-ink mt-2 text-xl font-bold leading-snug">${escapeHTML(activity.title)}</h2>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="ia-tag">${escapeHTML(activity.type)}</span>
                <span class="ia-tag ia-tag-warm">${escapeHTML(activity.status)}</span>
              </div>
            </div>
            <p class="ia-text-muted mt-4 text-sm leading-7">${escapeHTML(activity.description)}</p>
            ${links}
          </div>
        </article>
      `;
    })
    .join("");
})();
