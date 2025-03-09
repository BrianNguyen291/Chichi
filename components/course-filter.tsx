'use client'

import { useState } from 'react'
import { colors } from '@/lib/colors'
import { X } from 'lucide-react'

interface Tag {
  id: string
  name: string
}

interface CourseFilterProps {
  tags: Tag[]
  selectedTags: string[]
  onTagSelect: (tagId: string) => void
  onTagRemove: (tagId: string) => void
  onClearFilters: () => void
}

export function CourseFilter({
  tags,
  selectedTags,
  onTagSelect,
  onTagRemove,
  onClearFilters
}: CourseFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="font-medium">Filter by:</span>
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => onTagSelect(tag.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedTags.includes(tag.id)
                ? 'text-white'
                : 'hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: selectedTags.includes(tag.id) ? colors.primary : 'transparent',
              border: `1px solid ${selectedTags.includes(tag.id) ? colors.primary : colors.secondary}`
            }}
          >
            {tag.name}
          </button>
        ))}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm">Active filters:</span>
          {selectedTags.map((tagId) => {
            const tag = tags.find((t) => t.id === tagId)
            if (!tag) return null
            
            return (
              <div 
                key={tagId}
                className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-gray-100"
              >
                {tag.name}
                <button
                  onClick={() => onTagRemove(tagId)}
                  className="p-0.5 rounded-full hover:bg-gray-200"
                >
                  <X size={14} />
                </button>
              </div>
            )
          })}
          
          <button
            onClick={onClearFilters}
            className="text-sm underline"
            style={{ color: colors.primary }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
} 