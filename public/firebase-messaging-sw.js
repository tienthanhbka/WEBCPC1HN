importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js");
var firebaseConfig = {
    
    messagingSenderId: "224723205949",
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  
 
  
  messaging.setBackgroundMessageHandler(function(payload) {
  
    
 
    const channel = new BroadcastChannel('firebase-messaging-sw.js');
channel.postMessage(payload);

    
    
    
    var notificationTitle = payload.data.title;
    var notificationOptions = {
      body: payload.data.body,
      icon: 'https://icpc1hn.work/img/cpc1hn-logo.png',
      data: { url:payload.data.link}, //the url which we gonna use later
      actions: [{action: "open_url", title: "Truy cập trang web"}],
      click_action : payload.data.link
    };
   
    var noti = self.registration.showNotification(notificationTitle,
      notificationOptions);
      
    return noti
  });
  self.addEventListener('notificationclick', function(event) {

    switch(event.action){
      case 'open_url':
      clients.openWindow(event.notification.data.url); //which we got from above
      
      
      break;
      case 'any_other_action':
      clients.openWindow("https://icpc1hn.work");
      break;
    }
  }
  , false);