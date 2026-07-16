(function () {
  const KEY = "pzc_hub_lang";

  function lang() {
    return localStorage.getItem(KEY) || "de";
  }

  function t(key) {
    return HUB_CONTENT[lang()][key] || key;
  }

  function apply() {
    const l = lang();
    document.documentElement.lang = l;
    document.title = t("meta_title");
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (HUB_CONTENT[l][k] !== undefined) el.textContent = HUB_CONTENT[l][k];
    });
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === l);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.addEventListener("click", () => {
        localStorage.setItem(KEY, btn.dataset.lang);
        apply();
      });
    });
    apply();
  });
})();
