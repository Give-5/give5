'use client'

import { useState } from 'react'
import NavigationHeader from '@/components/layout/NavigationHeader'
import { colors, typography, effects } from '@/lib/styles'
import Image from 'next/image'

export default function ComponentShowcasePage() {
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components'>('colors')
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader title="Component Showcase" />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('colors')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'colors'
                ? 'text-give5-blue border-b-2 border-give5-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Colors
          </button>
          <button
            onClick={() => setActiveTab('typography')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'typography'
                ? 'text-give5-blue border-b-2 border-give5-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Typography
          </button>
          <button
            onClick={() => setActiveTab('components')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'components'
                ? 'text-give5-blue border-b-2 border-give5-blue'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Components
          </button>
        </div>

        {/* Colors Tab */}
        {activeTab === 'colors' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-give5-blue mb-6">Color Palette</h2>
            
            {/* Primary Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(colors.primary).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className="w-full h-24 rounded-lg shadow-md mb-2"
                      style={{ backgroundColor: value }}
                    />
                    <p className="text-sm font-medium">{key}</p>
                    <p className="text-xs text-gray-500">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Secondary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(colors.secondary).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className="w-full h-24 rounded-lg shadow-md mb-2"
                      style={{ backgroundColor: value }}
                    />
                    <p className="text-sm font-medium">{key}</p>
                    <p className="text-xs text-gray-500">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Neutral Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Neutral Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(colors.neutral).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div
                      className="w-full h-24 rounded-lg shadow-md mb-2 border"
                      style={{ backgroundColor: value }}
                    />
                    <p className="text-sm font-medium">{key}</p>
                    <p className="text-xs text-gray-500">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Red</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(colors.red).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div
                        className="w-full h-24 rounded-lg shadow-md mb-2"
                        style={{ backgroundColor: value }}
                      />
                      <p className="text-sm font-medium">{key}</p>
                      <p className="text-xs text-gray-500">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Yellow</h3>
                <div>
                  {Object.entries(colors.yellow).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div
                        className="w-full h-24 rounded-lg shadow-md mb-2"
                        style={{ backgroundColor: value }}
                      />
                      <p className="text-sm font-medium">{key}</p>
                      <p className="text-xs text-gray-500">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Green</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(colors.green).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div
                        className="w-full h-24 rounded-lg shadow-md mb-2"
                        style={{ backgroundColor: value }}
                      />
                      <p className="text-sm font-medium">{key}</p>
                      <p className="text-xs text-gray-500">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-give5-blue mb-6">Typography System</h2>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Headings (Figtree)</h3>
              <div className="space-y-4">
                {Object.entries(typography.heading).map(([key, value]) => (
                  <div key={key} className="border-b pb-4">
                    <p className="text-sm text-gray-500 mb-1">{key.toUpperCase()} - {value.fontSize} / {value.lineHeight}</p>
                    <p
                      style={{
                        fontFamily: typography.fontFamily.heading,
                        fontSize: value.fontSize,
                        lineHeight: value.lineHeight,
                        fontWeight: value.fontWeight,
                        letterSpacing: value.letterSpacing || 'normal',
                      }}
                      className="text-give5-blue"
                    >
                      Make a difference in Denver
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Body Text (League Spartan)</h3>
              <div className="space-y-4">
                {Object.entries(typography.body).map(([key, value]) => (
                  <div key={key} className="border-b pb-4">
                    <p className="text-sm text-gray-500 mb-1">{key.toUpperCase()} - {value.fontSize} / {value.lineHeight}</p>
                    <p
                      style={{
                        fontFamily: typography.fontFamily.body,
                        fontSize: value.fontSize,
                        lineHeight: value.lineHeight,
                        fontWeight: value.fontWeight,
                      }}
                      className="text-gray-700"
                    >
                      Help beautify Denver&apos;s iconic park, then unwind with snacks and community vibes under the sun.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeTab === 'components' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-give5-blue mb-6">Component Library</h2>
            
            {/* Logo */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Logo</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gray-100 p-4 rounded-lg mb-2">
                    <Image src="/images/logo.png" alt="Give5 Logo" width={120} height={120} className="mx-auto" />
                  </div>
                  <p className="text-sm text-gray-600">Primary Logo</p>
                </div>
                <div className="text-center">
                  <div className="bg-give5-blue p-4 rounded-lg mb-2">
                    <Image src="/images/logo.png" alt="Give5 Logo" width={120} height={120} className="mx-auto" />
                  </div>
                  <p className="text-sm text-gray-600">Logo on Blue</p>
                </div>
                <div className="text-center">
                  <div className="bg-gray-100 p-4 rounded-lg mb-2">
                    <Image src="/images/give5hand.png" alt="Give5 Hand" width={120} height={120} className="mx-auto" />
                  </div>
                  <p className="text-sm text-gray-600">Hand Icon</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Buttons</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Primary Button</p>
                  <div className="flex gap-4 items-center">
                    <button className="bg-give5-blue text-white py-3 px-20 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors">
                      Login
                    </button>
                    <button className="bg-give5-blue text-white py-3 px-20 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50" disabled>
                      Disabled
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Secondary Button</p>
                  <div className="flex gap-4 items-center">
                    <button className="bg-give5-light-blue text-give5-blue py-3 px-20 rounded-full text-lg font-medium hover:bg-blue-100 transition-colors">
                      Join Give 5
                    </button>
                    <button className="border-2 border-give5-blue text-give5-blue py-3 px-20 rounded-full text-lg font-medium hover:bg-blue-50 transition-colors">
                      Outlined
                    </button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-2">Accent Button</p>
                  <div className="flex gap-4 items-center">
                    <button className="bg-give5-yellow text-gray-800 py-3 px-20 rounded-full text-lg font-medium hover:bg-yellow-500 transition-colors">
                      register
                    </button>
                    <button className="border-2 border-give5-yellow text-give5-yellow py-3 px-20 rounded-full text-lg font-medium hover:bg-yellow-50 transition-colors">
                      rewards
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Elements */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Form Elements</h3>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-base font-medium text-give5-blue mb-2">
                    username
                  </label>
                  <input
                    type="text"
                    placeholder="volunteerprofile@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-give5-light-blue border border-transparent focus:outline-none focus:ring-2 focus:ring-give5-blue text-gray-600 placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-base font-medium text-give5-blue mb-2">
                    password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg bg-give5-light-blue border border-transparent focus:outline-none focus:ring-2 focus:ring-give5-blue"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-give5-blue bg-white border-gray-300 rounded focus:ring-give5-blue"
                  />
                  <label htmlFor="remember" className="ml-2 text-base text-gray-700">
                    remember me
                  </label>
                </div>
              </div>
            </div>

            {/* Event Card */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Event Card</h3>
              <div className="max-w-sm bg-give5-light-blue rounded-2xl p-6">
                <h4 className="text-xl font-semibold text-give5-blue mb-4">Park Cleanup & Picnic</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>10:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>August 3, 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>City Park, 2001 Colorado Blvd</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Help beautify Denver&apos;s iconic park, then unwind with snacks and community vibes under the sun.
                </p>
                <div className="flex items-center justify-between">
                  <button className="bg-give5-yellow text-gray-800 py-2 px-6 rounded-full font-medium hover:bg-yellow-500 transition-colors">
                    register
                  </button>
                  <button className="bg-give5-blue text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Badges & Pills</h3>
              <div className="flex gap-4 flex-wrap">
                <span className="bg-give5-red text-white px-4 py-1 rounded-full text-sm font-medium">
                  x cancel
                </span>
                <span className="bg-give5-blue text-white px-4 py-1 rounded-full text-sm">
                  15/30 volunteers
                </span>
                <span className="bg-give5-yellow text-gray-800 px-4 py-1 rounded-full text-sm">
                  5 hours
                </span>
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm">
                  Completed
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}