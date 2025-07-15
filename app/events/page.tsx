'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/layout/NavigationHeader'
import EventCard from '@/components/features/EventCard'

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const events = [
    {
      id: '1',
      title: "Park Cleanup & Picnic",
      date: "August 3, 2025",
      startTime: "10:00 AM",
      endTime: "1:00 PM",
      location: "City Park, 2001 Colorado Blvd",
      organization: "Denver Parks & Recreation",
      volunteersNeeded: 30,
      volunteersRegistered: 15,
      description: "Help beautify Denver's iconic park, then unwind with snacks and community vibes under the sun."
    },
    {
      id: '2',
      title: "Food Bank Sorting",
      date: "August 5, 2025",
      startTime: "9:00 AM",
      endTime: "12:00 PM",
      location: "Denver Food Bank, 2222 Larimer St",
      organization: "Denver Food Bank",
      volunteersNeeded: 20,
      volunteersRegistered: 18,
      description: "Sort and pack food donations to help feed families in need across the Denver metro area."
    },
    {
      id: '3',
      title: "Senior Center Tech Help",
      date: "August 7, 2025",
      startTime: "2:00 PM",
      endTime: "4:00 PM",
      location: "Stapleton Senior Center, 2660 E 29th Ave",
      organization: "Mile High Seniors",
      volunteersNeeded: 10,
      volunteersRegistered: 5,
      description: "Assist seniors with smartphones, tablets, and computers in a friendly, patient environment."
    },
    {
      id: '4',
      title: "Trail Maintenance",
      date: "August 10, 2025",
      startTime: "8:00 AM",
      endTime: "12:00 PM",
      location: "Cherry Creek Trail, Confluence Park",
      organization: "Colorado Trail Foundation",
      volunteersNeeded: 25,
      volunteersRegistered: 20,
      description: "Help maintain Denver's beautiful trails by clearing debris and repairing pathways."
    },
    {
      id: '5',
      title: "Community Garden Planting",
      date: "August 12, 2025",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      location: "DeLaney Community Farm, 170 S Chambers Rd",
      organization: "Denver Urban Gardens",
      volunteersNeeded: 15,
      volunteersRegistered: 8,
      description: "Plant vegetables and herbs that will feed local families while learning about urban farming."
    },
    {
      id: '6',
      title: "Youth Mentorship Program",
      date: "August 15, 2025",
      startTime: "3:00 PM",
      endTime: "5:00 PM",
      location: "Boys & Girls Club, 2017 W 9th Ave",
      organization: "Boys & Girls Club of Metro Denver",
      volunteersNeeded: 12,
      volunteersRegistered: 10,
      description: "Mentor youth through homework help, sports activities, and positive role modeling."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationHeader title="Events List" />

      <main className="flex-1 px-4 py-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="search events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-give5-blue"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>

        {/* Featured Events */}
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">featured events</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="text-give5-blue hover:text-blue-700"
          >
            &lt;
          </button>
          
          <div className="flex space-x-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-give5-blue text-white'
                    : 'text-give5-blue hover:bg-give5-light-blue'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="text-give5-blue hover:text-blue-700"
          >
            &gt;
          </button>
        </div>
      </main>
    </div>
  )
}