'use client'

import { useEffect, useState } from 'react'
import LiquidCard from '@/components/LiquidCard'
import Link from 'next/link'
import {
    Settings, Wifi, Database, Thermometer, Wind,
    RefreshCw, Info, ExternalLink
} from 'lucide-react'

interface SystemInfo {
    portOpen: boolean
    lastReading?: string
    totalReadings?: number
    detectedPort?: string
    baudRate?: number
}

export default function SettingsTab() {
    const [info, setInfo] = useState<SystemInfo>({ portOpen: false })
    const [dbCount, setDbCount] = useState<number | null>(null)

    useEffect(() => {
        // Check serial status
        const es = new EventSource('/api/serial')
        es.addEventListener('status', (e) => {
            try {
                const d = JSON.parse(e.data)
                setInfo(prev => ({
                    ...prev,
                    portOpen: d.portOpen,
                    detectedPort: d.detectedPort ?? prev.detectedPort,
                    baudRate: d.baudRate ?? prev.baudRate,
                }))
            } catch { }
        })
        es.addEventListener('weather', (e) => {
            try {
                const d = JSON.parse(e.data)
                setInfo(prev => ({ ...prev, lastReading: d.timestamp, portOpen: true }))
            } catch { }
        })
        // Get reading count
        fetch('/api/readings')
            .then(r => r.json())
            .then(data => setDbCount(Array.isArray(data) ? data.length : null))
            .catch(() => { })

        return () => es.close()
    }, [])

    const statusDot = (ok: boolean) => (
        <span style={{
            display: 'inline-block',
            width: 8, height: 8,
            borderRadius: 4,
            background: ok ? '#4ade80' : '#f87171',
            marginRight: 8,
            boxShadow: ok ? '0 0 6px #4ade8088' : 'none',
        }} />
    )

    const Row = ({ label, value, mono = false }: { label: string; value: React.ReactNode; mono?: boolean }) => (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
            <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>{label}</span>
            <span style={{
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.8)',
                fontFamily: mono ? 'monospace' : 'inherit',
            }}>{value}</span>
        </div>
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Status */}
            <LiquidCard style={{ padding: '20px 24px' }}>
                <div className="metric-label" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Wifi size={12} /> System Status
                </div>
                <Row
                    label="Serial Port"
                    value={<>{statusDot(info.portOpen)}{info.portOpen ? 'Connected' : 'Disconnected'}</>}
                />
                <Row
                    label="Port Path"
                    value={info.detectedPort ?? 'detecting…'}
                    mono
                />
                <Row label="Baud Rate" value={info.baudRate ? `${info.baudRate}` : '115200'} mono />
                <Row label="Sensor" value="DFRobot SEN0186" />
                <Row label="MCU" value="ESP32-S3" />
                <Row
                    label="Last Reading"
                    value={info.lastReading
                        ? new Date(info.lastReading).toLocaleTimeString()
                        : '—'}
                    mono
                />
                <Row
                    label="Readings in DB"
                    value={dbCount !== null ? `${dbCount} (showing last 50)` : '—'}
                />
            </LiquidCard>

            {/* Sensor info */}
            <LiquidCard style={{ padding: '20px 24px' }}>
                <div className="metric-label" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Info size={12} /> Sensor Specifications
                </div>
                <Row label="Wind Speed Range" value="0 – 180 km/h" />
                <Row label="Wind Direction" value="0 – 360° (8 points)" />
                <Row label="Temperature Range" value="-40 – +65°C" />
                <Row label="Humidity Range" value="1 – 99% RH" />
                <Row label="Pressure Range" value="10 – 1100 mbar" />
                <Row label="Rain Gauge" value="0.2794 mm/tip" />
                <Row label="Update Interval" value="~5 seconds" />
                <Row label="Protocol" value="APRS-style string" mono />
            </LiquidCard>

            {/* Data format */}
            <LiquidCard style={{ padding: '20px 24px' }}>
                <div className="metric-label" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Database size={12} /> APRS Data Format
                </div>
                <div style={{
                    fontFamily: 'monospace',
                    fontSize: '0.78rem',
                    color: '#60a5fa',
                    background: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    borderRadius: 10,
                    padding: '12px 16px',
                    marginBottom: 12,
                    letterSpacing: '0.05em',
                }}>
                    c090s000g003t076r000p010h42b09971*31
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {[
                        ['c###', 'Wind direction (°)'],
                        ['s###', 'Wind speed (km/h)'],
                        ['g###', 'Wind gust (km/h)'],
                        ['t###', 'Temperature (°F)'],
                        ['r###', 'Rain 1h (0.01")'],
                        ['p###', 'Rain 24h (0.01")'],
                        ['h##', 'Humidity (%)'],
                        ['b#####', 'Pressure (0.1 mbar)'],
                    ].map(([code, desc]) => (
                        <div key={code} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                            <code style={{ fontSize: '0.72rem', color: '#a78bfa', fontFamily: 'monospace', minWidth: 52 }}>{code}</code>
                            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{desc}</span>
                        </div>
                    ))}
                </div>
            </LiquidCard>

            {/* Admin link */}
            <LiquidCard style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Admin Panel</div>
                        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                            Configure card visibility and manage settings
                        </div>
                    </div>
                    <Link href="/admin" style={{ textDecoration: 'none' }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                            border: 'none',
                            borderRadius: 10,
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                        }}>
                            <Settings size={14} /> Open Admin <ExternalLink size={12} />
                        </button>
                    </Link>
                </div>
            </LiquidCard>
        </div>
    )
}
