import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const postIdToSlug = {
  35: 'electro-mechanical-works',
  3159: 'landscaping-fencing-works',
  3160: 'metal-construction-fabrications',
  3172: 'building-contracting-works',
  3179: 'interior-fit-out-works',
  3186: 'chiller-hot-cool-solutions',
  3192: 'misting-solutions',
  3199: 'adiabatic-pre-cooling-system',
  3206: 'building-management-system',
}

// Known SPA routes
const spaRoutes = ['/', '/about', '/service', '/project', '/contact']

export function useNavFix(ref) {
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = (e) => {
      const link = e.target.closest('a[href]')
      if (!link) return

      let href = link.getAttribute('href')
      if (!href || href === '#' || href.startsWith('#')) return

      // External links (http/https) — open in new tab if different host
      if (href.startsWith('http')) {
        try {
          const url = new URL(href)
          if (url.hostname !== window.location.hostname) {
            e.preventDefault()
            window.open(href, '_blank', 'noopener,noreferrer')
          }
        } catch (_) {}
        return
      }

      // Prevent default for ALL same-site links to use SPA routing
      e.preventDefault()

      // Normalize: remove leading /, handle relative paths
      let route = href.replace(/^\//, '')

      // Handle ?p= service links → SPA route
      const serviceMatch = route.match(/service\?p=(\d+)/)
      if (serviceMatch) {
        const slug = postIdToSlug[serviceMatch[1]]
        if (slug) {
          navigate('/service/' + slug)
        } else {
          navigate('/service')
        }
        return
      }

      // Handle ../ x/index.html relative paths like ../contact/index.html
      route = route.replace(/\.\.\//g, '')

      // Strip .html and index.html
      route = route.replace(/\/?index\.html$/, '').replace(/\.html$/, '')

      // Strip wp- prefix (for wp-content links that aren't really pages)
      if (route.startsWith('wp-')) return

      // If route matches known SPA routes or starts with /service/, navigate
      const normalizedRoute = '/' + route
      if (spaRoutes.includes(normalizedRoute) || normalizedRoute.startsWith('/service/')) {
        navigate(normalizedRoute)
        return
      }

      // Fallback: just navigate to the cleaned route
      navigate(normalizedRoute || '/')
    }

    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [ref, navigate])
}
