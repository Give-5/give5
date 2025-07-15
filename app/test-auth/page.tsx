'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/contexts/auth-context'

export default function TestAuthPage() {
  const [status, setStatus] = useState('Checking auth provider...')
  const [error, setError] = useState<string | null>(null)
  
  let authState = null
  let authError = null
  
  try {
    const auth = useAuth()
    authState = {
      loading: auth.loading,
      user: auth.user?.email || 'No user',
      hasProfile: !!auth.profile
    }
  } catch (e: any) {
    authError = e.message
  }
  
  useEffect(() => {
    if (authError) {
      setError(`Auth hook error: ${authError}`)
      setStatus('Auth hook failed')
    } else {
      setStatus('Auth hook working')
    }
  }, [authError])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Auth Page</h1>
      
      <div className="space-y-4">
        <div className={`p-4 rounded ${error ? 'bg-red-100' : 'bg-green-100'}`}>
          <p className="font-semibold">Status: {status}</p>
        </div>
        
        {authState && (
          <div className="p-4 bg-blue-100 rounded">
            <h2 className="font-semibold mb-2">Auth State:</h2>
            <pre>{JSON.stringify(authState, null, 2)}</pre>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-100 rounded">
            <h2 className="font-semibold mb-2">Error:</h2>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}