import { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Image from 'next/image'

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

  // Sample activities data - would come from CMS in production
  const activities = [
    {
      id: 1,
      title: 'Vietnamese Cultural Festival',
      date: '2023-10-15',
      description: 'Annual cultural festival celebrating Vietnamese traditions, food, music, and art.',
      image: '/placeholder.jpg',
      category: 'Cultural Event'
    },
    {
      id: 2,
      title: 'Language Exchange Meetup',
      date: '2023-11-05',
      description: 'Monthly language exchange event for students to practice Vietnamese with native speakers.',
      image: '/placeholder.jpg',
      category: 'Language Practice'
    },
    {
      id: 3,
      title: 'Vietnamese Cooking Workshop',
      date: '2023-11-20',
      description: 'Learn to cook traditional Vietnamese dishes while practicing language skills.',
      image: '/placeholder.jpg',
      category: 'Workshop'
    },
    {
      id: 4,
      title: 'Field Trip to Vietnamese Museum',
      date: '2023-12-10',
      description: 'Educational visit to a museum showcasing Vietnamese history and culture.',
      image: '/placeholder.jpg',
      category: 'Field Trip'
    },
    {
      id: 5,
      title: 'Vietnamese New Year Celebration',
      date: '2024-01-25',
      description: 'Tết celebration with traditional customs, performances, and food.',
      image: '/placeholder.jpg',
      category: 'Cultural Event'
    },
    {
      id: 6,
      title: 'Vietnamese Film Screening',
      date: '2024-02-15',
      description: 'Screening of award-winning Vietnamese films with discussion in Vietnamese.',
      image: '/placeholder.jpg',
      category: 'Cultural Event'
    }
  ]

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
      <section className="mb-16">
        <div 
          className="relative rounded-lg overflow-hidden"
          style={{ backgroundColor: colors.lightCream }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <div className="absolute inset-0 bg-black/20 z-10 flex items-center justify-center md:hidden">
                <h2 className="text-white text-2xl font-bold px-4 text-center">
                  Upcoming: Vietnamese Cultural Festival
                </h2>
              </div>
              <Image
                src="/placeholder.jpg"
                alt="Vietnamese Cultural Festival"
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
                Upcoming: Vietnamese Cultural Festival
              </h2>
              <p className="text-sm mb-4">October 15, 2023</p>
              <p className="mb-6">
                Join us for our annual Vietnamese Cultural Festival! Experience traditional Vietnamese 
                culture through food, music, dance, and art. This event is open to students, families, 
                and the community.
              </p>
              <button 
                className="px-6 py-2 rounded-md text-white"
                style={{ backgroundColor: colors.primary }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="mb-16">
        <h2 
          className="text-2xl font-bold mb-8 text-center"
          style={{ color: colors.darkOlive }}
        >
          Recent & Upcoming Activities
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div 
                  className="absolute top-0 right-0 m-2 px-2 py-1 text-xs rounded"
                  style={{ backgroundColor: colors.secondary, color: colors.darkOlive }}
                >
                  {activity.category}
                </div>
              </div>
              <div className="p-4">
                <h3 
                  className="font-bold text-lg mb-2"
                  style={{ color: colors.darkOlive }}
                >
                  {activity.title}
                </h3>
                <p className="text-sm mb-3">{formatDate(activity.date)}</p>
                <p className="text-sm mb-4 line-clamp-3">{activity.description}</p>
                <button 
                  className="text-white px-4 py-2 rounded-md text-sm"
                  style={{ backgroundColor: colors.primary }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
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
            <button 
              className="px-6 py-3 rounded-md text-white"
              style={{ backgroundColor: colors.primary }}
            >
              View Full Calendar
            </button>
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