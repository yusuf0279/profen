import { useRef } from 'react'
import contentHtml from '../data/about-content.html?raw'
import { useNavFix } from '../hooks/useNavFix'

export default function About() {
  const ref = useRef(null)
  useNavFix(ref)
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: contentHtml }} />
}
