'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/contexts/auth-context'
import HandsIcon from '@/components/ui/HandsIcon'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      // Auth context will handle navigation
    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
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
          <h1 className="text-2xl font-bold text-give5-blue mb-8">Volunteer Sign In</h1>
          <div className="flex justify-center">
            <HandsIcon className="w-24 h-24" />
          </div>
        </div>

        {/* Login Form */}
        <form className="w-full max-w-sm space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-base font-medium text-give5-blue mb-2">
              username
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
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-give5-blue bg-white border-gray-300 rounded focus:ring-give5-blue"
            />
            <label htmlFor="rememberMe" className="ml-2 text-base text-gray-700">
              remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-give5-blue text-white text-center py-3.5 px-8 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <Link href="/forgot-password" className="mt-8 text-give5-blue text-base underline">
          forgot password?
        </Link>
      </main>
    </div>
  )
}