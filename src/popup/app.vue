<script setup lang="ts"></script>

<template>
  <header
    aria-label="Site Header"
    class="bg-slate-300 px-2 py-4"
  >
    <img src="/src/assets/bookingfor121x22.png" />
  </header>

  <div class="p-6">
    <RouterView />
  </div>

  <footer
    aria-label="Site Footer"
    class="bg-slate-300 px-2 py-2"
  >
    <div>
      <p class="text-blue-600 hover:text-blue-800">
        <a
          href="https://www.bookingfor.com"
          class="link no-underline"
        >
          Bookingfor: booking engine to create booking portals
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
