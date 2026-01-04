import { useState } from 'react'

interface WaitlistFormProps {
  className?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const TABLE_NAME = 'waitlist_entries'

export function WaitlistForm({ className = '' }: WaitlistFormProps) {
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  const isSubmitting = status === 'submitting'
  const wrapperClassName = `w-[min(32rem,92vw)] ${className}`.trim()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')

    if (!role) {
      setStatus('error')
      setMessage('Please choose a role to continue.')
      return
    }

    if (!email) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      setStatus('error')
      setMessage('Supabase is not configured yet.')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch(
        `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${TABLE_NAME}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({ role, email })
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Request failed.')
      }

      setStatus('success')
      setMessage('Thanks! You are on the waitlist.')
      setRole('')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={wrapperClassName}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-xl border border-black/15 bg-white/90 p-3 sm:p-4 shadow-[0_12px_30px_rgba(0,0,0,0.12)] backdrop-blur"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="sr-only" htmlFor="waitlist-role">
            Role
          </label>
          <select
            id="waitlist-role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            required
            disabled={isSubmitting}
            className="w-full sm:w-40 rounded-lg border border-black/20 bg-white px-3 py-2 text-sm sm:text-base font-sans text-black focus:outline-none focus:ring-2 focus:ring-black/30"
          >
            <option value="" disabled>
              I am a...
            </option>
            <option value="content_creator">Content creator</option>
            <option value="agency">Agency</option>
          </select>

          <label className="sr-only" htmlFor="waitlist-email">
            Email
          </label>
          <input
            id="waitlist-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={isSubmitting}
            placeholder="you@email.com"
            className="w-full flex-1 rounded-lg border border-black/20 bg-white px-3 py-2 text-sm sm:text-base font-sans text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative group cursor-pointer px-5 py-2 sm:px-6 sm:py-3 font-sans font-medium text-sm sm:text-base tracking-wide text-white rounded-lg transition-all duration-300 ease-out hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            style={{
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
              boxShadow: `
                0 6px 15px rgba(0, 0, 0, 0.5),
                0 3px 8px rgba(0, 0, 0, 0.3),
                inset 0 1px 1px rgba(255, 255, 255, 0.12),
                inset 1px 0 1px rgba(255, 255, 255, 0.06),
                inset 0 -2px 3px rgba(0, 0, 0, 0.5),
                inset -1px 0 2px rgba(0, 0, 0, 0.4),
                inset 0 0 10px rgba(0, 0, 0, 0.2)
              `,
              border: '1px solid rgba(60, 60, 65, 0.8)'
            }}
          >
            {isSubmitting ? 'Sending...' : 'Join the waitlist'}
          </button>
        </div>

        {message ? (
          <p
            className={`text-xs sm:text-sm font-sans ${
              status === 'success' ? 'text-black/70' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        ) : null}
      </form>
    </div>
  )
}
