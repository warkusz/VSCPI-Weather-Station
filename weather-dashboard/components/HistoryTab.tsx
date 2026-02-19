'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LiquidCard from '@/components/LiquidCard'
import {
    Thermometer, Droplets, Wind, Gauge, CloudRain,
    TrendingUp, TrendingDown, Minus
} from 'lucide-react'

interface Reading {
    id: number
    recordedAt: string
    tempC: number
    tempF: number
    humidity: number
    windSpeedMph: number
    windGustMph: number
    windDirection: number
    pressureMbar: number
    rain1hMm: number
    rain24hMm: number
}

function directionLabel(deg: number): string {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    return dirs[Math.round(deg / 22.5) % 16]
}

function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
}

const METRICS = [
    { key: 'tempC', label: 'Temp', unit: '°C', icon: <Thermometer size={13} />, color: '#f97316' },
    { key: 'humidity', label: 'Humidity', unit: '%', icon: <Droplets size={13} />, color: '#06b6d4' },
    { key: 'windSpeedMph', label: 'Wind', unit: 'km/h', icon: <Wind size={13} />, color: '#60a5fa' },
    { key: 'pressureMbar', label: 'Pressure', unit: 'mb', icon: <Gauge size={13} />, color: '#34d399' },
    { key: 'rain1hMm', label: 'Rain 1h', unit: 'mm', icon: <CloudRain size={13} />, color: '#818cf8' },
]

export default function HistoryTab() {
    const [readings, setReadings] = useState<Reading[]>([])
    const [loading, setLoading] = useState(true)
    const [activeMetric, setActiveMetric] = useState('tempC')

    useEffect(() => {
        fetch('/api/readings')
            .then(r => r.json())
            .then(data => {
                if (!Array.isArray(data)) return
                // Coerce Decimal/string fields to plain JS numbers
                const normalized: Reading[] = data.map((r: Record<string, unknown>) => ({
                    id: Number(r.id),
                    recordedAt: String(r.recordedAt),
                    tempC: Number(r.tempC),
                    tempF: Number(r.tempF),
                    humidity: Number(r.humidity),
                    windSpeedMph: Number(r.windSpeedMph),
                    windGustMph: Number(r.windGustMph),
                    windDirection: Number(r.windDirection),
                    pressureMbar: Number(r.pressureMbar),
                    rain1hMm: Number(r.rain1hMm),
                    rain24hMm: Number(r.rain24hMm),
                }))
                setReadings(normalized)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const metric = METRICS.find(m => m.key === activeMetric)!

    // Simple sparkline using SVG
    const values = readings.map(r => Number(r[activeMetric as keyof Reading])).filter(v => isFinite(v))
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1
    const W = 600, H = 80, PAD = 8

    const points = values.map((v, i) => {
        const x = PAD + (i / Math.max(values.length - 1, 1)) * (W - PAD * 2)
        const y = H - PAD - ((v - min) / range) * (H - PAD * 2)
        return `${x},${y}`
    }).join(' ')

    const trend = values.length >= 2
        ? values[values.length - 1] - values[0]
        : 0

    return (
        <div style={{ padding: '0 4px' }}>
            {/* Metric selector */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {METRICS.map(m => (
                    <button
                        key={m.key}
                        onClick={() => setActiveMetric(m.key)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '7px 14px',
                            borderRadius: 10,
                            border: activeMetric === m.key
                                ? `1px solid ${m.color}66`
                                : '1px solid rgba(255,255,255,0.1)',
                            background: activeMetric === m.key
                                ? `${m.color}22`
                                : 'rgba(255,255,255,0.04)',
                            color: activeMetric === m.key ? m.color : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            fontFamily: 'Inter, sans-serif',
                            transition: 'all 0.2s',
                        }}
                    >
                        {m.icon} {m.label}
                    </button>
                ))}
            </div>

            {/* Chart card */}
            <LiquidCard style={{ padding: '20px 24px', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                        <div className="metric-label">{metric.label} — Last {readings.length} readings</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: metric.color }}>
                                {values.length ? values[values.length - 1].toFixed(1) : '--'}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)' }}>{metric.unit}</span>
                            {trend !== 0 && (
                                <span style={{ color: trend > 0 ? '#4ade80' : '#f87171', display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.8rem' }}>
                                    {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                    {Math.abs(trend).toFixed(1)}{metric.unit}
                                </span>
                            )}
                            {trend === 0 && values.length >= 2 && (
                                <span style={{ color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.8rem' }}>
                                    <Minus size={14} /> Stable
                                </span>
                            )}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>
                        <div>Min: {min.toFixed(1)}{metric.unit}</div>
                        <div>Max: {max.toFixed(1)}{metric.unit}</div>
                    </div>
                </div>

                {loading ? (
                    <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                        Loading...
                    </div>
                ) : values.length < 2 ? (
                    <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
                        Not enough data yet — readings accumulate over time
                    </div>
                ) : (
                    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 80, overflow: 'visible' }}>
                        <defs>
                            <linearGradient id={`grad-${activeMetric}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={metric.color} stopOpacity="0.3" />
                                <stop offset="100%" stopColor={metric.color} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Area fill */}
                        <polyline
                            points={`${PAD},${H - PAD} ${points} ${W - PAD},${H - PAD}`}
                            fill={`url(#grad-${activeMetric})`}
                            stroke="none"
                        />
                        {/* Line */}
                        <polyline
                            points={points}
                            fill="none"
                            stroke={metric.color}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </LiquidCard>

            {/* Table */}
            <LiquidCard style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="metric-label">Reading Log</div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                {['Time', 'Temp', 'Humidity', 'Wind', 'Gust', 'Dir', 'Pressure', 'Rain 1h'].map(h => (
                                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={8} style={{ padding: 24, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading...</td></tr>
                            ) : readings.length === 0 ? (
                                <tr><td colSpan={8} style={{ padding: 24, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>No readings yet</td></tr>
                            ) : (
                                [...readings].reverse().map((r, i) => (
                                    <tr key={r.id} style={{
                                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                                    }}>
                                        <td style={{ padding: '9px 16px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{formatDate(r.recordedAt)}</td>
                                        <td style={{ padding: '9px 16px', color: '#f97316', fontWeight: 600 }}>{r.tempC.toFixed(1)}°C</td>
                                        <td style={{ padding: '9px 16px', color: '#06b6d4' }}>{r.humidity}%</td>
                                        <td style={{ padding: '9px 16px', color: '#60a5fa' }}>{(r.windSpeedMph * 1.60934).toFixed(1)} km/h</td>
                                        <td style={{ padding: '9px 16px', color: '#a78bfa' }}>{(r.windGustMph * 1.60934).toFixed(1)} km/h</td>
                                        <td style={{ padding: '9px 16px', color: 'rgba(255,255,255,0.6)' }}>{directionLabel(r.windDirection)}</td>
                                        <td style={{ padding: '9px 16px', color: '#34d399' }}>{r.pressureMbar.toFixed(1)} mb</td>
                                        <td style={{ padding: '9px 16px', color: '#818cf8' }}>{r.rain1hMm.toFixed(1)} mm</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </LiquidCard>
        </div>
    )
}
