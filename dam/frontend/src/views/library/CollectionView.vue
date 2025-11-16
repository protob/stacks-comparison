<script setup lang="ts">
import { ref, computed, watch, h } from 'vue'
import { useRoute } from 'vue-router'
import { useLibraryStore } from '@/stores/library'
import { usePlayerDamStore } from '@/stores/playerDam'
import { useTracksStore } from '@/stores/tracks'
import { useConfirmDialogStore } from '@/stores/confirmDialog'
import { collectionsApi, projectsApi, ideasApi, songsApi, downloadApi } from '@/api/damApi'
import { storeToRefs } from 'pinia'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  FlexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import type { Track, Collection } from '@/types/dam-api'
import MdiPlay from '~icons/mdi/play'
import MdiPause from '~icons/mdi/pause'
import MdiMusicNoteOutline from '~icons/mdi/music-note-outline'
import MdiLoading from '~icons/mdi/loading'
import MdiInboxOutline from '~icons/mdi/inbox-outline'
import MdiPencil from '~icons/mdi/pencil'
import MdiDelete from '~icons/mdi/delete'
import MdiDownload from '~icons/mdi/download'
import { tracksApi } from '@/api/damApi'

const route = useRoute()
const libraryStore = useLibraryStore()
const playerStore = usePlayerDamStore()
const tracksStore = useTracksStore()
const confirmDialogStore = useConfirmDialogStore()
const { currentTrackId, isPlaying } = storeToRefs(playerStore)
const { libraryTree, isEditMode } = storeToRefs(libraryStore)

const collection = ref<Collection | null>(null)
const tracks = ref<Track[]>([])
const loading = ref(false)

