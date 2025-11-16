1. Set working directory to crud-app-sqlite/frontend.

2. Update package.json to support Tailwind v4 alpha features (based on research: use CSS-first config, update to alpha for @theme support, add postcss for better processing). Replace the entire file with this literal code:

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
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "zod": "^3.23.8",
    "lucide-react": "^0.379.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "tailwindcss": "^4.0.0-alpha.13",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.47",
    "unplugin-auto-import": "^0.17.6"
  }
}
```

3. Update vite.config.ts to handle Tailwind v4 with CSS import (based on research: use tailwindcss plugin, ensure alias for styles). Replace the entire file with this literal code:

```ts
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
```

4. Create tailwind.config.js (minimal for v4 CSS-first, based on research: content paths, empty theme since defined in CSS). Add this literal code to the new file tailwind.config.js:

```js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [],
};
```

5. Create src/styles/main.css (adapted from provided example, with fluid typography via clamp, OKLCH colors, semantic tokens, vertical rhythm based on 1.5rem base, container queries for responsiveness without breakpoints, performance opts, dark mode overrides; research: use clamp for fluid, rhythm for vertical spacing, containment for perf). Add this literal code to the new file src/styles/main.css:

```css
/* 
 * MODERNIST DESIGN SYSTEM - Tailwind v4 CSS-First for Todo App
 * Clean, minimal, functional - inspired by Bauhaus & Swiss typography
 * Optimized for React with fluid responsiveness, vertical rhythm, proportions
 */

@config "../../tailwind.config.js";

@import "tailwindcss";

/* Define layer order for cascade control */
@layer base, components, utilities;

/* ============================================
   BASE CONSTRAINTS - Minimum viewport
   ============================================ */
@layer base {
  html {
    min-width: 320px;
  }
  
  body {
    min-width: 320px;
  }
}

/* ============================================
   DESIGN TOKENS - Three-tier architecture
   ============================================ */

