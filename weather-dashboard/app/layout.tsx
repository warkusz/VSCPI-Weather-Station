import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VSCPI Weather Station',
  description: 'Live weather data from the VSCPI school campus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Aurora animated background */}
        <div className="aurora-bg">
          <div className="aurora-orb" />
        </div>
        {/* SVG liquid glass filter */}
        <svg className="liquid-glass-filter" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="liquid-glass" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015 0.015"
                numOctaves="3"
                seed="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="6"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feComposite in="displaced" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>
        <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
