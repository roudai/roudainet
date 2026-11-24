# Contract: Megaminx の図とパリティの確認

**Feature**: `005-megaminx-image` | **Date**: 2026-11-24

003 の [contracts/pages.md](../../003-megaminx-clock-pages/contracts/pages.md) のうち、「図(`MegaminxView.vue` と `MegaminxImage.vue`)」と「パリティの確認」の図の数え方を、この契約で置き換える。ページ、本文、リンク、出力の検証は 003 のまま。

## 図(`MegaminxImage.vue`)

- 入力(props):`id`(描画先の id。今と同じ `megacase1` など)、`diagram`(data-model.md の MegaminxDiagram。見つからないときは `undefined`)。`MegaminxView.vue` の入力と出力の構造は変えない。
- 出力:その id を持つ div。中に、megaminx-image 1.0.0 の `svg()` が返す SVG を 1 つだけ入れる。

  ```html
  <div id="megacase1"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">…</svg></div>
  ```

- `svg()` に渡すオプション:

  | 図 | オプション |
  |---|---|
  | 既定(`oll` が無い。CP、EP) | `{ case, size: 100 }` |
  | OLL 型(`oll: true`。CO、EO) | `{ case, size: 100, scheme: ollScheme() }` |

  - 配色を省くと、ライブラリの既定の配色(`DEFAULT_SCHEME`。上面は薄い灰色 `u`)になる。`ollScheme()` は引数なしで呼び、上面は `u`、ほかは濃い灰色 `d` になる。
  - 線の色(`#000000`)と背景(透明)は、ライブラリの既定のまま。矢印は描かない。
- サーバー側(prerender)とブラウザーで、同じ入力から同じ文字列を出す。静的生成した HTML に SVG が含まれ、ハイドレーションで書き換わらない。
- `diagram` が `undefined` の場合:空の div を出し、コンソールにエラーを出す(今と同じ)。手順の文字列と、ほかの図は表示する。
- `case` が読めない場合:`svg()` が投げる `SyntaxError` は捕まえず、静的生成を失敗させる(誤った図のまま公開しないため。Edge Cases)。

## 依存

- `dependencies` に `megaminx-image`(`1.0.0`)があり、`sr-puzzlegen` が無い。`sr-visualizer` は残っている。
- 出力(`.output/public/_nuxt/`)に、`sr-puzzlegen` のコードが含まれない。

## パリティの確認(`scripts/verify-parity.mjs`)

- 図の要素:id を持つ div のうち、中身が空か、SVG 1 つだけのものを数える(research.md の 5)。

  | 本番(現行) | 新 | 数え方 |
  |---|---|---|
  | `<div id="megacase1"></div>` | `<div id="megacase1"><svg …>…</svg></div>` | どちらも 1 と数える |

- キューブ系のページ(図は空の div のまま)の数え方は、結果が変わらない。
- 本文のテキスト、リンク、画像(`<img>`)の比較は変えない。SVG には文字も `<img>` も無いため、影響しない。
- 図の見た目(配色、矢印)は比べない。spec.md の「現行の内容から変更した箇所」に記録し、quickstart の目視で確かめる。
- 期待結果:Megaminx の 4 ページのうち、CO、EP、EO は差分 0 件。CP は、既にある 3 件(research.md の 5「既にある問題」)だけで、それ以外は 0 件。

## 図の SVG の表示(実装時の追加、2026-11-24)

- `MegaminxImage.vue` の scoped な CSS で、div の中の SVG に `display: inline`、`vertical-align: baseline`、`max-width: 100%`、`height: auto` を当てる(`main.css` の `.content img` と同じ値)。
- 理由:Tailwind の Preflight は SVG を `display: block` にするため、そのままでは `has-text-centered` で中央に寄らず、モバイルの狭い欄(幅約 88px)で 100px のまま描かれ、手順の文字列に重なった。003 までの PNG の img と同じ扱いにすることで、広い画面では欄の中央に 100px、幅 375px の画面では本番と同じ 64px に縮んで表示される(FR-007、SC-005)。
