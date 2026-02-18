export default function DarkCloudIcon({ size = 300, style }: { size?: number, style?: React.CSSProperties }) {
    const width = size
    const height = (size * 478) / 706
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 706 478"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={style}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M353.033 0.138657C466.495 -3.84548 562.084 78.5139 568.068 184.671C605.989 189.568 642.229 206.691 668.779 235.333C725.176 296.172 716.505 385.94 649.411 435.835C597.275 474.607 525.204 477.89 469.198 448.881C399.158 489.392 308.499 487.475 240.101 441.624C179.788 468.678 105.673 459.961 53.799 414.19C-14.31 354.094 -18.2835 252.881 44.924 188.125C76.6647 155.607 119.311 138.467 162.53 137.069C187.957 60.3052 262.668 3.3118 353.033 0.138657Z"
                fill="#0F1A29"
            />
        </svg>
    )
}
