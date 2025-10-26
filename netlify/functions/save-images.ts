import type { Context } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export default async (req: Request, context: Context) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    const store = getStore({
      name: 'images',
      consistency: 'strong',
      siteID: context.site.id,
      token: context.token,
    });

    // Save based on type
    switch (type) {
      case 'gallery-images':
        await store.set('gallery-images', JSON.stringify(data));
        break;
      case 'site-images':
        await store.set('site-images', JSON.stringify(data));
        break;
      case 'impact-images':
        await store.set('impact-images', JSON.stringify(data));
        break;
      case 'blog-posts':
        await store.set('blog-posts', JSON.stringify(data));
        break;
      default:
        return new Response(JSON.stringify({ error: 'Invalid type' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error saving images:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to save images',
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
  path: '/api/save-images',
};
