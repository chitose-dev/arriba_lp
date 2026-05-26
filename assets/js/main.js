const menuToggle = document.querySelector(".menu-toggle");
const globalMenu = document.querySelector(".global-menu");
const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const trialForm = document.getElementById("trial-form");
const lineDialog = document.getElementById("line-dialog");
const lineDialogTitle = document.getElementById("line-dialog-title");
const lineDialogMessage = document.getElementById("line-dialog-message");
const lineOpenButton = document.querySelector("[data-line-open]");
const lineCloseButton = document.querySelector("[data-line-close]");
const lineUrl = "https://lin.ee/8yWT6iB";
let activeModal = null;
let activeModalFromPush = false;
const modalTapThreshold = 8;
let modalPressStart = null;

document.documentElement.classList.add("js");

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

function openLineDialog(copied) {
  if (!lineDialog) return;
  if (lineDialogTitle) {
    lineDialogTitle.textContent = copied
      ? "問い合わせ内容をコピーしました"
      : "問い合わせ内容を作成しました";
  }
  if (lineDialogMessage) {
    lineDialogMessage.textContent = copied
      ? "LINEが開いたら、そのまま貼り付けて送信してください。"
      : "問い合わせ内容を作成しました。LINEが開いたら、入力内容を確認して送信してください。";
  }
  lineDialog.hidden = false;
  document.body.classList.add("line-dialog-open");
  lineOpenButton?.focus();
}

function closeLineDialog() {
  if (!lineDialog) return;
  lineDialog.hidden = true;
  document.body.classList.remove("line-dialog-open");
}

lineOpenButton?.addEventListener("click", () => {
  window.location.href = lineUrl;
});

lineCloseButton?.addEventListener("click", closeLineDialog);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lineDialog && !lineDialog.hidden) {
    closeLineDialog();
  }
});

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
    let copied = false;

    try {
      await navigator.clipboard.writeText(message);
      copied = true;
      if (status) {
        status.textContent = "";
        status.classList.remove("is-error");
      }
    } catch {
      if (status) {
        status.textContent = "";
        status.classList.remove("is-error");
      }
    }

    openLineDialog(copied);
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
