// Drop the old worker that showed offline.html whenever a request failed.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
      .then(() => self.registration.unregister())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
