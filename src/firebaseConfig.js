import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeRf9yoT4Aun4z5OZmhoWbppXD6JrdL_g",
    authDomain: "service-directory2.firebaseapp.com",
    projectId: "service-directory2",
    storageBucket: "service-directory2.appspot.com",
    messagingSenderId: "97834440300",
    appId: "1:97834440300:web:73fd45efe4d08276872a49"
  };
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };