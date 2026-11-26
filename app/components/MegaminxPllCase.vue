<script setup lang="ts">
import type { PllMark } from '~/data/megaminx/pll-recognition'

/**
 * Megaminx PLL のページの 1 ケース(006)。
 * ケース名、図(ケースの図と、その横に判断の図)と手順、判断基準の段落を並べる。
 * ケースごとに枠で囲み、図は横に並べる。手順と判断基準は、広い画面では図の右、狭い画面では図の下に置く。
 */
defineProps<{
  /** ケース名('A1+' など)。描画先の id にも使う */
  name: string
  /** そのケースを揃える手順 */
  alg: string
  /** 判断基準の段落 */
  recognition: string[]
  /** 判断の図(ケースの図と同じ向きで、show のステッカーだけ色を残す) */
  marks: PllMark[]
}>()
</script>

<template>
  <!-- ケースごとに枠で囲む(基礎知識の枠と同じ見た目)。図を左に、手順と判断基準を右に置き、狭い画面では図の下に回す -->
  <div class="mb-4 rounded border border-bulma-border p-4">
    <h4>{{ name }}</h4>
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <div class="flex shrink-0 items-start gap-2">
        <MegaminxImage :id="`pll-${name}`" :diagram="{ case: alg }" />
        <figure v-for="(mark, i) in marks" :key="i" class="m-0 text-center">
          <MegaminxImage :id="`pll-${name}-mark-${i}`" :diagram="{ case: alg, show: mark.show, arrows: mark.arrows }" />
          <figcaption v-if="mark.label" class="text-sm">{{ mark.label }}</figcaption>
        </figure>
      </div>
      <div class="min-w-0 flex-1 basis-60">
        <!-- 手順は等幅の字にして、判断基準の文章と見分けられるようにする -->
        <p class="font-mono">{{ alg }}</p>
        <template v-if="recognition.length">
          <p v-for="(paragraph, i) in recognition" :key="i">{{ paragraph }}</p>
        </template>
        <p v-else class="text-[#7a7a7a]">準備中</p>
      </div>
    </div>
  </div>
</template>
