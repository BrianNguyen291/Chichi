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
    <div className="relative flex flex-col p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full">
      {/* Quote mark decoration */}
      <div className="absolute -top-4 right-4 text-6xl text-[#b17f4a]/20">"</div>
      
      {/* Profile section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#f5e6d3]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 64px) 100vw, 64px"
          />
        </div>
        <div>
          <h4 className="font-semibold text-lg text-[#2A5C3F]">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? 'text-[#b17f4a] fill-[#b17f4a]'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow">
        <blockquote className="text-gray-700 italic text-sm leading-relaxed line-clamp-6 hover:line-clamp-none transition-all duration-300">
          {content}
        </blockquote>
      </div>

      {/* Language tag */}
      <div className="mt-4 self-end">
        <span className="px-3 py-1 text-xs rounded-full bg-[#2A5C3F]/10 text-[#2A5C3F] font-medium">
          {language}
        </span>
      </div>
    </div>
  );
} 