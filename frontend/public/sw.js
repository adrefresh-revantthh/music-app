// Minimal service worker for Loopz.
//
// Its main job right now is simply to exist and be registered with a
// fetch handler — that's one of Chrome's installability requirements
// before it will fire `beforeinstallprompt` (which is what powers the
// in-app "Download App" button). This intentionally does NOT do
// aggressive offline caching yet, since Vite's build output has
// content-hashed filenames that change on every deploy and the app
// depends on live API data (songs list) that shouldn't be served stale.

const RUNTIME_CACHE = "loopz-runtime-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // opportunistically cache successful same-origin GETs so a repeat
        // visit has something to fall back to if the network drops
        if (response && response.status === 200 && event.request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
