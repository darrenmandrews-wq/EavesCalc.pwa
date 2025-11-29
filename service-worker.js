// Version bump forces a fresh install
const CACHE_NAME = "eavescalc-v16"; // increment each deploy

// List of files to cache (GitHub Pages paths must include /EavesCalc.pwa/)
const FILES_TO_CACHE = [
  "/EavesCalc.pwa/",
  "/EavesCalc.pwa/index.html",
  "/EavesCalc.pwa/manifest.webmanifest",
  "/EavesCalc.pwa/style.css",
  "/EavesCalc.pwa/script.js",
  "/EavesCalc.pwa/favicon.ico",
  "/EavesCalc.pwa/icon-192.png",
  "/EavesCalc.pwa/icon-512.png"
];

// Install event: cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        FILES_TO_CACHE.map(url =>
          cache.add(url).catch(err =>
            console.error("Failed to cache:", url, err)
          )
        )
      );
    })
  );
  self.skipWaiting(); // activate immediately
});

// Activate event: clear old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // take control of pages
});

// Fetch event: network first, fallback to cache
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Save fresh copy in cache
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, clone);
        });
        return response;
      })
      .catch(() => caches.match(event.request)) // fallback if offline
  );
});
