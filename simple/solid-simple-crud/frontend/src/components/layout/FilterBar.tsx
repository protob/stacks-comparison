import { splitProps } from 'solid-js';

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

const FilterBar = (props: FilterBarProps) => {
  const [local, _] = splitProps(props, [
    'showPriorityFilter', 'priorityLabel', 'priorityOptions', 'selectedPriority', 'onPriorityChange',
    'showStatusFilter', 'statusLabel', 'completedLabel', 'showCompleted', 'onShowCompletedChange'
  ]);

  const showPriorityFilter = () => local.showPriorityFilter ?? true;
  const priorityLabel = () => local.priorityLabel || 'Priority';
  const priorityOptions = () => local.priorityOptions || [
    { value: 'all', label: 'All' },
    { value: 'high', label: 'High' },
    { value: 'mid', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  const selectedPriority = () => local.selectedPriority || 'all';
  
  const showStatusFilter = () => local.showStatusFilter ?? true;
  const statusLabel = () => local.statusLabel || 'Status';
  const completedLabel = () => local.completedLabel || 'Show completed';
  const showCompleted = () => local.showCompleted || false;

  return (
    <div class="flex items-center gap-8 mb-6 p-3 bg-neutral-800 border border-neutral-700 rounded">
      {/* Priority Filter */}
      <Show when={showPriorityFilter()}>
        <div>
          <h4 class="text-sm font-medium text-neutral-300 mb-2">{priorityLabel()}</h4>
          <div class="flex gap-4">
            <For each={priorityOptions()}>
              {(option) => (
                <label class="flex items-center gap-2 text-sm text-neutral-400">
                  <input
                    value={option.value}
                    checked={selectedPriority() === option.value}
                    onChange={(e) => local.onPriorityChange(e.currentTarget.value)}
                    type="radio"
                    class="w-4 h-4 border-neutral-600 bg-neutral-700 text-blue-600"
                  />
                  {option.label}
                </label>
              )}
            </For>
          </div>
        </div>
      </Show>

      {/* Status Filter */}
      <Show when={showStatusFilter()}>
        <div>
          <h4 class="text-sm font-medium text-neutral-300 mb-2">{statusLabel()}</h4>
          <label class="flex items-center gap-2 text-sm text-neutral-400">
            <input
              checked={showCompleted()}
              onChange={(e) => local.onShowCompletedChange(e.currentTarget.checked)}
              type="checkbox"
              class="w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-blue-600"
            />
            {completedLabel()}
          </label>
        </div>
      </Show>
    </div>
  );
};

export default FilterBar;