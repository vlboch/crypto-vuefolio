import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

document.title = 'Vuefolio'

app.use(pinia)
app.mount('#app')
