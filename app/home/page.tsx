'use client'

import NavigationHeader from '@/components/layout/NavigationHeader'
import EventCard from '@/components/features/EventCard'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationHeader title="Home" />

      <main className="flex-1 px-4 py-6">
        {/* Upcoming Event Section */}
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">upcoming event</h2>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Garden Cleanup</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Saturday, March 25
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    00:00 A.M. - 00:00 P.M.
                  </div>
                  
                  <div className="flex items-start text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>
                      Sunridge Commons Park<br />
                      2785 W Pinecrest Drive Denver, CO 80219
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">Provided: Water, PPE</p>
                <p className="text-sm font-medium text-gray-700">6/50 volunteers</p>
              </div>
              
              <button className="text-red-500 text-sm font-medium hover:text-red-600">
                ✕ cancel
              </button>
            </div>
            
            <div className="flex justify-center">
              <Link
                href="/message-org"
                className="bg-give5-blue text-white px-8 py-3 rounded-full text-base font-medium hover:bg-blue-700 transition-colors flex items-center"
              >
                message org
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Give 5 Hours Section */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
            <h2 className="text-lg font-medium text-gray-900">Give 5 hours</h2>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M25 50 C25 35 20 30 15 35 C10 40 10 50 15 55 L20 75 C20 85 30 90 40 90 L50 90 L50 65 C45 65 40 60 40 55 L40 40 C40 35 38 33 35 33 C32 33 30 35 30 40 L30 55"
                  fill="#3B82F6"
                />
                <path
                  d="M75 50 C75 35 80 30 85 35 C90 40 90 50 85 55 L80 75 C80 85 70 90 60 90 L50 90 L50 65 C55 65 60 60 60 55 L60 40 C60 35 62 33 65 33 C68 33 70 35 70 40 L70 55"
                  fill="#1E40AF"
                />
                <circle cx="50" cy="60" r="25" fill="#EF4444" className="opacity-90" />
                <text x="50" y="70" textAnchor="middle" className="text-3xl font-bold fill-white">
                  3
                </text>
              </svg>
            </div>
            
            <Link
              href="/rewards"
              className="bg-yellow-400 text-black px-8 py-3 rounded-full text-base font-medium hover:bg-yellow-500 transition-colors"
            >
              rewards
            </Link>
          </div>
        </section>

        {/* Events Near You Section */}
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">events near you</h2>
          
          <div className="space-y-4 mb-6">
            <EventCard
              title="Park Cleanup & Picnic"
              date="August 3, 2025"
              time="10:00 AM - 1:00 PM"
              location="City Park, 2001 Colorado Blvd"
              description="Help beautify Denver's iconic park, then unwind with snacks and community vibes under the sun."
            />
            
            <EventCard
              title="Story Hour with Seniors"
              date="August 10, 2025"
              time="2:00 PM - 4:00 PM"
              location="1455 Franklin St, Rosewood Retirement Home"
              description="Bring joy and conversation to local seniors through shared stories and games."
            />
            
            <EventCard
              title="Urban Garden Harvest Day"
              date="August 17, 2025"
              time="8:30 AM - 11:30 AM"
              location="3721 W 32nd Ave, Grow Local Farm"
              description="Lend a hand gathering fresh produce to support food banks across the city."
            />
          </div>
          
          <div className="flex justify-end">
            <Link
              href="/events"
              className="bg-yellow-400 text-black px-8 py-3 rounded-full text-base font-medium hover:bg-yellow-500 transition-colors"
            >
              View all events
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}