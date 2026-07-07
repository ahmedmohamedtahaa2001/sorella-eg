/* ==========================================================================
   Sorella UI Kit — interactive component behaviour
   Vanilla JS, no dependencies. Progressive enhancement: every component
   renders fine without this file; the script only adds motion + controls.
   Covers: carousels · count-up numbers · progress bars/rings · drawers.
   ========================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- utils */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ============================================================= CAROUSEL
     Markup:  [data-carousel]
                .carousel__track  (the scroller)
                [data-carousel-prev] / [data-carousel-next]
                [data-carousel-dots] (optional container)
     Arrows scroll by ~one page; drag-to-scroll on the track; dots + arrow
     disabled-states reflect scroll position.                              */
  function initCarousel(root) {
    var track = $('.carousel__track', root);
    if (!track) return;
    var prev = $('[data-carousel-prev]', root);
    var next = $('[data-carousel-next]', root);
    var dotsBox = $('[data-carousel-dots]', root);
    var items = $all('.carousel__item', track);

    function page() {
      var first = items[0];
      if (!first) return track.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 18;
      var per = Math.max(1, Math.floor(track.clientWidth / (first.getBoundingClientRect().width + gap)));
      return per * (first.getBoundingClientRect().width + gap);
    }
    function scrollByPage(dir) {
      track.scrollBy({ left: dir * page(), behavior: reduce ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { scrollByPage(-1); });
    if (next) next.addEventListener('click', function () { scrollByPage(1); });

    /* dots — one per "page" */
    var dots = [];
    if (dotsBox) {
      var pages = Math.max(1, Math.ceil(track.scrollWidth / track.clientWidth));
      dotsBox.innerHTML = '';
      for (var i = 0; i < pages; i++) {
        var d = document.createElement('button');
        d.className = 'carousel__dot';
        d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        (function (idx) {
          d.addEventListener('click', function () {
            track.scrollTo({ left: idx * track.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
          });
        })(i);
        dotsBox.appendChild(d);
        dots.push(d);
      }
    }

    function sync() {
      /* rect-based edge detection — robust to scroll-snap padding, where the
         resting start/end never reach exactly 0 / scrollWidth-clientWidth */
      if (items.length) {
        var tr = track.getBoundingClientRect();
        var first = items[0].getBoundingClientRect();
        var last = items[items.length - 1].getBoundingClientRect();
        if (prev) prev.disabled = first.left >= tr.left - 4;
        if (next) next.disabled = last.right <= tr.right + 4;
      }
      if (dots.length) {
        var active = Math.round(track.scrollLeft / track.clientWidth);
        dots.forEach(function (d, i) { d.classList.toggle('on', i === active); });
      }
    }
    track.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    /* pointer drag-to-scroll */
    var down = false, startX = 0, startLeft = 0, moved = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add('is-drag');
    });
    track.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startLeft - dx;
    });
    function release() {
      if (!down) return;
      down = false; track.classList.remove('is-drag');
    }
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);
    track.addEventListener('pointerleave', release);
    /* swallow the click that ends a real drag so links don't fire */
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
  }

  /* ============================================================= COUNT-UP
     Markup:  [data-count="1288"]  optional data-decimals, data-duration
     Text content is animated from 0 → value the first time it scrolls in.
     Grouping (thousands) is applied; prefix/suffix live in sibling spans.  */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var dur = parseInt(el.getAttribute('data-duration') || '1600', 10);
    var group = el.getAttribute('data-group') !== 'false';
    function fmt(n) {
      var s = n.toFixed(decimals);
      if (group) {
        var parts = s.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        s = parts.join('.');
      }
      return s;
    }
    if (reduce) { el.textContent = fmt(target); return; }
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3); /* easeOutCubic */
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }

  /* ===================================================== REVEAL ON SCROLL
     One IntersectionObserver fires:
       • count-up on [data-count]
       • .is-in on .pbar / .psteps / .pring (CSS handles the fill motion)   */
  function initReveal() {
    var counts = $all('[data-count]');
    var bars = $all('.pbar, .psteps, .pring');
    var all = counts.concat(bars);
    if (!all.length) return;

    if (!('IntersectionObserver' in window)) {
      counts.forEach(animateCount);
      bars.forEach(function (b) { b.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        if (el.hasAttribute('data-count')) animateCount(el);
        else el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    all.forEach(function (el) { io.observe(el); });
  }

  /* ================================================================ DRAWER
     Trigger:  [data-drawer-open="cart"]      (value = target id)
     Drawer:   #cart.cartdrawer  with .cartdrawer__scrim + [data-drawer-close]
     Toggles .is-open, locks body scroll, closes on scrim / Esc / close btn,
     restores focus to the trigger. Smooth via the CSS transitions.        */
  function initDrawers() {
    var openTrigger = null;

    function openDrawer(id, trigger) {
      var d = document.getElementById(id);
      if (!d) return;
      d.classList.add('is-open');
      d.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-open');
      openTrigger = trigger || null;
      var focusable = d.querySelector('[data-drawer-close], button, a, input, [tabindex]');
      if (focusable) focusable.focus({ preventScroll: true });
    }
    function closeDrawer(d) {
      if (!d) return;
      d.classList.remove('is-open');
      d.setAttribute('aria-hidden', 'true');
      if (!$('.cartdrawer.is-open')) document.body.classList.remove('drawer-open');
      if (openTrigger) { openTrigger.focus({ preventScroll: true }); openTrigger = null; }
    }

    $all('[data-drawer-open]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openDrawer(btn.getAttribute('data-drawer-open'), btn);
      });
    });

    $all('.cartdrawer').forEach(function (d) {
      $all('[data-drawer-close], .cartdrawer__scrim, .cartdrawer__close', d).forEach(function (x) {
        x.addEventListener('click', function () { closeDrawer(d); });
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var open = $('.cartdrawer.is-open');
        if (open) closeDrawer(open);
      }
    });
  }

  /* ============================================================ QUANTITY
     Small nicety so the [data-qty] steppers in the kit actually count.    */
  function initQty() {
    $all('.qty').forEach(function (q) {
      var val = q.querySelector('span');
      var btns = q.querySelectorAll('button');
      if (!val || btns.length < 2) return;
      btns[0].addEventListener('click', function () {
        val.textContent = Math.max(1, (parseInt(val.textContent, 10) || 1) - 1);
      });
      btns[1].addEventListener('click', function () {
        val.textContent = (parseInt(val.textContent, 10) || 1) + 1;
      });
    });
  }

  /* ------------------------------------------------------------------ go */
  function boot() {
    $all('[data-carousel]').forEach(initCarousel);
    initReveal();
    initDrawers();
    initQty();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
