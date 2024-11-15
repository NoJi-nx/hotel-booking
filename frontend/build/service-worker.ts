/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

const CACHE_NAME = `Trestates-booking`;

// Use the install event to pre-cache all initial resources
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      '/',
      '/index.html',
      '/static/js/bundle.js',
      '/static/js/main.chunk.js',
      '/static/js/0.chunk.js',
      '/static/css/main.chunk.css',
      '/manifest.json',
    ]);
  })());
});

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get resource from the cache
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // if resource was not in the cache, try the network
          const fetchResponse = await fetch(event.request);

          // save  resource in the cache and return it
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
          return new Response('Network error occurred', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        }
    }
  })());
});
