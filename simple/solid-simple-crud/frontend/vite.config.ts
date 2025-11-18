import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import tailwind from '@tailwindcss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    solid(),
    tailwind(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      ],
      imports: [
        'solid-js',
        {
          '@solidjs/router': ['Router', 'Route', 'Navigate', 'useNavigate', 'useLocation', 'useParams', 'useSearchParams'],
          'solid-js/store': ['createStore', 'produce', 'reconcile'],
          'solid-js/web': ['Portal'],
          'clsx': [['default', 'clsx']],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        'src/hooks/**',
        'src/stores/**',
        'src/utils/**',
        'src/api/**',
        'src/types/**',
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ['@solidjs/router'],
    // Pre-bundle lucide-solid for better performance
    include: ['lucide-solid']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Direct alias to lucide-solid icons for better tree-shaking
      'lucide-solid/icons': fileURLToPath(
        new URL('./node_modules/lucide-solid/dist/source/icons', import.meta.url)
      ),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
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
          'vendor': ['solid-js', '@solidjs/router', 'clsx', 'zod'],
          'icons': ['lucide-solid'],
        }
      }
    }
  }
});
