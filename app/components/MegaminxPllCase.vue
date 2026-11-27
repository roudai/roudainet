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
  /** 判断の図(ケースの図と同じ向き。start を付けた図は回し始める向き。show のステッカーだけ色を残す) */
  marks: PllMark[]
}>()

/** 先頭の括弧の AUF(`(U)`、`(U2')` など)を外した手順。start を付けた判断の図は、この手順で描く(回し始める向きになる) */
function withoutLeadingAuf(alg: string) {
  return alg.replace(/^\(U[0-9]*'?\)\s*/, '')
}
</script>

<template>
  <!-- ケースごとに枠で囲む(基礎知識の枠と同じ見た目)。図を左に、手順と判断基準を右に置き、狭い画面では図の下に回す -->
  <div class="mb-4 rounded border border-bulma-border p-4">
    <h4>{{ name }}</h4>
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <!-- 図が 1〜2 枚のケースも、図が 3 枚のケースと同じに並ぶよう、図の列の幅の下限を、3 枚並べたときのいちばん広い幅
           (注釈の長さで 316〜328px)に合わせる。こうすると、手順と判断基準が右に並ぶか下に回るかが、どの画面の幅でも
           全ケースで同じになり、右に並ぶときは始まる位置もそろう。狭いスマホで横にはみ出さないよう、枠の幅を超えない -->
      <div class="flex min-w-[min(330px,100%)] shrink-0 items-start gap-2">
        <MegaminxImage :id="`pll-${name}`" :diagram="{ case: alg }" />
        <!-- 注釈は、書いた改行(\n)の位置でだけ改行する(文字の途中で折り返さない)。枠は図の幅(100px)を下限に、注釈のいちばん長い行に合わせる -->
        <figure v-for="(mark, i) in marks" :key="i" class="m-0 min-w-[100px] text-center">
          <MegaminxImage
            :id="`pll-${name}-mark-${i}`"
            :diagram="{ case: mark.start ? withoutLeadingAuf(alg) : alg, show: mark.show, arrows: mark.arrows }"
          />
          <figcaption v-if="mark.label" class="text-sm whitespace-pre-line">{{ mark.label }}</figcaption>
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
