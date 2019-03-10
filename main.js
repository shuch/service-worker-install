if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('ServiceWorker register successful with scope', registration.scope);

    // if (registration.installing) {
    //   console.log('ServiceWorker is Installing');
    // }
    // if (registration.waiting) {
    //   console.log('ServiceWorker is Waiting');
    // }
    // if (registration.active) {
    //   console.log('ServiceWorker is Active');
    // }

    // // 发送消息给 sw
    // const controller = navigator.serviceWorker.controller;
    // console.log('serviceWorker instance', controller);
    // controller && controller.postMessage("this message is from page");

    // // 接收来自 sw的消息
    // navigator.serviceWorker.addEventListener('message', function (e) {
    //   // this message is from sw.js, to page
    //   console.log('[page]:', e.data); 
    // });


  }, function(err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}