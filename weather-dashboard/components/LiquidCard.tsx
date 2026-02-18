'use client'

import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface LiquidCardProps {
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
    delay?: number
}

export default function LiquidCard({ children, className = '', style, delay = 0 }: LiquidCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--mouse-x', `${x}%`)
        card.style.setProperty('--mouse-y', `${y}%`)
    }, [])

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current
        if (!card) return
        card.style.setProperty('--mouse-x', '50%')
        card.style.setProperty('--mouse-y', '0%')
    }, [])

    return (
        <motion.div
            ref={cardRef}
            className={`glass-card ${className}`}
            style={style}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
        >
            {children}
        </motion.div>
    )
}
