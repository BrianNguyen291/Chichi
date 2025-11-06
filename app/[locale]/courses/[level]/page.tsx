"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { colors } from "@/lib/colors"
import { ArrowLeft, X } from "lucide-react"

const levelTranslations: Record<string, Record<string, string>> = {
  en: {
    A0: "A0 - Starter Level",
    A1: "A1 - Beginner Foundation",
    A2: "A2 - Elementary Level",
    B1: "B1 - Intermediate Level",
    B2: "B2 - Upper Intermediate",
    C1: "C1 - Advanced Level",
    C2: "C2 - Mastery Level",
    backToCourses: "Back to Courses",
  },
  "zh-Hant": {
    A0: "A0 - 零基礎",
    A1: "A1 - 初級基礎",
    A2: "A2 - 初級程度",
    B1: "B1 - 中級程度",
    B2: "B2 - 中高級",
    C1: "C1 - 高級程度",
    C2: "C2 - 精通程度",
    backToCourses: "返回課程",
  },
  "zh-Hans": {
    A0: "A0 - 零基础",
    A1: "A1 - 初级基础",
    A2: "A2 - 初级程度",
    B1: "B1 - 中级程度",
    B2: "B2 - 中高级",
    C1: "C1 - 高级程度",
    C2: "C2 - 精通程度",
    backToCourses: "返回课程",
  },
}

export default function LevelPage() {
  const params = useParams()
  const locale = (params.locale as string) || "zh-Hant"
  const level = (params.level as string).toUpperCase()
  const [imageList, setImageList] = useState<string[]>([])
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  // Determine variant based on locale
  const variant = locale === 'zh-Hans' ? 'G' : locale === 'zh-Hant' ? 'P' : 'G'
  const folderBase = `/images/courses/${level}${variant}`

  useEffect(() => {
    setIsLoading(true)
    // Generate potential image paths (check PNG first, then JPG)
    const candidates = [
      `${folderBase}/1.png`, `${folderBase}/2.png`, `${folderBase}/3.png`,
      `${folderBase}/4.png`, `${folderBase}/5.png`, `${folderBase}/6.png`,
      `${folderBase}/7.png`, `${folderBase}/8.png`,
      `${folderBase}/1.jpg`, `${folderBase}/2.jpg`, `${folderBase}/3.jpg`,
      `${folderBase}/4.jpg`, `${folderBase}/5.jpg`, `${folderBase}/6.jpg`,
      `${folderBase}/7.jpg`, `${folderBase}/8.jpg`,
    ]

    // Try to load images and filter out failed ones
    const imagePromises = candidates.map(async (src) => {
      return new Promise<string | null>((resolve) => {
        const img = new window.Image()
        img.onload = () => resolve(src)
        img.onerror = () => resolve(null)
        img.src = src
      })
    })

    Promise.all(imagePromises).then((results) => {
      const existingImages = results.filter((img): img is string => img !== null)
      setImageList(existingImages)
      setIsLoading(false)
    })
  }, [folderBase])

  const openLightbox = (index: number) => {
    setLightboxImages(imageList)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImages(null)
    setLightboxIndex(0)
  }

  const showPrev = () => {
    if (!lightboxImages) return
    setLightboxIndex((i) => {
      const nextIndex = i - 1
      if (nextIndex < 0) return lightboxImages.length - 1
      return nextIndex
    })
  }

  const showNext = () => {
    if (!lightboxImages) return
    setLightboxIndex((i) => {
      const nextIndex = i + 1
      if (nextIndex > (lightboxImages.length - 1)) return 0
      return nextIndex
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!lightboxImages) return
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') showPrev()
        if (e.key === 'ArrowRight') showNext()
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [lightboxImages])

  const t = levelTranslations[locale as keyof typeof levelTranslations] || levelTranslations.en
  const levelTitle = t[level] || level

  return (
    <main className="min-h-screen bg-[#f8f6f0] pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/${locale}/courses`}
            className="inline-flex items-center gap-2 text-sm mb-4 hover:text-[#b17f4a] transition-colors"
            style={{ color: colors.darkOlive }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToCourses}
          </Link>
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ color: colors.darkOlive }}
          >
            {levelTitle}
          </h1>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#b17f4a]"></div>
              <p className="mt-4 text-gray-600">Loading images...</p>
            </div>
          </div>
        )}

        {/* No Images */}
        {!isLoading && imageList.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">No images found for this level.</p>
          </div>
        )}

        {/* Image Gallery */}
        {!isLoading && imageList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {imageList.map((src, index) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative w-full flex items-center justify-center bg-gray-50" style={{ minHeight: '250px', maxHeight: '500px' }}>
                  <Image
                    src={src}
                    alt={`${levelTitle} image ${index + 1}`}
                    width={500}
                    height={500}
                    className="max-w-full max-h-full w-auto h-auto object-contain group-hover:opacity-90 transition-opacity duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxImages && (
          <div
            className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-20"
              onClick={closeLightbox}
            >
              <X className="h-8 w-8" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 flex items-center justify-center z-20"
              onClick={(e) => {
                e.stopPropagation()
                showPrev()
              }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 flex items-center justify-center z-20"
              onClick={(e) => {
                e.stopPropagation()
                showNext()
              }}
            >
              ›
            </button>
            <div
              className="relative max-w-[95vw] max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-[90vw] md:w-[80vw] h-[70vh]">
                <Image
                  src={lightboxImages[lightboxIndex]}
                  alt={`${levelTitle} image ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              {lightboxImages.length > 1 && (
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white text-center">
                  <div className="text-sm">
                    {lightboxIndex + 1} / {lightboxImages.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

