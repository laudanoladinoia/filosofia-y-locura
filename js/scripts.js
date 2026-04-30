/**
 * Filosofía y Locura — scripts.js
 * Interacciones y funcionalidades del blog
 */

/* ─────────────────────────────────────────
   1. Navegación móvil (hamburger)
───────────────────────────────────────── */
function initMobileNav() {
  const btn     = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Cerrar al hacer clic en un enlace
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ─────────────────────────────────────────
   2. Botón "Volver arriba"
───────────────────────────────────────── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────
   3. Barra de progreso de lectura
───────────────────────────────────────── */
function initReadingProgress() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = Math.min(100, progress) + '%';
  }, { passive: true });
}

/* ─────────────────────────────────────────
   4. Búsqueda simple (filtro en la página)
───────────────────────────────────────── */
function initSearch() {
  const form  = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  if (!form || !input) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const q = input.value.trim();
    if (q) {
      // Redirige a la página de categorías con un hash para filtrar
      window.location.href = `posts.html?q=${encodeURIComponent(q)}`;
    }
  });
}

/* ─────────────────────────────────────────
   5. Enlace activo en la navegación
───────────────────────────────────────── */
function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─────────────────────────────────────────
   6. Animaciones al hacer scroll (Intersection Observer)
───────────────────────────────────────── */
function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.post-card, .featured-post, .resource-card, .widget'
  );
  if (!targets.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────
   7. Citas rotatorias en el widget
───────────────────────────────────────── */
const quotes = [
  { text: "La filosofía es el amor al saber, no el saber mismo.", author: "Pitágoras" },
  { text: "Solo sé que nada sé.", author: "Sócrates" },
  { text: "El hombre es la medida de todas las cosas.", author: "Protágoras" },
  { text: "Conócete a ti mismo.", author: "Inscripción del Oráculo de Delfos" },
  { text: "Actúa solo según aquella máxima que puedas querer que se convierta en ley universal.", author: "Immanuel Kant" },
  { text: "La existencia precede a la esencia.", author: "Jean-Paul Sartre" },
  { text: "El ser humano está condenado a ser libre.", author: "Jean-Paul Sartre" },
  { text: "Pienso, luego existo.", author: "René Descartes" },
];

function initQuoteRotation() {
  const textEl   = document.getElementById('quoteText');
  const authorEl = document.getElementById('quoteAuthor');
  const btnEl    = document.getElementById('quoteBtn');
  if (!textEl || !authorEl) return;

  let idx = 0;

  function show(i) {
    textEl.style.opacity   = '0';
    authorEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent   = quotes[i].text;
      authorEl.textContent = '— ' + quotes[i].author;
      textEl.style.opacity   = '1';
      authorEl.style.opacity = '1';
    }, 200);
  }

  textEl.style.transition   = 'opacity 0.2s';
  authorEl.style.transition = 'opacity 0.2s';

  if (btnEl) {
    btnEl.addEventListener('click', () => {
      idx = (idx + 1) % quotes.length;
      show(idx);
    });
  }

  // Rotar cada 10 segundos automáticamente
  setInterval(() => {
    idx = (idx + 1) % quotes.length;
    show(idx);
  }, 10000);
}

/* ─────────────────────────────────────────
   8. Newsletter (feedback visual)
───────────────────────────────────────── */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (!email) return;

    const btn = form.querySelector('button');
    btn.textContent = '¡Listo! ✓';
    btn.disabled    = true;
    btn.style.background = '#27ae60';
    btn.style.color      = '#fff';
  });
}

/* ─────────────────────────────────────────
   9. Filtrado por categorías (posts.html)
───────────────────────────────────────── */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards      = document.querySelectorAll('[data-category]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;

      // Resaltar botón activo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Mostrar / ocultar tarjetas
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
          card.classList.add('animate-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Leer query param ?q=
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  if (q) {
    const qLower = q.toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(qLower) ? '' : 'none';
    });
  }
}

