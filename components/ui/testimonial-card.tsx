import Image from 'next/image';
import { Star } from 'lucide-react';

export interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  language: string;
}

export function TestimonialCard({
  name,
  role,
  content,
  rating,
  image,
  language,
}: TestimonialProps) {
  return (
    <div className="relative flex flex-col p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      {/* Quote mark decoration */}
      <div className="absolute -top-4 right-4 text-6xl text-primary/10">"</div>
      
      {/* Profile section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 64px) 100vw, 64px"
          />
        </div>
        <div>
          <h4 className="font-semibold text-lg">{name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 dark:text-gray-300 italic">
        {content}
      </blockquote>

      {/* Language tag */}
      <div className="mt-4 self-end">
        <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
          {language}
        </span>
      </div>
    </div>
  );
} 