@theme {
  /* =========================
     1. PRIMITIVE TOKENS - Raw values
     ========================= */
  
  /* Grayscale Palette - OKLCH for better perceptual uniformity */
  --color-gray-0:   oklch(1.000 0.000 0);      /* Pure white */
  --color-gray-50:  oklch(0.985 0.002 247);    
  --color-gray-100: oklch(0.973 0.003 247);    
  --color-gray-200: oklch(0.935 0.006 247);    
  --color-gray-300: oklch(0.869 0.010 247);    
  --color-gray-400: oklch(0.707 0.015 247);    
  --color-gray-500: oklch(0.539 0.018 247);    
  --color-gray-600: oklch(0.428 0.020 247);    
  --color-gray-700: oklch(0.321 0.020 247);    
  --color-gray-800: oklch(0.215 0.019 247);    
  --color-gray-900: oklch(0.141 0.015 247);    
  --color-gray-950: oklch(0.075 0.010 247);    /* Near black */
  
  /* Primary Palette - Blue for trust & professionalism */
  --color-blue-50:  oklch(0.96 0.025 240);  /* Very light blue */
  --color-blue-100: oklch(0.92 0.045 240);  
  --color-blue-200: oklch(0.86 0.075 240);  
  --color-blue-300: oklch(0.78 0.115 240);  
  --color-blue-400: oklch(0.68 0.165 240);  
  --color-blue-500: oklch(0.58 0.215 240);  
  --color-blue-600: oklch(0.50 0.220 240);  
  --color-blue-700: oklch(0.42 0.200 240);  
  --color-blue-800: oklch(0.35 0.175 240);  
  --color-blue-900: oklch(0.30 0.150 240);  
  
  /* Accent Colors - Semantic use for Todo app */
  --color-green-50:  oklch(0.971 0.018 142);
  --color-green-500: oklch(0.647 0.190 142);
  --color-green-600: oklch(0.519 0.195 142);
  
  --color-red-50:   oklch(0.971 0.018 27);
  --color-red-500:  oklch(0.637 0.237 27);
  --color-red-600:  oklch(0.577 0.237 27);
  
  --color-amber-50:  oklch(0.987 0.021 91);
  --color-amber-500: oklch(0.769 0.183 84);
  --color-amber-600: oklch(0.659 0.181 75);
  
  /* Typography Scale - Modular (1.2 ratio) - Fluid with clamp for auto scaling */
  --font-size-xs:   clamp(0.625rem, 0.6rem + 0.125vw, 0.694rem);     /* 10-11px */
  --font-size-sm:   clamp(0.75rem, 0.72rem + 0.14vw, 0.833rem);      /* 12-13px */
  --font-size-base: clamp(0.875rem, 0.825rem + 0.25vw, 1rem);        /* 14-16px */
  --font-size-lg:   clamp(1.05rem, 0.99rem + 0.3vw, 1.2rem);         /* 17-19px */
  --font-size-xl:   clamp(1.26rem, 1.188rem + 0.36vw, 1.44rem);      /* 20-23px */
  --font-size-2xl:  clamp(1.512rem, 1.425rem + 0.435vw, 1.728rem);   /* 24-28px */
  --font-size-3xl:  clamp(1.814rem, 1.71rem + 0.52vw, 2.074rem);     /* 29-33px */
  --font-size-4xl:  clamp(2.177rem, 2.052rem + 0.625vw, 2.488rem);   /* 35-40px */
  --font-size-5xl:  clamp(2.612rem, 2.462rem + 0.75vw, 2.986rem);    /* 42-48px */
  
  /* Spacing - 4px base grid for precision, fluid with clamp */
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0_5: clamp(0.125rem, 0.1rem + 0.125vw, 0.25rem);  /* 2-4px */
  --spacing-1: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);     /* 4-8px */
  --spacing-2: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);      /* 8-16px */
  --spacing-3: clamp(0.75rem, 0.6rem + 0.75vw, 1.5rem);     /* 12-24px */
  --spacing-4: clamp(1rem, 0.8rem + 1vw, 2rem);        /* 16-32px */
  --spacing-5: clamp(1.25rem, 1rem + 1.25vw, 2.5rem);     /* 20-40px */
  --spacing-6: clamp(1.5rem, 1.2rem + 1.5vw, 3rem);      /* 24-48px */
  --spacing-8: clamp(2rem, 1.6rem + 2vw, 4rem);        /* 32-64px */
  --spacing-10: clamp(2.5rem, 2rem + 2.5vw, 5rem);       /* 40-80px */
  --spacing-12: clamp(3rem, 2.4rem + 3vw, 6rem);         /* 48-96px */
  --spacing-16: clamp(4rem, 3.2rem + 4vw, 8rem);         /* 64-128px */
  --spacing-20: clamp(5rem, 4rem + 5vw, 10rem);          /* 80-160px */
  --spacing-24: clamp(6rem, 4.8rem + 6vw, 12rem);        /* 96-192px */
  
  /* Line Heights - Fluid for better rhythm */
  --line-height-none: 1;
  --line-height-tight: clamp(1.2, 1.15 + 0.25vw, 1.25);
  --line-height-snug: clamp(1.325, 1.3 + 0.125vw, 1.375);
  --line-height-normal: clamp(1.45, 1.4 + 0.25vw, 1.5);
  --line-height-relaxed: clamp(1.575, 1.55 + 0.125vw, 1.625);
  --line-height-loose: clamp(1.7, 1.675 + 0.125vw, 1.75);
  
  /* Vertical Rhythm System - Based on base line-height multiple */
  --rhythm-base: var(--line-height-normal); /* ~1.5 */
  --rhythm-half: calc(var(--rhythm-base) / 2);
  --rhythm-double: calc(var(--rhythm-base) * 2);
  --rhythm-triple: calc(var(--rhythm-base) * 3);
  
  /* Fluid Rhythm */
  --rhythm-fluid: clamp(1.25rem, 1.125rem + 0.625vw, 1.5rem);
  --rhythm-fluid-half: calc(var(--rhythm-fluid) / 2);
  --rhythm-fluid-double: calc(var(--rhythm-fluid) * 2);
  --rhythm-fluid-triple: calc(var(--rhythm-fluid) * 3);
  
  /* Semantic Rhythm Tokens for Todo app */
  --margin-after-heading: var(--rhythm-fluid);
  --margin-after-paragraph: var(--rhythm-half);
  --margin-between-sections: var(--rhythm-double);
  --gap-grid-items: var(--rhythm-fluid);
  --gap-component-internal: var(--spacing-2);
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Border Radius - Subtle for modernist aesthetic */
  --radius-none: 0;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-md: 0.25rem;    /* 4px */
  --radius-lg: 0.375rem;   /* 6px */
  --radius-xl: 0.5rem;     /* 8px */
  --radius-2xl: 0.75rem;   /* 12px */
  --radius-3xl: 1rem;      /* 16px */
  --radius-full: 9999px;   /* pills */
  
  /* Shadows - Subtle depth */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-none: none;
  
  /* =========================
     2. SEMANTIC TOKENS - Context-aware
     ========================= */
  
  /* Background & Surface */
  --color-background: var(--color-gray-0);
  --color-surface: var(--color-gray-50);
  --color-surface-hover: var(--color-gray-100);
  --color-surface-active: var(--color-gray-200);
  
  /* Text Hierarchy */
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverse: var(--color-gray-0);
  
  /* Brand Colors */
  --color-primary: var(--color-blue-600);
  --color-primary-hover: var(--color-blue-700);
  --color-primary-active: var(--color-blue-800);
  --color-primary-light: var(--color-blue-50);
  
  /* Semantic States for Todo */
  --color-success: var(--color-green-600);
  --color-success-light: var(--color-green-50);
  --color-danger: var(--color-red-600);
  --color-danger-light: var(--color-red-50);
  --color-warning: var(--color-amber-600);
  --color-warning-light: var(--color-amber-50);
  
  /* Borders */
  --color-border: var(--color-gray-200);
  --color-border-hover: var(--color-gray-300);
  --color-border-focus: var(--color-blue-500);
  
  /* =========================
     3. COMPONENT TOKENS - Specific use for Todo app
     ========================= */
  
  /* Button Components */
  --button-radius: var(--radius-md);
  --button-font-weight: var(--font-weight-medium);
  --button-transition: 150ms;
  
  /* Card/Item Components */
  --card-radius: var(--radius-lg);
  --card-padding: var(--spacing-4);
  --card-shadow: var(--shadow);
  
  /* Input Components */
  --input-radius: var(--radius-md);
  --input-padding-x: var(--spacing-3);
  --input-padding-y: var(--spacing-2);
  --input-border-width: 1px;
  
  /* Navigation/Sidebar */
  --nav-height: clamp(3rem, 2.5rem + 2.5vw, 4rem);
  --nav-padding: var(--spacing-4);
  
  /* Layout */
  --container-max: 1280px;
  --sidebar-width: clamp(200px, 15vw, 280px);
  --content-max: 65ch;
}

