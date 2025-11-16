import { Outlet } from '@tanstack/react-router';
import AppSidebar from './components/layout/AppSidebar';
import Notifications from './components/common/Notifications';
import { useUiStore } from './stores/useUiStore';
import { useEffect } from 'react';

function App() {
  const { theme } = useUiStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="flex h-screen bg-background text-text-primary">
      <AppSidebar
        searchQuery=""
        onSearchQueryChange={() => {}}
        availableTags={[]}
        selectedTags={[]}
        onToggleTag={() => {}}
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Outlet />
      </main>
      <Notifications />
    </div>
  );
}

export default App;