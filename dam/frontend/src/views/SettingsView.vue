<script setup lang="ts">
import { ref } from 'vue'
import { scannerApi } from '@/api/damApi'

const confirmationText = ref('')
const isDropping = ref(false)
const dropResult = ref<string | null>(null)
const dropError = ref<string | null>(null)

async function handleDropDatabase() {
  if (confirmationText.value !== 'iamsure') {
    dropError.value = 'Please type "iamsure" to confirm'
    return
  }

  isDropping.value = true
  dropResult.value = null
  dropError.value = null

  try {
    await scannerApi.dropDatabase(confirmationText.value)
    dropResult.value = 'Database dropped successfully. All tracks have been removed.'
    confirmationText.value = ''
  } catch (error) {
    dropError.value = error instanceof Error ? error.message : 'Failed to drop database'
  } finally {
    isDropping.value = false
  }
}

function clearMessages() {
  dropResult.value = null
  dropError.value = null
}
</script>

<template>
  <div class="settings-container">
    <div class="settings-header">
      <h1 class="text-2xl font-bold">Settings</h1>
      <p class="text-sm text-neutral-400 mt-1">Manage your DAM configuration and database</p>
    </div>

    <div class="settings-content">
      <!-- Danger Zone -->
      <div class="settings-section danger-section">
        <div class="section-header">
          <MdiAlert class="w-5 h-5 text-red-400" />
          <h2 class="text-lg font-semibold">Danger Zone</h2>
        </div>

        <div class="section-body">
          <div class="danger-box">
            <div class="mb-4">
              <h3 class="font-medium text-red-400 mb-2">Drop Database</h3>
              <p class="text-sm text-neutral-300">
                This will permanently delete all tracks from the database. This action cannot be undone.
                Your audio files will remain on disk, but all metadata, ratings, and tags will be lost.
              </p>
            </div>

            <div class="confirmation-input mb-4">
              <label for="confirmation" class="block text-sm font-medium mb-2">
                Type <code class="px-1 py-0.5 bg-neutral-800 rounded text-red-400">iamsure</code> to confirm:
              </label>
              <input
                id="confirmation"
                v-model="confirmationText"
                type="text"
                placeholder="iamsure"
                @input="clearMessages"
                class="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                :disabled="isDropping"
              />
            </div>

            <button
              @click="handleDropDatabase"
              :disabled="confirmationText !== 'iamsure' || isDropping"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors flex items-center gap-2"
            >
              <MdiLoading v-if="isDropping" class="w-4 h-4 animate-spin" />
              <MdiDelete v-else class="w-4 h-4" />
              {{ isDropping ? 'Dropping Database...' : 'Drop Database' }}
            </button>

            <!-- Success Message -->
            <div v-if="dropResult" class="mt-4 p-3 bg-green-900/20 border border-green-700 rounded-md flex items-start gap-2">
              <MdiCheckCircle class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p class="text-sm text-green-300">{{ dropResult }}</p>
            </div>

            <!-- Error Message -->
            <div v-if="dropError" class="mt-4 p-3 bg-red-900/20 border border-red-700 rounded-md flex items-start gap-2">
              <MdiAlertCircle class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p class="text-sm text-red-300">{{ dropError }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.settings-header {
  margin-bottom: 2rem;
}

.settings-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-section {
  background-color: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.danger-section {
  border-color: rgba(239, 68, 68, 0.3);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--color-background);
}

.danger-section .section-header {
  background-color: rgba(239, 68, 68, 0.05);
  border-bottom-color: rgba(239, 68, 68, 0.2);
}

.section-body {
  padding: 1.5rem;
}

.danger-box {
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
}

code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}
</style>
