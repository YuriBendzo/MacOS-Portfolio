<script setup lang="ts">
import { gsap } from "gsap";
import { useEventListener } from "@vueuse/core";

const titleRef = ref<HTMLElement | null>(null);
const subtitleRef = ref<HTMLElement | null>(null);

const FONT_WEIGHT = {
  title: { min: 400, max: 900, default: 400 },
  subtitle: { min: 300, max: 600, default: 300 },
} as const;

const subtitle = "Hey, I'm Yurii! Welcome to my";
const title = "portfolio";

const renderText = (text: string) => {
  return [...text];
};

// ----------------- GSAP hover setup -----------------
type TextType = keyof typeof FONT_WEIGHT;

function setupTextHover(container: HTMLElement | null, type: TextType) {
  if (!container) return () => {};

  const letters = container.querySelectorAll<HTMLSpanElement>("span");
  const { min, max, default: base } = FONT_WEIGHT[type];

  const animateLetter = (
    letter: HTMLSpanElement,
    weight: number,
    duration = 0.25
  ) =>
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });

  const handlePointerMove = (e: PointerEvent) => {
    const { left } = container.getBoundingClientRect();
    const pointerX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const centerX = l - left + w / 2;
      const distance = Math.abs(pointerX - centerX);

      const intensity = Math.exp(-(distance ** 2) / 2000);
      const weight = min + (max - min) * intensity;

      animateLetter(letter, weight);
    });
  };

  const resetLetters = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  };

  const stopMove = useEventListener(
    container,
    "pointermove",
    handlePointerMove
  );
  const stopLeave = useEventListener(container, "pointerleave", resetLetters);
  const stopUp = useEventListener(container, "pointerup", resetLetters);
  const stopCancel = useEventListener(container, "pointercancel", resetLetters);

  return () => {
    stopMove();
    stopLeave();
    stopUp();
    stopCancel();
  };
}

onMounted(() => {
  const titleCleanup = setupTextHover(titleRef.value, "title");
  const subtitleCleanup = setupTextHover(subtitleRef.value, "subtitle");

  onBeforeUnmount(() => {
    titleCleanup();
    subtitleCleanup();
  });
});
</script>

<template>
  <section
    id="welcome"
    class="flex flex-col size-full text-white items-center justify-center"
  >
    <p ref="subtitleRef">
      <span
        v-for="(char, i) in renderText(subtitle)"
        :key="i"
        :style="{ fontVariationSettings: `'wght' 300` }"
        class="font-georama text-2xl md:text-3xl"
        >{{ char === " " ? "\u00A0" : char }}</span
      >
    </p>
    <h1 ref="titleRef" class="mt-7">
      <span
        v-for="(char, i) in renderText(title)"
        :key="i"
        :style="{ fontVariationSettings: `'wght' 400` }"
        class="font-georama text-6xl md:text-9xl italic"
        >{{ char === " " ? "\u00A0" : char }}</span
      >
    </h1>
  </section>
</template>

<style scoped>
#welcome p,
#welcome h1 {
  user-select: none;
  -webkit-user-select: none;
  touch-action: none;
}
</style>
