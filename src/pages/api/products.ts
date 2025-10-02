import type { APIRoute } from 'astro';
import { fetchProducts } from '../../utils/index';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Fetch products from Tribute API
    const products = await fetchProducts();
    
    // Return products as JSON
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // Return empty array on error
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  }
};