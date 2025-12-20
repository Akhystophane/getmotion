import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'

// Video sources
const VIDEO_1 = '/demo-video.mp4'
const VIDEO_2 = '/demo-video-2.mp4'
const VIDEO_3 = '/demo-video-3.mp4'

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

export function PhoneShowcase() {
  const screen = useScreenDimensions()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentVideoSrc, setCurrentVideoSrc] = useState(VIDEO_1)
  const [preloadedVideos, setPreloadedVideos] = useState<Set<string>>(new Set([VIDEO_1]))

  // Normal Hero curve path - same as Hero (left to right)
  const getHeroCurvePath = () => {
    const w = screen.width
    const h = screen.height

    if (screen.isPortrait) {
      // Portrait: same as Hero
      return `M ${-w * 0.1} ${h * 0.32}
              C ${w * 0.35} ${h * 0.32}, ${w * 0.25} ${h * 0.6}, ${w * 1.1} ${h * 0.75}`
    } else {
      // Landscape: same as Hero
      return `M ${-w * 0.1} ${h * 0.25}
              C ${w * 0.3} ${h * 0.25}, ${w * 0.5} ${h * 0.85}, ${w * 1.1} ${h * 0.98}`
    }
  }

  // Reversed Hero curve path - same position but draws from right to left
  const getReversedCurvePath = () => {
    const w = screen.width
    const h = screen.height

    if (screen.isPortrait) {
      // Portrait: Hero path reversed (end → start)
      return `M ${w * 1.1} ${h * 0.75}
              C ${w * 0.25} ${h * 0.6}, ${w * 0.35} ${h * 0.32}, ${-w * 0.1} ${h * 0.32}`
    } else {
      // Landscape: Hero path reversed (end → start)
      return `M ${w * 1.1} ${h * 0.98}
              C ${w * 0.5} ${h * 0.85}, ${w * 0.3} ${h * 0.25}, ${-w * 0.1} ${h * 0.25}`
    }
  }

  // Responsive stroke width (same as Hero)
  const strokeWidth = Math.max(30, Math.min(60, screen.width * 0.04))

  // Scroll progress within this section (0 to 1 over 5 screen heights)
  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll progress with a spring
  const scrollYProgress = useSpring(rawScrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Separate scroll progress for text entry - tracks entering the section
  const { scrollYProgress: rawTextProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  })

  const textScrollProgress = useSpring(rawTextProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform scroll progress to animations
  // Extended for 3 videos across 5 screen heights
  // Video 1 (0-0.18): phone visible, then shrinks and rotates 180
  // Video 2 (0.18-0.6): phone grows, rotates to 360, shrinks again and rotates to 540
  // Video 3 (0.6-1): phone grows back and rotates to 720 (right-side up)
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.12, 0.18, 0.35, 0.6, 0.75, 0.85],
    [0, 0, 180, 360, 360, 540, 720]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.18, 0.35, 0.6, 0.75, 0.85],
    [1, 1, 0, 1, 1, 0, 1]
  )

  // Circle radius for clip-path - starts growing when phone starts growing
  // Completes before rectangle transition begins
  const circleRadius = useTransform(
    scrollYProgress,
    [0.18, 0.23, 0.45, 0.6],
    [0, 10, 100, 150]
  )

  // Clip-path string that grows from phone position (slightly below center due to title)
  const clipPath = useTransform(
    circleRadius,
    (r) => `circle(${r}% at 50% 55%)`
  )

  // FIRST TITLE animations (Video 1) - fade in and slide up on scroll
  // Uses textScrollProgress which tracks entering the section (leaving Hero)
  // Part 1: "Classy and elegant" - appears first
  const text1Opacity = useTransform(
    textScrollProgress,
    [0.3, 0.5, 0.7],
    [0, 1, 1]
  )
  const text1Y = useTransform(
    textScrollProgress,
    [0.3, 0.5, 0.7],
    [20, 0, 0]
  )

  // Part 2: "to build trust" - appears second
  const text2Opacity = useTransform(
    textScrollProgress,
    [0.4, 0.6, 0.8],
    [0, 1, 1]
  )
  const text2Y = useTransform(
    textScrollProgress,
    [0.4, 0.6, 0.8],
    [20, 0, 0]
  )

  // Part 3: "with your audience." - appears last
  const text3Opacity = useTransform(
    textScrollProgress,
    [0.5, 0.7, 0.9],
    [0, 1, 1]
  )
  const text3Y = useTransform(
    textScrollProgress,
    [0.5, 0.7, 0.9],
    [20, 0, 0]
  )

  // Fade out first title when phone starts shrinking
  const firstTitleOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.12, 0.18],
    [1, 1, 0]
  )

  // SECOND TITLE animations (Video 2) - fade in when phone grows back
  // Part 1: "Colorful and punchy"
  const text1Opacity2 = useTransform(
    scrollYProgress,
    [0.25, 0.32, 0.38],
    [0, 1, 1]
  )
  const text1Y2 = useTransform(
    scrollYProgress,
    [0.25, 0.32, 0.38],
    [20, 0, 0]
  )

  // Part 2: "to captivate"
  const text2Opacity2 = useTransform(
    scrollYProgress,
    [0.27, 0.34, 0.4],
    [0, 1, 1]
  )
  const text2Y2 = useTransform(
    scrollYProgress,
    [0.27, 0.34, 0.4],
    [20, 0, 0]
  )

  // Part 3: "your audience."
  const text3Opacity2 = useTransform(
    scrollYProgress,
    [0.29, 0.36, 0.42],
    [0, 1, 1]
  )
  const text3Y2 = useTransform(
    scrollYProgress,
    [0.29, 0.36, 0.42],
    [20, 0, 0]
  )

  // Fade out second title before rectangle line appears
  const secondTitleOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.55, 0.63],
    [0, 1, 0]
  )

  // Rectangle transition - writing effect from left to right, then expands
  // Phase 1: Thin line draws from left to right (writing effect)
  const rectangleWidth = useTransform(
    scrollYProgress,
    [0.65, 0.72],
    [0, 100]
  )

  // Phase 2: After line is drawn, expand height from center
  const rectangleHeight = useTransform(
    scrollYProgress,
    [0.72, 0.82, 0.95],
    [0.5, 50, 100]
  )

  const rectangleClipPath = useTransform(
    [rectangleWidth, rectangleHeight],
    ([w, h]) => {
      const rightInset = 100 - w
      const topBottomInset = (100 - h) / 2
      return `inset(${topBottomInset}% ${rightInset}% ${topBottomInset}% 0%)`
    }
  )

  // THIRD TITLE animations (Video 3) - fade in during rectangle expansion
  // Part 1: "Minimalistic and symbolic"
  const text1Opacity3 = useTransform(
    scrollYProgress,
    [0.78, 0.83, 0.88],
    [0, 1, 1]
  )
  const text1Y3 = useTransform(
    scrollYProgress,
    [0.78, 0.83, 0.88],
    [20, 0, 0]
  )

  // Part 2: "to breakdown concepts"
  const text2Opacity3 = useTransform(
    scrollYProgress,
    [0.8, 0.85, 0.9],
    [0, 1, 1]
  )
  const text2Y3 = useTransform(
    scrollYProgress,
    [0.8, 0.85, 0.9],
    [20, 0, 0]
  )

  // Part 3: "for your audience"
  const text3Opacity3 = useTransform(
    scrollYProgress,
    [0.82, 0.87, 0.92],
    [0, 1, 1]
  )
  const text3Y3 = useTransform(
    scrollYProgress,
    [0.82, 0.87, 0.92],
    [20, 0, 0]
  )

  // Fade in third title when video 3 appears
  const thirdTitleOpacity = useTransform(
    scrollYProgress,
    [0.75, 0.82],
    [0, 1]
  )

  // DECORATIVE LINES ANIMATIONS

  // Video 1 curve - writes in (delayed until video 1 fully displayed), then writes out
  const curve1ProgressIn = useTransform(
    textScrollProgress,
    [0.5, 0.9],
    [0, 1]
  )
  const curve1ProgressOut = useTransform(
    scrollYProgress,
    [0.12, 0.18],
    [1, 0]
  )
  const curve1Opacity = useTransform(
    textScrollProgress,
    [0, 0.5, 0.6],
    [0, 0, 1]
  )

  // Video 2 curve - writes in, then writes out
  const curve2ProgressIn = useTransform(
    scrollYProgress,
    [0.2, 0.35],
    [0, 1]
  )
  const curve2ProgressOut = useTransform(
    scrollYProgress,
    [0.6, 0.65],
    [1, 0]
  )
  const curve2Opacity = useTransform(
    scrollYProgress,
    [0.18, 0.2],
    [0, 1]
  )

  // Video 3 curve - writes in, then writes out when leaving section
  const curve3ProgressIn = useTransform(
    scrollYProgress,
    [0.75, 0.85],
    [0, 1]
  )
  const curve3ProgressOut = useTransform(
    scrollYProgress,
    [0.92, 0.98],
    [1, 0]
  )
  const curve3Opacity = useTransform(
    scrollYProgress,
    [0.73, 0.75],
    [0, 1]
  )

  // Preload videos ahead of time to avoid lag
  useEffect(() => {
    const unsubscribe = rawScrollProgress.on('change', (v) => {
      // Preload video 2 when approaching (at 10% scroll)
      if (v > 0.1 && !preloadedVideos.has(VIDEO_2)) {
        const video = document.createElement('video')
        video.src = VIDEO_2
        video.preload = 'auto'
        setPreloadedVideos(prev => new Set([...prev, VIDEO_2]))
      }
      // Preload video 3 when approaching (at 60% scroll)
      if (v > 0.6 && !preloadedVideos.has(VIDEO_3)) {
        const video = document.createElement('video')
        video.src = VIDEO_3
        video.preload = 'auto'
        setPreloadedVideos(prev => new Set([...prev, VIDEO_3]))
      }
    })
    return () => unsubscribe()
  }, [rawScrollProgress, preloadedVideos])

  // Switch video source based on scroll
  useEffect(() => {
    const unsubscribe = rawScrollProgress.on('change', (v) => {
      // Switch to video 3 at 78% (when phone shrinks before rectangle transition)
      if (v > 0.78 && currentVideoSrc !== VIDEO_3) {
        setCurrentVideoSrc(VIDEO_3)
        if (videoRef.current) {
          videoRef.current.load()
          videoRef.current.play()
        }
      }
      // Switch to video 2 at 20% (when phone is hidden after first shrink)
      else if (v > 0.2 && v <= 0.78 && currentVideoSrc !== VIDEO_2) {
        setCurrentVideoSrc(VIDEO_2)
        if (videoRef.current) {
          videoRef.current.load()
          videoRef.current.play()
        }
      }
      // Switch back to video 1 when scrolling back
      else if (v <= 0.2 && currentVideoSrc !== VIDEO_1) {
        setCurrentVideoSrc(VIDEO_1)
        if (videoRef.current) {
          videoRef.current.load()
          videoRef.current.play()
        }
      }
    })
    return () => unsubscribe()
  }, [rawScrollProgress, currentVideoSrc])

  // Update progress bar
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100
      setProgress(percent || 0)
    }

    video.addEventListener('timeupdate', updateProgress)
    return () => video.removeEventListener('timeupdate', updateProgress)
  }, [currentVideoSrc])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      videoRef.current.currentTime = percent * videoRef.current.duration
    }
  }

  return (
    // Scroll container - 5 screen heights for the full animation
    <div ref={containerRef} className="relative h-[500vh] bg-white">
      {/* Purple circle - grows from center using clip-path */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: '#9333ea',
          clipPath,
        }}
      />

      {/* White rectangle - grows from horizontal line to full screen */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: '#ffffff',
          clipPath: rectangleClipPath,
        }}
      />

      {/* DECORATIVE CURVE 1 - Video 1 (mirrored Hero curve - right to left, black to white) */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        viewBox={`0 0 ${screen.width} ${screen.height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="curve1Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#888888" />
          </linearGradient>
        </defs>
        <motion.path
          d={getReversedCurvePath()}
          stroke="url(#curve1Gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: useTransform(
              [curve1ProgressIn, curve1ProgressOut],
              ([progressIn, progressOut]) => {
                // Use write-out if it's less than 1, otherwise use write-in
                return progressOut < 1 ? progressOut : progressIn
              }
            ),
            opacity: curve1Opacity,
          }}
        />
      </svg>

      {/* DECORATIVE CURVE 2 - Video 2 (normal Hero curve - left to right, purple to white gradient) */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        viewBox={`0 0 ${screen.width} ${screen.height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="curve2Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <motion.path
          d={getHeroCurvePath()}
          stroke="url(#curve2Gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: useTransform(
              [curve2ProgressIn, curve2ProgressOut],
              ([progressIn, progressOut]) => {
                // Use write-out if it's less than 1, otherwise use write-in
                return progressOut < 1 ? progressOut : progressIn
              }
            ),
            opacity: curve2Opacity,
          }}
        />
      </svg>

      {/* DECORATIVE CURVE 3 - Video 3 (reversed Hero curve - right to left, black to white gradient - same as curve 1) */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        viewBox={`0 0 ${screen.width} ${screen.height}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="curve3Gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="100%" stopColor="#888888" />
          </linearGradient>
        </defs>
        <motion.path
          d={getReversedCurvePath()}
          stroke="url(#curve3Gradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          style={{
            pathLength: useTransform(
              [curve3ProgressIn, curve3ProgressOut],
              ([progressIn, progressOut]) => {
                // Use write-out if it's less than 1, otherwise use write-in
                return progressOut < 1 ? progressOut : progressIn
              }
            ),
            opacity: curve3Opacity,
          }}
        />
      </svg>

      {/* Sticky container - stays fixed while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center px-4 overflow-hidden">
        {/* Title Area - takes ~20% of screen height */}
        <div
          className="relative shrink-0 w-full flex justify-center items-center"
          style={{
            fontSize: 'min(7vw, 8vh, 160px)',
            height: '18vh',
            paddingTop: '2vh',
          }}
        >
          {/* FIRST TITLE - Video 1 (black text) */}
          <motion.div
            className="relative inline-block"
            style={{
              transform: 'translateX(1%)',
              opacity: firstTitleOpacity,
            }}
          >
            {/* Part 2 - Center anchor (the reference) */}
            <motion.span
              className="block font-sans text-[1em] font-black text-black tracking-tight whitespace-nowrap leading-none"
              style={{
                opacity: text2Opacity,
                y: text2Y,
              }}
            >
              to build trust
            </motion.span>

            {/* Part 1 - Positioned so it ENDS at 35% of Part 2's width */}
            <motion.span
              className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
              style={{
                bottom: '95%',
                right: '65%',
                opacity: text1Opacity,
                y: text1Y,
              }}
            >
              Classy and elegant
            </motion.span>

            {/* Part 3 - Positioned so it STARTS at 85% of Part 2's width */}
            <motion.span
              className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
              style={{
                top: '95%',
                left: '65%',
                opacity: text3Opacity,
                y: text3Y,
              }}
            >
              with your audience.
            </motion.span>
          </motion.div>

          {/* SECOND TITLE - Video 2 (white text) */}
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            style={{ opacity: secondTitleOpacity }}
          >
            <div
              className="relative inline-block"
              style={{ transform: 'translateX(4%)' }}
            >
              {/* Part 2 - Center anchor (the reference) */}
              <motion.span
                className="block font-sans text-[1em] font-black text-white tracking-tight whitespace-nowrap leading-none"
                style={{
                  opacity: text2Opacity2,
                  y: text2Y2,
                }}
              >
                to captivate
              </motion.span>

              {/* Part 1 - Positioned so it ENDS at 35% of Part 2's width */}
              <motion.span
                className="absolute font-serif text-[0.58em] italic font-normal text-white tracking-tight whitespace-nowrap leading-none"
                style={{
                  bottom: '95%',
                  right: '65%',
                  opacity: text1Opacity2,
                  y: text1Y2,
                }}
              >
                Colorful and punchy
              </motion.span>

              {/* Part 3 - Positioned so it STARTS at 85% of Part 2's width */}
              <motion.span
                className="absolute font-serif text-[0.58em] italic font-normal text-white tracking-tight whitespace-nowrap leading-none"
                style={{
                  top: '95%',
                  left: '85%',
                  opacity: text3Opacity2,
                  y: text3Y2,
                }}
              >
                your followers.
              </motion.span>
            </div>
          </motion.div>

          {/* THIRD TITLE - Video 3 (black text) */}
          <div
            className="absolute inset-0 flex justify-center items-center"
          >
            <div
              className="relative inline-block"
              style={{ transform: 'translateX(2%)' }}
            >
              {/* Part 2 - Center anchor (the reference) */}
              <motion.span
                className="block font-sans text-[1em] font-black text-black tracking-tight whitespace-nowrap leading-none"
                style={{
                  opacity: text2Opacity3,
                  y: text2Y3,
                }}
              >
                to clarify
              </motion.span>

              {/* Part 1 - Positioned so it ENDS at 35% of Part 2's width */}
              <motion.span
                className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
                style={{
                  bottom: '95%',
                  right: '40%',
                  opacity: text1Opacity3,
                  y: text1Y3,
                }}
              >
                Minimalistic and symbolic
              </motion.span>

              {/* Part 3 - Positioned so it STARTS at 85% of Part 2's width */}
              <motion.span
                className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
                style={{
                  top: '95%',
                  left: '65%',
                  opacity: text3Opacity3,
                  y: text3Y3,
                }}
              >
                complex topics
              </motion.span>
            </div>
          </div>
        </div>

        {/* Phone Container - takes remaining ~82% of screen, phone is 85% of that and centered */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ height: '80vh' }}
        >
          <motion.div
            className="relative"
            style={{
              aspectRatio: '434 / 883',
              height: '85%',
              maxWidth: '100%',
              rotate,
              scale,
            }}
          >
            {/* Text above phone - Video 1 */}
            <motion.p
              className="absolute left-1/2 font-serif italic font-normal text-black text-center whitespace-nowrap z-10 overflow-hidden"
              style={{
                fontSize: '1.1rem',
                top: screen.height < 700
                  ? '-8%'
                  : (screen.isPortrait ? '-5%' : '-6.5%'),
                width: '100%',
                transform: 'translateX(-50%)',
                opacity: firstTitleOpacity,
              }}
            >
              <motion.span
                className="inline-block"
                style={{
                  clipPath: useTransform(
                    textScrollProgress,
                    [0.3, 0.7],
                    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
                  )
                }}
              >
                Define your unique style
              </motion.span>
            </motion.p>

            {/* Text above phone - Video 2 */}
            <motion.p
              className="absolute left-1/2 font-serif italic font-normal text-white text-center whitespace-nowrap z-10 overflow-hidden"
              style={{
                fontSize: '1.1rem',
                top: screen.height < 700
                  ? '-8%'
                  : (screen.isPortrait ? '-5%' : '-6.5%'),
                width: '100%',
                transform: 'translateX(-50%)',
                opacity: secondTitleOpacity,
              }}
            >
              <motion.span
                className="inline-block"
                style={{
                  clipPath: useTransform(
                    scrollYProgress,
                    [0.25, 0.4],
                    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
                  )
                }}
              >
                Elevate your storytelling
              </motion.span>
            </motion.p>

            {/* Text above phone - Video 3 */}
            <motion.p
              className="absolute left-1/2 font-serif italic font-normal text-black text-center whitespace-nowrap z-10 overflow-hidden"
              style={{
                fontSize: '1.1rem',
                top: screen.height < 700
                  ? '-8%'
                  : (screen.isPortrait ? '-5%' : '-6.5%'),
                width: '100%',
                transform: 'translateX(-50%)',
                opacity: thirdTitleOpacity,
              }}
            >
              <motion.span
                className="inline-block"
                style={{
                  clipPath: useTransform(
                    scrollYProgress,
                    [0.78, 0.88],
                    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
                  )
                }}
              >
                Make ideas easy to grasp
              </motion.span>
            </motion.p>
            {/* Single Video - source changes based on scroll */}
            <div 
              className="absolute overflow-hidden"
              style={{
                top: '1.5%',
                left: '4.5%',
                right: '4.5%',
                bottom: '1.5%',
                borderRadius: '10% / 5%',
              }}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                preload={currentVideoSrc === VIDEO_1 ? "auto" : "metadata"}
                key={currentVideoSrc}
              >
                <source src={currentVideoSrc} type="video/mp4" />
              </video>
            </div>

            {/* Player Controls - Inside the screen at bottom */}
            <div 
              className="absolute flex items-center gap-2 px-3 py-2 rounded-lg z-10"
              style={{
                bottom: '3%',
                left: '6%',
                right: '6%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Play/Pause Button */}
              <button 
                onClick={togglePlay}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                {isPlaying ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Timeline */}
              <div 
                className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer overflow-hidden"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Mute/Unmute Button */}
              <button 
                onClick={toggleMute}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
              >
                {isMuted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          
            {/* iPhone Frame (on top) */}
            <img 
              src="/iphone-14-pro.svg" 
              alt="iPhone mockup"
              className="relative h-full w-full pointer-events-none"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

