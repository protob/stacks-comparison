<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import { useColorMode } from "@vueuse/core";

// Initialize color mode early
const colorMode = useColorMode();
</script>

<template>
    <div class="min-h-screen bg-background text-foreground">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Toaster position="top-right" rich-colors />
    </div>
</template>
