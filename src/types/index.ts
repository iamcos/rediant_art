// Shared type definitions for the Rediant Art website

export interface Product {
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
  link?: string;
  type?: string;
}

export interface Photo {
  filename: string;
  title: string;
  description: string;
  alt: string;
  category: 'portrait' | 'lifestyle' | 'detail' | 'process';
  tags: string[];
  featured: boolean;
}

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  backgroundAlt?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  lang?: string;
}

export interface CallToActionProps {
  title: string;
  description?: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  variant?: 'light' | 'dark';
}

export interface LayoutProps {
  title: string;
  description?: string;
  lang?: string;
  heroImage?: string;
  heroAlt?: string;
}

export interface NavigationItem {
  text: string;
  href: string;
  external?: boolean;
}

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  languages: LanguageConfig[];
  navigation: NavigationItem[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

// Form types
export interface ContactFormData {
  name: string;
  telegram: string;
  subject: string;
  message: string;
}

export interface SubscriptionFormData {
  name: string;
  telegram: string;
  tier: 'explorer' | 'creator' | 'patron';
}

// Content collection types
export interface ContentCollectionItem {
  id: string;
  slug: string;
  data: {
    title: string;
    description: string;
    date: Date;
    tags: string[];
    featured?: boolean;
    [key: string]: any;
  };
  body: string;
}

