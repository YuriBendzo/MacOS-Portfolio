<template>
  <div class="h-full flex">
    <div class="w-48 bg-gray-800/50 border-r border-white/10 p-2 flex flex-col gap-1">
      <div class="text-xs text-gray-400 font-bold px-2 py-1">Favorites</div>
      <div class="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer">
        <UIcon name="i-heroicons-home" class="w-4 h-4 text-blue-400" />
        <span class="text-sm">Home</span>
      </div>
      <div class="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer">
        <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-blue-400" />
        <span class="text-sm">Documents</span>
      </div>
      <div class="flex items-center gap-2 px-2 py-1 rounded hover:bg-white/10 cursor-pointer">
        <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4 text-blue-400" />
        <span class="text-sm">Downloads</span>
      </div>
    </div>
    <div class="flex-1 p-4">
      <h1 class="text-2xl font-bold mb-4">Welcome to My Portfolio</h1>
      <p class="text-gray-300">Navigate through the folders to see my work.</p>
      
      <div class="grid grid-cols-4 gap-4 mt-8">
         <div class="flex flex-col items-center gap-2 group cursor-pointer">
            <UIcon name="i-heroicons-folder" class="w-16 h-16 text-blue-400 group-hover:opacity-80" />
            <span class="text-sm">Projects</span>
         </div>
         <div class="flex flex-col items-center gap-2 group cursor-pointer">
            <UIcon name="i-heroicons-user" class="w-16 h-16 text-blue-400 group-hover:opacity-80" />
            <span class="text-sm">About Me</span>
         </div>
      </div>
    </div>
  </div>
</template>
