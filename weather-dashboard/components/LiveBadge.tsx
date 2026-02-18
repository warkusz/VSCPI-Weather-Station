'use client'

interface LiveBadgeProps {
    lastUpdate?: string
}

export default function LiveBadge({ lastUpdate }: LiveBadgeProps) {
    const timeStr = lastUpdate
        ? new Date(lastUpdate).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        : '--:--:--'

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="live-badge">
                <div className="live-dot" />
                LIVE
            </div>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                {timeStr}
            </span>
        </div>
    )
}
