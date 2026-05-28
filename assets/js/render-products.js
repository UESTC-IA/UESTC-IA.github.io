(function () {
  const root = document.getElementById("productsRoot");
  if (!root || !window.IA_DATA) return;

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const isExternal = (url) => /^https?:\/\//i.test(url);

  function linkHTML(link) {
    const attrs = link.external || isExternal(link.url) ? ' target="_blank" rel="noopener noreferrer"' : "";
    const variant = link.primary ? "ia-btn ia-btn-primary" : "ia-btn ia-btn-ghost";
    return `<a class="${variant}" href="${escapeHTML(link.url)}"${attrs}>${escapeHTML(link.label)}</a>`;
  }

  function productCard(product, index) {
    const links = product.links?.length
      ? `<div class="product-actions">${product.links.map(linkHTML).join("")}</div>`
      : "";
    const tags = product.tags?.length
      ? `<div class="product-tags">${product.tags.map((tag) => `<span class="ia-tag">${escapeHTML(tag)}</span>`).join("")}</div>`
      : "";

    return `
      <article class="product-card ${index === 0 ? "product-card-featured" : ""}">
        <div class="product-card-topline">
          <span>${escapeHTML(product.stage)}</span>
          <span>${String(index + 1).padStart(2, "0")}</span>
        </div>
        <h2>${escapeHTML(product.name)}</h2>
        <p>${escapeHTML(product.intro)}</p>
        ${tags}
        ${links}
      </article>
    `;
  }

  root.innerHTML = `
    <section class="product-board" aria-label="产品宣传列表">
      ${window.IA_DATA.products.map(productCard).join("")}
    </section>
  `;
})();
