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
    // Check for existing session on mount with timeout protection
    const initializeAuth = async () => {
      try {
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Session check timeout')), 2000)
        })
        
        // Race between getSession and timeout
        const sessionPromise = supabase.auth.getSession()
        
        try {
          const { data: { session }, error } = await Promise.race([
            sessionPromise,
            timeoutPromise
          ]) as any
          
          if (!error && session) {
            console.log('[Auth] Found existing session:', session.user.email)
            setUser(session.user)
            
            // Fetch profile
            try {
              const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()
              
              setProfile(profileData)
            } catch (profileError) {
              console.error('[Auth] Error fetching profile:', profileError)
            }
          }
        } catch (timeoutError) {
          console.log('[Auth] Session check timed out, checking localStorage')
          // Fallback: check localStorage directly
          const storageKey = `sb-${new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname.split('.')[0]}-auth-token`
          const stored = localStorage.getItem(storageKey)
          if (stored) {
            try {
              const { currentSession } = JSON.parse(stored)
              if (currentSession?.user) {
                console.log('[Auth] Found session in localStorage:', currentSession.user.email)
                setUser(currentSession.user)
              }
            } catch (e) {
              console.error('[Auth] Error parsing stored session:', e)
            }
          }
        }
      } catch (error) {
        console.error('[Auth] Error in auth initialization:', error)
      } finally {
        setLoading(false)
      }
    }
    
    // Run initialization
    initializeAuth()
    
    // Set up auth state listener for future changes
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
          
          // Navigate to home if we're on login/signup pages and user is authenticated
          if (event === 'SIGNED_IN' && (window.location.pathname.includes('/login') || window.location.pathname.includes('/signup'))) {
            router.push('/home')
          }
        } catch (error) {
          console.error('[Auth] Error fetching profile:', error)
          setProfile(null)
        }
      } else {
        setProfile(null)
      }
    })
    
    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    
    // The auth state listener will handle navigation after profile is loaded
    // Don't navigate immediately to avoid race conditions
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    
    // Wait a moment for the trigger to create the profile
    if (data.user) {
      // The auth state change listener will handle navigation
      // Don't navigate here as the profile might not be ready yet
    }
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