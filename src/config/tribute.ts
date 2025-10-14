// Tribute API Configuration
export const TRIBUTE_CONFIG = {
  API_KEY: import.meta.env.TRIBUTE_API_KEY,
  BASE_URL: 'https://tribute.tg/api/v1',
  ENDPOINTS: {
    PRODUCTS: '/products',
    ORDERS: '/orders',
    WEBHOOK: '/webhook'
  }
};

// API Helper Functions
export async function fetchTributeProducts() {
  try {
    const response = await fetch(`${TRIBUTE_CONFIG.BASE_URL}${TRIBUTE_CONFIG.ENDPOINTS.PRODUCTS}`, {
      headers: {
        'Api-Key': TRIBUTE_CONFIG.API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Tribute products:', error);
    return [];
  }
}

// Product Interface
export interface TributeProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  tags: string[];
  available: boolean;
  stock?: number;
}

