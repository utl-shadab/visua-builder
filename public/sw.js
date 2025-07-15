const CACHE_NAME = "visuabuild-cache-v1";
const urlsToCache = [
  "/",
  "/editor",
  "/landing",
  "/styles/globals.css",
  "/app/globals.css",
  "/placeholder-logo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
