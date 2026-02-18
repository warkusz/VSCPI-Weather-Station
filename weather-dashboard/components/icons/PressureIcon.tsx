export default function PressureIcon({ size = 56 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 86 86" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43 0C66.7482 0 86 19.2518 86 43C86 66.7482 66.7482 86 43 86C19.2518 86 0 66.7482 0 43C0 19.2518 19.2518 0 43 0ZM43 6C22.5655 6 6 22.5655 6 43C6 63.4345 22.5655 80 43 80C63.4345 80 80 63.4345 80 43C80 22.5655 63.4345 6 43 6Z" fill="white" />
            <g filter="url(#filter0_d_pressure)">
                <mask id="path-2-inside-pressure" fill="white">
                    <path d="M43 9C61.7777 9 77 24.2223 77 43C77 61.7777 61.7777 77 43 77C24.2223 77 9 61.7777 9 43C9 24.2223 24.2223 9 43 9Z" />
                </mask>
                <path d="M43 9C61.7777 9 77 24.2223 77 43C77 61.7777 61.7777 77 43 77C24.2223 77 9 61.7777 9 43C9 24.2223 24.2223 9 43 9Z" fill="none" stroke="white" strokeWidth="5" mask="url(#path-2-inside-pressure)" />
            </g>
            <circle cx="43" cy="43" r="5" fill="#FF8D00" />
            <path fillRule="evenodd" clipRule="evenodd" d="M62.4111 21.9003C63.3464 21.1207 64.5989 22.3731 63.8193 23.3085L46.995 43.4843C46.6185 43.9358 45.9352 43.9664 45.5195 43.5507L42.1689 40.2001C41.7532 39.7844 41.7838 39.101 42.2353 38.7245L62.4111 21.9003Z" fill="#FF8D00" />
            <defs>
                <filter id="filter0_d_pressure" x="5" y="9" width="76" height="76" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_pressure" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_pressure" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}
