import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@tanstack/vue-query': ['useQuery', 'useMutation', 'useQueryClient'],
          '@tanstack/vue-form': ['useForm'],
          'ofetch': ['ofetch'],
          '@vueuse/core': ['useStorage', 'useDark', 'useToggle'],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/composables/**',
        'src/stores/**',
        'src/utils/**',
        'src/api/**',
        'src/types/**',
      ],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    watch: {
      ignored: ['**/server-node/data/**']
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'icons': ['lucide-vue-next'],
        }
      }
    }
  }
})