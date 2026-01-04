import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MotionButton } from './MotionButton'
import { WaitlistForm } from './WaitlistForm'

interface WaitlistModalProps {
  buttonText?: string
  className?: string
}

export function WaitlistModal({ buttonText = 'Join the waitlist', className = '' }: WaitlistModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <>
      <MotionButton text={buttonText} onClick={() => setIsOpen(true)} className={className} />

      {isOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-lg" />

          {/* Modal */}
          <div
            className="relative w-full max-w-[900px] bg-white rounded-2xl shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 2L14 14M2 14L14 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Content */}
            <div className="p-16">
              <div className="mb-12">
                <h2 id="waitlist-title" className="font-serif text-5xl text-black mb-4">
                  Join the waitlist
                </h2>
                <p className="text-xl text-black/60">
                  Tell us who you are and we'll reach out with early access.
                </p>
              </div>

              <WaitlistForm onSuccess={() => setIsOpen(false)} />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
