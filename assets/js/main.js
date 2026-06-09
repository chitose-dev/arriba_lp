const menuToggle = document.querySelector(".menu-toggle");
const globalMenu = document.querySelector(".global-menu");
const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const lineUrl = "https://lin.ee/8yWT6iB";
let activeModal = null;
let activeModalFromPush = false;
const modalTapThreshold = 8;
let modalPressStart = null;

document.documentElement.classList.add("js");

document.querySelectorAll(".modal-related-buttons a").forEach((link) => {
  const labelLength = Array.from(link.textContent.trim()).length;
  link.style.setProperty("--label-length", String(labelLength));
});

const sectionHeadings = document.querySelectorAll("main > section h2");

sectionHeadings.forEach((heading) => {
  const lines = heading.classList.contains("recruit-title")
    ? Array.from(heading.querySelectorAll(":scope > span"), (span) => span.textContent.trim())
    : [heading.textContent.trim()];
  const headingLength = Math.max(...lines.map((line) => Array.from(line).length));
  heading.style.setProperty("--heading-length", String(headingLength));
});

function fitSingleLineSectionHeadings() {
  sectionHeadings.forEach((heading) => {
    heading.style.removeProperty("--heading-fit-size");
    if (heading.classList.contains("recruit-title") || heading.closest("#final")) return;

    const availableWidth = heading.clientWidth;
    const requiredWidth = heading.scrollWidth;
    if (!availableWidth || requiredWidth <= availableWidth) return;

    const baseSize = Number.parseFloat(getComputedStyle(heading).fontSize);
    const fittedSize = Math.max(15.5, baseSize * (availableWidth / requiredWidth) * 0.98);
    heading.style.setProperty("--heading-fit-size", `${fittedSize}px`);
  });
}

requestAnimationFrame(fitSingleLineSectionHeadings);
document.fonts?.ready.then(fitSingleLineSectionHeadings);

let headingResizeFrame = null;
window.addEventListener("resize", () => {
  cancelAnimationFrame(headingResizeFrame);
  headingResizeFrame = requestAnimationFrame(fitSingleLineSectionHeadings);
});

function prepareModalPanel(modal) {
  const panel = modal.querySelector(".modal-panel");
  const body = panel?.querySelector(":scope > .modal-body");
  const footer = body?.querySelector(":scope > .modal-footer-actions");
  const image = panel?.querySelector(":scope > img");
  if (!panel || !body || !footer || panel.querySelector(":scope > .modal-scroll")) return;

  const scrollArea = document.createElement("div");
  scrollArea.className = "modal-scroll";
  panel.insertBefore(scrollArea, body);
  if (image) scrollArea.appendChild(image);
  scrollArea.appendChild(body);
  panel.appendChild(footer);
}

modals.forEach(prepareModalPanel);

function escapeArticleHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderArticleInline(value) {
  return escapeArticleHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, '<span class="article-underline">$1</span>')
    .replace(/==(.+?)==/g, "<mark>$1</mark>")
    .replace(/\^\^(.+?)\^\^/g, '<span class="article-blue">$1</span>');
}

function renderModalArticle(markdown) {
  const output = [];
  let listItems = [];

  const flushList = () => {
    if (!listItems.length) return;
    output.push(`<ul>${listItems.join("")}</ul>`);
    listItems = [];
  };

  markdown.trim().split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      return;
    }
    if (line.startsWith("- ")) {
      listItems.push(`<li>${renderArticleInline(line.slice(2))}</li>`);
      return;
    }

    flushList();
    if (line.startsWith("### ")) {
      output.push(`<h3>${renderArticleInline(line.slice(4))}</h3>`);
    } else if (line.startsWith("> ")) {
      output.push(`<p class="modal-article-lead">${renderArticleInline(line.slice(2))}</p>`);
    } else if (line.startsWith("! ")) {
      output.push(`<p class="modal-article-note">${renderArticleInline(line.slice(2))}</p>`);
    } else {
      output.push(`<p>${renderArticleInline(line)}</p>`);
    }
  });
  flushList();
  return output.join("");
}

function parseModalArticles(source) {
  const articles = new Map();
  const sectionPattern = /<!--\s*modal:([\w-]+)\s*-->([\s\S]*?)(?=<!--\s*modal:|$)/g;
  let match;

  while ((match = sectionPattern.exec(source)) !== null) {
    articles.set(match[1], match[2].trim());
  }
  return articles;
}

function replaceModalIntro(modal, markdown) {
  const body = modal.querySelector(".modal-body");
  const heading = body?.querySelector(":scope > h2");
  if (!body || !heading || !markdown) return;

  const fallbackParagraphs = [];
  let sibling = heading.nextElementSibling;
  while (sibling?.tagName === "P") {
    fallbackParagraphs.push(sibling);
    sibling = sibling.nextElementSibling;
  }

  const article = document.createElement("div");
  article.className = "modal-article";
  article.innerHTML = renderModalArticle(markdown);
  heading.insertAdjacentElement("afterend", article);
  fallbackParagraphs.forEach((paragraph) => paragraph.remove());
}

fetch("./assets/content/modal-articles.md?v=20260609-school-name")
  .then((response) => {
    if (!response.ok) throw new Error(`Modal article load failed: ${response.status}`);
    return response.text();
  })
  .then((source) => {
    const articles = parseModalArticles(source);
    modals.forEach((modal) => replaceModalIntro(modal, articles.get(modal.id)));
  })
  .catch(() => {
    // The original HTML paragraphs remain as a fallback if the copy file cannot load.
  });

