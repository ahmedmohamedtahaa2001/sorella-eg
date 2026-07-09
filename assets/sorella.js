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
    //   windowSize   how many full cards are visible
    //   targetBefore how many cards sit before the active one by default
    //   decay        tier % by absolute distance from the active card;
    //                strong contrast so the focused card clearly reads as hero.
    //                Tier X → scale(X/100) + saturate(X%) + a hair of blur.
    var BP = {
      desktop: { windowSize: 4, targetBefore: 1, decay: [100, 80, 65, 50] },
      tablet:  { windowSize: 3, targetBefore: 1, decay: [100, 75, 50] },
      mobile:  { windowSize: 2, targetBefore: 0, decay: [100, 65] }
    };
    function tierAt(i, active) {
      var d = Math.abs(i - active);
      var decay = cfg.decay;
      return d < decay.length ? decay[d] : decay[decay.length - 1];
    }
    var mqDesktop = window.matchMedia('(min-width: 1001px)');
    var mqTablet  = window.matchMedia('(min-width: 721px) and (max-width: 1000px)');
    function config() {
      if (mqDesktop.matches) return BP.desktop;
      if (mqTablet.matches) return BP.tablet;
      return BP.mobile;
    }

    var cfg = config();
    var activeIndex = 0;

    function clamp(v, lo, hi) { return Math.max(lo, Math.min(v, hi)); }
    function lastIndex() { return Math.max(0, total - 1); }
    function windowSize() { return Math.min(cfg.windowSize, total); }
    function maxWindowStart() { return Math.max(0, total - windowSize()); }

    // Clamped window start — correct at the start, the end AND the
    // second-to-last position, with no special-casing and no out-of-range index.
    function windowStart() {
      return clamp(activeIndex - cfg.targetBefore, 0, maxWindowStart());
    }

    // Widest reachable window (in units of the full card width W) — sizing W to
    // this makes the fullest window exactly fill the viewport, so narrower
    // windows never overflow (no crop) and every card keeps a consistent size.
    function maxScaleSum() {
      var wsz = windowSize(), mx = 0;
      for (var a = 0; a < total; a++) {
        var ws = clamp(a - cfg.targetBefore, 0, Math.max(0, total - wsz));
        var sum = 0;
        for (var p = 0; p < wsz; p++) { var i = ws + p; if (i < total) sum += tierAt(i, a) / 100; }
        if (sum > mx) mx = sum;
      }
      return mx || 1;
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
          var nv = Math.round(f * lastIndex());
          if (nv !== activeIndex) { activeIndex = nv; render(false); }
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
      var last = lastIndex();
      var left = last > 0 ? (activeIndex / last) * (rail - tw) : 0;
      thumb.style.width = tw + 'px';
      thumb.style.transform = 'translateX(' + left + 'px)';
    }

    // ---- core render: even-gap cumulative layout + per-card tiers + controls ----
    // Cards are laid out by their *actual scaled width* plus a CONSTANT gap G,
    // so the visual space between every adjacent pair is identical regardless
    // of each card's tier (fixes the old center-in-slot uneven-gap look). The
    // full-size card width W is sized so the widest window fills the viewport;
    // the window is left-aligned and off-window cards fade out (no crop/peek).
    function render(hardSnap) {
      cfg = config();
      activeIndex = clamp(activeIndex, 0, lastIndex());
      var wsz = windowSize();
      root.style.setProperty('--cards', wsz);

      if (hardSnap) { root.classList.add('is-snapping'); void root.offsetWidth; }

      var G = parseFloat(getComputedStyle(root).getPropertyValue('--gap')) || 14;
      var edgePad = 10;
      var Vw = viewport.clientWidth;
      var W = Math.max(40, (Vw - 2 * edgePad - (wsz - 1) * G) / maxScaleSum());
      root.style.setProperty('--cardw', W + 'px');

      // scaled widths + cumulative left edges, constant gap G between every pair
      var scales = items.map(function (it, i) { return tierAt(i, activeIndex) / 100; });
      var P = [], acc = 0;
      for (var i = 0; i < total; i++) { P[i] = acc; acc += scales[i] * W + G; }

      var wsIdx = windowStart();
      var weIdx = Math.min(total - 1, wsIdx + wsz - 1);
      var windowWidth = (P[weIdx] + scales[weIdx] * W) - P[wsIdx];
      var offset = P[wsIdx] - (Vw - windowWidth) / 2; // center the window in the viewport

      items.forEach(function (it, i) {
        var t = tierAt(i, activeIndex);
        var blur = ((100 - t) * 0.015).toFixed(3);
        var inWindow = i >= wsIdx && i <= weIdx;
        // item's natural flex position is i*W; translate its left edge to P[i]
        var tx = (P[i] - offset) - i * W;
        it.style.transform = 'translateX(' + tx + 'px) scale(' + scales[i] + ')';
        it.style.filter = 'saturate(' + t + '%) blur(' + blur + 'px)';
        it.style.opacity = inWindow ? '1' : '0';
        it.style.zIndex = Math.round(scales[i] * 100);
        it.dataset.tier = t;
      });
      track.style.transform = 'none';

      if (prev) prev.disabled = activeIndex <= 0;
      if (next) next.disabled = activeIndex >= lastIndex();

      updateThumb();

      if (hardSnap) requestAnimationFrame(function () { root.classList.remove('is-snapping'); });
    }

    function go(dir) {
      var nv = clamp(activeIndex + dir, 0, lastIndex());
      if (nv === activeIndex) return;
      activeIndex = nv;
      render(false);
    }

    // ---- arrows (handlers survive the reparent below) ----
    if (prev) prev.addEventListener('click', function (e) { e.preventDefault(); go(-1); });
    if (next) next.addEventListener('click', function (e) { e.preventDefault(); go(1); });

    // ---- swipe: one index per gesture ----
    var down = false, startX = 0, moved = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      down = true; moved = false; startX = e.clientX;
      track.classList.add('is-drag');
      try { track.setPointerCapture(e.pointerId); } catch (_) {}
    });
    track.addEventListener('pointermove', function (e) {
      if (down && Math.abs(e.clientX - startX) > 6) moved = true;
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

    // ---- autoplay: step one index every 6s; glide back at the end ----
    var AUTOPLAY_MS = 6000, autoTimer = null;
    function autoAdvance() {
      if (total < 2) return;
      if (activeIndex >= lastIndex()) { activeIndex = 0; render(false); }
      else go(1);
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

  /* --- boot: one-time per-element enhancement --------------------------- */
  function boot() {
    all('[data-carousel]').forEach(initCarousel);
    initReveal(document);
    initGiftBar(document);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  // Theme editor: re-enhance carousels when a section is re-rendered.
  document.addEventListener('shopify:section:load', function (e) {
    all('[data-carousel]', e.target).forEach(initCarousel);
    initReveal(e.target);
    initGiftBar(e.target);
  });
})();
