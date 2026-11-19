<script setup lang="ts">
import type { ICubeOptions } from 'sr-visualizer'
import type { CubeDiagram } from '~/data/cube/types'

/**
 * キューブの図を、sr-visualizer の cubePNG でブラウザーでのみ描画する。
 * サーバー側(prerender)では、移植元の描画先と同じ id を持つ空の div だけを出力する(contracts/pages.md)。
 */
const props = defineProps<{
  /** 描画先の id。移植元と同じ値(`pll1`、`oll1` など)にする */
  id: string
  /** 図の指定。移植元の id に対応する指定が見つからない場合は undefined になり、描画しない */
  diagram?: CubeDiagram
}>()

const container = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!container.value) return
  if (!props.diagram) {
    console.error(`図(${props.id})の指定が見つかりません`)
    return
  }
  try {
    const { cubePNG } = await import('sr-visualizer')
    // CubeDiagram は、列挙型の項目を値の型で書いただけで、実行時の値は ICubeOptions と同じ
    cubePNG(container.value, props.diagram as ICubeOptions)
  } catch (error) {
    // 図の描画に失敗しても、手順の文字列や他のケースの表示は妨げない
    console.error(`図(${props.id})の描画に失敗しました`, error)
  }
})
</script>

<template>
  <div :id="id" ref="container"></div>
</template>
