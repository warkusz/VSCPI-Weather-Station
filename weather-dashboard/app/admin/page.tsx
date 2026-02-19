'use client'

import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LiquidCard from '@/components/LiquidCard'
import Link from 'next/link'

interface CardConfig {
    cardKey: string
    cardLabel: string
    isVisible: boolean
    displayOrder: number
}

export default function AdminPanel() {
    const [config, setConfig] = useState<CardConfig[]>([])
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/admin/config')
            .then(async r => {
                if (r.status === 401) { router.push('/admin/login'); return }
                const data = await r.json()
                if (Array.isArray(data)) setConfig(data)
            })
            .catch(() => router.push('/admin/login'))
    }, [router])

    const toggle = (key: string) => {
        setConfig(prev =>
            prev.map(c => c.cardKey === key ? { ...c, isVisible: !c.isVisible } : c)
        )
    }

    const save = async () => {
        setSaving(true)
        await fetch('/api/admin/config', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(config.map(c => ({ cardKey: c.cardKey, isVisible: c.isVisible }))),
        })
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div style={{ minHeight: '100vh', padding: '40px 32px' }}>
            <div style={{ maxWidth: 600, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <div>
                        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.95)' }}>
                            Admin Panel
                        </h1>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                            VSCPI Weather Station
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <button style={{
                                padding: '8px 16px',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 10,
                                color: 'rgba(255,255,255,0.7)',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontFamily: 'Inter, sans-serif',
                            }}>
                                ← Dashboard
                            </button>
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: '/admin/login' })}
                            style={{
                                padding: '8px 16px',
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.3)',
                                borderRadius: 10,
                                color: '#f87171',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontFamily: 'Inter, sans-serif',
                            }}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Card Visibility */}
                <LiquidCard style={{ padding: '28px 32px', marginBottom: 20 }}>
                    <h2 style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: 24,
                    }}>
                        Dashboard Cards
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {config.map((card, i) => (
                            <div
                                key={card.cardKey}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '14px 0',
                                    borderBottom: i < config.length - 1
                                        ? '1px solid rgba(255,255,255,0.06)'
                                        : 'none',
                                }}
                            >
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
                                        {card.cardLabel}
                                    </div>
                                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                                        {card.cardKey}
                                    </div>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={card.isVisible}
                                        onChange={() => toggle(card.cardKey)}
                                    />
                                    <span className="toggle-slider" />
                                </label>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={save}
                        disabled={saving}
                        style={{
                            marginTop: 28,
                            width: '100%',
                            padding: '13px',
                            background: saved
                                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                : saving
                                    ? 'rgba(59,130,246,0.3)'
                                    : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                            border: 'none',
                            borderRadius: 12,
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: saving ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s',
                            fontFamily: 'Inter, sans-serif',
                        }}
                    >
                        {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </LiquidCard>

                {/* Info card */}
                <LiquidCard style={{ padding: '20px 24px' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                        System Info
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            ['Serial Port', process.env.NEXT_PUBLIC_SERIAL_PORT || '/dev/cu.usbmodem1101'],
                            ['Baud Rate', '9600'],
                            ['Sensor', 'DFRobot SEN0186'],
                            ['MCU', 'ESP32-S3'],
                        ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>{v}</span>
                            </div>
                        ))}
                    </div>
                </LiquidCard>
            </div>
        </div>
    )
}
