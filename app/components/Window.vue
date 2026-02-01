<script setup lang="ts">
import { useDraggable, useWindowSize } from "@vueuse/core";
import { useWindowSystem } from "~/composables/useWindowSystem";
import gsap from "gsap";

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

const getDockItemRect =
  inject<(id: string) => DOMRect | null>("getDockItemRect");

const windowState = computed(() =>
  windows.value.find((w) => w.id === props.id),
);

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 1024);

// Enforce maximized state on mobile
watch(
  () => isMobile.value,
  (mobile) => {
    if (mobile && windowState.value && !windowState.value.isMaximized) {
      maximizeWindow(props.id);
    }
  },
  { immediate: true },
);

// Prevent un-maximizing on mobile
watch(
  () => windowState.value?.isMaximized,
  (maximized) => {
    if (isMobile.value && !maximized) {
      maximizeWindow(props.id);
    }
  },
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
  onStart: () => focusWindow(props.id),
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

// Animation Hooks
const onEnter = (el: Element, done: () => void) => {
  const dockRect = getDockItemRect?.(props.id);

  if (dockRect) {
    gsap.fromTo(
      el,
      {
        x:
          dockRect.left +
          dockRect.width / 2 -
          (windowState.value?.size.width ?? 0) / 2,
        y: dockRect.top,
        scale: 0,
        opacity: 0,
      },
      {
        x: 0, // Reset to normal position (handled by layout/style binding)
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: done,
        clearProps: "all", // Important to let Vue take over control after animation
      },
    );
  } else {
    // Fallback if no dock rect found
    gsap.fromTo(
      el,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.2, onComplete: done },
    );
  }
};

const onLeave = (el: Element, done: () => void) => {
  const dockRect = getDockItemRect?.(props.id);

  if (dockRect) {
    // Calculate relative offsets to target the dock icon
    // animate using transforms on top of current state.

    // Get current rect
    const currentRect = el.getBoundingClientRect();
    const targetX =
      dockRect.left +
      dockRect.width / 2 -
      (currentRect.left + currentRect.width / 2);
    const targetY =
      dockRect.top +
      dockRect.height / 2 -
      (currentRect.top + currentRect.height / 2);

    gsap.to(el, {
      x: `+=${targetX}`,
      y: `+=${targetY}`,
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
      onComplete: done,
    });
  } else {
    gsap.to(el, {
      scale: 0.9,
      opacity: 0,
      duration: 0.2,
      onComplete: done,
    });
  }
};
</script>

<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div
      v-if="windowState && !windowState.isMinimized"
      ref="windowRef"
      class="fixed rounded-lg shadow-2xl overflow-hidden flex flex-col border border-white/20 bg-[#1e1e1e]/90 backdrop-blur-xl"
      :style="[
        style,
        {
          width: windowState.isMaximized
            ? '100%'
            : `${windowState.size.width}px`,
          height: windowState.isMaximized
            ? 'calc(100% - 2.5rem)'
            : `${windowState.size.height}px`,
          zIndex: windowState.zIndex,
          left: windowState.isMaximized ? '0px' : `${x}px`,
          top: windowState.isMaximized ? '2.5rem' : `${y}px`,
        },
      ]"
      @mousedown="focusWindow(props.id)"
    >
      <!-- Title Bar -->
      <div
        ref="handleRef"
        class="h-8 bg-gray-700/50 flex items-center px-3 gap-2 select-none cursor-default"
        @dblclick="!isMobile && maximizeWindow(props.id)"
      >
        <div class="flex gap-2 group">
          <button
            @click.stop="closeWindow(props.id)"
            class="size-3 cursor-pointer rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-x-mark"
              :class="{ 'opacity-100': isMobile }"
              class="size-2 text-black opacity-0 group-hover:opacity-100"
            />
          </button>
          <button
            v-if="!isMobile"
            @click.stop="minimizeWindow(props.id)"
            class="size-3 cursor-pointer rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-minus"
              class="size-2 text-black opacity-0 group-hover:opacity-100"
            />
          </button>
          <button
            v-if="!isMobile"
            @click.stop="maximizeWindow(props.id)"
            class="size-3 cursor-pointer rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center"
          >
            <UIcon
              name="i-heroicons-arrows-pointing-out"
              class="size-2 text-black opacity-0 group-hover:opacity-100"
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
  </Transition>
</template>
