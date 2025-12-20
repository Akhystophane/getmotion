import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

interface StepProps {
  stepNumber: number
  part1: string
  part2: string
  part3: string
  description: string
  index: number
}

interface StepInternalProps extends StepProps {
  sectionScrollProgress: any // MotionValue from parent
}

function Step({ stepNumber, part1, part2, part3, description, index, sectionScrollProgress }: StepInternalProps) {
  const stepRef = useRef<HTMLDivElement>(null)

  // Track scroll progress for this specific step
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "center center"]
  })

  // Animations based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1])

  // Title animations - staggered appearance
  const part1Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const part1Y = useTransform(scrollYProgress, [0.3, 0.5], [20, 0])
  const part1X = useTransform(scrollYProgress, [0.3, 0.5], [-30, 0])

  const part2Opacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const part2Y = useTransform(scrollYProgress, [0.4, 0.6], [30, 0])

  const part3Opacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
  const part3Y = useTransform(scrollYProgress, [0.5, 0.7], [-20, 0])

  const descriptionOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])

  // Calculate when the line reaches this step number
  // Line progresses from 0 to 1, each step at 0, 0.33, 0.66, 1
  const stepThreshold = index / 3 // 0, 0.33, 0.66, 1

  // Background color changes from white to grey when line reaches the number
  const backgroundColor = useTransform(
    sectionScrollProgress,
    [stepThreshold - 0.05, stepThreshold + 0.1],
    ['#ffffff', '#e5e5e5']
  )

  const numberColor = useTransform(
    sectionScrollProgress,
    [stepThreshold - 0.05, stepThreshold + 0.1],
    ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.9)']
  )

  return (
    <motion.div
      ref={stepRef}
      className="relative w-full flex flex-col items-center justify-center z-10"
      style={{ opacity, y, scale }}
    >
      {/* Step Number */}
      <div className="mb-8 sm:mb-10 md:mb-12" id={`step-${index}`}>
        <motion.div
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-black/20 flex items-center justify-center shadow-lg relative z-10"
          style={{ backgroundColor }}
        >
          <motion.span
            className="font-sans text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{ color: numberColor }}
          >
            {stepNumber}
          </motion.span>
        </motion.div>
      </div>

      {/* Title Container */}
      <div
        className="relative inline-block mb-6 sm:mb-8 md:mb-10"
        style={{
          transform: 'translateX(8%)',
          fontSize: 'min(7vw, 8vh, 160px)'
        }}
      >
        {/* Part 2 - Center anchor */}
        <motion.span
          className="block font-sans text-[1em] font-black text-black tracking-tight whitespace-nowrap leading-none"
          style={{ opacity: part2Opacity, y: part2Y }}
        >
          {part2}
        </motion.span>

        {/* Part 1 */}
        <motion.span
          className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
          style={{
            bottom: '95%',
            right: '85%',
            opacity: part1Opacity,
            y: part1Y,
            x: part1X
          }}
        >
          {part1}
        </motion.span>

        {/* Part 3 */}
        <motion.span
          className="absolute font-serif text-[0.58em] italic font-normal text-black tracking-tight whitespace-nowrap leading-none"
          style={{
            top: '95%',
            left: '95%',
            opacity: part3Opacity,
            y: part3Y
          }}
        >
          {part3}
        </motion.span>
      </div>

      {/* Description */}
      <motion.p
        className="max-w-xl text-center font-serif italic text-black/80 leading-relaxed px-4 py-2 text-sm sm:text-base md:text-lg bg-gray-100 rounded-lg"
        style={{ opacity: descriptionOpacity }}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}

export function HowItWorks() {
  const stepsContainerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress for the steps container
  const { scrollYProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start center", "end center"]
  })

  // Animate the line drawing from top to bottom
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative bg-white py-20 sm:py-24 md:py-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          className="text-center font-serif text-black text-2xl sm:text-3xl md:text-4xl tracking-wide mb-16 sm:mb-20 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          How it works
        </motion.h2>

        {/* Steps Container with connecting line */}
        <div ref={stepsContainerRef} className="relative flex flex-col items-center gap-16 sm:gap-20 md:gap-24 lg:gap-28">

          {/* Connecting Line - simple div approach with scroll animation */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              width: '2px',
              top: '32px',
              bottom: '32px',
              zIndex: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.1))',
              scaleY: pathLength,
              transformOrigin: 'top'
            }}
            initial={{ scaleY: 0 }}
          />

          {/* Step 1 */}
          <Step
            index={0}
            stepNumber={1}
            part1="Send an audio,"
            part2="script and optional"
            part3="assets"
            description="Share your creative vision with us through audio recordings, written scripts, or any supporting materials you have."
            sectionScrollProgress={scrollYProgress}
          />

          {/* Step 2 */}
          <Step
            index={1}
            stepNumber={2}
            part1="We build"
            part2="your motion"
            part3="video"
            description="Our team transforms your content into polished, professional motion videos tailored to your brand and style."
            sectionScrollProgress={scrollYProgress}
          />

          {/* Step 3 */}
          <Step
            index={2}
            stepNumber={3}
            part1="Receive it"
            part2="ready to"
            part3="post"
            description="Get your finished video delivered directly to you, optimized and ready to share across all your platforms."
            sectionScrollProgress={scrollYProgress}
          />

          {/* Step 4 */}
          <Step
            index={3}
            stepNumber={4}
            part1="Repeat"
            part2="as often as"
            part3="needed"
            description="Scale your content creation effortlessly. Order as many videos as you need, whenever you need them."
            sectionScrollProgress={scrollYProgress}
          />
        </div>
      </div>
    </section>
  )
}
