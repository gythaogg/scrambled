self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('scrambled-cache').then(function(cache) {
            return cache.addAll([
                'index.html',
                'webapp/images/bkg.png',
                'webapp/images/*.png',
                'webapp/images/dragon.png',
                'webapp/scripts/angular.min.js',
                'webapp/scripts/scrambled.js',
                'webapp/scripts/words.json',
                'webapp/stylesheets/github-dark.css',
                'webapp/stylesheets/stylesheet.css',
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
