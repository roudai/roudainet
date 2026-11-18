# Contract: ページ、図、パリティの確認

**Feature**: `003-megaminx-clock-pages` | **Date**: 2026-11-19

このサイトが外部に公開するインターフェースは、URL と、その URL で表示される内容である。
002 の [contracts/pages.md](../../002-cube-solution-pages/contracts/pages.md) を前提とし、この Spec で追加する分だけを定める。

## ページ

| パス | 移植元 | 出力のファイル | 図 | 外部リンク |
|---|---|---|---|---|
| `/megaminx/megaminx-eo` | `legacy/pages/megaminx/megaminx-eo.vue` | `megaminx/megaminx-eo/index.html` | 3 | 0 |
| `/megaminx/megaminx-co` | `legacy/pages/megaminx/megaminx-co.vue` | `megaminx/megaminx-co/index.html` | 16 | 0 |
| `/megaminx/megaminx-ep` | `legacy/pages/megaminx/megaminx-ep.vue` | `megaminx/megaminx-ep/index.html` | 12 | 0 |
| `/megaminx/megaminx-cp` | `legacy/pages/megaminx/megaminx-cp.vue` | `megaminx/megaminx-cp/index.html` | 15 | 0 |
| `/clock/clock-no-flip` | `legacy/pages/clock/clock-no-flip.vue` | `clock/clock-no-flip/index.html` | 0 | 1 |
| `/other/3x3x3-method` | `legacy/pages/other/3x3x3-method.vue` | `other/3x3x3-method/index.html` | 0 | 18 |
| `/other/for-non-cubers` | `legacy/pages/other/for-non-cubers.vue` | `other/for-non-cubers/index.html` | 0 | 1 |
| `/other/advent-calendar2014` | `legacy/pages/other/advent-calendar2014.vue` | `other/advent-calendar2014/index.html` | 0 | 1 |

- すべてのページは、001 の共通レイアウト(ヘッダー、`.content.m-3` の本文、フッター)の中に表示する。
- 外部リンクの URL は、移植元の `href` と同一である(`http://` のものも、そのまま残す)。

## 図(`MegaminxView.vue` と `MegaminxImage.vue`)

- `MegaminxView` の入力: `image`(描画先の id。移植元と同じ `megacase1` など)、`algorithm`(手順の文字列の配列。1 つ目を表示する)、`diagram`(図の指定。data-model.md の MegaminxDiagram)。
- `MegaminxView` が出力する HTML の構造とクラス名は、移植元の `legacy/components/MegaminxView.vue` と同一である。
- `MegaminxImage` は、サーバー側(prerender)では、その id を持つ空の div だけを出力する。ブラウザーで、`sr-puzzlegen` の `PNG` により、`megaminx-top` の図を描画する。描画前に図の大きさは確保しない(002 と同じ理由)。
- 図の指定が見つからない場合や、描画に失敗した場合は、コンソールにエラーを出し、その図だけを空のままにする。手順の文字列と他の図は表示する。

## 出力の検証(`scripts/verify-output.mjs`)

- `scripts/pages.mjs` の移植済みのページに、上の 8 パスを加える。各パスの `index.html` が存在しない場合は失敗する(SC-001)。

## パリティの確認(`scripts/verify-parity.mjs`)

- 対象: 上の 8 パス(002 の 13 パスに加えて、計 21 パス)。
- 比較の内容と方法は、002 の契約と同じ(本文のテキスト、リンク先、id を持つ空の div の数、画像の中身)。
- 例外: この Spec の spec.md の「現行の表記から直した箇所」の表にある修正。スクリプトが読む spec.md に、この Spec の spec.md を加える。
- 期待結果: 21 パスのすべてで、記録した修正以外の差分が0件。終了コード 0。
