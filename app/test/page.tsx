import { getPosts } from '@/lib/wordpress';

export const revalidate = 60; // Revalidate every minute

export default async function TestPage() {
  try {
    const posts = await getPosts({ per_page: 5 });
    
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Recent Posts</h1>
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">
                {post.title.rendered}
              </h2>
              <div 
                className="mt-2 prose"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
              />
            </article>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>Failed to load posts. Please try again later.</p>
      </div>
    );
  }
} 