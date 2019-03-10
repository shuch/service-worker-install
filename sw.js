var CACHE_NAME = 'my-site-cache-v3';
var urlsToCache = [
  '/index.html',
  'style.css',
];

self.addEventListener('install', function(event) {
  console.log("install");
  // self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log("activate");
  event.waitUntil(
    // Get all the cache names
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        // Get all the items that are stored under a different cache name than the current one
        cacheNames.filter(function(cacheName) {
          return cacheName != CACHE_NAME;
        }).map(function(cacheName) {
          // Delete the items
          return caches.delete(cacheName);
        })
      ); // end Promise.all()
    }) // end caches.keys()
  ); // end event.waitUntil()
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log("Fetch request for:", event.request.url);
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT:Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT:Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});



// 接收主进程消息事件
self.addEventListener('message', function (event) {
  // receive message
  console.log('[sw]', event.data);

  // send message back
  event.source.postMessage('this message is from sw.js');
});



