<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useScannerStore } from '@/stores/scanner'
import type { ScanResult } from '@/api/damApi'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const scannerStore = useScannerStore()
const { scanningSuno, scanningUdio } = storeToRefs(scannerStore)

const sunoResult = ref<ScanResult | null>(null)
const udioResult = ref<ScanResult | null>(null)
const sunoError = ref<string | null>(null)
const udioError = ref<string | null>(null)
const showSunoErrorDetails = ref(false)
const showUdioErrorDetails = ref(false)

async function handleScanSuno() {
  sunoError.value = null
  sunoResult.value = null
  try {
    sunoResult.value = await scannerStore.scanSuno()
  } catch (error) {
    sunoError.value = error instanceof Error ? error.message : 'Failed to scan Suno folders'
  }
}

async function handleScanUdio() {
  udioError.value = null
  udioResult.value = null
  try {
    udioResult.value = await scannerStore.scanUdio()
  } catch (error) {
    udioError.value = error instanceof Error ? error.message : 'Failed to scan Udio folders'
  }
}

function closeModal() {
  // Only allow closing if nothing is scanning
  if (!scanningSuno.value && !scanningUdio.value) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <!-- Header -->
          <div class="modal-header">
            <h2 class="text-xl font-bold">Scan Asset Folders</h2>
            <button
              @click="closeModal"
              :disabled="scanningSuno || scanningUdio"
              class="p-1 rounded hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdiClose class="w-6 h-6" />
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <p class="text-sm text-neutral-400 mb-6">
              Scan your asset folders to discover new tracks and add them to the database.
            </p>

            <!-- Suno Section -->
            <div class="scan-section">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <MdiMusic class="w-5 h-5 text-blue-400" />
                  <h3 class="font-semibold">Suno</h3>
                </div>
                <button
                  @click="handleScanSuno"
                  :disabled="scanningSuno || scanningUdio"
                  class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <MdiLoading v-if="scanningSuno" class="w-4 h-4 animate-spin" />
                  <MdiScanner v-else class="w-4 h-4" />
                  {{ scanningSuno ? 'Scanning...' : 'Scan Suno' }}
                </button>
              </div>

              <!-- Suno Result -->
              <div v-if="sunoResult" class="result-box success">
                <div class="flex items-start gap-2">
                  <MdiCheckCircle class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div class="flex-1">
                    <p class="font-medium">Scan completed successfully</p>
                    <ul class="text-sm text-neutral-300 mt-1 space-y-1">
                      <li>Found: {{ sunoResult.total_found }} tracks</li>
                      <li>New: {{ sunoResult.new_tracks }} tracks</li>
                      <li>Existing: {{ sunoResult.existing_tracks }} tracks</li>
                    </ul>
                    <div v-if="sunoResult.errors && sunoResult.errors.length > 0" class="mt-2">
                      <button
                        @click="showSunoErrorDetails = !showSunoErrorDetails"
                        class="text-yellow-400 text-sm hover:text-yellow-300 flex items-center gap-1"
                      >
                        <MdiAlertOutline class="w-4 h-4" />
                        {{ sunoResult.errors.length }} errors occurred
                        <MdiChevronDown v-if="!showSunoErrorDetails" class="w-4 h-4" />
                        <MdiChevronUp v-else class="w-4 h-4" />
                      </button>
                      <div v-if="showSunoErrorDetails" class="mt-2 p-2 bg-neutral-900 rounded text-xs max-h-48 overflow-y-auto">
                        <div v-for="(error, idx) in sunoResult.errors.slice(0, 20)" :key="idx" class="text-neutral-400 mb-1">
                          {{ error }}
                        </div>
                        <p v-if="sunoResult.errors.length > 20" class="text-neutral-500 mt-1">
                          ... and {{ sunoResult.errors.length - 20 }} more
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Suno Error -->
              <div v-if="sunoError" class="result-box error">
                <div class="flex items-start gap-2">
                  <MdiAlertCircle class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div class="flex-1">
                    <p class="font-medium">Scan failed</p>
                    <p class="text-sm text-neutral-300 mt-1">{{ sunoError }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Udio Section -->
            <div class="scan-section">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <MdiMusic class="w-5 h-5 text-purple-400" />
                  <h3 class="font-semibold">Udio</h3>
                </div>
                <button
                  @click="handleScanUdio"
                  :disabled="scanningSuno || scanningUdio"
                  class="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-neutral-700 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <MdiLoading v-if="scanningUdio" class="w-4 h-4 animate-spin" />
                  <MdiScanner v-else class="w-4 h-4" />
                  {{ scanningUdio ? 'Scanning...' : 'Scan Udio' }}
                </button>
              </div>

              <!-- Udio Result -->
              <div v-if="udioResult" class="result-box success">
                <div class="flex items-start gap-2">
                  <MdiCheckCircle class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div class="flex-1">
                    <p class="font-medium">Scan completed successfully</p>
                    <ul class="text-sm text-neutral-300 mt-1 space-y-1">
                      <li>Found: {{ udioResult.total_found }} tracks</li>
                      <li>New: {{ udioResult.new_tracks }} tracks</li>
                      <li>Existing: {{ udioResult.existing_tracks }} tracks</li>
                    </ul>
                    <div v-if="udioResult.errors && udioResult.errors.length > 0" class="mt-2">
                      <button
                        @click="showUdioErrorDetails = !showUdioErrorDetails"
                        class="text-yellow-400 text-sm hover:text-yellow-300 flex items-center gap-1"
                      >
                        <MdiAlertOutline class="w-4 h-4" />
                        {{ udioResult.errors.length }} errors occurred
                        <MdiChevronDown v-if="!showUdioErrorDetails" class="w-4 h-4" />
                        <MdiChevronUp v-else class="w-4 h-4" />
                      </button>
                      <div v-if="showUdioErrorDetails" class="mt-2 p-2 bg-neutral-900 rounded text-xs max-h-48 overflow-y-auto">
                        <div v-for="(error, idx) in udioResult.errors.slice(0, 20)" :key="idx" class="text-neutral-400 mb-1">
                          {{ error }}
                        </div>
                        <p v-if="udioResult.errors.length > 20" class="text-neutral-500 mt-1">
                          ... and {{ udioResult.errors.length - 20 }} more
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Udio Error -->
              <div v-if="udioError" class="result-box error">
                <div class="flex items-start gap-2">
                  <MdiAlertCircle class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div class="flex-1">
                    <p class="font-medium">Scan failed</p>
                    <p class="text-sm text-neutral-300 mt-1">{{ udioError }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button
              @click="closeModal"
              :disabled="scanningSuno || scanningUdio"
              class="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.modal-content {
  background-color: var(--color-surface);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.scan-section {
  padding: 1rem;
  background-color: var(--color-background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.scan-section:last-child {
  margin-bottom: 0;
}

.result-box {
  padding: 1rem;
  border-radius: 6px;
  margin-top: 0.75rem;
}

.result-box.success {
  background-color: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.result-box.error {
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}
</style>
