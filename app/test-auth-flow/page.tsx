'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/contexts/auth-context'

export default function TestAuthFlowPage() {
  const { user, loading, signIn, signUp, signOut } = useAuth()
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('testpassword123')
  const [fullName, setFullName] = useState('Test User')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignUp = async () => {
    try {
      setError('')
      setSuccess('')
      await signUp(email, password, fullName)
      setSuccess('Sign up successful! Check your email for verification.')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSignIn = async () => {
    try {
      setError('')
      setSuccess('')
      await signIn(email, password)
      setSuccess('Sign in successful!')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSignOut = async () => {
    try {
      setError('')
      setSuccess('')
      await signOut()
      setSuccess('Signed out successfully!')
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading auth state...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Authentication Flow</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Auth State</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Status:</span>{' '}
              <span className={user ? 'text-green-600' : 'text-gray-500'}>
                {user ? 'Authenticated' : 'Not authenticated'}
              </span>
            </p>
            {user && (
              <>
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
              </>
            )}
          </div>
        </div>

        {!user ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Sign In / Sign Up</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Full Name (for signup)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Sign Out</h2>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Test Instructions:</h3>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Try signing up with a new email</li>
            <li>Try signing in with existing credentials</li>
            <li>Test sign out functionality</li>
            <li>Check that auth state persists on page refresh</li>
          </ol>
        </div>
      </div>
    </div>
  )
}