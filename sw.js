// Service Worker oficial de HercarBot IA (IESTP Hermanos Cárcamo - Paita)
const CACHE_NAME = 'hercarbot-pwa-v2026-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './admin.html',
  './manifest.json',
  './css/style.css',
  './css/admin.css',
  './js/chatbot.js',
  './js/admin.js',
  './js/knowledge-base.js',
  './assets/img/logo-hercar.png',
  './assets/img/escudo-hercar.webp',
  './assets/img/campus-hercar.jpg'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Estrategia Network-First: Siempre consulta primero al servidor para obtener las últimas actualizaciones
// Si no hay conexión (offline), recurre al caché local como respaldo.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  // No interceptar peticiones externas a CDNs de Bootstrap o fuentes
  if (url.origin !== self.location.origin) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
