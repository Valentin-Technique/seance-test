// 🆕 Version du cache — incrémente à chaque changement significatif
const CACHE_VERSION = 'v3';
const CACHE_NAME = `seance-cache-${CACHE_VERSION}`;

const urlsToCache = [
  '/seance-test/',
  '/seance-test/index.html',
  '/seance-test/preview.html',
  '/seance-test/lecture.html',
  '/seance-test/historique.html',
  '/seance-test/manifest.webmanifest',
  '/seance-test/icone-192.png',
  '/seance-test/icone-512.png',
  'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap',
];

// 📦 Installation : met en cache les fichiers nécessaires
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 🧹 Activation : supprime les anciens caches qui ne sont plus utilisés
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// 🌐 Interception des requêtes : sert depuis le cache ou va chercher en ligne
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => new Response('⚠️ Vous êtes hors ligne et cette ressource n’est pas en cache.', {
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      }))
  );
});
