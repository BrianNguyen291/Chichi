import React from 'react';
import Image from 'next/image';
import { Button } from './button';
import { ChevronRight, Clock, BarChart2, Users } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    features: string[];
    duration: string;
    level: string;
    price: string;
    image: string;
  };
  locale: string;
}

export function CourseCard({ course, locale }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Course Image with Overlay */}
      <div className="relative h-52 w-full group">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        
        {/* Level Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary-600/80 backdrop-blur-sm rounded-full">
            {course.level}
          </span>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>{course.duration}</span>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">{course.title}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-5 line-clamp-2">{course.description}</p>
        
        {/* Features */}
        <div className="mb-6 flex-grow">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">What you'll learn:</h4>
          <ul className="space-y-2">
            {course.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-sm">{feature}</span>
              </li>
            ))}
            {course.features.length > 3 && (
              <li className="text-primary-600 text-sm font-medium pl-7">+ {course.features.length - 3} more</li>
            )}
          </ul>
        </div>
        
        {/* Price and CTA */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-gray-500 block">Course Fee</span>
              <span className="text-2xl font-bold text-gray-900">{course.price}</span>
            </div>
            <div className="flex items-center bg-primary-50 px-3 py-1 rounded-full">
              <BarChart2 className="h-4 w-4 text-primary-600 mr-1.5" />
              <span className="text-sm text-primary-700 font-medium">{course.level}</span>
            </div>
          </div>
          
          <Button asChild size="default" className="w-full bg-primary-600 hover:bg-primary-700 transition-colors">
            <Link href={`/${locale}/contact?course=${encodeURIComponent(course.title)}`}>
              Enroll Now
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
