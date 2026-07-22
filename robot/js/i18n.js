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
    return (window.SITE_CONTENT[lang] && window.SITE_CONTENT[lang][key]) || key;
  }

  function applyLang(lang) {
    if (!window.SITE_CONTENT || !SITE_CONTENT[lang]) return;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (SITE_CONTENT[lang][key] !== undefined) el.textContent = SITE_CONTENT[lang][key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      if (SITE_CONTENT[lang][key] !== undefined) el.innerHTML = SITE_CONTENT[lang][key];
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (SITE_CONTENT[lang][key] !== undefined) el.setAttribute("alt", SITE_CONTENT[lang][key]);
    });
    document.querySelectorAll("option[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (SITE_CONTENT[lang][key] !== undefined) el.textContent = SITE_CONTENT[lang][key];
    });
    if (document.titleKey) document.title = t(document.titleKey, lang);
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
