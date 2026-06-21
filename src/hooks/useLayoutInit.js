import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { injectPageCss } from './elementorCss'

export default function useLayoutInit() {
  const { pathname } = useLocation()

  useEffect(() => {
    injectPageCss(pathname)
  }, [pathname])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window.rakar_content_load_scripts === 'function') {
        document.querySelectorAll('.th-slider').forEach(el => {
          if (el.swiper) {
            try { el.swiper.destroy(true, true) } catch (e) {}
          }
        })
        window.rakar_content_load_scripts()
      }
      window.__layoutReady = true
      window.dispatchEvent(new Event('layout-ready'))
    }, 300)
    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const els = document.querySelectorAll('[data-bg-src]')
    els.forEach(node => {
      const src = node.getAttribute('data-bg-src')
      if (src) {
        node.style.backgroundImage = `url(${src})`
        node.classList.add('background-image')
      }
    })
  }, [pathname])
}
