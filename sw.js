const CACHE_NAME = 'lcb-pda-v5'; // Увеличил версию
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // Музыка
  './01. In Hell We Live, Lament.mp3',
  './01. Dungeon Theme.mp3',
  './04. Dongbaek.mp3',
  // Иконки (если есть)
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
