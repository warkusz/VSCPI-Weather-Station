'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedNumberProps {
    value: number
    decimals?: number
}

export function AnimatedNumber({ value, decimals = 0 }: AnimatedNumberProps) {
    const spring = useSpring(value, { stiffness: 80, damping: 20 })
    const display = useTransform(spring, (v) =>
        decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
    )

    useEffect(() => {
        spring.set(value)
    }, [value, spring])

    return <motion.span>{display}</motion.span>
}

interface WeatherWidgetProps {
    icon: React.ReactNode
    label: string
    primary: string | React.ReactNode
    secondary?: string
    accent?: string
}

export default function WeatherWidget({
    icon,
    label,
    primary,
    secondary,
    accent,
}: WeatherWidgetProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '1.1rem', opacity: 0.7 }}>{icon}</span>
                <span className="metric-label">{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span
                    className="metric-value"
                    style={accent ? { backgroundImage: `linear-gradient(135deg, ${accent}, rgba(255,255,255,0.7))` } : undefined}
                >
                    {primary}
                </span>
            </div>
            {secondary && (
                <div className="metric-sub">{secondary}</div>
            )}
        </div>
    )
}
