import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import router from './routes/index';
import axios from 'axios';
import './index.css'

loadFonts();

const app = createApp(App);
app.use(vuetify);
app.use(router);
app.config.globalProperties.axios = axios;
app.mount('#app');
