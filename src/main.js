import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App).mount('#app');

app.use(router);

app.mount('#app');


