import { useState, useEffect, lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { WaitlistForm } from './WaitlistForm'

// Lazy load the 3D model to improve initial load time
const AlarmClock3D = lazy(() => import('./AlarmClock3D').then(module => ({ default: module.AlarmClock3D })))

function useScreenDimensions() {
  const [dimensions, setDimensions] = useState({ 
    width: 1440, 
    height: 900, 
    aspectRatio: 1.6,
    isPortrait: false 
  })

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setDimensions({
        width,
        height,
        aspectRatio: width / height,
        isPortrait: height > width
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return dimensions
}

function useGridDimensions(aspectRatio: number) {
  const baseCells = 8
  
  if (aspectRatio > 1) {
    const cols = Math.round(baseCells * Math.min(aspectRatio, 2.5))
    const rows = Math.round(cols / aspectRatio)
    return { 
      cols: Math.max(cols, 10), 
      rows: Math.max(rows, 4) 
    }
  } else {
    const rows = Math.round(baseCells / aspectRatio)
    const cols = Math.round(rows * aspectRatio)
    return { 
      cols: Math.max(cols, 4), 
      rows: Math.max(rows, 8) 
    }
  }
}

function usePageReady() {
  const [isPageReady, setIsPageReady] = useState(false)

  useEffect(() => {
    // Wait for fonts and document to be fully ready
    const checkReady = async () => {
      // Wait for fonts to load
      await document.fonts.ready
      // Small RAF to ensure paint is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsPageReady(true)
        })
      })
    }

    if (document.readyState === 'complete') {
      checkReady()
    } else {
      window.addEventListener('load', checkReady)
      return () => window.removeEventListener('load', checkReady)
    }
  }, [])

  return isPageReady
}

interface HeroProps {
  onReady?: () => void
}

