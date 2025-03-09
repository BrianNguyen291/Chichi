import { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'

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
            {/* This would be populated from CMS */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">A1 Level Practice Test</h3>
              <p className="text-sm mb-3">Basic Vietnamese proficiency practice test</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Download PDF
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">A2 Level Practice Test</h3>
              <p className="text-sm mb-3">Elementary Vietnamese proficiency practice test</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Download PDF
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">B1 Level Practice Test</h3>
              <p className="text-sm mb-3">Intermediate Vietnamese proficiency practice test</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Download PDF
              </button>
            </div>
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