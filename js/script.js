/**
 * PORTAFOLIO WEB MINIMALISTA - LÓGICA JAVASCRIPT VANILLA (ES6)
 * --------------------------------------------------------------------------
 * Módulos incluidos:
 * 1. Navegación Móvil y Scroll Suave
 * 2. Sistema de Filtrado Interactivo de Proyectos (Frontend, IA, Backend)
 * 3. Validación de Formulario y Configuración EmailJS (Honeypot + Regex)
 * 4. Copyright Dinámico
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initProjectFilters();
  initContactForm();
  initDynamicCopyright();
});

/* ==========================================================================
   1. NAVEGACIÓN MÓVIL Y MENÚ HAMBURGUESA
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   Efecto Sticky Header & Subrayado Activo de Sección
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Sombra de Header al hacer scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Resaltado dinámico del enlace activo según posición de pantalla
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   2. SISTEMA DE FILTRADO DE PROYECTOS (Frontend, IA, Backend)
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.projects__filter-btn');
  const panels = document.querySelectorAll('.projects__panel');

  if (!filterBtns.length || !panels.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Actualizar estado visual de los botones de filtro
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Ocultar y mostrar paneles correspondientes
      panels.forEach(panel => {
        if (panel.getAttribute('data-category') === category) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   3. VALIDACIÓN DE FORMULARIO DE CONTACTO Y EMAILJS
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const statusMsg = document.getElementById('form-status');

  if (!form) return;

  const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const honeypot = document.getElementById('website_hp');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Bot detectado mediante Honeypot.');
      return;
    }

    clearErrors();

    const nameInput = document.getElementById('user_name');
    const emailInput = document.getElementById('user_email');
    const subjectInput = document.getElementById('user_subject');
    const messageInput = document.getElementById('user_message');

    let isValid = true;

    if (!nameInput.value.trim()) {
      showError('user_name', 'Por favor ingresa tu nombre.');
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      showError('user_email', 'Por favor ingresa tu correo electrónico.');
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      showError('user_email', 'Por favor ingresa un correo electrónico válido.');
      isValid = false;
    }

    if (!subjectInput.value.trim()) {
      showError('user_subject', 'Por favor ingresa el asunto.');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showError('user_message', 'Por favor escribe tu mensaje.');
      isValid = false;
    }

    if (!isValid) return;

    setButtonLoading(true);

    const formData = {
      user_name: nameInput.value.trim(),
      user_email: emailInput.value.trim(),
      user_subject: subjectInput.value.trim(),
      user_message: messageInput.value.trim()
    };

    if (!window.emailjs || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      setTimeout(() => {
        showStatus('¡Mensaje enviado con éxito! (Modo de prueba demostrativo. Configura tu SERVICE_ID y TEMPLATE_ID de EmailJS en script.js para recibir correos reales).', 'success');
        form.reset();
        setButtonLoading(false);
      }, 1000);
      return;
    }

    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
      .then(() => {
        showStatus('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.', 'success');
        form.reset();
      })
      .catch((err) => {
        console.error('Error al enviar mensaje con EmailJS:', err);
        showStatus('Hubo un error al enviar el mensaje. Por favor intenta de nuevo más tarde.', 'error');
      })
      .finally(() => {
        setButtonLoading(false);
      });
  });

  function showError(fieldId, message) {
    const errorSpan = document.getElementById(`error-${fieldId}`);
    if (errorSpan) {
      errorSpan.textContent = message;
    }
  }

  function clearErrors() {
    const errorSpans = document.querySelectorAll('.contact__error');
    errorSpans.forEach(span => span.textContent = '');
    if (statusMsg) {
      statusMsg.className = 'contact__status';
      statusMsg.textContent = '';
    }
  }

  function showStatus(message, type) {
    if (!statusMsg) return;
    statusMsg.textContent = message;
    statusMsg.className = `contact__status ${type}`;
  }

  function setButtonLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    const btnText = submitBtn.querySelector('span');
    if (btnText) {
      btnText.textContent = isLoading ? 'Enviando...' : 'Enviar mensaje';
    }
  }
}

/* ==========================================================================
   4. COPYRIGHT DINÁMICO
   ========================================================================== */
function initDynamicCopyright() {
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}
