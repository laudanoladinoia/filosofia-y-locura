# 📚 Filosofía y Locura — Blog Educativo

Blog de filosofía y ética para estudiantes de grado 10° y 11° en Colombia.
Diseñado para desplegarse gratis en **GitHub Pages**.

---

## 📁 Estructura de archivos

```
filosofia-y-locura/
│
├── index.html              ← Página principal
├── etica.html              ← Categoría: Ética
├── filosofia.html          ← Categoría: Filosofía
├── talleres.html           ← Categoría: Talleres
├── recursos.html           ← Recursos y PDFs
├── acerca.html             ← (crear si deseas)
│
├── posts/                  ← Artículos individuales
│   └── el-dilema-del-prisionero.html   ← Artículo de ejemplo completo
│
├── css/
│   └── styles.css          ← Todos los estilos
│
└── js/
    ├── scripts.js          ← Interacciones y funcionalidades
    └── components.js       ← Helper opcional (layout compartido)
```

---

## 🚀 Cómo desplegar en GitHub Pages (paso a paso)

### Paso 1: Crear una cuenta en GitHub
Ve a [github.com](https://github.com) y crea una cuenta gratuita si no tienes una.

### Paso 2: Crear un repositorio nuevo
1. Haz clic en el botón verde **"New"** o **"+"** → **"New repository"**
2. Dale un nombre, por ejemplo: `filosofia-y-locura`
3. Márcalo como **Público** (requerido para GitHub Pages gratis)
4. Haz clic en **"Create repository"**

### Paso 3: Subir los archivos
**Opción A — Desde el navegador (más fácil):**
1. En tu nuevo repositorio, haz clic en **"uploading an existing file"**
2. Arrastra y suelta TODOS los archivos y carpetas del proyecto
3. Asegúrate de que la estructura de carpetas sea correcta
4. Haz clic en **"Commit changes"**

**Opción B — Con Git (para avanzados):**
```bash
git init
git add .
git commit -m "Primer commit: blog completo"
git remote add origin https://github.com/TU_USUARIO/filosofia-y-locura.git
git push -u origin main
```

### Paso 4: Activar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Haz clic en **"Settings"** (configuración)
3. En el menú izquierdo, busca **"Pages"**
4. En "Source", selecciona **"Deploy from a branch"**
5. En "Branch", selecciona **"main"** y la carpeta **"/ (root)"**
6. Haz clic en **"Save"**

### Paso 5: Esperar y acceder
- Espera 2-5 minutos
- Tu blog estará en: `https://TU_USUARIO.github.io/filosofia-y-locura/`
- ¡Comparte ese enlace con tus estudiantes!

---

## ✏️ Cómo crear un nuevo artículo

1. Copia el archivo `posts/el-dilema-del-prisionero.html`
2. Renómbralo con el tema del artículo (sin espacios, con guiones):
   `posts/nombre-del-tema.html`
3. Edita el contenido:
   - Cambia el `<title>` en el `<head>`
   - Modifica la sección `.article-header`
   - Escribe tu contenido en `.article-body`
4. Agrega el enlace al nuevo artículo en `index.html` y en la página de categoría correspondiente
5. Sube el archivo a GitHub → se actualiza automáticamente en 1-2 minutos

---

## 💬 Cómo activar los comentarios (Disqus)

1. Ve a [disqus.com](https://disqus.com) y crea una cuenta gratuita
2. Haz clic en **"Get Started"** → **"I want to install Disqus on my site"**
3. Dale un nombre a tu sitio y elige un **shortname** (ej: `filosofia-y-locura`)
4. En cada artículo (`posts/*.html`), busca el comentario que dice `TU-SHORTNAME-AQUI`
5. Reemplázalo con tu shortname real
6. Descomenta el bloque `<div id="disqus_thread">` y el `<script>`
7. ¡Listo! Los estudiantes podrán comentar sin necesidad de backend

---

## 📹 Cómo incrustar un video de YouTube

1. Ve al video en YouTube
2. Haz clic en **"Compartir"** → **"Insertar"**
3. Copia la URL del `src` del iframe (formato: `https://www.youtube.com/embed/ID_VIDEO`)
4. En tu artículo, usa esta estructura:

```html
<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/TU_ID_DE_VIDEO"
    title="Descripción del video"
    allowfullscreen loading="lazy">
  </iframe>
</div>
```

---

## 📄 Cómo incrustar un PDF

**Opción 1 — PDF en tu repositorio:**
```html
<iframe src="assets/mi-documento.pdf" class="pdf-embed" title="Mi PDF"></iframe>
```

**Opción 2 — PDF en Google Drive (recomendado para archivos grandes):**
1. Sube el PDF a Google Drive
2. Haz clic derecho → "Obtener enlace" → "Cualquier persona con el enlace"
3. Copia el ID del archivo del URL
4. Usa:
```html
<iframe
  src="https://drive.google.com/file/d/TU_ID_AQUI/preview"
  class="pdf-embed"
  title="Mi PDF">
</iframe>
```

---

## 🎨 Cómo personalizar el blog

### Cambiar colores (en `css/styles.css`):
```css
:root {
  --ink:     #1a1a2e;    /* Color principal (texto, header) */
  --accent:  #c0392b;    /* Color de acento (rojo) */
  --accent-2: #e67e22;   /* Color secundario (naranja) */
  --paper:   #faf8f3;    /* Fondo de la página */
}
```

### Cambiar el nombre del blog:
Busca y reemplaza `Filosofía y Locura` en todos los archivos HTML.

### Cambiar las fuentes:
En `css/styles.css`, modifica el `@import` de Google Fonts y las variables `--font-display`, `--font-ui`, `--font-body`.

---

## 🛠️ Tecnologías usadas

- **HTML5** semántico con roles ARIA para accesibilidad
- **CSS3** puro: variables, Grid, Flexbox, animaciones
- **JavaScript** vanilla (sin frameworks ni dependencias)
- **Google Fonts**: Playfair Display, Syne, Lora
- **Disqus** (opcional) para comentarios
- **GitHub Pages** para hosting gratuito

---

## 📞 ¿Necesitas ayuda?


Si tienes problemas para desplegar, revisa:
- [Documentación oficial de GitHub Pages](https://docs.github.com/en/pages)
- Que todos los archivos estén en la carpeta raíz del repositorio
- Que el archivo principal se llame `index.html` (en minúsculas)
