import { createApp } from 'vue'

// Router
import { RouterView } from 'vue-router'
import router from './router'

// Global CSS Import
import '@/styles/globals.css'

// Store
import { store } from './store'

const app = createApp(RouterView)

app.use(router)
app.use(store).mount('#app')
