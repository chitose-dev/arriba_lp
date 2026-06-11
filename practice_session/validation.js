const form = document.querySelector(".practice-form");
const summary = document.querySelector("#form-error-summary");

if (form && summary) {
  const fieldLabels = {
    event_date: "体験希望日",
    name: "名前",
    furigana: "ふりがな",
    grade: "学年",
    preference: "希望",
    transportation: "送迎",
    city: "市町村",
    current_team: "現在所属チーム",
    phone: "電話番号",
    email: "メールアドレス",
    email_confirm: "メールアドレス確認用",
    guardian_name: "保護者氏名",
    source: "体験会をどこで知りましたか？",
  };

  const selectionFields = new Set([
    "event_date",
    "grade",
    "preference",
    "transportation",
    "source",
  ]);

  const getControls = (name) =>
    Array.from(form.querySelectorAll(`[name="${name}"]`));

  const getContainer = (controls) =>
    controls[0]?.closest("fieldset, label") || null;

  const getValue = (controls) => {
    if (controls[0]?.type === "radio") {
      return controls.find((control) => control.checked)?.value.trim() || "";
    }
    return controls[0]?.value.trim() || "";
  };

  const clearError = (name) => {
    const controls = getControls(name);
    const container = getContainer(controls);
    controls.forEach((control) => {
      control.removeAttribute("aria-invalid");
      control.removeAttribute("aria-describedby");
      control.classList.remove("field-invalid");
    });
    container?.classList.remove("field-invalid");
    container?.querySelector(".field-error")?.remove();
  };

  const showError = (name, message) => {
    const controls = getControls(name);
    const container = getContainer(controls);
    if (!controls.length || !container) return;

    controls.forEach((control) => control.setAttribute("aria-invalid", "true"));
    if (controls[0].type === "radio") {
      container.classList.add("field-invalid");
    } else {
      controls[0].classList.add("field-invalid");
    }

    const error = document.createElement("p");
    error.className = "field-error";
    error.id = `error-${name}`;
    error.textContent = message;
    container.append(error);
    controls.forEach((control) => control.setAttribute("aria-describedby", error.id));
  };

  const validate = () => {
    const errors = [];

    Object.entries(fieldLabels).forEach(([name, label]) => {
      clearError(name);
      const controls = getControls(name);
      if (!controls.length || !controls.some((control) => control.required)) return;
      if (!getValue(controls)) {
        const action = selectionFields.has(name) ? "選択" : "入力";
        errors.push({ name, message: `${label}を${action}してください。` });
      }
    });

    const email = getControls("email")[0];
    if (email?.value.trim() && email.validity.typeMismatch) {
      errors.push({
        name: "email",
        message: "メールアドレスの形式を確認してください。",
      });
    }

    const emailConfirm = getControls("email_confirm")[0];
    if (
      email?.value.trim()
      && emailConfirm?.value.trim()
      && email.value.trim() !== emailConfirm.value.trim()
    ) {
      errors.push({
        name: "email_confirm",
        message: "メールアドレスが一致していません。",
      });
    }

    const uniqueErrors = errors.filter(
      (error, index) =>
        errors.findIndex((candidate) => candidate.name === error.name) === index
    );

    uniqueErrors.forEach(({ name, message }) => showError(name, message));
    return uniqueErrors;
  };

  const renderSummary = (errors) => {
    const list = summary.querySelector("ul");
    list.replaceChildren();

    errors.forEach(({ name, message }) => {
      const item = document.createElement("li");
      item.dataset.field = name;
      const link = document.createElement("a");
      link.href = `#field-${name}`;
      link.textContent = message;
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const controls = getControls(name);
        const target = getContainer(controls);
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
        controls[0]?.focus({ preventScroll: true });
      });
      item.append(link);
      list.append(item);
    });

    summary.hidden = errors.length === 0;
  };

  const removeSummaryError = (name) => {
    summary.querySelector(`li[data-field="${name}"]`)?.remove();
    summary.hidden = summary.querySelectorAll("li").length === 0;
  };

  Object.keys(fieldLabels).forEach((name) => {
    const controls = getControls(name);
    const container = getContainer(controls);
    if (container) container.id = `field-${name}`;

    controls.forEach((control) => {
      const eventName =
        control.type === "radio" || control.tagName === "SELECT" ? "change" : "input";
      control.addEventListener(eventName, () => {
        clearError(name);
        removeSummaryError(name);
        if (name === "email") {
          clearError("email_confirm");
          removeSummaryError("email_confirm");
        }
      });
    });
  });

  form.addEventListener("submit", (event) => {
    const errors = validate();
    renderSummary(errors);
    if (!errors.length) return;

    event.preventDefault();
    summary.focus({ preventScroll: true });
    summary.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
