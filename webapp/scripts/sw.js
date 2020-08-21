self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('your-magic-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/images/bkg.png',
                '/images/blacktocat.png',
                '/images/dragon.png',
                '/scripts/angular.min.js',
                '/scripts/scrambled.js',
                '/scripts/words.json',
                '/stylesheets/github-dark.css',
                '/stylesheets/stylesheet.css',
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