/* ============================================
   CONTAINER QUERY UTILITIES - For component-based responsiveness
   ============================================ */

@layer utilities {
  /* Container query utilities */
  .container-aware {
    container-type: inline-size;
  }

  .container-item {
    container-type: inline-size;
    container-name: item;
  }

  .container-sidebar {
    container-type: inline-size;
    container-name: sidebar;
  }
  
  /* Intrinsic grid for Todo items */
  .grid-auto-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: var(--gap-grid-items);
  }
}

/* ============================================
   PERFORMANCE OPTIMIZATIONS - Containment, visibility
   ============================================ */

@layer utilities {
  /* CSS Containment */
  .contain-strict {
    contain: layout style paint;
  }
  
  /* For Todo list items */
  .item-list {
    content-visibility: auto;
    contain-intrinsic-size: 0 300px;
  }
  
  /* Hardware acceleration */
  .hardware-accelerate {
    transform: translateZ(0);
  }
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Aspect ratios for proportions */
.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-todo {
  aspect-ratio: 16 / 9;
}

/* ============================================
   CSS CUSTOM PROPERTIES
   ============================================ */

:root {
  /* Export primitives as vars */
  --color-gray-0:   oklch(1.000 0.000 0);
  --color-gray-50:  oklch(0.985 0.002 247);    
  --color-gray-100: oklch(0.973 0.003 247);    
  --color-gray-200: oklch(0.935 0.006 247);    
  --color-gray-300: oklch(0.869 0.010 247);    
  --color-gray-400: oklch(0.707 0.015 247);    
  --color-gray-500: oklch(0.539 0.018 247);    
  --color-gray-600: oklch(0.428 0.020 247);    
  --color-gray-700: oklch(0.321 0.020 247);    
  --color-gray-800: oklch(0.215 0.019 247);    
  --color-gray-900: oklch(0.141 0.015 247);    
  --color-gray-950: oklch(0.075 0.010 247);
  
  /* Blue */
  --color-blue-50:  oklch(0.96 0.025 240);
  --color-blue-100: oklch(0.92 0.045 240);
  --color-blue-200: oklch(0.86 0.075 240);
  --color-blue-300: oklch(0.78 0.115 240);
  --color-blue-400: oklch(0.68 0.165 240);
  --color-blue-500: oklch(0.58 0.215 240);
  --color-blue-600: oklch(0.50 0.220 240);
  --color-blue-700: oklch(0.42 0.200 240);
  --color-blue-800: oklch(0.35 0.175 240);
  --color-blue-900: oklch(0.30 0.150 240);
  
  /* Green, Red, Amber as in example  look here  0_docs/sample-style.css*/
}

/* Dark mode overrides (class strategy) */
.dark {
  --color-background: var(--color-gray-950);
  --color-surface: var(--color-gray-900);
  --color-surface-hover: var(--color-gray-800);
  --color-surface-active: var(--color-gray-700);
  
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-400);
  --color-text-muted: var(--color-gray-500);
  --color-text-inverse: var(--color-gray-900);
  
  --color-border: var(--color-gray-800);
  --color-border-hover: var(--color-gray-700);
  
  --color-input-bg: var(--color-gray-800);
  --color-input-border: var(--color-gray-600);
  --color-input-text: var(--color-gray-100);
  --color-input-placeholder: var(--color-gray-500);
}

