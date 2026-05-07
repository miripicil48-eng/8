const CACHE_NAME = "mi-juego-freddy-v1";

// 
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./boot.js",
  "./carga.js",
  "./inicio.js",
  "./juego.js",
  "./Gameover.js",
  "./Win.js",
  "./main.js",
  "./logo.png",
  "./freddy.png",
  "./fondogo.png",
  "./fondoi.png",
  "./fondowin.png",
  "./fondoj.png",
  "./piso.png",
  "./plataforma.png",
  "./recogible.png",
  "./rosa.png",
  "./sillon.png",
  "./vela.png",
  "./ganar.mp3",
  "./menu.mp3",
  "./perder.mp3",
  "./salta.mp3",
  // Librería externa
  "https://cdn.jsdelivr.net/npm/phaser@3.55.2/dist/phaser.js"
];

// Instalar el Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activar y limpiar caches antiguos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptar peticiones
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});