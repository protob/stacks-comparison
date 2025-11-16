import { useEffect, useState } from 'react'
import { useItemStore } from '../stores/useItemStore'
import { useItemFilters } from '../hooks/useItemFilters'
import AppSidebar from '../components/layout/AppSidebar'
import FilterBar from '../components/layout/FilterBar'
import ItemItem from '../components/items/ItemItem'
import ItemForm from '../components/items/ItemForm'
import Notifications from '../components/common/Notifications'
import { slugify } from '../utils/slugify'
import type { Item, Priority } from '@/types'

interface FilterOptions {
  searchQuery: string
  selectedPriority: 'all' | Priority
  showCompleted: boolean
  selectedTags: string[]
}

const initialFilters: FilterOptions = {
  searchQuery: '',
  selectedPriority: 'all',
  showCompleted: true,
  selectedTags: [],
}

export default function ItemPage() {
  const { itemTree, fetchItemTree } = useItemStore()
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)
  const { filteredItemTree, allTags, hasActiveFilters, totalFilteredItems } = useItemFilters(itemTree, filters)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchItemTree()
  }, [])

  return (
    <div className="flex bg-background min-h-screen">
      <AppSidebar allTags={allTags} selectedTags={filters.selectedTags} onTagSelect={(tags) => setFilters({ ...filters, selectedTags: tags })} onSearch={(query) => setFilters({ ...filters, searchQuery: query })} />
      <main className="flex-1 p-nav-padding">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-center mb-spacing-4">
            <h1 className="text-2xl font-bold">Items</h1>
            <button onClick={() => setShowForm(true)} className="bg-primary text-inverse px-4 py-2 rounded-button-radius">+ Add Item</button>
          </div>
          <FilterBar filters={filters} onChange={setFilters} />
          <p className="text-muted mb-spacing-3">{totalFilteredItems} of {Object.values(itemTree).reduce((acc, items) => acc + items.length, 0)} items</p>
          {Object.entries(filteredItemTree).map(([category, items]) => (
            <section key={category} className="mb-spacing-6">
              <h2 className="text-xl font-semibold mb-spacing-3 capitalize">{category.replace('-', ' ')}</h2>
              <div className="grid-auto-items">
                {items.map((item: Item) => (
                  <ItemItem key={item.id} item={item} categorySlug={slugify(category)} />
                ))}
              </div>
            </section>
          ))}
          {showForm && <ItemForm onClose={() => setShowForm(false)} />}
        </div>
      </main>
      <Notifications />
    </div>
  )
}
