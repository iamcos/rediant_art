import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params }) => {
  try {
    const apiKey = import.meta.env.TRIBUTE_API_KEY;
    const id = params.id as string | undefined;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing product id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const res = await fetch(`https://tribute.tg/api/v1/products/${id}`, {
      headers: { 'Api-Key': apiKey }
    });

    if (res.status === 404) {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!res.ok) {
      throw new Error(`Tribute API error: ${res.status} ${res.statusText}`);
    }

    const product = await res.json();

    // Use correct pricing for physical goods (Tribute returns a separate price)
    const price = product?.type === 'physical' && typeof product?.price === 'number'
      ? product.price
      : (typeof product?.amount === 'number' ? product.amount / 100 : null);

    const tagsFromDescription: string[] = Array.isArray(product?.tags) && product.tags.length > 0
      ? product.tags
      : (typeof product?.description === 'string'
          ? ((product.description.match(/#\w+/g) || []).map((t: string) => t.substring(1)))
          : []);

    const mapped = {
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: price,
      currency: (product.currency || 'USD').toString().toUpperCase(),
      image: product.imageUrl || '/images/photo_2025-09-10 23.58.23.jpeg',
      imageUrl: product.imageUrl || '/images/photo_2025-09-10 23.58.23.jpeg',
      category: product.type === 'physical' ? 'jewelry' : 'digital',
      type: product.type,
      tags: tagsFromDescription,
      available: true,
      stock: 1,
      link: product.link || null,
      starsAmount: product.starsAmount || null,
      starsAmountEnabled: product.starsAmountEnabled || false
    };

    return new Response(JSON.stringify(mapped), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });
  } catch (error) {
    console.error('Failed to fetch product by id from Tribute API:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


