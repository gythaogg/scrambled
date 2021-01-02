self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('scrambled-cache').then(function(cache) {
            return cache.addAll([
                'index.html',
                'webapp/scripts/angular.min.js',
                'webapp/scripts/scrambled.js',
                'webapp/scripts/words.json',
                'webapp/stylesheets/github-dark.css',
                'webapp/stylesheets/stylesheet.css',
                'webapp/images/bkg.png',
                'webapp/images/icon-128.png',
                'webapp/images/icon-72.png',
                'webapp/images/icon-96.png',
                'webapp/images/icon-144.png',
                'webapp/images/icon-152.png',
                'webapp/images/icon-192.png',
                'webapp/images/icon-512.png',
                'webapp/images/dragon.png'
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
