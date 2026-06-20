// Service worker minimale: mette in cache la shell dell'app per un
// caricamento istantaneo. Le chiamate all'API RugCheck NON vengono mai
// messe in cache, perché i dati di rischio devono sempre essere aggiornati.
const CACHE_NAME = "scanner-meme-shell-v1";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Never cache API / proxy calls — always go to the network for live data.
  if (
    url.hostname.includes("rugcheck.xyz") ||
    url.hostname.includes("corsproxy.io") ||
    url.hostname.includes("allorigins.win")
  ) {
    return; // let the browser handle it normally
  }

  // App shell: cache-first for speed, falling back to network.
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
