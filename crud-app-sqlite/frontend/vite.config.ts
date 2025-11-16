import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
      ],
      imports: [
        'react',
        {
          'react-router-dom': ['useNavigate', 'useParams', 'useLocation', 'useSearchParams'],
          'zustand': [['default', 'create']],
          'zustand/middleware': ['devtools', 'persist'],
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
      vueTemplate: false,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
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
          'vendor': ['react', 'react-dom', 'zustand'],
          'icons': ['lucide-react'],
        }
      }
    }
  }
});
