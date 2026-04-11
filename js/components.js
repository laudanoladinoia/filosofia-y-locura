/**
 * components.js
 * Genera el header, footer y back-to-top reutilizables
 * Llama a injectLayout() en cada página.
 */

function injectLayout(opts = {}) {
  const {
    title       = 'Filosofía y Locura',
    description = 'Blog de filosofía y ética para estudiantes de grado 10° y 11°',
    activeNav   = '',
    rootPath    = '',
    isArticle   = false,
  } = opts;

  // ── Head meta (si no viene del HTML) ──
  if (!document.title) document.title = title + ' | Filosofía y Locura';

  // ── Top bar ──
  const topbar = `
  <div class="topbar">
    <div class="container">
      Para estudiantes de <strong>grado 10° y 11°</strong> &nbsp;·&nbsp; Bogotá, Colombia
    </div>
  </div>`;

  // ── Masthead ──
  const r = rootPath;
  const masthead = `
  <header class="masthead" role="banner">
    <div class="masthead__inner container">
      <a href="${r}index.html" class="masthead__brand" aria-label="Inicio">
        <span class="masthead__logo">Filosofía <span>&amp;</span> Locura</span>
        <span class="masthead__tagline">Blog de ética y pensamiento crítico</span>
      </a>
      <nav aria-label="Navegación principal">
        <ul class="nav__list" role="list">
          <li><a href="${r}index.html"  class="nav__link ${activeNav==='inicio'?'active':''}">Inicio</a></li>
          <li><a href="${r}etica.html"  class="nav__link ${activeNav==='etica'?'active':''}">Ética</a></li>
          <li><a href="${r}filosofia.html" class="nav__link ${activeNav==='filosofia'?'active':''}">Filosofía</a></li>
          <li><a href="${r}talleres.html"  class="nav__link ${activeNav==='talleres'?'active':''}">Talleres</a></li>
          <li><a href="${r}recursos.html"  class="nav__link ${activeNav==='recursos'?'active':''}">Recursos</a></li>
        </ul>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Abrir menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <nav class="mobile-nav" id="mobileNav" aria-label="Menú móvil">
      <ul class="mobile-nav__list" role="list">
        <li><a href="${r}index.html"  class="mobile-nav__link">🏠 Inicio</a></li>
        <li><a href="${r}etica.html"  class="mobile-nav__link">⚖️ Ética</a></li>
        <li><a href="${r}filosofia.html" class="mobile-nav__link">🧠 Filosofía</a></li>
        <li><a href="${r}talleres.html"  class="mobile-nav__link">✏️ Talleres</a></li>
        <li><a href="${r}recursos.html"  class="mobile-nav__link">📚 Recursos</a></li>
      </ul>
    </nav>
  </header>`;

  // ── Footer ──
  const footer = `
  <footer role="contentinfo">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand-name">Filosofía <span>&amp;</span> Locura</div>
          <p class="footer__brand-desc">
            Un espacio para pensar, cuestionar y crecer. Blog educativo de filosofía
            y ética para jóvenes latinoamericanos.
          </p>
        </div>
        <div>
          <div class="footer__heading">Categorías</div>
          <ul class="footer__links">
            <li><a href="${r}etica.html">⚖️ Ética</a></li>
            <li><a href="${r}filosofia.html">🧠 Filosofía</a></li>
            <li><a href="${r}talleres.html">✏️ Talleres</a></li>
            <li><a href="${r}recursos.html">📚 Recursos</a></li>
          </ul>
        </div>
        <div>
          <div class="footer__heading">Acerca</div>
          <ul class="footer__links">
            <li><a href="${r}acerca.html">Sobre el blog</a></li>
            <li><a href="${r}recursos.html#icfes">Prep. ICFES</a></li>
            <li><a href="${r}talleres.html">Actividades</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span class="footer__copy">© ${new Date().getFullYear()} Filosofía y Locura. Hecho con 📖 y ☕</span>
        <span>Diseñado para estudiantes colombianos</span>
      </div>
    </div>
  </footer>`;

  // ── Back to top ──
  const backTop = `
  <button class="back-top" id="backToTop" aria-label="Volver arriba" title="Volver arriba">↑</button>`;

  // ── Reading progress (solo artículos) ──
  const progress = isArticle ? `<div class="reading-progress" id="readingProgress" role="progressbar" aria-label="Progreso de lectura"></div>` : '';

  // Inyectar en el body
  const existingHeader = document.querySelector('header');
  const existingFooter = document.querySelector('footer');

  if (!existingHeader) {
    document.body.insertAdjacentHTML('afterbegin', progress + topbar + masthead);
  }
  if (!existingFooter) {
    document.body.insertAdjacentHTML('beforeend', footer + backTop);
  }
}
