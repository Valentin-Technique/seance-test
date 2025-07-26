const CACHE_NAME = "seance-cache-v1";
const urlsToCache = [
  "index.html",
  "preview.html",
  "lecture.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
