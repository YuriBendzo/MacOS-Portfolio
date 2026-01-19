<script setup lang="ts">
import AboutMe from '../AboutMe.vue';
import FinderHome from './Home.vue';

type View = 'home' | 'about';

const currentView = ref<View>('home');

const goHome = () => (currentView.value = 'home');
const goAbout = () => (currentView.value = 'about');
</script>

<template>
  <div class="h-full flex">
    <div class="w-48 bg-gray-800/50 border-r border-white/10 p-2 flex flex-col gap-1">
      <div class="text-xs text-gray-400 font-bold px-2 py-1">Favorites</div>
      <button type="button" class="flex items-center gap-2 px-2 py-1 rounded text-left"
        :class="[currentView === 'home' ? 'cursor-default' : 'cursor-pointer hover:bg-white/10']" @click="goHome">
        <UIcon name="i-heroicons-home" class="w-4 h-4 text-blue-400" />
        <span class="text-sm">Home</span>
      </button>
      <div class="flex items-center gap-2 px-2 py-1 rounded opacity-50">
        <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-blue-400" />
        <span class="text-sm">Documents</span>
      </div>
      <div class="flex items-center gap-2 px-2 py-1 rounded opacity-50">
        <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4 text-blue-400" />
        <span class="text-sm">Downloads</span>
      </div>
    </div>
    <div class="flex-1">
      <transition name="fade" mode="out-in">
        <FinderHome v-if="currentView === 'home'" @go-about="goAbout" />
        <AboutMe v-else />
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
