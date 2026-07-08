/* Sorella — light storefront interactions. Progressive: forms still work without JS.
   Hooks:
   [data-qty] wrapper · [data-qty-step="-1|1"] buttons · input[data-qty-input]
   [data-menu-toggle="id"] · [data-close] · panel[data-panel][id]
   [data-gallery-thumb] inside a gallery with [data-gallery-main]
   [data-size] radios/labels within [data-sizes]
*/
(function () {
  'use strict';

  // Quantity steppers
  document.addEventListener('click', function (e) {
    var step = e.target.closest('[data-qty-step]');
    if (step) {
      var wrap = step.closest('[data-qty]');
      var input = wrap && wrap.querySelector('[data-qty-input]');
      if (input) {
        var v = parseInt(input.value || input.textContent || '1', 10) || 1;
        v = Math.max(1, v + parseInt(step.getAttribute('data-qty-step'), 10));
        if ('value' in input) input.value = v; else input.textContent = v;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      return;
    }

    // Cart drawer toggle — opens the [data-panel] id="cart-drawer".
    // (Namespaced convenience hook; header/PDP add-to-cart can call this after
    //  a /cart/add.js to reveal the drawer. Progressive: falls back to /cart.)
    var cartToggle = e.target.closest('[data-cart-toggle]');
    if (cartToggle) {
      var cartPanel = document.getElementById(cartToggle.getAttribute('data-cart-toggle') || 'cart-drawer');
      if (cartPanel) {
        e.preventDefault();
        cartPanel.classList.add('is-open');
        document.body.classList.add('is-locked');
      }
      return;
    }

    // Panels (mobile menu / drawers)
    var toggle = e.target.closest('[data-menu-toggle]');
    if (toggle) {
      var panel = document.getElementById(toggle.getAttribute('data-menu-toggle'));
      if (panel) { panel.classList.toggle('is-open'); document.body.classList.toggle('is-locked', panel.classList.contains('is-open')); }
      return;
    }
    var closer = e.target.closest('[data-close]');
    if (closer) {
      var openPanel = closer.closest('[data-panel]') || document.querySelector('[data-panel].is-open');
      if (openPanel) { openPanel.classList.remove('is-open'); document.body.classList.remove('is-locked'); }
      return;
    }

    // Wishlist heart — visual toggle (no persistence yet)
    var wish = e.target.closest('[data-wish]');
    if (wish) {
      e.preventDefault();
      var on = wish.classList.toggle('on');
      wish.setAttribute('aria-pressed', on ? 'true' : 'false');
      return;
    }

    // Carousel prev/next arrows — scroll the [data-carousel-track] by one viewport
    var arrow = e.target.closest('[data-carousel-prev],[data-carousel-next]');
    if (arrow) {
      // Arrows live in the section header, a sibling of [data-carousel] — scope to
      // the section to reach the track (closest('[data-carousel]') would be null).
      var cscope = arrow.closest('[data-carousel]') || arrow.closest('.sec') || arrow.closest('section') || document;
      var atrack = cscope.querySelector('[data-carousel-track]');
      if (atrack) {
        var dir = arrow.hasAttribute('data-carousel-prev') ? -1 : 1;
        var aitem = atrack.querySelector('.carousel__item');
        var agap = parseFloat(getComputedStyle(atrack).columnGap) || 18;
        var astep = aitem ? Math.round(aitem.getBoundingClientRect().width + agap) : Math.round(atrack.clientWidth * 0.85);
        atrack.scrollBy({ left: dir * astep, behavior: 'smooth' });  // one card per click
      }
      return;
    }

    // Gallery thumbnails
    var thumb = e.target.closest('[data-gallery-thumb]');
    if (thumb) {
      var gal = thumb.closest('[data-gallery]');
      if (gal) {
        gal.querySelectorAll('[data-gallery-thumb]').forEach(function (t) { t.classList.remove('on'); });
        thumb.classList.add('on');
        var main = gal.querySelector('[data-gallery-main] img');
        var src = thumb.getAttribute('data-full') || (thumb.querySelector('img') && thumb.querySelector('img').src);
        if (main && src) main.src = src;
      }
      return;
    }

    // Size ladder selection (visual)
    var size = e.target.closest('[data-size]');
    if (size) {
      var sizes = size.closest('[data-sizes]');
      if (sizes) { sizes.querySelectorAll('[data-size]').forEach(function (s) { s.classList.remove('on'); }); size.classList.add('on'); }
    }
  });

  // Esc closes panels
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var open = document.querySelector('[data-panel].is-open');
      if (open) { open.classList.remove('is-open'); document.body.classList.remove('is-locked'); }
    }
  });

  /* ======================================================================
     Extensions — carousel dots + drag, count-up, progress reveal, quick-buy.
     All wired to the theme's existing hooks; delegated where possible so
     content injected later (e.g. quick-buy) is enhanced automatically.
     Motion respects prefers-reduced-motion.
     ====================================================================== */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* --- Carousel: dots, drag-to-scroll, arrow disabled-state -------------
     Hooks: [data-carousel] > [data-carousel-track]
            [data-carousel-prev] / [data-carousel-next]
            [data-carousel-dots] (optional; JS fills it, one dot per page)
     Arrow scrolling itself stays on the delegated handler above; here we
     only add dots, drag, and edge/active sync.                           */
  function initCarousel(root) {
    if (root.hasAttribute('data-carousel-ready')) return;
    var track = root.querySelector('[data-carousel-track]');
    if (!track) return;
    root.setAttribute('data-carousel-ready', '');

    var navScope = root.closest('.sec') || root.closest('section') || document;
    var prev = navScope.querySelector('[data-carousel-prev]');
    var next = navScope.querySelector('[data-carousel-next]');
    var dotsBox = root.querySelector('[data-carousel-dots]');
    var items = all('.carousel__item', track);
    if (!items.length) items = Array.prototype.slice.call(track.children);
    var dots = [];

    // Reusable peek sizing: a per-carousel data-carousel-cards="N" wins; otherwise
    // < 10 items → 3 cards visible (+ a quarter each side), 10 or more → 4.
    // CSS reads --cards to size the columns.
    var forcedCards = root.getAttribute('data-carousel-cards');
    root.style.setProperty('--cards', forcedCards || (items.length < 10 ? '3' : '4'));

    // Active-card effect (mirrors the reviews rotator): a card fully inside the
    // scroll viewport stays lit + full-scale; any card clipped by the left/right
    // edge fades + shrinks. Driven by IntersectionObserver on the track — visibility
    // based, so it works while dragging AND while arrow-driven smooth-scrolling, with
    // no scroll math and no flicker. We observe the (never-transformed) wrapper, so
    // the inner card's scale can't feed back into the measured ratio.
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          e.target.classList.toggle('is-carousel-active', e.intersectionRatio > 0.98);
        });
      }, { root: track, threshold: [0, 0.5, 0.9, 0.98, 1] });
      items.forEach(function (it) { io.observe(it); });
      root.classList.add('is-io');
    } else {
      items.forEach(function (it) { it.classList.add('is-carousel-active'); });
    }

    // ---- horizontal scrollbar (replaces the pagination dots) ----
    var thumb = null, sbDragging = false;

    function buildScrollbar() {
      if (!dotsBox) return;
      if (track.scrollWidth - track.clientWidth <= 4) { dotsBox.style.display = 'none'; return; }
      dotsBox.style.display = '';
      if (!thumb) {
        dotsBox.classList.add('is-scrollbar');
        dotsBox.innerHTML = '<span class="carousel__scrollthumb" data-scrollthumb></span>';
        thumb = dotsBox.querySelector('[data-scrollthumb]');

        function scrollFromX(clientX) {
          var r = dotsBox.getBoundingClientRect();
          var tw = thumb.offsetWidth;
          var f = (clientX - r.left - tw / 2) / Math.max(1, r.width - tw);
          f = Math.max(0, Math.min(1, f));
          track.scrollTo({ left: f * (track.scrollWidth - track.clientWidth), behavior: 'auto' });
        }
        dotsBox.addEventListener('pointerdown', function (e) {
          sbDragging = true;
          try { dotsBox.setPointerCapture(e.pointerId); } catch (_) {}
          scrollFromX(e.clientX); e.preventDefault();
        });
        dotsBox.addEventListener('pointermove', function (e) { if (sbDragging) scrollFromX(e.clientX); });
        function sbEnd(e) { if (!sbDragging) return; sbDragging = false; try { dotsBox.releasePointerCapture(e.pointerId); } catch (_) {} }
        dotsBox.addEventListener('pointerup', sbEnd);
        dotsBox.addEventListener('pointercancel', sbEnd);
      }
      updateThumb();
    }

    function updateThumb() {
      if (!thumb) return;
      var sw = track.scrollWidth, cw = track.clientWidth, railW = dotsBox.clientWidth;
      var tw = Math.max(32, Math.round(railW * (cw / sw)));
      var maxScroll = sw - cw;
      var left = maxScroll > 0 ? (track.scrollLeft / maxScroll) * (railW - tw) : 0;
      thumb.style.width = tw + 'px';
      thumb.style.transform = 'translateX(' + left + 'px)';
    }

    function sync() {
      if (items.length) {
        var tr = track.getBoundingClientRect();
        var f = items[0].getBoundingClientRect();
        var l = items[items.length - 1].getBoundingClientRect();
        if (prev) prev.disabled = f.left >= tr.left - 4;
        if (next) next.disabled = l.right <= tr.right + 4;
      }
      updateThumb();
    }

    var ticking = false;
    track.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; sync(); });
    }, { passive: true });
    window.addEventListener('resize', function () { buildScrollbar(); sync(); });

    // pointer drag-to-scroll
    var down = false, startX = 0, startLeft = 0, moved = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add('is-drag');
      try { track.setPointerCapture(e.pointerId); } catch (_) {}
    });
    track.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startLeft - dx;
    });
    function release() { if (!down) return; down = false; track.classList.remove('is-drag'); }
    track.addEventListener('pointerup', release);
    track.addEventListener('pointercancel', release);
    track.addEventListener('lostpointercapture', release);
    // swallow the click that ends a real drag so cards/links don't fire
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    // ---- unified autoplay: advance one card every 6s; glide back at the end ----
    var AUTOPLAY_MS = 6000;
    var autoTimer = null, returning = false;

    function cardStep() {
      var w = items[0] ? items[0].getBoundingClientRect().width : track.clientWidth;
      var g = parseFloat(getComputedStyle(track).columnGap) || 18;
      return Math.round(w + g);
    }
    function atEnd() {
      if (!items.length) return true;
      var tr = track.getBoundingClientRect();
      return items[items.length - 1].getBoundingClientRect().right <= tr.right + 4;
    }
    function glideToStart() {
      // custom eased scroll so scroll-snap can't turn the long return into a jump
      var start = track.scrollLeft;
      if (start < 2) return;
      returning = true;
      var t0 = null, dur = 900, prevSnap = track.style.scrollSnapType;
      track.style.scrollSnapType = 'none';
      function ease(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
      function frame(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        track.scrollLeft = Math.round(start * (1 - ease(p)));
        if (p < 1) { requestAnimationFrame(frame); }
        else { track.style.scrollSnapType = prevSnap || ''; returning = false; }
      }
      requestAnimationFrame(frame);
    }
    function autoAdvance() {
      if (returning) return;
      if (atEnd()) { glideToStart(); }
      else { track.scrollBy({ left: cardStep(), behavior: 'smooth' }); }
    }
    function autoStop() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function autoStart() { if (reduce || items.length < 2) return; autoStop(); autoTimer = setInterval(autoAdvance, AUTOPLAY_MS); }
    root.addEventListener('mouseenter', autoStop);
    root.addEventListener('mouseleave', autoStart);
    root.addEventListener('focusin', autoStop);
    root.addEventListener('focusout', autoStart);
    autoStart();

    // Move prev/next arrows out of the header into a bottom control row that flanks
    // the scrollbar: [ ← ][ scrollbar ][ → ]. Handlers find them by section scope,
    // so reparenting doesn't break clicks.
    if (dotsBox && prev && next) {
      var oldNav = prev.parentNode;
      var controls = document.createElement('div');
      controls.className = 'carousel__controls';
      dotsBox.parentNode.insertBefore(controls, dotsBox);
      controls.appendChild(prev);
      controls.appendChild(dotsBox);
      controls.appendChild(next);
      if (oldNav && oldNav.classList.contains('carousel__nav') && !oldNav.children.length) oldNav.remove();
    }

    buildScrollbar();
    sync();
  }

  /* --- Count-up: animate 0 -> value once on scroll ---------------------
     Hook: [data-count="1288"] (optional data-decimals, data-duration,
     data-group="false"). Thousands grouping on by default.               */
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
    function stepFn(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(stepFn);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(stepFn);
  }

  /* --- Reveal on scroll: count-up + progress fill ----------------------
     count-up on [data-count]; .is-in on .pbar/.psteps/.pring (CSS fills). */
  function initReveal(ctx) {
    var counts = all('[data-count]', ctx).filter(function (el) { return !el.hasAttribute('data-count-done'); });
    var bars = all('.pbar, .psteps, .pring', ctx).filter(function (el) { return !el.classList.contains('is-in'); });
    var targets = counts.concat(bars);
    if (!targets.length) return;

    function fire(el) {
      if (el.hasAttribute('data-count')) { el.setAttribute('data-count-done', ''); animateCount(el); }
      else el.classList.add('is-in');
    }
    if (!('IntersectionObserver' in window)) { targets.forEach(fire); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        fire(en.target);
        io.unobserve(en.target);
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* --- Quick-buy modal --------------------------------------------------
     Card carries [data-quick-buy="{handle}"]. Clicking anywhere on the card
     (including the product-name <a>) opens #quick-buy and fetches the
     sorella-quick-buy section for that product. Clicks on the real
     add-to-bag button, cart toggles, or any [data-no-quickbuy] element are
     left alone so their native behaviour runs. qty/size steppers inside the
     injected markup work via the delegated handlers above.               */
  var quickBuyReturn = null;
  function openQuickBuy(handle, trigger) {
    var panel = document.getElementById('quick-buy');
    if (!panel || !handle) return;
    var body = panel.querySelector('[data-quick-buy-body]');
    quickBuyReturn = trigger || null;
    panel.classList.add('is-open');
    panel.classList.add('is-loading');
    document.body.classList.add('is-locked');

    if (body) {
      var loadingText = panel.getAttribute('data-quick-buy-loading') || '';
      body.innerHTML = '<div class="quickbuy__state" role="status" aria-live="polite">' +
        '<span class="quickbuy__spinner" aria-hidden="true"></span>' +
        (loadingText ? '<span class="quickbuy__msg">' + loadingText + '</span>' : '') + '</div>';
    }

    fetch('/products/' + encodeURIComponent(handle) + '?section_id=sorella-quick-buy', {
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) {
        panel.classList.remove('is-loading');
        if (!body) return;
        body.innerHTML = html;
        // enhance any carousels / counters / progress that came in with it
        all('[data-carousel]', body).forEach(initCarousel);
        initReveal(body);
      })
      .catch(function () {
        panel.classList.remove('is-loading');
        if (!body) return;
        var errText = panel.getAttribute('data-quick-buy-error') || '';
        var linkText = panel.getAttribute('data-quick-buy-link') || '';
        var href = '/products/' + encodeURIComponent(handle);
        body.innerHTML = '<div class="quickbuy__state quickbuy__state--error" role="alert">' +
          (errText ? '<span class="quickbuy__msg">' + errText + '</span>' : '') +
          '<a class="quickbuy__link" href="' + href + '">' +
          (linkText || href) + '</a></div>';
      });
  }

  document.addEventListener('click', function (e) {
    var card = e.target.closest('[data-quick-buy]');
    if (!card) return;
    // leave the real add-to-bag button, cart toggles, and opted-out nodes alone
    if (e.target.closest('[data-no-quickbuy],[data-cart-toggle],[data-qty-step],button[name="add"],[data-add-to-cart]')) return;
    e.preventDefault();
    openQuickBuy(card.getAttribute('data-quick-buy'), card);
  });

  // restore focus to the card that opened quick-buy when the panel closes
  document.addEventListener('click', function (e) {
    if (!quickBuyReturn) return;
    var closer = e.target.closest('[data-close]');
    var panel = document.getElementById('quick-buy');
    if (closer && panel && closer.closest('[data-panel]') === panel) {
      var t = quickBuyReturn; quickBuyReturn = null;
      if (t && t.focus) t.focus();
    }
  });

  /* --- boot: one-time per-element enhancement --------------------------- */
  function boot() {
    all('[data-carousel]').forEach(initCarousel);
    initReveal(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  // Theme editor: re-enhance carousels when a section is re-rendered.
  document.addEventListener('shopify:section:load', function (e) {
    all('[data-carousel]', e.target).forEach(initCarousel);
    initReveal(e.target);
  });
})();
