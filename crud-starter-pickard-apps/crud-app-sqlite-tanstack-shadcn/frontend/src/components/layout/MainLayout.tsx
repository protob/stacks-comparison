import { Outlet } from '@tanstack/react-router';
// The AppSidebar component already exists, we are just referencing it.
// We assume its path is '@/components/layout/AppSidebar' based on the README.
import { AppSidebar } from '@/components/layout/AppSidebar';
import TopBar from '@/components/layout/TopBar';

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
      <main className="overflow-y-auto p-fluid-4 md:p-fluid-6 lg:p-fluid-8">
        <TopBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}