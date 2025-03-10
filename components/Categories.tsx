import { TranslatedCategory } from '@/lib/wordpress-api';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface CategoriesProps {
  categories: TranslatedCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  const router = useRouter();
  const { locale } = router;

  return (
    <nav className="categories-nav">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Link 
              href={`/category/${category.slug}`}
              className="hover:text-primary transition-colors"
            >
              {category.translatedName}
              {category.count > 0 && (
                <span className="text-sm text-gray-500 ml-2">
                  ({category.count})
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 