const CACHE_NAME = 'lcb-pda-v3';
const ASSETS = [
  'index.html',
  'manifest.json',
  '01. In Hell We Live, Lament.mp3',
  '01. Dungeon Theme.mp3',
  '04. Dongbaek.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
