import { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CourseDetailPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

// This would come from CMS in production
const getCourseBySlug = (slug: string) => {
  const courses = [
    {
      id: 1,
      title: 'Vietnamese for Beginners',
      description: 'Start your Vietnamese language journey with our comprehensive beginner course. Learn basic vocabulary, pronunciation, and simple conversations.',
      longDescription: `
        <p>Our Vietnamese for Beginners course is designed for students with little to no prior knowledge of the Vietnamese language. This comprehensive course provides a solid foundation in Vietnamese, focusing on practical communication skills for everyday situations.</p>
        
        <p>Throughout this 8-week course, you will:</p>
        <ul>
          <li>Master Vietnamese pronunciation and tones</li>
          <li>Learn essential vocabulary for daily conversations</li>
          <li>Understand basic grammar structures</li>
          <li>Practice simple dialogues and role-plays</li>
          <li>Gain cultural insights about Vietnam</li>
        </ul>
        
        <p>By the end of the course, you will be able to introduce yourself, engage in basic conversations, ask and answer simple questions, and navigate common situations like shopping, ordering food, and asking for directions.</p>
        
        <p>Our experienced native Vietnamese teachers use a communicative approach to ensure you develop practical language skills in a supportive environment. Small class sizes allow for personalized attention and plenty of speaking practice.</p>
      `,
      image: '/placeholder.jpg',
      level: 'beginner',
      format: 'offline',
      type: 'individual',
      price: '$200',
      duration: '8 weeks',
      schedule: 'Tuesdays and Thursdays, 6:00 PM - 7:30 PM',
      startDate: 'September 5, 2023',
      location: 'Chi Chi Vietnamese Language Center, Room 201',
      instructor: 'Ms. Linh Nguyen',
      maxStudents: 12,
      prerequisites: 'None',
      materials: 'Textbook and workbook included in course fee',
      slug: 'vietnamese-for-beginners',
      syllabus: [
        {
          week: 1,
          title: 'Introduction to Vietnamese',
          topics: ['Vietnamese alphabet and pronunciation', 'Basic greetings', 'Self-introduction']
        },
        {
          week: 2,
          title: 'Numbers and Basic Conversations',
          topics: ['Numbers and counting', 'Asking and telling time', 'Days of the week']
        },
        {
          week: 3,
          title: 'Family and Relationships',
          topics: ['Family vocabulary', 'Possessive pronouns', 'Talking about family']
        },
        {
          week: 4,
          title: 'Food and Dining',
          topics: ['Food vocabulary', 'Ordering in restaurants', 'Expressing likes and dislikes']
        },
        {
          week: 5,
          title: 'Shopping and Money',
          topics: ['Shopping vocabulary', 'Currency and prices', 'Bargaining basics']
        },
        {
          week: 6,
          title: 'Transportation and Directions',
          topics: ['Transportation vocabulary', 'Asking for and giving directions', 'Using taxis and public transport']
        },
        {
          week: 7,
          title: 'Daily Activities and Routines',
          topics: ['Verbs for daily activities', 'Telling time', 'Describing routines']
        },
        {
          week: 8,
          title: 'Review and Final Project',
          topics: ['Comprehensive review', 'Role-play scenarios', 'Final assessment']
        }
      ]
    },
    {
      id: 2,
      title: 'Online Intermediate Vietnamese',
      description: 'Improve your Vietnamese language skills with our interactive online intermediate course. Focus on grammar, vocabulary expansion, and conversation practice.',
      longDescription: `
        <p>Our Online Intermediate Vietnamese course is designed for students who have completed a beginner course or have equivalent knowledge of Vietnamese. This interactive online course will help you advance your language skills and gain confidence in more complex conversations.</p>
        
        <p>Throughout this 10-week course, you will:</p>
        <ul>
          <li>Expand your vocabulary significantly</li>
          <li>Master more complex grammar structures</li>
          <li>Improve your listening comprehension</li>
          <li>Engage in extended conversations</li>
          <li>Develop reading and writing skills</li>
          <li>Deepen your understanding of Vietnamese culture</li>
        </ul>
        
        <p>By the end of the course, you will be able to discuss a variety of topics, express opinions, describe past experiences, make future plans, and navigate more complex social situations with increased fluency.</p>
        
        <p>Our online platform provides interactive lessons, video conferences with native teachers, and plenty of opportunities for practice through assignments and group discussions. The course includes both synchronous sessions and self-paced activities to accommodate different learning styles and schedules.</p>
      `,
      image: '/placeholder.jpg',
      level: 'intermediate',
      format: 'online',
      type: 'individual',
      price: '$250',
      duration: '10 weeks',
      schedule: 'Mondays and Wednesdays, 7:00 PM - 8:30 PM (Online)',
      startDate: 'October 2, 2023',
      location: 'Zoom (link provided upon registration)',
      instructor: 'Mr. Tuan Pham',
      maxStudents: 10,
      prerequisites: 'Completion of beginner course or equivalent knowledge',
      materials: 'Digital materials provided',
      slug: 'online-intermediate-vietnamese',
      syllabus: [
        {
          week: 1,
          title: 'Review and Assessment',
          topics: ['Review of beginner concepts', 'Assessment of current skills', 'Setting learning goals']
        },
        {
          week: 2,
          title: 'Advanced Conversations',
          topics: ['Complex sentence structures', 'Conversation strategies', 'Expressing opinions']
        }
      ]
    }
  ]
  
  return courses.find(course => course.slug === slug)
}

export async function generateMetadata({
  params: { locale, slug },
}: CourseDetailPageProps): Promise<Metadata> {
  const t = getTranslations(locale)
  const course = getCourseBySlug(slug)
  
  if (!course) {
    return {
      title: 'Course Not Found',
    }
  }
  
  return {
    title: `${course.title} | ${t.common.brand}`,
    description: course.description,
  }
}

export default function CourseDetailPage({
  params: { locale, slug },
}: CourseDetailPageProps) {
  const t = getTranslations(locale)
  const course = getCourseBySlug(slug)
  
  if (!course) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <section className="mb-12">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <Image
                src={course.image}
                alt={course.title}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
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
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: colors.darkOlive }}
              >
                {course.title}
              </h1>
              <p className="mb-6">{course.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-sm">Duration</h3>
                  <p>{course.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Price</h3>
                  <p>{course.price}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Start Date</h3>
                  <p>{course.startDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Schedule</h3>
                  <p>{course.schedule}</p>
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
              dangerouslySetInnerHTML={{ __html: course.longDescription }}
            />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 
              className="text-xl font-bold mb-4"
              style={{ color: colors.darkOlive }}
            >
              Course Syllabus
            </h2>
            <div className="space-y-4">
              {course.syllabus.map((week) => (
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
                <p>{course.instructor}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Location</h3>
                <p>{course.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Max Students</h3>
                <p>{course.maxStudents}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Prerequisites</h3>
                <p>{course.prerequisites}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Materials</h3>
                <p>{course.materials}</p>
              </div>
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