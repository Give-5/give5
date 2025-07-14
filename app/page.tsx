import Link from 'next/link'
import HandsIcon from '@/components/ui/HandsIcon'

export default function EntryPage() {
  return (
    <div className="min-h-screen bg-give5-light-bg flex flex-col">
      {/* Header */}
      <header className="bg-white px-4 py-3 shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-give5-blue">GIVE</span>
            <span className="text-3xl font-bold text-give5-red">5</span>
            <span className="text-sm font-medium text-give5-blue ml-2">MILE HIGH</span>
          </div>
          <div className="text-2xl text-give5-blue font-medium">Welcome</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        {/* Icon */}
        <div className="mb-8">
          <HandsIcon className="w-32 h-32" />
        </div>

        {/* Tagline */}
        <h1 className="text-2xl font-bold text-give5-blue text-center mb-16">
          Make a difference in Denver.
        </h1>

        {/* Login Options */}
        <div className="w-full max-w-sm space-y-4">
          <Link 
            href="/login"
            className="block w-full bg-give5-blue text-white text-center py-3.5 px-8 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>

          <button className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-full text-base font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Sign in with Gmail</span>
          </button>

          <div className="text-center text-give5-blue text-base font-medium py-2">
            OR
          </div>

          <Link
            href="/signup"
            className="block w-full bg-give5-light-blue text-give5-blue text-center py-3.5 px-8 rounded-full text-lg font-medium hover:bg-blue-100 transition-colors"
          >
            Join Give 5
          </Link>
        </div>
      </main>
    </div>
  )
}