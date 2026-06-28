# Profen Engineering — React SPA

A React single-page application that recreates [profeneng.com](https://profeneng.com) (WordPress + Elementor + Rakar theme) as a fast, portable frontend.

## Architecture

```
src/
├── main.jsx              Entry point — imports all CSS, mounts React
├── App.jsx               Router setup (BrowserRouter, Routes, lazy pages)
├── components/
│   ├── Layout.jsx        Shared layout wrapper (Header + Footer + Outlet)
│   ├── Header.jsx        Injects raw Elementor header HTML
│   ├── Footer.jsx        Injects raw Elementor footer HTML
│   └── WhatsAppButton.jsx Custom floating WhatsApp widget (replaces broken plugin)
├── pages/
│   ├── Home.jsx          Page: /
│   ├── About.jsx         Page: /about
│   ├── Services.jsx      Page: /service
│   ├── ServiceDetail.jsx Page: /service/:slug
│   ├── Project.jsx       Page: /project
│   └── Contact.jsx       Page: /contact
├── hooks/
│   ├── useLayoutInit.js  Re-initializes theme JS on route change
│   └── useNavFix.js      Intercepts links for proper SPA routing
├── data/                 Raw Elementor HTML content (fetched from WP)
│   ├── home-content.html
│   ├── about-content.html
│   ├── service-content.html
│   ├── project-content.html
│   ├── contact-content.html
│   ├── layout-header.html
│   ├── layout-footer.html
│   └── servicePages.js   Maps slugs to service detail page HTML
├── css/                  Page-specific Elementor CSS (extracted from WP)
│   ├── kit.css           Elementor kit CSS (global styles)
│   ├── theme.css         Rakar theme overrides
│   ├── layout.css        Header (elementor-945) + Footer (elementor-128) CSS
│   ├── pages.css         Combined CSS for all 5 main pages
│   ├── services.css      Combined CSS for all 9 service detail pages
│   └── pages/            Individual page CSS files (development reference)
│       ├── page-23.css   Home page
│       ├── page-31.css   About page
│       ├── page-32.css   Services listing
│       ├── page-36.css   Project page
│       ├── page-48.css   Contact page
│       └── service-*.css Individual service detail pages
```

## Strategy: WordPress-in-React

This app uses a "render what WordPress built" approach:

1. **Page content** is raw Elementor HTML from WordPress (`src/data/*.html`)
2. **Injected via** `dangerouslySetInnerHTML` in page components
3. **Styling** arrives from two places:
   - Build-time CSS imports (`src/css/*.css`) — Elementor's page-specific CSS
   - Runtime `<link>` tags (`index.html`) — Theme stylesheets from `public/wp-content/themes/rakar/`
4. **Behavior** comes from the original Rakar theme JS loaded via `<script>` tags in `index.html`
5. **Theme re-initialization** on route change is handled by `useLayoutInit.js` via `requestAnimationFrame` polling

### Why This Works

Elementor pages are self-contained: each page has a unique CSS class (`.elementor-<postId>`) and the HTML references it. By loading ALL page CSS at once and the correct page HTML per route, we get pixel-perfect WordPress output without running PHP.

## Key Fixes & Workarounds

| Issue | Solution |
|-------|----------|
| Elementor lazyload hides background images | Removed `.e-con.e-parent:nth-of-type(n+4):not(.e-lazyloaded)` CSS that applies `background-image: none !important` (was in `theme.css` — already cleaned) |
| Elfsight WhatsApp plugin crashes page | Replaced with custom `WhatsAppButton.jsx` component |
| Theme JS not found on route change | `useLayoutInit.js` polls with `requestAnimationFrame` until `window.rakar_content_load_scripts` is available |
| SPA links reload page | `useNavFix.js` intercepts same-site links, uses `react-router-dom`'s `useNavigate` |
| Missing Elementor JS dependencies | Added `webpack.runtime.min.js` and `frontend-modules.min.js` to `index.html` |
| Waypoint plugin 404 | Created empty shim at `public/wp-includes/js/waypoint.min.js` |

## Setup & Development

```bash
cd react-app
npm install
npm run dev          # Vite dev server (HMR enabled)
```

## Build & Deploy

```bash
npm run build        # Outputs to dist/
```

The site is served via a **Python3 HTTP server** on port 8011:

```bash
cd dist && python3 -m http.server 8011
```

No CI/CD pipeline is configured — deploy is manual.

### Production File Structure

```
dist/
├── index.html                  7.6 KB
├── assets/index-*.css         94 KB  (all CSS bundled)
├── assets/index-*.js         262 KB  (main bundle)
├── assets/Home-*.js           70 KB
├── assets/About-*.js          27 KB
├── assets/Services-*.js       30 KB
├── assets/ServiceDetail-*.js  69 KB
├── assets/Project-*.js         6 KB
├── assets/Contact-*.js         9 KB
└── assets/*.wasm               (if any)
```

All other assets (theme CSS/JS, Elementor assets, images) are served from `public/wp-content/` and `public/wp-includes/`.

## CSS Organization

CSS files in `src/css/` are imported at build time via `main.jsx`. They become part of the single `index-*.css` bundle:

```js
// main.jsx
import './css/kit.css'
import './css/theme.css'
import './css/layout.css'
import './css/pages.css'
import './css/services.css'
```

To update styles:
- **Theme overrides** → edit `theme.css`
- **Header/Footer layout** → edit `layout.css`
- **Individual page styles** → edit `pages/page-<id>.css`, then regenerate `pages.css`
- **Service detail styles** → edit `pages/service-<id>.css`, then regenerate `services.css`

### Regenerating Combined CSS

After editing individual page files:

```bash
cat src/css/pages/page-*.css > src/css/pages.css
cat src/css/pages/service-*.css > src/css/services.css
```

## Updating Content

1. Download updated HTML from WordPress
2. Replace the corresponding file in `src/data/`
3. Update the CSS in `src/css/pages/` if Elementor page CSS changed
4. Rebuild: `npm run build`
5. Deploy: restart Python server with new `dist/`
