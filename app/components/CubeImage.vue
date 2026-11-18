<script setup lang="ts">
import type { CubeDiagram } from '~/data/cube/types'

/**
 * キューブの図を、sr-visualizer の cubePNG でブラウザーでのみ描画する。
 * サーバー側(prerender)では、移植元の描画先と同じ id を持つ空の div だけを出力する(contracts/pages.md)。
 */
const props = defineProps<{
  /** 描画先の id。移植元と同じ値(`pll1`、`oll1` など)にする */
  id: string
  diagram: CubeDiagram
}>()

const container = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!container.value) return
  try {
    const { cubePNG } = await import('sr-visualizer')
    cubePNG(container.value, props.diagram)
  } catch (error) {
    // 図の描画に失敗しても、手順の文字列や他のケースの表示は妨げない
    console.error(`図(${props.id})の描画に失敗しました`, error)
  }
})
</script>

<template>
  <div :id="id" ref="container"></div>
</template>
