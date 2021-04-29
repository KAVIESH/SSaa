import firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyBk0gU6eAL8DvKji376YGiBPu4-rbTUyBc",
    authDomain: "book-santa-85109.firebaseapp.com",
    projectId: "book-santa-85109",
    storageBucket: "book-santa-85109.appspot.com",
    messagingSenderId: "561483792534",
    appId: "1:561483792534:web:85d9a13733bcd7894f82b7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();