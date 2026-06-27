import { useEffect, useState } from 'react'

const PHONE = '971564148980'
const WHATSAPP_URL = `https://wa.me/${PHONE}`

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="white">
          <path d="M16 0C7.2 0 0 7.2 0 16c0 3.1 0.9 6 2.5 8.5L1.6 30.4l6.2-1.6C10.2 29.9 13 31 16 31c8.8 0 16-7.2 16-16S24.8 0 16 0zm8.1 22.7c-0.4 1.1-1.6 2-2.7 2.3-0.7 0.2-1.6 0.3-5.1-1.1-4.3-1.7-7.1-5.9-7.3-6.2-0.2-0.3-1.7-2.3-1.7-4.4s1.1-3.1 1.5-3.6c0.4-0.4 0.9-0.6 1.2-0.6 0.3 0 0.6 0 0.9 0 0.3 0 0.7-0.1 1.1 0.8 0.4 0.9 1.3 3.1 1.4 3.3 0.1 0.2 0.2 0.5 0 0.8s-0.3 0.5-0.5 0.7c-0.2 0.2-0.4 0.5-0.6 0.7-0.2 0.2-0.4 0.5-0.2 0.9 0.2 0.4 0.9 1.5 2 2.4 1.4 1.1 2.5 1.5 2.9 1.6 0.4 0.2 0.7 0.1 1-0.1 0.3-0.2 1.2-1.4 1.5-1.9 0.3-0.5 0.7-0.4 1.1-0.2 0.4 0.2 2.5 1.2 2.9 1.4 0.4 0.2 0.7 0.3 0.8 0.5 0.1 0.2 0.1 1.1-0.3 2.2z"/>
        </svg>
      </a>
      <style>{`
        .whatsapp-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .whatsapp-float:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 16px rgba(0,0,0,0.35);
        }
      `}</style>
    </>
  )
}
