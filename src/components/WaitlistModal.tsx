import { useEffect, useState } from 'react'
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

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-xl rounded-2xl border border-black/15 bg-white/95 p-5 sm:p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="waitlist-title" className="font-serif text-xl sm:text-2xl text-black">
                  Join the waitlist
                </h3>
                <p className="mt-1 text-sm sm:text-base text-black/60">
                  Tell us who you are and we will reach out with early access.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/70 transition hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-5">
              <WaitlistForm onSuccess={() => setIsOpen(false)} className="gap-4" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
