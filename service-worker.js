// service-worker.js
const CACHE_NAME = 'seance-cache-v1';
const urlsToCache = [
  '/',
  '/seance-test/index.html',
  '/seance-test/preview.html',
  '/seance-test/lecture.html',
  '/seance-test/historique.html',
  '/seance-test/manifest.webmanifest',
  '/seance-test/icone-192.png',
  '/seance-test/icone-512.png',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
  // ajoute ici d'autres fichiers statiques si nécessaire
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
