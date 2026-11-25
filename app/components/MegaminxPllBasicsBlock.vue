<script setup lang="ts">
import type { MegaminxDiagram } from '~/data/megaminx/types'

/**
 * Megaminx PLL のページの基礎知識の、段落と例の図のまとまり(006)。
 * 基礎知識の最初の一言と、各枠で使う。図があるときは、図を左、説明を右に並べる。
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
  <!-- 図があるときは、図を左に縦に並べ、説明を右に置く(図の高さの真ん中にそろえる)。図が無いときは説明だけ -->
  <div :class="examples.length ? 'flex items-center gap-4' : ''">
    <div v-if="examples.length" class="flex shrink-0 flex-col gap-2">
      <figure v-for="(example, j) in examples" :key="j" class="m-0 text-center">
        <MegaminxImage :id="`${idPrefix}-${j}`" :diagram="example.diagram" />
        <figcaption v-if="example.label">{{ example.label }}</figcaption>
      </figure>
    </div>
    <div class="min-w-0 flex-1">
      <template v-if="paragraphs.length">
        <p v-for="(paragraph, k) in paragraphs" :key="k">{{ paragraph }}</p>
      </template>
      <p v-else-if="pending" class="text-[#7a7a7a]">準備中</p>
    </div>
  </div>
</template>
