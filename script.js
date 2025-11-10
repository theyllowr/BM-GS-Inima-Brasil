/* eslint-disable no-console */
(() => {
  const body = document.body;
  const loader = document.getElementById("loader");
  const typedText = document.getElementById("typedText");
  const progressBar = document.getElementById("scroll-progress");
  const navbar = document.querySelector(".navbar");
  const backToTopBtn = document.getElementById("backToTop");
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const themeToggle = document.getElementById("themeToggle");
  const particlesContainer = document.getElementById("particles");
  const heroWords = ["GSCONSIG", "Inovação", "Excelência", "Tecnologia", "Engenharia"];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const currentYearEl = document.getElementById("currentYear");
  const contactForm = document.getElementById("contactForm");
  const modal = document.getElementById("videoModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalVideo = document.getElementById("modalVideo");
  const videoTrigger = document.getElementById("videoModalTrigger");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navbarMenu = document.getElementById("navbarMenu");
  const customCursor = document.querySelector(".custom-cursor");
  const customCursorOutline = document.querySelector(".custom-cursor--outline");
  const statsSection = document.getElementById("estatisticas");
  const reduceMotion = prefersReducedMotion.matches;

  let docHeight =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let typingTimer;
  let scrollTicking = false;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const debounce = (fn, delay = 200) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(null, args), delay);
    };
  };

  const setCurrentYear = () => {
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  };

  const applyStoredTheme = () => {
    const storedTheme = localStorage.getItem("gsconsig-theme");
    if (storedTheme === "dark") {
      body.classList.add("dark-theme");
    } else if (storedTheme === "light") {
      body.classList.remove("dark-theme");
    }
    updateThemeIcon();
  };

  const updateThemeIcon = () => {
    const icon = themeToggle?.querySelector("i");
    if (!icon) return;
    if (body.classList.contains("dark-theme")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  };

  const toggleTheme = () => {
    body.classList.toggle("dark-theme");
    const theme = body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("gsconsig-theme", theme);
    updateThemeIcon();
  };

  const startTypingEffect = () => {
    if (!typedText || reduceMotion) {
      typedText.textContent = heroWords[0];
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const type = () => {
      const currentWord = heroWords[wordIndex % heroWords.length];
      if (!isDeleting) {
        typedText.textContent = currentWord.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === currentWord.length) {
          isDeleting = true;
          typingTimer = setTimeout(type, 1800);
          return;
        }
      } else {
        typedText.textContent = currentWord.slice(0, charIndex - 1);
        charIndex -= 1;
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % heroWords.length;
        }
      }
      const delay = isDeleting ? 80 : 140;
      typingTimer = setTimeout(type, delay);
    };

    type();
  };

  const clearTypingEffect = () => {
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
  };

  const initParticles = () => {
    if (!particlesContainer || reduceMotion) return;
    const existingParticles = particlesContainer.querySelectorAll(".particle");
    if (existingParticles.length) return;

    const particleCount = clamp(Math.floor(window.innerWidth / 22), 30, 80);
    for (let i = 0; i < particleCount; i += 1) {
      const particle = document.createElement("span");
      particle.className = "particle";
      const size = Math.random() * 6 + 4;
      const duration = Math.random() * 22 + 12;
      const delay = Math.random() * duration;
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const dx = (Math.random() - 0.5) * 260;
      const dy = (Math.random() - 0.5) * 260;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;
      particle.style.setProperty("--dx", `${dx}px`);
      particle.style.setProperty("--dy", `${dy}px`);
      particle.style.setProperty("--duration", `${duration}s`);
      particle.style.animationDelay = `-${delay}s`;

      particlesContainer.appendChild(particle);
    }
  };

  const updateProgressBar = () => {
    if (!progressBar) return;
    const scrolled = window.scrollY || window.pageYOffset;
    const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    progressBar.style.width = `${clamp(progress, 0, 100)}%`;
  };

  const updateNavbar = () => {
    if (!navbar) return;
    const scrolled = window.scrollY || window.pageYOffset;
    if (scrolled > 50) {
      navbar.classList.add("navbar--scrolled");
    } else {
      navbar.classList.remove("navbar--scrolled");
    }
  };

  const updateBackToTop = () => {
    if (!backToTopBtn) return;
    const scrolled = window.scrollY || window.pageYOffset;
    if (scrolled > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  };

  const updateParallax = () => {
    if (!statsSection) return;
    const offset = window.pageYOffset || 0;
    const sectionTop = statsSection.offsetTop;
    const delta = offset - sectionTop;
    const parallaxStrength = clamp(delta * 0.12, -120, 120);
    statsSection.style.backgroundPosition = `center ${parallaxStrength}px`;

    const overlay = statsSection.querySelector(".estatisticas__overlay");
    if (overlay) {
      overlay.style.transform = `translateY(${parallaxStrength * 0.15}px) scale(1.02)`;
    }
  };

  const updateOnScroll = () => {
    updateProgressBar();
    updateNavbar();
    updateBackToTop();
    updateParallax();
  };

  const handleScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateOnScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  const smoothScrollTo = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    const supportsNativeSmooth = "scrollBehavior" in document.documentElement.style;
    if (supportsNativeSmooth) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  const handleAnchorClick = (event) => {
    const link = event.currentTarget;
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    event.preventDefault();
    smoothScrollTo(href);
    if (navbarMenu?.classList.contains("open")) {
      toggleMobileMenu(false);
    }
  };

  const highlightNavSection = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const href = link.getAttribute("href")?.replace("#", "");
              if (href === id) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      {
        threshold: 0.55,
        rootMargin: "-10% 0px -35% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
  };

  const initObserverAnimations = () => {
    const targets = document.querySelectorAll(
      ".glassmorphism, .section__header, .hero__content, .hero__stat, .service-card, .info-card"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((target) => {
      target.classList.add("observe-target");
      observer.observe(target);
    });
  };

  const animateCounters = () => {
    const counters = document.querySelectorAll(".estatistica");
    if (!counters.length) return;

    const numberFormatter = new Intl.NumberFormat("pt-BR");

    const countObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target;
          const numberEl = element.querySelector(".estatistica__number");
          const endValue = parseInt(element.dataset.count, 10) || 0;
          const suffix = element.dataset.suffix || "";

          let start = null;
          const duration = 2000;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = clamp((timestamp - start) / duration, 0, 1);
            const value = Math.floor(progress * endValue);
            if (numberEl) {
              numberEl.textContent = `${numberFormatter.format(value)}${suffix}`;
            }
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };

          window.requestAnimationFrame(step);
          obs.unobserve(element);
        });
      },
      { threshold: 0.6, rootMargin: "0px 0px -10% 0px" }
    );

    counters.forEach((counter) => countObserver.observe(counter));
  };

  const initSwiper = () => {
    if (typeof Swiper === "undefined") return;
    const sliderEl = document.querySelector(".services-slider");
    if (!sliderEl) return;

    new Swiper(sliderEl, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 800,
      autoplay: reduceMotion
        ? false
        : {
            delay: 4000,
            disableOnInteraction: false,
          },
      breakpoints: {
        640: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1360: { slidesPerView: 3.3 },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  };

  const initVanillaTilt = () => {
    if (typeof VanillaTilt === "undefined") return;
    const tiltElements = document.querySelectorAll("[data-tilt]");
    if (!tiltElements.length) return;
    VanillaTilt.init(tiltElements, {
      max: 12,
      speed: 600,
      glare: true,
      "max-glare": 0.2,
      scale: 1.04,
    });
  };

  const initAOS = () => {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 120,
      disable: () => reduceMotion,
    });
  };

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalVideo?.setAttribute("aria-hidden", "false");
    if (!reduceMotion) {
      modalVideo?.play().catch(() => {
        /* Autoplay might be blocked */
      });
    }
    modalClose?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    if (modalVideo) {
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }
    videoTrigger?.focus();
  };

  const toggleMobileMenu = (forceState) => {
    if (!mobileMenuToggle || !navbarMenu) return;
    const isOpen = typeof forceState === "boolean" ? forceState : !navbarMenu.classList.contains("open");
    navbarMenu.classList.toggle("open", isOpen);
    mobileMenuToggle.classList.toggle("active", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  const initSmoothAnchors = () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));
  };

  const initBackToTop = () => {
    backToTopBtn?.addEventListener("click", () => {
      smoothScrollTo("body");
    });
  };

  const validateField = (field) => {
    const value = field.value.trim();
    const errorEl = field.parentElement?.querySelector(".form-error");
    let message = "";

    if (field.hasAttribute("required") && !value) {
      message = "Este campo é obrigatório.";
    } else if (field.type === "email") {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/iu;
      if (!emailRegex.test(value)) {
        message = "Informe um email válido.";
      }
    } else if (field.type === "tel") {
      const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        message = "Use o formato (00) 00000-0000.";
      }
    } else if (field.id === "mensagem" && value.length < 10) {
      message = "Conte mais detalhes sobre o seu projeto.";
    } else if (field.id === "nome" && value.length < 3) {
      message = "Informe pelo menos nome e sobrenome.";
    }

    if (errorEl) {
      errorEl.textContent = message;
    }

    field.setAttribute("aria-invalid", message ? "true" : "false");
    return !message;
  };

  const initFormValidation = () => {
    if (!contactForm) return;
    const successEl = contactForm.querySelector(".form-success");

    contactForm.addEventListener("input", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
        validateField(target);
      }
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const fields = Array.from(
        contactForm.querySelectorAll("input[required], textarea[required]")
      );
      const isValid = fields.every((field) => validateField(field));

      if (!isValid) {
        successEl.textContent = "";
        return;
      }

      successEl.textContent = "Mensagem enviada com sucesso! Retornaremos em breve.";
      contactForm.reset();
      fields.forEach((field) => field.setAttribute("aria-invalid", "false"));

      setTimeout(() => {
        successEl.textContent = "";
      }, 5000);
    });
  };

  const initMagneticButtons = () => {
    const magneticButtons = document.querySelectorAll(".btn--magnetic");
    magneticButtons.forEach((button) => {
      button.addEventListener("mousemove", (event) => {
        const rect = button.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        button.style.setProperty("--magnetic-x", `${relX * 0.2}px`);
        button.style.setProperty("--magnetic-y", `${relY * 0.2}px`);
        button.style.setProperty("--mag-btn-x", `${relX * 0.1}px`);
        button.style.setProperty("--mag-btn-y", `${relY * 0.1}px`);
      });

      button.addEventListener("mouseleave", () => {
        button.style.setProperty("--magnetic-x", "0px");
        button.style.setProperty("--magnetic-y", "0px");
        button.style.setProperty("--mag-btn-x", "0px");
        button.style.setProperty("--mag-btn-y", "0px");
      });
    });
  };

  const initCustomCursor = () => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || !customCursor || !customCursorOutline) {
      if (customCursor) customCursor.style.display = "none";
      if (customCursorOutline) customCursorOutline.style.display = "none";
      return;
    }

    const cursorElements = [customCursor, customCursorOutline];
    cursorElements.forEach((el) => {
      if (el) el.style.opacity = "1";
    });

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      if (customCursor) {
        customCursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      if (customCursorOutline) {
        customCursorOutline.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", (event) => {
      targetX = event.clientX - customCursor.offsetWidth / 2;
      targetY = event.clientY - customCursor.offsetHeight / 2;
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, .btn, .swiper-button-next, .swiper-button-prev"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        customCursor?.classList.add("cursor-hover");
        customCursorOutline?.classList.add("cursor-hover");
      });
      el.addEventListener("mouseleave", () => {
        customCursor?.classList.remove("cursor-hover");
        customCursorOutline?.classList.remove("cursor-hover");
      });
    });

    render();
  };

  const initKeyboardShortcuts = () => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal?.classList.contains("open")) {
        closeModal();
      }
    });
  };

  const initModal = () => {
    videoTrigger?.addEventListener("click", openModal);
    modalClose?.addEventListener("click", closeModal);
    modalOverlay?.addEventListener("click", closeModal);
  };

  const initNavbarInteractions = () => {
    mobileMenuToggle?.addEventListener("click", () => toggleMobileMenu());
    window.addEventListener(
      "resize",
      debounce(() => {
        if (window.innerWidth > 1024) {
          toggleMobileMenu(false);
        }
      }, 150)
    );
  };

  const initThemeToggle = () => {
    themeToggle?.addEventListener("click", toggleTheme);
  };

  const initEventListeners = () => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(
      "resize",
      debounce(() => {
        docHeight =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        updateProgressBar();
        updateParallax();
      }, 150)
    );
  };

  const onPageLoad = () => {
    const loaderMinDuration = 2000;
    const startTime = performance.now();

    const finalizeLoad = () => {
      loader?.classList.add("hidden");
      body.classList.remove("preload");
      initParticles();
      startTypingEffect();
      initAOS();
      initSwiper();
      initVanillaTilt();
    };

    window.addEventListener("load", () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(loaderMinDuration - elapsed, 0);
      setTimeout(finalizeLoad, remaining);
    });
  };

  const init = () => {
    if (!body) return;
    body.classList.add("preload");

    setCurrentYear();
    applyStoredTheme();
    initThemeToggle();
    initEventListeners();
    initObserverAnimations();
    initSmoothAnchors();
    initBackToTop();
    highlightNavSection();
    animateCounters();
    initFormValidation();
    initMagneticButtons();
    initCustomCursor();
    initKeyboardShortcuts();
    initModal();
    initNavbarInteractions();
    onPageLoad();

    updateOnScroll();
  };

  document.addEventListener("DOMContentLoaded", init);
})();
