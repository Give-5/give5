'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function DebugPage() {
  const [status, setStatus] = useState<string>('Checking...')
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const checkSupabase = async () => {
      try {
        console.log('[Debug] Creating Supabase client...')
        const supabase = createClient()
        
        console.log('[Debug] Checking session...')
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('[Debug] Session error:', sessionError)
          setError(`Session error: ${sessionError.message}`)
          setStatus('Error')
          return
        }
        
        console.log('[Debug] Session:', session)
        setSessionInfo({
          user: session?.user?.email || 'No user',
          userId: session?.user?.id || 'No ID',
          expiresAt: session?.expires_at || 'No expiry'
        })
        
        // Try a simple query
        console.log('[Debug] Testing database connection...')
        const { data, error: queryError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
        
        if (queryError) {
          console.error('[Debug] Query error:', queryError)
          setError(`Query error: ${queryError.message}`)
          setStatus('Database Error')
        } else {
          console.log('[Debug] Query success:', data)
          setStatus('All Good!')
        }
      } catch (e) {
        console.error('[Debug] Unexpected error:', e)
        setError(`Unexpected: ${e}`)
        setStatus('Failed')
      }
    }
    
    checkSupabase()
  }, [])
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Status: {status}</h2>
        </div>
        
        {sessionInfo && (
          <div className="p-4 bg-blue-100 rounded">
            <h2 className="font-semibold mb-2">Session Info:</h2>
            <pre>{JSON.stringify(sessionInfo, null, 2)}</pre>
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-100 rounded">
            <h2 className="font-semibold mb-2">Error:</h2>
            <p>{error}</p>
          </div>
        )}
        
        <div className="p-4 bg-yellow-100 rounded">
          <h2 className="font-semibold mb-2">Environment:</h2>
          <p>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
          <p>Anon Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'}</p>
        </div>
      </div>
    </div>
  )
}