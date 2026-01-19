<script setup lang="ts">
import { useWindowSystem } from '~/composables/useWindowSystem'

import Finder from './apps/Finder.vue'
import Terminal from './apps/Terminal.vue'

const { windows, openWindow } = useWindowSystem()

const dockItems = [
  { 
    id: 'finder', 
    label: 'Finder', 
    icon: 'i-heroicons-folder', 
    action: () => openWindow('finder', 'Finder', 'Finder', 'i-heroicons-folder') 
  },
  { 
    id: 'terminal', 
    label: 'Terminal', 
    icon: 'i-heroicons-command-line', 
    action: () => openWindow('terminal', 'Terminal', 'Terminal', 'i-heroicons-command-line') 
  },
  { 
    id: 'safari', 
    label: 'Safari', 
    icon: 'i-heroicons-globe-alt', 
    href: 'https://www.google.com/',
  },
]

const resolveComponent = (name: string) => {
  switch (name) {
    case 'Finder': return Finder
    case 'Terminal': return Terminal
    default: return null
  }
}
</script>

<template>
  <div class="w-full h-full relative overflow-hidden font-sans text-white select-none">
    <Navbar />
    
    <div class="relative w-full h-[calc(100%-2.5rem)]">
       <Window
         v-for="win in windows"
         :key:="win.id"
         :id="win.id"
         :title="win.title"
       >
         <component :is="resolveComponent(win.component)" />
       </Window>

       <Welcome />
    </div>

    <Dock :items="dockItems" />
  </div>
</template>
