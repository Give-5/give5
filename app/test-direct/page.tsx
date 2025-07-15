'use client'

import { useEffect, useState } from 'react'

export default function TestDirectPage() {
  const [status, setStatus] = useState('Testing...')
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const testSupabase = async () => {
      const logs: any[] = []
      
      try {
        // Test 1: Can we create the client?
        logs.push({ test: 'Create client', status: 'starting' })
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        logs.push({ test: 'Create client', status: 'success' })
        
        // Test 2: Can we call getSession with timeout?
        logs.push({ test: 'Get session', status: 'starting' })
        const sessionPromise = supabase.auth.getSession()
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout after 3s')), 3000)
        )
        
        try {
          const result = await Promise.race([sessionPromise, timeoutPromise])
          logs.push({ test: 'Get session', status: 'success', data: result })
        } catch (e: any) {
          logs.push({ test: 'Get session', status: 'timeout', error: e.message })
        }
        
        // Test 3: Can we make a simple query?
        logs.push({ test: 'Database query', status: 'starting' })
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('count')
            .limit(1)
            .single()
          
          if (error) {
            logs.push({ test: 'Database query', status: 'error', error: error.message })
          } else {
            logs.push({ test: 'Database query', status: 'success', data })
          }
        } catch (e: any) {
          logs.push({ test: 'Database query', status: 'exception', error: e.message })
        }
        
        setStatus('Tests complete')
      } catch (e: any) {
        logs.push({ test: 'Overall', status: 'error', error: e.message })
        setStatus('Tests failed')
      }
      
      setResults(logs)
    }
    
    testSupabase()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Direct Supabase Test</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="font-semibold">Status: {status}</p>
      </div>
      
      <div className="space-y-2">
        {results.map((result, i) => (
          <div key={i} className={`p-3 rounded ${
            result.status === 'success' ? 'bg-green-100' :
            result.status === 'error' || result.status === 'timeout' ? 'bg-red-100' :
            result.status === 'starting' ? 'bg-yellow-100' :
            'bg-gray-100'
          }`}>
            <p className="font-semibold">{result.test}: {result.status}</p>
            {result.error && <p className="text-sm text-red-600">Error: {result.error}</p>}
            {result.data && <pre className="text-xs mt-1">{JSON.stringify(result.data, null, 2)}</pre>}
          </div>
        ))}
      </div>
    </div>
  )
}