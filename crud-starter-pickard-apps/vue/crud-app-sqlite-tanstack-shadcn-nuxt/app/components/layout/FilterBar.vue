<script setup lang="ts">
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useFilterStore } from "@/stores/filterStore";

const filterStore = useFilterStore();
</script>

<template>
    <div class="p-4 space-y-4 border rounded-lg bg-surface border-border">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
                <Label class="block mb-2">Priority</Label>
                <RadioGroup v-model="filterStore.selectedPriority" class="flex items-center gap-4">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="r-all" value="all" />
                        <Label for="r-all">All</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="r-low" value="low" />
                        <Label for="r-low">Low</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="r-mid" value="mid" />
                        <Label for="r-mid">Mid</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="r-high" value="high" />
                        <Label for="r-high">High</Label>
                    </div>
                </RadioGroup>
            </div>

            <div>
                <Label class="block mb-2">Status</Label>
                <div class="flex items-center gap-2">
                    <Checkbox
                        id="show-completed"
                        :checked="filterStore.showCompleted"
                        @update:modelValue="(val) => (filterStore.showCompleted = val as boolean)"
                    />
                    <Label
                        for="show-completed"
                        class="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    >
                        Show Completed Items
                    </Label>
                </div>
            </div>
        </div>

        <Button v-if="filterStore.hasActiveFilters" variant="ghost" size="sm" @click="filterStore.clearFilters()" class="mt-4"> Clear Filters </Button>
    </div>
</template>
