const CACHE_NAME = 'seance-cache-v1';
const urlsToCache = [
  '/',
  '/seance-test/',
  '/seance-test/index.html',
  '/seance-test/preview.html',
  '/seance-test/lecture.html',
  '/seance-test/historique.html',
  '/seance-test/manifest.webmanifest',
  '/seance-test/icone-192.png',
  '/seance-test/icone-512.png',
  '/seance-test/style.css',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
];

// Installation → pré-cache les ressources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation → nettoyage anciens caches si nécessaire
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
                  .map(name => caches.delete(name))
      );
    })
  );
});

// Interception des requêtes
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      }).catch(() => {
        return new Response('⚠️ Vous êtes hors ligne et la ressource n’est pas en cache.', {
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
      })
  );
});
