import { Radio } from '@/components/common/Radio';
import { Checkbox } from '@/components/common/Checkbox';

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
    <div className="flex items-center gap-8 mb-6 p-card bg-surface border border-border rounded">
      {/* Priority Filter */}
      {showPriorityFilter && (
        <div>
          <h4 className="text-size-sm font-medium text-text-secondary mb-2">{priorityLabel}</h4>
          <div className="flex gap-4">
            {priorityOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 text-size-sm text-text-muted"
              >
                <Radio
                  value={option.value}
                  checked={selectedPriority === option.value}
                  onChange={(e) => onPriorityChange(e.target.value)}
                  name="priority-filter"
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
          <h4 className="text-size-sm font-medium text-text-secondary mb-2">{statusLabel}</h4>
          <label className="flex items-center gap-2 text-size-sm text-text-muted">
            <Checkbox
              checked={showCompleted}
              onChange={(e) => onShowCompletedChange(e.target.checked)}
            />
            {completedLabel}
          </label>
        </div>
      )}
    </div>
  );
};

export default FilterBar;