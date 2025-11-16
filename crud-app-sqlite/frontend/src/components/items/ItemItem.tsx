import clsx from 'clsx'
import { useItemStore } from '../../stores/useItemStore'
import { Icon } from '../common/Icon'
import type { Item } from '@/types'

interface Props {
  item: Item
  categorySlug: string
}

export default function ItemItem({ item, categorySlug }: Props) {
  const { toggleItemCompletion, deleteItem } = useItemStore()

  const priorityColor = {
    high: 'bg-danger text-danger-light',
    mid: 'bg-warning text-warning-light',
    low: 'bg-success text-success-light',
  }[item.priority]

  return (
    <div className="bg-surface rounded-card-radius p-card-padding shadow-card-shadow flex flex-col gap-spacing-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-spacing-2">
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => toggleItemCompletion(categorySlug, item.slug)}
            className="w-4 h-4"
          />
          <h3 className={clsx('font-medium', item.isCompleted ? 'line-through text-muted' : 'text-primary')}>{item.name}</h3>
        </div>
        <span className={clsx('px-2 py-1 text-xs rounded-radius-sm', priorityColor)}>{item.priority}</span>
      </div>
      <p className="text-muted text-sm">{item.text}</p>
      <div className="flex flex-wrap gap-spacing-1">
        {item.tags.map(tag => (
          <span key={tag} className="bg-surface-hover text-muted text-xs px-2 py-1 rounded-radius-sm">{tag}</span>
        ))}
      </div>
      <div className="flex justify-end mt-auto">
        <button onClick={() => deleteItem(categorySlug, item.slug)} className="text-danger">
          <Icon name="Trash" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
