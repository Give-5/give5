'use client'

import { useEffect, useState } from 'react'
import NavigationHeader from '@/components/layout/NavigationHeader'
import EventCard from '@/components/features/EventCard'
import Link from 'next/link'
import Image from 'next/image'
import { useRequireAuth } from '@/lib/hooks/use-require-auth'
import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/types/supabase'

type Event = Database['public']['Tables']['events']['Row']
type Organization = Database['public']['Tables']['organizations']['Row']

interface EventWithDetails extends Event {
  organization: Organization
  registrations: { count: number }[]
  is_registered?: boolean
}

export default function HomePage() {
  const { user, loading: authLoading } = useRequireAuth()
  const [upcomingEvent, setUpcomingEvent] = useState<EventWithDetails | null>(null)
  const [recentEvents, setRecentEvents] = useState<EventWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [totalHours, setTotalHours] = useState(0)
  const [currentPoints, setCurrentPoints] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        // Fetch user's stats
        const { data: profile } = await supabase
          .from('profiles')
          .select('total_verified_hours')
          .eq('id', user.id)
          .single()

        if (profile) {
          setTotalHours(profile.total_verified_hours || 0)
        }

        // Fetch rewards
        const { data: rewards } = await supabase
          .from('rewards')
          .select('current_points')
          .eq('volunteer_id', user.id)
          .single()

        if (rewards) {
          setCurrentPoints(rewards.current_points || 0)
        }

        // Fetch upcoming registered events
        const { data: registrations } = await supabase
          .from('event_registrations')
          .select(`
            event_id,
            events (
              *,
              organizations (*)
            )
          `)
          .eq('volunteer_id', user.id)
          .is('cancelled_at', null)

        if (registrations && registrations.length > 0) {
          // Filter for upcoming events
          const upcomingEvents = registrations
            .filter(reg => {
              const event = reg.events as any
              return event && 
                     event.status === 'active' && 
                     event.date >= new Date().toISOString().split('T')[0]
            })
            .map(reg => {
              const event = reg.events as any
              return {
                ...event,
                organization: event.organizations,
                registrations: [{ count: 0 }], // We'll fetch this separately if needed
                is_registered: true
              }
            })
            .sort((a: any, b: any) => {
              const dateCompare = a.date.localeCompare(b.date)
              if (dateCompare !== 0) return dateCompare
              return a.start_time.localeCompare(b.start_time)
            })

          if (upcomingEvents.length > 0) {
            setUpcomingEvent(upcomingEvents[0] as EventWithDetails)
          }
        }

        // Fetch recent events
        const { data: events } = await supabase
          .from('events')
          .select(`
            *,
            organizations (*),
            event_registrations (count)
          `)
          .eq('status', 'active')
          .gte('date', new Date().toISOString().split('T')[0])
          .order('date', { ascending: true })
          .order('start_time', { ascending: true })
          .limit(6)

        if (events) {
          // Check which events user is registered for
          const eventIds = events.map(e => e.id)
          const { data: userRegistrations } = await supabase
            .from('event_registrations')
            .select('event_id')
            .eq('volunteer_id', user.id)
            .in('event_id', eventIds)
            .is('cancelled_at', null)

          const registeredEventIds = new Set(userRegistrations?.map(r => r.event_id) || [])

          setRecentEvents(events.map(event => ({
            ...event,
            organization: event.organizations as Organization,
            registrations: event.event_registrations as { count: number }[],
            is_registered: registeredEventIds.has(event.id)
          })))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, supabase])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  // Only show loading screen during initial auth check
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationHeader title="Home" />

      <main className="flex-1 px-4 py-6 animate-fade-in">
        {/* Upcoming Event Section */}
        {upcomingEvent && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">upcoming event</h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{upcomingEvent.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(upcomingEvent.date)}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatTime(upcomingEvent.start_time)} - {formatTime(upcomingEvent.end_time)}
                    </div>
                    
                    <div className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        {upcomingEvent.location_name}<br />
                        {upcomingEvent.location_address}
                      </span>
                    </div>
                  </div>
                  
                  {upcomingEvent.provided_items && upcomingEvent.provided_items.length > 0 && (
                    <p className="text-sm text-gray-600 mb-2">
                      Provided: {upcomingEvent.provided_items.join(', ')}
                    </p>
                  )}
                  <p className="text-sm font-medium text-gray-700">
                    {upcomingEvent.registrations[0]?.count || 0}/{upcomingEvent.max_volunteers} volunteers
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-4">
                    <Image 
                      src={upcomingEvent.image_url || "/images/event-placeholder.jpg"}
                      alt={upcomingEvent.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                    Registered
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Hours Tracker Section */}
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">hours tracker</h2>
          
          <div className="bg-gradient-to-br from-give5-blue to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold mb-1">{totalHours.toFixed(1)}</h3>
                <p className="text-blue-100">total hours</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold">{currentPoints}</p>
                <p className="text-blue-100 text-sm">points earned</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link href="/hours" className="block bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 text-center font-medium hover:bg-white/30 transition-colors">
                View Details
              </Link>
              <Link href="/rewards" className="block bg-white text-give5-blue rounded-lg px-4 py-3 text-center font-medium hover:bg-blue-50 transition-colors">
                Redeem Points
              </Link>
            </div>
          </div>
        </section>

        {/* Event Browser Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">event browser</h2>
            <Link href="/events" className="text-give5-blue text-sm font-medium">
              See all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {recentEvents.map((event) => (
              <EventCard 
                key={event.id}
                event={{
                  id: event.id,
                  title: event.title,
                  date: formatDate(event.date),
                  startTime: formatTime(event.start_time),
                  endTime: formatTime(event.end_time),
                  location: event.location_name,
                  organization: event.organization.name,
                  volunteersNeeded: event.max_volunteers,
                  volunteersRegistered: event.registrations[0]?.count || 0,
                  imageUrl: event.image_url || "/images/event-placeholder.jpg",
                  description: event.description,
                  isRegistered: event.is_registered
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}