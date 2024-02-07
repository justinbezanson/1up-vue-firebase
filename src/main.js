import { createApp } from 'vue'
import store from './store';
import './style.css'
import App from './App.vue'
import router from './router'
import { db } from './firebase/index.js';
import FormTitle from './components/FormTitle.vue';
import FormInput from './components/FormInput.vue';
import Button from './components/Button.vue';
import ErrorAlert from './components/ErrorAlert.vue';
import SuccessAlert from './components/SuccessAlert.vue';
import FlashMessenger from './components/FlashMessenger.vue';
import FormSelect from './components/FormSelect.vue';
import PlusButton from './components/PlusButton.vue';
import MinusButton from './components/MinusButton.vue';

const app = createApp(App);

app.use(router);
app.use(store)

app.component('FormTitle', FormTitle)
app.component('FormInput', FormInput)
app.component('Button', Button)
app.component('ErrorAlert', ErrorAlert)
app.component('SuccessAlert', SuccessAlert)
app.component('FlashMessenger', FlashMessenger)
app.component('FormSelect', FormSelect)
app.component('PlusButton', PlusButton)
app.component('MinusButton', MinusButton)

app.mount('#app');