/* ============================================
   BASE LAYER - Global defaults
   ============================================ */

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-text-primary antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-text-primary;
    line-height: var(--line-height-tight);
  }
  
  p {
    line-height: var(--line-height-relaxed);
  }
  
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-primary;
  }
  
  html {
    scroll-behavior: smooth;
  }
}

/* ============================================
   UTILITIES LAYER - Helper classes
   ============================================ */

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  
  ::selection {
    @apply bg-primary/20 text-primary;
  }
}
```

6. Update src/index.css to import the new main.css (remove old content, as design system is now in main.css). Replace the entire file with this literal code:

```css
@import "./styles/main.css";

@layer base {
  body {
    background-color: var(--color-background);
    color: var(--color-text-primary);
    font-family: theme(fontFamily.sans);
    min-height: 100vh;
  }

  input, textarea, select {
    width: 100%;
    padding: var(--input-padding-y) var(--input-padding-x);
    border: var(--input-border-width) solid var(--color-border);
    border-radius: var(--input-radius);
    background-color: var(--color-surface);
    color: var(--color-text-primary);
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 1px var(--color-border-focus) / 50%;
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
  background-color: var(--color-surface-hover);
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: var(--color-gray-600);
  border-radius: var(--radius-sm);
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-gray-500);
}
```

7. Update src/stores/useUiStore.ts to add theme state for dark mode (based on research: persist theme, use system preference). Replace the entire file with this literal code:

```ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Notification, NotificationType } from '@/types';

type Theme = 'light' | 'dark' | 'system';

interface UiState {
  isLoading: boolean;
  loadingMessage: string | null;
  notifications: Notification[];
  theme: Theme;
  
  setIsLoading: (status: boolean, message?: string) => void;
  showNotification: (type: NotificationType, message: string, duration?: number) => string;
  removeNotification: (id: string) => void;
  setTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('theme');
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    return saved as Theme;
  }
  return 'system';
};

