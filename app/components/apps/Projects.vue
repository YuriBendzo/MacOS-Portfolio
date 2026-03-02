<script setup lang="ts">
const projects = [
  {
    id: 1,
    title: "3D-phone",
    description:
      "Copy of the Iphone 15 Pro landing page. Built with Nuxt 3, Vue 3, Tailwind CSS, and GSAP.",
    tags: [
      {
        name: "Nuxt",
        color: "bg-[#81df84]",
      },
      {
        name: "Vue",
        color: "bg-[#41b883]",
      },
      {
        name: "Tailwind",
        color: "bg-[#64c2cd]",
      },
      {
        name: "GSAP",
        color: "bg-[#89e550]",
      },
    ],
    link: "https://3d-phone.pages.dev/",
    icon: "i-heroicons-globe-alt",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "ARCO",
    description:
      "Premium Architecture & Interior Design Studio website. Built with a focus on minimalism, typography, and smooth animations.",
    tags: [
      {
        name: "Vite",
        color: "bg-[#7f55ca]",
      },
      {
        name: "Vue",
        color: "bg-[#41b883]",
      },
      {
        name: "SCSS",
        color: "bg-[#c04d7e]",
      },
      {
        name: "GSAP",
        color: "bg-[#89e550]",
      },
    ],
    link: "https://yuribendzo.github.io/arco/",
    icon: "i-heroicons-globe-alt",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "LogisticsCo",
    description:
      "Global Logistics and Freight Forwarding solutions. Reliable, fast, and transparent.",
    tags: [
      {
        name: "Vite",
        color: "bg-[#7f55ca]",
      },
      {
        name: "JS",
        color: "bg-[#f7df1e]",
      },
      {
        name: "SCSS",
        color: "bg-[#c04d7e]",
      },
      {
        name: "HTML",
        color: "bg-[#e34c26]",
      },
    ],
    link: "https://yuribendzo.github.io/logistics-co/",
    icon: "i-heroicons-globe-alt",
    color: "bg-blue-500",
  },
];
</script>

<template>
  <div class="h-full bg-[#1e1e1e] text-white p-4 md:p-8 overflow-y-auto">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <div
          class="size-12 rounded-xl shrink-0 bg-linear-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-lg"
        >
          <UIcon name="i-heroicons-folder-open" class="size-6 text-white" />
        </div>
        <div>
          <h1 class="text-2xl font-bold">Projects</h1>
          <p class="text-gray-400 text-sm text-balance">
            A collection of my side projects.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6">
        <UCard
          v-for="project in projects"
          :key="project.id"
          class="group relative bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/20 flex flex-col"
        >
          <NuxtLink
            :to="project.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="flex items-start justify-between mb-4">
              <div
                :class="project.color"
                class="size-10 rounded-lg flex items-center justify-center shadow-inner"
              >
                <UIcon :name="project.icon" class="size-6 text-white" />
              </div>
              <UIcon
                name="i-heroicons-arrow-top-right-on-square"
                class="size-5 text-gray-500 group-hover:text-white transition-colors"
              />
            </div>

            <h3
              class="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors"
            >
              {{ project.title }}
            </h3>
            <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {{ project.description }}
            </p>

            <div class="mt-auto flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags"
                :key="tag.name"
                :class="tag.color"
                class="px-2.5 py-1 rounded-md text-xs font-semibold text-black border border-white/5"
              >
                {{ tag.name }}
              </span>
            </div>
          </NuxtLink>
        </UCard>
      </div>
    </div>
  </div>
</template>
