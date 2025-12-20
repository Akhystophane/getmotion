import { motion, AnimatePresence } from 'motion/react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface LoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
        >
          {/* DotLottie Animation */}
          <DotLottieReact
            src="/loading.lottie"
            loop
            autoplay
            style={{ height: '350px', width: '350px' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