const loadCollectionTracks = async (collectionId: string) => {
  loading.value = true
  try {
    collection.value = await collectionsApi.get(collectionId)
    const projects = await collectionsApi.listProjects(collectionId)

    // Load ideas for all projects
    const ideaPromises = projects.map(project => projectsApi.listIdeas(project.id))
    const ideaArrays = await Promise.all(ideaPromises)
    const ideas = ideaArrays.flat()

    // Load songs for all ideas
    const songPromises = ideas.map(idea => ideasApi.listSongs(idea.id))
    const songArrays = await Promise.all(songPromises)
    const songs = songArrays.flat()

    // Load tracks for all songs
    const trackPromises = songs.map(song => songsApi.listTracks(song.id))
    const trackArrays = await Promise.all(trackPromises)
    tracks.value = trackArrays.flat()
  } catch (error) {
    console.error('Failed to load collection tracks:', error)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id as string,
  (collectionId) => {
    if (collectionId) {
      loadCollectionTracks(collectionId)
    }
  },
  { immediate: true }
)

const unassignTrack = async (track: Track) => {
  const confirmed = await confirmDialogStore.confirm({
    title: 'Remove Track from Collection',
    message: `Remove "${track.title || 'Untitled'}" from this collection?\n\nThe track will remain in workspace but will be unassigned.`,
    confirmText: 'Remove',
    cancelText: 'Cancel',
    danger: true
  })

  if (!confirmed) return

  try {
    await tracksApi.assignToSong(track.id, null)
    if (route.params.id) {
      await loadCollectionTracks(route.params.id as string)
    }
    libraryStore.loadAllHierarchy()
  } catch (error) {
    console.error('Failed to unassign track:', error)
    await confirmDialogStore.confirm({
      title: 'Failed to Remove Track',
      message: 'Failed to remove track from collection. Please try again.',
      confirmText: 'OK',
      danger: false
    })
  }
}

const sorting = ref<SortingState>([])

const columns = computed<ColumnDef<Track>[]>(() => {
  const baseColumns: ColumnDef<Track>[] = [
  {
    id: 'number',
    header: '#',
    cell: ({ row }) => (row.index + 1).toString(),
    size: 50,
  },
  {
    id: 'play',
    header: () => h(MdiMusicNoteOutline, { class: 'w-4 h-4' }),
    cell: ({ row }) => {
      const track = row.original
      const isCurrentTrack = currentTrackId.value === track.id
      const Icon = isCurrentTrack && isPlaying.value ? MdiPause : MdiPlay

      return h(
        'button',
        {
          class: 'p-1.5 rounded-full hover:bg-primary/20 transition-colors',
          onClick: (e: Event) => {
            e.stopPropagation()
            if (isCurrentTrack && isPlaying.value) {
              playerStore.pause()
            } else {
              playerStore.setQueue(tracks.value, track)
              playerStore.playTrack(track)
              tracksStore.selectTrack(track)
            }
          }
        },
        h(Icon, { class: 'w-4 h-4 text-primary' })
      )
    },
    size: 60,
  },
  {
    accessorKey: 'title',
    header: 'TITLE',
    cell: ({ row }) => row.original.title || 'Untitled',
  },
  {
    accessorKey: 'rating',
    header: 'RATING',
    cell: ({ row }) => {
      const rating = row.original.rating || 0
      return '⭐'.repeat(rating) || '—'
    },
    size: 120,
  },
  {
    id: 'duration',
    header: 'DURATION',
    cell: ({ row }) => {
      const ms = row.original.duration_ms || 0
      const seconds = Math.floor(ms / 1000)
      const minutes = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${minutes}:${secs.toString().padStart(2, '0')}`
    },
    size: 100,
  },
  ]

  if (isEditMode.value) {
    baseColumns.push({
      id: 'delete',
      header: '',
      cell: ({ row }) => h('button', {
        class: 'p-1.5 rounded hover:bg-red-500/20 text-red-400 transition-colors',
        onClick: (e: Event) => { e.stopPropagation(); unassignTrack(row.original) },
        title: 'Remove from collection'
      }, h(MdiDelete, { class: 'w-4 h-4' })),
      size: 60,
    })
  }

  return baseColumns
})

const table = useVueTable({
  get data() {
    return tracks.value
  },
  get columns() {
    return columns.value
  },
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

const handleRowClick = (track: Track) => {
  const isCurrentTrack = currentTrackId.value === track.id

  if (isCurrentTrack && isPlaying.value) {
    playerStore.pause()
  } else {
    playerStore.setQueue(tracks.value, track)
    playerStore.playTrack(track)
    tracksStore.selectTrack(track)
  }
}

const downloading = ref(false)

const handleDownload = async () => {
  if (!route.params.id || downloading.value) return

  downloading.value = true
  try {
    await downloadApi.collection(route.params.id as string)
  } catch (error) {
    console.error('Failed to download collection:', error)
    await confirmDialogStore.confirm({
      title: 'Download Failed',
      message: 'Failed to download collection. Please try again.',
      confirmText: 'OK',
      danger: false
    })
  } finally {
    downloading.value = false
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between p-4 border-b border-border">
      <div>
        <h1 class="text-xl font-semibold text-text-primary">{{ collection?.name || 'Loading...' }}</h1>
        <p class="text-xs text-text-muted">Collection Tracks</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="text-sm text-text-muted">
          {{ tracks.length }} {{ tracks.length === 1 ? 'track' : 'tracks' }}
        </div>
        <button
          @click="handleDownload"
          :disabled="downloading || tracks.length === 0"
          class="px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors bg-surface hover:bg-surface-hover text-text-primary border border-border disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MdiLoading v-if="downloading" class="w-4 h-4 animate-spin" />
          <MdiDownload v-else class="w-4 h-4" />
          {{ downloading ? 'Downloading...' : 'Download' }}
        </button>
        <button
          @click="libraryStore.isEditMode = !libraryStore.isEditMode"
          :class="['px-3 py-1.5 text-sm font-medium rounded-md flex items-center gap-1.5 transition-colors', isEditMode ? 'bg-primary text-text-inverse' : 'bg-surface hover:bg-surface-hover text-text-primary border border-border']"
        >
          <MdiPencil class="w-4 h-4" />
          {{ isEditMode ? 'Done Editing' : 'Edit' }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-64">
      <MdiLoading class="w-8 h-8 animate-spin text-primary" />
    </div>

    <div
      v-else-if="!tracks || tracks.length === 0"
      class="flex flex-col items-center justify-center h-64 text-center"
    >
      <MdiInboxOutline class="w-16 h-16 mb-4 text-text-muted" />
      <p class="text-text-muted mb-2">No tracks in this collection yet</p>
    </div>

    <div v-else class="flex-1 overflow-auto">
      <table class="w-full text-sm">
        <thead class="sticky top-0 bg-background border-b border-border">
          <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :style="{ width: header.getSize() !== 150 ? `${header.getSize()}px` : undefined }"
              class="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            @click="handleRowClick(row.original)"
            :class="[
              'cursor-pointer hover:bg-surface-hover transition-colors border-b border-border',
              currentTrackId === row.original.id && 'bg-primary/10'
            ]"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="px-4 py-3 text-text-primary"
            >
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
