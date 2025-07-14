'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/layout/NavigationHeader'
import Link from 'next/link'
import Image from 'next/image'

export default function EventRegistrationPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationHeader title="event registration" />

      <main className="flex-1 px-4 py-6">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/events" className="text-give5-blue">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          
          <h2 className="text-xl font-semibold text-gray-900">Botanical Garden Cleanup</h2>
          
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        {/* Event Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {/* Image Carousel */}
          <div className="relative h-48 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/images/garden.jpg"
                  alt="Botanical Garden"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    // Fallback to placeholder if image doesn't exist
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>
            </div>
            
            {/* Image indicators */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Previous button */}
            <button className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
              &lt;
            </button>
            
            {/* Next button */}
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
              &gt;
            </button>
          </div>

          {/* Event Details */}
          <div className="p-6">
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                2:00PM - 5:30PM
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                May 17, 2025
              </div>
              
              <div className="flex items-start text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>
                  City Park, Denver<br />
                  282 S Pennsylvania St
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                14/54 volunteers
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-sm text-gray-600">
                Help maintain and improve a community garden-tasks include planting, weeding, watering, mulching, and general garden upkeep. No prior gardening experience required-training and tools provided.
              </p>
            </div>

            {/* Provided */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Provided</h3>
              <p className="text-sm text-gray-600">water • ppe • seating • restrooms</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Link
                href="/message-org"
                className="flex-1 bg-give5-blue text-white py-3 rounded-full text-center font-medium hover:bg-blue-700 transition-colors"
              >
                message organization
              </Link>
              
              <Link
                href="/home"
                className="flex-1 bg-yellow-400 text-black py-3 rounded-full text-center font-medium hover:bg-yellow-500 transition-colors"
              >
                register
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-between items-center mt-6">
          <Link href="/events" className="text-sm text-give5-blue">
            previous event
          </Link>
          
          <Link href="/events" className="text-sm text-give5-blue">
            next event
          </Link>
        </div>
      </main>
    </div>
  )
}