// frontends/solid/src/components/layout/AppSidebar.tsx
import { splitProps, For, Show } from 'solid-js';
import { clsx } from 'clsx'; // Make sure clsx is available

interface AppSidebarProps {
  searchQuery: string; 
  onSearchQueryChange: (query: string) => void;
  searchPlaceholder?: string;
  availableTags: () => string[]; // Expects an accessor
  selectedTags: string[]; 
  onToggleTag: (tag: string) => void;
  tagsLabel?: string;
  tagPrefix?: string;
}

const AppSidebar = (props: AppSidebarProps) => {
  const [local, _] = splitProps(props, [
    'searchQuery', 'onSearchQueryChange', 'searchPlaceholder', 'availableTags',
    'selectedTags', 'onToggleTag', 'tagsLabel', 'tagPrefix'
  ]);

  const searchPlaceholder = () => local.searchPlaceholder || 'Search items...';
  const tagsLabel = () => local.tagsLabel || 'TAGS';
  const tagPrefix = () => local.tagPrefix || '#';

  return (
    <div class="w-64 bg-neutral-800 border-r border-neutral-700 p-4 space-y-6">
      <div>
        <h3 class="text-sm font-medium text-neutral-300 mb-3">Search</h3>
        <input
          value={local.searchQuery} 
          onInput={(e) => local.onSearchQueryChange(e.currentTarget.value)}
          type="text"
          placeholder={searchPlaceholder()}
          class="w-full px-3 py-2 text-sm bg-neutral-700 border border-neutral-600 rounded text-neutral-200 placeholder:text-neutral-500"
        />
      </div>

      {/* local.availableTags is an accessor, so call it to get the array */}
      <Show when={local.availableTags().length > 0}>
        <div>
          <h3 class="text-sm font-medium text-neutral-300 mb-3">{tagsLabel()}</h3>
          <div class="max-h-64 overflow-y-auto scrollbar-thin">
            <div class="flex flex-wrap gap-2">
              {/* Call local.availableTags() here for the <For> component */}
              <For each={local.availableTags()}>
                {(tag) => (
                  <button
                    onClick={() => local.onToggleTag(tag)}
                    class={clsx(
                      'px-2 py-1 text-xs rounded transition-colors',
                      local.selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                    )}
                  >
                    {tagPrefix()}{tag}
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};

export default AppSidebar;