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
export interface PllBasicsSection {
  /** 節の見出し */
  title: string
  /** 段落(1 つの文字列が 1 段落)。空なら「準備中」 */
  paragraphs: string[]
  /** 例の図。無くてもよい */
  examples?: PllExample[]
}
export const pllBasics: PllBasicsSection[] = [
  { title: '偽ペア', paragraphs: [], examples: [] },
  { title: '偽バー', paragraphs: [], examples: [] },
]
```

- 規則:例の図は、`pll` と `case` のちょうど一方を持つ。`pll` は `PLL_CASES` の名前。節は書いた順に表示する。

## 検証(research.md の 3)

ページを組み立てるときに確かめ、誤りがあれば例外で静的生成を失敗させる:段階が 151 件をちょうど 1 回ずつ含む、判断基準のキーと例の図の `pll` が `PLL_CASES` の名前である、例の図が `pll` と `case` のちょうど一方を持つ、段階のグループに説明がある。
