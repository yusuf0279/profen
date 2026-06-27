import { useEffect } from 'react'

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

export default function useThemeAssets() {
  useEffect(() => {
    window.__cssReady = true
    document.dispatchEvent(new Event('css-ready'))

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
  }, [])
}
