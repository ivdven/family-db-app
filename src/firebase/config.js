import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA_wX0HNTsC__sRyDkt_3R0a-1AXg23KCk",
  authDomain: "family-db-app.firebaseapp.com",
  projectId: "family-db-app",
  storageBucket: "family-db-app.appspot.com",
  messagingSenderId: "896289593208",
  appId: "1:896289593208:web:1d04013a1893f426f05a8d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore, Authentication and Storage services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// Server timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };