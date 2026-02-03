<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

import AboutMe from "../AboutMe.vue";
import Projects from "../Projects.vue";
import Documents from "../Documents.vue";
import FinderHome from "./Home.vue";

type View = "home" | "about" | "projects" | "documents";

type NavItem = {
  id: View;
  label: string;
  icon: string;
  view?: View;
};

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 1024);

const currentView = ref<View>("home");

const setView = (view: View) => {
  currentView.value = view;
};

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "i-heroicons-home", view: "home" },
  {
    id: "about",
    label: "About Me",
    icon: "i-heroicons-user",
    view: "about",
  },
  {
    id: "documents",
    label: "Documents",
    icon: "i-heroicons-document-text",
    view: "documents",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "i-heroicons-folder-open",
    view: "projects",
  },
];

const onNavClick = (item: NavItem) => {
  if (!item.view) return;
  setView(item.view);
};

const isActive = (item: NavItem) =>
  !!item.view && currentView.value === item.view;

const itemClass = (item: NavItem) => [
  "flex items-center gap-2 px-2 py-1 rounded text-left transition-colors",
  isActive(item)
    ? "bg-white/10 text-white shadow-sm cursor-default"
    : "text-gray-300 hover:bg-white/5 hover:text-white cursor-pointer",
];

const resolveView = (view: View) => {
  switch (view) {
    case "home":
      return FinderHome;
    case "projects":
      return Projects;
    case "documents":
      return Documents;
    case "about":
      return AboutMe;
    default:
      return null;
  }
};
</script>

<template>
  <div class="h-full flex">
    <div
      :class="[isMobile ? 'w-16 items-center' : 'w-36']"
      class="h-full self-stretch bg-gray-800/50 border-r rounded-l-md border-white/10 p-2 flex flex-col gap-1"
    >
      <div class="text-xs text-gray-400 font-bold md:text-sm px-2 py-1">
        {{ isMobile ? "Favs" : "Favorites" }}
      </div>
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        :class="itemClass(item)"
        @click="onNavClick(item)"
      >
        <UIcon :name="item.icon" class="size-4 md:size-5 text-blue-400" />
        <span class="text-sm font-medium" :class="{ hidden: isMobile }">
          {{ item.label }}
        </span>
      </button>
    </div>
    <div class="flex-1 min-h-0 overflow-hidden">
      <transition name="fade" mode="out-in">
        <component
          :is="resolveView(currentView)"
          @go-about="setView('about')"
          @go-projects="setView('projects')"
          @go-documents="setView('documents')"
        />
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
