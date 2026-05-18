const CACHE_NAME = 'lcb-pda-v2'; // Увеличили версию
const ASSETS = [
  './',
  'index.html',
  'manifest.json',
  '01. In Hell We Live, Lament.mp3',
  '04. Dongbaek.mp3',
  '01. Dungeon Theme.mp3'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
