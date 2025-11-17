// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/icon', 
    'shadcn-nuxt', 
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@peterbud/nuxt-query'
  ],

  nuxtQuery: {
    autoImports: ['useQuery', 'useMutation', 'useQueryClient'],
    queryClientOptions: {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 5000,
        },
      },
    },
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  css: ['~/assets/css/main.css'],

  vite: {
    // Note: @tailwindcss/vite is not needed here as the Nuxt Tailwind module handles it.
  },

  alias: {
    '@': '/.',
  }
})