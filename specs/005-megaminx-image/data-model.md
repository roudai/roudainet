# Data Model: Megaminx の図を自作ライブラリで描く

**Feature**: `005-megaminx-image` | **Date**: 2026-11-24

静的なデータ定義だけで、保存や状態の遷移は無い。

## MegaminxDiagram(図の指定)

`app/data/megaminx/types.ts` の型を、次の形に置き換える。`sr-puzzlegen` の型には頼らない。

| 項目 | 型 | 必須 | 意味 |
|---|---|---|---|
| `case` | `string` | ✓ | そのケースを揃える手順。ライブラリの `case` にそのまま渡す |
| `oll` | `true` | | OLL 型の図(上面の色だけを示す)のとき `true`。無いときは、既定の配色の図 |

- 配色、大きさ、線の色は、データに持たない。描く部品(`MegaminxImage.vue`)で決める(contracts/diagrams.md)。
- 取り除く項目:`width`、`height`、`puzzle`(の入れ子)、`scheme`(色の `name` を含む)、`mask`、`arrows`。

### 検証の規則

- `case` は、ライブラリが読める記法でなければならない。読めないと、静的生成のときに `SyntaxError` で失敗する(Edge Cases)。
- `oll` は、今のデータで `mask` があった図(CO の 16 個、EO の 3 個)だけに付ける。

## 各ページのデータ(`app/data/megaminx/{cp,co,ep,eo}.ts`)

`diagrams` だけを書き換える。`megacase` と `megacase_view`(手順の文字列)は変えない(FR-009)。

| ファイル | 図の数 | `oll` | 今の指定 |
|---|---|---|---|
| `cp.ts` | 15 | 無し | 配色と矢印 |
| `ep.ts` | 12 | 無し | 配色と矢印 |
| `co.ts` | 16 | `true` | マスク(U 以外の全面) |
| `eo.ts` | 3 | `true` | マスク(U 以外の全面) |

- キーは今と同じ描画先の id(`megacase1` など)。各ページのテンプレート(`diagrams['megacase1']` の参照)は変えない。
- `case` の値は、今の `puzzle.case` の文字列をそのまま写す(1 文字も変えない)。
- 書き換えは、今のデータを読んで新しい形で書き出す、一度だけのスクリプトで機械的に行う(手で写さない)。スクリプトはコミットしない。
- ファイルの先頭の説明(「移植元の値をそのまま写した(FR-003)」)は、「図の指定は 005 でライブラリの形に書き換えた」ことが分かる文に改める。

### 例

```ts
// 書き換え後(cp.ts)
megacase1: { case: "R' U2' R U' R' F' R U R' U' R' F R U2' R" },

// 書き換え後(co.ts)
megacase1: { case: "F R U2 R' U' R U' R' F'", oll: true },
```
