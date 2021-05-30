import firebase from "firebase/app";
import "firebase/auth";

// Instead of declaring firebaseConfig, it can be exported as the auth object.
export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAFZ4IUJgDKn-PvwM82cWkB4BofAuoP9wQ",
    authDomain: "allchat-1d781.firebaseapp.com",
    projectId: "allchat-1d781",
    storageBucket: "allchat-1d781.appspot.com",
    messagingSenderId: "820474792551",
    appId: "1:820474792551:web:e0bc23ab2d21016f9ee2c2",
  })
  .auth();
