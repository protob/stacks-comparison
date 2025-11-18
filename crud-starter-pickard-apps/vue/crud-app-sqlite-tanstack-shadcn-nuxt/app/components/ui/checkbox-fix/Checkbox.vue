<script setup lang="ts">
import { ref, watch, defineEmits, defineProps } from "vue";
import { Checkbox as ShadcnCheckbox } from "@/components/ui/checkbox";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const internalChecked = ref(props.modelValue);

watch(
    () => props.modelValue,
    (val) => {
        internalChecked.value = val;
    },
);

function onCheckedChange(val: boolean) {
    emit("update:modelValue", val);
}
</script>

<template>
    <ShadcnCheckbox :checked="internalChecked" @update:checked="onCheckedChange" />
</template>
