<script setup lang="ts"></script>

<template>
  <div>
    <header aria-label="Site Header">
      <nav
        class="relative flex w-full flex-wrap items-center justify-between px-4 pt-2 text-gray-700 hover:text-gray-900 focus:text-gray-700"
      >
        <div>
          <RouterLink
            to="/popup"
            class="flex items-center text-gray-700 hover:text-gray-900 focus:text-gray-900"
          >
            <img
              src="../assets/logo.png"
              class="w-8 h8 mr-4"
            >
            <span class="text-xl font-bold">Printers</span>
          </RouterLink>
        </div>

        <div
          class="flex w-full gap-4 flex-wrap items-end justify-end py-2 border-2 border-gray-100 border-t-0 border-l-0 border-r-0"
        >
          <!-- <div class="flex gap-2"> -->
          <RouterLink
            to="/popup/settings"
            class="flex content-center items-center text-sky-500"
          >
            <i-mdi-cog class="mr-1" />
            <span>Options</span>
          </RouterLink>

          <!-- </div> -->
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped></style>
