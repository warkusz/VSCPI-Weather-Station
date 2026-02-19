'use client'

import LiquidCard from '@/components/LiquidCard'
import { MapPin, Wind, Thermometer, Navigation } from 'lucide-react'

interface MapTabProps {
    windDirection: number
    windSpeedMph: number
    tempC: number
}

// Station coordinates — VSCPI Burgas
const STATION_LAT = 42.456417
const STATION_LNG = 27.401583
const STATION_NAME = 'ПГКПИ – Бургас'

export default function MapTab({ windDirection, windSpeedMph, tempC }: MapTabProps) {
    const mapsUrl = `https://www.google.com/maps?q=${STATION_LAT},${STATION_LNG}&z=16`
    const windRad = (windDirection * Math.PI) / 180

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 'calc(100vh - 60px)' }}>
            {/* Station info card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <LiquidCard style={{ padding: '16px 20px' }}>
                    <div className="metric-label" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={12} /> Location
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
                        {STATION_LAT.toFixed(4)}°N
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
                        {STATION_LNG.toFixed(4)}°E
                    </div>
                </LiquidCard>

                <LiquidCard style={{ padding: '16px 20px' }}>
                    <div className="metric-label" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Navigation size={12} /> Wind
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#60a5fa' }}>
                        {windDirection}° ({dirLabel(windDirection)})
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                        {(windSpeedMph * 1.60934).toFixed(1)} km/h
                    </div>
                </LiquidCard>

                <LiquidCard style={{ padding: '16px 20px' }}>
                    <div className="metric-label" style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Thermometer size={12} /> Temperature
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f97316' }}>
                        {tempC.toFixed(1)}°C
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                        {((tempC * 9 / 5) + 32).toFixed(1)}°F
                    </div>
                </LiquidCard>
            </div>

            {/* Map embed */}
            <LiquidCard style={{ padding: 0, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <iframe
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${STATION_LNG - 0.01},${STATION_LAT - 0.008},${STATION_LNG + 0.01},${STATION_LAT + 0.008}&layer=mapnik&marker=${STATION_LAT},${STATION_LNG}`}
                        style={{ width: '100%', height: '100%', minHeight: 380, border: 'none', display: 'block', filter: 'invert(90%) hue-rotate(180deg) brightness(0.85) saturate(0.8)', position: 'absolute', top: 0, left: 0 }}
                        title="Station Location"
                    />
                    {/* Wind arrow overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        width: 80,
                        height: 80,
                        background: 'rgba(7,13,26,0.85)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 40,
                        border: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <svg width="50" height="50" viewBox="0 0 50 50">
                            {/* Compass ring */}
                            <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            {/* Cardinal labels */}
                            {[['N', 25, 6], ['S', 25, 46], ['E', 46, 27], ['W', 4, 27]].map(([l, x, y]) => (
                                <text key={l as string} x={x as number} y={y as number} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)" fontFamily="Inter">{l}</text>
                            ))}
                            {/* Wind arrow */}
                            <g transform={`rotate(${windDirection}, 25, 25)`}>
                                <polygon points="25,6 22,22 25,19 28,22" fill="#60a5fa" />
                                <polygon points="25,44 22,28 25,31 28,28" fill="rgba(96,165,250,0.3)" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div style={{
                    padding: '12px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                        📍 {STATION_NAME}
                    </div>
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: '0.75rem',
                            color: '#60a5fa',
                            textDecoration: 'none',
                            padding: '5px 12px',
                            border: '1px solid rgba(96,165,250,0.3)',
                            borderRadius: 8,
                        }}
                    >
                        Open in Maps ↗
                    </a>
                </div>
            </LiquidCard>
        </div>
    )
}

function dirLabel(deg: number): string {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    return dirs[Math.round(deg / 22.5) % 16]
}
