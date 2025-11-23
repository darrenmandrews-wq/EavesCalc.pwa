const CACHE = "eavescalc-cache-v1";
const PRECACHE = [
  "./",                  // root
  "./index.html",        // main page
  "./manifest.webmanifest",
  "./icon-192.png",      // app icon
  "./icon-512.png"       // app icon
  // add other assets here if you split CSS/JS later
];

// Install: cache essential files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate: take control immediately
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// Fetch: serve from cache first, then network
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Offline fallback: serve index.html if request is for a page
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});

