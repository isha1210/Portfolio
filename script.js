/**
 * Isha Gupta Portfolio — script.js
 * Handles: smooth scrolling, navbar scroll state, active link tracking,
 *          mobile menu, scroll-reveal animations, back-to-top button.
 */

/* ── DOM ready ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ─── Element references ──────────────────────────────── */
  const navbar      = document.getElementById('navbar');
  const navLinks    = document.querySelectorAll('.nav-link');
  const hamburger   = document.getElementById('hamburger');
  const navMenu     = document.getElementById('nav-links');
  const backToTop   = document.getElementById('back-to-top');
  const sections    = document.querySelectorAll('section[id]');
  const revealEls   = document.querySelectorAll('.reveal');

  /* ─── Navbar: add scrolled class ─────────────────────── */
  const onScroll = () => {
    const scrollY = window.scrollY;

    // Scrolled class for visual update
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back-to-top button visibility
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav link — highlight the section in viewport
    let current = '';
    sections.forEach(section => {
      const sectionTop    = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });

    // Scroll-reveal elements
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('revealed');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once on load
  onScroll();

  /* ─── Mobile hamburger menu ───────────────────────────── */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });

  /* ─── Smooth scroll for nav anchors ──────────────────── */
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const top = target.offsetTop - 68; // subtract navbar height
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Scroll-reveal: add reveal class to candidates ──── */
  // Add .reveal class to key elements so they animate in on scroll
  const revealSelectors = [
    '.exp-card',
    '.artifact-card',
    '.skill-group',
    '.edu-card',
    '.contact-item',
    '.about-grid',
    '.about-stats',
  ];
  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      if (i % 3 === 1) el.classList.add('reveal-delay-1');
      if (i % 3 === 2) el.classList.add('reveal-delay-2');
    });
  });

  // Trigger a fresh scan after adding classes
  onScroll();

  /* ─── Back-to-top button ──────────────────────────────── */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── Typing effect on home title (optional subtle anim) */
  const homeGreeting = document.querySelector('.home-greeting');
  if (homeGreeting) {
    // Already handled via CSS animation; nothing extra required.
  }

  /* ─── IntersectionObserver for richer reveal fallback ── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ─── Skill tags: subtle stagger on hover group ──────── */
  document.querySelectorAll('.skill-group').forEach(group => {
    const tags = group.querySelectorAll('.skill-tag');
    group.addEventListener('mouseenter', () => {
      tags.forEach((tag, i) => {
        tag.style.transitionDelay = `${i * 30}ms`;
      });
    });
    group.addEventListener('mouseleave', () => {
      tags.forEach(tag => {
        tag.style.transitionDelay = '0ms';
      });
    });
  });

  /* ─── Artifact card: expand/collapse body (future-proof) */
  // Cards are fully expanded by default; no toggling needed as requested.

  /* ─── Active section highlight accent line ───────────── */
  // Handled via CSS .nav-link.active

});
