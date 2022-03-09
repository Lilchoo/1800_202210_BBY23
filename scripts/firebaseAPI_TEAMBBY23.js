//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "s",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };
  
  //--------------------------------------------
  // initialize the Firebase app
  // initialize Firestore database if using it
  //--------------------------------------------
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
