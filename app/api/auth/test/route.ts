import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  
  try {
    // Test getting the current user
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return NextResponse.json({ 
        authenticated: false, 
        error: error.message 
      })
    }
    
    if (!user) {
      return NextResponse.json({ 
        authenticated: false, 
        message: 'No user session' 
      })
    }
    
    // Try to get the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      },
      profile: profile || null,
      profileError: profileError?.message || null
    })
  } catch (error: any) {
    return NextResponse.json({ 
      authenticated: false, 
      error: error.message 
    })
  }
}