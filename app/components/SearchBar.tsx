'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  placeholder: string;
  initialValue?: string;
}

export default function SearchBar({ placeholder, initialValue = '' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to first page when searching
    
    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  }, 300);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={initialValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#C4A86D] focus:border-transparent"
      />
      <svg 
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
          isPending ? 'text-[#C4A86D]' : 'text-gray-400'
        }`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
        />
      </svg>
      {isPending && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#C4A86D] border-t-transparent" />
        </div>
      )}
    </div>
  );
} 