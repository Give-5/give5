import Link from 'next/link'

export default function WelcomePage() {
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
        {/* Large Logo */}
        <div className="mb-12">
          <div className="text-center">
            <div className="flex justify-center items-baseline mb-4">
              <span className="text-7xl font-bold text-give5-blue">GIVE</span>
              <span className="text-7xl font-bold text-give5-red">5</span>
            </div>
            <div className="text-4xl font-bold text-give5-blue tracking-wider">
              MILE HIGH
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mb-16">
          <h1 className="text-2xl font-bold text-give5-blue mb-8">
            Make a difference in Denver.
          </h1>
          <h2 className="text-3xl font-bold text-give5-blue">
            volunteer
          </h2>
        </div>

        {/* Continue Button */}
        <Link
          href="/home"
          className="fixed bottom-8 right-8 bg-yellow-400 p-4 rounded-full hover:bg-yellow-500 transition-colors shadow-lg"
          aria-label="Continue to home"
        >
          <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </main>
    </div>
  )
}