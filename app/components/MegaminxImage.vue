<script setup lang="ts">
import { ollScheme, svg } from 'megaminx-image'
import type { MegaminxDiagram } from '~/data/megaminx/types'

/**
 * Megaminx の図を、megaminx-image の `svg()` で SVG にし、静的生成した HTML に含める(005)。
 * `svg()` は同じ入力からどの環境でも同じ文字列を返すため、サーバー側とブラウザーで食い違わない。
 * 手順が読めないときの例外は捕まえず、静的生成を失敗させる(誤った図のまま公開しない)。
 */
const props = defineProps<{
  /** 描画先の id(`megacase1` など) */
  id: string
  /** 図の指定。対応する指定が見つからない場合は undefined になり、描画しない */
  diagram?: MegaminxDiagram
}>()

/** 側面のステッカー(11〜25)のうち、show に無いものを濃い灰色にする上書き(006) */
function grayExcept(show: number[]): Record<number, 'd'> {
  const stickers: Record<number, 'd'> = {}
  for (let i = 11; i <= 25; i++) if (!show.includes(i)) stickers[i] = 'd'
  return stickers
}

const markup = computed(() => {
  if (!props.diagram) {
    console.error(`図(${props.id})の指定が見つかりません`)
    return ''
  }
  // OLL 型の図は ollScheme() の既定(上面は薄い灰色、ほかは濃い灰色)。それ以外はライブラリの既定の配色
  const { case: alg, oll, rotate, show } = props.diagram
  return svg({
    case: alg,
    size: 100,
    ...(oll && { scheme: ollScheme() }),
    ...(rotate !== undefined && { rotate }),
    ...(show && { stickers: grayExcept(show) }),
  })
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -- 中身は megaminx-image が作る SVG で、入力はサイトのデータの手順だけ(訪問者の入力を含まない) -->
  <div :id="id" v-html="markup"></div>
</template>

<style scoped>
/*
 * 図の SVG を、003 までの図(PNG の img)と同じく扱う(main.css の `.content img` と同じ値)。
 * Tailwind の Preflight は SVG を block にするため、inline に戻して has-text-centered で中央に寄せ、
 * モバイルの狭い欄では、欄の幅まで縮める(縮めないと、手順の文字列に重なる)。
 */
div :deep(svg) {
  display: inline;
  vertical-align: baseline;
  max-width: 100%;
  height: auto;
}
</style>