function trackEvent(name, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    page_location: window.location.href,
    ...params
  });
}

function scrollToAnchor(hash, smooth = true) {
  if (!hash || hash === "#" || hash.startsWith("#modal-")) return false;
  if (hash === "#top") {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    return true;
  }
  const target = document.querySelector(hash);
  const header = document.querySelector(".site-header");
  if (!target) return false;

  const offset = header?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
  return true;
}

function closeMenu() {
  if (!globalMenu || !menuToggle) return;
  globalMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openMenu() {
  if (!globalMenu || !menuToggle) return;
  globalMenu.classList.add("open");
  document.body.classList.add("menu-open");
  menuToggle.setAttribute("aria-expanded", "true");
}

if (menuToggle && globalMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = globalMenu.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  globalMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.querySelectorAll("[data-open-menu]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openMenu();
    });
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  activeModal = modal;
  activeModalFromPush = false;
  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
  const backButton = modal.querySelector(".modal-back");
  if (backButton) backButton.focus();
  trackEvent("modal_open", { modal_id: id });
}

function closeModal() {
  if (!activeModal) return;
  activeModal.classList.remove("is-open");
  activeModal = null;
  activeModalFromPush = false;
  document.body.classList.remove("modal-open");
}

modalTriggers.forEach((trigger) => {
  const openFromTrigger = (event) => {
    event.preventDefault();
    openModal(trigger.dataset.modal);
  };

  trigger.addEventListener("click", openFromTrigger);

  if (trigger.getAttribute("role") === "button") {
    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      openFromTrigger(event);
    });
  }
});

modals.forEach((modal) => {
  modal.addEventListener("pointerdown", (event) => {
    if (!modal.classList.contains("is-open")) return;
    modalPressStart = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      target: event.target
    };
  });

  modal.addEventListener("pointerup", (event) => {
    if (!modalPressStart || modalPressStart.id !== event.pointerId) return;

    const dx = Math.abs(event.clientX - modalPressStart.x);
    const dy = Math.abs(event.clientY - modalPressStart.y);
    const startTarget = modalPressStart.target;
    modalPressStart = null;

    if (dx > modalTapThreshold || dy > modalTapThreshold) return;
    if (startTarget.closest("a, button, input, select, textarea, iframe")) return;
    closeModal();
  });

  modal.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", () => closeModal());
  });

  modal.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      modal.classList.remove("is-open");
      activeModal = null;
      activeModalFromPush = false;
      document.body.classList.remove("modal-open");
    });
  });
});

window.addEventListener("popstate", () => {
  if (activeModal) {
    activeModal.classList.remove("is-open");
    activeModal = null;
    activeModalFromPush = false;
    document.body.classList.remove("modal-open");
  }
});

if (location.hash.startsWith("#modal-")) {
  history.replaceState(null, "", `${location.pathname}${location.search}`);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.hasAttribute("data-open-menu")) return;
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    const didScroll = scrollToAnchor(hash);
    if (!didScroll) return;

    event.preventDefault();
    closeMenu();
    if (activeModal) {
      activeModal.classList.remove("is-open");
      activeModal = null;
      activeModalFromPush = false;
      document.body.classList.remove("modal-open");
    }
    history.pushState(null, "", hash);
  });
});

window.addEventListener("load", () => {
  if (location.hash && !location.hash.startsWith("#modal-")) {
    window.setTimeout(() => scrollToAnchor(location.hash, false), 80);
  }
});

document.querySelectorAll('a[href^="#trial"], a[href="/practice_session/"], a[href="https://arriba.club/practice_session/"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("trial_cta_click", {
      click_text: link.textContent.trim(),
      link_url: link.getAttribute("href")
    });
  });
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("phone_click", {
      click_text: link.textContent.trim(),
      link_url: link.getAttribute("href")
    });
  });
});

document.querySelectorAll('a[href*="lin.ee"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("line_click", {
      click_location: "direct_link",
      click_text: link.textContent.trim(),
      link_url: link.href
    });
  });
});

const animatedItems = document.querySelectorAll("[data-animate], .bg-word");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    if (entry.target.classList.contains("bg-word")) {
      entry.target.classList.add("is-bg-visible");
    } else {
      entry.target.classList.add("is-visible");
    }
    observer.unobserve(entry.target);
  });
}, { threshold: 0.18 });

animatedItems.forEach((item) => observer.observe(item));

const revealGroups = document.querySelectorAll(".hero, .lp-section, .final-section, .sponsor-section, .mini-nav, .site-footer");
let revealTicking = false;

function revealGroup(group) {
  group.classList.add("is-inview");
  revealObserver.unobserve(group);
}

function revealVisibleGroups() {
  revealGroups.forEach((group) => {
    if (group.classList.contains("is-inview")) return;
    const rect = group.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.04) {
      revealGroup(group);
    }
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    revealGroup(entry.target);
  });
}, { rootMargin: "-4% 0px -8% 0px", threshold: 0.04 });

revealGroups.forEach((group) => {
  revealObserver.observe(group);
});

revealVisibleGroups();
window.addEventListener("load", () => window.setTimeout(revealVisibleGroups, 140));
window.addEventListener("scroll", () => {
  if (revealTicking) return;
  revealTicking = true;
  window.requestAnimationFrame(() => {
    revealVisibleGroups();
    revealTicking = false;
  });
}, { passive: true });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && globalMenu && globalMenu.classList.contains("open")) {
    closeMenu();
  }
});
