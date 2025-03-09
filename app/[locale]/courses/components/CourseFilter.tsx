'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'

interface Course {
  id: number
  title: string
  description: string
  image: string
  level: 'beginner' | 'intermediate' | 'advanced'
  format: 'online' | 'offline'
  type: 'individual' | 'business'
  price: string
  duration: string
  slug: string
}

interface CourseFilterProps {
  locale: Locale
}

export default function CourseFilter({ locale }: CourseFilterProps) {
  const { t, translate } = useTranslations(locale)
  
  // Sample courses data - would come from CMS in production
  const courses: Course[] = [
    {
      id: 1,
      title: 'Vietnamese for Beginners',
      description: 'Start your Vietnamese language journey with our comprehensive beginner course. Learn basic vocabulary, pronunciation, and simple conversations.',
      image: '/placeholder.jpg',
      level: 'beginner',
      format: 'offline',
      type: 'individual',
      price: '$200',
      duration: '8 weeks',
      slug: 'vietnamese-for-beginners'
    },
    {
      id: 2,
      title: 'Online Intermediate Vietnamese',
      description: 'Improve your Vietnamese language skills with our interactive online intermediate course. Focus on grammar, vocabulary expansion, and conversation practice.',
      image: '/placeholder.jpg',
      level: 'intermediate',
      format: 'online',
      type: 'individual',
      price: '$250',
      duration: '10 weeks',
      slug: 'online-intermediate-vietnamese'
    },
    {
      id: 3,
      title: 'Advanced Vietnamese for Business',
      description: 'Master Vietnamese for professional settings with our advanced business course. Learn industry-specific vocabulary, formal writing, and business etiquette.',
      image: '/placeholder.jpg',
      level: 'advanced',
      format: 'offline',
      type: 'business',
      price: '$400',
      duration: '12 weeks',
      slug: 'advanced-vietnamese-for-business'
    },
    {
      id: 4,
      title: 'Vietnamese Conversation Practice',
      description: 'Enhance your speaking skills with our conversation-focused course. Practice real-life scenarios with native speakers in a supportive environment.',
      image: '/placeholder.jpg',
      level: 'intermediate',
      format: 'offline',
      type: 'individual',
      price: '$180',
      duration: '6 weeks',
      slug: 'vietnamese-conversation-practice'
    },
    {
      id: 5,
      title: 'Online Vietnamese for Travelers',
      description: 'Learn essential Vietnamese phrases and cultural tips for your trip to Vietnam. Focus on practical vocabulary for travel, dining, and shopping.',
      image: '/placeholder.jpg',
      level: 'beginner',
      format: 'online',
      type: 'individual',
      price: '$150',
      duration: '4 weeks',
      slug: 'online-vietnamese-for-travelers'
    },
    {
      id: 6,
      title: 'Corporate Vietnamese Training',
      description: 'Customized Vietnamese language training for businesses. Tailored to your industry and company needs with flexible scheduling options.',
      image: '/placeholder.jpg',
      level: 'beginner',
      format: 'online',
      type: 'business',
      price: 'Custom',
      duration: 'Flexible',
      slug: 'corporate-vietnamese-training'
    }
  ]

  // Filter states
  const [activeFilters, setActiveFilters] = useState({
    level: [] as string[],
    format: [] as string[],
    type: [] as string[]
  })
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)

  // Filter options
  const filterOptions = {
    level: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' }
    ],
    format: [
      { value: 'online', label: 'Online' },
      { value: 'offline', label: 'Offline' }
    ],
    type: [
      { value: 'individual', label: 'Individual' },
      { value: 'business', label: 'Business' }
    ]
  }

  // Toggle filter
  const toggleFilter = (category: 'level' | 'format' | 'type', value: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev }
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(item => item !== value)
      } else {
        newFilters[category] = [...newFilters[category], value]
      }
      return newFilters
    })
  }

  // Apply filters
  useEffect(() => {
    let result = [...courses]
    
    // Apply level filter
    if (activeFilters.level.length > 0) {
      result = result.filter(course => activeFilters.level.includes(course.level))
    }
    
    // Apply format filter
    if (activeFilters.format.length > 0) {
      result = result.filter(course => activeFilters.format.includes(course.format))
    }
    
    // Apply type filter
    if (activeFilters.type.length > 0) {
      result = result.filter(course => activeFilters.type.includes(course.type))
    }
    
    setFilteredCourses(result)
  }, [activeFilters])

  return (
    <>
      {/* Filters */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: colors.darkOlive }}
          >
            Filter Courses
          </h2>
          
          <div className="space-y-6">
            {/* Level Filter */}
            <div>
              <h3 className="font-medium mb-2">By Level</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.level.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('level', option.value)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      activeFilters.level.includes(option.value)
                        ? 'bg-[#b17f4a] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Format Filter */}
            <div>
              <h3 className="font-medium mb-2">By Format</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.format.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('format', option.value)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      activeFilters.format.includes(option.value)
                        ? 'bg-[#b17f4a] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Type Filter */}
            <div>
              <h3 className="font-medium mb-2">By Type</h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.type.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleFilter('type', option.value)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      activeFilters.type.includes(option.value)
                        ? 'bg-[#b17f4a] text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Clear Filters */}
            {(activeFilters.level.length > 0 || activeFilters.format.length > 0 || activeFilters.type.length > 0) && (
              <button
                onClick={() => setActiveFilters({ level: [], format: [], type: [] })}
                className="text-[#b17f4a] text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="mb-16">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">No courses match your selected filters. Please try different criteria.</p>
            <button
              onClick={() => setActiveFilters({ level: [], format: [], type: [] })}
              className="mt-4 px-4 py-2 bg-[#b17f4a] text-white rounded-md hover:bg-[#9a6d3e] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-0 left-0 right-0 p-4 flex flex-wrap gap-2">
                    <span 
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                    >
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </span>
                    <span 
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                    >
                      {course.format.charAt(0).toUpperCase() + course.format.slice(1)}
                    </span>
                    <span 
                      className="px-2 py-1 text-xs rounded-full"
                      style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                    >
                      {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 
                    className="font-bold text-lg mb-2"
                    style={{ color: colors.darkOlive }}
                  >
                    {course.title}
                  </h3>
                  <div className="flex justify-between mb-3 text-sm">
                    <span>{course.duration}</span>
                    <span className="font-semibold">{course.price}</span>
                  </div>
                  <p className="text-sm mb-4 line-clamp-3">{course.description}</p>
                  <Link 
                    href={`/${locale}/courses/${course.slug}`}
                    className="inline-block text-white px-4 py-2 rounded-md text-sm"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {t.course_card.learn_more}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
} 