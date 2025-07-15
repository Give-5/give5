'use client'

import { useState, useEffect } from 'react'

export default function TestReactPage() {
  const [mounted, setMounted] = useState(false)
  const [counter, setCounter] = useState(0)
  const [envVars, setEnvVars] = useState<any>(null)

  useEffect(() => {
    console.log('TestReact: useEffect running')
    setMounted(true)
    
    // Check environment variables
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
      nodeEnv: process.env.NODE_ENV || 'NOT SET'
    })
    
    // Start counter
    const interval = setInterval(() => {
      setCounter(c => {
        console.log('Counter:', c + 1)
        return c + 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    alert('Button clicked! React is working.')
    console.log('Button clicked')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">React Test Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <p>Mounted: {mounted ? '✅ YES' : '❌ NO'}</p>
          <p>Counter: {counter}</p>
          <p className="text-sm text-gray-600">Should increment every second</p>
        </div>
        
        <div className="p-4 bg-blue-100 rounded">
          <p className="font-semibold mb-2">Environment Variables:</p>
          {envVars ? (
            <div className="text-sm">
              <p>NEXT_PUBLIC_SUPABASE_URL: {envVars.url.substring(0, 30)}...</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envVars.key}</p>
              <p>NODE_ENV: {envVars.nodeEnv}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        
        <button 
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Button
        </button>
        
        <div className="p-4 bg-yellow-100 rounded text-sm">
          <p className="font-semibold">Check browser console for:</p>
          <ul className="list-disc list-inside">
            <li>useEffect running message</li>
            <li>Counter increments</li>
            <li>Button click logs</li>
          </ul>
        </div>
      </div>
    </div>
  )
}