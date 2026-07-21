(function () {
  const STORAGE_KEY = "pzc_lang";

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || "de";
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function t(key, lang) {
    const l = lang || getLang();
    return (window.HUB_CONTENT[l] && window.HUB_CONTENT[l][key]) || key;
  }

  function applyLang(lang) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (HUB_CONTENT[lang][key] !== undefined) {
        el.textContent = HUB_CONTENT[lang][key];
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (HUB_CONTENT[lang][key] !== undefined) {
        el.innerHTML = HUB_CONTENT[lang][key];
      }
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (HUB_CONTENT[lang][key] !== undefined) {
        el.setAttribute("alt", HUB_CONTENT[lang][key]);
      }
    });
    if (document.titleKey) {
      document.title = t(document.titleKey, lang);
    } else {
      document.title = t("meta_title", lang);
    }
    window.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });
    setLang(getLang());
  });

  window.i18n = { getLang, setLang, t };
})();
