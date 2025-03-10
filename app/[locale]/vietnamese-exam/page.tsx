import { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'
import { getVietnameseExams, getStrapiMedia, getStrapiImageAlt } from '@/lib/strapi'
import { StrapiData, StrapiVietnameseExam } from '@/lib/strapi/types'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = getTranslations(locale)
  
  return {
    title: `${t.common.vietnameseExam} | ${t.common.brand}`,
    description: 'Information about Vietnamese language exams, practice tests, and registration procedures in Vietnam.',
  }
}

export default async function VietnameseExamPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const t = getTranslations(locale)
  
  // Fetch Vietnamese exams
  let exams: StrapiData<StrapiVietnameseExam>[] = []
  let featuredExam: StrapiData<StrapiVietnameseExam> | null = null
  
  try {
    // Fetch featured exam
    const featuredExamData = await getVietnameseExams(locale, 1, 1, {
      featured: {
        $eq: true
      }
    })
    
    if (featuredExamData.data.length > 0) {
      featuredExam = featuredExamData.data[0]
    }
    
    // Fetch other exams
    const examsData = await getVietnameseExams(locale, 1, 3, {
      featured: {
        $ne: true
      }
    })
    
    exams = examsData.data
  } catch (error) {
    console.error('Error fetching Vietnamese exams:', error)
  }

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(locale, options)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          style={{ color: colors.darkOlive }}
        >
          {t.common.vietnameseExam}
        </h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          Everything you need to know about Vietnamese language proficiency exams and how to prepare for them.
        </p>
      </section>

      {/* Featured Exam */}
      {featuredExam && (
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src={getStrapiMedia(featuredExam.attributes.image)}
                  alt={getStrapiImageAlt(featuredExam.attributes.image)}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div 
                  className="absolute top-4 right-4 px-3 py-1 text-sm rounded-full"
                  style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                >
                  Level {featuredExam.attributes.level}
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="mb-2">
                  <span 
                    className="inline-block px-3 py-1 text-sm rounded-full"
                    style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                  >
                    Featured Exam
                  </span>
                </div>
                <h2 
                  className="text-2xl font-bold mb-3"
                  style={{ color: colors.darkOlive }}
                >
                  {featuredExam.attributes.title}
                </h2>
                <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  <div>
                    <span className="font-semibold">Exam Date:</span>
                    <p>{formatDate(featuredExam.attributes.examDate)}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Registration Deadline:</span>
                    <p>{formatDate(featuredExam.attributes.registrationDeadline)}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Fee:</span>
                    <p>{featuredExam.attributes.fee}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span>
                    <p>{featuredExam.attributes.location}</p>
                  </div>
                </div>
                <p className="mb-6">{featuredExam.attributes.description}</p>
                <Link 
                  href={`/${locale}/vietnamese-exam/${featuredExam.attributes.slug}`}
                  className="inline-block text-white px-6 py-2 rounded-md"
                  style={{ backgroundColor: colors.primary }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Exam Materials Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Exam Materials
          </h2>
          <p className="mb-6">
            Access practice tests and study materials to help you prepare for Vietnamese language proficiency exams.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exams.length > 0 ? (
              exams.map((exam) => (
                <div 
                  key={exam.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{exam.attributes.title}</h3>
                    <span 
                      className="px-2 py-0.5 text-xs rounded-full"
                      style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                    >
                      Level {exam.attributes.level}
                    </span>
                  </div>
                  <p className="text-sm mb-3">{exam.attributes.description}</p>
                  <Link 
                    href={`/${locale}/vietnamese-exam/${exam.attributes.slug}`}
                    className="text-white px-4 py-2 rounded-md inline-block"
                    style={{ backgroundColor: colors.primary }}
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p>No exam materials available yet. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link 
              href={`/${locale}/vietnamese-exam/materials`}
              className="text-[#b17f4a] hover:underline"
            >
              View all exam materials
            </Link>
          </div>
        </div>
      </section>

      {/* Registration Information Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Exam Registration Information
          </h2>
          <p className="mb-6">
            Learn about the registration process for Vietnamese language proficiency exams in Vietnam.
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Exam Centers</h3>
            <p className="mb-4">
              Vietnamese language proficiency exams are conducted at the following centers in Vietnam:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Vietnam National University, Hanoi</li>
              <li>University of Social Sciences and Humanities, Ho Chi Minh City</li>
              <li>Hue University</li>
              <li>Da Nang University</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Registration Process</h3>
            <p className="mb-4">
              Follow these steps to register for a Vietnamese language proficiency exam:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Check the exam schedule on the official website</li>
              <li>Complete the online registration form</li>
              <li>Pay the examination fee</li>
              <li>Receive confirmation email with exam details</li>
              <li>Prepare required documents for the exam day</li>
            </ol>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3">Required Documents</h3>
            <p className="mb-4">
              On the day of the exam, you need to bring the following documents:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Valid passport or ID card</li>
              <li>Exam registration confirmation</li>
              <li>Receipt of payment</li>
              <li>Two passport-sized photos</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Exam Fees</h3>
            <p className="mb-4">
              The examination fees vary depending on the level:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Level</th>
                    <th className="py-2 px-4 text-left">Fee (VND)</th>
                    <th className="py-2 px-4 text-left">Fee (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 px-4">A1</td>
                    <td className="py-2 px-4">1,000,000</td>
                    <td className="py-2 px-4">~$40</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">A2</td>
                    <td className="py-2 px-4">1,200,000</td>
                    <td className="py-2 px-4">~$50</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">B1</td>
                    <td className="py-2 px-4">1,500,000</td>
                    <td className="py-2 px-4">~$60</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 px-4">B2</td>
                    <td className="py-2 px-4">1,800,000</td>
                    <td className="py-2 px-4">~$75</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4">C1</td>
                    <td className="py-2 px-4">2,000,000</td>
                    <td className="py-2 px-4">~$85</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 