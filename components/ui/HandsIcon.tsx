export default function HandsIcon({ className = "w-40 h-40" }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background hands - lighter blue */}
        <g opacity="0.3">
          <path
            d="M15 50 C15 30 10 25 5 30 C0 35 0 45 5 50 L10 70 C10 80 20 85 30 85 L40 85 L40 60 C35 60 30 55 30 50 L30 35 C30 30 28 28 25 28 C22 28 20 30 20 35 L20 50"
            fill="#C7D2FE"
          />
          <path
            d="M85 50 C85 30 90 25 95 30 C100 35 100 45 95 50 L90 70 C90 80 80 85 70 85 L60 85 L60 60 C65 60 70 55 70 50 L70 35 C70 30 72 28 75 28 C78 28 80 30 80 35 L80 50"
            fill="#C7D2FE"
          />
        </g>
        
        {/* Front hands - blue */}
        <g>
          {/* Left hand */}
          <path
            d="M20 55 C20 35 15 30 10 35 C5 40 5 50 10 55 L15 75 C15 85 25 90 35 90 L45 90 L45 65 C40 65 35 60 35 55 L35 40 C35 35 33 33 30 33 C27 33 25 35 25 40 L25 55"
            fill="#60A5FA"
            stroke="#3B82F6"
            strokeWidth="1"
          />
          
          {/* Right hand */}
          <path
            d="M80 55 C80 35 85 30 90 35 C95 40 95 50 90 55 L85 75 C85 85 75 90 65 90 L55 90 L55 65 C60 65 65 60 65 55 L65 40 C65 35 67 33 70 33 C73 33 75 35 75 40 L75 55"
            fill="#3B82F6"
            stroke="#2563EB"
            strokeWidth="1"
          />
          
          {/* Fingers detail */}
          <line x1="30" y1="45" x2="30" y2="65" stroke="#2563EB" strokeWidth="0.5" />
          <line x1="35" y1="42" x2="35" y2="65" stroke="#2563EB" strokeWidth="0.5" />
          <line x1="40" y1="45" x2="40" y2="65" stroke="#2563EB" strokeWidth="0.5" />
          
          <line x1="70" y1="45" x2="70" y2="65" stroke="#1E40AF" strokeWidth="0.5" />
          <line x1="65" y1="42" x2="65" y2="65" stroke="#1E40AF" strokeWidth="0.5" />
          <line x1="60" y1="45" x2="60" y2="65" stroke="#1E40AF" strokeWidth="0.5" />
        </g>
        
        {/* Red heart */}
        <path
          d="M50 45 C47.5 40 45 38 42 40 C39 42 39 46 42 49 L50 58 L58 49 C61 46 61 42 58 40 C55 38 52.5 40 50 45 Z"
          fill="#EF4444"
        />
      </svg>
    </div>
  )
}