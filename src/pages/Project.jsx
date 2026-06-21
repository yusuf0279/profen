import { useRef } from 'react'
import contentHtml from '../data/project-content.html?raw'
import { useNavFix } from '../hooks/useNavFix'

export default function Project() {
  const ref = useRef(null)
  useNavFix(ref)
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: contentHtml }} />
}
