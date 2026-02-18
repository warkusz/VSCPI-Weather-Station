'use client'

import { motion } from 'framer-motion'

interface WindCompassProps {
    direction: number
    size?: number
}

const DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']

function directionLabel(deg: number): string {
    const idx = Math.round(deg / 45) % 8
    return DIRECTIONS[idx]
}

export default function WindCompass({ direction, size = 140 }: WindCompassProps) {
    const label = directionLabel(direction)
    const r = size / 2
    const innerR = r - 12
    const tickCount = 36

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="compass-ring"
            >
                {/* Outer ring */}
                <circle
                    cx={r} cy={r} r={r - 2}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1.5"
                />
                {/* Inner ring */}
                <circle
                    cx={r} cy={r} r={innerR - 8}
                    fill="rgba(255,255,255,0.03)"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="1"
                />

                {/* Tick marks */}
                {Array.from({ length: tickCount }).map((_, i) => {
                    const angle = (i * 360) / tickCount
                    const rad = (angle * Math.PI) / 180
                    const isMajor = i % 9 === 0
                    const outerR2 = r - 3
                    const innerR2 = isMajor ? r - 12 : r - 8
                    return (
                        <line
                            key={i}
                            x1={r + Math.sin(rad) * innerR2}
                            y1={r - Math.cos(rad) * innerR2}
                            x2={r + Math.sin(rad) * outerR2}
                            y2={r - Math.cos(rad) * outerR2}
                            stroke={isMajor ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}
                            strokeWidth={isMajor ? 1.5 : 0.8}
                        />
                    )
                })}

                {/* Cardinal labels */}
                {['N', 'E', 'S', 'W'].map((d, i) => {
                    const angle = i * 90
                    const rad = (angle * Math.PI) / 180
                    const labelR = r - 20
                    return (
                        <text
                            key={d}
                            x={r + Math.sin(rad) * labelR}
                            y={r - Math.cos(rad) * labelR + 4}
                            textAnchor="middle"
                            fill={d === 'N' ? '#60a5fa' : 'rgba(255,255,255,0.5)'}
                            fontSize="10"
                            fontWeight="700"
                            fontFamily="Inter, sans-serif"
                        >
                            {d}
                        </text>
                    )
                })}

                {/* Animated needle */}
                <motion.g
                    animate={{ rotate: direction }}
                    initial={{ rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    style={{ originX: `${r}px`, originY: `${r}px` }}
                >
                    {/* North tip (red) */}
                    <polygon
                        points={`${r},${r - innerR + 22} ${r - 5},${r + 8} ${r + 5},${r + 8}`}
                        fill="url(#needleGradRed)"
                        opacity="0.9"
                    />
                    {/* South tip (white) */}
                    <polygon
                        points={`${r},${r + innerR - 22} ${r - 5},${r - 8} ${r + 5},${r - 8}`}
                        fill="rgba(255,255,255,0.3)"
                    />
                    {/* Center dot */}
                    <circle cx={r} cy={r} r="4" fill="white" opacity="0.9" />
                    <circle cx={r} cy={r} r="2" fill="#3b82f6" />
                </motion.g>

                <defs>
                    <linearGradient id="needleGradRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#dc2626" stopOpacity="0.7" />
                    </linearGradient>
                </defs>
            </svg>

            <div style={{ textAlign: 'center' }}>
                <div className="metric-value" style={{ fontSize: '1.8rem' }}>
                    {direction}°
                </div>
                <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#60a5fa',
                    textTransform: 'uppercase',
                    marginTop: 2
                }}>
                    {label}
                </div>
            </div>
        </div>
    )
}
