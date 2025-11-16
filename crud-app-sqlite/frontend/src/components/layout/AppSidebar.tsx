import { useState } from 'react'
import clsx from 'clsx'
import ThemeToggle from '../common/ThemeToggle'

interface Props {
  allTags: string[]
  selectedTags: string[]
  onTagSelect: (tags: string[]) => void
  onSearch: (query: string) => void
}

export default function AppSidebar({ allTags, selectedTags, onTagSelect, onSearch }: Props) {
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
    onSearch(e.target.value)
  }

  const toggleTag = (tag: string) => {
    const updated = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag]
    onTagSelect(updated)
  }

  return (
    <aside className="w-sidebar-width bg-surface p-nav-padding fixed h-screen overflow-y-auto scrollbar-thin">
      <h3 className="text-primary font-medium mb-spacing-2">Search Items...</h3>
      <input className="mb-spacing-4" value={search} onChange={handleSearch} placeholder="Search..." />
      <h3 className="text-primary font-medium mb-spacing-2">Tags</h3>
      <div className="flex flex-wrap gap-spacing-2">
        {allTags.map(tag => (
          <button key={tag} onClick={() => toggleTag(tag)} className={clsx('px-3 py-1 rounded-radius-md', selectedTags.includes(tag) ? 'bg-primary text-inverse' : 'bg-surface-hover text-secondary')}>
            {tag}
          </button>
        ))}
      </div>
      <div className="mt-auto pt-spacing-4">
        <ThemeToggle />
      </div>
    </aside>
  )
}
