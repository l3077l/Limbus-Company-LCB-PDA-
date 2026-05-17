const CACHE_NAME = 'lcb-pda-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Установка воркера и кэширование основы
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активация
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Перехват запросов для работы оффлайн
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});

