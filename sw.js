// Service Worker oficial de HercarBot IA (IESTP Hermanos Cárcamo - Paita)
const CACHE_NAME = 'hercarbot-pwa-v2026';
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
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).catch(() => cached);
    })
  );
});
