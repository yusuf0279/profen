import { useRef } from 'react'
import contentHtml from '../data/home-content.html?raw'
import { useNavFix } from '../hooks/useNavFix'

export default function Home() {
  const ref = useRef(null)
  useNavFix(ref)
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: contentHtml }} />
}
