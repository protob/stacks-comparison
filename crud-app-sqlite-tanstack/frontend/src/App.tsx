import { Outlet } from '@tanstack/react-router';
import AppSidebar from './components/layout/AppSidebar';
import Notifications from './components/common/Notifications';
import { useUiStore } from './stores/useUiStore';
import { useEffect, useState, createContext, useContext } from 'react';

// Create context for search state
const SearchContext = createContext<{
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: string[];
  setAvailableTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  clearSearch: () => void;
  clearTags: () => void;
}>({
  searchQuery: '',
  setSearchQuery: () => {},
  selectedTags: [],
  setSelectedTags: () => {},
  availableTags: [],
  setAvailableTags: () => {},
  toggleTag: () => {},
  clearSearch: () => {},
  clearTags: () => {},
});

export const useSearch = () => useContext(SearchContext);

function App() {
  const { theme } = useUiStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearSearch = () => setSearchQuery('');
  const clearTags = () => setSelectedTags([]);

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
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      selectedTags,
      setSelectedTags,
      availableTags,
      setAvailableTags,
      toggleTag,
      clearSearch,
      clearTags
    }}>
      <div className="flex h-screen bg-background text-text-primary">
        <AppSidebar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          availableTags={availableTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
        <Notifications />
      </div>
    </SearchContext.Provider>
  );
}

export default App;