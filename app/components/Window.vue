<script setup lang="ts">
import { useDraggable } from "@vueuse/core";
import { useWindowSystem } from "~/composables/useWindowSystem";

const props = defineProps<{
  id: string;
  title: string;
}>();

const {
  windows,
  focusWindow,
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  updateWindowPosition,
} = useWindowSystem();

const windowState = computed(() =>
  windows.value.find((w) => w.id === props.id),
);
const windowRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);

// Initial position from state
const initialValue = computed(() =>
  windowState.value
    ? { x: windowState.value.position.x, y: windowState.value.position.y }
    : { x: 0, y: 0 },
);

const { x, y, style } = useDraggable(windowRef, {
  initialValue: initialValue.value,
  handle: handleRef,
  preventDefault: true,
  onStart: (_pos, event) => {
    focusWindow(props.id);
  },
  onEnd: () => {
    if (windowState.value && !windowState.value.isMaximized) {
      updateWindowPosition(props.id, x.value, y.value);
    }
  },
});

// Sync position if changed externally (e.g. by window system for cascading)
watch(
  () => windowState.value?.position,
  (newPos) => {
    if (newPos && !windowState.value?.isMaximized) {
      x.value = newPos.x;
      y.value = newPos.y;
    }
  },
);
</script>

<template>
  <div
    v-if="windowState && !windowState.isMinimized"
    ref="windowRef"
    class="fixed rounded-lg shadow-2xl overflow-hidden flex flex-col border border-white/20 bg-[#1e1e1e]/90 backdrop-blur-xl transition-all duration-200"
    :style="[
      style,
      {
        width: windowState.isMaximized ? '100%' : `${windowState.size.width}px`,
        height: windowState.isMaximized
          ? 'calc(100% - 2.5rem)'
          : `${windowState.size.height}px`,
        zIndex: windowState.zIndex,
        // Override draggable position if maximized
        left: windowState.isMaximized ? '0px' : `${x}px`,
        top: windowState.isMaximized ? '2.5rem' : `${y}px`,
        transform: 'none', // useDraggable uses transform by default, but we might want top/left for better control with maximize
      },
    ]"
    @mousedown="focusWindow(props.id)"
  >
    <!-- Title Bar -->
    <div
      ref="handleRef"
      class="h-8 bg-gray-700/50 flex items-center px-3 gap-2 select-none cursor-default"
      @dblclick="maximizeWindow(props.id)"
    >
      <div class="flex gap-2 group">
        <button
          @click.stop="closeWindow(props.id)"
          class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-x-mark"
            class="w-2 h-2 text-black opacity-0 group-hover:opacity-100"
          />
        </button>
        <button
          @click.stop="minimizeWindow(props.id)"
          class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-minus"
            class="w-2 h-2 text-black opacity-0 group-hover:opacity-100"
          />
        </button>
        <button
          @click.stop="maximizeWindow(props.id)"
          class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-arrows-pointing-out"
            class="w-2 h-2 text-black opacity-0 group-hover:opacity-100"
          />
        </button>
      </div>
      <div class="flex-1 text-center text-xs font-medium text-gray-300">
        {{ title }}
      </div>
      <div class="w-14"></div>
      <!-- Spacer for centering -->
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-auto bg-[#1e1e1e] text-white p-4">
      <slot />
    </div>
  </div>
</template>
