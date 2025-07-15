import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/types/supabase'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  console.log('[Supabase Client] Creating client - URL:', url?.substring(0, 30) + '...', 'Key:', key ? 'Set' : 'Not set')
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables')
  }
  
  // Add options to help with debugging
  return createBrowserClient<Database>(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-client-info': 'give5-app'
      }
    }
  })
}