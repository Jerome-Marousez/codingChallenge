import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@fortawesome/fontawesome-free/js/all'

const app = createApp(App).use(createPinia()).use(VueAxios, axios).use(router)

app.config.globalProperties.$http = axios

router.isReady().then(() => app.mount('#app'))