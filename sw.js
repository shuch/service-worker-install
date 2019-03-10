self.addEventListener('install', function(event) {
  console.log('install');
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


