import { Metadata } from 'next'
import { getCategories, getPostsByCategory } from '@/lib/wordpress/api'
import { getTranslations } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { colors } from '@/lib/colors'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export async function generateMetadata({
  params: { locale, slug },
}: CategoryPageProps): Promise<Metadata> {
  const t = getTranslations(locale)
  
  try {
    const categories = await getCategories()
    const category = categories.find(cat => cat.slug === slug)
    
    if (!category) {
      return {
        title: 'Category Not Found',
      }
    }
    
    return {
      title: `${category.name} | ${t.common.brand}`,
      description: category.description || `Browse all posts in ${category.name}`,
    }
  } catch (error) {
    console.error('Error fetching category for metadata:', error)
    return {
      title: 'Category',
      description: 'Category posts',
    }
  }
}

export default async function CategoryPage({
  params: { locale, slug },
}: CategoryPageProps) {
  const t = getTranslations(locale)
  
  try {
    // Get category info
    const categories = await getCategories()
    const category = categories.find(cat => cat.slug === slug)
    
    if (!category) {
      notFound()
    }
    
    // Get posts for this category
    const posts = await getPostsByCategory(category.id)
    
    return (
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h1 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: colors.darkOlive }}
          >
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg mb-8">{category.description}</p>
          )}
        </section>

        {/* Posts Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h2 
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.darkOlive }}
                  >
                    <Link href={`/${locale}/post/${post.slug}`}>
                      <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    </Link>
                  </h2>
                  <div 
                    className="prose prose-sm mb-4"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="flex justify-between items-center text-sm">
                    <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                    <Link
                      href={`/${locale}/post/${post.slug}`}
                      className="text-[#b17f4a] hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p>No posts found in this category.</p>
            </div>
          )}
        </section>
      </main>
    )
  } catch (error) {
    console.error('Error in CategoryPage:', error)
    notFound()
  }
} 