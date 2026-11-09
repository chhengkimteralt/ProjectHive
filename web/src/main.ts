import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
import { createPinia } from 'pinia'

app.use(router)
app.use(createPinia())

app.mount('#app')