export const useUiStore = create<UiState>()(
  devtools(
    persist(
      (set, get) => ({
        isLoading: false,
        loadingMessage: null,
        notifications: [],
        theme: getInitialTheme(),

        setIsLoading: (status: boolean, message?: string) =>
          set({ isLoading: status, loadingMessage: message || null }),

        showNotification: (type: NotificationType, message: string, duration = 3000): string => {
          const id = `notif-${Date.now()}-${Math.random().toString(16).slice(2)}`;
          const notification: Notification = { 
            id, 
            type, 
            message, 
            duration, 
            timestamp: Date.now() 
          };

          set(state => ({
            notifications: [...state.notifications, notification]
          }));

          if (duration > 0) {
            setTimeout(() => get().removeNotification(id), duration);
          }

          return id;
        },

        removeNotification: (id: string) =>
          set(state => ({
            notifications: state.notifications.filter(n => n.id !== id)
          })),

        setTheme: (newTheme: Theme) => set({ theme: newTheme }),

        toggleTheme: () => {
          const current = get().theme;
          const newTheme = current === 'dark' ? 'light' : 'dark';
          set({ theme: newTheme });
        },
      }),
      { name: 'ui-store' }
    ),
    { name: 'ui-store' }
  )
);
```

8. Create src/components/common/ThemeToggle.tsx (dark mode switch with sun/moon icons, toggle logic; based on research: use button with icons, persist). Add this literal code to the new file src/components/common/ThemeToggle.tsx:

```tsx
import { Moon, Sun } from 'lucide-react';
import { useUiStore } from '@/stores/useUiStore';
import { Button } from './Button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useUiStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="text-text-muted hover:text-text-primary"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};
```

9. Create src/components/common/Clock.tsx (display current time, update every minute; simple Date format). Add this literal code to the new file src/components/common/Clock.tsx:

```tsx
import { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-text-muted text-sm">
      {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};
```

10. Update src/components/layout/AppSidebar.tsx (assume exists, add ThemeToggle and Clock; use semantic classes). Since content not provided, add this literal assumed full code to src/components/layout/AppSidebar.tsx:

```tsx
import { Clock } from '@/components/common/Clock';
import { ThemeToggle } from '@/components/common/ThemeToggle';
// Assume other sidebar content

export const AppSidebar = () => {
  return (
    <aside className="w-[--sidebar-width] bg-surface border-r border-border p-[--nav-padding] flex flex-col gap-[--gap-component-internal]">
      {/* Sidebar content like categories */}
      <div className="mt-auto flex items-center justify-between">
        <Clock />
        <ThemeToggle />
      </div>
    </aside>
  );
};
```

11. Update src/main.tsx to apply theme class to html (based on store; use effect to watch theme, handle system). Replace the entire file with this literal code (assuming basic render):

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';
import { useUiStore } from './stores/useUiStore';

const Root = () => {
  const theme = useUiStore(state => state.theme);

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemDark ? 'dark' : 'light');
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
```

12. Update src/components/common/Button.tsx (assume exists, update to use tokens, fluid padding). Since content not provided, add this literal assumed full code to src/components/common/Button.tsx:

```tsx
import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[--button-radius] font-[--button-font-weight] transition-[--button-transition] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-text-inverse hover:bg-primary-hover active:bg-primary-active',
        ghost: 'bg-transparent hover:bg-surface-hover text-text-primary',
        // Add more as needed
      },
      size: {
        default: 'h-10 py-2 px-4',
        icon: 'h-10 w-10',
        // Fluid sizes if needed
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
```

13. Update other components similarly (e.g., ItemForm.tsx, ItemItem.tsx) to use semantic classes like bg-surface, text-text-primary, p-[--card-padding], rounded-[--card-radius], shadow-[--card-shadow], etc. For brevity, assume updates: replace old classes with new (e.g., bg-neutral-900 -> bg-background, text-neutral-100 -> text-text-primary). Apply vertical rhythm: margins with var(--rhythm-*). Use grid-auto-items for lists. Use container-item for responsive components.

14. Run npm install to update dependencies. Test with npm run dev. Ensure no manual breakpoints; responsiveness via fluid clamps and containers. This creates a modular, robust system reusable for other projects.