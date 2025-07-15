'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function TestMinimalPage() {
  const [log, setLog] = useState<string[]>(['Starting test...'])

  useEffect(() => {
    const addLog = (msg: string) => {
      console.log(msg)
      setLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
    }

    const test = async () => {
      try {
        addLog('Creating Supabase client...')
        
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        
        addLog(`URL: ${url ? 'Set' : 'Missing'}`)
        addLog(`Key: ${key ? 'Set' : 'Missing'}`)
        
        if (!url || !key) {
          addLog('ERROR: Missing environment variables')
          return
        }
        
        const supabase = createBrowserClient(url, key)
        addLog('Client created successfully')
        
        // Test 1: Simple getSession with timeout
        addLog('Testing getSession with 3s timeout...')
        const timeout = setTimeout(() => {
          addLog('TIMEOUT: getSession did not complete in 3s')
        }, 3000)
        
        try {
          const { data, error } = await supabase.auth.getSession()
          clearTimeout(timeout)
          
          if (error) {
            addLog(`ERROR: ${error.message}`)
          } else {
            addLog(`SUCCESS: Session = ${data.session ? 'exists' : 'null'}`)
          }
        } catch (e: any) {
          clearTimeout(timeout)
          addLog(`EXCEPTION: ${e.message}`)
        }
        
        // Test 2: Simple database query
        addLog('Testing database query...')
        try {
          const { error } = await supabase.from('profiles').select('count').limit(1)
          if (error) {
            addLog(`DB ERROR: ${error.message}`)
          } else {
            addLog('DB SUCCESS: Query completed')
          }
        } catch (e: any) {
          addLog(`DB EXCEPTION: ${e.message}`)
        }
        
      } catch (e: any) {
        addLog(`FATAL ERROR: ${e.message}`)
      }
    }
    
    test()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal Supabase Test</h1>
      <div className="bg-gray-100 p-4 rounded">
        <pre className="text-sm whitespace-pre-wrap">{log.join('\n')}</pre>
      </div>
    </div>
  )
}