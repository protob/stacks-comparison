import type { Priority } from "@/types";

interface FilterBarProps {
    selectedPriority: 'all' | Priority;
    onPriorityChange: (priority: 'all' | Priority) => void;
    showCompleted: boolean;
    onShowCompletedChange: (show: boolean) => void;
}

export default function FilterBar({
    selectedPriority, onPriorityChange,
    showCompleted, onShowCompletedChange
}: FilterBarProps) {
    return (
        <div className="p-4 bg-surface rounded-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-2">Priority</h4>
                        <div className="flex items-center gap-4">
                            {(['all', 'high', 'mid', 'low'] as const).map(p => (
                                <label key={p} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="priority"
                                        checked={selectedPriority === p}
                                        onChange={() => onPriorityChange(p)}
                                    />
                                    <span className="capitalize">{p}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Status</h4>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showCompleted}
                                onChange={(e) => onShowCompletedChange(e.target.checked)}
                            />
                            Show completed
                        </label>
                    </div>
                </div>
        </div>
    );
}