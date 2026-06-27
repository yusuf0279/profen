import { useParams, Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'
import servicePages from '../data/servicePages'
import { useNavFix } from '../hooks/useNavFix'

const serviceSlugs = Object.keys(servicePages)

export default function ServiceDetail() {
  const { slug } = useParams()
  const ref = useRef(null)
  useNavFix(ref)

  // Debug: log what we're looking up
  console.log('ServiceDetail: slug=%s, available=%d keys, found=%s', slug, serviceSlugs.length, slug ? (slug in servicePages) : false)

  const page = slug ? servicePages[slug] : null

  useEffect(() => {
    window.scrollTo(0, 0)
    if (page) {
      document.title = page.title + ' – Profen Engineering'
    }
  }, [slug, page])

  if (!page) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h1>Service Not Found</h1>
        <p>The service you're looking for doesn't exist.</p>
        <Link to="/service" style={{ color: '#FA2D39' }}>← Back to Services</Link>
      </div>
    )
  }

  return (
    <div ref={ref}>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  )
}

export { serviceSlugs }
