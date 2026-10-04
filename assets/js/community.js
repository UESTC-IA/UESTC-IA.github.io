(function () {
  const discussions = {
    "information-sources": {
      title: "你在关注哪些高质量信息源？",
      image: "assets/images/community/information-sources.jpg",
    },
    "ai-products": {
      title: "个人 AI 助手，如何融入日常生活？",
      image: "assets/images/community/ai-products.jpg",
    },
    "agent-workflows": {
      title: "Agent 时代，怎么管理上下文与工作流？",
      image: "assets/images/community/agent-workflows.jpg",
    },
    "phd-research": {
      title: "博士选题：追热点，还是建立自己的问题？",
      image: "assets/images/community/phd-research.jpg",
    },
  };

  const dialog = document.getElementById("discussion-dialog");
  const title = document.getElementById("discussion-dialog-title");
  const image = document.getElementById("discussion-image");
  const imageArea = document.getElementById("discussion-image-area");
  const originalLink = document.getElementById("discussion-original");
  const zoomButton = document.getElementById("zoom-discussion");
  const closeButton = document.getElementById("close-discussion");

  function resetZoom() {
    imageArea.classList.remove("is-zoomed");
    zoomButton.setAttribute("aria-pressed", "false");
    zoomButton.textContent = "放大阅读";
    imageArea.scrollTo(0, 0);
  }

  image.addEventListener("load", () => {
    image.style.setProperty("--discussion-natural-width", `${image.naturalWidth}px`);
  });

  document.querySelectorAll("[data-discussion]").forEach((button) => {
    button.addEventListener("click", () => {
      const discussion = discussions[button.dataset.discussion];
      if (!discussion) return;
      resetZoom();
      title.textContent = discussion.title;
      image.alt = `${discussion.title}——完整讨论截图`;
      image.src = discussion.image;
      originalLink.href = discussion.image;
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.documentElement.style.overflow = "";
    resetZoom();
  });
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close();
      }
    }
  });

  zoomButton.addEventListener("click", () => {
    const zoomed = imageArea.classList.toggle("is-zoomed");
    zoomButton.setAttribute("aria-pressed", String(zoomed));
    zoomButton.textContent = zoomed ? "适应屏幕" : "放大阅读";
  });

  const copyButton = document.getElementById("copy-qq");
  const copyLabel = document.getElementById("copy-qq-label");
  let feedbackTimer;

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      copyLabel.textContent = "群号已复制";
    } catch (_) {
      copyLabel.textContent = `群号：${copyButton.dataset.copy}`;
    }
    clearTimeout(feedbackTimer);
    feedbackTimer = setTimeout(() => { copyLabel.textContent = "复制群号"; }, 2500);
  });
})();
