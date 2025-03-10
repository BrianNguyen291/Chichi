import { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'
import { getLibraryResources, getStrapiMedia, getStrapiImageAlt, getStrapiFile } from '@/lib/strapi'
import { StrapiData, StrapiLibraryResource } from '@/lib/strapi/types'

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
  
  // Fetch library resources
  let practiceMaterials: StrapiData<StrapiLibraryResource>[] = []
  let vocabularyResources: StrapiData<StrapiLibraryResource>[] = []
  let grammarResources: StrapiData<StrapiLibraryResource>[] = []
  
  try {
    // Fetch practice materials
    const practiceMaterialsData = await getLibraryResources(locale, 1, 3, {
      type: {
        $eq: 'practice_material'
      }
    })
    practiceMaterials = practiceMaterialsData.data
    
    // Fetch vocabulary resources
    const vocabularyResourcesData = await getLibraryResources(locale, 1, 3, {
      type: {
        $eq: 'vocabulary'
      }
    })
    vocabularyResources = vocabularyResourcesData.data
    
    // Fetch grammar resources
    const grammarResourcesData = await getLibraryResources(locale, 1, 3, {
      type: {
        $eq: 'grammar'
      }
    })
    grammarResources = grammarResourcesData.data
  } catch (error) {
    console.error('Error fetching library resources:', error)
  }

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
            {practiceMaterials.length > 0 ? (
              practiceMaterials.map((resource) => (
                <div 
                  key={resource.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-2">{resource.attributes.title}</h3>
                  <p className="text-sm mb-3">{resource.attributes.description}</p>
                  {resource.attributes.file.data && (
                    <a 
                      href={getStrapiFile(resource.attributes.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white px-4 py-2 rounded-md inline-block"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p>No practice materials available yet. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link 
              href={`/${locale}/library/practice-materials`}
              className="text-[#b17f4a] hover:underline"
            >
              View all practice materials
            </Link>
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
            {vocabularyResources.length > 0 ? (
              vocabularyResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-2">{resource.attributes.title}</h3>
                  <p className="text-sm mb-3">{resource.attributes.description}</p>
                  <Link 
                    href={`/${locale}/library/vocabulary/${resource.attributes.slug}`}
                    className="text-white px-4 py-2 rounded-md inline-block"
                    style={{ backgroundColor: colors.primary }}
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p>No vocabulary collections available yet. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link 
              href={`/${locale}/library/vocabulary`}
              className="text-[#b17f4a] hover:underline"
            >
              View all vocabulary collections
            </Link>
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
            {grammarResources.length > 0 ? (
              grammarResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-2">{resource.attributes.title}</h3>
                  <p className="text-sm mb-3">{resource.attributes.description}</p>
                  <Link 
                    href={`/${locale}/library/grammar/${resource.attributes.slug}`}
                    className="text-white px-4 py-2 rounded-md inline-block"
                    style={{ backgroundColor: colors.primary }}
                  >
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p>No grammar guides available yet. Check back soon!</p>
              </div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Link 
              href={`/${locale}/library/grammar`}
              className="text-[#b17f4a] hover:underline"
            >
              View all grammar guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
} 