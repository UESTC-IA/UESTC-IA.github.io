(function () {
  const root = document.getElementById("membersRoot");
  if (!root || !window.IA_DATA) return;

  const escapeHTML = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  function memberChip(member) {
    const name = escapeHTML(member.name);
    if (member.url) {
      return `<a class="member-chip has-link" href="${escapeHTML(member.url)}" target="_blank" rel="noopener noreferrer">
        <span class="member-name">${name}</span>
        <svg class="member-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3l5 5-5 5"/></svg>
      </a>`;
    }
    return `<span class="member-chip"><span class="member-name">${name}</span></span>`;
  }

  root.innerHTML = window.IA_DATA.memberGroups
    .map(
      (group) => `
        <section class="ia-section">
          <h2 class="ia-section-title">${escapeHTML(group.name)}</h2>
          <div class="members-row">
            ${group.members.map(memberChip).join("")}
          </div>
        </section>
      `,
    )
    .join("");
})();
