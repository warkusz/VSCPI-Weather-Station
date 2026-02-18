import React from 'react'

interface IconProps {
    size?: number
    width?: number
    height?: number
    className?: string
    style?: React.CSSProperties
}

export function ForecastCloudyIcon({ size, width = 48, height = 35, style, className }: IconProps) {
    return (
        <svg width={size ?? width} height={size ? size * (160 / 223) : height} viewBox="0 0 223 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <ellipse cx="44.8241" cy="44.8635" rx="44.8241" ry="44.8635" transform="matrix(0.728977 0.684538 -0.675921 0.736974 60.6484 22.0003)" fill="white" />
            <path d="M103.932 103.437C101.965 108.164 99.1617 112.631 95.5132 116.609C78.7656 134.869 50.5596 135.934 32.5134 118.988C17.6494 105.03 14.3159 83.2075 22.96 65.7412C22.8158 78.9949 28.2815 92.6357 39.0771 102.773C58.2585 120.785 87.0846 121.003 103.932 103.437Z" fill="#D9D9D9" />
            <ellipse cx="41.1946" cy="41.0499" rx="41.1946" ry="41.0499" transform="matrix(-0.656802 -0.754063 0.784132 -0.620594 158.302 150.389)" fill="white" />
            <path d="M193.124 122.667C193.437 122.167 193.739 121.656 194.027 121.135C204.339 102.449 193.899 77.6749 170.709 65.8017C160.893 60.7759 150.366 58.8691 140.707 59.7562C158.257 49.0435 181.977 52.3745 195.795 68.2383C210.018 84.5675 208.621 108.287 193.124 122.667Z" fill="#D9D9D9" />
            <circle cx="114.015" cy="57.0156" r="55" transform="rotate(87.8598 114.015 57.0156)" fill="white" />
            <circle cx="113.928" cy="81.7276" r="55" transform="rotate(42.8623 113.928 81.7276)" fill="white" />
            <path d="M70.5784 47.833C70.257 48.5684 69.9529 49.3153 69.6683 50.0741C59.4607 77.2902 77.1764 109.101 109.237 121.126C122.81 126.217 136.777 126.944 149.147 124.026C128.212 141.692 96.9034 141.366 76.3139 122.258C55.1217 102.591 52.9234 70.1161 70.5784 47.833Z" fill="#D9D9D9" />
            <path d="M167.965 94.8978C168.382 90.4195 168.277 85.8307 167.597 81.1989C162.819 48.6464 131.481 26.2889 97.6026 31.2615C94.1902 31.7624 90.8825 32.5223 87.6974 33.5157C99.4882 26.8903 113.731 24.5723 127.893 28.091C157.372 35.4155 175.332 65.251 168.008 94.7303C167.994 94.7863 167.979 94.842 167.965 94.8978Z" fill="#D9D9D9" />
        </svg>
    )
}

