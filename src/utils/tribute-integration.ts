/**
 * Tribute Product Integration for Blog Posts
 * 
 * This module handles integration with Tribute products in blog posts,
 * including fetching product information and creating product embeds.
 */

export interface TributeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  url: string;
  inStock: boolean;
}

/**
 * Extract Tribute product URLs from text
 */
export function extractTributeProducts(text: string): string[] {
  const productMatches = text.match(/tribute\.tg\/[a-zA-Z0-9_-]+/g) || [];
  return productMatches;
}

/**
 * Fetch product information from Tribute API
 */
export async function fetchTributeProduct(productUrl: string): Promise<TributeProduct | null> {
  try {
    const apiKey = process.env.TRIBUTE_API_KEY;
    if (!apiKey) {
      throw new Error('Tribute API key not configured');
    }

    // Extract product ID from URL
    const productId = productUrl.split('/').pop();
    if (!productId) {
      throw new Error('Invalid product URL');
    }

    // Fetch from Tribute API
    const response = await fetch(`https://tribute.tg/api/v1/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Tribute API error: ${response.status}`);
    }

    const product = await response.json();
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      currency: product.currency || 'USD',
      images: product.images || [],
      url: productUrl,
      inStock: product.inStock || true,
    };
  } catch (error) {
    console.error('Error fetching Tribute product:', error);
    return null;
  }
}

/**
 * Generate product embed HTML for blog posts
 */
export function generateProductEmbed(product: TributeProduct): string {
  const imageHtml = product.images.length > 0 
    ? `<img src="${product.images[0]}" alt="${product.name}" style="max-width: 300px; height: auto; border-radius: 8px;">`
    : '';

  return `
<div class="tribute-product-embed" style="border: 1px solid #e5e5e5; border-radius: 12px; padding: 20px; margin: 20px 0; background: #fafafa;">
  <div style="display: flex; gap: 20px; align-items: start;">
    ${imageHtml}
    <div style="flex: 1;">
      <h3 style="margin: 0 0 10px 0; color: #2c2c2c; font-size: 1.25rem;">${product.name}</h3>
      <p style="margin: 0 0 15px 0; color: #666; line-height: 1.5;">${product.description}</p>
      <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
        <span style="font-size: 1.5rem; font-weight: bold; color: #D4AF37;">${product.currency} ${product.price}</span>
        <span style="color: ${product.inStock ? '#22c55e' : '#ef4444'}; font-weight: 500;">
          ${product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <a href="${product.url}" 
         target="_blank" 
         rel="noopener noreferrer"
         style="display: inline-block; background: #D4AF37; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500; transition: background 0.2s;">
        View Product →
      </a>
    </div>
  </div>
</div>`;
}

/**
 * Process all Tribute products in a blog post
 */
export async function processTributeProducts(text: string): Promise<{
  products: TributeProduct[];
  embeds: string[];
  cleanText: string;
}> {
  const productUrls = extractTributeProducts(text);
  const products: TributeProduct[] = [];
  const embeds: string[] = [];
  
  // Remove product URLs from text
  let cleanText = text;
  for (const url of productUrls) {
    cleanText = cleanText.replace(url, '').trim();
  }
  
  // Fetch product information
  for (const url of productUrls) {
    const product = await fetchTributeProduct(url);
    if (product) {
      products.push(product);
      embeds.push(generateProductEmbed(product));
    }
  }
  
  return {
    products,
    embeds,
    cleanText: cleanText.replace(/\n\s*\n/g, '\n\n').trim(),
  };
}

/**
 * Generate product showcase section for blog posts
 */
export function generateProductShowcase(products: TributeProduct[]): string {
  if (products.length === 0) return '';
  
  let showcase = '\n## Featured Products\n\n';
  
  for (const product of products) {
    showcase += `### ${product.name}\n\n`;
    showcase += `**Price:** ${product.currency} ${product.price}\n\n`;
    showcase += `${product.description}\n\n`;
    showcase += `[View Product](${product.url})\n\n`;
    showcase += '---\n\n';
  }
  
  return showcase;
}









