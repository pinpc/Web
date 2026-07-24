(function () {
  function t(key, lang) {
    return (window.SITE_CONTENT[lang] && SITE_CONTENT[lang][key]) || key;
  }

  function badgeClass(id) {
    if (id === "dora-max") return "badge-max";
    if (id === "dora-smart") return "badge-smart";
    if (id === "dora-mini") return "badge-compact";
    return "badge-classic";
  }

  function isFeaturedProduct(id) {
    return id === "dora" || id === "dora-max" || id === "dora-smart" || id === "dora-mini";
  }

  function productCard(p, lang, compact) {
    const badgeKey = p.badge[lang];
    const badge = t(badgeKey, lang);
    const bullets = p.bullets[lang].map((b) => `<li>${b}</li>`).join("");
    const modelHref = `products.html#${p.id}`;
    const featured = isFeaturedProduct(p.id);
    const imgClass = featured ? "product-img product-img--featured" : "product-img";
    const imgBlock = p.image
      ? compact
        ? `<a class="product-img-link" href="${modelHref}" aria-label="${t("cta_to_model", lang)}: ${p.title[lang]}"><img class="${imgClass}" src="${p.image}" alt="${p.title[lang]}" loading="lazy"></a>`
        : `<img class="${imgClass}" src="${p.image}" alt="${p.title[lang]}" loading="lazy">`
      : "";
    const featuredClass = featured ? " product-card--featured" : "";
    const compactCta = compact
      ? `<a class="btn btn-outline btn-sm" href="${modelHref}" data-i18n="cta_to_model">${t("cta_to_model", lang)}</a>`
      : "";
    const specsBlock = compact
      ? ""
      : `
          <div class="spec-table-wrap">
            <h4 data-i18n="spec_title">${t("spec_title", lang)}</h4>
            <table class="spec-table">${renderSpecRows(p.specs[lang] || p.specs.en)}</table>
          </div>
          <div class="features-block">
            <h4 data-i18n="features_title">${t("features_title", lang)}</h4>
            <ul class="feature-list">${p.features[lang].map((f) => `<li>${f}</li>`).join("")}</ul>
          </div>`;
    return `
      <article class="card product-card${featuredClass}${compact ? " product-card--compact" : ""}" id="${p.id}">
        <span class="product-badge ${badgeClass(p.id)}">${badge}</span>
        <div class="product-card-grid">
          <div class="product-img-wrap">${imgBlock}</div>
          <div class="product-body">
            <h3>${p.title[lang]}</h3>
            <p class="product-tagline">${p.tagline[lang]}</p>
            <p>${p.summary[lang]}</p>
            <ul class="product-bullets">${bullets}</ul>
            <div class="product-cta">
              <span class="price-note" data-i18n="cta_price">${t("cta_price", lang)}</span>
              ${compactCta}
              <a class="btn btn-primary btn-sm" href="contact.html?model=${p.id}" data-i18n="cta_quote">${t("cta_quote", lang)}</a>
            </div>
          </div>
        </div>
        ${specsBlock}
      </article>`;
  }

  function renderSpecRows(specs) {
    const colCount = specs[0].length;
    const colgroup = colCount === 3
      ? '<colgroup><col class="col-property"><col><col></colgroup>'
      : '<colgroup><col class="col-property"><col></colgroup>';
    const rows = specs.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
    return `${colgroup}${rows}`;
  }

  function renderProductPreview(lang) {
    const root = document.getElementById("products-preview-root");
    if (!root || !window.PRODUCTS) return;
    root.innerHTML = PRODUCTS.map((p) => productCard(p, lang, true)).join("");
  }

  function renderProducts(lang) {
    const root = document.getElementById("products-root");
    if (!root || !window.PRODUCTS) return;
    root.innerHTML = PRODUCTS.map((p) => productCard(p, lang, false)).join("");
  }

  function renderComparison(lang) {
    const root = document.getElementById("comparison-root");
    if (!root || !window.COMPARISON) return;
    const data = COMPARISON[lang] || COMPARISON.en;
    const head = data[0].map((h) => `<th>${h}</th>`).join("");
    const body = data.slice(1).map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
    root.innerHTML = `<div class="spec-table-wrap"><table class="spec-table compare-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
  }

  function renderMedia(lang) {
    if (!window.MEDIA) return;
    const videosRoot = document.getElementById("media-videos-root");
    if (videosRoot && MEDIA.videos) {
      videosRoot.innerHTML = MEDIA.videos.map((v) => `
        <article class="card media-card">
          <div class="video-wrap">
            <video controls playsinline preload="metadata" poster="${v.poster}">
              <source src="${v.file}" type="video/mp4">
            </video>
          </div>
          <h3>${v.title[lang] || v.title.en}</h3>
          <p>${v.desc[lang] || v.desc.en}</p>
        </article>`).join("");
    }
    const socialSection = document.getElementById("media-social-section");
    const socialRoot = document.getElementById("media-social-root");
    if (socialSection && MEDIA.showSocial === false) {
      socialSection.hidden = true;
    } else if (socialRoot && MEDIA.social) {
      const active = MEDIA.social.filter((s) => s.url);
      if (!active.length) {
        if (socialSection) socialSection.hidden = true;
      } else {
        socialRoot.innerHTML = `<div class="social-grid">${active.map((s) => `
          <a class="card social-card" href="${s.url}" target="_blank" rel="noopener noreferrer">
            <span class="social-label">${s.label[lang] || s.label.en}</span>
            <span class="social-handle">${s.handle[lang] || s.handle.en}</span>
            <span class="social-cta">${t("training_social_follow", lang)} →</span>
          </a>`).join("")}</div>`;
        if (socialSection) socialSection.hidden = false;
      }
    }
  }

  function prefillContactForm() {
    const params = new URLSearchParams(location.search);
    const model = params.get("model");
    const select = document.getElementById("form-product");
    if (select && model) select.value = model;
    if (params.get("sent") === "1") {
      const form = document.getElementById("contact-form");
      const sent = document.getElementById("form-sent");
      if (form) form.hidden = true;
      if (sent) sent.hidden = false;
    }
  }

  function init() {
    const lang = i18n.getLang();
    renderProductPreview(lang);
    renderProducts(lang);
    renderComparison(lang);
    renderMedia(lang);
    prefillContactForm();
    const heroVideo = document.getElementById("hero-video");
    if (heroVideo && window.IMAGES?.heroVideo) {
      const source = heroVideo.querySelector("source");
      if (source) source.src = IMAGES.heroVideo;
      if (window.IMAGES.hero) heroVideo.poster = IMAGES.hero;
      heroVideo.load();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heroVideo.play().catch(() => {});
      }
    }
    window.addEventListener("langchange", (e) => {
      const l = e.detail.lang;
      renderProductPreview(l);
      renderProducts(l);
      renderComparison(l);
      renderMedia(l);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
