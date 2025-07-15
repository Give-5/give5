'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function TestHangingPage() {
  const [logs, setLogs] = useState<string[]>([])
  
  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString()
    console.log(`[${timestamp}] ${msg}`)
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`])
  }

  useEffect(() => {
    const debug = async () => {
      addLog('Starting debug session...')
      
      // Create client with debug logging
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            debug: true,
            persistSession: true,
            autoRefreshToken: false, // Disable auto refresh for testing
            detectSessionInUrl: false // Disable URL detection for testing
          }
        }
      )
      
      addLog('Client created with debug mode enabled')
      
      // Test 1: Direct storage access
      try {
        addLog('Test 1: Checking localStorage...')
        const storageKey = `sb-${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname.split('.')[0]}-auth-token`
        const storageValue = localStorage.getItem(storageKey)
        if (storageValue) {
          const parsed = JSON.parse(storageValue)
          addLog(`Found session in storage: ${parsed.user?.email || 'No email'}`)
          addLog(`Session expires: ${new Date(parsed.expires_at * 1000).toLocaleString()}`)
        } else {
          addLog('No session found in localStorage')
        }
      } catch (e: any) {
        addLog(`Storage error: ${e.message}`)
      }
      
      // Test 2: Try getSession with internal details
      try {
        addLog('Test 2: Calling getSession()...')
        
        // Set up promise tracking
        let resolved = false
        const timeoutId = setTimeout(() => {
          if (!resolved) {
            addLog('⚠️ getSession() timeout after 5s - still pending')
          }
        }, 5000)
        
        // Track internal state
        const originalFetch = window.fetch
        let fetchCount = 0
        window.fetch = function(...args) {
          fetchCount++
          const url = args[0]
          addLog(`Fetch #${fetchCount}: ${url}`)
          return originalFetch.apply(this, args)
        }
        
        const sessionPromise = supabase.auth.getSession()
        addLog('getSession() promise created')
        
        const result = await sessionPromise
        resolved = true
        clearTimeout(timeoutId)
        
        // Restore original fetch
        window.fetch = originalFetch
        
        if (result.error) {
          addLog(`❌ getSession error: ${result.error.message}`)
        } else {
          addLog(`✅ getSession success: ${result.data.session?.user?.email || 'No session'}`)
        }
      } catch (e: any) {
        addLog(`❌ getSession exception: ${e.message}`)
      }
      
      // Test 3: Check network connectivity
      try {
        addLog('Test 3: Direct API health check...')
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`)
        addLog(`Health check status: ${response.status}`)
      } catch (e: any) {
        addLog(`Health check failed: ${e.message}`)
      }
      
      addLog('Debug session complete')
    }
    
    debug()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Debugging getSession() Hang</h1>
      
      <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm">
        <div className="space-y-1">
          {logs.length === 0 ? (
            <div>Starting...</div>
          ) : (
            logs.map((log, i) => (
              <div 
                key={i} 
                className={
                  log.includes('✅') ? 'text-green-400' :
                  log.includes('❌') ? 'text-red-400' :
                  log.includes('⚠️') ? 'text-yellow-400' :
                  log.includes('Fetch') ? 'text-blue-400' :
                  'text-gray-300'
                }
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-blue-100 rounded">
        <p className="text-sm">This test intercepts fetch calls to see what requests getSession() makes.</p>
      </div>
    </div>
  )
}