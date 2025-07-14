import Link from 'next/link'

interface EventCardProps {
  title: string
  date: string
  time: string
  location: string
  description: string
  volunteers?: string
  showCancel?: boolean
  eventUrl?: string
}

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  volunteers,
  showCancel = false,
  eventUrl = '/event-registration'
}: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {time}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      
      {volunteers && (
        <p className="text-sm font-medium text-gray-700 mb-4">{volunteers} volunteers</p>
      )}
      
      <div className="flex items-center justify-between">
        {showCancel ? (
          <>
            <span className="text-sm text-red-500 font-medium cursor-pointer hover:text-red-600">
              ✕ cancel
            </span>
            <Link href={eventUrl} className="bg-give5-blue p-3 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </Link>
          </>
        ) : (
          <>
            <Link 
              href={eventUrl}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full text-base font-medium hover:bg-yellow-500 transition-colors"
            >
              register
            </Link>
            <Link href={eventUrl} className="bg-give5-blue p-3 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}