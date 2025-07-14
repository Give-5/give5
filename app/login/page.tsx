'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import HandsIcon from '@/components/ui/HandsIcon'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

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
          <h1 className="text-2xl font-bold text-give5-blue mb-8">Volunteer Sign In</h1>
          <div className="flex justify-center">
            <HandsIcon className="w-24 h-24" />
          </div>
        </div>

        {/* Login Form */}
        <form className="w-full max-w-sm space-y-6" onSubmit={(e) => {
          e.preventDefault()
          // In a real app, you'd validate credentials here
          router.push('/home')
        }}>
          <div>
            <label htmlFor="username" className="block text-base font-medium text-give5-blue mb-2">
              username
            </label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            className="w-full bg-give5-blue text-white text-center py-3.5 px-8 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>

        <Link href="/forgot-password" className="mt-8 text-give5-blue text-base underline">
          forgot password?
        </Link>
      </main>
    </div>
  )
}