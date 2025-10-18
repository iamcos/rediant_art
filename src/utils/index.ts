// Utility functions for the Rediant Art website

import type { Product, Photo, LanguageConfig } from '../types';

/**
 * Fetch real products from Tribute API
 */
export async function fetchProducts(): Promise<Product[]> {
  const apiKey = import.meta.env.TRIBUTE_API_KEY;
  
  if (!apiKey) {
    console.warn('TRIBUTE_API_KEY environment variable is not set, returning empty products array');
    return [];
  }

  try {
    console.log('Fetching products from Tribute API...');
    // Fetch all products (physical and digital) from Tribute API
    const response = await fetch('https://tribute.tg/api/v1/products?page=1&size=100', {
      headers: { 'Api-Key': apiKey }
    });

    if (!response.ok) {
      console.error(`Tribute API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const { rows: tributeProducts } = await response.json();
    console.log(`Fetched ${tributeProducts.length} products from Tribute API`);
    
    // Product ignore list - products to completely exclude
    const IGNORE_PRODUCTS = [
      'special shot',
      'special shot 🔥',
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
    
    console.log(`Filtered out ${tributeProducts.length - filteredProducts.length} ignored products`);
    
    // Transform Tribute products to our format
    const products = filteredProducts.map(product => {
      // Tribute API returns amount in major units (RUB, EUR, etc.)
      // No conversion needed - use amount directly
      const price = product.amount;
      
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
        link: product.link,
        starsAmount: product.starsAmount || null,
        starsAmountEnabled: product.starsAmountEnabled || false
      };
    });
    
    console.log(`Successfully fetched ${products.length} real products from Tribute API`);
    return products;
    
  } catch (error) {
    console.error('Failed to fetch products from Tribute API:', error);
    return [];
  }
}

/**
 * Filter photos by category, tags, or featured status
 */
export function filterPhotos(
  photos: Photo[],
  options: {
    category?: string;
    tags?: string[];
    featured?: boolean;
    limit?: number;
  } = {}
): Photo[] {
  let filtered = photos;

  if (options.category) {
    filtered = filtered.filter(photo => photo.category === options.category);
  }

  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter(photo => 
      options.tags!.some(tag => photo.tags.includes(tag))
    );
  }

  if (options.featured !== undefined) {
    filtered = filtered.filter(photo => photo.featured === options.featured);
  }

  if (options.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

/**
 * Get language configuration
 */
export function getLanguageConfig(lang: string): LanguageConfig {
  const languages: Record<string, LanguageConfig> = {
    en: {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      href: '/'
    },
    ru: {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      href: '/ru/'
    }
  };

  return languages[lang] || languages.en;
}

/**
 * Get navigation items for a specific language
 */
export function getNavigationItems(lang: string) {
  const basePath = lang === 'ru' ? '/ru' : '';
  
  return [
    { text: lang === 'ru' ? 'Главная' : 'Home', href: `${basePath}/` },
    { text: lang === 'ru' ? 'Магазин' : 'Shop', href: `${basePath}/shop` },
    { text: lang === 'ru' ? 'Коллекции' : 'Collections', href: `${basePath}/collections` },
    { text: lang === 'ru' ? 'О нас' : 'About', href: `${basePath}/about` },
    { text: lang === 'ru' ? 'Краудфандинг' : 'Crowdfunding', href: `${basePath}/crowdfunding` },
    { text: lang === 'ru' ? 'Подписка' : 'Subscription', href: `${basePath}/subscription` },
    { text: lang === 'ru' ? 'Заказ' : 'Order', href: `${basePath}/order` },
    { text: lang === 'ru' ? 'Журнал' : 'Journal', href: `${basePath}/journal` },
    { text: lang === 'ru' ? 'Контакты' : 'Contact', href: `${basePath}/contact` }
  ];
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Generate SEO-friendly slug from string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Get image optimization URL
 */
export function getOptimizedImageUrl(
  src: string,
  width?: number,
  height?: number,
  quality: number = 80
): string {
  if (src.startsWith('http')) {
    return src;
  }
  
  // For local images, you might want to use Astro's image optimization
  return src;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(element: Element | string, offset: number = 0): void {
  const target = typeof element === 'string' ? document.querySelector(element) : element;
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

/**
 * Get device type based on screen width
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Local storage utilities with error handling
 */
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  
  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
};
