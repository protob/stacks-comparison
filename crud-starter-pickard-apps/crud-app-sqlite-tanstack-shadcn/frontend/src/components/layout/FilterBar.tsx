import type { Priority } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterBarProps {
    selectedPriority: 'all' | Priority;
    onPriorityChange: (priority: 'all' | Priority) => void;
    showCompleted: boolean;
    onShowCompletedChange: (show: boolean) => void;
}

export default function FilterBar({
    selectedPriority,
    onPriorityChange,
    showCompleted,
    onShowCompletedChange
}: FilterBarProps) {
    return (
        <div className="p-4 bg-surface rounded-card">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h4 className="font-semibold mb-2">Priority</h4>
                    <RadioGroup
                        value={selectedPriority}
                        onValueChange={(value) => onPriorityChange(value as any)}
                        className="flex items-center gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="all" id="priority-all" className="h-4 w-4" />
                            <Label htmlFor="priority-all" className="text-sm font-normal capitalize">
                                All
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="priority-high" className="h-4 w-4" />
                            <Label htmlFor="priority-high" className="text-sm font-normal capitalize">
                                High
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mid" id="priority-mid" className="h-4 w-4" />
                            <Label htmlFor="priority-mid" className="text-sm font-normal capitalize">
                                Medium
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="priority-low" className="h-4 w-4" />
                            <Label htmlFor="priority-low" className="text-sm font-normal capitalize">
                                Low
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Status</h4>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="show-completed"
                            checked={showCompleted}
                            onCheckedChange={onShowCompletedChange}
                        />
                        <Label htmlFor="show-completed" className="text-sm font-normal">
                            Show completed
                        </Label>
                    </div>
                </div>
            </div>
        </div>
    );
}