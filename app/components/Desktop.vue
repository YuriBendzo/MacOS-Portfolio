<script setup lang="ts">
import Finder from './apps/finder/index.vue';
import Terminal from './apps/Terminal.vue';
import AboutMe from './apps/AboutMe.vue';

import { useWindowSystem } from '~/composables/useWindowSystem';

const { windows, openWindow } = useWindowSystem();

const dockItems = computed(() => [
  {
    id: 'finder',
    label: 'Finder',
    icon: 'i-heroicons-folder',
    action: () => openWindow('finder', 'Finder', 'Finder', 'i-heroicons-folder'),
    isOpen: windows.value.some(w => w.id === 'finder')
  },
  {
    id: 'terminal',
    label: 'Terminal',
    icon: 'i-heroicons-command-line',
    action: () => openWindow('terminal', 'Terminal', 'Terminal', 'i-heroicons-command-line'),
    isOpen: windows.value.some(w => w.id === 'terminal')
  },
  {
    id: 'safari',
    label: 'Safari',
    icon: 'i-heroicons-globe-alt',
    href: 'https://www.google.com/',
    isOpen: false
  },
]);

const resolveComponent = (name: string) => {
  switch (name) {
    case 'Finder': return Finder
    case 'Terminal': return Terminal
    case 'AboutMe': return AboutMe
    default: return null
  }
};
</script>

<template>
  <div class="w-full h-full relative overflow-hidden font-sans text-white select-none">
    <Navbar />

    <div class="relative w-full h-[calc(100%-2.5rem)]">
      <Window v-for="win in windows" :key:="win.id" :id="win.id" :title="win.title">
        <component :is="resolveComponent(win.component)" />
      </Window>

      <Welcome />
    </div>

    <Dock :items="dockItems" />
  </div>
</template>
