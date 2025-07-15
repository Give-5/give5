'use client'

import { useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

interface NavigationHeaderProps {
  title: string
  showMenu?: boolean
}

export default function NavigationHeader({ title, showMenu = true }: NavigationHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-give5-blue px-4 py-3 shadow-sm">
        <div className="flex justify-between items-center">
          <Logo variant="text" href="/home" />
          
          <h1 className="text-2xl text-white font-medium">{title}</h1>
          
          {showMenu && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-give5-blue">
          <div className="flex justify-between items-center p-4">
            <Logo variant="text" />
            
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col items-end px-8 py-12 space-y-8">
            <Link href="/home" className="text-white text-2xl" onClick={() => setIsMenuOpen(false)}>
              home
            </Link>
            <Link href="/events" className="text-white text-2xl" onClick={() => setIsMenuOpen(false)}>
              events
            </Link>
            <Link href="/profile" className="text-white text-2xl" onClick={() => setIsMenuOpen(false)}>
              profile
            </Link>
            <Link href="/rewards" className="text-white text-2xl" onClick={() => setIsMenuOpen(false)}>
              rewards
            </Link>
            <Link href="/manage-rewards" className="text-white text-2xl" onClick={() => setIsMenuOpen(false)}>
              manage rewards
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}