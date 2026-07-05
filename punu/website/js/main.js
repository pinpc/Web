(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const demoForm = document.getElementById('demoForm');
  const toast = document.getElementById('toast');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = demoForm.name.value.trim();
      const verein = demoForm.verein.value.trim();
      showToast(
        `Danke, ${name}! Demo-Anfrage für „${verein}" wurde simuliert (Testmodus).`
      );
      demoForm.reset();
    });
  }

  const header = document.querySelector('.site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (!header) return;
    header.style.boxShadow = y > 20 ? '0 4px 24px rgba(0,0,0,0.3)' : 'none';
    lastScroll = y;
  }, { passive: true });
})();
