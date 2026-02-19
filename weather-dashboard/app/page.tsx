'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SunIcon from '@/components/icons/SunIcon'
import DarkCloudIcon from '@/components/icons/DarkCloudIcon'
import { CloudRightSun, CloudLeftCity, CloudBottomLeft, CloudBottomRight } from '@/components/icons/CloudIcons'
import PressureIcon from '@/components/icons/PressureIcon'
import HumidityIcon from '@/components/icons/HumidityIcon'
import TrendIcon from '@/components/icons/TrendIcon'
import HistoryTab from '@/components/HistoryTab'
import MapTab from '@/components/MapTab'
import SettingsTab from '@/components/SettingsTab'
import LiveBadge from '@/components/LiveBadge'
import Link from 'next/link'
import { AnimatedNumber } from '@/components/WeatherWidget'
import { BarChart2, Map, Settings, CloudSun } from 'lucide-react'
import {
  ForecastCloudyIcon,
  ForecastSunnyCloudyIcon,
  ForecastSunnyIcon,
  ForecastRainyIcon,
  ForecastStormIcon,
  ForecastSnowingIcon
} from '@/components/icons/ForecastIcons'

interface WeatherData {
  windDirection: number
  windSpeedMph: number
  windSpeedMs: number
  windGustMph: number
  windGustMs: number
  tempF: number
  tempC: number
  rain1hIn: number
  rain1hMm: number
  rain24hIn: number
  rain24hMm: number
  humidity: number
  pressureMbar: number
  pressureInhg: number
  rawString: string
  checksum: string
  timestamp: string
}

interface CardConfig {
  cardKey: string
  cardLabel: string
  isVisible: boolean
  displayOrder: number
}

const DEFAULT_DATA: WeatherData = {
  windDirection: 0, windSpeedMph: 0, windSpeedMs: 0,
  windGustMph: 0, windGustMs: 0, tempF: 0, tempC: 0,
  rain1hIn: 0, rain1hMm: 0, rain24hIn: 0, rain24hMm: 0,
  humidity: 0, pressureMbar: 0, pressureInhg: 0,
  rawString: '', checksum: '', timestamp: '',
}

type Tab = 'weather' | 'history' | 'map' | 'settings'

const NAV_ITEMS: { id: Tab; icon: React.ReactNode; label: string }[] = [
  { id: 'weather', icon: <CloudSun size={18} />, label: 'Live' },
  { id: 'history', icon: <BarChart2 size={18} />, label: 'History' },
  { id: 'map', icon: <Map size={18} />, label: 'Map' },
  { id: 'settings', icon: <Settings size={18} />, label: 'Info' },
]

// Pressure status label
function pressureStatus(mbar: number): string {
  if (mbar < 980) return 'Low'
  if (mbar > 1020) return 'High'
  return 'Normal'
}