export function Hero({ onReady }: HeroProps) {
  const screen = useScreenDimensions()
  const { cols: gridCols, rows: gridRows } = useGridDimensions(screen.aspectRatio)
  const isPageReady = usePageReady()
  const [isModelReady, setIsModelReady] = useState(false)

  // Animations start only when both page and 3D model are ready
  const isReady = isPageReady && isModelReady

  // Notify parent when everything is loaded
  useEffect(() => {
    if (isReady && onReady) {
      onReady()
    }
  }, [isReady, onReady])

  const cellSize = 100
  const gridWidth = gridCols * cellSize
  const gridHeight = gridRows * cellSize
  const overflow = 80

  // Responsive curve parameters based on screen size
  // Using a single smooth cubic Bezier for best results
  const getCurvePath = () => {
    const w = screen.width
    const h = screen.height
    
    if (screen.isPortrait) {
      // Portrait: curve compressed vertically to leave more room for title
      return `M ${-w * 0.1} ${h * 0.32}
              C ${w * 0.35} ${h * 0.32}, ${w * 0.25} ${h * 0.6}, ${w * 1.1} ${h * 0.75}`
    } else {
      // Landscape: single smooth curve across the screen
      return `M ${-w * 0.1} ${h * 0.25}
              C ${w * 0.3} ${h * 0.25}, ${w * 0.5} ${h * 0.85}, ${w * 1.1} ${h * 0.98}`
    }
  }

  // Responsive stroke width - thinner on small screens
  const strokeWidth = Math.max(30, Math.min(60, screen.width * 0.04))

  return (
    <section className="relative h-screen bg-white overflow-hidden flex flex-col">
      {/* Decorative Curve with gradient - responsive to screen size */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox={`0 0 ${screen.width} ${screen.height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#888888" />
          </linearGradient>
        </defs>
        <motion.path
          d={getCurvePath()}
          stroke="url(#curveGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isReady ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
        />
      </svg>

      {/* Top Section - Title & Subtitle */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-16 sm:pt-14 md:pt-16 lg:pt-20 shrink-0">
        {/* Headline Container - scales with viewport */}
        <div 
          className="w-full flex justify-center items-center"
          style={{ 
            // Scale the entire headline container based on viewport
            fontSize: 'min(9vw, 10vh, 200px)'
          }}
        >
          {/* Offset to center the whole group (Part 1 extends more left than Part 3 extends right) */}
          <div 
            className="relative inline-block"
            style={{
              // Shift right to compensate for Part 1 being longer
              transform: 'translateX(8%)'
            }}
          >
            {/* Part 2 - Center anchor (the reference) - sized in em relative to container */}
            <motion.span 
              className="block font-sans text-[1em] font-black text-black tracking-tight whitespace-nowrap leading-none"
              initial={{ opacity: 0, y: '0.3em' }}
              animate={isReady ? { opacity: 1, y: 0 } : undefined}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: 'easeOut'
              }}
            >
              engaging videos
            </motion.span>
            
            {/* Part 1 - Positioned so it ENDS at 35% of Part 2's width */}
            <motion.span 
              className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
              style={{ 
                bottom: '95%',
                right: '65%',
              }}
              initial={{ opacity: 0, x: '-3em' }}
              animate={isReady ? { opacity: 1, x: 0 } : undefined}
              transition={{ 
                duration: 0.4, 
                delay: 0,
                ease: 'easeOut'
              }}
            >
              Turn your ideas into
            </motion.span>
            
            {/* Part 3 - Positioned so it STARTS at 85% of Part 2's width */}
            <motion.span 
              className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
              style={{ 
                top: '95%',
                left: '85%',
              }}
              initial={{ opacity: 0, y: '-0.8em' }}
              animate={isReady ? { opacity: 1, y: 0 } : undefined}
              transition={{ 
                duration: 0.6, 
                delay: 0.55,
                ease: 'easeOut'
              }}
            >
              at scale.
            </motion.span>
          </div>
        </div>

        {/* Subtitle - scales with viewport dimensions */}
        <motion.p 
          className="mt-[max(2.5rem,5vw)] max-w-2xl text-center font-serif italic text-black/80 leading-relaxed px-4"
          style={{
            fontSize: 'min(max(0.85rem, 1.8vw), 2.5vh, 1.25rem)'
          }}
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
        >
          Create trendy-style motion graphics videos in{' '}
          <span className="relative inline-block">
            minutes.
            {/* Curved underline - pen stroke style with gradient */}
            <motion.svg 
              className="absolute left-0 w-full overflow-visible pointer-events-none"
              style={{ bottom: '-0.5em', height: '1em', transformOrigin: 'left' }}
              viewBox="0 0 100 16"
              preserveAspectRatio="none"
              initial={{ scaleX: 0 }}
              animate={isReady ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.33, 1, 0.68, 1] }}
            >
              <defs>
                <linearGradient id="penGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="black" />
                  <stop offset="60%" stopColor="#333" />
                  <stop offset="100%" stopColor="#888" />
                </linearGradient>
              </defs>
              {/* Filled shape for tapered stroke effect */}
              <path
                d="M 0 12 
                   Q 50 2, 100 10
                   L 100 12
                   Q 50 6, 0 15
                   Z"
                fill="url(#penGradient)"
              />
            </motion.svg>
          </span>
        </motion.p>
      </div>

      {/* Bottom Section - 3D Model Area with Grid */}
      <div className="relative z-10 flex-1 flex items-start justify-center mt-2 sm:mt-4 mb-20 sm:mb-16 mx-4 sm:mx-8 md:mx-16 lg:mx-20">
        {/* Fixed Grid that scales proportionally */}
        <svg 
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox={`${-overflow} ${-overflow} ${gridWidth + overflow * 2} ${gridHeight + overflow * 2}`}
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Linear gradients for each edge - fade from edges inward */}
            <linearGradient id="fadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="20%" stopColor="white" />
              <stop offset="80%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <linearGradient id="fadeTop" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="black" />
              <stop offset="20%" stopColor="white" />
              <stop offset="80%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            <mask id="gridMask">
              {/* Horizontal fade (left & right edges) */}
              <rect 
                x={-overflow} 
                y={-overflow} 
                width={gridWidth + overflow * 2} 
                height={gridHeight + overflow * 2} 
                fill="url(#fadeLeft)" 
              />
              {/* Vertical fade (top & bottom edges) - multiplied with horizontal */}
              <rect 
                x={-overflow} 
                y={-overflow} 
                width={gridWidth + overflow * 2} 
                height={gridHeight + overflow * 2} 
                fill="url(#fadeTop)" 
                style={{ mixBlendMode: 'multiply' }}
              />
            </mask>
          </defs>
          
          {/* Grid group with mask applied */}
          <g mask="url(#gridMask)">
            {/* Horizontal lines - extend beyond grid */}
            {Array.from({ length: gridRows + 1 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={-overflow}
                y1={i * cellSize}
                x2={gridWidth + overflow}
                y2={i * cellSize}
                stroke="#7a7a7a"
                strokeWidth="2.5"
                strokeDasharray="5 5"
              />
            ))}
            
            {/* Vertical lines - extend beyond grid */}
            {Array.from({ length: gridCols + 1 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={i * cellSize}
                y1={-overflow}
                x2={i * cellSize}
                y2={gridHeight + overflow}
                stroke="#7a7a7a"
                strokeWidth="2.5"
                strokeDasharray="5 5"
              />
            ))}
            
            {/* Circle dots at intersections */}
            {Array.from({ length: gridRows + 1 }, (_, row) =>
              Array.from({ length: gridCols + 1 }, (_, col) => (
                <circle
                  key={`dot-${row}-${col}`}
                  cx={col * cellSize}
                  cy={row * cellSize}
                  r="4"
                  fill="#7a7a7a"
                />
              ))
            )}
          </g>
        </svg>
        
        {/* 3D Model Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-black/10 border-t-black/40 animate-spin" />
            </div>
          }>
            <AlarmClock3D onReady={() => setIsModelReady(true)} />
          </Suspense>
        </div>

        {/* CTA Button - appears with pop animation after page loads */}
        <motion.div
          className="absolute bottom-[5%] sm:bottom-[8%] md:bottom-[10%] left-1/2 z-20"
          initial={{ opacity: 0, scale: 0.3, y: 50, x: '-50%' }}
          animate={isReady ? {
            opacity: 1,
            scale: 1,
            y: 0,
            x: '-50%'
          } : undefined}
          transition={{
            duration: 0.8,
            delay: 0.5, // Small delay after everything is ready
            ease: [0.34, 1.56, 0.64, 1], // Bouncy easing for pop effect
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          style={{ transformOrigin: 'center center' }}
        >
          <WaitlistForm />
        </motion.div>
      </div>
    </section>
  )
}
