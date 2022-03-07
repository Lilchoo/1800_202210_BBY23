//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDwgg8p-6voOPe0lf-g8h3xGf54WFMyU6s",
    authDomain: "comp1800-team-bby23.firebaseapp.com",
    projectId: "comp1800-team-bby23",
    storageBucket: "comp1800-team-bby23.appspot.com",
    messagingSenderId: "303752964408",
    appId: "1:303752964408:web:4cd2d3d6d08a8764c3f9cd"
  };
  
  //--------------------------------------------
  // initialize the Firebase app
  // initialize Firestore database if using it
  //--------------------------------------------
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();