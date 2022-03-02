// import { register } from 'register-service-worker';
// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/-/g, '+')
//     .replace(/_/g, '/');
 
//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
 
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
// if (true) {
//   register(`${process.env.BASE_URL}service-worker.js?v=3`, {
//     ready(registration) {
      
//       console.log(
//         'App is being served from cache by a service worker.\n' +
//         'For more details, visit https://goo.gl/AFskqB',
//       );
//       return registration.pushManager.getSubscription()
//       .then(async function(subscription) {
    
    
    
     
//         if (subscription) {
//           console.log(subscription);
//           return subscription;
//         }
    
//         const vapidPublicKey = 'BGcdDXhp3K6Sxz8GuCOPzrzOfXD0Vv3l4yxLtRjxcscp6vMMLaJMbf7_NJwdX51EcLGYwNJwieE0QdPS2igVEYw'
    
    
     
//         const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
    
    
     
//         return registration.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey: convertedVapidKey
//         });
        
        
//       });

//     },
//     registered() {
//       console.log('Service worker has been registered.');
//     },
//     cached() {
//       console.log('Content has been cached for offline use.');
//     },
//     updatefound() {
//       console.log('New content is downloading.');
//     },
//     updated() {
//       console.log('New content is available; please refresh.');
//     },
//     offline() {
//       console.log('No internet connection found. App is running in offline mode.');
//     },
//     error(error) {
//       console.error('Error during service worker registration:', error);
//     },
//   });
// }