import { defineStore } from 'pinia'
import { ref } from 'vue'
import { scannerApi, type ScanResult } from '@/api/damApi'

export const useScannerStore = defineStore('scanner', () => {
  // State - Separate loading states for better UX
  const scanningSuno = ref(false)
  const scanningUdio = ref(false)
  const lastSunoResult = ref<ScanResult | null>(null)
  const lastUdioResult = ref<ScanResult | null>(null)
  const lastSunoScan = ref<Date | null>(null)
  const lastUdioScan = ref<Date | null>(null)

  // Actions
  async function scanSuno() {
    scanningSuno.value = true
    try {
      lastSunoResult.value = await scannerApi.scanSuno()
      lastSunoScan.value = new Date()
      return lastSunoResult.value
    } catch (error) {
      console.error('Failed to scan Suno:', error)
      throw error
    } finally {
      scanningSuno.value = false
    }
  }

  async function scanUdio() {
    scanningUdio.value = true
    try {
      lastUdioResult.value = await scannerApi.scanUdio()
      lastUdioScan.value = new Date()
      return lastUdioResult.value
    } catch (error) {
      console.error('Failed to scan Udio:', error)
      throw error
    } finally {
      scanningUdio.value = false
    }
  }

  return {
    // State
    scanningSuno,
    scanningUdio,
    lastSunoResult,
    lastUdioResult,
    lastSunoScan,
    lastUdioScan,

    // Actions
    scanSuno,
    scanUdio
  }
})