/* ─────────────────────────────────────────
   10. Tabla de contenidos (artículo)
───────────────────────────────────────── */
function initTableOfContents() {
  const tocList = document.getElementById('tocList');
  const article = document.querySelector('.article-body');
  if (!tocList || !article) return;

  const headings = article.querySelectorAll('h2, h3');
  if (!headings.length) { tocList.closest('.widget').style.display = 'none'; return; }

  headings.forEach((h, i) => {
    if (!h.id) h.id = 'sec-' + i;
    const li = document.createElement('li');
    li.style.marginLeft = h.tagName === 'H3' ? '1rem' : '0';
    li.style.marginBottom = '0.3rem';
    const a = document.createElement('a');
    a.href        = '#' + h.id;
    a.textContent = h.textContent.replace('§ ', '');
    a.style.cssText = `
      font-family: var(--font-ui, sans-serif);
      font-size: ${h.tagName === 'H3' ? '0.78rem' : '0.82rem'};
      font-weight: ${h.tagName === 'H2' ? '600' : '400'};
      color: var(--muted, #666);
      text-decoration: none;
      display: block;
      padding: 0.15rem 0;
      transition: color 0.2s;
    `;
    a.addEventListener('mouseenter', () => a.style.color = 'var(--accent, #c0392b)');
    a.addEventListener('mouseleave', () => a.style.color = 'var(--muted, #666)');
    li.appendChild(a);
    tocList.appendChild(li);
  });
}

/* ─────────────────────────────────────────
   11. Cargador de guías y documentos (estudiantes.html)
───────────────────────────────────────── */
function initStudentDocuments() {
  const container = document.getElementById('studentDocsList');
  const status = document.getElementById('studentDocsStatus');
  const emptyState = document.getElementById('studentDocsEmpty');
  const embeddedData = document.getElementById('studentDocsData');
  const searchInput = document.getElementById('studentDocsSearch');
  if (!container) return;
  const fallbackDocs = [
    { icon: '📘', tipo: 'Guía 10°', titulo: 'Guía de argumentación filosófica', desc: 'Plantilla base para construir tesis, razones y contraargumentos.', href: 'docs/guia-argumentacion-10.txt' },
    { icon: '⚖️', tipo: 'Guía 11°', titulo: 'Guía para resolver dilemas éticos', desc: 'Pasos para analizar casos con utilitarismo, deontología y virtud.', href: 'docs/guia-dilemas-eticos-11.txt' },
    { icon: '✅', tipo: 'Checklist', titulo: 'Checklist express para Saber 11', desc: 'Lista rápida de verificación para lectura crítica y filosofía.', href: 'docs/checklist-saber11-filosofia.txt' }
  ];
  let allDocs = [];
  let currentType = 'all';
  let currentQuery = '';

  const render = (docs) => {
    container.innerHTML = docs.map(doc => `
      <a href="${doc.href}" class="post-card" role="listitem" download>
        <div class="post-card__thumb">${doc.icon}</div>
        <div class="post-card__body">
          <div class="post-card__meta">
            <span class="tag tag--recursos">${doc.tipo}</span>
          </div>
          <h3 class="post-card__title">${doc.titulo}</h3>
          <p class="post-card__excerpt">${doc.desc}</p>
        </div>
      </a>
    `).join('');
    if (status) status.textContent = `${docs.length} documento(s) disponible(s).`;
    if (emptyState) emptyState.style.display = docs.length ? 'none' : 'block';
  };

  const applyFilters = () => {
    const source = allDocs.length ? allDocs : fallbackDocs;
    const filteredByType = currentType === 'all'
      ? source
      : source.filter(doc => doc.tipo === currentType);

    const q = currentQuery.trim().toLowerCase();
    const filtered = q
      ? filteredByType.filter(doc =>
          (`${doc.titulo} ${doc.desc} ${doc.tipo}`).toLowerCase().includes(q)
        )
      : filteredByType;

    render(filtered);
  };

  const filterButtons = document.querySelectorAll('[data-doc-filter]');
  if (filterButtons.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentType = btn.dataset.docFilter || 'all';
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentQuery = searchInput.value || '';
      applyFilters();
    });
  }

  if (embeddedData?.textContent?.trim()) {
    try {
      const parsed = JSON.parse(embeddedData.textContent);
      if (Array.isArray(parsed) && parsed.length) {
        allDocs = parsed;
        applyFilters();
        return;
      }
    } catch (_) {
      // Si falla el parseo, continúa con fetch/fallback sin bloquear.
    }
  }

  fetch('data/student-docs.json')
    .then(r => {
      if (!r.ok) throw new Error('No se pudo cargar data/student-docs.json');
      return r.json();
    })
    .then(data => {
      const docs = Array.isArray(data) ? data : fallbackDocs;
      allDocs = docs.length ? docs : fallbackDocs;
      applyFilters();
    })
    .catch(() => {
      allDocs = fallbackDocs;
      applyFilters();
      if (status) status.textContent = 'Mostrando documentos locales.';
    });
}

