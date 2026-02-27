const CACHE = "vd-pwa-fix-2";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",
  "./assets/logo.svg",
  "./assets/icon.svg",
  "./assets/hero-placeholder.jpg",

  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/maskable-192.png",
  "./assets/icons/maskable-512.png",
  "./assets/icons/apple-touch-icon-180.png",
  "./assets/icons/apple-touch-icon-167.png",
  "./assets/icons/apple-touch-icon-152.png",
  "./assets/icons/apple-touch-icon-120.png",
  "./assets/icons/favicon-32.png",
  "./assets/icons/favicon-16.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
