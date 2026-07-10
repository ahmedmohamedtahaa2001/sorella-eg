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

    // Carousel prev/next arrows are handled per-carousel in initCarousel()
    // (index-based focus-shift state machine), not via this delegated handler.

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

  /* --- Carousel: graduated distance-based tier state machine -----------
     Hooks: [data-carousel] > [data-carousel-track] > .carousel__item …
            [data-carousel-prev] / [data-carousel-next]
            [data-carousel-dots]  (optional — becomes a progress indicator)

     One focused card (activeIndex) at 100%. Every card's scale AND colour
     saturation are driven together (1:1) by a single per-breakpoint decay
     table indexed by ABSOLUTE DISTANCE from the active card — the same
     distance always yields the same tier, so transitions are monotonic (a
     card's tier changes by at most one step per click, never a jump).
     The window is positioned by a clamped start index, which handles the
     first/last/second-to-last positions with no special-casing. The track is
     placed with translateX (never native scroll). Breakpoints match this
     theme's own rhythm (≤720 mobile, 721–1000 tablet, ≥1001 desktop).      */
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
    var total = items.length;

    // Static clip window around the (transformed) track: hides the off-window
    // cards horizontally so nothing is cropped, while padding-block keeps
    // vertical card shadows / hover-lift visible.
    var viewport = track.parentNode;
    if (!viewport.classList.contains('carousel__viewport')) {
      viewport = document.createElement('div');
      viewport.className = 'carousel__viewport';
      track.parentNode.insertBefore(viewport, track);
      viewport.appendChild(track);
    }

    // ---- per-breakpoint config ----
    //   targetBefore / targetAfter — how many cards flank the active one;
    //   windowSize = targetBefore + 1 + targetAfter visible cards.
    // The carousel is INFINITE / CIRCULAR: activeIndex is an unbounded integer
    // and every card's role is resolved purely by modular index math over the
    // fixed set of real DOM cards — no clones, no shared-track reset, no
    // start/end. The visible window pattern is identical at every activeIndex.
    var BP = {
      desktop: { targetBefore: 1, targetAfter: 2 },
      tablet:  { targetBefore: 1, targetAfter: 1 },
      mobile:  { targetBefore: 0, targetAfter: 1 }
    };
    // Signed-offset tier table (offset = card position relative to active).
    // The window shows offsets [-targetBefore, +targetAfter]; the single offset
    // just outside each edge is a transparent BUFFER so entering / leaving cards
    // slide in and out instead of popping. Forward-biased: +1 (90%) reads larger
    // than -1 (80%). Tier X → scale(X/100) + saturate(X%) + a hair of blur.
    var OFFSET_TIERS = { '-2': 70, '-1': 80, '0': 100, '1': 90, '2': 80, '3': 70 };
    function tier(o) { var v = OFFSET_TIERS[String(o)]; return v == null ? 70 : v; }

    // True modulo (handles negatives): mod(-1, 8) === 7. Maps any activeIndex —
    // which grows or shrinks without bound as the user keeps clicking — back onto
    // a real card index. Never used as a raw array index directly; always via this.
    function mod(n, m) { return ((n % m) + m) % m; }

    var mqDesktop = window.matchMedia('(min-width: 1001px)');
    var mqTablet  = window.matchMedia('(min-width: 721px) and (max-width: 1000px)');
    function config() {
      if (mqDesktop.matches) return BP.desktop;
      if (mqTablet.matches) return BP.tablet;
      return BP.mobile;
    }

    var cfg = config();
    var activeIndex = 0; // unbounded integer — resolved through mod(), never clamped

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(v, hi)); }
    function windowSize() { return cfg.targetBefore + 1 + cfg.targetAfter; }

    // Signed circular offset of DOM card i from the active card, mapped to
    // (-total/2, total/2] so each real card takes exactly one nearest role.
    function offsetOf(i) {
      var raw = mod(i - activeIndex, total);
      return raw * 2 > total ? raw - total : raw;
    }

    // ---- progress indicator (reuses the old scrollbar element) ----
    var thumb = null;
    function buildThumb() {
      if (!dotsBox) return;
      if (total <= 1) { dotsBox.style.display = 'none'; return; }
      dotsBox.style.display = '';
      if (!thumb) {
        dotsBox.classList.add('is-scrollbar');
        dotsBox.innerHTML = '<span class="carousel__scrollthumb" data-scrollthumb></span>';
        thumb = dotsBox.querySelector('[data-scrollthumb]');
        var railDrag = false;
        function fromX(clientX) {
          var r = dotsBox.getBoundingClientRect();
          var f = clamp((clientX - r.left) / Math.max(1, r.width), 0, 1);
          var nv = Math.round(f * (total - 1));
          if (nv !== mod(activeIndex, total)) { activeIndex = nv; render(false); }
        }
        dotsBox.addEventListener('pointerdown', function (e) {
          railDrag = true;
          try { dotsBox.setPointerCapture(e.pointerId); } catch (_) {}
          fromX(e.clientX); e.preventDefault();
        });
        dotsBox.addEventListener('pointermove', function (e) { if (railDrag) fromX(e.clientX); });
        function railEnd(e) { railDrag = false; try { dotsBox.releasePointerCapture(e.pointerId); } catch (_) {} }
        dotsBox.addEventListener('pointerup', railEnd);
        dotsBox.addEventListener('pointercancel', railEnd);
      }
    }
    function updateThumb() {
      buildThumb();
      if (!thumb) return;
      var rail = dotsBox.clientWidth;
      var tw = Math.max(32, Math.round(rail * (windowSize() / total)));
      var pos = mod(activeIndex, total); // position within the current cycle
      var left = total > 1 ? (pos / (total - 1)) * (rail - tw) : 0;
      thumb.style.width = tw + 'px';
      thumb.style.transform = 'translateX(' + left + 'px)';
    }

    // ---- core render: per-card offset positioning (no shared track transform) --
    // Every card is placed FRESH from its circular offset to the active card, so
    // nothing accumulates and there is never a reset. The active card sits at
    // offset 0; the visible window [-targetBefore, +targetAfter] is centred in
    // the viewport. Cards outside the window fade to 0 (and stop catching
    // pointers); the ones just outside park at the buffer edge so they slide in.
    function render(hardSnap) {
      cfg = config();
      var wsz = windowSize();
      var tB = cfg.targetBefore, tA = cfg.targetAfter;
      var bufB = tB + 1, bufA = tA + 1;           // one transparent buffer each side
      var winCenter = (tA - tB) / 2;              // window midpoint, in offset units
      root.style.setProperty('--cards', wsz);

      if (hardSnap) { root.classList.add('is-snapping'); void root.offsetWidth; }

      var G = parseFloat(getComputedStyle(root).getPropertyValue('--gap')) || 14;
      var edgePad = 10;
      var Vw = viewport.clientWidth;
      // Size the full card W so the visible window exactly fills the viewport;
      // slot is the constant centre-to-centre spacing between adjacent cards.
      var sL = tier(-tB) / 100, sR = tier(tA) / 100;
      var denom = (wsz - 1) + (sL + sR) / 2;
      var W = Math.max(40, (Vw - 2 * edgePad - (wsz - 1) * G) / denom);
      var slot = W + G;
      root.style.setProperty('--cardw', W + 'px');

      var vpCenter = Vw / 2;
      items.forEach(function (it, i) {
        var o = offsetOf(i);
        var inWindow = o >= -tB && o <= tA;
        // Position/tier use the offset clamped to the buffer edge, so any card
        // beyond the buffer parks invisibly at the edge — the wrap never jumps.
        var op = clamp(o, -bufB, bufA);
        var t = tier(op);
        var s = t / 100;
        var blur = ((100 - t) * 0.015).toFixed(3);
        var targetCenter = vpCenter + (op - winCenter) * slot;
        var tx = targetCenter - (i * W + W / 2); // shift natural flex centre to target
        it.style.transform = 'translateX(' + tx + 'px) scale(' + s + ')';
        it.style.filter = 'saturate(' + t + '%) blur(' + blur + 'px)';
        it.style.opacity = inWindow ? '1' : '0';
        it.style.pointerEvents = inWindow ? '' : 'none';
        it.style.zIndex = Math.round(s * 100);
        it.dataset.tier = t;
      });
      track.style.transform = 'none';

      // Infinite loop → no boundaries → both arrows are always enabled.
      if (prev) prev.disabled = false;
      if (next) next.disabled = false;

      updateThumb();

      if (hardSnap) requestAnimationFrame(function () { root.classList.remove('is-snapping'); });
    }

    function go(dir) {
      activeIndex += dir; // unbounded; mod() resolves it to a real card, so the
      render(false);      // motion at the "wrap" is identical to any other step
    }

    // ---- arrows (handlers survive the reparent below) ----
    if (prev) prev.addEventListener('click', function (e) { e.preventDefault(); go(-1); });
    if (next) next.addEventListener('click', function (e) { e.preventDefault(); go(1); });

    // ---- swipe: one index per gesture ----
    var down = false, startX = 0, moved = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      down = true; moved = false; startX = e.clientX;
      // Do NOT engage drag mode yet: adding .is-drag (which sets pointer-events:
      // none on the cards) or capturing the pointer on a plain press reparents
      // the click target off the card's link, so nothing navigates. Wait for a
      // real horizontal move first.
    });
    track.addEventListener('pointermove', function (e) {
      if (!down || moved) return;
      if (Math.abs(e.clientX - startX) > 6) {
        moved = true;                       // a real drag — now suppress card interactions
        track.classList.add('is-drag');
        try { track.setPointerCapture(e.pointerId); } catch (_) {}
      }
    });
    function swipeEnd(e) {
      if (!down) return;
      down = false; track.classList.remove('is-drag');
      try { track.releasePointerCapture(e.pointerId); } catch (_) {}
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    }
    track.addEventListener('pointerup', swipeEnd);
    track.addEventListener('pointercancel', swipeEnd);
    track.addEventListener('lostpointercapture', swipeEnd);
    // swallow the click that ends a real drag so card links don't fire
    track.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    // ---- autoplay: step one index every 4s; loops forever (no end to reset) ----
    var AUTOPLAY_MS = 4000, autoTimer = null;
    function autoAdvance() {
      if (total < 2) return;
      go(1);
    }
    function autoStop() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
    function autoStart() { if (reduce || total < 2) return; autoStop(); autoTimer = setInterval(autoAdvance, AUTOPLAY_MS); }
    root.addEventListener('mouseenter', autoStop);
    root.addEventListener('mouseleave', autoStart);
    root.addEventListener('focusin', autoStop);
    root.addEventListener('focusout', autoStart);

    // Move prev/next arrows out of the header into a bottom control row that
    // flanks the progress indicator: [ ← ][ progress ][ → ].
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

    // Re-clamp + re-layout on breakpoint change (hard snap — don't animate the
    // breakpoint transition itself) and on resize (px widths change).
    function onViewportChange() { render(true); }
    if (mqDesktop.addEventListener) {
      mqDesktop.addEventListener('change', onViewportChange);
      mqTablet.addEventListener('change', onViewportChange);
    } else if (mqDesktop.addListener) {
      mqDesktop.addListener(onViewportChange);
      mqTablet.addListener(onViewportChange);
    }
    var rt = false;
    window.addEventListener('resize', function () {
      if (rt) return; rt = true;
      requestAnimationFrame(function () { rt = false; render(true); });
    });

    render(true);
    autoStart();
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

  /* --- Reveal whole sections on scroll ---------------------------------
     Each page section fades + rises gently into place as it enters the
     viewport. Reuses the theme's .reveal-pending/.is-revealed CSS, which is
     reduced-motion-gated and only ever applied by JS (so no-JS renders
     everything visible). Only sections BELOW the fold at load are pre-hidden,
     so above-the-fold content never flashes — anything already in view stays
     visible immediately. Header/footer groups live outside #main-content and
     are never touched.                                                    */
  function initSectionReveal(ctx) {
    if (reduce) return;                              // respect reduced motion
    if (!('IntersectionObserver' in window)) return; // old browsers: leave visible
    var scope = (ctx && ctx !== document) ? ctx : document;
    var sections = all('#main-content > .shopify-section', scope);
    // shopify:section:load hands us the reloaded section itself, not the page.
    if (!sections.length && ctx && ctx.classList && ctx.classList.contains('shopify-section')) {
      sections = [ctx];
    }
    if (!sections.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-revealed');
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    var vh = window.innerHeight || document.documentElement.clientHeight;
    sections.forEach(function (el) {
      if (el.dataset.revealInit) return;
      el.dataset.revealInit = '1';
      // Any part already in view on load → keep visible (no pre-hide, no flash).
      if (el.getBoundingClientRect().top < vh) return;
      el.classList.add('reveal-pending');
      io.observe(el);
    });
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

  /* FAQ accordion — exclusive open: opening one panel closes the others so
     no two are ever open at once. The `toggle` event doesn't bubble, so we
     listen in the capture phase. Scoped to .faq__acc — the PDP .acc accordion
     is intentionally left free to keep several panels open. */
  document.addEventListener('toggle', function (e) {
    var d = e.target;
    if (!d || d.tagName !== 'DETAILS' || !d.open) return;
    var acc = d.closest('.faq__acc');
    if (!acc) return;
    acc.querySelectorAll(':scope > details[open]').forEach(function (other) {
      if (other !== d) other.open = false;
    });
  }, true);

  /* --- Free-gift announcement bar: live cart sync ---------------------- *
     The bar renders correct from Liquid on every load; this keeps it live
     when the cart changes without a full reload (AJAX adds dispatch
     `cart:updated`) and corrects any full-page-cached total. */
  function initGiftBar(scope) {
    var bar = (scope || document).querySelector('[data-gift-bar]');
    if (!bar || bar.__giftInit) return;
    bar.__giftInit = true;

    var threshold = parseInt(bar.getAttribute('data-threshold'), 10) || 0;
    var fmt = bar.getAttribute('data-money-format') || '{{amount}}';

    function money(cents) {
      var value = cents / 100;
      var withDec = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      var noDec = Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return fmt
        .replace(/\{\{\s*amount\s*\}\}/g, withDec)
        .replace(/\{\{\s*amount_with_comma_separator\s*\}\}/g, withDec)
        .replace(/\{\{\s*amount_no_decimals\s*\}\}/g, noDec)
        .replace(/\{\{\s*amount_no_decimals_with_comma_separator\s*\}\}/g, noDec);
    }

    function render(total) {
      if (threshold <= 0) return;
      var pct = Math.min(100, Math.round(total / threshold * 100));
      var remaining = Math.max(0, threshold - total);
      var fill = bar.querySelector('[data-gift-fill]');
      var msg = bar.querySelector('[data-gift-msg]');
      var track = bar.querySelector('[data-gift-track]');
      if (fill) fill.style.width = pct + '%';
      if (track) track.setAttribute('aria-valuenow', pct);
      if (!msg) return;
      if (total >= threshold) {
        msg.innerHTML = (bar.getAttribute('data-unlocked') || '') + ' 🎁';
        bar.classList.add('is-unlocked');
      } else {
        msg.innerHTML = (bar.getAttribute('data-away') || '').replace('[amount]', '<b>' + money(remaining) + '</b>');
        bar.classList.remove('is-unlocked');
      }
    }

    function sync() {
      fetch('/cart.js', { headers: { 'Accept': 'application/json' }, credentials: 'same-origin' })
        .then(function (r) { return r.json(); })
        .then(function (c) { render(c.total_price); })
        .catch(function () {});
    }

    document.addEventListener('cart:updated', sync);
    sync();
  }

  /* --- Hero slideshow: crossfade slides + synced copy, autoplay --------
     Hook: [data-hero-slideshow][data-interval] wrapping .hero__slide
     elements, with .hero__dot buttons ([data-goto]). Pauses on hover and
     when the tab is hidden; no autoplay under reduced motion.            */
  function initHeroSlideshow(root) {
    all('[data-hero-slideshow]', root).forEach(function (hero) {
      if (hero.hasAttribute('data-hero-done')) return;
      hero.setAttribute('data-hero-done', '');
      var slides = all('.hero__slide', hero);
      var dots = all('.hero__dot', hero);
      if (slides.length < 2) return;
      var interval = parseInt(hero.getAttribute('data-interval') || '6000', 10);
      var i = 0, timer = null;
      function countUp(el) {
        var target = parseFloat(el.getAttribute('data-hero-count'));
        if (isNaN(target)) return;
        var dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
        var dur = parseInt(el.getAttribute('data-duration') || '1500', 10);
        function fmt(n) { return n.toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
        if (reduce) { el.textContent = fmt(target); return; }
        var start = null;
        function stepFn(ts) {
          if (start === null) start = ts;
          var p = Math.min(1, (ts - start) / dur);
          el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(stepFn); else el.textContent = fmt(target);
        }
        el.textContent = fmt(0);
        requestAnimationFrame(stepFn);
      }
      function show(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
        dots.forEach(function (d, k) {
          var on = k === i;
          d.classList.toggle('is-active', on);
          d.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        var num = slides[i].querySelector('[data-hero-count]');
        if (num) countUp(num);
      }
      function start() { if (reduce || timer) return; timer = setInterval(function () { show(i + 1); }, interval); }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }
      dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); stop(); start(); }); });
      hero.addEventListener('mouseenter', stop);
      hero.addEventListener('mouseleave', start);
      document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
      show(0);
      start();
    });
  }

  /* --- boot: one-time per-element enhancement --------------------------- */
  function boot() {
    all('[data-carousel]').forEach(initCarousel);
    initReveal(document);
    initSectionReveal(document);
    initGiftBar(document);
    initHeroSlideshow(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  // Theme editor: re-enhance carousels when a section is re-rendered.
  document.addEventListener('shopify:section:load', function (e) {
    all('[data-carousel]', e.target).forEach(initCarousel);
    initReveal(e.target);
    initSectionReveal(e.target);
    initGiftBar(e.target);
    initHeroSlideshow(e.target);
  });
})();
