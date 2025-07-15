'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    console.log('[Auth] Initializing auth context')
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[Auth] Auth state changed:', event, session?.user?.email || 'No user')
      
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Fetch profile when user logs in
        try {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          setProfile(profileData)
        } catch (error) {
          console.error('[Auth] Error fetching profile:', error)
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
      
      // Always set loading to false after auth state change
      setLoading(false)
    })
    
    // Initial check - use getUser which seems more reliable than getSession
    const checkUser = async () => {
      console.log('[Auth] Starting checkUser...')
      try {
        console.log('[Auth] Calling getUser...')
        const { data: { user }, error } = await supabase.auth.getUser()
        console.log('[Auth] getUser completed:', { user: user?.email, error })
        
        if (error) {
          console.log('[Auth] No active session')
          setLoading(false)
          return
        }
        
        if (user) {
          console.log('[Auth] Found user:', user.email)
          setUser(user)
          
          // Fetch profile
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single()
            
            setProfile(profileData)
          } catch (error) {
            console.error('[Auth] Error fetching profile:', error)
          }
        }
        
        console.log('[Auth] Setting loading to false')
        setLoading(false)
      } catch (error) {
        console.error('[Auth] Error checking user:', error)
        setLoading(false)
      }
    }
    
    // Run initial check
    console.log('[Auth] About to call checkUser')
    checkUser()
    
    // Safety timeout - ensure loading is set to false after 5 seconds
    const timeoutId = setTimeout(() => {
      console.log('[Auth] Safety timeout triggered')
      setLoading(false)
    }, 5000)
    
    return () => {
      clearTimeout(timeoutId)
      subscription.unsubscribe()
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    router.push('/home')
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) throw error
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    router.push('/welcome')
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    router.push('/')
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signInWithGoogle,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}