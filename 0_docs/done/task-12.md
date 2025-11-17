Of course. Here is a literal TODO list for an AI agent to fix the sidebar layout issue, following the robust, token-based conventions established in your codebase.

### TODO for AI Agent: Implement a Token-Based Main Layout

**Goal:** Resolve the improper stretching of the sidebar by creating a dedicated, robust main layout component. This component will enforce the design system's `--sidebar-width` token, ensuring the sidebar has a constrained, responsive width while the main content area flexibly fills the remaining space.

**Guiding Principle:** Adhere strictly to the "Modernist Design System" principles outlined in the `README.md`. Use CSS variables (design tokens) for sizing and structure. Avoid hardcoded values or quick-fix utilities that bypass the established system.

---

#### **Step 1: Create the Main Layout Component File**

Create a new file to house the primary layout structure of the application. This encapsulates the layout logic, adhering to the project's component-based architecture.

*   **Action:** Create the file `src/components/layout/MainLayout.tsx`.

#### **Step 2: Implement the Two-Column Grid Structure in `MainLayout.tsx`**

Define the component using **CSS Grid** for a clean and powerful separation of the sidebar and main content. Use the pre-defined design token for the sidebar's width directly within the Tailwind class.

*   **Action:** Add the following code to `src/components/layout/MainLayout.tsx`:

    ```tsx
    import { Outlet } from '@tanstack/react-router';
    // The AppSidebar component already exists, we are just referencing it.
    // We assume its path is '@/components/layout/AppSidebar' based on the README.
    import { AppSidebar } from '@/components/layout/AppSidebar';

    /**
     * Defines the primary two-column layout of the application.
     * It uses a CSS grid to allocate space for the sidebar and main content.
     * The sidebar width is controlled by the `--sidebar-width` design token.
     */
    export function MainLayout() {
      return (
        <div className="grid min-h-screen grid-cols-[var(--sidebar-width)_1fr]">
          {/* Sidebar: Constrained by the first column of the grid. */}
          <AppSidebar />

          {/* Main Content: Fills the remaining space and handles its own scrolling. */}
          <main className="overflow-y-auto">
            <Outlet />
          </main>
        </div>
      );
    }
    ```

    *   **Reasoning:**
        *   `grid-cols-[var(--sidebar-width)_1fr]` is the core of the fix. It creates a two-column grid. The first column's width is explicitly set to the value of the `--sidebar-width` design token (`clamp(200px, 15vw, 280px)`), and the second column (`1fr`) takes up all remaining fractional space. This is the correct, token-driven approach.
        *   `min-h-screen` ensures the layout always fills the entire viewport height.
        *   `overflow-y-auto` on the `<main>` element makes the content area scrollable, preventing the sidebar from scrolling with the page content.

#### **Step 3: Create a Hook for Theme Management**

To keep the root `App` component clean and align with the project's use of custom hooks, create a dedicated hook to handle theme updates.

*   **Action:** Create a new file `src/hooks/useThemeUpdater.ts` with the following content:

    ```ts
    import { useUiStore } from '@/stores/useUiStore';
    import { useEffect } from 'react';

    /**
     * A hook that listens to the theme state in the UI store and applies
     * the corresponding 'dark' class to the root <html> element.
     */
    export function useThemeUpdater() {
      const theme = useUiStore(state => state.theme);

      useEffect(() => {
        const root = window.document.documentElement;
        const isDark =
          theme === 'dark' ||
          (theme === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);

        root.classList.toggle('dark', isDark);
      }, [theme]);
    }
    ```

#### **Step 4: Integrate the `MainLayout` into the Root `App` Component**

Update the main `App.tsx` component to use the new `MainLayout`. This will apply the corrected structure to all routes defined within the application.

*   **Action:** Replace the content of `src/App.tsx` with the following:

    ```tsx
    import { MainLayout } from '@/components/layout/MainLayout';
    import { Notifications } from '@/components/common/Notifications';
    import { useThemeUpdater } from '@/hooks/useThemeUpdater';

    function App() {
      // This custom hook handles applying the theme to the document.
      useThemeUpdater();

      return (
        <>
          <MainLayout />
          {/* Notifications are kept outside the main layout to overlay everything. */}
          <Notifications />
        </>
      );
    }

    export default App;
    ```
    *   **Reasoning:** By replacing the direct `<Outlet />` with `<MainLayout />` (which now contains the outlet), we inject the correct layout structure at the very root of the application, ensuring all pages are displayed correctly. The `Notifications` component is kept at the top level to ensure it can render over any content.