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

const { x, y } = useDraggable(windowRef, {
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

function rectCenter(r: DOMRect) {
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function getDockTargetRect(): DOMRect | null {
  return getDockItemRect?.(props.id) ?? null;
}

const onBeforeEnter = (el: Element) => {
  const e = el as HTMLElement;
  gsap.killTweensOf(e);
  e.style.willChange = "transform, opacity";
};

const onEnter = (el: Element, done: () => void) => {
  const e = el as HTMLElement;
  gsap.killTweensOf(e);

  // Wait a frame so the element has its final layout rect
  requestAnimationFrame(() => {
    const dockRect = getDockTargetRect();
    const winRect = e.getBoundingClientRect();

    if (dockRect) {
      const from = rectCenter(dockRect);
      const to = rectCenter(winRect);

      const dx = from.x - to.x;
      const dy = from.y - to.y;

      gsap.fromTo(
        e,
        { x: dx, y: dy, scale: 0.12, opacity: 0 },
        {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          clearProps: "transform,opacity",
          onComplete: done,
        },
      );
    } else {
      gsap.fromTo(
        e,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
          clearProps: "transform,opacity",
          onComplete: done,
        },
      );
    }
  });
};

const onLeave = (el: Element, done: () => void) => {
  const e = el as HTMLElement;
  gsap.killTweensOf(e);

  const dockRect = getDockTargetRect();
  const winRect = e.getBoundingClientRect();

  if (dockRect) {
    const from = rectCenter(winRect);
    const to = rectCenter(dockRect);

    const dx = to.x - from.x;
    const dy = to.y - from.y;

    gsap.to(e, {
      x: dx,
      y: dy,
      scale: 0.12,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
      clearProps: "transform,opacity",
      onComplete: done,
    });
  } else {
    gsap.to(e, {
      scale: 0.95,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      clearProps: "transform,opacity",
      onComplete: done,
    });
  }
};

const onAfterLeave = (el: Element) => {
  const e = el as HTMLElement;
  e.style.willChange = "";
};

async function animateLayoutChange(toggle: () => void) {
  const el = windowRef.value;
  if (!el) {
    toggle();
    return;
  }

  gsap.killTweensOf(el);

  const first = el.getBoundingClientRect();

  toggle();
  await nextTick();

  const last = el.getBoundingClientRect();

  // INVERT (compute transform that makes it LOOK like it's still at "first")
  const dx = first.left - last.left;
  const dy = first.top - last.top;
  const sx = first.width / last.width;
  const sy = first.height / last.height;

  el.style.willChange = "transform";
  el.style.transformOrigin = "top left";

  gsap.set(el, { x: dx, y: dy, scaleX: sx, scaleY: sy });

  gsap.to(el, {
    x: 0,
    y: 0,
    scaleX: 1,
    scaleY: 1,
    duration: 0.25,
    ease: "power2.out",
    clearProps: "transform",
    onComplete: () => {
      el.style.willChange = "";
    },
  });
}
</script>

<template>
  <Transition
    :css="false"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <div
      v-if="windowState && !windowState.isMinimized"
      ref="windowRef"
      class="fixed rounded-lg shadow-2xl overflow-hidden flex flex-col border border-white/20 bg-[#1e1e1e]/90 backdrop-blur-xl"
      :style="{
        width: windowState.isMaximized ? '100%' : `${windowState.size.width}px`,
        height: windowState.isMaximized
          ? 'calc(100% - 2.5rem)'
          : `${windowState.size.height}px`,
        zIndex: windowState.zIndex,
        left: windowState.isMaximized ? '0px' : `${x}px`,
        top: windowState.isMaximized ? '2.5rem' : `${y}px`,
      }"
      @mousedown="focusWindow(props.id)"
    >
      <!-- Title Bar -->
      <div
        ref="handleRef"
        class="h-8 bg-gray-700/50 flex items-center px-3 gap-2 select-none cursor-default"
        @dblclick="
          !isMobile && animateLayoutChange(() => maximizeWindow(props.id))
        "
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
            @click.stop="
              !isMobile && animateLayoutChange(() => maximizeWindow(props.id))
            "
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
      <div
        :class="[isMobile ? 'py-2' : 'p-2']"
        class="flex-1 overflow-auto bg-[#1e1e1e] text-white"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>
