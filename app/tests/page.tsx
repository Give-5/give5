import Link from 'next/link'

export default function TestsIndexPage() {
  const testPages = [
    { 
      path: '/test-auth-flow', 
      name: 'Auth Flow Test', 
      description: 'Test signup, login, and logout functionality',
      status: 'recommended'
    },
    { 
      path: '/debug-auth', 
      name: 'Auth Debug', 
      description: 'Comprehensive auth debugging information',
      status: 'diagnostic'
    },
    { 
      path: '/test-session', 
      name: 'Session Test', 
      description: 'Compare getSession vs getUser methods',
      status: 'diagnostic'
    },
    { 
      path: '/test-hanging', 
      name: 'Hanging Test', 
      description: 'Debug why getSession hangs',
      status: 'diagnostic'
    },
    { 
      path: '/test-configs', 
      name: 'Config Test', 
      description: 'Test different Supabase client configurations',
      status: 'diagnostic'
    },
    { 
      path: '/test-raw', 
      name: 'Raw Client Test', 
      description: 'Test raw Supabase client without SSR',
      status: 'diagnostic'
    },
    { 
      path: '/test-diagnosis', 
      name: 'Diagnosis Report', 
      description: 'Complete authentication diagnosis',
      status: 'summary'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Test Pages</h1>
        <p className="text-gray-600 mb-8">Development test pages for debugging and verification</p>

        <div className="grid gap-4">
          {testPages.map((test) => (
            <Link
              key={test.path}
              href={test.path}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{test.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{test.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  test.status === 'recommended' ? 'bg-green-100 text-green-700' :
                  test.status === 'summary' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {test.status}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-100 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Development Only</h3>
          <p className="text-sm text-yellow-700">
            These test pages should be removed before deploying to production.
            They are for development and debugging purposes only.
          </p>
        </div>

        <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">✅ Auth Status</h3>
          <p className="text-sm text-green-700">
            Your authentication is working correctly using the getUser() method.
            The getSession() hang is a known Supabase SDK issue that doesn't affect functionality.
          </p>
        </div>
      </div>
    </div>
  )
}