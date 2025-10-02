// Performance optimization utilities

/**
 * Lazy load images with intersection observer
 */
export function lazyLoadImages(): void {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach((img: HTMLImageElement) => {
      img.src = img.dataset.src || '';
    });
  }
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources(): void {
  if (typeof window === 'undefined') return;

  const criticalImages = [
    '/images/photo_2025-09-10 23.56.36.jpg',
    '/images/photo_2025-09-10 23.58.23.jpeg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Optimize scroll performance
 */
export function optimizeScrollPerformance(): void {
  if (typeof window === 'undefined') return;

  let ticking = false;

  function updateScrollElements() {
    // Add scroll-based animations here
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollElements);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * Debounce resize events
 */
export function debounceResize(callback: () => void, delay: number = 250): void {
  if (typeof window === 'undefined') return;

  let timeoutId: NodeJS.Timeout;
  
  const debouncedCallback = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };

  window.addEventListener('resize', debouncedCallback);
}

/**
 * Initialize performance optimizations
 */
export function initPerformanceOptimizations(): void {
  if (typeof window === 'undefined') return;

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      preloadCriticalResources();
      optimizeScrollPerformance();
    });
  } else {
    lazyLoadImages();
    preloadCriticalResources();
    optimizeScrollPerformance();
  }
}

/**
 * Measure and log performance metrics
 */
export function measurePerformance(): void {
  if (typeof window === 'undefined') return;

  // Measure page load time
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      console.log('Performance Metrics:', {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      });
    }
  });
}

/**
 * Optimize font loading
 */
export function optimizeFontLoading(): void {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap'
  ];

  fontPreloads.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
}

/**
 * Service Worker registration for caching
 */
export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
