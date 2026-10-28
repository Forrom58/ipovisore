const CACHE = 'ipovisore-v8';
const BASE = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE.map(u => new Request(u, {cache:'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('ipovisore-') && x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request, {cache:'no-store'}).then(res => { const c = res.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return res; }).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const u = e.request.url;
      if (res.ok && (u.startsWith(self.location.origin) || u.includes('cdn.jsdelivr.net') || u.includes('tessdata'))) {
        const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia));
      }
      return res;
    }))
  );
});
