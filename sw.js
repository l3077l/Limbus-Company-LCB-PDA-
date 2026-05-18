const CACHE_NAME = 'lcb-pda-v6'; // Увеличили версию до v6
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // Музыка
  './01. In Hell We Live, Lament.mp3',
  './01. Dungeon Theme.mp3',
  './04. Dongbaek.mp3',
  // Иконки
  './icon-192.png',
  './icon-512.png'
];

// Установка: кэшируем файлы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Принудительно активировать новый SW
});

// Активация: чистим старый кэш
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Удаление старого кэша:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Сразу берем управление под контроль
});

// Запросы: сначала пробуем кэш, потом сеть
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
