import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useLayoutInit() {
  const { pathname } = useLocation()

  // Re-initialize theme JS on route change
  useEffect(() => {
    let destroyed = false
    let rafId = null

    function tryInit() {
      if (destroyed) return

      // Apply data-bg-src to elements
      document.querySelectorAll('[data-bg-src]').forEach(el => {
        const src = el.getAttribute('data-bg-src')
        if (src && !el.classList.contains('background-image')) {
          el.style.backgroundImage = `url(${src})`
          el.classList.add('background-image')
        }
      })

      // Check if jQuery and theme init function are ready
      if (typeof window.jQuery === 'function' && typeof window.rakar_content_load_scripts === 'function') {
        try {
          // Destroy ALL existing swiper instances to prevent duplicates
          document.querySelectorAll('.swiper').forEach(el => {
            if (el.swiper) {
              try { el.swiper.destroy(true, true) } catch (e) {}
            }
          })

          // Run theme initialization
          window.rakar_content_load_scripts()

          window.__layoutReady = true
          window.dispatchEvent(new Event('layout-ready'))
          return true
        } catch (e) {
          console.warn('Theme init error:', e)
        }
      }
      return false
    }

    // Immediate attempt
    if (tryInit()) return

    // Poll with requestAnimationFrame for efficiency
    function poll() {
      if (!destroyed && !tryInit()) {
        rafId = requestAnimationFrame(poll)
      }
    }
    rafId = requestAnimationFrame(poll)

    // Fallback timeout (8 seconds)
    const fallback = setTimeout(() => {
      if (!destroyed) {
        window.__layoutReady = true
        window.dispatchEvent(new Event('layout-ready'))
        destroyed = true
        if (rafId) cancelAnimationFrame(rafId)
      }
    }, 8000)

    return () => {
      destroyed = true
      if (rafId) cancelAnimationFrame(rafId)
      clearTimeout(fallback)
    }
  }, [pathname])
}
