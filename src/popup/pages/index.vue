<script setup lang="ts">
import type { PrinterObject } from '@/types'

const pending = ref(true)
const printers = ref<PrinterObject[] | null>([])

const init = async () => {
  try {
    const { data } = await chrome.runtime.sendMessage({
      type: 'STATUS',
    })

    printers.value = data
  } catch (err) {
    console.log(err)
    printers.value = null
  } finally {
    pending.value = false
  }
}

init()
</script>

<template>
  <div>
    <template v-if="pending">
      <div class="block text-center">
        <span class="loading loading-ring loading-lg" />
      </div>
    </template>
    <template v-else-if="!printers || printers.length === 0">
      <div
        role="alert"
        class="flex alert alert-success text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>Warning: No printer config found!</span>
      </div>
    </template>
    <template v-else>
      <div
        role="alert"
        class="flex alert alert-success text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Config present with {{ printers.length }} printers.</span>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
