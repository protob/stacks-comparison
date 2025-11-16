interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  showPriorityFilter?: boolean;
  priorityLabel?: string;
  priorityOptions?: FilterOption[];
  selectedPriority?: string;
  onPriorityChange: (priority: string) => void;
  
  showStatusFilter?: boolean;
  statusLabel?: string;
  completedLabel?: string;
  showCompleted?: boolean;
  onShowCompletedChange: (show: boolean) => void;
}

const FilterBar = ({
  showPriorityFilter = true,
  priorityLabel = 'Priority',
  priorityOptions = [
    { value: 'all', label: 'All' },
    { value: 'high', label: 'High' },
    { value: 'mid', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ],
  selectedPriority = 'all',
  onPriorityChange,
  
  showStatusFilter = true,
  statusLabel = 'Status',
  completedLabel = 'Show completed',
  showCompleted = false,
  onShowCompletedChange
}: FilterBarProps) => {
  return (
    <div className="flex items-center gap-8 mb-6 p-3 bg-neutral-800 border border-neutral-700 rounded">
      {/* Priority Filter */}
      {showPriorityFilter && (
        <div>
          <h4 className="text-sm font-medium text-neutral-300 mb-2">{priorityLabel}</h4>
          <div className="flex gap-4">
            {priorityOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-sm text-neutral-400"
              >
                <input
                  value={option.value}
                  checked={selectedPriority === option.value}
                  onChange={(e) => onPriorityChange(e.target.value)}
                  type="radio"
                  className="w-4 h-4 border-neutral-600 bg-neutral-700 text-blue-600"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Status Filter */}
      {showStatusFilter && (
        <div>
          <h4 className="text-sm font-medium text-neutral-300 mb-2">{statusLabel}</h4>
          <label className="flex items-center gap-2 text-sm text-neutral-400">
            <input
              checked={showCompleted}
              onChange={(e) => onShowCompletedChange(e.target.checked)}
              type="checkbox"
              className="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-blue-600"
            />
            {completedLabel}
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterBar;