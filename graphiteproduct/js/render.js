(function () {
  const productImages = {
    "soft-felt": window.IMAGES?.softFelt,
    "cured-felt": window.IMAGES?.curedFelt,
    "cc-composite": window.IMAGES?.ccPlate,
  };

  function renderProducts(lang) {
    const root = document.getElementById("products-root");
    if (!root || !window.PRODUCTS) return;
    root.innerHTML = PRODUCTS.map((p) => {
      const bullets = p.bullets[lang].map((b) => `<li>${b}</li>`).join("");
      const specRows = p.specs.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
      const img = productImages[p.id] ? `<img class="product-img" src="${productImages[p.id]}" alt="${p.title[lang]}">` : "";
      return `
        <article class="card product-card" id="${p.id}">
          <div class="product-card-grid">
            <div>${img}</div>
            <div>
              <h3>${p.title[lang]}</h3>
              <p>${p.summary[lang]}</p>
              <ul>${bullets}</ul>
            </div>
          </div>
          <div class="spec-table-wrap">
            <table class="spec-table">${specRows}</table>
          </div>
        </article>`;
    }).join("");
  }

  function renderGallery() {
    const root = document.getElementById("gallery-root");
    if (!root || !window.IMAGES?.gallery) return;
    root.innerHTML = IMAGES.gallery.map((src) =>
      `<img src="${src}" alt="Application" loading="lazy">`
    ).join("");
  }

  function renderApplications(lang) {
    const root = document.getElementById("applications-root");
    if (!root || !window.APPLICATIONS) return;
    const gallery = window.IMAGES?.gallery || [];
    root.innerHTML = APPLICATIONS.map((a, idx) => {
      const img = gallery[idx % gallery.length];
      const bg = img ? `style="background-image:url('${img}')"` : "";
      return `
      <div class="app-card" ${bg}>
        <span class="temp">${a.temp}</span>
        <span class="label">${a[lang]}</span>
      </div>`;
    }).join("");
  }

  function renderComparison() {
    const root = document.getElementById("comparison-root");
    if (!root || !window.COMPARISON) return;
    const head = COMPARISON[0].map((h) => `<th>${h}</th>`).join("");
    const body = COMPARISON.slice(1).map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
    root.innerHTML = `<table class="spec-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }

  function renderDownloads(lang) {
    const root = document.getElementById("downloads-root");
    if (!root || !window.DOWNLOADS) return;
    const btn = SITE_CONTENT[lang].download_btn;
    root.innerHTML = DOWNLOADS.map((d) => `
      <article class="card">
        <h3>${d.title[lang]}</h3>
        <p>${d.desc[lang]}</p>
        <a class="btn btn-primary" href="${d.file}" download>${btn}</a>
      </article>`).join("");
  }

  function init() {
    const lang = i18n.getLang();
    renderProducts(lang);
    renderApplications(lang);
    renderGallery();
    renderComparison();
    renderDownloads(lang);
    window.addEventListener("langchange", (e) => {
      renderProducts(e.detail.lang);
      renderApplications(e.detail.lang);
      renderDownloads(e.detail.lang);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
