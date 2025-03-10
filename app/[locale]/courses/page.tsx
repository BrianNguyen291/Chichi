'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'
import { CourseFilter } from '@/components/course-filter'
import { getCourses, getTags, getStrapiMedia, getStrapiImageAlt } from '@/lib/strapi'
import { StrapiData, StrapiCourse, StrapiTag } from '@/lib/strapi/types'

interface CoursePageProps {
  params: {
    locale: Locale
  }
}

export default function CoursesPage({
  params: { locale },
}: CoursePageProps) {
  const { t } = useTranslations(locale)
  
  // State for courses and tags
  const [courses, setCourses] = useState<StrapiData<StrapiCourse>[]>([])
  const [tags, setTags] = useState<StrapiData<StrapiTag>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filter state
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredCourses, setFilteredCourses] = useState<StrapiData<StrapiCourse>[]>([])

  // Fetch courses and tags
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch courses
        const coursesData = await getCourses(locale)
        setCourses(coursesData.data)
        setFilteredCourses(coursesData.data)
        
        // Fetch tags
        const tagsData = await getTags(locale)
        setTags(tagsData.data)
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load courses. Please try again later.')
        setLoading(false)
      }
    }
    
    fetchData()
  }, [locale])

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
        selectedTags.every(tagId => 
          course.attributes.tags.data.some(tag => tag.id.toString() === tagId)
        )
      )
      setFilteredCourses(filtered)
    }
  }, [selectedTags, courses])

  // Format tags for the CourseFilter component
  const formattedTags = tags.map(tag => ({
    id: tag.id.toString(),
    name: tag.attributes.name
  }))

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
            tags={formattedTags}
            selectedTags={selectedTags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onClearFilters={handleClearFilters}
          />
        </div>
      </section>

      {/* Courses Grid */}
      <section>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading courses...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        ) : filteredCourses.length === 0 ? (
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
            {filteredCourses.map((course) => {
              const { attributes } = course
              
              return (
                <div 
                  key={course.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={getStrapiMedia(attributes.image)}
                      alt={getStrapiImageAlt(attributes.image)}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div 
                      className="absolute top-0 right-0 m-2 px-2 py-1 text-xs rounded"
                      style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                    >
                      {attributes.level.charAt(0).toUpperCase() + attributes.level.slice(1)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 
                      className="font-bold text-lg mb-2"
                      style={{ color: colors.darkOlive }}
                    >
                      {attributes.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {attributes.tags.data.slice(0, 3).map(tag => (
                        <span 
                          key={tag.id}
                          className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100"
                        >
                          {tag.attributes.name}
                        </span>
                      ))}
                      {attributes.tags.data.length > 3 && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100">
                          +{attributes.tags.data.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm mb-3">
                      <span>{attributes.duration}</span>
                      <span>{attributes.price}</span>
                    </div>
                    
                    <p className="text-sm mb-4 line-clamp-3">{attributes.description}</p>
                    
                    <Link 
                      href={`/${locale}/courses/${attributes.slug}`}
                      className="block text-center text-white px-4 py-2 rounded-md"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {t.course_card.learn_more}
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
} 