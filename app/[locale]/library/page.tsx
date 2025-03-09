import { Metadata } from 'next'
import { getTranslations, useTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = getTranslations(locale)
  
  return {
    title: `${t.common.library} | ${t.common.brand}`,
    description: 'Access our comprehensive library of Vietnamese language resources, practice materials, vocabulary lists, and grammar guides.',
  }
}

export default async function LibraryPage({
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
          {t.common.library}
        </h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          Access our comprehensive collection of Vietnamese language learning resources.
        </p>
      </section>

      {/* Practice Materials Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Practice Materials
          </h2>
          <p className="mb-6">
            Download practice materials to enhance your Vietnamese language skills. Our collection includes exercises for all proficiency levels.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* This would be populated from CMS */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Beginner Practice Set</h3>
              <p className="text-sm mb-3">Basic vocabulary and grammar exercises for beginners</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Download PDF
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Intermediate Practice Set</h3>
              <p className="text-sm mb-3">Comprehensive exercises for intermediate learners</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Download PDF
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Advanced Practice Set</h3>
              <p className="text-sm mb-3">Complex exercises for advanced Vietnamese learners</p>
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

      {/* Vocabulary Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Vocabulary Collections
          </h2>
          <p className="mb-6">
            Explore our comprehensive vocabulary lists organized by topics and difficulty levels.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* This would be populated from CMS */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Daily Conversations</h3>
              <p className="text-sm mb-3">Essential vocabulary for everyday conversations</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                View Details
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Business Vietnamese</h3>
              <p className="text-sm mb-3">Professional vocabulary for business contexts</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                View Details
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Academic Terms</h3>
              <p className="text-sm mb-3">Academic and educational vocabulary</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grammar Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ color: colors.primary }}
          >
            Grammar Guides
          </h2>
          <p className="mb-6">
            Master Vietnamese grammar with our comprehensive guides and explanations.
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* This would be populated from CMS */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Basic Sentence Structure</h3>
              <p className="text-sm mb-3">Learn the fundamentals of Vietnamese sentence construction</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Read More
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Verb Tenses</h3>
              <p className="text-sm mb-3">Comprehensive guide to Vietnamese verb tenses and usage</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Read More
              </button>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Particles and Classifiers</h3>
              <p className="text-sm mb-3">Understanding Vietnamese particles and classifiers</p>
              <button 
                className="text-white px-4 py-2 rounded-md"
                style={{ backgroundColor: colors.primary }}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 