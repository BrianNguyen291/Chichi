import { GetStaticProps } from 'next';
import { Categories } from '@/components/Categories';
import { getCategories, TranslatedCategory } from '@/lib/wordpress-api';

interface CategoryPageProps {
  categories: TranslatedCategory[];
}

export default function CategoryPage({ categories }: CategoryPageProps) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      <Categories categories={categories} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  const categories = await getCategories(locale);
  
  return {
    props: {
      categories,
    },
    revalidate: 60 * 60, // Revalidate every hour
  };
}; 