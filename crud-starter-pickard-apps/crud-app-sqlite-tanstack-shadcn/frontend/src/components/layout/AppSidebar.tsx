import { Tags, Search } from 'lucide-react';
import { useUiStore } from '@/stores/useUiStore';
import { useItemFilters } from '@/hooks/useItemFilters';
import { useGetItemTree } from '@/hooks/useItemsApi';
import { useSearch } from '@/App';
import { ThemeToggle } from '@/components/common/ThemeToggle';

export function AppSidebar() {
    const { searchQuery, setSearchQuery, selectedTags, toggleTag } = useSearch();
    const { data: itemTree = {} } = useGetItemTree();
    const { allTags: availableTags } = useItemFilters(itemTree, {
        searchQuery,
        selectedPriority: 'all',
        showCompleted: true,
        selectedTags,
    });

        return (
            <aside className="w-[--sidebar-width] bg-surface flex flex-col p-4 border-r border-border">
                <div className="flex-1 space-y-6">
                    <div>
                        <h2 className="text-size-sm font-semibold text-text-muted mb-2 flex items-center gap-2"><Search size={16} /> Search</h2>
                        <input
                            type="text"
                            placeholder="Search items..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-size-sm font-semibold text-text-muted mb-2 flex items-center gap-2"><Tags size={16} /> Tags</h2>
                        <div className="flex flex-wrap gap-2">
                            {availableTags.map(tag => (
                                <button 
                                    key={tag} 
                                    className={`tag-sm rounded-button hover:bg-surface-active ${
                                        selectedTags.includes(tag) 
                                            ? 'bg-primary text-primary-foreground' 
                                            : 'bg-surface-hover text-text-secondary'
                                    }`}
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <ThemeToggle />
                </div>
            </aside>
    );
}
