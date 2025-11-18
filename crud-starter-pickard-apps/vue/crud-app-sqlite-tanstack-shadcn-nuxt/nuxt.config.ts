// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "shadcn-nuxt", "@vueuse/nuxt", "@pinia/nuxt", "@peterbud/nuxt-query", "@nuxtjs/color-mode"],
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "theme",
    hid: "nuxt-color-mode-script", // Important for SSR
  },

  nuxtQuery: {
    autoImports: ["useQuery", "useMutation", "useQueryClient"],
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
    prefix: "",
    componentDir: "@/components/ui",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
