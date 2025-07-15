'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/auth-context'
import HandsIcon from '@/components/ui/HandsIcon'

export default function SignupPage() {
  const router = useRouter()
  const { signUp, signInWithGoogle } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await signUp(email, password, fullName || email.split('@')[0])
      // Don't navigate here - the auth context will handle it
      // Just show success
      setError('') // Clear any errors
      // The auth state listener will redirect to /home once profile is ready
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      await signInWithGoogle()
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-give5-light-bg flex flex-col">
      {/* Header */}
      <header className="bg-give5-light-bg px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-give5-blue">GIVE</span>
            <span className="text-3xl font-bold text-give5-red">5</span>
            <span className="text-sm font-medium text-give5-blue ml-2">MILE HIGH</span>
          </div>
          <div className="text-2xl text-give5-blue font-medium">Volunteer</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Title and Icon */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-give5-blue mb-8">Volunteer Sign Up</h1>
          <div className="flex justify-center">
            <HandsIcon className="w-24 h-24" />
          </div>
        </div>

        {/* Signup Form */}
        <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          

          <div>
            <label htmlFor="email" className="block text-base font-medium text-give5-blue mb-2">
              email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="volunteerprofile@email.com"
              className="w-full px-4 py-3 rounded-lg bg-give5-light-blue border border-transparent focus:outline-none focus:ring-2 focus:ring-give5-blue text-gray-600 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium text-give5-blue mb-2">
              password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-give5-light-blue border border-transparent focus:outline-none focus:ring-2 focus:ring-give5-blue"
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-base font-medium text-give5-blue mb-2">
              confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-give5-light-blue border border-transparent focus:outline-none focus:ring-2 focus:ring-give5-blue"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-give5-blue text-white text-center py-3.5 px-8 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Become a volunteer'}
          </button>
        </form>

        <Link href="/login" className="mt-8 text-give5-blue text-base underline">
          Back to login
        </Link>
      </main>
    </div>
  )
}