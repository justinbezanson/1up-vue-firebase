import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABdzEaoQRJK-03FqURW3CbmQgzOkA87-0",
  authDomain: "up-vue-firebase.firebaseapp.com",
  projectId: "up-vue-firebase",
  storageBucket: "up-vue-firebase.appspot.com",
  messagingSenderId: "750920724288",
  appId: "1:750920724288:web:a913e29865df10a48354a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    db
}