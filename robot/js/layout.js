(function () {
  const PAGES = [
    { href: "index.html", key: "nav_home" },
    { href: "products.html", key: "nav_products" },
    { href: "training.html", key: "nav_training" },
    { href: "service.html", key: "nav_service" },
    { href: "contact.html", key: "nav_contact" },
  ];

  function currentPage() {
    return location.pathname.split("/").pop() || "index.html";
  }

  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;
    const page = currentPage();
    const lang = window.i18n ? i18n.getLang() : "de";
    const t = (k) => (SITE_CONTENT[lang] && SITE_CONTENT[lang][k]) || k;
    const nav = PAGES.map((p) => {
      const active = page === p.href ? " aria-current=\"page\"" : "";
      return `<a href="${p.href}" data-i18n="${p.key}"${active}>${t(p.key)}</a>`;
    }).join("");
    el.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          <a class="logo" href="../index.html">
            <img src="../images/zhou_consulting_logo.png" alt="Ping Zhou Consulting" class="logo-img" onerror="this.style.display='none'">
            <span class="logo-text">Ping Zhou <span>Consulting</span></span>
          </a>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="Menu">☰</button>
          <nav class="nav" id="main-nav">${nav}</nav>
          <div class="lang-switch">
            <button type="button" data-lang="de">DE</button>
            <button type="button" data-lang="en">EN</button>
          </div>
        </div>
      </header>`;
    const toggle = el.querySelector(".menu-toggle");
    const navEl = el.querySelector("#main-nav");
    if (toggle && navEl) {
      toggle.addEventListener("click", () => {
        const open = navEl.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      navEl.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => {
          navEl.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
      btn.onclick = () => i18n.setLang(btn.dataset.lang);
    });
    document.querySelectorAll("#site-header [data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      if (SITE_CONTENT[lang][key]) node.textContent = SITE_CONTENT[lang][key];
    });
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    const lang = window.i18n ? i18n.getLang() : "de";
    const t = (k) => (SITE_CONTENT[lang] && SITE_CONTENT[lang][k]) || k;
    el.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <p data-i18n="footer_text">${t("footer_text")}</p>
            <p><a href="mailto:contact@zhou-consult.com">contact@zhou-consult.com</a> · +49 173 4680010</p>
          </div>
          <div class="footer-legal">
            <a href="../impressum.html" data-i18n="nav_impressum">${t("nav_impressum")}</a>
            <a href="../datenschutz.html" data-i18n="nav_privacy">${t("nav_privacy")}</a>
            <a href="../index.html">zhou-consult.com</a>
          </div>
        </div>
      </footer>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    window.addEventListener("langchange", () => {
      renderHeader();
      renderFooter();
    });
  });
})();
