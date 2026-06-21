import { useRef } from 'react'
import headerHtml from '../data/layout-header.html?raw'
import { useNavFix } from '../hooks/useNavFix'

export default function Header() {
  const ref = useRef(null)
  useNavFix(ref)
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: headerHtml }} />
}
