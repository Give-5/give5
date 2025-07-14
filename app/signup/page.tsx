'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import HandsIcon from '@/components/ui/HandsIcon'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="min-h-screen bg-give5-light-bg flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm">
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
        <form className="w-full max-w-sm space-y-6" onSubmit={(e) => {
          e.preventDefault()
          // In a real app, you'd create the account here
          router.push('/welcome')
        }}>
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-give5-blue text-white text-center py-3.5 px-8 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Become a volunteer
          </button>
        </form>

        <Link href="/login" className="mt-8 text-give5-blue text-base underline">
          Back to login
        </Link>
      </main>
    </div>
  )
}