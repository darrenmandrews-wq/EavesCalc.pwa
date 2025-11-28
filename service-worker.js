// Update this version string each time you deploy new code
const CACHE_NAME = "eavescalc-v1";

// List of files to cache (adjust paths if needed)
const FILES_TO_CACHE = [
  "/",                  // root
  "/index.html",
  "/manifest.webmanifest",
  "/style.css",         // if you have a CSS file
  "/script.js"          // if you have a JS file
];

// Install event: cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
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
