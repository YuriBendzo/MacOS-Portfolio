<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 1024);

const emit = defineEmits<{
  (e: "go-about"): void;
  (e: "go-projects"): void;
}>();
</script>

<template>
  <div class="h-full max-w-4xl mx-auto p-4 overflow-y-auto md:p-8">
    <h1 class="text-2xl text-center font-bold mb-4">Welcome to My Portfolio</h1>
    <p class="text-gray-300 text-sm text-center">
      Navigate through the folders to see my work.
    </p>

    <div
      :class="[isMobile ? 'grid-cols-2' : 'grid-cols-4']"
      class="grid gap-4 mt-8"
    >
      <button
        class="flex flex-col items-center gap-2 group cursor-pointer"
        @click="emit('go-projects')"
        type="button"
      >
        <UIcon
          name="i-heroicons-folder"
          class="size-16 text-blue-400 group-hover:opacity-80 transition-opacity"
        />
        <span class="text-sm group-hover:text-blue-400 transition-colors"
          >Projects</span
        >
      </button>

      <button
        class="flex flex-col items-center gap-2 group cursor-pointer"
        @click="emit('go-about')"
        type="button"
      >
        <UIcon
          name="i-heroicons-user"
          class="size-16 text-blue-400 group-hover:opacity-80 transition-opacity"
        />
        <span class="text-sm group-hover:text-blue-400 transition-colors"
          >About Me</span
        >
      </button>
    </div>
  </div>
</template>
