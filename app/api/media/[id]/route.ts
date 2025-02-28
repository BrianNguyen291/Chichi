import { getMedia } from '@/lib/wordpress';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const media = await getMedia(Number(params.id));
    const size = request.nextUrl.searchParams.get('size') || 'full';
    
    // Get the URL for the requested size
    const imageUrl = size === 'full' 
      ? media.source_url
      : media.media_details.sizes?.[size]?.source_url || media.source_url;

    // Proxy the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Return the image with appropriate headers
    return new Response(blob, {
      headers: {
        'Content-Type': media.mime_type,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return new Response('Media not found', { status: 404 });
  }
} 