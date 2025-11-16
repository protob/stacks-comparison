# Frontend Source Code Collection (crud-app-sqlite)

**Generated on:** nie, 16 lis 2025, 19:20:59 CET
**Frontend directory:** /home/dtb/0-dev/00-nov-2025/shadcn-and-simiar/crud-app-sqlite-tanstack/frontend

---

## `index.html`
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Todo App - Manage Your Tasks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## `gen.sh`
```
#!/bin/bash
# setup-react-project.sh
set -e

echo "\U0001f680 Creating React project structure in current directory..."

# Create directory structure
mkdir -p src/{components/{common,items,layout},stores,hooks,api,types,utils,pages}
mkdir -p public

# Create main files
touch src/{main.tsx,App.tsx,index.css}
touch src/types/index.ts
touch src/utils/{helpers.ts,slugify.ts,schema-helpers.ts}
touch src/api/{apiClient.ts,itemApi.ts}
touch src/stores/{useItemStore.ts,useUiStore.ts}
touch src/hooks/useItemFilters.ts
touch src/pages/ItemPage.tsx

# Create component files
touch src/components/common/{Button.tsx,Icon.tsx,Modal.tsx,FormField.tsx,TagInput.tsx,SchemaForm.tsx,SchemaField.tsx,ConfirmDeleteModal.tsx,Notifications.tsx}
touch src/components/items/{ItemForm.tsx,ItemItem.tsx}
touch src/components/layout/{AppSidebar.tsx,FilterBar.tsx}

# Create config files
touch {vite.config.ts,tsconfig.json,tsconfig.node.json,tailwind.config.js}
touch index.html

# Create package.json
cat > package.json << 'EOF'
{
  "name": "react-todo-app",
  "private": true,
  "version": "0.1.0",
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
    "@tailwindcss/vite": "^4.0.0-alpha.13",
    "tailwindcss": "^4.0.0-alpha.13",
    "autoprefixer": "^10.4.19",
    "unplugin-auto-import": "^0.17.6"
  }
}
EOF

echo "\u2705 Project structure created successfully!"
echo ""
echo "\U0001f4c1 Created directory structure:"
echo "\u251c\u2500\u2500 src/"
echo "\u2502   \u251c\u2500\u2500 components/"
echo "\u2502   \u2502   \u251c\u2500\u2500 common/"
echo "\u2502   \u2502   \u251c\u2500\u2500 items/"
echo "\u2502   \u2502   \u2514\u2500\u2500 layout/"
echo "\u2502   \u251c\u2500\u2500 stores/"
echo "\u2502   \u251c\u2500\u2500 hooks/"
echo "\u2502   \u251c\u2500\u2500 api/"
echo "\u2502   \u251c\u2500\u2500 types/"
echo "\u2502   \u251c\u2500\u2500 utils/"
echo "\u2502   \u2514\u2500\u2500 pages/"
echo "\u251c\u2500\u2500 public/"
echo "\u2514\u2500\u2500 config files (package.json, vite.config.ts, etc.)"
echo ""
echo "\U0001f3af Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Copy the provided code files to their respective locations"
echo "3. Start development: npm run dev"
```

## `tsconfig.json`
```
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
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

## `package.json`
```
{
  "name": "react-todo-app-tanstack",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "bun run route-gen && tsc && vite build",
    "preview": "vite preview",
    "type-check": "tsc --noEmit",
    "route-gen": "vite-node src/router.ts"
  },
  "dependencies": {
    "@tanstack/react-form": "^1.25.0",
    "@tanstack/react-query": "^5.90.9",
    "@tanstack/react-router": "^1.136.6",
    "@tanstack/zod-form-adapter": "^0.42.1",
    "clsx": "^2.1.0",
    "lucide-react": "^0.379.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zod": "^3.23.8",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0-alpha.13",
    "@tanstack/react-query-devtools": "^5.90.2",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "tailwindcss": "^4.0.0-alpha.13",
    "typescript": "^5.7.2",
    "unplugin-auto-import": "^0.17.6",
    "vite": "^5.2.0",
    "vite-node": "^2.0.3"
  }
}

```

## `README.md`
```
# Items Frontend - React + Tailwind v4 Design System

A modern, responsive React frontend for managing items with a comprehensive design system built on Tailwind CSS v4 alpha.

## Tech Stack

