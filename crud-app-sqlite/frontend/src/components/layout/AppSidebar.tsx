import clsx from 'clsx';
import { Clock } from '@/components/common/Clock';
import { ThemeToggle } from '@/components/common/ThemeToggle';

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
    <aside className="w-[--sidebar-width] bg-surface border-r border-border p-[--nav-padding] flex flex-col gap-[--gap-component-internal]">
      {/* Search Section */}
      <div>
        <h3 className="text-size-sm font-medium text-text-secondary mb-3">Search</h3>
        <input
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          type="text"
          placeholder={searchPlaceholder}
          className="w-full px-input-x py-input-y text-size-sm bg-surface-hover border border-border rounded-input text-text-primary placeholder:text-text-muted"
        />
      </div>

      {/* Tags Section */}
      {availableTags.length > 0 && (
        <div>
          <h3 className="text-size-sm font-medium text-text-secondary mb-3">{tagsLabel}</h3>
          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            <div className="flex flex-wrap gap-component">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={clsx(
                    'tag-sm rounded-button transition-colors',
                    selectedTags.includes(tag)
                      ? 'bg-primary text-text-inverse'
                      : 'bg-surface-hover text-text-secondary hover:bg-surface-active'
                  )}
                >
                  {tagPrefix}{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Theme Toggle and Clock */}
      <div className="mt-auto flex items-center justify-between">
        <Clock />
        <ThemeToggle />
      </div>
    </aside>
  );
};

export default AppSidebar;
