  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBm0zr_Pse7tdc3jrBM7HaF9wPQKumCQds",
    authDomain: "myproject-3bc42.firebaseapp.com",
    projectId: "myproject-3bc42",
    storageBucket: "myproject-3bc42.appspot.com",
    messagingSenderId: "309081611199",
    appId: "1:309081611199:web:b597aed56296921ec4df0a"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);
// Get database reference

  export default db;