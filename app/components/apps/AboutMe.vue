<template>
  <div class="bg-[#1e1e1e] text-white p-8 overflow-y-auto">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center gap-6 mb-8">
        <div
          class="w-24 h-24 shrink-0 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg">
          YB
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-2">Yuri Bendzo</h1>
          <p class="text-gray-400 text-lg">Frontend Developer & UI/UX Enthusiast</p>
        </div>
      </div>

      <div class="space-y-6">
        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">Bio</h2>
          <p class="text-gray-300 leading-relaxed text-pretty">
            Hello! I'm a Frontend Developer with 3+ years of commercial experience building fast, maintainable web
            applications with Vue.js, Nuxt.js, TypeScript, and Tailwind CSS. Successfully delivered large-scale
            products, by developing reusable UI libraries and robust RESTful API integrations. I enjoy working in
            product-oriented teams, reviewing code, maintaining documentation (Storybook, Confluence), and collaborating
            in an agile environment. I'm comfortable taking features from idea to production and iterating based on data
            and user feedback.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-white/10 rounded-full text-sm">Vue.js</span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-sm">Nuxt</span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-sm">TypeScript</span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-sm">Tailwind CSS</span>
            <span class="px-3 py-1 bg-white/10 rounded-full text-sm">Node.js</span>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">Contact</h2>
          <ul class="space-y-2 text-gray-300">
            <li class="flex items-center gap-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-gray-400" />
              <a href="mailto:hello@example.com" class="hover:text-blue-400 transition-colors">hello@example.com</a>
            </li>
            <li class="flex items-center gap-3">
              <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 text-gray-400" />
              <a href="https://github.com/YuriBendzo" target="_blank"
                class="hover:text-blue-400 transition-colors">github.com/YuriBendzo</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
