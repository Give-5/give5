'use client'

import { useState, useEffect } from 'react'

export default function TestFetchPage() {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const runTests = async () => {
      const logs: any[] = []
      
      // Test 1: Can we fetch from Supabase directly?
      try {
        logs.push({ test: 'Fetch Supabase health', status: 'starting' })
        const response = await fetch('https://nlohrjvpsrcidjqpzwyh.supabase.co/auth/v1/health')
        const data = await response.json()
        logs.push({ 
          test: 'Fetch Supabase health', 
          status: response.ok ? 'success' : 'error',
          statusCode: response.status,
          data 
        })
      } catch (e: any) {
        logs.push({ test: 'Fetch Supabase health', status: 'exception', error: e.message })
      }
      
      // Test 2: Can we fetch with API key?
      try {
        logs.push({ test: 'Fetch with API key', status: 'starting' })
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!key) {
          logs.push({ test: 'Fetch with API key', status: 'error', error: 'No API key in env' })
        } else {
          const response = await fetch('https://nlohrjvpsrcidjqpzwyh.supabase.co/rest/v1/', {
            headers: {
              'apikey': key,
              'Authorization': `Bearer ${key}`
            }
          })
          logs.push({ 
            test: 'Fetch with API key', 
            status: response.ok ? 'success' : 'error',
            statusCode: response.status
          })
        }
      } catch (e: any) {
        logs.push({ test: 'Fetch with API key', status: 'exception', error: e.message })
      }
      
      // Test 3: Simple external fetch
      try {
        logs.push({ test: 'Fetch external API', status: 'starting' })
        const response = await fetch('https://api.github.com/zen')
        const text = await response.text()
        logs.push({ 
          test: 'Fetch external API', 
          status: 'success',
          data: text
        })
      } catch (e: any) {
        logs.push({ test: 'Fetch external API', status: 'exception', error: e.message })
      }
      
      setResults(logs)
    }
    
    runTests()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fetch Test Page</h1>
      
      <div className="space-y-2">
        {results.length === 0 ? (
          <p>Running tests...</p>
        ) : (
          results.map((result, i) => (
            <div key={i} className={`p-3 rounded ${
              result.status === 'success' ? 'bg-green-100' :
              result.status === 'error' || result.status === 'exception' ? 'bg-red-100' :
              'bg-yellow-100'
            }`}>
              <p className="font-semibold">{result.test}: {result.status}</p>
              {result.statusCode && <p className="text-sm">Status Code: {result.statusCode}</p>}
              {result.error && <p className="text-sm text-red-600">Error: {result.error}</p>}
              {result.data && <pre className="text-xs mt-1">{JSON.stringify(result.data, null, 2)}</pre>}
            </div>
          ))
        )}
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm">Check Network tab in browser DevTools to see actual requests</p>
      </div>
    </div>
  )
}