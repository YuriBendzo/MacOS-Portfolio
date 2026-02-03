<template>
  <div class="bg-[#1e1e1e] text-white h-full p-4 md:p-8 overflow-y-auto">
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center gap-6 mb-8 flex-col md:flex-row">
        <div
          class="size-24 shrink-0 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg"
        >
          YB
        </div>

        <div class="min-w-0">
          <h1 class="text-3xl text-center font-bold mb-2 md:text-start">
            Yuri Bendzo
          </h1>
          <p
            class="text-gray-400 text-lg text-balance text-center md:text-start"
          >
            Frontend Developer
            <span class="block md:inline"
              ><span class="hidden md:inline">•</span> Vue / Nuxt /
              TypeScript</span
            >
          </p>
          <div class="mt-3 flex gap-2">
            <NuxtLink
              to="https://www.linkedin.com/in/yurii-bendzo-8570a4248/"
              target="_blank"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-sm"
            >
              <UIcon name="i-heroicons-link" class="size-4" />
              LinkedIn
            </NuxtLink>

            <NuxtLink
              to="https://github.com/YuriBendzo"
              target="_blank"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-sm"
            >
              <UIcon name="i-heroicons-code-bracket" class="size-4" />
              GitHub
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">
            Bio
          </h2>
          <p class="text-gray-300 leading-relaxed text-pretty">
            Hello! I'm a Frontend Developer with 3+ years of commercial
            experience building fast, maintainable web applications with Vue.js,
            Nuxt.js, TypeScript, and Tailwind CSS. I deliver reusable UI
            components, robust API integrations, and performance-focused
            interfaces. I enjoy product-oriented teams, code reviews,
            documentation (Storybook/Confluence), and shipping features
            end-to-end.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">
            Highlights
          </h2>

          <ul class="space-y-2 text-gray-300">
            <li class="flex gap-3">
              <span class="mt-2 size-1.5 rounded-full bg-blue-400 shrink-0" />
              <span>
                Improved performance metrics and user experience: reduced TTI by
                ~25-30%, achieved CLS &lt; 0.05, improved LCP from ~3.6s to
                ~2.1s on key pages.
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2 size-1.5 rounded-full bg-purple-400 shrink-0" />
              <span>
                Migrated a large codebase from JavaScript to TypeScript,
                reducing runtime issues by ~25% and improving maintainability.
              </span>
            </li>
            <li class="flex gap-3">
              <span
                class="mt-2 size-1.5 rounded-full bg-emerald-400 shrink-0"
              />
              <span>
                Built and maintained reusable UI components (incl. Storybook),
                set up consistent code style with ESLint/Prettier, and supported
                quality via tests (Vitest/Jest).
              </span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2 size-1.5 rounded-full bg-yellow-400 shrink-0" />
              <span>
                Improved SEO and accessibility (WCAG practices), collaborated
                closely with product/design teams, and participated in code
                reviews.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">
            Experience
          </h2>

          <div class="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <div class="font-semibold">Frontend Developer — Thinkmobiles</div>
              <div class="text-sm text-gray-400">Oct 2022 — Present</div>
            </div>

            <div class="mt-1 text-sm text-gray-400">
              Vue / Nuxt / TypeScript • Product development • UI libraries •
              Performance • SEO
            </div>

            <ul class="mt-4 space-y-2 text-gray-300">
              <li class="flex gap-3">
                <span class="mt-2 size-1.5 rounded-full bg-white/50 shrink-0" />
                <span>
                  Developed and optimized complex web interfaces, focusing on
                  scalability, performance, and clean architecture.
                </span>
              </li>
              <li class="flex gap-3">
                <span class="mt-2 size-1.5 rounded-full bg-white/50 shrink-0" />
                <span>
                  Built reusable component libraries and maintained
                  documentation.
                </span>
              </li>
              <li class="flex gap-3">
                <span class="mt-2 size-1.5 rounded-full bg-white/50 shrink-0" />
                <span>
                  Integrated REST APIs, improved UX through iterative delivery,
                  and contributed to team quality via code reviews.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">
            Skills
          </h2>
          <div
            class="flex flex-wrap justify-evenly gap-2 text-black font-semibold"
          >
            <span
              class="px-3 py-1 text-black bg-[#f7e022] rounded-full text-sm"
            >
              JavaScript
            </span>
            <span class="px-3 py-1 bg-[#e44f2d] rounded-full text-sm">
              HTML
            </span>
            <span class="px-3 py-1 bg-[#1572b6] rounded-full text-sm">CSS</span>
            <span class="px-3 py-1 bg-[#007acc] rounded-full text-sm">
              TypeScript
            </span>
            <span class="px-3 py-1 bg-[#41b883] rounded-full text-sm">Vue</span>
            <span class="px-3 py-1 bg-[#81df84] rounded-full text-sm"
              >Nuxt</span
            >
            <span class="px-3 py-1 bg-[#64c2cd] rounded-full text-sm">
              Tailwind CSS
            </span>
            <span class="px-3 py-1 bg-[#89e550] rounded-full text-sm"
              >GSAP</span
            >
            <span class="px-3 py-1 bg-[#83bf16] rounded-full text-sm">
              Node.js
            </span>
          </div>
        </section>

        <section>
          <h2 class="text-xl font-semibold mb-3 border-b border-white/10 pb-2">
            Contact
          </h2>

          <ul class="space-y-2 text-gray-300">
            <li class="flex items-center gap-3">
              <UIcon name="i-heroicons-envelope" class="size-5 text-gray-400" />
              <NuxtLink
                to="mailto:yurabendzo20@gmail.com"
                class="hover:text-blue-400 transition-colors"
              >
                yurabendzo20@gmail.com
              </NuxtLink>
            </li>

            <li class="flex items-center gap-3">
              <UIcon name="i-heroicons-link" class="size-5 text-gray-400" />
              <NuxtLink
                to="https://www.linkedin.com/in/yurii-bendzo-8570a4248/"
                target="_blank"
                class="hover:text-blue-400 transition-colors"
              >
                linkedin.com/in/yurii-bendzo
              </NuxtLink>
            </li>

            <li class="flex items-center gap-3">
              <UIcon
                name="i-heroicons-globe-alt"
                class="size-5 text-gray-400"
              />
              <NuxtLink
                to="https://github.com/YuriBendzo"
                target="_blank"
                class="hover:text-blue-400 transition-colors"
              >
                github.com/YuriiBendzo
              </NuxtLink>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
