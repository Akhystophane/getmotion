import { motion } from 'motion/react'
import { WaitlistModal } from './WaitlistModal'

export function CTASection() {
  return (
    <section className="relative bg-white pt-8 sm:pt-12 md:pt-16 pb-20 sm:pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-8 sm:gap-10">
          {/* Heading */}
          <motion.h2
            className="text-center font-serif text-black text-3xl sm:text-4xl md:text-5xl tracking-wide max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
          >
            Ready to transform your content?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-center font-serif italic text-black/70 text-base sm:text-lg md:text-xl max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          >
            See what the AI agent can create for you.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
          >
            <WaitlistModal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
