<script setup lang="ts">
import type { MegaminxDiagram } from '~/data/megaminx/types'

/**
 * Megaminx のケースの、図と手順の 1 行を横に並べる。
 * テンプレートとクラス名は、移植元(legacy/components/MegaminxView.vue)と同一にする。
 */
defineProps<{
  /** 描画先の id(`megacase1` など) */
  image: string
  /** 手順の文字列。移植元と同じく 1 つ目を表示する(データの索引の型が undefined を含むため省略可にしている) */
  algorithm?: string[]
  /** 図の指定 */
  diagram?: MegaminxDiagram
}>()
</script>

<template>
  <div class="columns is-mobile is-vcentered is-marginless">
    <div class="column is-2-tablet is-3-mobile has-text-centered">
      <MegaminxImage :id="image" :diagram="diagram" />
    </div>
    <div class="column is-10-tablet is-9-mobile p-0">
      {{ algorithm?.[0] }}
    </div>
  </div>
</template>
