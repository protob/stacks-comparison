// plugins/vue-sonner.ts
import { Toaster } from 'vue-sonner'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Toaster', Toaster)
})
