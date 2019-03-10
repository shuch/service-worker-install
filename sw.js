var CACHE_NAME = 'my-site-cache-v3';
var urlsToCache = [
  '/index.html',
  'style.css',
];


self.addEventListener('install', function(event) {
  console.log('install');
  // self.skipWaiting()

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('activate', function(event) {  
  console.log('activate');
});


self.addEventListener('fetch', function(event) {
  const res = fetch(event.request).then(
    function(response) {
      // Check if we received a valid response
      if(!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      return response;
    }
  );

  event.respondWith(res);
});


