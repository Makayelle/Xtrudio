// Xtrudio — service worker : cache l'app shell pour un fonctionnement hors-ligne.
// Seules les données du catalogue, du stock et le calcul de coût sont concernés :
// le scan caméra nécessite toujours une page déjà chargée en HTTPS (voir note dans l'app).

const CACHE_NAME = 'xtrudio-cache-v13';

const APP_SHELL = [
  './',
  './index.html',
  './style.css?v=13',
  './catalog.js?v=13',
  './app.js?v=13',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.svg',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Stratégie : cache d'abord, mise à jour en arrière-plan (stale-while-revalidate)
// pour les fichiers de l'app. Tout le reste (ex: liens vers le store Bambu Lab,
// fonts Google) passe directement par le réseau sans interception.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
