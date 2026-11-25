# Data Model: Megaminx PLL の判断基準のページ

**Feature**: `006-megaminx-pll` | **Date**: 2026-11-25

静的なデータ定義だけで、保存や状態の遷移は無い(タブの選択はブラウザーの中だけ)。

## PLL のケース(写さない)

`megaminx-image/cases` の `PLL_CASES`(151 件)。使う項目:`name`(`'A1+'` など)、`group`(`'A'` など)、`alg`(そのケースを揃える手順)。

## 覚える順の段階:`app/data/megaminx/pll-stages.ts`(新規)

```ts
export interface PllStage {
  /** 段階の名前。タブと見出しに出す(`'F2–5'` など) */
  label: string
  /** 段階のケースの名前を、覚える順に */
  cases: string[]
}
export const pllStages: PllStage[] // 27 件、覚える順
export const pllGroupNotes: Record<string, string> // グループ → 説明。25 件
```

- 値の出どころ:`label` はエディターの `CaseSections.list(data, true)` の名前、`cases` は `data/pll/learn_order.json`、`pllGroupNotes` は `js/case-groups.js` の `CASE_GROUP_NOTES.pll`。ファイルの先頭に、出典(さむぶろぐの前編・後編の URL)と写した元を書く。
- 規則:27 段階のケースを合わせると、`PLL_CASES` の 151 件とちょうど 1 回ずつ一致する。1 つの段階のケースは、すべて同じグループに属する。

## 判断基準:`app/data/megaminx/pll-recognition.ts`(新規。運営者が書く)

```ts
/** ケース名 → 判断基準の段落(1 つの文字列が 1 段落)。空の配列は「準備中」 */
export const pllRecognition: Record<string, string[]> = {
  // F1 (3x1 and 2x1(s))
  'F1+': [],
  'F1-': [],
  // A (3 corner CP)
  'A1+': [],
  …
}
```

- 151 件のキーを、覚える順に、空の配列で用意する。段階ごとに、`// <段階の名前> (<グループの説明>)` のコメントで区切る。
- 規則:キーは `PLL_CASES` の名前だけ。キーが無いケースは、空の配列と同じ扱い(「準備中」)。段落は文字列として表示する(HTML は書けない)。

### 段階の一言:`pllStageNotes`(同じファイル。実装の後に運営者の指示で追加)

```ts
/** 段階の名前 → 見出しの下に添える一言。空の文字列は「準備中」 */
export const pllStageNotes: Record<string, string> = {
  F1: '',
  A: '',
  …
  'F2–5': '',
  …
}
```

- 27 段階のキーを、覚える順に、空の文字列で用意する。キーは段階の名前(pll-stages.ts の `label`。タブの表記と同じ)。
- 規則:キーは段階の名前だけ(違えば静的生成を失敗させる)。キーが無い段階は、空と同じ扱い(「準備中」)。

## 基礎知識:`app/data/megaminx/pll-basics.ts`(新規。運営者が書く)

```ts
export interface PllExample {
  /** PLL のケース名(`'A1+'`)。そのケースの図を出す */
  pll?: string
  /** そのケースを揃える手順。手順で図を指定するとき(MegaminxDiagram の case と同じ意味) */
  case?: string
  /** 図の下に添える説明 */
  label?: string
}
/** 比べる欄の 1 つ */
export interface PllBasicsColumn {
  title: string
  /** 空なら「準備中」 */
  paragraphs: string[]
  examples?: PllExample[]
}
export interface PllBasicsSection {
  /** 節の見出し */
  title: string
  /** 段落(1 つの文字列が 1 段落)。compare が無いとき、空なら「準備中」。compare があるときは欄の上の導入(空なら何も出さない) */
  paragraphs: string[]
  /** 例の図。無くてもよい */
  examples?: PllExample[]
  /** 左右に並べて比べる欄(左に本物、右に偽物)。無くてもよい(FR-016) */
  compare?: [PllBasicsColumn, PllBasicsColumn]
}
export const pllBasics: PllBasicsSection[] = [
  { title: 'ペアと偽ペア', paragraphs: [], compare: [{ title: 'ペア', … }, { title: '偽ペア', … }] },
  { title: 'バーと偽バー', paragraphs: [], compare: [{ title: 'バー', … }, { title: '偽バー', … }] },
  { title: 'ブロックと偽ブロック', paragraphs: [], compare: [{ title: 'ブロック', … }, { title: '偽ブロック', … }] },
  { title: 'ヘッドライト', paragraphs: [], examples: [] },
]
```

- 例の図の `rotate`(上面を時計回りに回す回数)と `show`(色を残すステッカーの番号。megaminx-image の Sticker order。回した後の位置)は任意。`show` があると、それ以外の側面(11〜25)を濃い灰色にする(FR-017)。`MegaminxDiagram`(types.ts)にも同じ 2 つを足し、`MegaminxImage` が `svg()` の `rotate` と `show` にそのまま渡す(`show` は megaminx-image 1.1.0 の機能。当初はサイトの側で「`show` に無い側面を 'd' にする `stickers`」を作って渡していたが、同じ機能をライブラリに足した 1.1.0 に上げて置き換えた。置き換えの前後で、Megaminx の 5 ページの図の SVG 204 個が 1 バイトも変わらないことを確かめた)。どちらも無い図(005 の 4 ページ)の SVG は変わらない。
- ステッカーの番号:側面 k(0〜4。下の面 F は 2)の上の列は、左のコーナー 11+3k、エッジ 12+3k、右のコーナー 13+3k。面 k の右と面 k+1 の左が同じコーナー(151 ケースで確かめた)。最初の例は、下の面と両隣のコーナー(16〜20)、ブロックは右隣の面のエッジ(21)まで見せる。
- 規則:例の図(節と欄のどちらでも)は、`pll` と `case` のちょうど一方を持つ。`show` の番号は 0〜25 の整数。`pll` は `PLL_CASES` の名前。節は書いた順に表示する。

## 検証(research.md の 3)

ページを組み立てるときに確かめ、誤りがあれば例外で静的生成を失敗させる:段階が 151 件をちょうど 1 回ずつ含む、判断基準のキーと例の図の `pll` が `PLL_CASES` の名前である、例の図が `pll` と `case` のちょうど一方を持つ、段階のグループに説明がある。
