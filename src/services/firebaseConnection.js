import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyAQVCi8BLnvvUyZJBp4HsipmYqAslg28cQ",
    authDomain: "sistema-de-chamados-b2dc6.firebaseapp.com",
    projectId: "sistema-de-chamados-b2dc6",
    storageBucket: "sistema-de-chamados-b2dc6.appspot.com",
    messagingSenderId: "243313138812",
    appId: "1:243313138812:web:d72f225616e813a18c7df9",
    measurementId: "G-3QEXR15W2Z"
  };
  
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
export default firebase;