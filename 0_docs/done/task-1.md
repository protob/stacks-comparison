WORKING DIRECOTRY IS "crud-app-sqlite/frontend"
do cd crud-app-sqlite/frontend  first

### Step 1: Update package.json

Replace the entire `package.json` dependencies section:

**File:** `package.json`

```json
{
  "name": "react-todo-app",
  "private": true,
  "version": "0.2.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-router": "7.9.5",
    "zustand": "5.0.8",
    "zod": "3.24.1",
    "lucide-react": "0.553.0",
    "clsx": "2.1.1"
  },
  "devDependencies": {
    "@types/react": "19.0.4",
    "@types/react-dom": "19.0.2",
    "@vitejs/plugin-react": "5.1.1",
    "typescript": "5.9.3",
    "vite": "7.2.2",
    "tailwindcss": "4.1.17",
    "unplugin-auto-import": "20.0.0",
    "use-sync-external-store": "1.5.0"
  }
}

```

### Step 2: Delete obsolete files

Remove these files completely:

```bash
rm tailwind.config.js
```

### Step 3: Update vite.config.ts

Replace the entire file to remove Tailwind Vite plugin and update React plugin:

**File:** `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
      ],
      imports: [
        'react',
        {
          'react-router': ['useNavigate', 'useParams', 'useLocation', 'useSearchParams'],
          'zustand': [['create', 'create']],
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
```

### Step 4: Update CSS imports

Replace the entire CSS file for Tailwind 4 stable:

**File:** `src/index.css`

```css
@import "tailwindcss";

@layer base {
  body {
    background-color: theme(colors.neutral.900);
    color: theme(colors.neutral.100);
    font-family: theme(fontFamily.sans);
    min-height: 100vh;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid theme(colors.neutral.700);
    border-radius: 0.375rem;
    background-color: theme(colors.neutral.800);
    color: theme(colors.neutral.100);
  }

  input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: theme(colors.blue.500);
    box-shadow: 0 0 0 1px theme(colors.blue.500 / 50%);
  }

  input[type="checkbox"] {
    width: auto;
  }
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background-color: theme(colors.neutral.800);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: theme(colors.neutral.600);
  border-radius: 0.25rem;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: theme(colors.neutral.500);
}
```

### Step 5: Update Zustand store imports

**File:** `src/stores/useItemStore.ts`

Replace the import section at the top:

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Item, Priority, SingleCategory } from '@/types';
import * as itemApi from '@/api/itemApi';
import { useUiStore } from './useUiStore';
import { slugify } from '@/utils/slugify';
```

Keep the rest of the file exactly the same.[4]

### Step 6: Update UI store imports

**File:** `src/stores/useUiStore.ts`

Replace the import section at the top:

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Notification, NotificationType } from '@/types';
```

Keep the rest of the file exactly the same.[4]

### Step 7: Update React Router imports throughout codebase

Search and replace all instances in all files:

**Find:** `from 'react-router-dom'`  
**Replace with:** `from 'react-router/dom'`

This affects any file importing `BrowserRouter`, `Routes`, `Route`, `Link`, `Navigate`, `useNavigate`, `useParams`, `useLocation`, etc.[5]

**Example - if you have App.tsx or main.tsx with router setup:**

```typescript
// OLD
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// NEW
import { BrowserRouter, Routes, Route } from 'react-router/dom';
```

### Step 8: Update TypeScript configuration

**File:** `tsconfig.json`

Replace the entire file:

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "useDefineForClassFields": true,
    "lib": ["ES2024", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/auto-imports.d.ts"
  ],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Step 9: Install dependencies

Run the installation command:

```bash
npm install
```

### Step 10: Generate new TypeScript declarations

After installation, run the dev server once to generate new auto-import types:

```bash
npm run dev
```

Stop the server after it starts successfully. This regenerates `src/auto-imports.d.ts` with correct types.[6]

### Step 11: Type check and build

Verify everything works:

```bash
npm run type-check
npm run build
```

## Critical Breaking Changes Addressed

### React 19.2
The codebase uses standard hooks and components that are fully compatible with React 19.2 without changes. The `ref` as prop improvement is backward compatible.[7][1]

### Zustand 5
Changed from default export to named import `create` in steps 5-6. The stores use `devtools` middleware which remains compatible. No custom equality functions (`shallow`) are used in this codebase.[8][4]

### React Router 7
Changed package name from `react-router-dom` to `react-router` with `/dom` subpath import in step 7. This is the only breaking change for standard client-side routing.[5]

### Tailwind CSS 4
Removed `tailwind.config.js`, updated CSS to use `@import "tailwindcss"` instead of `@tailwind` directives, and removed the `@tailwindcss/vite` plugin in steps 2-4. Tailwind 4 is now built into Vite directly.[3][9]

### Vite 6
The configuration works without changes as this is a standard SPA without advanced SSR needs.[2][10]

### TypeScript 5.7
Updated target to ES2024 for new language features support in step 8. No code changes needed.[11][12]

[1](https://react.dev/blog/2025/10/01/react-19-2)
[2](https://vite.dev/blog/announcing-vite6)
[3](https://dev.to/kasenda/whats-new-and-migration-guide-tailwind-css-v40-3kag)
[4](https://zustand.docs.pmnd.rs/migrations/migrating-to-v5)
[5](https://reactrouter.com/upgrading/v6)
[6](https://www.npmjs.com/package/unplugin-auto-import/v/0.15.0)
[7](https://blog.logrocket.com/react-19-2-is-here/)
[8](https://pmnd.rs/blog/announcing-zustand-v5)
[9](https://www.youtube.com/watch?v=WaYgFtYiYdw)
[10](https://www.javacodegeeks.com/2025/01/vite-6-0-new-features-and-solutions-for-developers.html)
[11](https://javascript-conference.com/blog/typescript-5-7-5-8-features-ecmascript-direct-execution/)
[12](https://dev.to/thisweekinjavascript/typescript-57-rc-released-new-npm-alternative-the-future-of-javascript-frameworks-and-more-3c5j)
[13](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/55349659/cef4e377-cd05-4168-8a27-fa18874babdf/frontend_sources.md)
[14](https://react.dev/versions)
[15](https://github.com/facebook/react/releases)
[16](https://folderit.net/react-19-a-new-era-with-react-compiler-and-the-react-foundation/)
[17](https://www.ksolves.com/blog/reactjs/whats-new-in-react-19)
[18](https://www.reddit.com/r/reactjs/comments/1g3h976/zustand_v500/)
[19](https://github.com/pmndrs/zustand/discussions/2763)
[20](https://zustand.docs.pmnd.rs/migrations/migrating-to-v4)
[21](https://jsdev.space/howto/zustand5-react/)
[22](https://dev.to/hasunnilupul/exploring-react-router-v7s-new-framework-a-modern-take-on-routing-1g5o)
[23](https://www.npmjs.com/package/lucide-react)
[24](https://lucide.dev/guide/packages/lucide-react)
[25](https://lucide.dev)
[26](https://github.com/lucide-icons/lucide/tree/main/packages/lucide-react)
[27](https://app.unpkg.com/lucide-react@0.464.0/files/dist/umd)
[28](https://github.com/unplugin/unplugin-auto-import)
[29](https://vite.dev/blog/announcing-vite4-3)
[30](https://classic.yarnpkg.com/en/package/lucide-react)
[31](https://www.npmjs.com/package/@vitejs/plugin-react)