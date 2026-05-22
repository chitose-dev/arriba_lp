const menuToggle = document.querySelector(".menu-toggle");
const globalMenu = document.querySelector(".global-menu");
const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const trialForm = document.getElementById("trial-form");
const lineUrl = "https://lin.ee/8yWT6iB";
let activeModal = null;
let activeModalFromPush = false;
const modalTapThreshold = 8;
let modalPressStart = null;

document.documentElement.classList.add("js");

function scrollToAnchor(hash, smooth = true) {
  if (!hash || hash === "#" || hash.startsWith("#modal-")) return false;
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

function openModal(id, updateHistory = true) {
  const modal = document.getElementById(id);
  if (!modal) return;
  activeModal = modal;
  activeModalFromPush = updateHistory;
  modal.classList.add("is-open");
  document.body.classList.add("modal-open");
  const backButton = modal.querySelector(".modal-back");
  if (backButton) backButton.focus();
  if (updateHistory) {
    history.pushState({ modal: id }, "", `#${id}`);
  }
}

function closeModal(updateHistory = true) {
  if (!activeModal) return;
  const shouldGoBack = activeModalFromPush;
  activeModal.classList.remove("is-open");
  activeModal = null;
  activeModalFromPush = false;
  document.body.classList.remove("modal-open");
  if (updateHistory && location.hash.startsWith("#modal-")) {
    if (shouldGoBack) {
      history.back();
    } else {
      history.replaceState(null, "", `${location.pathname}${location.search}`);
    }
  }
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
    return;
  }

  if (location.hash.startsWith("#modal-")) {
    openModal(location.hash.slice(1), false);
  }
});

if (location.hash.startsWith("#modal-")) {
  openModal(location.hash.slice(1), false);
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

function getFormValue(formData, key) {
  return String(formData.get(key) || "").trim();
}

function buildTrialMessage(formData) {
  return [
    "アリバサッカークラブ 体験会申込",
    "",
    `体験会の日付: ${getFormValue(formData, "date")}`,
    `名前: ${getFormValue(formData, "name")}`,
    `ふりがな: ${getFormValue(formData, "kana")}`,
    `学年: ${getFormValue(formData, "grade")}`,
    `希望: ${getFormValue(formData, "category")}`,
    `市町村: ${getFormValue(formData, "city")}`,
    `現在所属チーム: ${getFormValue(formData, "team")}`,
    `電話番号: ${getFormValue(formData, "tel")}`,
    `メールアドレス: ${getFormValue(formData, "email")}`,
    `保護者氏名: ${getFormValue(formData, "parent")}`,
    `体験会を知ったきっかけ: ${getFormValue(formData, "source")}`,
    `備考: ${getFormValue(formData, "message") || "なし"}`
  ].join("\n");
}

if (trialForm) {
  trialForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = trialForm.querySelector(".form-status");
    const formData = new FormData(trialForm);

    if (!trialForm.checkValidity()) {
      trialForm.reportValidity();
      return;
    }

    const message = buildTrialMessage(formData);

    try {
      await navigator.clipboard.writeText(message);
      if (status) {
        status.textContent = "申込内容をコピーしました。LINEが開いたら、そのまま貼り付けて送信してください。";
        status.classList.remove("is-error");
      }
    } catch {
      if (status) {
        status.textContent = "LINEが開いたら、入力内容を確認して送信してください。";
        status.classList.remove("is-error");
      }
    }

    window.open(lineUrl, "_blank", "noopener");
  });
}

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

const revealGroups = document.querySelectorAll(".hero, .lp-section, .sponsor-section, .mini-nav, .site-footer");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-inview", entry.isIntersecting);
  });
}, { rootMargin: "-10% 0px -18% 0px", threshold: 0.12 });

revealGroups.forEach((group) => revealObserver.observe(group));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && globalMenu && globalMenu.classList.contains("open")) {
    closeMenu();
  }
});
