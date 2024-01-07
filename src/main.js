import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { db } from './firebase/index.js';

const app = createApp(App);

app.use(router);

app.mount('#app');


