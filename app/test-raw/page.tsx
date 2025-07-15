'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function TestRawPage() {
  const [logs, setLogs] = useState<string[]>([])
  
  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString()
    console.log(`[${timestamp}] ${msg}`)
    setLogs(prev => [...prev, `[${timestamp}] ${msg}`])
  }

  useEffect(() => {
    const test = async () => {
      addLog('Testing raw Supabase client (no SSR)...')
      
      try {
        // Create raw client without SSR
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        addLog('Raw client created')
        
        // Test 1: getSession on raw client
        try {
          addLog('Test 1: Raw client getSession()...')
          const timeout = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 3000)
          )
          
          const start = Date.now()
          const result = await Promise.race([
            supabase.auth.getSession(),
            timeout
          ])
          
          addLog(`✅ Raw getSession completed in ${Date.now() - start}ms`)
          addLog(`Session: ${(result as any).data?.session ? 'Found' : 'None'}`)
        } catch (e: any) {
          addLog(`❌ Raw getSession failed: ${e.message}`)
        }
        
        // Test 2: getUser on raw client
        try {
          addLog('Test 2: Raw client getUser()...')
          const start = Date.now()
          const { data, error } = await supabase.auth.getUser()
          
          if (error) {
            addLog(`❌ Raw getUser error: ${error.message}`)
          } else {
            addLog(`✅ Raw getUser completed in ${Date.now() - start}ms`)
            addLog(`User: ${data.user?.email || 'None'}`)
          }
        } catch (e: any) {
          addLog(`❌ Raw getUser exception: ${e.message}`)
        }
        
        // Test 3: Check auth state
        addLog('Test 3: Setting up raw auth listener...')
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          addLog(`Raw auth state: ${event} - ${session?.user?.email || 'No user'}`)
        })
        
        // Cleanup
        setTimeout(() => {
          subscription.unsubscribe()
          addLog('Cleaned up auth listener')
        }, 5000)
        
      } catch (e: any) {
        addLog(`❌ Test failed: ${e.message}`)
      }
    }
    
    test()
  }, [])

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Raw Supabase Client Test (No SSR)</h1>
      
      <div className="p-4 bg-gray-900 text-gray-100 rounded font-mono text-sm">
        <div className="space-y-1">
          {logs.length === 0 ? (
            <div>Starting tests...</div>
          ) : (
            logs.map((log, i) => (
              <div 
                key={i} 
                className={
                  log.includes('✅') ? 'text-green-400' :
                  log.includes('❌') ? 'text-red-400' :
                  log.includes('Test') ? 'text-blue-400' :
                  'text-gray-300'
                }
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <p className="text-sm font-semibold">This test uses @supabase/supabase-js directly without the SSR wrapper.</p>
        <p className="text-sm">If this works but SSR doesn't, we have a package conflict issue.</p>
      </div>
    </div>
  )
}