'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TestManualAuth() {
  const [logs, setLogs] = useState<string[]>([])
  const [email, setEmail] = useState('test@example.com')
  const [password, setPassword] = useState('password123')
  
  const addLog = (msg: string) => {
    console.log(msg)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
  }
  
  const testSignIn = async () => {
    const supabase = createClient()
    addLog('Starting sign in...')
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        addLog(`Sign in error: ${error.message}`)
        return
      }
      
      addLog(`Sign in success: ${data.user?.email}`)
      addLog(`Session expires: ${data.session?.expires_at}`)
      
      // Check what's in storage
      setTimeout(() => {
        addLog('Checking storage after sign in...')
        const storageKey = `sb-${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname.split('.')[0]}-auth-token`
        const stored = localStorage.getItem(storageKey)
        addLog(`Storage key: ${storageKey}`)
        addLog(`Has stored session: ${!!stored}`)
        
        // Check cookies
        addLog(`Cookies: ${document.cookie || 'None'}`)
        
        // Try to get session
        supabase.auth.getSession().then(({ data: sessionData }) => {
          addLog(`getSession result: ${sessionData.session ? 'Session found' : 'No session'}`)
        }).catch(err => {
          addLog(`getSession error: ${err.message}`)
        })
        
        // Try getUser
        supabase.auth.getUser().then(({ data: userData }) => {
          addLog(`getUser result: ${userData.user?.email || 'No user'}`)
        }).catch(err => {
          addLog(`getUser error: ${err.message}`)
        })
      }, 1000)
      
    } catch (err: any) {
      addLog(`Exception: ${err.message}`)
    }
  }
  
  const testSignUp = async () => {
    const supabase = createClient()
    const testEmail = `test${Date.now()}@example.com`
    addLog(`Creating account: ${testEmail}`)
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          data: { full_name: 'Test User' }
        }
      })
      
      if (error) {
        addLog(`Sign up error: ${error.message}`)
        return
      }
      
      addLog(`Sign up success: ${data.user?.email}`)
      addLog(`Confirmation required: ${data.user?.confirmed_at ? 'No' : 'Yes'}`)
    } catch (err: any) {
      addLog(`Exception: ${err.message}`)
    }
  }
  
  const checkCurrentAuth = async () => {
    const supabase = createClient()
    addLog('Checking current auth state...')
    
    // Check auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      addLog(`Auth state: ${event} - ${session?.user?.email || 'No user'}`)
    })
    
    // Cleanup after 5 seconds
    setTimeout(() => {
      subscription.unsubscribe()
    }, 5000)
  }
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manual Auth Test</h1>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={testSignIn}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test Sign In
          </button>
          <button
            onClick={testSignUp}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Test Sign Up
          </button>
          <button
            onClick={checkCurrentAuth}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Check Auth State
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-gray-900 text-gray-100 rounded">
        <h3 className="font-semibold mb-2">Logs:</h3>
        <div className="font-mono text-sm space-y-1">
          {logs.length === 0 ? (
            <div className="text-gray-500">No logs yet...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className={
                log.includes('error') || log.includes('Error') ? 'text-red-400' :
                log.includes('success') ? 'text-green-400' :
                'text-gray-300'
              }>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}