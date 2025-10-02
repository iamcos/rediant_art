// Service Worker for Rediant Art website
const CACHE_NAME = 'rediant-art-v1';
const urlsToCache = [
  '/',
  '/about',
  '/collections',
  '/shop',
  '/contact',
  '/3d-printing',
  '/journal',
  '/order',
  '/subscription',
  '/ru/',
  '/ru/about',
  '/ru/collections',
  '/ru/shop',
  '/ru/contact',
  '/ru/3d-printing',
  '/ru/journal',
  '/ru/order',
  '/ru/subscription',
  '/images/photo_2025-09-10 23.56.36.jpg',
  '/images/photo_2025-09-10 23.58.23.jpeg',
  '/images/photo_2025-09-10 23.58.18.jpeg',
  '/favicon.svg'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

