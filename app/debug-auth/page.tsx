'use client'

import { useEffect, useState } from 'react'

export default function DebugAuthPage() {
  const [results, setResults] = useState<any>({})

  useEffect(() => {
    const debug = async () => {
      const logs: any = {}

      // 1. Check environment variables
      logs.env = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
      }

      // 2. Check localStorage for Supabase data
      logs.localStorage = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.includes('supabase')) {
          logs.localStorage[key] = localStorage.getItem(key)?.substring(0, 50) + '...'
        }
      }

      // 3. Test direct fetch to Supabase
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`)
        logs.healthCheck = {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        }
      } catch (e: any) {
        logs.healthCheck = { error: e.message }
      }

      // 4. Import and test Supabase client
      try {
        const { createBrowserClient } = await import('@supabase/ssr')
        const client = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        logs.clientCreated = true

        // 5. Try different auth methods with timeouts
        const testWithTimeout = async (name: string, fn: () => Promise<any>) => {
          const start = Date.now()
          try {
            const timeoutPromise = new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), 3000)
            )
            const result = await Promise.race([fn(), timeoutPromise])
            return {
              method: name,
              success: true,
              duration: Date.now() - start,
              result
            }
          } catch (e: any) {
            return {
              method: name,
              success: false,
              duration: Date.now() - start,
              error: e.message
            }
          }
        }

        // Test each method
        logs.authTests = await Promise.all([
          testWithTimeout('getSession', () => client.auth.getSession()),
          testWithTimeout('getUser', () => client.auth.getUser()),
          testWithTimeout('onAuthStateChange', () => 
            new Promise((resolve) => {
              const { data } = client.auth.onAuthStateChange((event, session) => {
                resolve({ event, session: session?.user?.email })
                data.subscription.unsubscribe()
              })
              // Trigger by getting session
              client.auth.getSession()
            })
          )
        ])

      } catch (e: any) {
        logs.clientError = e.message
      }

      setResults(logs)
    }

    debug()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Results</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Environment Variables:</h2>
          <pre className="text-sm">{JSON.stringify(results.env, null, 2)}</pre>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">LocalStorage (Supabase keys):</h2>
          <pre className="text-sm">{JSON.stringify(results.localStorage, null, 2)}</pre>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Health Check:</h2>
          <pre className="text-sm">{JSON.stringify(results.healthCheck, null, 2)}</pre>
        </div>

        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Auth Method Tests:</h2>
          <pre className="text-sm">{JSON.stringify(results.authTests, null, 2)}</pre>
        </div>

        {results.clientError && (
          <div className="p-4 bg-red-100 rounded">
            <h2 className="font-semibold mb-2">Client Error:</h2>
            <p className="text-red-600">{results.clientError}</p>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-100 rounded">
        <h3 className="font-semibold mb-2">What to check:</h3>
        <ul className="list-disc list-inside text-sm">
          <li>Network tab: Are requests being made to Supabase?</li>
          <li>Console: Any CORS or network errors?</li>
          <li>Auth tests: Which methods timeout vs complete?</li>
          <li>LocalStorage: Is there existing session data?</li>
        </ul>
      </div>
    </div>
  )
}