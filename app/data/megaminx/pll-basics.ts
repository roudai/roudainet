/**
 * Megaminx PLL のページの「基礎知識」のタブの中身(006)。運営者が書き足していく。
 *
 * - 節は、書いた順に表示する。節は好きなだけ足してよい
 * - paragraphs:1 つの文字列が 1 段落。HTML は書けない
 * - examples:例の図。`pll`(PLL のケース名。'A1+' など)か `case`(そのケースを揃える手順)のどちらか一方を書く。
 *   `label` を書くと、図の下に添える。`rotate` で図の向きを変え(上面を時計回りに回す回数)、`show` に色を残すステッカーの番号を
 *   書くと、それ以外の側面を濃い灰色にする(番号は megaminx-image の README の Sticker order。回した後の位置。
 *   側面の上の列は 11〜25 で、下の面(F)は左から 17・18・19)
 * - compare:左右に並べて比べる 2 つの欄(左に本物、右に偽物)。各欄に見出し・段落・例の図を書く。
 *   狭い画面では、左右の欄を縦に積む
 *   - compare がある節:節の paragraphs と examples は、左右の欄の上に出す導入(空なら何も出さない)。欄の段落が空なら、その欄に「準備中」
 *   - compare が無い節:節の段落が空なら「準備中」
 */
export interface PllExample {
  /** PLL のケース名('A1+' など)。そのケースの図を出す */
  pll?: string
  /** そのケースを揃える手順。手順で図を指定するとき(MegaminxDiagram の case と同じ意味) */
  case?: string
  /** 図の下に添える説明 */
  label?: string
  /** 上面を時計回りに回した回数 */
  rotate?: number
  /** 色を残すステッカーの番号。ほかの側面は濃い灰色 */
  show?: number[]
}

/** 比べる欄の 1 つ */
export interface PllBasicsColumn {
  /** 欄の見出し */
  title: string
  /** 段落(1 つの文字列が 1 段落)。空なら「準備中」 */
  paragraphs: string[]
  /** 例の図。無くてもよい */
  examples?: PllExample[]
}

export interface PllBasicsSection {
  /** 節の見出し */
  title: string
  /** 段落(1 つの文字列が 1 段落)。compare があるときは導入 */
  paragraphs: string[]
  /** 例の図。無くてもよい */
  examples?: PllExample[]
  /** 左右に並べて比べる欄(左に本物、右に偽物)。無くてもよい */
  compare?: [PllBasicsColumn, PllBasicsColumn]
}

export const pllBasics: PllBasicsSection[] = [
  {
    title: 'ペアと偽ペア',
    paragraphs: [],
    compare: [
      { title: 'ペア', paragraphs: [], examples: [{ pll: 'F1+', rotate: 4, show: [18, 19, 20] }] },
      { title: '偽ペア', paragraphs: [], examples: [{ pll: 'A1+', rotate: 0, show: [18, 19, 20] }] },
    ],
  },
  {
    title: 'バーと偽バー',
    paragraphs: [],
    compare: [
      { title: 'バー', paragraphs: [], examples: [{ pll: 'F1+', rotate: 3, show: [16, 17, 18, 19, 20] }] },
      { title: '偽バー', paragraphs: [], examples: [{ pll: 'E1', rotate: 1, show: [16, 17, 18, 19, 20] }] },
    ],
  },
  {
    title: 'ブロックと偽ブロック',
    paragraphs: [],
    compare: [
      { title: 'ブロック', paragraphs: [], examples: [{ pll: 'A1+', rotate: 2, show: [18, 19, 20, 21] }] },
      { title: '偽ブロック', paragraphs: [], examples: [{ pll: 'Z1', rotate: 0, show: [18, 19, 20, 21] }] },
    ],
  },
  {
    title: 'ヘッドライト',
    paragraphs: [],
    examples: [{ pll: 'F1+', rotate: 0, show: [16, 17, 18, 19, 20] }],
  },
]
