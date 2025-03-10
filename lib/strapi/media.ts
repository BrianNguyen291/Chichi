import { getStrapiURL } from './api'
import { StrapiImage, StrapiFile } from './types'

/**
 * Get the URL for a Strapi image
 * @param {StrapiImage} image Strapi image object
 * @param {string} format Image format (thumbnail, small, medium, large)
 * @returns {string} Image URL
 */
export function getStrapiMedia(image: StrapiImage, format: 'thumbnail' | 'small' | 'medium' | 'large' = 'medium'): string {
  if (!image?.data) {
    return '/placeholder.jpg'
  }

  const { url, formats } = image.data.attributes

  // If the image has the requested format, use it
  if (formats && formats[format]) {
    return getStrapiURL(formats[format].url)
  }

  // Otherwise, use the original image
  return getStrapiURL(url)
}

/**
 * Get the URL for a Strapi file
 * @param {StrapiFile} file Strapi file object
 * @returns {string} File URL
 */
export function getStrapiFile(file: StrapiFile): string {
  if (!file?.data) {
    return ''
  }

  return getStrapiURL(file.data.attributes.url)
}

/**
 * Get the alt text for a Strapi image
 * @param {StrapiImage} image Strapi image object
 * @returns {string} Alt text
 */
export function getStrapiImageAlt(image: StrapiImage): string {
  if (!image?.data) {
    return ''
  }

  return image.data.attributes.alternativeText || image.data.attributes.name || ''
} 