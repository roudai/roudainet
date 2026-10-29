<script setup lang="ts">
import { navigation, repositoryUrl } from '~/data/navigation'

const isExternal = (to: string) => to.startsWith('https://')
</script>

<template>
  <nav
    class="bg-bulma-nav p-2 text-white desktop:flex desktop:items-stretch"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="ml-1 flex min-h-13 items-stretch">
      <NuxtLink to="/" class="flex items-center px-3 py-2 text-white hover:bg-[#292929] hover:text-[#f5f5f5]">
        roudai.net
      </NuxtLink>
    </div>

    <div class="desktop:-mr-3 desktop:flex desktop:grow desktop:items-stretch desktop:shrink-0">
      <div class="mr-auto desktop:flex desktop:items-stretch">
        <div v-for="group in navigation" :key="group.label" class="group relative desktop:flex desktop:items-stretch">
          <button
            type="button"
            class="relative block w-full px-3 py-2 text-left text-white group-focus-within:bg-[#292929] group-focus-within:text-[#f5f5f5] group-hover:bg-[#292929] group-hover:text-[#f5f5f5] desktop:flex desktop:items-center desktop:pr-10 desktop:after:absolute desktop:after:top-1/2 desktop:after:right-[1.125em] desktop:after:-mt-[0.4375em] desktop:after:block desktop:after:size-[0.625em] desktop:after:-rotate-45 desktop:after:rounded-[2px] desktop:after:border-[3px] desktop:after:border-t-0 desktop:after:border-r-0 desktop:after:border-white desktop:after:content-['']"
          >
            {{ group.label }}
          </button>
          <div
            class="py-2 text-[0.875rem] desktop:absolute desktop:top-full desktop:left-0 desktop:z-20 desktop:hidden desktop:min-w-full desktop:rounded-b-[6px] desktop:border-t-2 desktop:border-bulma-border desktop:bg-white desktop:pb-2 desktop:shadow-[0_8px_8px_rgba(10,10,10,0.1)] desktop:group-focus-within:block desktop:group-hover:block"
          >
            <template v-for="item in group.items" :key="item.to">
              <a
                v-if="isExternal(item.to)"
                :href="item.to"
                class="block px-4 py-[0.375rem] text-white hover:bg-[#292929] desktop:pr-12 desktop:whitespace-nowrap desktop:text-bulma-text desktop:hover:bg-[#f5f5f5] desktop:hover:text-[#0a0a0a]"
              >
                {{ item.label }}
              </a>
              <NuxtLink
                v-else
                :to="item.to"
                class="block px-4 py-[0.375rem] text-white hover:bg-[#292929] desktop:pr-12 desktop:whitespace-nowrap desktop:text-bulma-text desktop:hover:bg-[#f5f5f5] desktop:hover:text-[#0a0a0a]"
              >
                {{ item.label }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>

      <div class="ml-auto desktop:flex desktop:items-stretch">
        <div class="flex items-center px-3 py-2">
          <a :href="repositoryUrl" aria-label="GitHub">
            <IconGithub fill="white" class="mr-2" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
