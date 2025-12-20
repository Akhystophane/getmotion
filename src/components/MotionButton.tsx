import { useState } from 'react'

interface MotionButtonProps {
  text?: string
  onClick?: () => void
  className?: string
}

const WHATSAPP_URL = "https://wa.me/33768256764?text=Hi%2C%20I%E2%80%99d%20like%20my%20free%20video%20sample.%20Here%E2%80%99s%20my%20script%2Fidea%3A"

export function MotionButton({
  text = "Get a Free Sample",
  onClick,
  className = ''
}: MotionButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    } else {
      // If no custom onClick, open WhatsApp
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')
      e.preventDefault()
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative group cursor-pointer
        px-8 py-4 sm:px-10 sm:py-5
        font-sans font-medium text-sm sm:text-base tracking-wide
        text-white
        rounded-lg
        transition-all duration-300 ease-out
        hover:scale-[1.01]
        active:scale-[0.99]
        ${className}
      `}
      style={{
        // Metallic gradient background
        background: `
          linear-gradient(
            145deg,
            rgba(50, 50, 55, 1) 0%,
            rgba(25, 25, 28, 1) 25%,
            rgba(15, 15, 18, 1) 50%,
            rgba(20, 20, 23, 1) 75%,
            rgba(35, 35, 40, 1) 100%
          )
        `,
        // Relief/bevel effect with shadows
        boxShadow: isHovered 
          ? `
            /* Outer shadow for depth */
            0 8px 20px rgba(0, 0, 0, 0.6),
            0 4px 10px rgba(0, 0, 0, 0.4),
            /* Top highlight bevel */
            inset 0 1px 1px rgba(255, 255, 255, 0.15),
            /* Left highlight bevel */
            inset 1px 0 1px rgba(255, 255, 255, 0.08),
            /* Bottom shadow bevel */
            inset 0 -2px 3px rgba(0, 0, 0, 0.4),
            /* Right shadow bevel */
            inset -1px 0 2px rgba(0, 0, 0, 0.3),
            /* Inner glow */
            inset 0 0 15px rgba(0, 0, 0, 0.3)
          ` 
          : `
            /* Outer shadow for depth */
            0 6px 15px rgba(0, 0, 0, 0.5),
            0 3px 8px rgba(0, 0, 0, 0.3),
            /* Top highlight bevel */
            inset 0 1px 1px rgba(255, 255, 255, 0.12),
            /* Left highlight bevel */
            inset 1px 0 1px rgba(255, 255, 255, 0.06),
            /* Bottom shadow bevel */
            inset 0 -2px 3px rgba(0, 0, 0, 0.5),
            /* Right shadow bevel */
            inset -1px 0 2px rgba(0, 0, 0, 0.4),
            /* Inner depth */
            inset 0 0 10px rgba(0, 0, 0, 0.2)
          `,
        border: '1px solid rgba(60, 60, 65, 0.8)',
      }}
    >
      {/* Top edge metallic highlight */}
      <span 
        className="absolute inset-x-2 top-0 h-[1px] rounded-t-lg"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
        }}
      />
      
      {/* Subtle surface texture */}
      <span 
        className="absolute inset-0 rounded-lg opacity-30 pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,0.02) 2px,
              rgba(255,255,255,0.02) 4px
            )
          `,
        }}
      />

      {/* Center reflection */}
      <span 
        className="absolute inset-x-4 top-1/4 h-1/3 rounded-full opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)',
        }}
      />
      
      {/* Button text with arrow */}
      <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-sm">
        {text}
        <span className="text-lg group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
          ↗
        </span>
      </span>
    </button>
  )
}
