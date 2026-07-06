#!/usr/bin/env bash
# =============================================================================
# Sorella — local preview launcher
# -----------------------------------------------------------------------------
# Serves the UI kit / prototype from ./component-library on http://localhost:8123
#
# USE IT TWO WAYS:
#   • Run the whole file to open all three pages:   bash preview.sh
#   • Or copy ONE numbered block below straight into your terminal to open
#     just that page — each block is self-contained (starts the server if
#     it isn't already running, then opens the page).
#
# Requirements: python3 + a browser. To STOP the server later:
#   pkill -f "http.server 8123"
# If your repo is somewhere else, change REPO on the next line.
# =============================================================================
REPO="/ahmed-taha-dev/sorella"


# ═══ 1) COMPONENT LIBRARY  →  http://localhost:8123/components.html ═══════════
curl -s -o /dev/null http://localhost:8123/ 2>/dev/null \
  || ( cd "$REPO" && nohup python3 -m http.server 8123 --directory component-library >/tmp/sorella-preview.log 2>&1 & )
sleep 1
xdg-open  http://localhost:8123/components.html 2>/dev/null \
  || open http://localhost:8123/components.html 2>/dev/null \
  || powershell.exe -c start http://localhost:8123/components.html 2>/dev/null \
  || echo "Open in your browser →  http://localhost:8123/components.html"


# ═══ 2) HOMEPAGE (storefront)  →  http://localhost:8123/index-light.html ══════
curl -s -o /dev/null http://localhost:8123/ 2>/dev/null \
  || ( cd "$REPO" && nohup python3 -m http.server 8123 --directory component-library >/tmp/sorella-preview.log 2>&1 & )
sleep 1
xdg-open  http://localhost:8123/index-light.html 2>/dev/null \
  || open http://localhost:8123/index-light.html 2>/dev/null \
  || powershell.exe -c start http://localhost:8123/index-light.html 2>/dev/null \
  || echo "Open in your browser →  http://localhost:8123/index-light.html"


# ═══ 3) PRODUCT PAGE (PDP)  →  http://localhost:8123/product.html ═════════════
curl -s -o /dev/null http://localhost:8123/ 2>/dev/null \
  || ( cd "$REPO" && nohup python3 -m http.server 8123 --directory component-library >/tmp/sorella-preview.log 2>&1 & )
sleep 1
xdg-open  http://localhost:8123/product.html 2>/dev/null \
  || open http://localhost:8123/product.html 2>/dev/null \
  || powershell.exe -c start http://localhost:8123/product.html 2>/dev/null \
  || echo "Open in your browser →  http://localhost:8123/product.html"