/* ─────────────────────────────────────────
   12. Links de universidades (estudiantes.html)
───────────────────────────────────────── */
function initUniversityLinks() {
  const listEl = document.getElementById('universitiesList');
  if (!listEl) return;

  const universities = [
    { nombre: 'Universidad Nacional de Colombia', tipo: 'publica', ciudad: 'Bogotá', url: 'https://unal.edu.co/', icono: '🛡️', admisiones: true },
    { nombre: 'Universidad de Antioquia', tipo: 'publica', ciudad: 'Medellín', url: 'https://www.udea.edu.co/', icono: '🎓', admisiones: true },
    { nombre: 'Universidad del Valle', tipo: 'publica', ciudad: 'Cali', url: 'https://www.univalle.edu.co/', icono: '🏛️', admisiones: false },
    { nombre: 'Pontificia Universidad Javeriana', tipo: 'privada', ciudad: 'Bogotá', url: 'https://www.javeriana.edu.co/', icono: '🦉', admisiones: true },
    { nombre: 'Universidad de los Andes', tipo: 'privada', ciudad: 'Bogotá', url: 'https://uniandes.edu.co/', icono: '⛰️', admisiones: false },
    { nombre: 'Universidad del Rosario', tipo: 'privada', ciudad: 'Bogotá', url: 'https://urosario.edu.co/', icono: '📜', admisiones: true }
  ];

  const render = (items) => {
    listEl.innerHTML = items.map(u => `
      <article class="university-card" role="listitem" aria-label="${u.nombre}">
        <div class="university-card__top">
          <span class="university-card__icon" aria-hidden="true">${u.icono || '🎓'}</span>
          ${u.admisiones ? '<span class="university-card__badge">Admisiones abiertas</span>' : ''}
        </div>
        <p class="university-card__type">${u.tipo === 'publica' ? 'Pública' : 'Privada'} · ${u.ciudad}</p>
        <h3 class="university-card__name">${u.nombre}</h3>
        <a href="${u.url}" target="_blank" rel="noopener noreferrer" class="university-card__btn">Visitar sitio</a>
      </article>
    `).join('');
  };

  render(universities);

  const buttons = document.querySelectorAll('[data-uni-filter]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.uniFilter || 'all';
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(filter === 'all' ? universities : universities.filter(u => u.tipo === filter));
    });
  });
}

/* ─────────────────────────────────────────
   Inicializar todo al cargar el DOM
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initBackToTop();
  initReadingProgress();
  initSearch();
  highlightActiveNav();
  initScrollAnimations();
  initQuoteRotation();
  initNewsletter();
  initCategoryFilter();
  initTableOfContents();
  initStudentDocuments();
  initUniversityLinks();
});
