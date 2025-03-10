import { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'
import Link from 'next/link'
import { getActivities, getStrapiMedia, getStrapiImageAlt } from '@/lib/strapi'
import { StrapiData, StrapiActivity } from '@/lib/strapi/types'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const t = getTranslations(locale)
  
  return {
    title: `${t.common.activities} | ${t.common.brand}`,
    description: 'Explore our school activities, cultural events, and community engagement programs.',
  }
}

export default async function ActivitiesPage({
  params: { locale },
}: {
  params: { locale: Locale }
}) {
  const t = getTranslations(locale)
  
  // Fetch activities
  let activities: StrapiData<StrapiActivity>[] = []
  let featuredActivity: StrapiData<StrapiActivity> | null = null
  
  try {
    // Fetch featured activity
    const featuredActivityData = await getActivities(locale, 1, 1, {
      featured: {
        $eq: true
      }
    })
    
    if (featuredActivityData.data.length > 0) {
      featuredActivity = featuredActivityData.data[0]
    }
    
    // Fetch other activities
    const activitiesData = await getActivities(locale, 1, 6, {
      featured: {
        $ne: true
      }
    })
    
    activities = activitiesData.data
  } catch (error) {
    console.error('Error fetching activities:', error)
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
          {t.common.activities}
        </h1>
        <p className="text-lg text-center max-w-3xl mx-auto mb-8">
          Discover our school activities, cultural events, and community engagement programs.
        </p>
      </section>

      {/* Featured Activity */}
      {featuredActivity && (
        <section className="mb-16">
          <div 
            className="relative rounded-lg overflow-hidden"
            style={{ backgroundColor: colors.lightCream }}
          >
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center md:hidden">
                  <h2 className="text-white text-2xl font-bold px-4 text-center">
                    {featuredActivity.attributes.title}
                  </h2>
                </div>
                <Image
                  src={getStrapiMedia(featuredActivity.attributes.image)}
                  alt={getStrapiImageAlt(featuredActivity.attributes.image)}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <div className="mb-2">
                  <span 
                    className="inline-block px-3 py-1 text-sm rounded-full"
                    style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                  >
                    Featured Event
                  </span>
                </div>
                <h2 
                  className="text-2xl md:text-3xl font-bold mb-3 hidden md:block"
                  style={{ color: colors.darkOlive }}
                >
                  {featuredActivity.attributes.title}
                </h2>
                <p className="text-sm mb-4">{formatDate(featuredActivity.attributes.date)}</p>
                <p className="mb-6">{featuredActivity.attributes.description}</p>
                <Link 
                  href={`/${locale}/activities/${featuredActivity.attributes.slug}`}
                  className="px-6 py-2 rounded-md text-white"
                  style={{ backgroundColor: colors.primary }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Activities Grid */}
      <section className="mb-16">
        <h2 
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: colors.darkOlive }}
        >
          Recent & Upcoming Activities
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div 
                key={activity.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={getStrapiMedia(activity.attributes.image)}
                    alt={getStrapiImageAlt(activity.attributes.image)}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div 
                    className="absolute top-0 right-0 m-2 px-2 py-1 text-xs rounded"
                    style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                  >
                    {activity.attributes.category.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </div>
                </div>
                <div className="p-4">
                  <h3 
                    className="font-bold text-lg mb-2"
                    style={{ color: colors.darkOlive }}
                  >
                    {activity.attributes.title}
                  </h3>
                  <p className="text-sm mb-3">{formatDate(activity.attributes.date)}</p>
                  <p className="text-sm mb-4 line-clamp-3">{activity.attributes.description}</p>
                  <Link 
                    href={`/${locale}/activities/${activity.attributes.slug}`}
                    className="text-white px-4 py-2 rounded-md text-sm"
                    style={{ backgroundColor: colors.primary }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p>No activities available yet. Check back soon!</p>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <Link 
            href={`/${locale}/activities/all`}
            className="text-[#b17f4a] hover:underline"
          >
            View all activities
          </Link>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: colors.darkOlive }}
          >
            Activities Calendar
          </h2>
          <p className="text-center mb-8">
            View our upcoming activities and events. Click on an event to see more details and register.
          </p>
          <div className="flex justify-center">
            <Link 
              href={`/${locale}/activities/calendar`}
              className="px-6 py-3 rounded-md text-white"
              style={{ backgroundColor: colors.primary }}
            >
              View Full Calendar
            </Link>
          </div>
        </div>
      </section>

      {/* Community Engagement */}
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: colors.darkOlive }}
          >
            Community Engagement
          </h2>
          <p className="text-center mb-8 max-w-3xl mx-auto">
            We believe in giving back to the community and creating opportunities for our students to practice 
            Vietnamese in real-world settings. Here are some of our community engagement programs:
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 
                className="font-bold text-lg mb-3"
                style={{ color: colors.primary }}
              >
                Volunteer Translation
              </h3>
              <p>
                Students help translate documents for local Vietnamese community organizations.
              </p>
            </div>
            <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 
                className="font-bold text-lg mb-3"
                style={{ color: colors.primary }}
              >
                Cultural Exchange
              </h3>
              <p>
                Regular cultural exchange events with local Vietnamese communities.
              </p>
            </div>
            <div className="border rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 
                className="font-bold text-lg mb-3"
                style={{ color: colors.primary }}
              >
                Language Partners
              </h3>
              <p>
                Pairing students with Vietnamese speakers for language practice and cultural exchange.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 