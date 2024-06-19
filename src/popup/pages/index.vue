<script setup lang="ts">
async function setup() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  if (!tab.id) {
    return
  }

  const fromPageLocalStore = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      return JSON.stringify(localStorage)
    },
  })

  console.table(fromPageLocalStore)
}

setup()
</script>

<template>
  <div class="text-center m-4 flex flex-col gap-y-2">
    <h1 class="text-3xl font-bold underline pb-6">
      Communicate with Network Printers
    </h1>
    <div class="flex justify-center gap-2">
      <button class="btn btn-primary">Send TCP Command</button>
      <button class="btn btn-primary">Send Web Command</button>
    </div>
  </div>
</template>

<style scoped></style>
