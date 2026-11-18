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

/** 手順の一覧ページの1項目 */
export interface AlgorithmCase {
  /** ケースの見出し。見出しのないページでは省略する */
  name?: string
  /** そのケースの図 */
  diagram: CubeDiagram
  /** 手順の文字列。種類の接頭辞(`両手：` など)を含め、移植元の表記のまま持つ。順序に意味がある */
  algorithms: string[]
}

/** 1ページに複数あるケースのまとまり */
export interface AlgorithmSection {
  /** まとまりの見出し */
  title: string
  cases: AlgorithmCase[]
}

/** 画像ファイルとして表示する図 */
export interface SolutionImage {
  /** `/images/<カテゴリ>/<ファイル名>`。ファイル名は移植元と同一 */
  src: string
  /** 移植元の alt と同一(移植元にない場合は空) */
  alt: string
}
