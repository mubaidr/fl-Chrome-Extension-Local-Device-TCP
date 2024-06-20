<script setup lang="ts">
import { PrinterObject } from '@/types'

const isLoading = ref(false)
const printers = ref<PrinterObject[]>([])

async function setup() {
  isLoading.value = true

  printers.value = await chrome.runtime.sendMessage<
    {
      type: 'getPrinters'
    },
    PrinterObject[]
  >({
    type: 'getPrinters',
  })

  isLoading.value = false
}

setup()
</script>

<template>
  <div class="m-4 flex flex-col gap-y-2">
    <template v-if="isLoading">
      <TailwindSpinner></TailwindSpinner>
    </template>
    <template v-else-if="printers.length === 0">
      <p>No printers found</p>
      <TailwindEmptyState></TailwindEmptyState>
    </template>
    <template v-else>
      <pre>{{ printers }}</pre>
    </template>
  </div>
</template>

<style scoped></style>
