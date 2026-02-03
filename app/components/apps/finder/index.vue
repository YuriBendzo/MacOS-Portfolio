<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

import AboutMe from "../AboutMe.vue";
import Projects from "../Projects.vue";
import FinderHome from "./Home.vue";

type View = "home" | "about" | "projects";

const currentView = ref<View>("home");

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 1024);

const goHome = () => (currentView.value = "home");
const goAbout = () => (currentView.value = "about");
const goProjects = () => (currentView.value = "projects");
</script>

<template>
  <div class="h-full flex">
    <div
      :class="[isMobile ? 'w-16 items-center' : 'w-36']"
      class="h-full self-stretch bg-gray-800/50 border-r border-white/10 p-2 flex flex-col gap-1"
    >
      <div class="text-xs text-gray-400 font-bold md:text-sm px-2 py-1">
        {{ isMobile ? "Favs" : "Favorites" }}
      </div>
      <button
        type="button"
        class="flex items-center gap-2 px-2 py-1 rounded text-left transition-colors"
        :class="[
          currentView === 'home'
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer',
        ]"
        @click="goHome"
      >
        <UIcon name="i-heroicons-home" class="size-4 md:size-5 text-blue-400" />
        <span class="text-sm font-medium" :class="{ hidden: isMobile }"
          >Home</span
        >
      </button>

      <button
        type="button"
        class="flex items-center gap-2 px-2 py-1 rounded text-left transition-colors"
        :class="[
          currentView === 'projects'
            ? 'bg-white/10 text-white shadow-sm'
            : 'text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer',
        ]"
        @click="goProjects"
      >
        <UIcon
          name="i-heroicons-folder-open"
          class="size-4 md:size-5 text-blue-400"
        />
        <span class="text-sm font-medium" :class="{ hidden: isMobile }"
          >Projects</span
        >
      </button>

      <div
        class="flex items-center gap-2 px-2 py-1 rounded opacity-50 cursor-not-allowed"
      >
        <UIcon
          name="i-heroicons-document-text"
          class="size-4 md:size-5 text-gray-400"
        />
        <span class="text-sm" :class="{ hidden: isMobile }">Documents</span>
      </div>
      <div
        class="flex items-center gap-2 px-2 py-1 rounded opacity-50 cursor-not-allowed"
      >
        <UIcon
          name="i-heroicons-arrow-down-tray"
          class="size-4 md:size-5 text-gray-400"
        />
        <span class="text-sm" :class="{ hidden: isMobile }">Downloads</span>
      </div>
    </div>
    <div class="flex-1 min-h-0 overflow-hidden">
      <transition name="fade" mode="out-in">
        <div
          v-if="currentView === 'home'"
          class="h-full min-h-0 overflow-y-auto"
        >
          <FinderHome @go-about="goAbout" @go-projects="goProjects" />
        </div>
        <div
          v-else-if="currentView === 'projects'"
          class="h-full min-h-0 overflow-y-auto"
        >
          <Projects />
        </div>
        <div v-else class="h-full min-h-0 overflow-y-auto">
          <AboutMe />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
