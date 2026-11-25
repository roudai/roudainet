<script setup lang="ts">
/**
 * Megaminx PLL のページの 1 ケース(006)。
 * ケース名、画像と手順(MegaminxView。003・005 の Megaminx のページと同じ 2 列)、判断基準の段落を並べる。
 */
defineProps<{
  /** ケース名('A1+' など)。描画先の id にも使う */
  name: string
  /** そのケースを揃える手順 */
  alg: string
  /** 判断基準の段落 */
  recognition: string[]
}>()
</script>

<template>
  <div>
    <h4>{{ name }}</h4>
    <MegaminxView :image="`pll-${name}`" :algorithm="[alg]" :diagram="{ case: alg }" />
    <template v-if="recognition.length">
      <p v-for="(paragraph, i) in recognition" :key="i">{{ paragraph }}</p>
    </template>
    <p v-else class="text-[#7a7a7a]">準備中</p>
  </div>
</template>
