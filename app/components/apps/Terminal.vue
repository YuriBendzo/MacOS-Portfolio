<template>
  <div class="h-full font-mono text-sm p-2">
    <div class="mb-2">Last login: {{ new Date().toDateString() }} on ttys000</div>
    <div class="flex gap-2">
      <span class="text-green-400">user@portfolio</span>
      <span class="text-white">:</span>
      <span class="text-blue-400">~</span>
      <span class="text-white">$</span>
      <span class="animate-pulse">_</span>
    </div>
  </div>
</template>
