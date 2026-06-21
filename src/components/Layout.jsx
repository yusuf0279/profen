import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import useThemeAssets from '../hooks/useThemeAssets'
import useLayoutInit from '../hooks/useLayoutInit'

export default function Layout() {
  const { pathname } = useLocation()

  useThemeAssets()
  useLayoutInit()

  useEffect(() => {
    function tryRemovePreloader() {
      if (window.__removePreloader && window.__cssReady && window.__layoutReady) {
        setTimeout(window.__removePreloader, 800)
        return true
      }
      return false
    }
    if (tryRemovePreloader()) return
    const onReady = () => tryRemovePreloader()
    document.addEventListener('css-ready', onReady)
    window.addEventListener('layout-ready', onReady)
    return () => {
      document.removeEventListener('css-ready', onReady)
      window.removeEventListener('layout-ready', onReady)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)

    const pageIds = {
      '/': 23, '/about': 31, '/service': 32, '/project': 36, '/contact': 48,
    }
    const path = pathname.replace(/\/$/, '') || '/'
    const pageId = pageIds[path] || 23
    const isHome = path === '/'

    if (window.elementorFrontendConfig) {
      window.elementorFrontendConfig.post = { id: pageId, title: 'Profen', excerpt: '', featuredImage: false }
    }

    document.body.className = [
      isHome ? 'home' : '',
      'wp-singular page-template page-template-template-builder page-template-template-builder-php',
      'page page-id-' + pageId,
      'wp-custom-logo wp-embed-responsive wp-theme-rakar theme-rakar',
      'woocommerce-no-js home-electrician',
      'elementor-default elementor-kit-2167 elementor-page elementor-page-' + pageId,
    ].filter(Boolean).join(' ')
  }, [pathname])

  useEffect(() => {
    const style = document.createElement('style')
    style.id = 'rakar_opt-dynamic-css'
    style.textContent = `
      .header-logo .logo img{width:260px;}
      .th-menu-wrapper .mobile-logo img{width:180px;}
      .th-menu-wrapper .mobile-logo{background-color:#0a004c;}
      .breadcumb-wrapper{background-repeat:no-repeat;background-position:center center;background-image:url('/wp-content/uploads/2024/07/breadcumb-bg.jpg');background-size:cover;}
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
