'use client'

import { useEffect, useState } from 'react'

export default function TestSimplePage() {
  const [mounted, setMounted] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log('[TestSimple] Component mounted')
    setMounted(true)
    
    // Test if JS is running
    const interval = setInterval(() => {
      setCounter(c => c + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Test Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <p>Mounted: {mounted ? 'YES ✅' : 'NO ❌'}</p>
        </div>
        
        <div className="p-4 bg-blue-100 rounded">
          <p>Counter: {counter}</p>
          <p className="text-sm text-gray-600">Should increment every second if JS is working</p>
        </div>
        
        <button 
          onClick={() => alert('Button clicked!')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Button
        </button>
      </div>
    </div>
  )
}