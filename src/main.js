import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from '@/router/router'
import store from '@/store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import '@/assets/scss/styles.scss'

await loadFonts()
const app = createApp(App)
components.forEach(component => app.component(component.name, component))

app.use(router).use(store).use(vuetify).mount('#app')
