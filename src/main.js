import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyABdzEaoQRJK-03FqURW3CbmQgzOkA87-0",
  authDomain: "up-vue-firebase.firebaseapp.com",
  projectId: "up-vue-firebase",
  storageBucket: "up-vue-firebase.appspot.com",
  messagingSenderId: "750920724288",
  appId: "1:750920724288:web:a913e29865df10a48354a5"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount('#app');


