const CACHE = 'my-world-v31';
const ASSETS = ['./', './index.html', './style.css', './figma-footer.css', './app.js', './manifest.webmanifest', './compass.svg', './figma-assets/generate.svg', './figma-assets/map.svg', './figma-assets/memories.svg', './figma-assets/history.svg', './assets-world-bright.png'];
self.addEventListener('install', (event) => event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS))));
self.addEventListener('fetch', (event) => event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request))));
