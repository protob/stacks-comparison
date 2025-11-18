<script setup lang="ts">
import AppSidebar from "@/components/layout/AppSidebar.vue";
import TopBar from "@/components/layout/TopBar.vue";
</script>

<template>
    <!-- Layout as grid, matching Vue codebase -->
    <div class="grid min-h-screen" style="grid-template-columns: var(--sidebar-width) 1fr">
        <AppSidebar />
        <main class="min-w-0 overflow-y-auto">
            <div class="p-fluid-4 md:p-fluid-6 lg:p-fluid-8">
                <TopBar />
                <slot />
            </div>
        </main>
    </div>
</template>
