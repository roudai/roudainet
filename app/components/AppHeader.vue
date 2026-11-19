<script setup lang="ts">
import { navigation, repositoryUrl } from '~/data/navigation'

const isExternal = (to: string) => to.startsWith('https://')

// モバイル(desktop 未満)でのメニューの開閉。desktop 以上では常に表示される
const open = ref(false)
const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

// ドロップダウンの項目。モバイルは白いメニューの中に縦に並び、desktop 以上はポップアップになる
const itemClass =
  'block px-6 py-2 text-bulma-text hover:bg-[#f5f5f5] hover:text-[#0a0a0a] desktop:px-4 desktop:py-[0.375rem] desktop:pr-12 desktop:whitespace-nowrap'

// タッチ端末(desktop 以上の幅のタブレットなど)では、hover が効かず、Safari はボタンにフォーカスしない。
// そのため、タップでドロップダウンを開閉する。マウスの操作は、従来どおり hover と focus-within に任せる
const openGroup = ref<string | null>(null)
const onGroupTap = (event: PointerEvent, label: string) => {
  if (event.pointerType !== 'touch') return
  openGroup.value = openGroup.value === label ? null : label
}
const closeGroupOutside = (event: PointerEvent) => {
  if (!(event.target as HTMLElement).closest('[data-nav-group]')) openGroup.value = null
}
onMounted(() => document.addEventListener('pointerdown', closeGroupOutside))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeGroupOutside))

// バーガーボタンの3本線。開いたときは「×」になる
const burgerLine = 'absolute left-[calc(50%-8px)] h-px w-4 bg-current transition duration-[86ms] ease-out'
</script>

<template>
  <nav
    class="bg-bulma-nav p-2 text-white desktop:flex desktop:items-stretch"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="ml-1 flex min-h-13 items-stretch desktop:shrink-0">
      <NuxtLink to="/" class="flex items-center px-3 py-2 text-white hover:bg-[#292929] hover:text-[#f5f5f5]">
        roudai.net
      </NuxtLink>

      <button
        type="button"
        class="relative ml-auto block size-13 text-white hover:bg-black/5 desktop:hidden"
        aria-label="menu"
        aria-controls="navbarMenu"
        :aria-expanded="open"
        @click="open = !open"
      >
        <span aria-hidden="true" :class="[burgerLine, 'top-[calc(50%-6px)]', open && 'translate-y-[5px] rotate-45']" />
        <span aria-hidden="true" :class="[burgerLine, 'top-[calc(50%-1px)]', open && 'opacity-0']" />
        <span
          aria-hidden="true"
          :class="[burgerLine, 'top-[calc(50%+4px)]', open && '-translate-y-[5px] -rotate-45']"
        />
      </button>
    </div>

    <div
      id="navbarMenu"
      :class="open ? 'block' : 'hidden'"
      class="bg-white py-2 shadow-[0_8px_16px_rgba(10,10,10,0.1)] desktop:-mr-3 desktop:flex desktop:shrink-0 desktop:grow desktop:items-stretch desktop:bg-transparent desktop:p-0 desktop:shadow-none"
    >
      <div class="mr-auto desktop:flex desktop:items-stretch">
        <div
          v-for="group in navigation"
          :key="group.label"
          data-nav-group
          class="group relative desktop:flex desktop:items-stretch"
        >
          <button
            type="button"
            class="relative block w-full py-2 pr-10 pl-3 text-left text-bulma-text hover:bg-[#fafafa] hover:text-bulma-link after:absolute after:top-1/2 after:right-[1.125em] after:-mt-[0.4375em] after:block after:size-[0.625em] after:-rotate-45 after:rounded-[2px] after:border-[3px] after:border-t-0 after:border-r-0 after:border-bulma-link after:content-[''] desktop:flex desktop:items-center desktop:text-white desktop:after:border-white desktop:hover:bg-[#292929] desktop:hover:text-[#f5f5f5] desktop:group-focus-within:bg-[#292929] desktop:group-focus-within:text-[#f5f5f5] desktop:group-hover:bg-[#292929] desktop:group-hover:text-[#f5f5f5]"
            @pointerup="onGroupTap($event, group.label)"
          >
            {{ group.label }}
          </button>
          <div
            :data-open="openGroup === group.label"
            class="py-2 text-[0.875rem] desktop:absolute desktop:top-full desktop:left-0 desktop:z-20 desktop:hidden desktop:min-w-full desktop:rounded-b-[6px] desktop:border-t-2 desktop:border-bulma-border desktop:bg-white desktop:pb-2 desktop:shadow-[0_8px_8px_rgba(10,10,10,0.1)] desktop:group-focus-within:block desktop:group-hover:block desktop:data-[open=true]:block"
          >
            <template v-for="item in group.items" :key="item.to">
              <a v-if="isExternal(item.to)" :href="item.to" :class="itemClass">{{ item.label }}</a>
              <NuxtLink v-else :to="item.to" :class="itemClass">{{ item.label }}</NuxtLink>
            </template>
          </div>
        </div>
      </div>

      <div class="ml-auto desktop:flex desktop:items-stretch">
        <div class="flex items-center px-3 py-2">
          <!-- 現行の白いアイコンは、モバイルの白いメニュー上では見えないため、モバイルでは文字色にする -->
          <a :href="repositoryUrl" aria-label="GitHub" class="text-bulma-text desktop:text-white">
            <IconGithub fill="currentColor" class="mr-2" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
