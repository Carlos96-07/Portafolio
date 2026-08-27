# Portafolio Web Profesional - Desarrollador Web Agéntico

Este repositorio contiene el sitio web de portafolio personal, desarrollado con **HTML5 semántico, CSS3 Vanilla y JavaScript moderno (ES6)** sin dependencias ni frameworks pesados. Está optimizado para un rendimiento óptimo, accesibilidad (WCAG AA), SEO y preparado para despliegue directo en **GitHub Pages**.

---

## 📁 Estructura del Proyecto

```
/
├── index.html               # Estructura semántica del sitio web
├── robots.txt               # Configuración de rastreo para buscadores
├── sitemap.xml              # Mapa del sitio para SEO
├── README.md                # Documentación del proyecto
├── css/
│   └── styles.css           # Sistema de diseño, tokens CSS variables y responsive
├── js/
│   └── script.js            # Lógica JS (Menú móvil, Filtros, Carrusel, EmailJS)
└── assets/
    ├── images/              # Imágenes optimizadas en formato .webp
    │   ├── hero-profile.webp
    │   ├── about-workspace.webp
    │   ├── project-frontend-1.webp
    │   ├── project-frontend-2.webp
    │   └── project-frontend-3.webp
    └── icons/               # Íconos vectoriales SVG (tecnologías y certificaciones)
```

---

## 🎨 Paleta de Colores y Diseño

El sitio respeta una paleta sobria y minimalista de 4 tonos principales:
- **Blanco (`#ffffff`)**: Fondos principales y textos sobre fondo oscuro.
- **Negro (`#0a0a0a`)**: Fondos de Hero, Certificaciones, Footer y botones de acción principal.
- **Gris (`#4a4a4a`)**: Encabezados `h2` y párrafos secundarios sobre fondo claro.
- **Gris Transparente (`rgba(...)`)**: Logotipos de certificaciones con filtro `grayscale(100%) opacity(50%)` por defecto que se colorean al pasar el ratón (`:hover`), bordes sutiles y tarjetas.

---

## ⚙️ Configuración de EmailJS (Formulario de Contacto)

El formulario de contacto utiliza **EmailJS** para enviar mensajes directamente desde el navegador a tu correo electrónico sin requerir backend.

### Pasos para conectar tu cuenta:
1. Crea una cuenta en [EmailJS](https://www.emailjs.com/).
2. Añade un **Email Service** (ej. Gmail, Outlook) y copia tu `SERVICE_ID`.
3. Crea una **Email Template** con las variables:
   - `{{user_name}}`
   - `{{user_email}}`
   - `{{user_subject}}`
   - `{{user_message}}`
   y copia tu `TEMPLATE_ID`.
4. Obtén tu `PUBLIC_KEY` desde **Account > Public Key**.
5. Abre `js/script.js` y reemplaza los marcadores en las constantes:
   ```javascript
   const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID';
   const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID';
   const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY';
   ```

*Nota de seguridad: NUNCA expongas tu Private Key en el código fuente frontend. La Public Key es la única diseñada para uso seguro en el navegador.*

---

## 🚀 Despliegue en GitHub Pages

1. **Crear repositorio en GitHub**:
   Crea un nuevo repositorio público en GitHub (ej. `portafolio-web` o `tu-usuario.github.io`).

2. **Subir el código**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portafolio Web"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/portafolio-web.git
   git push -u origin main
   ```

3. **Activar GitHub Pages**:
   - En tu repositorio de GitHub, ve a **Settings > Pages**.
   - En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
   - Haz clic en **Save**.
   - En un par de minutos, tu sitio estará disponible en `https://tu-usuario.github.io/portafolio-web/`.

---

## 🏆 Certificaciones Incluidas

1. AI Fundamentals with IBM (Cisco)
2. Microsoft Automatización de IA
3. Machine Learning with Python (IBM)
4. Foundations of Prompt Engineering (AWS)
5. Scrum Fundamentals (SCRUM Study)
6. Building Quality Software QA Architect (Tecnológico de Costa Rica)
