import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin as formkitPlugin, defaultConfig as formkitDefaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'

import App from './App.vue'
import router from './router'
import './assets/css/index.css' // Main CSS entry point
import { useTheme } from './composables/useTheme'

const { initTheme } = useTheme()
initTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(formkitPlugin, formkitDefaultConfig)

// Mount app after router is ready
router.isReady().then(() => {
  app.mount(document.body)
})
