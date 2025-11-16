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
