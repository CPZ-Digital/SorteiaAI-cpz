const CACHE = "appsorteio-v17";
const ASSETS = [
    "./",
    "./index.html",
    "./volei.html",
    "./futebol.html",
    "./basquete.html",
    "./handebol.html",
    "./premium.js",
    "./cpz-assinatura.png",
    "./icon-192.png",
    "./banner-home.png",
    "./sport-volei.png",
    "./sport-futebol.png",
    "./sport-basquete.png",
    "./sport-handebol.png"
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
    self.skipWaiting();
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener("fetch", e => {
    // Navegação: tenta cache, depois rede, fallback para index
    if (e.request.mode === "navigate") {
        e.respondWith(
            caches.match(e.request)
                .then(cached => cached || fetch(e.request))
                .catch(() => caches.match("./index.html"))
        );
        return;
    }
    // Outros recursos: cache-first, fallback para rede
    e.respondWith(
        caches.match(e.request).then(cached => cached || fetch(e.request))
    );
});
