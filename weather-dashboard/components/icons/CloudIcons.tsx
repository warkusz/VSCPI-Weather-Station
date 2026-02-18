import React from 'react'

interface CloudProps {
    size?: number
    width?: number
    height?: number
    style?: React.CSSProperties
    opacity?: number
}

export function CloudRightSun({ width = 706, height = 478, style, opacity = 1 }: CloudProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 706 478" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...style, opacity }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M353.033 0.138657C466.495 -3.84548 562.084 78.5139 568.068 184.671C605.989 189.568 642.229 206.691 668.779 235.333C725.176 296.172 716.505 385.94 649.411 435.835C597.275 474.607 525.204 477.89 469.198 448.881C399.158 489.392 308.499 487.475 240.101 441.624C179.788 468.678 105.673 459.961 53.799 414.19C-14.31 354.094 -18.2835 252.881 44.924 188.125C76.6647 155.607 119.311 138.467 162.53 137.069C187.957 60.3052 262.668 3.3118 353.033 0.138657Z" fill="#0F1A29" />
        </svg>
    )
}

export function CloudLeftCity({ width = 462, height = 398, style, opacity = 1 }: CloudProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 462 398" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...style, opacity }}>
            <path d="M396.315 364.238C326.234 416.658 229.039 405.639 179.225 339.627C171.645 329.583 165.602 318.844 161.046 307.67C136.468 318.941 108.538 322.775 81.4945 316.753C19.4908 302.947 -14.3736 242.567 5.85633 181.891C21.5769 134.741 65.3376 101.288 113.162 95.195C142.11 33.2434 209.556 -6.98699 280.071 1.01024C349.069 8.8354 399.737 60.4217 408.482 124.499C417.508 131.751 425.763 140.191 433.012 149.797C482.826 215.81 466.396 311.818 396.315 364.238Z" fill="#0F1A29" />
        </svg>
    )
}

export function CloudBottomLeft({ width = 539, height = 367, style, opacity = 1 }: CloudProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 539 367" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...style, opacity }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M269.475 0.10644C182.852 -2.95197 109.877 60.2708 105.308 141.762C76.3553 145.52 48.687 158.665 28.416 180.653C-14.6404 227.357 -8.0199 296.267 43.2031 334.569C83.0081 364.333 138.033 366.853 180.791 344.582C234.263 375.68 303.474 374.209 355.692 339.012C401.738 359.781 458.323 353.091 497.927 317.954C549.925 271.821 552.959 194.125 504.703 144.415C480.47 119.452 447.911 106.294 414.915 105.221C395.503 46.293 338.464 2.5423 269.475 0.10644Z" fill="#0F1A29" />
        </svg>
    )
}

export function CloudBottomRight({ width = 435, height = 340, style, opacity = 1 }: CloudProps) {
    return (
        <svg width={width} height={height} viewBox="0 0 435 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ ...style, opacity }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M302.443 336.494C217.067 351.453 136.08 298.883 120.332 218.798C91.1376 219.062 61.9226 209.853 38.8166 190.866C-10.2616 150.538 -13.1946 81.3717 32.2654 36.3803C77.7254 -8.61084 154.364 -12.391 203.442 27.9374C211.071 34.2064 217.584 41.1733 222.975 48.6369C231.464 45.6681 240.326 43.3393 249.508 41.7304C335.712 26.6266 417.444 80.3675 432.062 161.764C446.679 243.161 388.647 321.39 302.443 336.494Z" fill="#0F1A29" />
        </svg>
    )
}

