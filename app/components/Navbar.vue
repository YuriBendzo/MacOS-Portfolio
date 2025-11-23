<script setup lang="ts">
import { useNow, useDateFormat, useMediaQuery } from "@vueuse/core";

const navLinks = [
  { id: 1, name: "Portfolio" },
  { id: 2, name: "Contacts" },
  { id: 3, name: "Projects" },
];

const navIcons = [
  { id: 1, name: "i-custom-wi-fi" },
  { id: 2, name: "i-custom-search" },
  { id: 3, name: "i-custom-slider-toggles" },
];

const isBigScreen = useMediaQuery("(min-width: 764px)");
const now = useNow({ interval: 1000 });

const formatted = useDateFormat(now, "ddd MMM D  h:mm A", {
  locales: "en-US",
});

const timeOnly = useDateFormat(now, "h:mm A", {
  locales: "en-US",
});
</script>

<template>
  <nav
    class="flex text-xs md:text-sm lg:text-base justify-between items-center bg-white/50 backdrop-blur-3xl py-2 px-3 md:px-5 select-none"
  >
    <div class="flex items-center gap-5">
      <u-icon name="i-custom-apple-logo" class="size-4" />
      <p class="font-bold">Yurii's Portfolio</p>

      <ul class="hidden md:flex items-center gap-5">
        <li v-for="link in navLinks" :key="link.id">
          <p
            class="text-sm cursor-pointer font-semibold hover:underline transition-all"
          >
            {{ link.name }}
          </p>
        </li>
      </ul>
    </div>

    <ul class="flex items-center gap-5">
      <li v-for="icon in navIcons" :key="icon.id">
        <u-icon :name="icon.name" class="size-4" />
      </li>
      <li>
        <p class="text-xs md:text-sm font-semibold">
          {{ isBigScreen ? formatted : timeOnly }}
        </p>
      </li>
    </ul>
  </nav>
</template>

<style scoped></style>
