import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

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
          'vue-sonner': ['toast'],
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

    // Add Components with Icons resolver
    Components({
      resolvers: [
        IconsResolver({
          prefix: 'icon',
        }),
      ],
      dts: 'src/components.d.ts',
    }),

    // Add Icons plugin
    Icons({
      compiler: 'vue3',
      autoInstall: true,
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
        }
      }
    }
  }
})