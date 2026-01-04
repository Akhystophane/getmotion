import { useState } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const TABLE_NAME = 'waitlist_entries'

interface WaitlistFormProps {
  className?: string
  onSuccess?: () => void
}

export function WaitlistForm({ className = '', onSuccess }: WaitlistFormProps) {
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  const isSubmitting = status === 'submitting'

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
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-8">
        {/* Role field */}
        <div>
          <label htmlFor="role" className="block text-base font-medium text-black/70 mb-3">
            I am a...
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            disabled={isSubmitting}
            className="w-full px-6 py-4 rounded-xl border border-black/20 bg-white text-lg focus:outline-none focus:border-black/40 focus:ring-4 focus:ring-black/5 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27%3E%3Cpath fill=%27%23000%27 fill-opacity=%270.5%27 d=%27M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z%27/%3E%3C/svg%3E')] bg-[right_1rem_center] bg-no-repeat pr-12"
          >
            <option value="">Select your role</option>
            <option value="content_creator">Content creator</option>
            <option value="agency">Agency</option>
          </select>
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-base font-medium text-black/70 mb-3">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="you@example.com"
            className="w-full px-6 py-4 rounded-xl border border-black/20 bg-white text-lg placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:ring-4 focus:ring-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Error/Success message */}
        {message && (
          <div
            className={`px-4 py-3 rounded-lg text-sm ${
              status === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-5 font-sans font-semibold text-lg text-white rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: 'linear-gradient(145deg, rgba(50, 50, 55, 1) 0%, rgba(25, 25, 28, 1) 25%, rgba(15, 15, 18, 1) 50%, rgba(20, 20, 23, 1) 75%, rgba(35, 35, 40, 1) 100%)',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(70, 70, 75, 0.9)'
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Join the waitlist'
          )}
        </button>
      </div>
    </form>
  )
}
