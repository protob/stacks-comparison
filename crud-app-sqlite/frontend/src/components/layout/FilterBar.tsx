import clsx from 'clsx'

interface Props {
  filters: FilterOptions
  onChange: (filters: FilterOptions) => void
}

export default function FilterBar({ filters, onChange }: Props) {
  const priorities = ['all', 'high', 'mid', 'low'] as const

  return (
    <div className="bg-surface p-spacing-3 flex items-center justify-between rounded-radius-lg mb-spacing-4">
      <div className="flex items-center gap-spacing-3">
        <span className="text-secondary font-medium">Priority</span>
        {priorities.map(p => (
          <button
            key={p}
            onClick={() => onChange({ ...filters, selectedPriority: p })}
            className={clsx(
              'w-5 h-5 rounded-full', /* Smaller size */
              p === 'all' ? 'bg-primary' : p === 'high' ? 'bg-danger' : p === 'mid' ? 'bg-warning' : 'bg-success',
              filters.selectedPriority === p ? 'ring-2 ring-border-focus' : ''
            )}
          />
        ))}
      </div>
      <label className="flex items-center gap-spacing-2 text-secondary">
        <input
          type="checkbox"
          checked={filters.showCompleted}
          onChange={e => onChange({ ...filters, showCompleted: e.target.checked })}
          className="w-4 h-4"
        />
        Show completed
      </label>
    </div>
  )
}
