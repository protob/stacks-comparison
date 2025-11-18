<script setup lang="ts">
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useUpdateItem, useDeleteItem } from "@/composables/useItemsApi";
import { formatDate } from "@/utils/helpers";
import { useUiStore } from "@/stores/uiStore";
import type { Item } from "@/types";

const props = defineProps<{ item: Item }>();

const { mutate: updateItem } = useUpdateItem();
const { mutate: deleteItem } = useDeleteItem();
const uiStore = useUiStore();

const toggleComplete = () => {
    if (!props.item?.id) return;

    updateItem({
        id: props.item.id,
        payload: { isCompleted: !props.item.isCompleted },
    });
};

const handleDelete = () => {
    if (!props.item?.id) return;

    if (confirm("Are you sure you want to delete this item?")) {
        deleteItem(props.item.id);
    }
};
</script>

<template>
    <Card v-if="item" :class="{ 'opacity-60': item.isCompleted }">
        <CardContent class="flex items-start gap-4 p-4">
            <Checkbox :checked="item.isCompleted" @update:checked="toggleComplete" class="mt-1" />

            <div class="flex-1">
                <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-size-lg" :class="{ 'line-through text-text-muted': item.isCompleted }">
                        {{ item.name }}
                    </h3>
                    <Badge :class="`tag-priority-${item.priority} tag-sm`" variant="outline">
                        {{ item.priority }}
                    </Badge>
                </div>

                <p class="mb-3 text-text-secondary">{{ item.text }}</p>

                <div class="flex items-center justify-between">
                    <p class="text-xs text-text-muted">
                        {{ formatDate(item.createdAt) }}
                    </p>
                    <div class="flex gap-2">
                        <Button size="sm" variant="ghost" @click="uiStore.openForm(item)">
                            <Icon name="lucide:pencil" class="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" @click="handleDelete">
                            <Icon name="lucide:trash-2" class="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div v-if="item.tags?.length" class="flex gap-2 mt-3">
                    <Badge v-for="tag in item.tags" :key="tag" variant="secondary">
                        {{ tag }}
                    </Badge>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
