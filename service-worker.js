const CACHE_NAME = 'seance-cache-v1';
const urlsToCache = [
  '/',
  '/seance-test/',
  '/seance-test/index.html',
  '/seance-test/preview.html',
  '/seance-test/lecture.html',
  '/seance-test/historique.html',
  '/seance-test/icone-192.png',
  '/seance-test/icone-512.png',
  '/seance-test/manifest.webmanifest',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
