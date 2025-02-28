import { fetchPosts, fetchCategories } from '@/lib/wordpress/api';
import { Metadata } from 'next';
import { WP_CONFIG } from '@/lib/wordpress/config';
import SearchBar from '../../components/SearchBar';

export const revalidate = 60; // Revalidate every minute

interface BlogPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
    category?: string;
    search?: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = params.locale;
  const localizedConfig = WP_CONFIG.languages[locale as keyof typeof WP_CONFIG.languages];

  return {
    title: locale === 'zh-Hant' ? '美甲保養技巧與設計靈感 | Anne美甲美睫' : 'Nail Care Tips & Design Inspiration | Anne Nails',
    description: locale === 'zh-Hant' 
      ? '探索專業美甲師分享的美甲保養秘訣、最新設計趨勢和實用技巧。從基礎護理到時尚設計，讓您的指尖展現完美風采。'
      : 'Explore nail care secrets, latest design trends, and practical tips shared by professional nail artists.',
    keywords: locale === 'zh-Hant' 
      ? '美甲教學,指甲護理,美甲設計,台北美甲,美甲保養,指甲彩繪'
      : 'nail art tutorial,nail care,nail design,taipei nails,nail maintenance,nail painting',
    openGraph: {
      title: locale === 'zh-Hant' ? '美甲保養技巧與設計靈感 | Anne美甲美睫' : 'Nail Care Tips & Design Inspiration | Anne Nails',
      description: locale === 'zh-Hant'
        ? '探索專業美甲師分享的美甲保養秘訣、最新設計趨勢和實用技巧。'
        : 'Explore nail care secrets, latest design trends, and practical tips.',
      type: 'website',
      locale: localizedConfig.locale,
      url: `${WP_CONFIG.siteUrl}/${locale}/blog`,
    },
    alternates: {
      canonical: `${WP_CONFIG.siteUrl}/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const search = searchParams.search;
  const postsPerPage = WP_CONFIG.postsPerPage;

  // Fetch posts and categories
  const [posts, categories] = await Promise.all([
    fetchPosts({
      page: currentPage,
      per_page: postsPerPage,
      categories: category ? [category] : undefined,
      search,
    }),
    fetchCategories(),
  ]);

  // Filter and sort posts if needed
  const filteredPosts = posts;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-[#FDF8F7]">
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <a href={`/${params.locale}`} className="text-gray-600 hover:text-[#C4A86D]">
            {params.locale === 'zh-Hant' ? '首頁' : 'Home'}
          </a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">
            {params.locale === 'zh-Hant' ? '部落格' : 'Blog'}
          </span>
        </nav>

        {/* Page Title */}
        <h1 className="text-4xl font-serif font-bold text-center mb-12">
          {params.locale === 'zh-Hant' ? '美甲保養與設計靈感' : 'Nail Care & Design Inspiration'}
        </h1>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <SearchBar 
            placeholder={params.locale === 'zh-Hant' ? '搜尋文章...' : 'Search articles...'}
            initialValue={search}
          />
        </div>

        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-4 mb-12 text-sm border-b border-[#E5D1CA] pb-4">
          <a
            href={`/${params.locale}/blog`}
            className={`pb-3 px-4 transition-colors rounded-full ${
              !category ? 'bg-[#C4A86D] text-white' : 'text-gray-600 hover:text-[#C4A86D]'
            }`}
          >
            {params.locale === 'zh-Hant' ? '全部分類' : 'All Categories'}
          </a>
          {categories.map((cat) => (
            <a
              key={cat.id}
              href={`/${params.locale}/blog?category=${cat.id}`}
              className={`pb-3 px-4 transition-colors rounded-full ${
                category === cat.id ? 'bg-[#C4A86D] text-white' : 'text-gray-600 hover:text-[#C4A86D]'
              }`}
            >
              {cat.name}
            </a>
          ))}
        </div>

        {/* No Results Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {params.locale === 'zh-Hant' 
                ? '找不到相關文章'
                : 'No articles found'
              }
            </p>
            <a 
              href={`/${params.locale}/blog`}
              className="mt-4 text-[#C4A86D] hover:underline inline-block"
            >
              {params.locale === 'zh-Hant' 
                ? '清除搜尋條件'
                : 'Clear search filters'
              }
            </a>
          </div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <a href={`/${params.locale}/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={post.featured_media}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#FCF2EF] flex items-center justify-center mr-3">
                        <span className="text-[#C4A86D] text-sm">AN</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Anne Nails</p>
                        <time className="text-gray-500 text-sm" dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(
                            params.locale === 'zh-Hant' ? 'zh-TW' : 'en-US'
                          )}
                        </time>
                      </div>
                    </div>
                    <h2 
                      className="text-xl font-semibold mb-2 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <div 
                      className="text-gray-600 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    />
                    <span className="text-[#C4A86D] text-sm hover:underline">
                      {params.locale === 'zh-Hant' ? '閱讀更多 →' : 'Read more →'}
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <a
                key={page}
                href={`/${params.locale}/blog?page=${page}${category ? `&category=${category}` : ''}${search ? `&search=${search}` : ''}`}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? 'bg-[#C4A86D] text-white'
                    : 'bg-[#FCF2EF] hover:bg-[#E5D1CA] text-gray-700'
                }`}
              >
                {page}
              </a>
            ))}
          </div>
        )}

        {/* Results count */}
        {filteredPosts.length > 0 && (
          <div className="text-center mt-4 text-sm text-gray-500">
            {params.locale === 'zh-Hant' ? (
              <>
                第 {currentPage} 頁，共 {totalPages} 頁
                （顯示第 {(currentPage - 1) * postsPerPage + 1} - {Math.min(currentPage * postsPerPage, filteredPosts.length)} 篇，
                共 {filteredPosts.length} 篇文章）
              </>
            ) : (
              <>
                Page {currentPage} of {totalPages}
                (Showing {(currentPage - 1) * postsPerPage + 1} - {Math.min(currentPage * postsPerPage, filteredPosts.length)} of {filteredPosts.length} articles)
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 