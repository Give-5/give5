'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function TestConfigsPage() {
  const [results, setResults] = useState<any[]>([])
  
  const addResult = (test: string, result: any) => {
    setResults(prev => [...prev, { test, ...result, timestamp: new Date().toLocaleTimeString() }])
  }

  useEffect(() => {
    const runTests = async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      
      // Test 1: Default configuration (what we use now)
      try {
        addResult('Default Config', { status: 'testing' })
        const client1 = createBrowserClient(url, key)
        const start = Date.now()
        
        const promise = client1.auth.getSession()
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        )
        
        const result = await Promise.race([promise, timeout])
        addResult('Default Config', { 
          status: 'success', 
          duration: Date.now() - start,
          session: (result as any).data?.session ? 'Found' : 'None'
        })
      } catch (e: any) {
        addResult('Default Config', { status: 'failed', error: e.message })
      }
      
      // Test 2: Minimal configuration
      try {
        addResult('Minimal Config', { status: 'testing' })
        const client2 = createBrowserClient(url, key, {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
          }
        })
        const start = Date.now()
        
        const promise = client2.auth.getSession()
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        )
        
        const result = await Promise.race([promise, timeout])
        addResult('Minimal Config', { 
          status: 'success', 
          duration: Date.now() - start,
          session: (result as any).data?.session ? 'Found' : 'None'
        })
      } catch (e: any) {
        addResult('Minimal Config', { status: 'failed', error: e.message })
      }
      
      // Test 3: Cookie-based configuration
      try {
        addResult('Cookie Config', { status: 'testing' })
        const client3 = createBrowserClient(url, key, {
          cookies: {
            get(name: string) {
              const value = document.cookie
                .split('; ')
                .find(row => row.startsWith(name + '='))
                ?.split('=')[1]
              return value
            },
            set() {},
            remove() {}
          }
        })
        const start = Date.now()
        
        const promise = client3.auth.getSession()
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        )
        
        const result = await Promise.race([promise, timeout])
        addResult('Cookie Config', { 
          status: 'success', 
          duration: Date.now() - start,
          session: (result as any).data?.session ? 'Found' : 'None'
        })
      } catch (e: any) {
        addResult('Cookie Config', { status: 'failed', error: e.message })
      }
      
      // Test 4: Direct getUser instead
      try {
        addResult('Direct getUser', { status: 'testing' })
        const client4 = createBrowserClient(url, key)
        const start = Date.now()
        
        const result = await client4.auth.getUser()
        addResult('Direct getUser', { 
          status: 'success', 
          duration: Date.now() - start,
          user: result.data?.user?.email || 'None'
        })
      } catch (e: any) {
        addResult('Direct getUser', { status: 'failed', error: e.message })
      }
    }
    
    runTests()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Testing Different Supabase Configurations</h1>
      
      <div className="space-y-3">
        {results.map((result, i) => (
          <div 
            key={i} 
            className={`p-4 rounded ${
              result.status === 'testing' ? 'bg-yellow-100' :
              result.status === 'success' ? 'bg-green-100' :
              'bg-red-100'
            }`}
          >
            <div className="font-semibold">{result.test}</div>
            <div className="text-sm text-gray-600">
              {result.timestamp} - Status: {result.status}
              {result.duration && ` (${result.duration}ms)`}
            </div>
            {result.session && <div className="text-sm">Session: {result.session}</div>}
            {result.user && <div className="text-sm">User: {result.user}</div>}
            {result.error && <div className="text-sm text-red-600">Error: {result.error}</div>}
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <p className="text-sm">Testing different client configurations to identify which settings cause getSession() to hang.</p>
      </div>
    </div>
  )
}