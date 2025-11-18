<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";

// Color mode is now handled automatically by @nuxtjs/color-mode
</script>

<template>
    <div class="min-h-screen bg-background text-foreground">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Toaster position="top-right" rich-colors />
    </div>
</template>
