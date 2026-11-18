# Data Model: キューブ系の解法ページの移植

**Feature**: `002-cube-solution-pages` | **Date**: 2026-11-18(2026-11-19 に実装に合わせて更新)

この機能のデータは、すべてビルド時に固定の、静的な定義である。保存や更新はない。
型は `app/data/cube/types.ts` に、各ページのデータは `app/data/cube/<ページ名>.ts` に置く(research.md の 4)。

## 実装時の設計変更(2026-11-19)

当初は、ケースを `AlgorithmCase`、`AlgorithmSection`、`SolutionImage` に組み直す設計だった。実装では、パリティを確実にするため、次のように変えた。

- 各ページのデータは、移植元の `data()` の値を、**構造も名前もそのまま**写す(例: `pll`、`pllName`、`COLLn21`)。テンプレートも移植元と同じ参照のしかたで描画する。
- 図の指定は、移植元の `mounted()` を実行して、`cubePNG` に渡された値を、**描画先の id ごと**に記録したもの(`diagrams`)にする。
- 写しは、移植元の `data()` と `mounted()` を、`sr-visualizer` と `document` のスタブの上で実行する変換スクリプトで行った。手で写した値はない(355 個の図の指定、13 ページ)。
- そのため、`AlgorithmCase`、`AlgorithmSection`、`SolutionImage` の型は使わず、削除した。画像は、テンプレートの `<img>` にファイルのパスを直接書く(移植元と同じ)。

## CubeDiagram(キューブの図の指定)

`sr-visualizer` の `ICubeOptions` と同じ値を持つ。データを素の値で書けるよう、列挙型の項目(`mask`、`viewportRotations`)だけ、値の型に置き換えている。

| 項目 | 説明 |
|---|---|
| `case` または `algorithm` | 図の状態を作る手順 |
| `mask` | 塗りつぶしのマスク(使っている値は `pll`、`oll`、`coll`、`f2l`、`ll`、`wv`) |
| `view` | 視点。`plan`(上から)か、省略(斜め) |
| `viewportRotations` | 視点の回転。`[軸, 角度]` の並び |
| `width`、`height` | 図の大きさ(px) |
| `arrows` | 矢印の指定 |
| `colorScheme` | 面ごとの配色 |

**検証ルール**: 値は、移植元の `mounted()` で `cubePNG` に渡している値と同一である(FR-003)。変換スクリプトで機械的に写したので、手による差異はない。

## ページのデータ(`app/data/cube/<ページ名>.ts`)

| export | 型 | 説明 |
|---|---|---|
| 移植元の `data()` の項目のうち、テンプレートが参照するもの | `Record<string, string[]>`、`Record<string, string>`、数値 | 手順の文字列、ケースの名前、画像の幅と高さ。名前と構造は移植元と同一 |
| `diagrams` | `Record<string, CubeDiagram>` | 図の指定。キーは、移植元の描画先の id(`pll1`、`COLLn21H1`、`UPermarrow1` など) |

**検証ルール**:

- ケースの数と順序、手順の文字列は、移植元と同一である(SC-002)。`scripts/verify-parity.mjs` で、本番の現行サイトと比べて確認する。
- `diagrams` のキーの集合は、テンプレートの描画先の id の集合と一致する(移植時に確認済み)。

## TypoCorrection(誤字の修正の記録)

spec.md の「現行の表記から直した箇所」の表の1行。コードには持たず、文書だけで管理する。`scripts/verify-parity.mjs` は、この表の「現行の表記」と「修正後の表記」の組を、差分の例外として扱う。理由に「候補」と書いた行は、直していないため例外にしない。

| フィールド | 説明 |
|---|---|
| ページ | 対象のパス(例: `/f2l/f2l-advanced`) |
| 場所 | ページの中の位置(見出し、本文など) |
| 現行の表記 | 移植元の文字列 |
| 修正後の表記 | 新サイトの文字列 |
| 理由 | 誤字と判断した理由 |

## ページとデータの対応

| パス | データ | 図の数 | 画像 |
|---|---|---|---|
| `/pll/pll` | `pll.ts`(`pll`、`pllName`) | 21 | なし |
| `/pll/pll-view` | `pll-view.ts`(`width`、`height`) | 13 | GIF 13 枚 |
| `/pll/pll-chances` | `pll-chances.ts` | 72 | なし(表 1 つ) |
| `/pll/two-sided-pll` | `two-sided-pll.ts`(`iwidth`、`iheight`) | 67 | PNG 46 枚 |
| `/oll/oll` | `oll.ts`(`oll`) | 57 | なし |
| `/oll/coll` | `coll.ts`(`COLLn21`〜`COLLn27`) | 40 | なし |
| `/f2l/f2l` | `f2l.ts`(`f2l`) | 41 | なし |
| `/f2l/f2l-advanced` | `f2l-advanced.ts`(`advancedF2lth`、`advancedF2loh`) | 6 | なし |
| `/f2l/winter-variation` | `winter-variation.ts`(`winterVariation0`〜`3`) | 27 | なし |
| `/bld/old-pochmann-corner` | `old-pochmann-corner.ts` | 11 | なし |
| `/bld/bld-introduction` | なし(テンプレートに本文) | 0 | なし |
| `/bld/bld-method` | なし(テンプレートに本文) | 0 | なし |
| `/fmc/intro-fmc` | なし(テンプレートに本文) | 0 | なし |
