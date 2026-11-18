<script setup lang="ts">
import type { MegaminxDiagram } from '~/data/megaminx/types'

/**
 * Megaminx の図を、sr-puzzlegen の PNG でブラウザーでのみ描画する。
 * サーバー側(prerender)では、移植元の描画先と同じ id を持つ空の div だけを出力する(contracts/pages.md)。
 */
const props = defineProps<{
  /** 描画先の id。移植元と同じ値(`megacase1` など)にする */
  id: string
  /** 図の指定。移植元の id に対応する指定が見つからない場合は undefined になり、描画しない */
  diagram?: MegaminxDiagram
}>()

const container = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!container.value) return
  if (!props.diagram) {
    console.error(`図(${props.id})の指定が見つかりません`)
    return
  }
  try {
    const { PNG, Type } = await import('sr-puzzlegen')
    PNG(container.value, Type.MEGAMINX_TOP, props.diagram)
  } catch (error) {
    // 図の描画に失敗しても、手順の文字列や他のケースの表示は妨げない
    console.error(`図(${props.id})の描画に失敗しました`, error)
  }
})
</script>

<template>
  <div :id="id" ref="container"></div>
</template>
