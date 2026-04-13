// =============================================================
// SERVICE WORKER
// Caches all app shell files for offline use.
// Strategy: Cache-first for shell assets, network-first for card data.
//
// Cache name is versioned — bump CACHE_VERSION on each deploy
// to force cache refresh across all clients.
// =============================================================

const CACHE_VERSION = 'v1';
const CACHE_NAME = `mahjong-assistant-${CACHE_VERSION}`;

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/base.css',
  '/css/tiles.css',
  '/css/app.css',
  '/js/tiles.js',
  '/js/app.js',
  '/js/game-state.js',
  '/js/engine/matcher.js',
  '/js/engine/search.js',
  '/js/engine/odds.js',
  '/js/engine/advisor.js',
  '/js/ui/tile-input.js',
  '/js/ui/dead-tiles.js',
  '/js/ui/results.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// =============================================================
// INSTALL — cache all app shell files
// =============================================================
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

// =============================================================
// ACTIVATE — purge old caches
// =============================================================
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// =============================================================
// FETCH — cache-first for app shell, network-first for card data
// =============================================================
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Network-first for card data (never cached — gitignored)
  if (url.pathname.startsWith('/cards/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Cache-first for everything else
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
