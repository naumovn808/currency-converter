import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import { useCurrencyStore } from './stores/currency';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const store = useCurrencyStore();
await store.fetchRates(); 

app.mount('#app');
