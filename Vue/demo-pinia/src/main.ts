import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createPinia as createPinia2} from "@/pinia"
import App from './App.vue'

function bootstrap() {
  const pinia = createPinia()
  const pinia2 = createPinia2()
  const app = createApp(App)
  app.use(pinia)
  app.use(pinia2)
  app.mount('#app')
}
bootstrap()