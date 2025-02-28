'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { colors } from '@/lib/colors'

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
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
          className="fixed bottom-20 right-4 z-50 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 md:bottom-4"
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