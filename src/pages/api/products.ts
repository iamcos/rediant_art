import type { APIRoute } from 'astro';

// This would be your database or cache of products
// In a real implementation, you'd store this in a database
let cachedProducts: any[] = [];

export const GET: APIRoute = async ({ request }) => {
  try {
    // In production, you'd fetch from your database
    // For now, return cached products or sample data
    const products = cachedProducts.length > 0 ? cachedProducts : [
      {
        id: 'sample-1',
        name: 'Golden Facechain',
        description: 'Elegant golden facechain inspired by ancient tribal designs',
        price: 89,
        currency: 'USD',
        image: '/images/photo_2025-09-10 23.58.23.jpeg',
        category: 'facechain',
        tags: ['gold', 'facechain', 'tribal'],
        available: true,
        stock: 5
      },
      {
        id: 'sample-2',
        name: 'Silver Headchain',
        description: 'Modern silver headchain with geometric patterns',
        price: 75,
        currency: 'USD',
        image: '/images/photo_2025-09-10 23.58.18.jpeg',
        category: 'headchain',
        tags: ['silver', 'headchain', 'geometric'],
        available: true,
        stock: 3
      }
    ];

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

// This would be called by the webhook to update products
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Update cached products with new data from Tribute
    cachedProducts = body.products || [];
    
    console.log('Products updated via webhook:', cachedProducts.length);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating products:', error);
    return new Response(JSON.stringify({ error: 'Failed to update products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
