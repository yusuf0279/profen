import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export function useNavFix(ref) {
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handler = (e) => {
      const link = e.target.closest('a[href]')
      if (!link) return

      let href = link.getAttribute('href')
      if (!href) return

      if (href.startsWith('http')) {
        if (!href.includes(window.location.hostname)) {
          e.preventDefault()
          window.open(href, '_blank')
        }
        return
      }

      if (href.startsWith('#')) return

      if (href.endsWith('.html') || href.startsWith('wp-')) {
        e.preventDefault()
        let route = href
          .replace(/\/?index\.html$/, '')
          .replace(/\.html$/, '')
          .replace(/^\//, '')
        navigate('/' + route)
      }
    }

    el.addEventListener('click', handler)
    return () => el.removeEventListener('click', handler)
  }, [ref, navigate])
}
