<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const emit = defineEmits<{
  (e: "go-about"): void;
  (e: "go-projects"): void;
  (e: "go-documents"): void;
}>();

const folders = [
  { id: 1, name: "About Me", action: () => emit("go-about") },
  { id: 2, name: "Documents", action: () => emit("go-documents") },
  { id: 3, name: "Projects", action: () => emit("go-projects") },
];
</script>

<template>
  <div class="h-full max-w-4xl mx-auto p-4 overflow-y-auto md:p-8">
    <h1 class="text-2xl text-center font-bold mb-4">Welcome to My Portfolio</h1>
    <p class="text-gray-300 text-sm text-center">
      Navigate through the folders.
    </p>

    <div
      :class="[isMobile ? 'grid-cols-2' : 'grid-cols-3']"
      class="grid gap-4 mt-8"
    >
      <button
        v-for="folder in folders"
        :key="folder.id"
        type="button"
        class="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
        @click="folder.action"
      >
        <UIcon
          name="i-heroicons-folder"
          class="size-14 text-blue-400 group-hover:scale-105 transition-transform"
        />
        <span class="text-sm">{{ folder.name }}</span>
      </button>
    </div>
  </div>
</template>
