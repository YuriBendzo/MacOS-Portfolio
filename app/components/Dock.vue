<script setup lang="ts">
const props = defineProps<{
  items: { id: string; label: string; icon: string; action?: () => void; href?: string; isOpen?: boolean }[]
} >()

const hoveredIndex = ref<number | null>(null)
</script>

<template>
  <div class="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
    <div class="bg-gray-400/20 backdrop-blur-xl border border-white/20 rounded-2xl px-2 py-2 flex items-end gap-2 shadow-2xl">
      <template v-for="(item, index) in items" :key="item.id">
      <a
          v-if="item.href"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
          class="relative group transition-all duration-200 ease-out hover:-translate-y-2"
          :class="{ 'scale-110 mx-2': hoveredIndex === index }"
        >
          <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
            <UIcon :name="item.icon" class="w-8 h-8 text-white" />
          </div>

          <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
            {{ item.label }}
          </div>
        </a>
      <button
      v-else
        @click="item.action"
        @mouseenter="hoveredIndex = index"
        @mouseleave="hoveredIndex = null"
        class="relative cursor-pointer group transition-all duration-200 ease-out hover:-translate-y-2"
        :class="{ 'scale-110 mx-2': hoveredIndex === index }"
      >
        <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-white/10 overflow-hidden">
           <UIcon :name="item.icon" class="w-8 h-8 text-white" />
        </div>
        
        <!-- Tooltip -->
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800/80 backdrop-blur text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
          {{ item.label }}
        </div>
        
        <transition name="fade">
          <div v-if="item.isOpen" class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full opacity-50"></div>
        </transition>
      </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
