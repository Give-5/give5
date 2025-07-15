'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestSessionPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [testResults, setTestResults] = useState<any>({})

  const addLog = (msg: string) => {
    console.log(msg)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
  }

  useEffect(() => {
    const runTests = async () => {
      const supabase = createClient()
      const results: any = {}

      // Test 1: Try getSession with different approaches
      addLog('Starting session tests...')

      // Approach 1: Direct getSession
      try {
        addLog('Test 1: Direct getSession()...')
        const timeout = setTimeout(() => {
          addLog('WARNING: getSession() still running after 3s')
        }, 3000)
        
        const start = Date.now()
        const { data, error } = await supabase.auth.getSession()
        const duration = Date.now() - start
        clearTimeout(timeout)
        
        results.directGetSession = {
          success: !error,
          duration: `${duration}ms`,
          session: data?.session ? 'Found' : 'None',
          error: error?.message
        }
        addLog(`✅ getSession completed in ${duration}ms`)
      } catch (e: any) {
        results.directGetSession = { error: e.message }
        addLog(`❌ getSession failed: ${e.message}`)
      }

      // Test 2: Try getUser instead
      try {
        addLog('Test 2: Trying getUser()...')
        const start = Date.now()
        const { data, error } = await supabase.auth.getUser()
        const duration = Date.now() - start
        
        results.getUser = {
          success: !error,
          duration: `${duration}ms`,
          user: data?.user?.email || 'None',
          error: error?.message
        }
        addLog(`✅ getUser completed in ${duration}ms`)
      } catch (e: any) {
        results.getUser = { error: e.message }
        addLog(`❌ getUser failed: ${e.message}`)
      }

      // Test 3: Check auth state
      addLog('Test 3: Setting up auth state listener...')
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        addLog(`Auth state: ${event} - ${session?.user?.email || 'No user'}`)
        results.authStateListener = {
          event,
          user: session?.user?.email || 'None'
        }
      })

      // Test 4: Check localStorage
      addLog('Test 4: Checking localStorage...')
      const storageKeys = Object.keys(localStorage).filter(key => 
        key.includes('supabase') || key.includes('auth')
      )
      results.localStorage = {
        keys: storageKeys,
        count: storageKeys.length
      }
      addLog(`Found ${storageKeys.length} auth-related keys in localStorage`)

      setTestResults(results)
      
      // Cleanup
      setTimeout(() => {
        subscription.unsubscribe()
      }, 5000)
    }

    runTests()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Session Debug Test</h1>
      
      <div className="mb-6 p-4 bg-yellow-100 rounded">
        <p className="font-semibold mb-2">Test Results:</p>
        <pre className="text-sm">{JSON.stringify(testResults, null, 2)}</pre>
      </div>
      
      <div className="p-4 bg-gray-100 rounded">
        <p className="font-semibold mb-2">Logs:</p>
        <div className="text-sm font-mono space-y-1">
          {logs.map((log, i) => (
            <div key={i} className={
              log.includes('✅') ? 'text-green-600' :
              log.includes('❌') ? 'text-red-600' :
              log.includes('WARNING') ? 'text-orange-600' :
              'text-gray-700'
            }>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}