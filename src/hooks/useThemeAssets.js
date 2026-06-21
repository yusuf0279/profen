import { useEffect } from 'react'

const cssLinks = [
  'https://fonts.googleapis.com/css2?family=Exo:ital,wght@0,100..900;1,100..900&family=Inter:wght@100..900&display=swap',
  '/wp-content/themes/rakar/assets/css/fontawesome.min.css',
  '/wp-content/themes/rakar/assets/css/bootstrap.min.css',
  '/wp-content/themes/rakar/assets/css/magnific-popup.min.css',
  '/wp-content/themes/rakar/assets/css/swiper-bundle.min.css',
  '/wp-content/themes/rakar/assets/css/th-wl.css',
  '/wp-content/themes/rakar/style.css',
  '/wp-content/themes/rakar/assets/css/style.css',
  '/wp-content/themes/rakar/assets/css/color.schemes.css',
  '/wp-content/plugins/elementor/assets/css/frontend.min.css',
  '/wp-content/plugins/elementor/assets/css/widget-heading.min.css',
  '/wp-content/plugins/elementor/assets/css/widget-image.min.css',
  '/wp-content/plugins/elementor/assets/lib/swiper/v8/css/swiper.min.css',
  '/wp-content/plugins/elementor/assets/css/conditionals/e-swiper.min.css',
  '/wp-content/plugins/elementor/assets/css/widget-image-carousel.min.css',
]

const headScripts = [
  '/wp-includes/js/jquery/jquery.min.js',
  '/wp-includes/js/jquery/jquery-migrate.min.js',
]

const bodyScripts = [
  '/wp-includes/js/jquery/ui/core.min.js',
  '/wp-includes/js/jquery/ui/mouse.min.js',
  '/wp-includes/js/jquery/ui/slider.min.js',
  '/wp-includes/js/imagesloaded.min.js',
  '/wp-content/themes/rakar/assets/js/bootstrap.min.js',
  '/wp-content/themes/rakar/assets/js/swiper-bundle.min.js',
  '/wp-content/themes/rakar/assets/js/jquery.magnific-popup.min.js',
  '/wp-content/themes/rakar/assets/js/jquery.counterup.min.js',
  '/wp-content/themes/rakar/assets/js/isotope.pkgd.min.js',
  '/wp-content/themes/rakar/assets/js/main.js',
]

const metaTags = [
  { name: 'description', content: 'Welcome To Profen' },
  { name: 'robots', content: 'max-image-preview:large' },
  { property: 'og:locale', content: 'en_US' },
  { property: 'og:site_name', content: 'Profen Engineering – Building the Future with Integrity' },
  { property: 'og:type', content: 'website' },
  { property: 'og:image', content: '/wp-content/uploads/2024/07/logo_pe-new-bk-70.png' },
  { property: 'og:image:secure_url', content: '/wp-content/uploads/2024/07/logo_pe-new-bk-70.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:image', content: '/wp-content/uploads/2024/07/logo_pe-new-bk-70.png' },
  { name: 'msapplication-TileImage', content: '/wp-content/uploads/2024/07/favicon-lp-300x300.png' },
]

const linkTags = [
  { rel: 'canonical', href: '/' },
  { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
  { rel: 'icon', href: '/wp-content/uploads/2024/07/favicon-lp-80x80.png', sizes: '32x32' },
  { rel: 'icon', href: '/wp-content/uploads/2024/07/favicon-lp-300x300.png', sizes: '192x192' },
  { rel: 'apple-touch-icon', href: '/wp-content/uploads/2024/07/favicon-lp-300x300.png' },
]

let cssLoadCount = 0
let totalCSS = 0

function checkAllCSSLoaded() {
  cssLoadCount++
  if (cssLoadCount >= totalCSS) {
    window.__cssReady = true
    document.dispatchEvent(new Event('css-ready'))
  }
}

function injectCSS(href) {
  if (document.querySelector(`link[href="${href}"]`)) {
    checkAllCSSLoaded()
    return
  }
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.onload = checkAllCSSLoaded
  link.onerror = checkAllCSSLoaded
  document.head.appendChild(link)
}

function injectScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return
  const script = document.createElement('script')
  script.src = src
  script.async = false
  script.defer = false
  document.body.appendChild(script)
}

export default function useThemeAssets() {
  useEffect(() => {
    metaTags.forEach(({ name, property, content }) => {
      const attr = name ? 'name' : 'property'
      const val = name || property
      if (document.querySelector(`meta[${attr}="${val}"]`)) return
      const meta = document.createElement('meta')
      meta.setAttribute(attr, val)
      meta.content = content
      document.head.appendChild(meta)
    })
    linkTags.forEach(({ rel, href, sizes }) => {
      if (document.querySelector(`link[rel="${rel}"][href="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (sizes) link.sizes = sizes
      document.head.appendChild(link)
    })
    totalCSS = cssLinks.length
    cssLinks.forEach(injectCSS)
    headScripts.forEach(injectScript)
    bodyScripts.forEach(injectScript)
  }, [])
}
