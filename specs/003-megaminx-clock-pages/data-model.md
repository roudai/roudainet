# Data Model: Megaminx、Clock、Other のページの移植

**Feature**: `003-megaminx-clock-pages` | **Date**: 2026-11-19

この機能のデータは、すべてビルド時に固定の、静的な定義である。保存や更新はない。
002 の「実装時の設計変更」と同じく、移植元の `data()` の構造と名前のまま写し、図の指定は描画先の id ごとに持つ(research.md の 2)。
型は `app/data/megaminx/types.ts` に、各ページのデータは `app/data/megaminx/<ページ名>.ts` に置く。

## MegaminxDiagram(Megaminx の図の指定)

`sr-puzzlegen` の `PNG` に渡すオプション(`PNGVisualizerOptions`)と同じ値を持つ。描画の種類は、4 ページとも `megaminx-top`(上面)で固定のため、データには持たず、`MegaminxImage.vue` が渡す。

| 項目 | 説明 | 使っているページ |
|---|---|---|
| `width`、`height` | 図の大きさ(px)。4 ページとも 120 | すべて |
| `puzzle.case` | 図の状態を作る手順(逆にかけた状態を表示する) | すべて |
| `puzzle.mask` | 面ごとに、灰色にするステッカーの番号 | EO、CO |
| `puzzle.scheme` | 面ごとの配色(`value` と `name`) | EP、CP |
| `puzzle.arrows` | 矢印の始点と終点(面とステッカーの番号) | EP、CP |

**検証ルール**: 値は、移植元の `mounted()` が `PNG` に渡した値と同一である(FR-003)。変換スクリプトで、呼び出しの時点の値をディープコピーして記録するため、手による差異はない。

## ページのデータ(`app/data/megaminx/<ページ名>.ts`)

| export | 型 | 説明 |
|---|---|---|
| `megacase` | `Record<string, string[]>` | ケースの番号ごとの手順の文字列。テンプレートは、移植元と同じく 1 つ目(`[0]`)を表示する |
| `megacase_view` | `Record<string, string[]>` | EP と CP だけ。一部のケースで、図とは別の表示用の手順を持つ(移植元と同じ) |
| `diagrams` | `Record<string, MegaminxDiagram>` | 図の指定。キーは描画先の id(`megacase1` など) |

**検証ルール**:

- ケースの数と順序、手順の文字列は、移植元と同一である(SC-002)。`scripts/verify-parity.mjs` で、本番の現行サイトと比べて確認する。
- `diagrams` のキーの集合は、テンプレートの `MegaminxView` の `image` の集合と一致する。

## TypoCorrection(誤字の修正の記録)

002 の data-model.md と同じ。spec.md の「現行の表記から直した箇所」の表の1行で、`scripts/verify-parity.mjs` が差分の例外として扱う。

## ページとデータの対応

| パス | データ | 図の数 |
|---|---|---|
| `/megaminx/megaminx-eo` | `eo.ts`(`megacase`) | 3 |
| `/megaminx/megaminx-co` | `co.ts`(`megacase`) | 16 |
| `/megaminx/megaminx-ep` | `ep.ts`(`megacase`、`megacase_view`) | 12 |
| `/megaminx/megaminx-cp` | `cp.ts`(`megacase`、`megacase_view`) | 15 |
| `/clock/clock-no-flip` | なし(テンプレートに本文) | 0 |
| `/other/3x3x3-method` | なし(テンプレートに本文) | 0 |
| `/other/for-non-cubers` | なし(テンプレートに本文) | 0 |
| `/other/advent-calendar2014` | なし(テンプレートに本文) | 0 |
