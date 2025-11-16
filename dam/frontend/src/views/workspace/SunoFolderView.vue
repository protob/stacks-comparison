<script setup lang="ts">
import { ref, watch, h } from 'vue'
import { useRoute } from 'vue-router'
import { useWorkspaceStore } from '@/stores/workspace'
import { usePlayerDamStore } from '@/stores/playerDam'
import { storeToRefs } from 'pinia'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  FlexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import type { Track } from '@/types/dam-api'
import { useFileUrl } from '@/composables/useFileUrl'
import MdiPlay from '~icons/mdi/play'
import MdiPause from '~icons/mdi/pause'
import MdiMusicNoteOutline from '~icons/mdi/music-note-outline'
import MdiLoading from '~icons/mdi/loading'
import MdiCursorDefaultClickOutline from '~icons/mdi/cursor-default-click-outline'
import MdiInboxOutline from '~icons/mdi/inbox-outline'
import MdiMagnifyRemoveOutline from '~icons/mdi/magnify-remove-outline'

const route = useRoute()
const workspaceStore = useWorkspaceStore()
const playerStore = usePlayerDamStore()
const { filteredTracks, loading, currentPath } = storeToRefs(workspaceStore)
const { currentTrackId, isPlaying } = storeToRefs(playerStore)
const { getFileUrl } = useFileUrl()

// Import tracks store for sidebar
import { useTracksStore } from '@/stores/tracks'
const tracksStore = useTracksStore()

// === DATA LOADING ===
watch(
  () => route.params.path,
  (newPath) => {
    const pathArray = Array.isArray(newPath) ? newPath : (newPath ? [newPath] : [])
    const pathString = pathArray.join('/')
    workspaceStore.loadTracksForPath(pathString)
  },
  { immediate: true, deep: true }
)

// === TANSTACK TABLE SETUP ===
const sorting = ref<SortingState>([])
const globalFilter = ref('')

const columns: ColumnDef<Track>[] = [
  // Track Number Column
  {
    id: 'number',
    header: '#',
    cell: ({ row }) => {
      const track = row.original
      const uuid = track.suno_id || track.udio_id || track.id

      return h(
        'div',
        {
          class: 'cursor-pointer hover:text-blue-400 transition-colors',
          'data-uuid': uuid,
          title: 'Click to copy UUID',
          onClick: async (e: Event) => {
            e.stopPropagation()
            try {
              await navigator.clipboard.writeText(uuid)
              // Visual feedback - briefly change color
              const el = e.target as HTMLElement
              el.classList.add('text-green-400')
              setTimeout(() => el.classList.remove('text-green-400'), 300)
            } catch (err) {
              console.error('Failed to copy UUID:', err)
            }
          }
        },
        (row.index + 1).toString()
      )
    },
    size: 28,
  },
  // Image Column with Play Button
  {
    id: 'image',
    header: '',
    cell: ({ row }) => {
      const track = row.original
      const imageUrl = getFileUrl(track.image_path)
      const isCurrentTrack = currentTrackId.value === track.id
      const showPauseIcon = isCurrentTrack && isPlaying.value

      return h(
        'div',
        {
          class: 'relative w-10 h-10 rounded overflow-hidden cursor-pointer group',
          onClick: (e: Event) => {
            e.stopPropagation()
            // Set the queue to all filtered tracks in current view
            playerStore.setQueue(filteredTracks.value, track)
            playerStore.playTrack(track)
            // Also load track data into right sidebar
            tracksStore.selectTrack(track)
          }
        },
        [
          // Background image or placeholder
          imageUrl
            ? h('img', { src: imageUrl, class: 'w-full h-full object-cover' })
            : h('div', { class: 'w-full h-full bg-neutral-800 flex items-center justify-center' },
                h(MdiMusicNoteOutline, { class: 'w-5 h-5 text-neutral-500' })
              ),
          // Play/Pause overlay (shown on hover or when playing)
          h(
            'div',
            {
              class: [
                'absolute inset-0 flex items-center justify-center bg-black transition-opacity',
                isCurrentTrack ? 'bg-opacity-40 opacity-100' : 'bg-opacity-60 opacity-0 group-hover:opacity-100'
              ]
            },
            h(
              showPauseIcon ? MdiPause : MdiPlay,
              { class: 'w-6 h-6 text-white drop-shadow-lg' }
            )
          )
        ]
      )
    },
    size: 56,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: info => {
        const rating = info.getValue() as number | null;
        if (rating === null || rating === 0) return '—';
        return '★'.repeat(rating) + '☆'.repeat(5 - rating)
    },
     size: 120,
  },
  {
    accessorKey: 'duration_ms',
    header: 'Duration',
    cell: info => {
      const ms = info.getValue() as number | null
      if (!ms) return '--:--'
      const seconds = Math.floor(ms / 1000)
      const mins = Math.floor(seconds / 60)
      const secs = (seconds % 60).toString().padStart(2, '0')
      return `${mins}:${secs}`
    },
    size: 100,
  },
  {
    accessorKey: 'created_at',
    header: 'Date Added',
    cell: info => new Date(info.getValue() as string).toLocaleDateString('uk-UK'),
    size: 150,
  },
]

