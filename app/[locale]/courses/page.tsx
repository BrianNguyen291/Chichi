'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'
import { CourseFilter } from '@/components/course-filter'

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
  tags: string[]
}

interface Tag {
  id: string
  name: string
}

export default function CoursesPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const { t } = useTranslations(locale)
  
  // Sample tags data - would come from CMS in production
  const tags: Tag[] = [
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
    { id: 'online', name: 'Online' },
    { id: 'offline', name: 'Offline' },
    { id: 'individual', name: 'Individual' },
    { id: 'business', name: 'Business' },
    { id: 'conversation', name: 'Conversation' },
    { id: 'grammar', name: 'Grammar' },
    { id: 'vocabulary', name: 'Vocabulary' },
  ]
  
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
      slug: 'vietnamese-for-beginners',
      tags: ['beginner', 'offline', 'individual', 'grammar', 'vocabulary']
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
      slug: 'online-intermediate-vietnamese',
      tags: ['intermediate', 'online', 'individual', 'grammar', 'vocabulary', 'conversation']
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
      slug: 'advanced-vietnamese-for-business',
      tags: ['advanced', 'offline', 'business', 'vocabulary']
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
      slug: 'vietnamese-conversation-practice',
      tags: ['intermediate', 'offline', 'individual', 'conversation']
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
      slug: 'online-vietnamese-for-travelers',
      tags: ['beginner', 'online', 'individual', 'vocabulary']
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
      slug: 'corporate-vietnamese-training',
      tags: ['beginner', 'online', 'business', 'grammar', 'vocabulary', 'conversation']
    }
  ]

  // Filter state
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses)

  // Handle tag selection
  const handleTagSelect = (tagId: string) => {
    if (!selectedTags.includes(tagId)) {
      setSelectedTags([...selectedTags, tagId])
    }
  }

  // Handle tag removal
  const handleTagRemove = (tagId: string) => {
    setSelectedTags(selectedTags.filter(id => id !== tagId))
  }

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedTags([])
  }

  // Apply filters
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredCourses(courses)
    } else {
      const filtered = courses.filter(course => 
        selectedTags.every(tag => course.tags.includes(tag))
      )
      setFilteredCourses(filtered)
    }
  }, [selectedTags])

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          style={{ color: colors.darkOlive }}
        >
          {t.common.courses}
        </h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          Explore our Vietnamese language courses for all levels and learning preferences.
        </p>
      </section>

      {/* Filters */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 
            className="text-xl font-bold mb-4"
            style={{ color: colors.darkOlive }}
          >
            Filter Courses
          </h2>
          
          <CourseFilter 
            tags={tags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onClearFilters={handleClearFilters}
          />
        </div>
      </section>

      {/* Courses Grid */}
      <section>
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg">No courses match your selected filters.</p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 rounded-md text-white"
              style={{ backgroundColor: colors.primary }}
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
                  <div 
                    className="absolute top-0 right-0 m-2 px-2 py-1 text-xs rounded"
                    style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                  >
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 
                    className="font-bold text-lg mb-2"
                    style={{ color: colors.darkOlive }}
                  >
                    {course.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.tags.slice(0, 3).map(tagId => {
                      const tag = tags.find(t => t.id === tagId)
                      return tag ? (
                        <span 
                          key={tagId}
                          className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100"
                        >
                          {tag.name}
                        </span>
                      ) : null
                    })}
                    {course.tags.length > 3 && (
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100">
                        +{course.tags.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm mb-3">
                    <span>{course.duration}</span>
                    <span>{course.price}</span>
                  </div>
                  
                  <p className="text-sm mb-4 line-clamp-3">{course.description}</p>
                  
                  <Link 
                    href={`/${locale}/courses/${course.slug}`}
                    className="block text-center text-white px-4 py-2 rounded-md"
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
    </main>
  )
} 