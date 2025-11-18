Here is a structured overview of your **Pickard CLI** boilerplate projects, organized by category and framework.

## 🚀 Full CRUD Applications
These are feature-complete applications demonstrating Create, Read, Update, Delete operations.
*Root:* `./crud-starter-pickard-apps`

### ⚛️ React
| Project Path | Stack & Features |
| :--- | :--- |
| `./crud-starter-pickard-apps/react/crud-app` | **Legacy.** Initial React app using YAML & FileSystem storage. |
| `./crud-starter-pickard-apps/react/crud-app-sqlite` | **React + SQLite.** Same as above, but migrated to SQLite storage. |
| `./crud-starter-pickard-apps/react/crud-app-sqlite-tanstack` | **TanStack Stack.** Adds TanStack Router, Query, and Form. |
| `./crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn` | **⭐ Reference Project.** Adds Shadcn UI. This is the "Gold Standard" port. |
| `./crud-starter-pickard-apps/react/crud-app-sqlite-tanstack-shadcn-next` | **Next.js 16.** The Reference Project ported to the Next.js App Router. |

### 🔥 Svelte
| Project Path | Stack & Features |
| :--- | :--- |
| `./crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-kit` | **SvelteKit.** Equivalent of the React reference project. |
| `./crud-starter-pickard-apps/svelte/crud-app-sqlite-tanstack-shadcn-svelte-vite` | **Svelte 5 + Vite.** SPA equivalent of the React reference project. |

### 🟩 Vue
| Project Path | Stack & Features |
| :--- | :--- |
| `./crud-starter-pickard-apps/vue/crud-app-sqlite-tanstack-shadcn-nuxt` | **Nuxt 4.** Equivalent of the React reference project. |
| `./crud-starter-pickard-apps/vue/crud-app-sqlite-tanstack-shadcn-vue` | **Vue + Vite.** SPA equivalent of the React reference project. |

---

## 🎨 Shadcn UI Starters
Fresh, scaffolding-only projects pre-configured with Tailwind and Shadcn UI.
*Roots:* `./shadcn-simple-*`

### ⚛️ React Starters
*Root:* `./shadcn-simple-react`

| Project Path | Meta-Framework / Tool |
| :--- | :--- |
| `./shadcn-simple-react/shadcn-simple-astro` | **Astro** (React Integration) |
| `./shadcn-simple-react/shadcn-simple-next` | **Next.js 16** |
| `./shadcn-simple-react/shadcn-simple-react-router` | **React Router** (v7/Remix style) |
| `./shadcn-simple-react/shadcn-simple-tanstack-router-react` | **TanStack Router** (SPA) |
| `./shadcn-simple-react/shadcn-simple-tanstack-start` | **TanStack Start** (SSR) |
| `./shadcn-simple-react/shadcn-simple-vite-react-ts` | **Vite + TypeScript** |

### 🔥 Svelte Starters
*Root:* `./shadcn-simple-svelte`

| Project Path | Meta-Framework / Tool |
| :--- | :--- |
| `./shadcn-simple-svelte/shadcn-simple-astro-svelte` | **Astro** (Svelte Integration) |
| `./shadcn-simple-svelte/shadcn-simple-svelte-kit` | **SvelteKit** |
| `./shadcn-simple-svelte/shadcn-simple-svelte-vite` | **Svelte 5 + Vite** |

### 🟩 Vue Starters
*Root:* `./shadcn-simple-vue`

| Project Path | Meta-Framework / Tool |
| :--- | :--- |
| `./shadcn-simple-vue/shadcn-simple-astro-vue` | **Astro** (Vue Integration) |
| `./shadcn-simple-vue/shadcn-simple-nuxt` | **Nuxt** |
| `./shadcn-simple-vue/shadcn-simple-vue-vite` | **Vite** |

### 🟦 Solid Starters
*Root:* `./shadcn-simple-solid`

| Project Path | Meta-Framework / Tool | Status |
| :--- | :--- | :--- |
| `./shadcn-simple-solid/shadcn-simple-solid-start` | **Solid Start** | ⚠️ Pending Config (Registry errors) |
| `./shadcn-simple-solid/shadcn-simple-solid-vite` | **Solid + Vite** | ⚠️ Pending Config (Registry errors) |

---

## 📦 Legacy Simple Apps
Minimal implementations using FileSystem/YAML storage.
*Root:* `./simple`

| Framework | Project Path |
| :--- | :--- |
| **Solid** | `./simple/solid-simple-crud` |
| **Svelte** | `./simple/svelte-simple-crud` |


========================

## Original Pickard Stacks (Legacy CLI)

These are the base templates used by the Go CLI. They operate on **FileSystem/YAML storage** (no SQLite).

**Frontends** (`crud/frontends/`)
*   React
*   Svelte
*   Vue
*   Solid

**Backends** (`crud/backends/`)
*   Node.js (`server-node`)
*   Golang (`server-golang`)
*   Gleam (`server-gleam`)
*   Elixir (`server-elixir`)
*   Clojure (`server-clojure`)