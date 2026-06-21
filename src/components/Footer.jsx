import { useRef } from 'react'
import footerHtml from '../data/layout-footer.html?raw'
import { useNavFix } from '../hooks/useNavFix'

export default function Footer() {
  const ref = useRef(null)
  useNavFix(ref)
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: footerHtml }} />
}
