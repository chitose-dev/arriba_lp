const menuToggle = document.querySelector(".menu-toggle");
const globalMenu = document.querySelector(".global-menu");
const modalTriggers = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const trialForm = document.getElementById("trial-form");
const lineUrl = "https://lin.ee/8yWT6iB";
let activeModal = null;

function closeMenu() {
  if (!globalMenu || !menuToggle) return;
  globalMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
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
}

function openModal(id, updateHistory = true) {
  const modal = document.getElementById(id);
  if (!modal) return;
  activeModal = modal;
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
  activeModal.classList.remove("is-open");
  activeModal = null;
  document.body.classList.remove("modal-open");
  if (updateHistory && location.hash.startsWith("#modal-")) {
    history.back();
  }
}

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    openModal(trigger.dataset.modal);
  });
});

modals.forEach((modal) => {
  modal.querySelectorAll(".modal-close").forEach((button) => {
    button.addEventListener("click", () => closeModal());
  });

  modal.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      modal.classList.remove("is-open");
      activeModal = null;
      document.body.classList.remove("modal-open");
    });
  });
});

window.addEventListener("popstate", () => {
  if (activeModal) {
    activeModal.classList.remove("is-open");
    activeModal = null;
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
    const email = getFormValue(formData, "email");
    const emailConfirm = getFormValue(formData, "email_confirm");

    if (!trialForm.checkValidity()) {
      trialForm.reportValidity();
      return;
    }

    if (email !== emailConfirm) {
      if (status) {
        status.textContent = "メールアドレスと確認用メールアドレスが一致していません。";
        status.classList.add("is-error");
      }
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && globalMenu && globalMenu.classList.contains("open")) {
    closeMenu();
  }
});
