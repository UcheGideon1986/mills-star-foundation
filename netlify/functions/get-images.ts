import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export default async (req: Request, context: Context) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const store = getStore({
      name: 'images',
      consistency: 'strong',
      siteID: context.site.id,
      token: context.token,
    });
    
    // Get all images metadata
    const images = await store.get('gallery-images', { type: 'json' }) || [];
    const siteImages = await store.get('site-images', { type: 'json' }) || {};
    const impactImages = await store.get('impact-images', { type: 'json' }) || [];
    const blogPosts = await store.get('blog-posts', { type: 'json' }) || [];
    
    return new Response(JSON.stringify({
      images,
      siteImages,
      impactImages,
      blogPosts
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch images',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};

export const config = {
  path: '/api/get-images',
};
