import { MainLayout } from '@/components/layout/MainLayout';
import Notifications from '@/components/common/Notifications';
import { useThemeUpdater } from '@/hooks/useThemeUpdater';
import { useState, createContext, useContext } from 'react';

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
  // This custom hook handles applying the theme to the document.
  useThemeUpdater();

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
      <>
        <MainLayout />
        {/* Notifications are kept outside the main layout to overlay everything. */}
        <Notifications />
      </>
    </SearchContext.Provider>
  );
}

export default App;