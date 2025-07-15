import type { Metadata } from 'next'
import { AuthProvider } from '@/lib/contexts/auth-context'
import './globals.css'

export const metadata: Metadata = {
  title: 'Give5 Mile High - Make a difference in Denver',
  description: 'Volunteer management platform connecting Denver residents with community service opportunities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}