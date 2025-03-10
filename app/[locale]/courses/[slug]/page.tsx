import { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCourseBySlug, getStrapiMedia, getStrapiImageAlt } from '@/lib/strapi'
import { StrapiData, StrapiCourse } from '@/lib/strapi/types'

interface CourseDetailPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export async function generateMetadata({
  params: { locale, slug },
}: CourseDetailPageProps): Promise<Metadata> {
  const t = getTranslations(locale)
  
  try {
    const course = await getCourseBySlug(slug, locale)
    
    if (!course) {
      return {
        title: 'Course Not Found',
      }
    }
    
    return {
      title: `${course.attributes.title} | ${t.common.brand}`,
      description: course.attributes.description,
    }
  } catch (error) {
    console.error('Error fetching course for metadata:', error)
    return {
      title: 'Course',
      description: 'Course details',
    }
  }
}

export default async function CourseDetailPage({
  params: { locale, slug },
}: CourseDetailPageProps) {
  const t = getTranslations(locale)
  
  let course: StrapiData<StrapiCourse> | null = null
  
  try {
    course = await getCourseBySlug(slug, locale)
  } catch (error) {
    console.error('Error fetching course:', error)
  }
  
  if (!course) {
    notFound()
  }

  const { attributes } = course

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <section className="mb-12">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={getStrapiMedia(attributes.image)}
                alt={getStrapiImageAlt(attributes.image)}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span 
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                >
                  {attributes.level.charAt(0).toUpperCase() + attributes.level.slice(1)}
                </span>
                <span 
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                >
                  {attributes.format.charAt(0).toUpperCase() + attributes.format.slice(1)}
                </span>
                <span 
                  className="px-2 py-1 text-xs rounded-full"
                  style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                >
                  {attributes.type.charAt(0).toUpperCase() + attributes.type.slice(1)}
                </span>
              </div>
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: colors.darkOlive }}
              >
                {attributes.title}
              </h1>
              <p className="mb-6">{attributes.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-sm">Duration</h3>
                  <p>{attributes.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Price</h3>
                  <p>{attributes.price}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Start Date</h3>
                  <p>{new Date(attributes.startDate).toLocaleDateString(locale)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Schedule</h3>
                  <p>{attributes.schedule}</p>
                </div>
              </div>
              <button 
                className="w-full py-3 rounded-md text-white font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                {t.course_card.enroll}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details */}
      <section className="mb-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: colors.darkOlive }}
            >
              Course Description
            </h2>
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: attributes.longDescription }}
            />
          </div>

          {attributes.syllabus && attributes.syllabus.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: colors.darkOlive }}
              >
                Course Syllabus
              </h2>
              <div className="space-y-4">
                {attributes.syllabus.map((week) => (
                  <div key={week.week} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-semibold">Week {week.week}: {week.title}</h3>
                    <ul className="list-disc pl-5 mt-2">
                      {week.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-20">
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: colors.darkOlive }}
            >
              Course Details
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm">Instructor</h3>
                <p>{attributes.instructor}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Location</h3>
                <p>{attributes.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Max Students</h3>
                <p>{attributes.maxStudents}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Prerequisites</h3>
                <p>{attributes.prerequisites}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Materials</h3>
                <p>{attributes.materials}</p>
              </div>
              {attributes.tags.data.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm">Tags</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {attributes.tags.data.map(tag => (
                      <span 
                        key={tag.id}
                        className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100"
                      >
                        {tag.attributes.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6">
              <button 
                className="w-full py-3 rounded-md text-white font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                {t.course_card.enroll}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Courses */}
      <div className="text-center">
        <Link 
          href={`/${locale}/courses`}
          className="inline-flex items-center text-[#b17f4a] hover:underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all courses
        </Link>
      </div>
    </main>
  )
} 