- **Framework:** [React 18](https://react.dev/) - Modern UI library
- **Build Tool:** [Vite 5](https://vitejs.dev/) - Lightning-fast development server
- **Styling:** [Tailwind CSS v4 Alpha](https://tailwindcss.com/) - Utility-first CSS with CSS-first configuration
- **State Management:** [Zustand 4](https://zustand-demo.pmnd.rs/) - Lightweight state management
- **Routing:** [React Router v6](https://reactrouter.com/) - Client-side routing
- **Validation:** [Zod](https://zod.dev/) - TypeScript-first schema validation
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- **TypeScript:** Full type safety across the application
- **Auto-Imports:** [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) - Automatic imports for React, hooks, and utilities

## Key Features

✨ **Modernist Design System**
- Three-tier token architecture (Primitive → Semantic → Component)
- OKLCH color palette for better perceptual uniformity
- Fluid typography and spacing using `clamp()` for responsive scaling
- Vertical rhythm system for consistent spacing
- Dark/light/system theme modes with persistent state

🎨 **Advanced Styling**
- Tailwind v4 CSS-first configuration with `@theme` directive
- Semantic design tokens for maintainability
- Container queries for component-based responsiveness
- Performance optimizations (CSS containment, content-visibility)
- No manual breakpoints - fluid responsiveness throughout

🏗️ **Modern Architecture**
- Component-based structure with separation of concerns
- Type-safe API client with automatic error handling
- Zustand stores for state management (UI + Items)
- Custom hooks for reusable logic (filters, etc.)
- Auto-imported React hooks and utilities

🔧 **Developer Experience**
- Hot module replacement (HMR) with Vite
- TypeScript strict mode with path aliases (`@/*`)
- Auto-generated type declarations for imports
- Component-level code splitting
- Development-friendly error notifications

## Project Structure

```
frontend/
├── src/
│   ├── api/                      # API client & endpoints
│   │   ├── apiClient.ts          # Base HTTP client with error handling
│   │   └── itemApi.ts            # Item CRUD operations
│   ├── components/
│   │   ├── common/               # Reusable UI components
│   │   │   ├── Button.tsx        # Multi-variant button with icons
│   │   │   ├── Clock.tsx         # Real-time clock display
│   │   │   ├── ThemeToggle.tsx   # Dark mode toggle
│   │   │   ├── Icon.tsx          # Lucide icon wrapper
│   │   │   ├── Modal.tsx         # Modal dialog
│   │   │   ├── Notifications.tsx # Toast notifications
│   │   │   ├── FormField.tsx     # Form input wrapper
│   │   │   ├── SchemaForm.tsx    # Dynamic form generator
│   │   │   ├── SchemaField.tsx   # Dynamic field components
│   │   │   ├── TagInput.tsx      # Tag input component
│   │   │   └── ConfirmDeleteModal.tsx
│   │   ├── items/                # Item-specific components
│   │   │   ├── ItemForm.tsx      # Create/edit item form
│   │   │   └── ItemItem.tsx      # Item list item display
│   │   └── layout/               # Layout components
│   │       ├── AppSidebar.tsx    # Sidebar with search, tags, theme
│   │       └── FilterBar.tsx     # Filter controls
│   ├── hooks/                    # Custom React hooks
│   │   └── useItemFilters.ts     # Item filtering logic
│   ├── pages/                    # Page components
│   │   ├── ItemPage.tsx          # Main items page
│   │   ├── AboutPage.tsx         # About/info page
│   │   └── ItemDetailPage.tsx   # Item detail view page
│   ├── stores/                   # Zustand state stores
│   │   ├── useItemStore.ts       # Items state & CRUD operations
│   │   └── useUiStore.ts         # UI state (loading, notifications, theme)
│   ├── styles/                   # Design system styles
│   │   └── main.css              # Tailwind v4 design tokens & utilities
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # Shared types (Item, API responses, etc.)
│   ├── utils/                    # Utility functions
│   │   ├── helpers.ts            # General helpers
│   │   ├── schema-helpers.ts     # Schema validation helpers
│   │   └── slugify.ts            # URL slug generation
│   ├── App.tsx                   # Root application component
│   ├── main.tsx                  # Entry point with theme application
│   ├── index.css                 # Base styles & imports
│   └── auto-imports.d.ts         # Auto-generated import types
├── index.html                    # HTML template
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind v4 configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

## Design System

### Color System (OKLCH)

The design system uses OKLCH colors for better perceptual uniformity and smoother gradients:

**Primitives:**
- Grayscale: `gray-0` through `gray-950` (OKLCH-based)
- Primary: Blue palette (`blue-50` to `blue-900`)
- Semantic: Green (success), Red (danger), Amber (warning)

**Semantic Tokens:**
- `--color-background`, `--color-surface`, `--color-surface-hover`
- `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`
- `--color-primary`, `--color-primary-hover`, `--color-primary-active`
- `--color-success`, `--color-danger`, `--color-warning`

**Dark Mode:**
All semantic tokens automatically adjust when `.dark` class is applied to `<html>`.

### Typography

Fluid typography scales responsively using `clamp()`:
- Base: `clamp(0.875rem, 0.825rem + 0.25vw, 1rem)` → 14-16px
- Scale ratio: 1.2 (modular scale)
- Line heights: `tight`, `snug`, `normal`, `relaxed`, `loose`

### Spacing & Rhythm

- **Base grid:** 4px with fluid scaling
- **Vertical rhythm:** Based on 1.5rem baseline with fluid adjustments
- **Semantic spacing:**
  - `--margin-after-heading`, `--margin-after-paragraph`
  - `--gap-grid-items`, `--gap-component-internal`

### Component Tokens

Pre-defined tokens for consistent component styling:
- **Buttons:** `--button-radius`, `--button-font-weight`, `--button-transition`
- **Cards:** `--card-radius`, `--card-padding`, `--card-shadow`
- **Inputs:** `--input-radius`, `--input-padding-x/y`, `--input-border-width`
- **Layout:** `--nav-height`, `--sidebar-width`, `--container-max`

### Token Usage Guide

**IMPORTANT:** Always use semantic design tokens instead of raw Tailwind utilities. This ensures consistent theming and makes the design system maintainable.

#### Color Classes (Tailwind mapped to tokens)

Use these semantic classes everywhere:

```jsx
// ✅ CORRECT - Using semantic tokens
<div className="bg-surface text-text-primary border-border">
<div className="bg-modal-bg border-modal-border">
<button className="bg-primary text-text-inverse hover:bg-primary-hover">
<span className="text-text-secondary">Secondary text</span>
<span className="text-text-muted">Muted text</span>
<div className="bg-danger text-danger">Error state</div>

// ❌ WRONG - Using raw color values
<div className="bg-gray-800 text-gray-100 border-gray-700">
<div className="bg-neutral-800 border-neutral-600">
<button className="bg-blue-600 text-white hover:bg-blue-700">
```

**Available semantic color tokens:**
- **Backgrounds:** `bg-background`, `bg-surface`, `bg-surface-hover`, `bg-surface-active`, `bg-modal-bg`
- **Text:** `text-text-primary`, `text-text-secondary`, `text-text-muted`, `text-text-inverse`
- **Borders:** `border-border`, `border-border-hover`, `border-border-focus`, `border-modal-border`
- **Brand:** `bg-primary`, `bg-primary-hover`, `bg-primary-active`, `text-primary`
- **States:** `bg-success`, `bg-danger`, `bg-warning`, `text-success`, `text-danger`, `text-warning`
- **State backgrounds:** `bg-success-light`, `bg-danger-light`, `bg-warning-light`

#### Typography Classes

Use token-based text size utilities:

```jsx
// ✅ CORRECT - Token-based sizes
<h1 className="text-size-xl">Large heading</h1>
<p className="text-size-base">Body text</p>
<span className="text-size-sm">Small text</span>
<span className="text-size-xs">Extra small text</span>

// ❌ WRONG - Raw Tailwind sizes
<h1 className="text-xl">Large heading</h1>
<p className="text-base">Body text</p>
```

#### Spacing & Layout

Use token-based spacing utilities:

```jsx
// ✅ CORRECT - Token-based spacing
<div className="p-card">Card with padding</div>
<div className="px-input-x py-input-y">Input padding</div>
<div className="p-nav">Navigation padding</div>
<div className="gap-component">Component gap</div>
<div className="gap-grid">Grid gap</div>

// ❌ WRONG - Raw spacing values
<div className="p-4">Card with padding</div>
<div className="px-3 py-2">Input padding</div>
<div className="gap-2">Component gap</div>
```

#### Border Radius

Use semantic radius classes:

```jsx
// ✅ CORRECT - Token-based radius
<button className="rounded-button">Button</button>
<div className="rounded-card">Card</div>
<input className="rounded-input" />

// ❌ WRONG - Raw radius values
<button className="rounded-md">Button</button>
<div className="rounded-lg">Card</div>
```

#### Button Sizing

Buttons use custom utility classes for consistent sizing:

```jsx
// Icon-only buttons automatically use token-based sizing
<Button size="sm" icon="Edit" />  // Uses .btn-icon-sm internally
<Button size="md" icon="Plus" />  // Uses .btn-icon-md internally

// Buttons with text also use token-based sizing
<Button size="sm">Submit</Button>  // Uses .btn-sm internally
<Button size="md">Submit</Button>  // Uses .btn-md internally
```

**Available button utilities:** `.btn-xs`, `.btn-sm`, `.btn-md`, `.btn-lg`, `.btn-icon-xs`, `.btn-icon-sm`, `.btn-icon-md`, `.btn-icon-lg`

#### Tags & Badges

Use the `.tag-sm` utility for consistent tag/badge styling:

```jsx
// ✅ CORRECT - Using tag utility
<span className="tag-sm bg-surface-hover text-text-secondary rounded-button">
  Tag
</span>

// ❌ WRONG - Raw padding and text size
<span className="px-2 py-1 text-xs bg-gray-700">Tag</span>
```

#### Custom Token Utilities

The design system provides these custom utilities (defined in `src/styles/main.css`):

- **Text sizes:** `.text-size-xs`, `.text-size-sm`, `.text-size-base`, `.text-size-lg`, `.text-size-xl`
- **Tags:** `.tag-sm` (includes padding and font-size)
- **Buttons:** `.btn-xs`, `.btn-sm`, `.btn-md`, `.btn-lg` (with text), `.btn-icon-*` (icon-only)
- **Container queries:** `.container-aware`, `.grid-auto-items`
- **Performance:** `.contain-strict`, `.item-list`, `.hardware-accelerate`

### Responsive Design

**Container Queries** (not breakpoints!):
```css
.container-aware { container-type: inline-size; }
.grid-auto-items {
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
}
```

Components respond to their container size, not viewport size.

### Performance Optimizations

- **CSS Containment:** `contain: layout style paint`
- **Content Visibility:** `content-visibility: auto` for long lists
- **Hardware Acceleration:** `transform: translateZ(0)` utilities
- **Reduced Motion:** Respects `prefers-reduced-motion`

## State Management

### Item Store (`useItemStore`)

Manages all item-related state and operations:

```typescript
const {
  itemTree,           // Items organized by category
  isLoading,          // Loading state
  fetchItemTree,      // Fetch all items
  addItem,            // Create new item
  updateItem,         // Update existing item
  toggleItemCompletion, // Toggle completion status
  deleteItem          // Delete item
} = useItemStore();
```

### UI Store (`useUiStore`)

Manages global UI state:

```typescript
const {
  isLoading,          // Global loading state
  loadingMessage,     // Loading message
  notifications,      // Toast notifications
  theme,              // Current theme (light/dark/system)
  setIsLoading,       // Set loading state
  showNotification,   // Show toast notification
  removeNotification, // Remove notification
  setTheme,           // Set theme
  toggleTheme         // Toggle between light/dark
} = useUiStore();
```

Theme is persisted to `localStorage` and applied to `<html>` element.

## API Integration

The frontend communicates with the backend REST API:

**Base URL:** `http://localhost:3000/api` (configurable via `apiClient.ts`)

**Endpoints:**
- `GET /items/tree` - Fetch all items organized by category
- `POST /items` - Create a new item
- `GET /items/{categorySlug}/{itemSlug}` - Get specific item
- `PATCH /items/{categorySlug}/{itemSlug}` - Update item
- `DELETE /items/{categorySlug}/{itemSlug}` - Delete item

**Error Handling:**
- Automatic error notification via `useUiStore`
- Type-safe responses with `ApiResponse<T>` wrapper
- Network error detection and user-friendly messages

## Routing

The application uses React Router v6 for client-side navigation:

**Routes:**
- `/` - Main items page with list, search, and filtering
- `/about` - About page with app information and tech stack
- `/items/:categorySlug/:itemSlug` - Item detail view page

**Navigation:**
- Header contains Home and About links with active state highlighting
- Item titles in list are clickable links to detail pages
- Detail page includes back button navigation
- Logo/title in header navigates to home

**Features:**
- URL-based routing with path parameters
- Active route highlighting in navigation
- Back button support (browser history)
- Loading and error states per page
- Separate components for each route demonstrating proper React Router usage

## Running the Application

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:3000` (see `../backend/README.md`)

### Quick Start

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default).

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run type-check` - Run TypeScript type checking

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Access in code via `import.meta.env.VITE_API_BASE_URL`.

## Features Overview

### Item Management
- ✅ Create items with name, text, priority, tags, and category
- ✅ Edit items inline or via modal
- ✅ Toggle completion status
- ✅ Delete items with confirmation
- ✅ Search items by name/text
- ✅ Filter by tags (multi-select)
- ✅ View items organized by category

### UI Features
- 🎨 Dark/light/system theme modes
- 🕐 Real-time clock in sidebar
- 🔔 Toast notifications for actions
- 🔍 Live search with debouncing
- 🏷️ Tag filtering with visual indicators
- ⌨️ Keyboard-friendly interactions
- 📱 Fully responsive (fluid design)

### Priority Levels
- `low` - Low priority (gray)
- `mid` - Medium priority (blue)
- `high` - High priority (red)

### Categories
Each item belongs to exactly one category. Categories are auto-generated from items and displayed in the tree view.

## TypeScript Configuration

**Strict Mode:** Enabled with `noUnusedLocals`, `noUnusedParameters`
**Path Aliases:** `@/*` → `src/*`
**Target:** ES2024 with DOM types
**Module:** ESNext (native ESM)

### Auto-Imports

The following are automatically imported (no manual import needed):

**React:**
- `useState`, `useEffect`, `useCallback`, `useMemo`, etc.

**React Router:**
- `useNavigate`, `useParams`, `useLocation`, `useSearchParams`

**Zustand:**
- `create` (as default)
- `devtools`, `persist` (from middleware)

**Utils:**
- `clsx` (for conditional classes)
- All exports from `src/hooks/**`, `src/stores/**`, `src/utils/**`, `src/api/**`, `src/types/**`

See `src/auto-imports.d.ts` for the complete list.

## Development Guidelines

### Adding a New Component

1. Create component in appropriate directory:
   - `components/common/` - Reusable UI components
   - `components/items/` - Item-specific components
   - `components/layout/` - Layout components

2. Use semantic design tokens:
   ```tsx
   // ✅ Good
   <div className="bg-surface text-text-primary p-[--card-padding]">

   // ❌ Avoid
   <div className="bg-gray-50 text-gray-900 p-4">
   ```

3. Leverage auto-imports (no need to import React hooks manually)

### Adding New Design Tokens

Edit `src/styles/main.css`:

```css
@theme {
  /* Add to appropriate section */
  --my-new-token: value;
}
```

### Modifying the API

1. Update types in `src/types/index.ts`
2. Update API functions in `src/api/itemApi.ts`
3. Update store if needed in `src/stores/useItemStore.ts`
4. TypeScript will catch any type mismatches

## Production Build

To build for production:

```bash
npm run build
```

**Output:** `dist/` directory with optimized static files

**Optimizations:**
- Code splitting (vendor, icons chunks)
- Tree shaking (unused code removed)
- Minification (JS, CSS, HTML)
- Asset optimization

**Serving:**
```bash
# Preview locally
npm run preview

# Or serve with any static file server
npx serve dist
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

Modern browsers with ES2024 support required.

## Troubleshooting

### Port already in use
Change Vite port: `vite --port 3001`

### API connection errors
1. Verify backend is running on `http://localhost:3000`
2. Check `VITE_API_BASE_URL` in `.env`
3. Check browser console for CORS errors

### Theme not persisting
Clear localStorage: `localStorage.clear()` in browser console

### Auto-imports not working
1. Restart TypeScript server in your editor
2. Check `src/auto-imports.d.ts` was generated
3. Run `npm run dev` to regenerate

### Build errors
1. Run `npm run type-check` to find type errors
2. Clear Vite cache: `rm -rf node_modules/.vite`
3. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`

## Performance Tips

- Items are rendered with `content-visibility: auto` for long lists
- Theme changes use CSS classes (instant, no re-render)
- Zustand stores use selectors to prevent unnecessary re-renders
- Vite handles code splitting automatically

## Contributing

When adding features:
1. Follow the existing component structure
2. Use semantic design tokens (not raw Tailwind classes)
3. Add proper TypeScript types
4. Test in both light and dark modes
5. Ensure responsive behavior (test at different container sizes)

## Related Documentation

- [Backend API Documentation](../backend/README.md)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Zustand Guide](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Router Docs](https://reactrouter.com/en/main)

---

**Status:** ✅ Fully functional frontend with modernist design system, dark mode, and responsive layout

```

## `tsconfig.node.json`
```
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

## `vite.config.ts`
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
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
          '@tanstack/react-query': ['useQuery', 'useMutation', 'useQueryClient'],
          '@tanstack/react-router': ['useRoute', 'Link'],
          '@tanstack/react-form': ['useForm'],
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

## `src/utils/slugify.ts`
```
export function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}
```

## `src/utils/helpers.ts`
```
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};
```

## `src/utils/schema-helpers.ts`
```
import { z } from 'zod';

export function unwrapZodType(schema: z.ZodTypeAny): z.ZodTypeAny {
  if (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    const inner = schema._def.innerType || (typeof (schema as any).unwrap === 'function' ? (schema as any).unwrap() : undefined);
    return inner ? unwrapZodType(inner) : schema;
  }
  if (schema instanceof z.ZodEffects) {
    return unwrapZodType(schema.innerType());
  }
  return schema;
}

export function getBaseSchema(schema: z.ZodTypeAny): z.ZodObject<any, any, any> | null {
  const unwrapped = unwrapZodType(schema);
  if (unwrapped instanceof z.ZodObject) {
    return unwrapped;
  }
  console.error("getBaseSchema: Expected a ZodObject after unwrapping, but got:", unwrapped);
  return null;
}
```

## `src/stores/useItemStore.ts`
```
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ItemState {
  // This store is now a placeholder.
  // You can add client-side state here if needed in the future,
  // such as complex filter states that don't belong in the URL.
  clientOnlyState: string;
  setClientOnlyState: (value: string) => void;
}

export const useItemStore = create<ItemState>()(
  devtools(
    (set) => ({
      clientOnlyState: 'Ready',
      setClientOnlyState: (value: string) => set({ clientOnlyState: value }),
    }),
    { name: 'item-store' }
  )
);
```

## `src/stores/useUiStore.ts`
```
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
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('theme');
    if (saved && ['light', 'dark', 'system'].includes(saved)) {
      return saved as Theme;
    }
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

## `src/styles/main.css`
```
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
  --spacing-1_5: clamp(0.375rem, 0.3rem + 0.375vw, 0.75rem);  /* 6-12px */
  --spacing-2: clamp(0.5rem, 0.4rem + 0.5vw, 1rem);      /* 8-16px */
  --spacing-2_5: clamp(0.625rem, 0.5rem + 0.625vw, 1.25rem);  /* 10-20px */
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

  /* Modal & Overlay */
  --color-backdrop: rgb(0 0 0 / 0.7);
  --color-modal-bg: var(--color-surface);
  --color-modal-border: var(--color-border);

  /* =========================
     3. COMPONENT TOKENS - Specific use for Todo app
     ========================= */

  /* Button Components */
  --button-radius: var(--radius-md);
  --button-font-weight: var(--font-weight-medium);
  --button-transition: 150ms;

  /* Button Sizes - Icon Only */
  --button-icon-xs: var(--spacing-1);
  --button-icon-sm: var(--spacing-1_5);
  --button-icon-md: var(--spacing-2);
  --button-icon-lg: var(--spacing-2_5);

  /* Button Sizes - With Text */
  --button-xs-px: var(--spacing-2_5);
  --button-xs-py: var(--spacing-1);
  --button-xs-gap: var(--spacing-1);
  --button-xs-text: var(--font-size-xs);

  --button-sm-px: var(--spacing-3);
  --button-sm-py: var(--spacing-1_5);
  --button-sm-gap: var(--spacing-1_5);
  --button-sm-text: var(--font-size-sm);

  --button-md-px: var(--spacing-4);
  --button-md-py: var(--spacing-2);
  --button-md-gap: var(--spacing-2);
  --button-md-text: var(--font-size-base);

  --button-lg-px: var(--spacing-5);
  --button-lg-py: var(--spacing-2_5);
  --button-lg-gap: var(--spacing-2_5);
  --button-lg-text: var(--font-size-lg);

  /* Card/Item Components */
  --card-radius: var(--radius-lg);
  --card-padding: var(--spacing-4);
  --card-shadow: var(--shadow);

  /* Input Components */
  --input-radius: var(--radius-md);
  --input-padding-x: var(--spacing-3);
  --input-padding-y: var(--spacing-2);
  --input-border-width: 1px;
  --input-font-size: var(--font-size-base);

  /* Checkbox/Radio sizing */
  --checkbox-size: 1.125rem; /* 18px - reasonable, accessible size */
  --radio-size: 1.125rem;    /* 18px - same as checkbox for consistency */
  --checkbox-radius: var(--radius-sm);  /* Subtle rounded corners for checkboxes */

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

  /* Green */
  --color-green-50:  oklch(0.971 0.018 142);
  --color-green-500: oklch(0.647 0.190 142);
  --color-green-600: oklch(0.519 0.195 142);

  /* Red */
  --color-red-50:   oklch(0.971 0.018 27);
  --color-red-500:  oklch(0.637 0.237 27);
  --color-red-600:  oklch(0.577 0.237 27);
  --color-red-700:  oklch(0.517 0.237 27);

  /* Amber */
  --color-amber-50:  oklch(0.987 0.021 91);
  --color-amber-500: oklch(0.769 0.183 84);
  --color-amber-600: oklch(0.659 0.181 75);
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
  --color-text-inverse: var(--color-gray-0);

  --color-border: var(--color-gray-800);
  --color-border-hover: var(--color-gray-700);

  --color-input-bg: var(--color-gray-800);
  --color-input-border: var(--color-gray-600);
  --color-input-text: var(--color-gray-100);
  --color-input-placeholder: var(--color-gray-500);

  /* Modal & Overlay in dark mode */
  --color-backdrop: rgb(0 0 0 / 0.85);
  --color-modal-bg: var(--color-gray-800);
  --color-modal-border: var(--color-gray-700);
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

  /* Text Size Utilities - Token-based */
  .text-size-xs { font-size: var(--font-size-xs); }
  .text-size-sm { font-size: var(--font-size-sm); }
  .text-size-base { font-size: var(--font-size-base); }
  .text-size-lg { font-size: var(--font-size-lg); }
  .text-size-xl { font-size: var(--font-size-xl); }

  /* Tag/Chip Utilities */
  .tag-sm {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    padding-left: var(--spacing-2);
    padding-right: var(--spacing-2);
    padding-top: var(--spacing-0_5);
    padding-bottom: var(--spacing-0_5);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    line-height: var(--line-height-tight);
    white-space: nowrap;
    gap: var(--spacing-1);
  }

  /* Button Size Utilities - Icon Only */
  .btn-icon-xs {
    padding: 0;
    margin: 0;
    margin-left: var(--spacing-1);
    border: none;
    background: none;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    min-width: 1rem;
    min-height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 0;
    transition: color 150ms, background-color 150ms;
  }
  .btn-icon-sm { padding: var(--button-icon-sm); }
  .btn-icon-md { padding: var(--button-icon-md); }
  .btn-icon-lg { padding: var(--button-icon-lg); }

  /* Button Size Utilities - With Text */
  .btn-xs {
    padding-left: var(--button-xs-px);
    padding-right: var(--button-xs-px);
    padding-top: var(--button-xs-py);
    padding-bottom: var(--button-xs-py);
    gap: var(--button-xs-gap);
    font-size: var(--button-xs-text);
  }

  .btn-sm {
    padding-left: var(--button-sm-px);
    padding-right: var(--button-sm-px);
    padding-top: var(--button-sm-py);
    padding-bottom: var(--button-sm-py);
    gap: var(--button-sm-gap);
    font-size: var(--button-sm-text);
  }

  .btn-md {
    padding-left: var(--button-md-px);
    padding-right: var(--button-md-px);
    padding-top: var(--button-md-py);
    padding-bottom: var(--button-md-py);
    gap: var(--button-md-gap);
    font-size: var(--button-md-text);
  }

  .btn-lg {
    padding-left: var(--button-lg-px);
    padding-right: var(--button-lg-px);
    padding-top: var(--button-lg-py);
    padding-bottom: var(--button-lg-py);
    gap: var(--button-lg-gap);
    font-size: var(--button-lg-text);
  }
}

```

## `src/hooks/useItemFilters.ts`
```
import { useMemo } from 'react';
import type { Item, Priority } from '@/types';

export interface ItemTree {
  [categorySlug: string]: Item[];
}

interface FilterOptions {
  searchQuery: string;
  selectedPriority: 'all' | Priority;
  showCompleted: boolean;
  selectedTags: string[];
}

export function useItemFilters(itemTree: ItemTree, filters: FilterOptions) {
  const { searchQuery, selectedPriority, showCompleted, selectedTags } = filters;

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    Object.values(itemTree).forEach(items => {
      items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [itemTree]);

  const hasActiveFilters = useMemo(() => {
    return searchQuery.trim() !== '' ||
           selectedPriority !== 'all' ||
           !showCompleted ||
           selectedTags.length > 0;
  }, [searchQuery, selectedPriority, showCompleted, selectedTags]);

  const filteredItemTree = useMemo(() => {
    const filtered: Record<string, Item[]> = {};
    
    Object.entries(itemTree).forEach(([categoryName, items]) => {
      const filteredItems = items.filter(item => {
        // Search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesSearch = 
            item.name.toLowerCase().includes(query) ||
            item.text.toLowerCase().includes(query) ||
            item.tags?.some(tag => tag.toLowerCase().includes(query));
          if (!matchesSearch) return false;
        }

        // Priority filter
        if (selectedPriority !== 'all' && item.priority !== selectedPriority) {
          return false;
        }

        // Completion status filter
        if (!showCompleted && item.isCompleted) {
          return false;
        }

        // Tag filter
        if (selectedTags.length > 0) {
          const hasSelectedTag = selectedTags.some(tag => 
            item.tags?.includes(tag)
          );
          if (!hasSelectedTag) return false;
        }

        return true;
      });
      
      if (filteredItems.length > 0) {
        filtered[categoryName] = filteredItems;
      }
    });
    
    return filtered;
  }, [itemTree, searchQuery, selectedPriority, showCompleted, selectedTags]);

  const totalItems = useMemo(() => {
    return Object.values(itemTree).reduce((total, items) => total + items.length, 0);
  }, [itemTree]);

  const totalFilteredItems = useMemo(() => {
    return Object.values(filteredItemTree).reduce((total, items) => total + items.length, 0);
  }, [filteredItemTree]);

  return {
    allTags,
    hasActiveFilters,
    filteredItemTree,
    totalItems,
    totalFilteredItems,
  };
}
```

## `src/hooks/useItemsApi.ts`
```
import * as itemApi from '@/api/itemApi';
import { useUiStore } from '@/stores/useUiStore';
import { slugify } from '@/utils/slugify';
import type { Item } from '@/types';

// Define query keys for caching
export const itemKeys = {
  all: ['items'] as const,
  tree: () => [...itemKeys.all, 'tree'] as const,
  detail: (category: string, slug: string) => [...itemKeys.all, 'detail', category, slug] as const,
};

/**
 * Fetches the entire item tree.
 */
export const useGetItemTree = () => {
  return useQuery({
    queryKey: itemKeys.tree(),
    queryFn: itemApi.getItemTree,
  });
};

/**
 * Provides a mutation function for creating a new item.
 */
export const useAddItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore.getState();

  return useMutation({
    mutationFn: itemApi.createItem,
    onSuccess: (newItem) => {
      showNotification('success', `Item "${newItem.name}" added.`);
      // Invalidate the cache for the item tree to trigger a refetch
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error) => {
      showNotification('error', error.message || 'Failed to add item.');
    },
  });
};

/**
 * Provides a mutation function for updating an existing item.
 */
export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore.getState();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string; payload: itemApi.UpdateItemPayload }) =>
      itemApi.updateItem(variables.categorySlug, variables.itemSlug, variables.payload),
    onSuccess: (updatedItem) => {
      showNotification('success', `Item "${updatedItem.name}" updated.`);
      // Invalidate both the tree and the specific item detail query
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
      const categorySlug = slugify(updatedItem.categories[0]);
      queryClient.invalidateQueries({ queryKey: itemKeys.detail(categorySlug, updatedItem.slug) });
    },
    onError: (error) => {
      showNotification('error', error.message || 'Failed to update item.');
    },
  });
};

/**
 * Provides a mutation for toggling an item's completion status.
 */
export const useToggleItemCompletion = () => {
    const updateItemMutation = useUpdateItem();
    return (item: Item) => {
        const categorySlug = slugify(item.categories[0]);
        updateItemMutation.mutate({
            categorySlug,
            itemSlug: item.slug,
            payload: { isCompleted: !item.isCompleted },
        });
    };
};

/**
 * Provides a mutation function for deleting an item.
 */
export const useDeleteItem = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useUiStore.getState();

  return useMutation({
    mutationFn: (variables: { categorySlug: string; itemSlug: string }) =>
      itemApi.deleteItem(variables.categorySlug, variables.itemSlug),
    onSuccess: () => {
      showNotification('success', 'Item deleted.');
      queryClient.invalidateQueries({ queryKey: itemKeys.tree() });
    },
    onError: (error) => {
      showNotification('error', error.message || 'Failed to delete item.');
    },
  });
};
```

## `src/router.ts`
```
import {
  createRouter,
  createRootRoute,
  createRoute,
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { itemKeys } from './hooks/useItemsApi';
import * as itemApi from './api/itemApi';

// Import page/layout components (we will create/update these next)
import App from './App';
import ItemPage from './pages/ItemPage';
import AboutPage from './pages/AboutPage';
import ItemDetailPage from './pages/ItemDetailPage';

export const queryClient = new QueryClient();

// Create a root route that will serve as the main layout
const rootRoute = createRootRoute({
  component: App,
});

// Create the index route for the main item page
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: ItemPage,
  // Loader to pre-fetch data for this route
  loader: () => {
    return queryClient.ensureQueryData({
      queryKey: itemKeys.tree(),
      queryFn: itemApi.getItemTree,
    });
  },
});

// Create the about route
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

// Create the item detail route with type-safe params
const itemDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/items/$categorySlug/$itemSlug',
    loader: ({ params }: { params: { categorySlug: string; itemSlug: string } }) => {
        const { categorySlug, itemSlug } = params;
        return queryClient.ensureQueryData({
            queryKey: itemKeys.detail(categorySlug, itemSlug),
            queryFn: () => itemApi.getItem(categorySlug, itemSlug),
        });
    },
    component: ItemDetailPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, itemDetailRoute]);

// Create the router instance
export const router = createRouter({ routeTree, context: { queryClient } });

// Register the router for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
```

## `src/types/index.ts`
```
import type { LucideIcon } from 'lucide-react';

export type IconName = LucideIcon | string;
export type Priority = 'low' | 'mid' | 'high';
export type SingleCategory<T> = [T];

export interface Item {
  id: string;
  slug: string;
  name: string;
  text: string;
  isCompleted: boolean;
  priority: Priority;
  tags: string[];
  categories: SingleCategory<string>;
  createdAt: string;
  updatedAt: string;
  isEditing?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  timestamp: number;
}
```

## `src/index.css`
```
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
    font-size: var(--input-font-size);
  }

  input:focus, textarea:focus, select:focus {
    border-color: var(--color-border-focus);
    outline: none;
    box-shadow: 0 0 0 1px var(--color-border-focus);
  }

  input[type="checkbox"], input[type="radio"] {
    width: var(--checkbox-size);
    height: var(--checkbox-size);
    padding: 0;
    flex-shrink: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
  }

  input[type="checkbox"] {
    border-radius: var(--checkbox-radius);
  }

  input[type="radio"] {
    border-radius: 50%;
  }

  /* Checked state - custom styling */
  input[type="checkbox"]:checked,
  input[type="radio"]:checked {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
  }

  /* Checkmark for checkbox */
  input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 0.25rem;
    height: 0.5rem;
    border: solid var(--color-text-inverse);
    border-width: 0 2px 2px 0;
  }

  /* Dot for radio */
  input[type="radio"]:checked::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: var(--color-text-inverse);
  }

  /* Focus states */
  input[type="checkbox"]:focus-visible,
  input[type="radio"]:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Disabled state */
  input[type="checkbox"]:disabled,
  input[type="radio"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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

## `src/api/itemApi.ts`
```
import { get, post, patch, del } from './apiClient';
import type { Item, Priority, SingleCategory } from '@/types';

export interface CreateItemPayload {
  name: string;
  text: string;
  priority: Priority;
  tags?: string[];
  categories: SingleCategory<string>;
}

export type UpdateItemPayload = Partial<Omit<CreateItemPayload, 'categories'>> & {
    isCompleted?: boolean;
    categories?: SingleCategory<string>;
};

export interface ItemTree {
  [categorySlug: string]: Item[];
}

export async function getItemTree(): Promise<ItemTree> {
  return get<ItemTree>('/items/tree');
}

export async function createItem(payload: CreateItemPayload): Promise<Item> {
  return post<Item, CreateItemPayload>('/items', payload);
}

export async function getItem(categorySlug: string, itemSlug: string): Promise<Item> {
  return get<Item>(`/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`);
}

export async function updateItem(
  categorySlug: string,
  itemSlug: string,
  payload: UpdateItemPayload
): Promise<Item> {
  return patch<Item, UpdateItemPayload>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`,
    payload
  );
}

export async function deleteItem(categorySlug: string, itemSlug: string): Promise<{ deleted: boolean }> {
  return del<{ deleted: boolean }>(
    `/items/${encodeURIComponent(categorySlug)}/${encodeURIComponent(itemSlug)}`
  );
}
```

## `src/api/apiClient.ts`
```
const API_URL_BASE = 'http://localhost:3000/api';

type Result<T, E = string> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

const success = <T>(data: T): Result<T> => ({ success: true, data });
const failure = <E>(error: E): Result<never, E> => ({ success: false, error });

export interface ApiErrorData {
  message: string;
  statusCode: number;
  details?: any;
}

export const createApiError = (
  message: string, 
  statusCode: number = 500, 
  details?: any
): ApiErrorData => ({
  message,
  statusCode,
  details,
});

export const isApiError = (error: any): error is ApiErrorData => {
  return error && typeof error.message === 'string' && typeof error.statusCode === 'number';
};

const request = async <T>(
  method: string,
  endpoint: string,
  body?: any
): Promise<Result<T, ApiErrorData>> => {
  try {
    const response = await fetch(`${API_URL_BASE}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      let message = `Request failed: ${response.status}`;
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
      
      return failure(createApiError(message, response.status));
    }

    const data = await response.json();
    return success(data.data ?? data) as Result<T, ApiErrorData>;
  } catch (error: any) {
    return failure(createApiError(
      error.message || 'Network request failed',
      503
    ));
  }
};

const unwrapResult = async <T>(resultPromise: Promise<Result<T, ApiErrorData>>): Promise<T> => {
  const result = await resultPromise;
  if (!result.success) {
    const error = new Error(result.error.message);
    (error as any).statusCode = result.error.statusCode;
    (error as any).details = result.error.details;
    throw error;
  }
  return result.data;
};

export const get = <T>(endpoint: string) => 
  unwrapResult(request<T>('GET', endpoint));

export const post = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('POST', endpoint, data));

export const patch = <TResponse, TRequest = any>(endpoint: string, data: TRequest) =>
  unwrapResult(request<TResponse>('PATCH', endpoint, data));

export const del = <TResponse = { deleted: boolean }>(endpoint: string) =>
  unwrapResult(request<TResponse>('DELETE', endpoint));

export const api = { get, post, patch, delete: del };
```

## `tailwind.config.js`
```
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic token mappings
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        'surface-active': 'var(--color-surface-active)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'primary-light': 'var(--color-primary-light)',
        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',
        danger: 'var(--color-danger)',
        'danger-light': 'var(--color-danger-light)',
        'danger-hover': 'var(--color-red-700)',
        warning: 'var(--color-warning)',
        'warning-light': 'var(--color-warning-light)',
        border: 'var(--color-border)',
        'border-hover': 'var(--color-border-hover)',
        'border-focus': 'var(--color-border-focus)',
        backdrop: 'var(--color-backdrop)',
        'modal-bg': 'var(--color-modal-bg)',
        'modal-border': 'var(--color-modal-border)',
      },
      spacing: {
        'input-x': 'var(--input-padding-x)',
        'input-y': 'var(--input-padding-y)',
        'card': 'var(--card-padding)',
        'nav': 'var(--nav-padding)',
      },
      width: {
        'checkbox': 'var(--checkbox-size)',
        'radio': 'var(--radio-size)',
      },
      height: {
        'checkbox': 'var(--checkbox-size)',
        'radio': 'var(--radio-size)',
      },
      borderRadius: {
        'button': 'var(--button-radius)',
        'card': 'var(--card-radius)',
        'input': 'var(--input-radius)',
        'checkbox': 'var(--checkbox-radius)',
      },
      fontWeight: {
        button: 'var(--button-font-weight)',
      },
      gap: {
        'component': 'var(--gap-component-internal)',
        'grid': 'var(--gap-grid-items)',
      },
    },
  },
  plugins: [],
};

```

