# Data Model: キューブ系の解法ページの移植

**Feature**: `002-cube-solution-pages` | **Date**: 2026-11-18

この機能のデータは、すべてビルド時に固定の、静的な定義である。保存や更新はない。
型は `app/data/cube/types.ts` に置き、各ページのデータは `app/data/cube/` の下に置く(research.md の 4)。

## CubeDiagram(キューブの図の指定)

`sr-visualizer` の `ICubeOptions` のうち、現行のページが使っている項目だけを持つ。`CubeImage.vue` に渡す。

| フィールド | 型 | 説明 |
|---|---|---|
| `case` または `algorithm` | 文字列(任意) | 図の状態を作る手順。現行と同じ値を使う。`case` は、手順を逆に適用した状態を表す |
| `mask` | 文字列(任意) | 塗りつぶしのマスク(`pll`、`oll`、`coll`、`f2l`、`ll`、`wv` など) |
| `view` | 文字列(任意) | 視点。`plan`(上から)か、省略(斜め) |
| `width`、`height` | 数値 | 図の大きさ(px)。現行の値(例: 80) |
| `arrows` | 文字列(任意) | 矢印の指定(例: `U0U2,U2U6,U6U0`) |
| `colorScheme` | 面ごとの色(任意) | 配色。現行で指定しているページだけ |
| `stickerColors` など | (任意) | 現行のページが使っている、その他の項目。移植時に、現行の `mounted()` の指定をそのまま写す |

**検証ルール**: 値は、現行の `legacy/pages/` の `mounted()` で `cubePNG` に渡している値と同一でなければならない(FR-003)。型は `ICubeOptions` を使い、独自の値を作らない。

## AlgorithmCase(手順のケース)

手順の一覧ページの1項目。

| フィールド | 型 | 説明 |
|---|---|---|
| `name` | 文字列(任意) | ケースの見出し(例: PLL の `U-Perm`)。見出しのないページでは省略 |
| `diagram` | `CubeDiagram` | そのケースの図 |
| `algorithms` | 文字列の配列 | 手順の文字列。種類の接頭辞(`両手：`、`片手：`、`最少：` など)を含め、現行の表記のまま持つ。順序に意味がある |

**検証ルール**:

- ケースの数と順序は、現行と同一である(SC-002)。
- 手順の文字列は、現行と同一である。全角のコロン(`：`)、全角の括弧、タブ、`′` などの記号も、現行のまま残す(誤字の修正として記録したものを除く)。
- 現行の PLL では、図の状態を、1つ目の手順の `：` より後ろから作っている(`makeCase`)。移植後も、同じ文字列から同じ状態を作る。

## AlgorithmSection(ケースのまとまり)

1ページに複数のまとまりがあるページ(COLL の OLL n21〜n27、Winter Variation のコーナー反転の数、発展形 F2L の両手と片手)で使う。

| フィールド | 型 | 説明 |
|---|---|---|
| `title` | 文字列 | まとまりの見出し(例: `OLL n21 H Orientation`) |
| `cases` | `AlgorithmCase` の配列 | そのまとまりのケース |

## SolutionImage(画像ファイルの図)

| フィールド | 型 | 説明 |
|---|---|---|
| `src` | 文字列 | `/images/pll/…` または `/images/two-sided/…`。ファイル名は移植元と同一 |
| `alt` | 文字列 | 現行の `alt` と同一(現行にない場合は空) |

**検証ルール**: 画像ファイルは、`legacy/assets/images/` の同名のファイルと、バイト単位で同一でなければならない(FR-004)。

## TypoCorrection(誤字の修正の記録)

spec.md の「現行の表記から直した箇所」の表の1行。コードには持たず、文書だけで管理する。`scripts/verify-parity.mjs` は、この表の「現行の表記」と「修正後の表記」の組を、差分の例外として扱う。

| フィールド | 説明 |
|---|---|
| ページ | 対象のパス(例: `/f2l/f2l-advanced`) |
| 場所 | ページの中の位置(見出し、本文など) |
| 現行の表記 | 移植元の文字列 |
| 修正後の表記 | 新サイトの文字列 |
| 理由 | 誤字と判断した理由 |

## ページとデータの対応

| パス | データ | 図 |
|---|---|---|
| `/pll/pll` | `pll.ts`(21 ケース) | `CubeDiagram`(矢印つき) |
| `/pll/pll-view` | `pll-view.ts` | `SolutionImage` 13 枚 + `CubeDiagram` |
| `/pll/pll-chances` | `pll-chances.ts` | `CubeDiagram`、表 1 つ |
| `/pll/two-sided-pll` | `two-sided-pll.ts` | `SolutionImage` 46 枚 + `CubeDiagram` |
| `/oll/oll` | `oll.ts` | `CubeDiagram` |
| `/oll/coll` | `coll.ts`(`AlgorithmSection` 7 つ) | `CubeDiagram` |
| `/f2l/f2l` | `f2l.ts` | `CubeDiagram` |
| `/f2l/f2l-advanced` | `f2l-advanced.ts`(`AlgorithmSection` 2 つ) | `CubeDiagram` |
| `/f2l/winter-variation` | `winter-variation.ts`(`AlgorithmSection` 4 つ) | `CubeDiagram` |
| `/bld/old-pochmann-corner` | `old-pochmann-corner.ts` | `CubeDiagram` |
| `/bld/bld-introduction` | なし(テンプレートに本文) | なし |
| `/bld/bld-method` | なし(テンプレートに本文) | なし |
| `/fmc/intro-fmc` | なし(テンプレートに本文) | なし |
