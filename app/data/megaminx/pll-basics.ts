/**
 * Megaminx PLL のページの「基礎知識」のタブの中身(006)。運営者が書き足していく。
 *
 * - pllBasicsIntro:タブの最初に載せる一言。1 つの文字列が 1 段落。空なら「準備中」
 * - pllBasics:枠の行の並び。1 行に枠を 1 つか 2 つ書く(2 つなら左右に並べて比べる。左に本物、右に偽物)。
 *   枠は広い画面で 2 列に並び、狭い画面では縦に積む。行も枠も、書いた順に表示する
 * - 枠の paragraphs:1 つの文字列が 1 段落。空なら「準備中」。HTML は書けない
 * - 枠の examples:例の図。`pll`(PLL のケース名。'A1+' など)か `case`(そのケースを揃える手順)のどちらか一方を書く。
 *   `label` を書くと、図の下に添える。`rotate` で図の向きを変え(上面を時計回りに回す回数)、`show` に色を残すステッカーの番号を
 *   書くと、それ以外の側面を濃い灰色にする(番号は megaminx-image の README の Sticker order。回した後の位置。
 *   側面の上の列は 11〜25 で、下の面(F)は左から 17・18・19)
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

/** 枠の 1 つ */
export interface PllBasicsBox {
  /** 枠の見出し */
  title: string
  /** 段落(1 つの文字列が 1 段落)。空なら「準備中」 */
  paragraphs: string[]
  /** 例の図。無くてもよい */
  examples?: PllExample[]
}

/** タブの最初に載せる一言(1 つの文字列が 1 段落)。空なら「準備中」 */
export const pllBasicsIntro: string[] = []

/** 枠の行。1 行に 1 つか 2 つ */
export const pllBasics: ([PllBasicsBox] | [PllBasicsBox, PllBasicsBox])[] = [
  [
    { title: 'ペア', paragraphs: [], examples: [{ pll: 'F1+', rotate: 4, show: [18, 19, 20] }] },
    { title: '偽ペア', paragraphs: [], examples: [{ pll: 'A1+', rotate: 0, show: [18, 19, 20] }] },
  ],
  [
    { title: 'バー', paragraphs: [], examples: [{ pll: 'F1+', rotate: 3, show: [16, 17, 18, 19, 20] }] },
    { title: '偽バー', paragraphs: [], examples: [{ pll: 'E1', rotate: 1, show: [16, 17, 18, 19, 20] }] },
  ],
  [
    { title: 'ブロック', paragraphs: [], examples: [{ pll: 'A1+', rotate: 2, show: [18, 19, 20, 21] }] },
    { title: '偽ブロック', paragraphs: [], examples: [{ pll: 'Z1', rotate: 0, show: [18, 19, 20, 21] }] },
  ],
  [{ title: 'ヘッドライト', paragraphs: [], examples: [{ pll: 'F1+', rotate: 0, show: [16, 17, 18, 19, 20] }] }],
]
