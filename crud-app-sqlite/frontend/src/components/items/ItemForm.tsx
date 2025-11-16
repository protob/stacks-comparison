import { useState } from 'react'
import { useItemStore } from '../../stores/useItemStore'
import { slugify } from '../../utils/slugify'
import type { Priority } from '@/types'

interface Props {
  onClose: () => void
}

export default function ItemForm({ onClose }: Props) {
  const { addItem } = useItemStore()
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('mid')
  const [tags, setTags] = useState('')
  const [category, setCategory] = useState('test') // Default category

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addItem({
      name,
      text,
      priority,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      categories: [category],
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-surface p-card-padding rounded-card-radius shadow-lg max-w-md w-full">
        <h2 className="text-primary font-medium mb-spacing-3">Add New Item</h2>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="mb-spacing-2" />
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Description" className="mb-spacing-2" />
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)} className="mb-spacing-2">
          <option value="low">Low</option>
          <option value="mid">Mid</option>
          <option value="high">High</option>
        </select>
        <input value={tags} onChange={e => setTags(e.target.value)} placeholder="Tags (comma separated)" className="mb-spacing-2" />
        <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="mb-spacing-4" />
        <div className="flex justify-end gap-spacing-2">
          <button type="button" onClick={onClose} className="bg-surface-hover text-secondary px-4 py-2 rounded-button-radius">Cancel</button>
          <button type="submit" className="bg-primary text-inverse px-4 py-2 rounded-button-radius">Add</button>
        </div>
      </form>
    </div>
  )
}
