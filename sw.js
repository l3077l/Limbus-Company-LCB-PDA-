const CACHE_NAME = 'lcb-pda-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  '01. Dungeon Theme.mp3',
  '01. In Hell We Live, Lament.mp3',
  '04. Dongbaek.mp3'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активация
self.addEventListener('activate', (event) => {
  console.log('SW activated');
});

// Стратегия: Сначала сеть, если нет — берем из кеша
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