const table = useVueTable({
  get data() { return filteredTracks.value },
  columns,
  state: {
    get sorting() { return sorting.value },
    get globalFilter() { return globalFilter.value }
  },
  onSortingChange: updater => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onGlobalFilterChange: (value) => {
    globalFilter.value = value
  }
})
</script>

<template>
  <div class="flex flex-col h-full bg-neutral-900">
    <div class="flex-shrink-0 p-3 border-b border-border bg-surface">
      <input
        :value="globalFilter"
        @input="table.setGlobalFilter($event.target.value)"
        type="text"
        placeholder="Search tracks in this view..."
        class="w-full px-3 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>

    <div v-if="loading" class="flex items-center justify-center flex-1">
        <MdiLoading class="w-6 h-6 animate-spin text-neutral-400" />
        <span class="ml-2 text-neutral-400">Loading tracks...</span>
    </div>

    <div v-else-if="!currentPath" class="flex flex-col items-center justify-center flex-1 text-center">
        <MdiCursorDefaultClickOutline class="w-12 h-12 mb-4 text-neutral-600" />
        <h3 class="text-lg font-semibold">Select a Folder</h3>
        <p class="text-neutral-500">Choose a source or folder from the sidebar to view tracks.</p>
    </div>

    <div v-else-if="filteredTracks.length === 0 && !globalFilter" class="flex flex-col items-center justify-center flex-1 text-center">
        <MdiInboxOutline class="w-12 h-12 mb-4 text-neutral-600" />
        <h3 class="text-lg font-semibold">Empty Folder</h3>
        <p class="text-neutral-500">No tracks were found in this location.</p>
    </div>

     <div v-else-if="table.getRowModel().rows.length === 0" class="flex flex-col items-center justify-center flex-1 text-center">
        <MdiMagnifyRemoveOutline class="w-12 h-12 mb-4 text-neutral-600" />
        <h3 class="text-lg font-semibold">No Results</h3>
        <p class="text-neutral-500">No tracks match your search for "{{ globalFilter }}".</p>
    </div>

    <div v-else class="flex-1 overflow-y-auto">
      <table class="w-full text-sm">
        <thead class="sticky top-0 z-10 bg-surface">
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              @click="header.column.getToggleSortingHandler()?.($event)"
              class="py-2 font-semibold tracking-wider uppercase border-b cursor-pointer select-none text-text-secondary border-border"
              :class="{
                'sortable': header.column.getCanSort(),
                'px-4 text-left': header.id !== 'number',
                'px-0.5 text-center': header.id === 'number'
              }"
              :style="{ width: `${header.getSize()}px`, minWidth: `${header.getSize()}px`, maxWidth: `${header.getSize()}px` }"
            >
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <span v-if="header.column.getIsSorted()" class="ml-1">
                {{ header.column.getIsSorted() === 'asc' ? '🔼' : '🔽' }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-800">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            @click="tracksStore.selectTrack(row.original)"
            :class="[
              'transition-colors hover:bg-neutral-800 cursor-pointer',
              currentTrackId === row.original.id ? 'bg-neutral-800/50' : ''
            ]"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              :class="{
                'px-4 py-1.5': cell.column.id !== 'number',
                'px-0.5 py-1.5 text-center': cell.column.id === 'number'
              }"
              :style="{ width: `${cell.column.getSize()}px`, minWidth: `${cell.column.getSize()}px`, maxWidth: `${cell.column.getSize()}px` }"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.sortable {
    transition: color 0.2s;
}
.sortable:hover {
    color: var(--color-text-primary);
}
</style>
