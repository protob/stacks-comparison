interface AppSidebarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  searchPlaceholder?: string;
  availableTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  tagsLabel?: string;
  tagPrefix?: string;
}

const AppSidebar = ({
  searchQuery,
  onSearchQueryChange,
  searchPlaceholder = 'Search items...',
  availableTags,
  selectedTags,
  onToggleTag,
  tagsLabel = 'TAGS',
  tagPrefix = '#'
}: AppSidebarProps) => {
  return (
    <div className="w-64 bg-neutral-800 border-r border-neutral-700 p-4 space-y-6">
      {/* Search Section */}
      <div>
        <h3 className="text-sm font-medium text-neutral-300 mb-3">Search</h3>
        <input
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          type="text"
          placeholder={searchPlaceholder}
          className="w-full px-3 py-2 text-sm bg-neutral-700 border border-neutral-600 rounded text-neutral-200 placeholder:text-neutral-500"
        />
      </div>

      {/* Tags Section */}
      {availableTags.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-neutral-300 mb-3">{tagsLabel}</h3>
          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={clsx(
                    'px-2 py-1 text-xs rounded transition-colors',
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                  )}
                >
                  {tagPrefix}{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppSidebar;