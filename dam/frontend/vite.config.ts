import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwind from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwind(),
    Components({
      resolvers: [
        IconsResolver({
          prefix: false,
          enabledCollections: ['mdi', 'heroicons'],
        }),
      ],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),
    vueDevTools(),
  ],
  // REMOVED: The server.proxy object has been deleted.
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: {
        chrome: 111,
        firefox: 128,
        safari: 16 << 16,
      },
      include: 1 << 0, // Enable CSS nesting
      cssModules: false,
      drafts: {
        customMedia: true,
      },
    },
  },
  build: {
    cssMinify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})