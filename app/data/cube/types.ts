import type { ICubeOptions, Masking } from 'sr-visualizer'

/**
 * キューブの図の指定。sr-visualizer の cubePNG に、そのまま渡す。
 * 値は、移植元(legacy/pages/)の mounted() で cubePNG に渡している値と同一にする(FR-003)。
 * データを素の値(文字列、数値)で書けるよう、列挙型の項目だけ値の型に置き換えている。
 */
export type CubeDiagram = Omit<ICubeOptions, 'mask' | 'viewportRotations'> & {
  mask?: `${Masking}`
  /** [軸(0: X、1: Y、2: Z), 角度] の並び */
  viewportRotations?: [number, number][]
}
