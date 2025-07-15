'use client'

export default function ConsoleTestPage() {
  // This should run immediately when the component renders
  console.log('🚀 [ConsoleTest] Page component rendering')
  console.log('🚀 [ConsoleTest] Environment:', {
    NODE_ENV: process.env.NODE_ENV,
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
  })
  
  if (typeof window !== 'undefined') {
    console.log('🚀 [ConsoleTest] Running in browser')
    window.console.log('🚀 [ConsoleTest] Direct window.console.log')
  } else {
    console.log('🚀 [ConsoleTest] Running on server')
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Console Test Page</h1>
      <p>Check your browser console for messages</p>
      <p>If you see this but no console messages, JavaScript is not running</p>
    </div>
  )
}