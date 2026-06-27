import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import useThemeAssets from '../hooks/useThemeAssets'
import useLayoutInit from '../hooks/useLayoutInit'

export default function Layout() {
  const { pathname } = useLocation()

  useThemeAssets()
  useLayoutInit()

  useEffect(() => {
    let removed = false
    const removePreloader = () => {
      if (removed) return
      removed = true
      if (window.__removePreloader) {
        setTimeout(window.__removePreloader, 800)
      }
    }
    const tryRemove = () => {
      if (window.__removePreloader && window.__cssReady && window.__layoutReady && document.readyState === 'complete') {
        removePreloader()
        return true
      }
      return false
    }
    if (tryRemove()) return
    const onReady = () => tryRemove()
    document.addEventListener('css-ready', onReady)
    window.addEventListener('layout-ready', onReady)
    window.addEventListener('load', onReady)
    const fallback = setTimeout(removePreloader, 15000)
    return () => {
      document.removeEventListener('css-ready', onReady)
      window.removeEventListener('layout-ready', onReady)
      window.removeEventListener('load', onReady)
      clearTimeout(fallback)
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
      :root{--icon-font:"Font Awesome 6 Free";--fa-style-family:"Font Awesome 6 Free";}
      .header-logo .logo img{width:260px;}
      .th-menu-wrapper .mobile-logo img{width:180px;}
      .th-menu-wrapper .mobile-logo{background-color:#0a004c;}
      .breadcumb-wrapper{background-repeat:no-repeat;background-position:center center;background-image:url('/wp-content/uploads/2024/07/breadcumb-bg.jpg');background-size:cover;}
      .hero-inner{position:relative;}
      .hero-inner::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%);z-index:1;pointer-events:none;}
      .hero-inner .container{position:relative;z-index:2;}
      .hero-style5 .sub-title2.sub{color:#fff !important;}
      .hero-style5 .hero-title,.hero-style5 .hero-text{color:#fff !important;}
      .slider-area .slider-arrow{display:inline-flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;background:rgba(255,255,255,0.2);color:#fff;border:none;cursor:pointer;transition:0.3s;font-size:18px;}
      .slider-area .slider-arrow:hover{background:#FA2D39;}
      .slider-area .slider-controller{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:40px;}
      .slider-area .slider-pagination{display:flex;align-items:center;gap:6px;}
      .slider-area .slider-pagination button{width:12px;height:12px;border-radius:50%;border:none;background:#999;opacity:0.4;cursor:pointer;padding:0;transition:0.3s;}
      .slider-area .slider-pagination button.active{opacity:1;background:#FA2D39;}
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </>
  )
}