export function ForecastSunnyCloudyIcon({ size, width = 48, height = 50, style, className }: IconProps) {
    const id = React.useId()
    return (
        <svg width={size ?? width} height={size ? size * (240 / 229) : height} viewBox="0 0 229 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <ellipse cx="74.0761" cy="74.3857" rx="74.0761" ry="74.3857" transform="matrix(-0.26566 -0.964067 0.964721 -0.263275 61.6274 199.329)" fill={`url(#paint0_${id})`} />
            <g filter={`url(#filter0_${id})`}>
                <circle cx="149.5" cy="90.5" r="17.5" fill="white" />
            </g>
            <rect x="105" width="17" height="25" rx="8.5" fill={`url(#paint1_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 -0.70539 0.708819 0.70539 26.9761 39.5829)" fill={`url(#paint2_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 0.70539 -0.708819 0.70539 47.9507 163)" fill={`url(#paint3_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 0.70539 -0.708819 0.70539 185.276 26.8199)" fill={`url(#paint4_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 -0.70539 0.708819 0.70539 164.589 176.853)" fill={`url(#paint5_${id})`} />
            <rect x="198" y="117" width="18" height="25" rx="9" transform="rotate(-90 198 117)" fill={`url(#paint6_${id})`} />
            <rect x="105" y="192" width="17" height="25" rx="8.5" fill={`url(#paint7_${id})`} />
            <rect y="117" width="18" height="25" rx="9" transform="rotate(-90 0 117)" fill={`url(#paint8_${id})`} />
            <ellipse cx="44.8241" cy="44.8635" rx="44.8241" ry="44.8635" transform="matrix(0.728977 0.684538 -0.675921 0.736974 66.6484 102)" fill="white" />
            <path d="M109.932 183.437C107.965 188.164 105.162 192.631 101.513 196.609C84.7656 214.869 56.5596 215.934 38.5134 198.988C23.6494 185.03 20.3159 163.207 28.96 145.741C28.8158 158.995 34.2815 172.636 45.0771 182.773C64.2585 200.785 93.0846 201.003 109.932 183.437Z" fill="#D9D9D9" />
            <ellipse cx="41.1946" cy="41.0499" rx="41.1946" ry="41.0499" transform="matrix(-0.656802 -0.754063 0.784132 -0.620594 164.302 230.389)" fill="white" />
            <path d="M199.124 202.667C199.437 202.167 199.739 201.656 200.027 201.135C210.339 182.449 199.899 157.675 176.709 145.802C166.893 140.776 156.366 138.869 146.707 139.756C164.257 129.043 187.977 132.374 201.795 148.238C216.018 164.567 214.621 188.287 199.124 202.667Z" fill="#D9D9D9" />
            <circle cx="120.015" cy="137.016" r="55" transform="rotate(87.8598 120.015 137.016)" fill="white" />
            <circle cx="119.928" cy="161.728" r="55" transform="rotate(42.8623 119.928 161.728)" fill="white" />
            <path d="M76.5784 127.833C76.257 128.568 75.9529 129.315 75.6683 130.074C65.4607 157.29 83.1764 189.101 115.237 201.126C128.81 206.217 142.777 206.944 155.147 204.026C134.212 221.692 102.903 221.366 82.3139 202.258C61.1217 182.591 58.9234 150.116 76.5784 127.833Z" fill="#D9D9D9" />
            <path d="M173.965 174.898C174.382 170.419 174.277 165.831 173.597 161.199C168.819 128.646 137.481 106.289 103.603 111.261C100.19 111.762 96.8825 112.522 93.6974 113.516C105.488 106.89 119.731 104.572 133.893 108.091C163.372 115.416 181.332 145.251 174.008 174.73C173.994 174.786 173.979 174.842 173.965 174.898Z" fill="#D9D9D9" />
            <defs>
                <filter id={`filter0_${id}`} x="112" y="53" width="75" height="75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result={`effect1_${id}`} />
                </filter>
                <linearGradient id={`paint0_${id}`} x1="74.0761" y1="0" x2="74.0761" y2="148.771" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B76F22" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint1_${id}`} x1="88.5667" y1="12.5" x2="137.3" y2="12.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint2_${id}`} x1="-3.61733" y1="12.1465" x2="33.1644" y2="13.2244" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint3_${id}`} x1="9.04338" y1="12.5" x2="33.1856" y2="12.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint4_${id}`} x1="-90.0686" y1="10.909" x2="33.0573" y2="15.7576" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint5_${id}`} x1="-90.0686" y1="10.909" x2="33.0573" y2="15.7576" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint6_${id}`} x1="180.6" y1="129.5" x2="232.2" y2="129.5" gradientUnits="userSpaceOnUse">
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint7_${id}`} x1="88.5667" y1="204.5" x2="137.3" y2="204.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint8_${id}`} x1="-17.4" y1="129.5" x2="34.2" y2="129.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export function ForecastSunnyIcon({ size, width = 48, height = 50, style, className }: IconProps) {
    const id = React.useId()
    return (
        <svg width={size ?? width} height={size ? size * (240 / 229) : height} viewBox="0 0 229 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <ellipse cx="74.0761" cy="74.3857" rx="74.0761" ry="74.3857" transform="matrix(-0.26566 -0.964067 0.964721 -0.263275 61.6274 199.329)" fill={`url(#paint0_${id})`} />
            <g filter={`url(#filter0_${id})`}>
                <circle cx="149.5" cy="90.5" r="17.5" fill="white" />
            </g>
            <rect x="105" width="17" height="25" rx="8.5" fill={`url(#paint1_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 -0.70539 0.708819 0.70539 26.9761 39.5829)" fill={`url(#paint2_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 0.70539 -0.708819 0.70539 47.9507 163)" fill={`url(#paint3_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 -0.70539 0.708819 0.70539 185.276 26.8199)" fill={`url(#paint4_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 0.70539 -0.708819 0.70539 164.589 176.853)" fill={`url(#paint5_${id})`} />
            <rect x="198" y="117" width="18" height="25" rx="9" transform="rotate(-90 198 117)" fill={`url(#paint6_${id})`} />
            <rect x="105" y="192" width="17" height="25" rx="8.5" fill={`url(#paint7_${id})`} />
            <rect y="117" width="18" height="25" rx="9" transform="rotate(-90 0 117)" fill={`url(#paint8_${id})`} />
            <ellipse cx="44.8241" cy="44.8635" rx="44.8241" ry="44.8635" transform="matrix(0.728977 0.684538 -0.675921 0.736974 66.6484 102)" fill="white" />
            <path d="M109.932 183.437C107.965 188.164 105.162 192.631 101.513 196.609C84.7656 214.869 56.5596 215.934 38.5134 198.988C23.6494 185.03 20.3159 163.207 28.96 145.741C28.8158 158.995 34.2815 172.636 45.0771 182.773C64.2585 200.785 93.0846 201.003 109.932 183.437Z" fill="#D9D9D9" />
            <ellipse cx="41.1946" cy="41.0499" rx="41.1946" ry="41.0499" transform="matrix(-0.656802 -0.754063 0.784132 -0.620594 164.302 230.389)" fill="white" />
            <path d="M199.124 202.667C199.437 202.167 199.739 201.656 200.027 201.135C210.339 182.449 199.899 157.675 176.709 145.802C166.893 140.776 156.366 138.869 146.707 139.756C164.257 129.043 187.977 132.374 201.795 148.238C216.018 164.567 214.621 188.287 199.124 202.667Z" fill="#D9D9D9" />
            <circle cx="120.015" cy="137.016" r="55" transform="rotate(87.8598 120.015 137.016)" fill="white" />
            <circle cx="119.928" cy="161.728" r="55" transform="rotate(42.8623 119.928 161.728)" fill="white" />
            <path d="M76.5784 127.833C76.257 128.568 75.9529 129.315 75.6683 130.074C65.4607 157.29 83.1764 189.101 115.237 201.126C128.81 206.217 142.777 206.944 155.147 204.026C134.212 221.692 102.903 221.366 82.3139 202.258C61.1217 182.591 58.9234 150.116 76.5784 127.833Z" fill="#D9D9D9" />
            <path d="M173.965 174.898C174.382 170.419 174.277 165.831 173.597 161.199C168.819 128.646 137.481 106.289 103.603 111.261C100.19 111.762 96.8825 112.522 93.6974 113.516C105.488 106.89 119.731 104.572 133.893 108.091C163.372 115.416 181.332 145.251 174.008 174.73C173.994 174.786 173.979 174.842 173.965 174.898Z" fill="#D9D9D9" />
            <defs>
                <filter id={`filter0_${id}`} x="112" y="53" width="75" height="75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result={`effect1_${id}`} />
                </filter>
                <linearGradient id={`paint0_${id}`} x1="74.0761" y1="0" x2="74.0761" y2="148.771" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B76F22" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint1_${id}`} x1="88.5667" y1="12.5" x2="137.3" y2="12.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint2_${id}`} x1="-3.61733" y1="12.1465" x2="33.1644" y2="13.2244" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint3_${id}`} x1="9.04338" y1="12.5" x2="33.1856" y2="12.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint4_${id}`} x1="-90.0686" y1="10.909" x2="33.0573" y2="15.7576" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint5_${id}`} x1="-90.0686" y1="10.909" x2="33.0573" y2="15.7576" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint6_${id}`} x1="180.6" y1="129.5" x2="232.2" y2="129.5" gradientUnits="userSpaceOnUse">
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint7_${id}`} x1="88.5667" y1="204.5" x2="137.3" y2="204.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint8_${id}`} x1="-17.4" y1="129.5" x2="34.2" y2="129.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export function ForecastRainyIcon({ size, width = 48, height = 46, style, className }: IconProps) {
    const id = React.useId()
    return (
        <svg width={size ?? width} height={size ? size * (217 / 223) : height} viewBox="0 0 223 217" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <ellipse cx="74.0761" cy="74.3857" rx="74.0761" ry="74.3857" transform="matrix(-0.26566 -0.964067 0.964721 -0.263275 61.6274 199.329)" fill={`url(#paint0_${id})`} />
            <g filter={`url(#filter0_${id})`}>
                <circle cx="149.5" cy="90.5" r="17.5" fill="white" />
            </g>
            <rect x="105" width="17" height="25" rx="8.5" fill={`url(#paint1_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 -0.70539 0.708819 0.70539 26.9761 39.5829)" fill={`url(#paint2_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 0.70539 -0.708819 0.70539 47.9507 163)" fill={`url(#paint3_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 0.70539 -0.708819 0.70539 185.276 26.8199)" fill={`url(#paint4_${id})`} />
            <rect width="17.4661" height="25" rx="8.73306" transform="matrix(0.708819 -0.70539 0.708819 0.70539 164.589 176.853)" fill={`url(#paint5_${id})`} />
            <rect x="198" y="117" width="18" height="25" rx="9" transform="rotate(-90 198 117)" fill={`url(#paint6_${id})`} />
            <rect x="105" y="192" width="17" height="25" rx="8.5" fill={`url(#paint7_${id})`} />
            <rect y="117" width="18" height="25" rx="9" transform="rotate(-90 0 117)" fill={`url(#paint8_${id})`} />
            <defs>
                <filter id={`filter0_${id}`} x="112" y="53" width="75" height="75" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="10" result={`effect1_${id}`} />
                </filter>
                <linearGradient id={`paint0_${id}`} x1="74.0761" y1="0" x2="74.0761" y2="148.771" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B76F22" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint1_${id}`} x1="88.5667" y1="12.5" x2="137.3" y2="12.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint2_${id}`} x1="-3.61733" y1="12.1465" x2="33.1644" y2="13.2244" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint3_${id}`} x1="9.04338" y1="12.5" x2="33.1856" y2="12.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint4_${id}`} x1="-90.0686" y1="10.909" x2="33.0573" y2="15.7576" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint5_${id}`} x1="-90.0686" y1="10.909" x2="33.0573" y2="15.7576" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint6_${id}`} x1="180.6" y1="129.5" x2="232.2" y2="129.5" gradientUnits="userSpaceOnUse">
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint7_${id}`} x1="88.5667" y1="204.5" x2="137.3" y2="204.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
                <linearGradient id={`paint8_${id}`} x1="-17.4" y1="129.5" x2="34.2" y2="129.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C2802E" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export function ForecastStormIcon({ size, width = 48, height = 50, style, className }: IconProps) {
    const id = React.useId()
    return (
        <svg width={size ?? width} height={size ? size * (240 / 223) : height} viewBox="0 0 223 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <path d="M89.9102 89.7806C90.4691 87.558 92.4674 86 94.7592 86H126.205C129.576 86 131.981 89.2687 130.978 92.4876L115.942 140.74C114.939 143.959 117.344 147.228 120.715 147.228H141.8C145.765 147.228 148.152 151.621 145.996 154.948L109.412 211.382C106.279 216.216 98.8027 212.791 100.417 207.262L112.052 167.401C112.986 164.201 110.586 161 107.252 161H78.4131C75.1573 161 72.77 157.938 73.5641 154.781L89.9102 89.7806Z" fill={`url(#paint0_${id})`} />
            <ellipse cx="44.8241" cy="44.8635" rx="44.8241" ry="44.8635" transform="matrix(0.728977 0.684538 -0.675921 0.736974 60.6484 22.0003)" fill="white" />
            <path d="M103.932 103.437C101.965 108.164 99.1617 112.631 95.5132 116.609C78.7656 134.869 50.5596 135.934 32.5134 118.988C17.6494 105.03 14.3159 83.2075 22.96 65.7412C22.8158 78.9949 28.2815 92.6357 39.0771 102.773C58.2585 120.785 87.0846 121.003 103.932 103.437Z" fill="#D9D9D9" />
            <ellipse cx="41.1946" cy="41.0499" rx="41.1946" ry="41.0499" transform="matrix(-0.656802 -0.754063 0.784132 -0.620594 158.302 150.389)" fill="white" />
            <path d="M193.124 122.667C193.437 122.167 193.739 121.656 194.027 121.135C204.339 102.449 193.899 77.6749 170.709 65.8017C160.893 60.7759 150.366 58.8691 140.707 59.7562C158.257 49.0435 181.977 52.3745 195.795 68.2383C210.018 84.5675 208.621 108.287 193.124 122.667Z" fill="#D9D9D9" />
            <circle cx="114.015" cy="57.0156" r="55" transform="rotate(87.8598 114.015 57.0156)" fill="white" />
            <circle cx="113.928" cy="81.7276" r="55" transform="rotate(42.8623 113.928 81.7276)" fill="white" />
            <path d="M70.5784 47.833C70.257 48.5684 69.9529 49.3153 69.6683 50.0741C59.4607 77.2902 77.1764 109.101 109.237 121.126C122.81 126.217 136.777 126.944 149.147 124.026C128.212 141.692 96.9034 141.366 76.3139 122.258C55.1217 102.591 52.9234 70.1161 70.5784 47.833Z" fill="#D9D9D9" />
            <path d="M167.965 94.8978C168.382 90.4195 168.277 85.8307 167.597 81.1989C162.819 48.6464 131.481 26.2889 97.6026 31.2615C94.1902 31.7624 90.8825 32.5223 87.6974 33.5157C99.4882 26.8903 113.731 24.5723 127.893 28.091C157.372 35.4155 175.332 65.251 168.008 94.7303C167.994 94.7863 167.979 94.842 167.965 94.8978Z" fill="#D9D9D9" />
            <defs>
                <linearGradient id={`paint0_${id}`} x1="73.4173" y1="140.098" x2="136.618" y2="146.097" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF8D00" />
                    <stop offset="1" stopColor="#FAD262" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export function ForecastSnowingIcon({ size, width = 48, height = 45, style, className }: IconProps) {
    return (
        <svg width={size ?? width} height={size ? size * (155 / 165) : height} viewBox="0 0 165 155" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
            <path d="M54.5579 107.477C59.3107 104.671 65.3167 108.26 65.0969 113.775L65.0813 114.044L62.3694 149.823C62.1604 152.576 59.7584 154.639 57.0051 154.431C54.2517 154.222 52.188 151.82 52.3967 149.066L54.6565 119.282L30.7239 134.594C28.3979 136.082 25.3059 135.403 23.8176 133.077C22.3294 130.751 23.0092 127.659 25.3352 126.171L54.3284 107.618L54.5579 107.477ZM97.929 115.865C97.2987 110.382 103.021 106.355 107.97 108.799L108.208 108.923L139.791 125.953C142.221 127.264 143.129 130.297 141.819 132.727C140.508 135.158 137.475 136.066 135.044 134.756L108.753 120.577L113.007 148.668C113.421 151.398 111.543 153.947 108.813 154.36C106.083 154.774 103.534 152.895 103.12 150.165L97.9651 116.132L97.929 115.865ZM75.2854 51.0721C79.1906 47.1669 85.5227 47.1669 89.428 51.0721L110.641 72.285C114.424 76.0682 114.543 82.129 110.996 86.0546L110.641 86.4276L82.3567 58.1425L61.1438 79.3563L82.3567 100.569L103.57 79.3563L110.641 86.4276L89.428 107.641L89.0549 107.995C85.256 111.427 79.4573 111.427 75.6584 107.995L75.2854 107.641L54.0725 86.4276C50.1673 82.5224 50.1673 76.1903 54.0725 72.285L75.2854 51.0721ZM0.613525 59.6024C1.93805 57.1795 4.9767 56.2888 7.39966 57.6132L38.884 74.8251L39.1174 74.9579C43.8627 77.7773 43.6017 84.7697 38.6594 87.2274L38.4163 87.3427L7.06567 101.555C4.5507 102.695 1.58766 101.58 0.44751 99.0653C-0.692595 96.5504 0.421947 93.5874 2.93677 92.4471L28.8127 80.7157L2.60278 66.3885C0.179991 65.064 -0.710765 62.0253 0.613525 59.6024ZM157.603 57.6132C160.026 56.2887 163.064 57.1795 164.389 59.6024C165.713 62.0254 164.823 65.064 162.4 66.3885L136.19 80.7157L162.066 92.4471C164.581 93.5873 165.695 96.5503 164.555 99.0653C163.415 101.58 160.452 102.695 157.937 101.555L126.586 87.3427L126.343 87.2274C121.401 84.7697 121.14 77.7773 125.885 74.9579L126.118 74.8251L157.603 57.6132ZM56.9768 0.0145264C59.7302 -0.194161 62.1322 1.86953 62.3411 4.62292L65.054 40.4022L65.0696 40.6698C65.2895 46.1851 59.2824 49.7749 54.5295 46.9686L54.301 46.827L25.3069 28.2743C22.9809 26.786 22.302 23.694 23.7903 21.368C25.2787 19.0424 28.3707 18.3633 30.6965 19.8514L54.6282 35.1639L52.3684 5.37878C52.1597 2.62539 54.2234 0.223379 56.9768 0.0145264ZM108.442 0.0145264C111.195 0.22338 113.259 2.62538 113.05 5.37878L110.79 35.1639L134.723 19.8514C137.049 18.3634 140.141 19.0422 141.629 21.368C143.117 23.694 142.438 26.786 140.112 28.2743L111.118 46.827L110.889 46.9686C106.136 49.7747 100.13 46.185 100.35 40.6698L100.365 40.4022L103.077 4.62292C103.286 1.86961 105.688 -0.194021 108.442 0.0145264Z" fill="white" />
        </svg>
    )
}
