<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TreeNode } from '@/types/ui'

const props = defineProps<{
  node: TreeNode
  level: number
}>()

const route = useRoute()
const router = useRouter()

const isExpanded = ref(props.level < 1) // Only expand the top-level (Suno, Udio) by default

const hasChildren = computed(() => props.node.children && props.node.children.length > 0)

const nodePath = computed(() => `/workspace/${props.node.path}`)

const isActive = computed(() => {
    return route.path === nodePath.value
})

function navigate(event: MouseEvent) {
    // If clicking on the expander, only toggle, don't navigate
    if ((event.target as HTMLElement).closest('.expander')) {
        if (hasChildren.value) {
            isExpanded.value = !isExpanded.value
        }
        return;
    }
    router.push(nodePath.value)
}
</script>

<template>
  <div>
    <div
      @click="navigate"
      class="flex items-center p-1.5 rounded-md cursor-pointer transition-colors"
      :class="isActive ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200'"
      :style="{ paddingLeft: `${level * 16 + 8}px` }"
    >
      <div class="flex items-center justify-center flex-shrink-0 w-5 h-5 mr-1 expander">
         <MdiChevronDown v-if="hasChildren && isExpanded" class="w-4 h-4 transition-transform" />
         <MdiChevronRight v-else-if="hasChildren" class="w-4 h-4 transition-transform" />
      </div>
      
      <MdiMusic v-if="node.type === 'source'" class="flex-shrink-0 w-4 h-4 mr-2" />
      <MdiFolderOpenOutline v-else-if="node.type === 'folder' && isExpanded" class="flex-shrink-0 w-4 h-4 mr-2 text-blue-400" />
      <MdiFolderOutline v-else-if="node.type === 'folder'" class="flex-shrink-0 w-4 h-4 mr-2" />
 
      <span class="text-sm font-medium truncate select-none">{{ node.label }}</span>
    </div>

    <div v-if="isExpanded && hasChildren" class="mt-1 space-y-1">
      <SidebarNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
      />
    </div>
  </div>
</template>