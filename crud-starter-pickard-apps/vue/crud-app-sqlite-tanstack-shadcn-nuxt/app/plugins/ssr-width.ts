import { provideSSRWidth } from '@vueuse/core'
// for shadcn
export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp)
})
