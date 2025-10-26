import { getStore } from '@netlify/blobs';

export default async (req: Request) => {
  try {
    const store = getStore('images');
    
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
    return new Response(JSON.stringify({ error: 'Failed to fetch images' }), {
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
