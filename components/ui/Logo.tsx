import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  variant?: 'default' | 'icon' | 'text'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  href?: string
}

export default function Logo({ 
  variant = 'text', 
  size = 'md', 
  className = '',
  href = '/home'
}: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-2xl' },
    md: { icon: 48, text: 'text-3xl' },
    lg: { icon: 64, text: 'text-4xl' },
  }

  const logoContent = () => {
    if (variant === 'icon') {
      return (
        <Image 
          src="/images/logo.png" 
          alt="Give5" 
          width={sizes[size].icon} 
          height={sizes[size].icon}
          className="w-auto h-auto"
        />
      )
    }

    if (variant === 'default') {
      return (
        <div className="flex items-center gap-2">
          <Image 
            src="/images/logo.png" 
            alt="Give5" 
            width={sizes[size].icon} 
            height={sizes[size].icon}
            className="w-auto h-auto"
          />
          <div className="flex items-baseline">
            <span className={`${sizes[size].text} font-bold text-give5-blue`}>GIVE</span>
            <span className={`${sizes[size].text} font-bold text-give5-red`}>5</span>
            <span className="text-sm font-medium text-give5-blue ml-2">MILE HIGH</span>
          </div>
        </div>
      )
    }

    // Text variant (current implementation in header)
    return (
      <div className="flex items-baseline">
        <span className={`${sizes[size].text} font-bold text-white`}>GIVE</span>
        <span className={`${sizes[size].text} font-bold text-give5-red`}>5</span>
        <span className="text-sm font-medium text-white ml-2">MILE HIGH</span>
      </div>
    )
  }

  if (href) {
    return (
      <Link href={href} className={`flex items-center ${className}`}>
        {logoContent()}
      </Link>
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      {logoContent()}
    </div>
  )
}