'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { colors } from '@/lib/colors'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial checks
    toggleVisibility()
    checkMobile()

    window.addEventListener('scroll', toggleVisibility)
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          className={`fixed ${isMobile ? 'bottom-[70px] right-4' : 'bottom-4 right-4'} z-40 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110`}
          onClick={scrollToTop}
          style={{ 
            backgroundColor: colors.primary,
            color: colors.darkOlive 
          }}
        >
          <ArrowUp className="h-6 w-6" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      )}
    </>
  )
} 