/**
 * Megaminx PLL のページの「基礎知識」のタブの中身(006)。運営者が書き足していく。
 *
 * - 節は、書いた順に表示する。節は好きなだけ足してよい
 * - paragraphs:1 つの文字列が 1 段落。空の配列なら「準備中」と表示する。HTML は書けない
 * - examples:例の図。`pll`(PLL のケース名。'A1+' など)か `case`(そのケースを揃える手順)のどちらか一方を書く。
 *   `label` を書くと、図の下に添える
 */
export interface PllExample {
  /** PLL のケース名('A1+' など)。そのケースの図を出す */
  pll?: string
  /** そのケースを揃える手順。手順で図を指定するとき(MegaminxDiagram の case と同じ意味) */
  case?: string
  /** 図の下に添える説明 */
  label?: string
}

export interface PllBasicsSection {
  /** 節の見出し */
  title: string
  /** 段落(1 つの文字列が 1 段落)。空なら「準備中」 */
  paragraphs: string[]
  /** 例の図。無くてもよい */
  examples?: PllExample[]
}

export const pllBasics: PllBasicsSection[] = [
  {
    title: '偽ペア',
    paragraphs: [],
    examples: [],
  },
  {
    title: '偽バー',
    paragraphs: [],
    examples: [],
  },
]
