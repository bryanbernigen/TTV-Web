import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/bootstrap.css'
import '@/assets/base.css'

//Setup axios
import axios from 'axios'
const token = localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const app = createApp(App)

app.use(router)

app.mount('#app')
