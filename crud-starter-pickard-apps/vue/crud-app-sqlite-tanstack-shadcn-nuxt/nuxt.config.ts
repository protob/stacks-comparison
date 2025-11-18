// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "shadcn-nuxt", "@vueuse/nuxt", "@pinia/nuxt", "@peterbud/nuxt-query", "@nuxtjs/color-mode"],
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],
  // css: ["~/assets/css/tailwind.css"],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "theme",
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
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
