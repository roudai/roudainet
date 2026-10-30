<script setup lang="ts">
import { repositoryUrl } from '~/data/navigation'

// ビルド時の年で描画し、マウント後に現在の年へ更新する(再デプロイ前に年が変わっても表示が合う)
const year = ref(new Date().getFullYear())
onMounted(() => {
  year.value = new Date().getFullYear()
})
</script>

<template>
  <footer class="bg-bulma-footer px-6 pt-12 pb-24">
    <div class="content text-center">
      &copy; 2012-{{ year }} roudai.net
      <a :href="repositoryUrl" aria-label="GitHub">
        <IconGithub fill="black" class="mr-2 -mb-[0.1em] inline" />
      </a>
    </div>
  </footer>
</template>
