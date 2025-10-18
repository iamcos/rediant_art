import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const apiKey = import.meta.env.TRIBUTE_API_KEY;
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pageParam = url.searchParams.get('page') || '1';
    const sizeParam = url.searchParams.get('size') || '100';
    const typeParam = url.searchParams.get('type'); // 'physical' | 'digital'
    const tagParam = url.searchParams.get('tag'); // hashtag without '#'

    // Fetch products from Tribute API
    const response = await fetch(`https://tribute.tg/api/v1/products?page=${pageParam}&size=${sizeParam}`, {
      headers: { 'Api-Key': apiKey }
    });

    if (!response.ok) {
      throw new Error(`Tribute API error: ${response.status} ${response.statusText}`);
    }

    const { rows: tributeProducts } = await response.json();
    
    // Product ignore list - products to completely exclude
    const IGNORE_PRODUCTS = [
      'special shot',
      'test product',
      'draft',
      'private'
    ];
    
    // Filter out ignored products before processing
    const filteredProducts = tributeProducts.filter(product => {
      const name = product.name?.toLowerCase() || '';
      const description = product.description?.toLowerCase() || '';
      
      return !IGNORE_PRODUCTS.some(ignoreTerm => 
        name.includes(ignoreTerm.toLowerCase()) || 
        description.includes(ignoreTerm.toLowerCase())
      );
    });
    
    // Transform Tribute products to our format
    let products = filteredProducts.map(product => {
      // Convert from minor units to major units
      // For physical goods, prefer .price if present (source of truth)
      const price = product.type === 'physical' && typeof product.price === 'number'
        ? product.price
        : (product.amount / 100);
      
      // Determine category based on product type
      const category = product.type === 'physical' ? 'jewelry' : 'digital';
      const tagsFromDescription: string[] = Array.isArray(product.tags) && product.tags.length > 0
        ? product.tags
        : (typeof product.description === 'string'
            ? ((product.description.match(/#\w+/g) || []).map((t: string) => t.substring(1)))
            : []);
      
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
        tags: tagsFromDescription,
        available: true,
        stock: 1,
        link: product.link, // This should be the Tribute purchase link
        starsAmount: product.starsAmount || null,
        starsAmountEnabled: product.starsAmountEnabled || false
      };
    });

    // Optional filtering by type
    if (typeParam) {
      products = products.filter(p => p.type === typeParam);
    }

    // Optional filtering by hashtag/tag
    if (tagParam) {
      const normalized = tagParam.replace(/^#/, '');
      products = products.filter(p => Array.isArray(p.tags) && p.tags.includes(normalized));
    }

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