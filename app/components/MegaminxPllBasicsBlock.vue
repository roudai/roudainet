<script setup lang="ts">
import type { MegaminxDiagram } from '~/data/megaminx/types'

/**
 * Megaminx PLL のページの基礎知識の、段落と例の図のまとまり(006)。
 * 節の本文と、左右に比べる欄の両方で使う。
 */
defineProps<{
  /** 例の図の描画先の id の頭(`pll-basics-0` など)。続けて `-<番号>` を付ける */
  idPrefix: string
  /** 段落(1 つの文字列が 1 段落) */
  paragraphs: string[]
  /** 例の図(手順に置き換え済み) */
  examples: { diagram: MegaminxDiagram; label?: string }[]
  /** 段落が空のとき「準備中」と出すか */
  pending: boolean
}>()
</script>

<template>
  <template v-if="paragraphs.length">
    <p v-for="(paragraph, k) in paragraphs" :key="k">{{ paragraph }}</p>
  </template>
  <p v-else-if="pending" class="text-[#7a7a7a]">準備中</p>
  <div v-if="examples.length" class="flex flex-wrap gap-4">
    <figure v-for="(example, j) in examples" :key="j" class="text-center">
      <MegaminxImage :id="`${idPrefix}-${j}`" :diagram="example.diagram" />
      <figcaption v-if="example.label">{{ example.label }}</figcaption>
    </figure>
  </div>
</template>