// Simple inline sparkline for the Trend card
function TrendChart({ readings }: { readings: number[] }) {
  if (readings.length < 2) return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
      Accumulating data…
    </div>
  )
  const W = 300, H = 100, PAD = 12
  const min = Math.min(...readings)
  const max = Math.max(...readings)
  const range = max - min || 1
  const pts = readings.map((v, i) => {
    const x = PAD + (i / (readings.length - 1)) * (W - PAD * 2)
    const y = H - PAD - ((v - min) / range) * (H - PAD * 2)
    return [x, y] as [number, number]
  })
  const polyline = pts.map(([x, y]) => `${x},${y}`).join(' ')
  const area = `${PAD},${H - PAD} ${polyline} ${W - PAD},${H - PAD}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FAD262" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FAD262" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Dashed grid line */}
      <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 4" />
      {/* Area */}
      <polyline points={area} fill="url(#trendGrad)" stroke="none" />
      {/* Line */}
      <polyline points={polyline} fill="none" stroke="#FAD262" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#FAD262" stroke="#1a2540" strokeWidth="1.5" />
      ))}
    </svg>
  )
}

// Map WMO weather codes to our icons
function getIconForWmoCode(code: number) {
  // 0: Clear sky
  if (code === 0) return <ForecastSunnyIcon width={32} />
  // 1, 2, 3: Mainly clear, partly cloudy, overcast
  if (code === 1) return <ForecastSunnyIcon width={32} />
  if (code === 2) return <ForecastSunnyCloudyIcon width={32} />
  if (code === 3) return <ForecastCloudyIcon width={32} />
  // 45, 48: Fog
  if (code === 45 || code === 48) return <ForecastCloudyIcon width={32} />
  // 51-55, 56-57: Drizzle
  if (code >= 51 && code <= 57) return <ForecastRainyIcon width={32} />
  // 61-65, 66-67: Rain
  if (code >= 61 && code <= 67) return <ForecastRainyIcon width={32} />
  // 71-77: Snow
  if (code >= 71 && code <= 77) return <ForecastSnowingIcon width={32} />
  // 80-82: Rain showers
  if (code >= 80 && code <= 82) return <ForecastRainyIcon width={32} />
  // 85-86: Snow showers
  if (code === 85 || code === 86) return <ForecastSnowingIcon width={32} />
  // 95, 96, 99: Thunderstorm
  if (code >= 95) return <ForecastStormIcon width={32} />

  return <ForecastSunnyCloudyIcon width={32} />
}

function wmoLabel(code: number) {
  if (code === 0) return 'Sunny'
  if (code === 1) return 'Mainly Sunny'
  if (code === 2) return 'Partly Cloudy'
  if (code === 3) return 'Overcast'
  if (code >= 51 && code <= 67) return 'Rain'
  if (code >= 71 && code <= 77) return 'Snow'
  if (code >= 95) return 'Storm'
  return 'Cloudy'
}

export default function Dashboard() {
  const [data, setData] = useState<WeatherData>(DEFAULT_DATA)
  const [config, setConfig] = useState<CardConfig[]>([])
  const [connected, setConnected] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('weather')
  const [trendHistory, setTrendHistory] = useState<number[]>([])

  // Location & Forecast State
  const [cityName, setCityName] = useState('Burgas') // Default
  const [forecast, setForecast] = useState<any[]>([])
  const [currentWmoCode, setCurrentWmoCode] = useState<number | null>(null)

  const fetchWeather = async (lat: number, lon: number, name?: string) => {
    try {
      // 1. Set City Name (if not provided, try reverse geocode)
      if (name) {
        setCityName(name)
      } else {
        try {
          const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
          const geoData = await geoRes.json()
          if (geoData.city || geoData.locality) {
            setCityName(geoData.city || geoData.locality)
          }
        } catch (e) {
          console.error("Reverse geocode failed", e)
        }
      }

      // 2. Fetch Forecast + current conditions
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code&daily=weather_code,temperature_2m_max&timezone=auto`
      )
      const weatherData = await weatherRes.json()

      // Store current WMO code for the hero icon
      if (weatherData.current?.weather_code !== undefined) {
        setCurrentWmoCode(weatherData.current.weather_code)
      }

      if (weatherData.daily) {
        const days = weatherData.daily.time.map((dateStr: string, i: number) => {
          const date = new Date(dateStr)
          const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })
          const maxTemp = Math.round(weatherData.daily.temperature_2m_max[i])
          const code = weatherData.daily.weather_code[i]

          return {
            day: dayName,
            temp: maxTemp,
            icon: getIconForWmoCode(code),
            label: wmoLabel(code)
          }
        })
        setForecast(days)
      }
    } catch (err) {
      console.error("Failed to fetch weather", err)
    }
  }

  useEffect(() => {
    // Default to Burgas if no location
    const defaultLat = 42.5048
    const defaultLon = 27.4626

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather(pos.coords.latitude, pos.coords.longitude)
        },
        (err) => {
          console.warn("Geolocation denied/failed, using default:", err)
          fetchWeather(defaultLat, defaultLon, 'Burgas')
        },
        { timeout: 5000 }
      )
    } else {
      fetchWeather(defaultLat, defaultLon, 'Burgas')
    }
  }, [])

  useEffect(() => {
    fetch('/api/config')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setConfig(d) })
      .catch(console.error)
  }, [])

  useEffect(() => {
    const es = new EventSource('/api/serial')
    es.addEventListener('status', (e) => {
      try { setConnected(JSON.parse(e.data).portOpen) } catch { }
    })
    es.addEventListener('weather', (e) => {
      try {
        const raw = JSON.parse(e.data)
        const next: WeatherData = {
          windDirection: Number(raw.windDirection) || 0,
          windSpeedMph: Number(raw.windSpeedMph) || 0,
          windSpeedMs: Number(raw.windSpeedMs) || 0,
          windGustMph: Number(raw.windGustMph) || 0,
          windGustMs: Number(raw.windGustMs) || 0,
          tempF: Number(raw.tempF) || 0,
          tempC: Number(raw.tempC) || 0,
          rain1hIn: Number(raw.rain1hIn) || 0,
          rain1hMm: Number(raw.rain1hMm) || 0,
          rain24hIn: Number(raw.rain24hIn) || 0,
          rain24hMm: Number(raw.rain24hMm) || 0,
          humidity: Number(raw.humidity) || 0,
          pressureMbar: Number(raw.pressureMbar) || 0,
          pressureInhg: Number(raw.pressureInhg) || 0,
          rawString: raw.rawString ?? '',
          checksum: raw.checksum ?? '',
          timestamp: raw.timestamp ?? '',
        }
        setData(next)
        setConnected(true)
        setTrendHistory(prev => [...prev.slice(-19), next.tempC])
      } catch { }
    })
    es.onerror = () => setConnected(false)
    return () => es.close()
  }, [])

  const isVisible = useCallback(
    (key: string) => {
      const c = config.find(c => c.cardKey === key)
      return c ? c.isVisible : true
    },
    [config]
  )

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Inter', sans-serif",
      background: '#0b1120',
    }}>
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <div style={{
        width: 68,
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 0',
        gap: 4,
        flexShrink: 0,
        background: 'rgba(255,255,255,0.03)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* School logos badge — VSCPI (BG) + ESJA (PT) Erasmus+ */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          marginBottom: 20,
          padding: '6px 4px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.1)',
          width: 46,
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        }}>
          {/* VSCPI logo */}
          <img
            src="/vscpi.png"
            alt="VSCPI"
            title="ПГКПИ – Бургас"
            style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: 4 }}
          />
          {/* Divider */}
          <div style={{ width: 28, height: 1, background: 'rgba(255,255,255,0.12)' }} />
          {/* ESJA logo */}
          <img
            src="/esja-logo.png"
            alt="ESJA"
            title="ESJA – Seixal, Portugal"
            style={{ width: 32, height: 20, objectFit: 'contain', filter: 'brightness(1.1)' }}
          />
        </div>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            style={{
              width: 48, height: 48, borderRadius: 12,
              border: activeTab === item.id
                ? '1px solid rgba(250,210,98,0.35)'
                : '1px solid transparent',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 2,
              background: activeTab === item.id
                ? 'rgba(250,210,98,0.12)'
                : 'transparent',
              color: activeTab === item.id
                ? '#FAD262'
                : 'rgba(255,255,255,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {item.icon}
            <span style={{ fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.05em', color: 'inherit' }}>
              {item.label}
            </span>
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <button title="Admin" style={{
            width: 48, height: 48, borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 2,
            background: 'transparent',
            color: 'rgba(255,255,255,0.25)',
          }}>
            <Settings size={15} />
            <span style={{ fontSize: '0.48rem', fontWeight: 600, letterSpacing: '0.05em' }}>Admin</span>
          </button>
        </Link>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            style={{ flex: 1, overflow: 'auto' }}
          >
            {activeTab === 'weather' && (
              <WeatherView
                data={data}
                connected={connected}
                trendHistory={trendHistory}
                isVisible={isVisible}
                cityName={cityName}
                forecast={forecast}
                currentWmoCode={currentWmoCode}
              />
            )}
            {activeTab === 'history' && (
              <div style={{ padding: '28px 28px 28px 24px' }}>
                <HistoryTab />
              </div>
            )}
            {activeTab === 'map' && (
              <div style={{ padding: '28px 28px 28px 24px' }}>
                <MapTab windDirection={data.windDirection} windSpeedMph={data.windSpeedMph} tempC={data.tempC} />
              </div>
            )}
            {activeTab === 'settings' && (
              <div style={{ padding: '28px 28px 28px 24px' }}>
                <SettingsTab />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Weather Tab — Figma pixel-perfect ────────────────────────────────────────
interface WeatherViewProps {
  data: WeatherData
  connected: boolean
  trendHistory: number[]
  isVisible: (key: string) => boolean
  cityName: string
  forecast: any[]
  currentWmoCode: number | null
}

function WeatherView({
  data,
  connected,
  trendHistory,
  isVisible,
  cityName,
  forecast,
  currentWmoCode,
}: WeatherViewProps) {
  // Hero icon — reflects the actual current weather (not just today's daily avg)
  const todayLabel: string = currentWmoCode !== null ? wmoLabel(currentWmoCode) : (forecast[0]?.label ?? 'Sunny')
  const heroIcon = (() => {
    const s = 280
    if (todayLabel === 'Sunny' || todayLabel === 'Mainly Sunny')
      return <ForecastSunnyIcon size={s} />
    if (todayLabel === 'Partly Cloudy')
      return <ForecastSunnyCloudyIcon size={s} />
    if (todayLabel === 'Rain')
      return <ForecastRainyIcon size={s} />
    if (todayLabel === 'Snow')
      return <ForecastSnowingIcon size={s} />
    if (todayLabel === 'Storm')
      return <ForecastStormIcon size={s} />
    // Overcast / Cloudy / fallback
    return <ForecastCloudyIcon size={s} />
  })()

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      padding: '24px',
      gap: '24px',
      background: '#0B131E', // Updated background color
      fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
      overflow: 'hidden',
    }}>
      {/* ── Left: Main Panel ─────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 30,
        overflow: 'visible',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexShrink: 0, position: 'relative', zIndex: 50 }}>
          {/* Header content unchanged */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <LiveBadge lastUpdate={data.timestamp} />
          </div>
          <div style={{ fontSize: '16px', color: '#7A818C' }}>
            <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Weather Station</span> <span style={{ opacity: 0.5 }}>|</span> Atmospheric Conditions
          </div>
        </div>

        {/* Hero: City + Sun + Clouds */}
        <div style={{ position: 'relative', flexShrink: 0, marginBottom: 20, minHeight: 280 }}>
          {/* Cloud Left Behind City */}
          <div style={{
            position: 'absolute',
            left: -180,
            top: -100,
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            <CloudLeftCity width={520} />
          </div>

          {/* Cloud Right Behind Sun */}
          <div style={{
            position: 'absolute',
            right: -100,
            top: -100,
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            <CloudRightSun width={800} />
          </div>

          {/* Hero weather icon - dynamic based on today's forecast */}
          <div style={{ position: 'absolute', width: 700, height: 600, right: -60, top: -60, pointerEvents: 'none', zIndex: 1 }}>
            <div style={{
              position: 'absolute',
              left: 90,
              top: 20,
              width: 520,
              height: 520,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {heroIcon}
            </div>
          </div>

          {/* City name */}
          <div style={{ position: 'relative', zIndex: 2, paddingTop: 40 }}>
            <h2 style={{
              fontSize: '48px',
              // fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: '57px',
              marginBottom: 8,
              textShadow: '0 4px 24px rgba(0,0,0,0.3)',
            }}>
              {cityName}
            </h2>
            <p style={{
              fontSize: '20px',
              // fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 500,
              color: '#7A818C',
              lineHeight: '24px',
            }}>
              Chance of rain: {data.rain1hMm > 0 ? Math.min(99, Math.round(data.rain1hMm * 20)) : 2}%
            </p>
          </div>

          {/* Temperature */}
          {isVisible('temperature') && (
            <div style={{ position: 'relative', zIndex: 2, marginTop: 40 }}>
              <div style={{
                fontSize: '20px',
                color: '#7A818C',
                fontWeight: 500,
                marginBottom: 4,
              }}>
                Temperature:
              </div>
              <div style={{
                fontSize: '96px',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: '1',
                display: 'flex',
                alignItems: 'flex-start',
              }}>
                <AnimatedNumber value={data.tempC} decimals={0} />
                <span style={{ fontSize: '96px', marginLeft: 4 }}>°</span>
              </div>
            </div>
          )}
        </div>


        {/* Cards row with Bottom Clouds */}
        <div style={{ display: 'flex', gap: 24, position: 'relative', marginTop: 10, flex: 1, alignItems: 'flex-end' }}>
          {/* Removed flex: 1, added marginTop */}

          {/* Cloud Bottom Left - Behind Pressure/Humidity */}
          <div style={{
            position: 'absolute',
            left: -50,
            bottom: -80,
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            <CloudBottomLeft width={600} />
          </div>

          {/* Cloud Bottom Right - Behind Trend */}
          <div style={{
            position: 'absolute',
            right: -50,
            bottom: -50,
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            <CloudBottomRight width={500} />
          </div>

          {/* Left column: Air Conditions label + Pressure + Humidity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 360, flexShrink: 0, zIndex: 1 }}>
            {/* Air Conditions label */}
            <div style={{
              fontSize: '20px',
              fontWeight: 600,
              color: '#7A818C',
              flexShrink: 0,
              paddingLeft: 8,
            }}>
              Air Conditions
            </div>
            {/* Pressure card */}
            {isVisible('pressure') && (
              <div style={{
                height: 140,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: '12px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{ flexShrink: 0 }}>
                  <PressureIcon size={32} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', lineHeight: '1.2' }}>
                    Pressure
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: '24px', fontFamily: "'Exo 2', sans-serif", fontWeight: 500, color: '#FFFFFF' }}>
                      <AnimatedNumber value={data.pressureMbar} decimals={1} />
                    </span>
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>mbar</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 500, marginTop: 2 }}>
                    {pressureStatus(data.pressureMbar)}
                  </div>
                </div>
              </div>
            )}

            {/* Humidity card */}
            {isVisible('humidity') && (
              <div style={{
                height: 140,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 24,
                padding: '12px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{ flexShrink: 0 }}>
                  <HumidityIcon size={32} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF', lineHeight: '1.2' }}>
                    Humidity
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: '24px', fontFamily: "'Exo 2', sans-serif", fontWeight: 500, color: '#FFFFFF' }}>
                      <AnimatedNumber value={data.humidity} />
                    </span>
                    <span style={{ fontSize: '20px', fontFamily: "'Exo 2', sans-serif", fontWeight: 500, color: '#FFFFFF' }}>%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trend Card */}
          {isVisible('trend') && (
            <div style={{
              flex: 1,
              height: 296,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
              zIndex: 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexShrink: 0 }}>
                <TrendIcon size={24} />
                <span style={{ fontSize: '20px', fontWeight: 600, color: '#FFFFFF' }}>Trend</span>
              </div>
              <div style={{ flex: 1, minHeight: 0 }}>
                <TrendChart readings={trendHistory} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: 7-Day Forecast Floating Card ──────────────────────────── */}
      <div style={{
        width: 320,
        flexShrink: 0,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 30,
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(12px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',       /* Firefox */
      } as React.CSSProperties}
        className="hide-scrollbar"
      >
        <div style={{
          fontSize: '16px',
          fontWeight: 600,
          color: '#7A818C',
          marginBottom: 24,
          // fontFamily: "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          7-Day Forecast
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {forecast.map((day: any, i: number) => (
            <div
              key={day.day}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 0',
                borderBottom: i < forecast.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              {/* Day */}
              <div style={{ width: 44, fontSize: '16px', color: '#7A818C', fontWeight: 500 }}>
                {day.day}
              </div>
              {/* Icon */}
              <div style={{ width: 32, display: 'flex', justifyContent: 'center' }}>
                {day.icon}
              </div>
              {/* Condition */}
              <div style={{ flex: 1, fontSize: '16px', color: '#D9D9D9', fontWeight: 500 }}>
                {day.label}
              </div>
              {/* Temp */}
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>
                {day.temp}°
              </div>
            </div>
          ))}
        </div>

        {/* Wind info at bottom */}
        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          {/* Wind card */}
          {isVisible('wind') && (
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 18,
              padding: '16px 20px',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>
                Wind
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Speed</span>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{(data.windSpeedMph * 1.60934).toFixed(1)} km/h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Gust</span>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{(data.windGustMph * 1.60934).toFixed(1)} km/h</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Direction</span>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{data.windDirection}° {dirLabel(data.windDirection)}</span>
              </div>
            </div>
          )}

          {/* Rain card */}
          {isVisible('rain') && (
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 18,
              padding: '16px 20px',
              marginTop: 12
            }}>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 10 }}>
                Rain
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Last hour</span>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{data.rain1hMm.toFixed(1)} mm</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Last 24h</span>
                <span style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{data.rain24hMm.toFixed(1)} mm</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function dirLabel(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  return dirs[Math.round(deg / 22.5) % 16]
}
