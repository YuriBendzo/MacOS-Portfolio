<script setup lang="ts">
const documents = [
  {
    id: 1,
    name: "Resume.pdf",
    type: "pdf",
    icon: "i-heroicons-document-text",
    color: "text-blue-400",
    link: "https://drive.google.com/file/d/1Tp4I11YU-08T-nfeU9LO77-VgryjKfjC/view?usp=sharing",
  },
];
</script>

<template>
  <div class="h-full bg-[#1e1e1e] text-white p-4 md:p-8 overflow-y-auto">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <div
          class="size-12 rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg"
        >
          <UIcon
            name="i-heroicons-document-duplicate"
            class="size-6 text-white"
          />
        </div>
        <div>
          <h1 class="text-2xl font-bold">Documents</h1>
          <p class="text-gray-400 text-sm text-balance">
            All my documents and resources.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="doc in documents"
          :key="doc.id"
          :to="doc.link"
          target="_blank"
          class="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
        >
          <UIcon
            :name="doc.icon"
            :class="doc.color"
            class="size-14 filter drop-shadow-md group-hover:scale-105 transition-transform"
          />
          <span
            class="text-sm font-medium text-gray-300 group-hover:text-white text-center wrap-break-word w-full"
          >
            {{ doc.name }}
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
