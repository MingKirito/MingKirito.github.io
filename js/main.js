/* ═══════════════════════════════════════════════════
   PORTFOLIO — main.js
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Planet Cursor — INSTANT, no lag ───────────
  const planet = document.getElementById('cursorPlanet');
  const trail  = document.getElementById('cursorTrail');

  let mouseX = 0, mouseY = 0;
  let trailX  = 0, trailY  = 0;

  // Planet snaps to cursor instantly — no lerp, no DPI feel
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Instant position — no lag at all
    planet.style.left = mouseX + 'px';
    planet.style.top  = mouseY + 'px';
  });

  // Only the trail gets a soft lag (decorative ghost only)
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();

  // Hover state
  const interactives = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-category');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => planet.classList.add('hovering'));
    el.addEventListener('mouseleave', () => planet.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => { planet.style.opacity = '0'; trail.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { planet.style.opacity = '1'; trail.style.opacity = '1'; });


  // ── 2. Nav ───────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  }, { passive: true });


  // ── 3. Hamburger ─────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  // ── 4. Scroll Reveal ─────────────────────────────
  const revealEls = document.querySelectorAll(
    '.reveal, .timeline-item, .skill-category, .project-card, .about-grid > *, .lang-item'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => { el.classList.add('reveal'); revealObserver.observe(el); });


  // ── 5. Skill Bars ────────────────────────────────
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.width = e.target.dataset.pct + '%'; skillObserver.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-fill').forEach(f => skillObserver.observe(f));


  // ── 6. Counters ──────────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +e.target.dataset.target;
      let cur = 0;
      const step = target / 40;
      const t = setInterval(() => {
        cur += step;
        if (cur >= target) { e.target.textContent = target; clearInterval(t); }
        else e.target.textContent = Math.floor(cur);
      }, 40);
      counterObserver.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));


  // ── 7. Active Nav ────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
    navLinks.forEach(l => { l.style.color = l.getAttribute('href') === `#${current}` ? 'var(--white)' : ''; });
  }


  // ── 8. Hero Parallax ─────────────────────────────
  const heroName = document.querySelector('.hero-name');
  window.addEventListener('scroll', () => {
    if (!heroName) return;
    const s = window.scrollY;
    heroName.style.transform = `translateY(${s * 0.13}px)`;
    heroName.style.opacity   = Math.max(0, 1 - s / 480);
  }, { passive: true });


  // ── 9. Stagger cards ─────────────────────────────
  document.querySelectorAll('.project-card').forEach((c, i) => c.style.transitionDelay = `${i * 0.08}s`);
  document.querySelectorAll('.skill-category').forEach((c, i) => c.style.transitionDelay = `${i * 0.1}s`);

  // ── 9a. About Me Photo Carousel ───────────────────
  const carouselImgs = document.querySelectorAll('.carousel-img');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const prevBtn      = document.getElementById('carouselPrev');
  const nextBtn      = document.getElementById('carouselNext');
  let currentSlide   = 0;

  function goToSlide(index) {
    carouselImgs[currentSlide].classList.remove('active');
    carouselDots[currentSlide].classList.remove('active');
    currentSlide = (index + carouselImgs.length) % carouselImgs.length;
    carouselImgs[currentSlide].classList.add('active');
    carouselDots[currentSlide].classList.add('active');
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  carouselDots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(+dot.dataset.index));
  });

  // ── 9b. Skills Tab Switching ──────────────────────
  const tabs   = document.querySelectorAll('.skills-tab');
  const panels = document.querySelectorAll('.skills-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update tab active state
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Hide all panels then show target
      panels.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });

      const targetPanel = document.getElementById(`panel-${target}`);
      if (targetPanel) {
        targetPanel.style.display = 'block';
        // Trigger reflow for animation
        targetPanel.offsetHeight;
        targetPanel.classList.add('active');

        // Re-trigger skill bar animations if switching to technical
        if (target === 'technical') {
          targetPanel.querySelectorAll('.skill-fill').forEach(fill => {
            fill.style.width = '0';
            setTimeout(() => { fill.style.width = fill.dataset.pct + '%'; }, 50);
          });
        }
      }
    });
  });


  // ── 10. Contact Form ─────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      btn.textContent = 'Sent! ✓';
      btn.style.background = 'linear-gradient(135deg, var(--green), var(--blue))';
      setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

  // ── 10b. Email Copy to Clipboard ─────────────────
  const emailBtn = document.getElementById('emailCopy');
  const toast    = document.getElementById('toast');
  let toastTimer = null;

  if (emailBtn) {
    emailBtn.addEventListener('click', () => {
      const email = emailBtn.dataset.email;
      navigator.clipboard.writeText(email).then(() => {
        // Show toast
        toast.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
      }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        toast.classList.add('show');
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
      });
    });
  }


  // ══════════════════════════════════════════════════
  // ── 11. DRAG TO SCROLL ────────────────────────────
  // ══════════════════════════════════════════════════

  const dragArrow   = document.getElementById('dragArrow');
  let isDragging    = false;
  let lastPointerY  = 0;
  let velocity      = 0;
  let momentumID    = null;

  // Position arrow offset from planet (to the right)
  const ARROW_OFFSET_X = 26;
  const ARROW_OFFSET_Y = 0;

  function updateArrow(deltaY) {
    // Place arrow beside the planet
    dragArrow.style.left = (mouseX + ARROW_OFFSET_X) + 'px';
    dragArrow.style.top  = (mouseY + ARROW_OFFSET_Y) + 'px';

    if (deltaY > 0.5) {
      dragArrow.classList.remove('going-up');
      dragArrow.classList.add('going-down');
    } else if (deltaY < -0.5) {
      dragArrow.classList.remove('going-down');
      dragArrow.classList.add('going-up');
    }
  }

  document.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, input, textarea, select, label')) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    isDragging   = true;
    lastPointerY = e.clientY;
    velocity     = 0;

    if (momentumID) { cancelAnimationFrame(momentumID); momentumID = null; }
    e.target.setPointerCapture?.(e.pointerId);
    document.body.style.userSelect = 'none';
    planet.classList.add('dragging');

    // Show arrow at cursor position
    dragArrow.style.left = (mouseX + ARROW_OFFSET_X) + 'px';
    dragArrow.style.top  = (mouseY + ARROW_OFFSET_Y) + 'px';
    dragArrow.classList.add('visible');

    e.preventDefault();
  }, { passive: false });

  document.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const delta = lastPointerY - e.clientY;
    lastPointerY = e.clientY;
    velocity = delta;

    window.scrollBy({ top: delta, behavior: 'instant' });
    updateArrow(delta);
  }, { passive: true });

  function stopDrag() {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.userSelect = '';
    planet.classList.remove('dragging');

    // Hide arrow
    dragArrow.classList.remove('visible', 'going-down', 'going-up');

    let v = velocity * 6;
    function coast() {
      if (Math.abs(v) < 0.5) return;
      window.scrollBy({ top: v, behavior: 'instant' });
      v *= 0.88;
      momentumID = requestAnimationFrame(coast);
    }
    coast();
  }

  document.addEventListener('pointerup',     stopDrag);
  document.addEventListener('pointercancel', stopDrag);


  // ══════════════════════════════════════════════════
  // ── 12. BOTTOM EDGE AUTO-SCROLL ───────────────────
  // ══════════════════════════════════════════════════
  const EDGE_ZONE = 90;
  const MAX_SPD   = 14;
  let edgeID      = null;

  const bottomZone = document.createElement('div');
  bottomZone.className = 'drag-zone bottom';
  document.body.appendChild(bottomZone);

  document.addEventListener('mousemove', (e) => {
    if (isDragging) return;

    const fromBottom = window.innerHeight - e.clientY;
    const atBottom   = window.scrollY + window.innerHeight >= document.body.scrollHeight - 5;

    if (fromBottom <= EDGE_ZONE && !atBottom) {
      bottomZone.classList.add('active');
      if (!edgeID) {
        function edgeStep() {
          const fb = window.innerHeight - mouseY;
          const ok = fb <= EDGE_ZONE && window.scrollY + window.innerHeight < document.body.scrollHeight - 5;
          if (!ok) { edgeID = null; bottomZone.classList.remove('active'); return; }
          const depth = 1 - fb / EDGE_ZONE;
          window.scrollBy({ top: depth * depth * MAX_SPD, behavior: 'instant' });
          edgeID = requestAnimationFrame(edgeStep);
        }
        edgeStep();
      }
    } else {
      bottomZone.classList.remove('active');
      if (edgeID) { cancelAnimationFrame(edgeID); edgeID = null; }
    }
  });

});