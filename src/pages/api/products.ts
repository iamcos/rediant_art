import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    const apiKey = import.meta.env.TRIBUTE_API_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch products from Tribute API
    const response = await fetch('https://tribute.tg/api/v1/products?page=1&size=100', {
      headers: { 'Api-Key': apiKey }
    });

    if (!response.ok) {
      throw new Error(`Tribute API error: ${response.status} ${response.statusText}`);
    }

    const { rows: tributeProducts } = await response.json();
    
    // Transform Tribute products to our format
    const products = tributeProducts.map(product => {
      // Convert from minor units to major units
      const price = product.amount / 100;
      
      // Determine category based on product type
      const category = product.type === 'physical' ? 'jewelry' : 'digital';
      const tags = product.type === 'physical' 
        ? ['tribute', 'artistic', 'jewelry', 'physical']
        : ['tribute', 'digital', 'art', 'custom'];
      
      return {
        id: product.id,
        name: product.name,
        description: product.description || 'Beautiful artistic piece',
        price: price,
        currency: product.currency.toUpperCase(),
        image: product.imageUrl || '/images/photo_2025-09-10 23.58.23.jpeg',
        imageUrl: product.imageUrl || '/images/photo_2025-09-10 23.58.23.jpeg',
        category: category,
        type: product.type,
        tags: tags,
        available: true,
        stock: 1,
        link: product.link, // This should be the Tribute purchase link
        starsAmount: product.starsAmount || null,
        starsAmountEnabled: product.starsAmountEnabled || false
      };
    });

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
    
  } catch (error) {
    console.error('Failed to fetch products from Tribute API:', error);
    
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};