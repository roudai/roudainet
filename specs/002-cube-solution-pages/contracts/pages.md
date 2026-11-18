# Contract: キューブ系の解法ページ

**Feature**: `002-cube-solution-pages` | **Source of truth**: `legacy/pages/` の各ファイルと、本番の現行サイト(`https://roudai.net`)

この Spec の公開インターフェースは、訪問者に見える 13 のページ(パス、本文、図、リンク)と、生成したサイトの出力ファイルである。
内容は、現行と同一でなければならない(FR-001〜FR-007)。ただし、spec.md の「現行の表記から直した箇所」に記録した修正は除く。

## パスと移植元

| パス | 移植元 | 種類 | 図 |
|---|---|---|---|
| `/pll/pll-view` | `legacy/pages/pll/pll-view.vue` | 一覧 | GIF 13 枚、`cubePNG` |
| `/pll/pll-chances` | `legacy/pages/pll/pll-chances.vue` | 解説 | `cubePNG`、表 1 つ |
| `/pll/pll` | `legacy/pages/pll/pll.vue` | 一覧 | `cubePNG`(21 ケース、矢印つき) |
| `/pll/two-sided-pll` | `legacy/pages/pll/two-sided-pll.vue` | 解説 | PNG 46 枚、`cubePNG` |
| `/oll/oll` | `legacy/pages/oll/oll.vue` | 一覧 | `cubePNG` |
| `/oll/coll` | `legacy/pages/oll/coll.vue` | 一覧 | `cubePNG`(7 つのまとまり) |
| `/f2l/f2l` | `legacy/pages/f2l/f2l.vue` | 一覧 | `cubePNG` |
| `/f2l/f2l-advanced` | `legacy/pages/f2l/f2l-advanced.vue` | 一覧 | `cubePNG`(両手と片手) |
| `/f2l/winter-variation` | `legacy/pages/f2l/winter-variation.vue` | 一覧 | `cubePNG`(4 つのまとまり) |
| `/bld/bld-introduction` | `legacy/pages/bld/bld-introduction.vue` | 解説 | なし |
| `/bld/bld-method` | `legacy/pages/bld/bld-method.vue` | 解説 | なし |
| `/bld/old-pochmann-corner` | `legacy/pages/bld/old-pochmann-corner.vue` | 解説 | `cubePNG` |
| `/fmc/intro-fmc` | `legacy/pages/fmc/intro-fmc.vue` | 解説 | なし |

## 出力

- `.output/public/<パス>/index.html` が、13 パスのすべてについて存在する。
- 各 HTML には、そのページの見出し、本文、手順の文字列、表のセル、リンクが含まれる(FR-009)。図(`cubePNG`)は含まれず、ブラウザーで描画される。
- 画像ファイルは `.output/public/images/pll/`(13 枚)と `.output/public/images/two-sided/`(46 枚)にあり、`legacy/assets/images/` の同名のファイルとバイト単位で同一である。

## 外部リンク

現行と同じ URL でなければならない(FR-007)。現行の外部リンクは次のとおり。

| ページ | URL |
|---|---|
| `/pll/two-sided-pll` | `http://cubing.pt/wp-content/uploads/2017/03/pll2side-20140531.pdf` |
| `/pll/two-sided-pll` | `https://roudai.github.io/PLLTrainer/` |
| `/bld/bld-introduction` | `https://togetter.com/li/135461` |
| `/bld/bld-method` | `https://www.stefan-pochmann.info/spocc/blindsolving/M2R2/` |
| `/fmc/intro-fmc` | `https://cubevoyage.net/how-to-solve/intermediate/notation/` |

## 図の描画(`CubeImage.vue`)

- 入力: `CubeDiagram`(data-model.md)。
- サーバー側(prerender)では、空の div だけを出力する。div の `id` は、移植元の描画先と同じ値(`pll1`、`oll1`、`pochmann1` など)にする。大きさが決まっている場合は、レイアウトがずれないよう、要素の幅と高さを確保する。
- ブラウザーでは、マウント後に `sr-visualizer` を動的に読み込み、`cubePNG` で要素の中に `<img>` を描画する。
- 描画に失敗した場合は、その要素を空のままにし、ほかのケースと本文の表示を妨げない(Spec の Edge Cases)。

## パリティの確認(`scripts/verify-parity.mjs`)

- 入力: 本番の現行サイトの 13 ページの HTML(取得する)と、`.output/public` の 13 ページの HTML。
- 範囲: 本番と新サイトの両方で、本文の領域(`.content.m-3` の要素)の中だけ。ヘッダーとフッターは含めない。
- 比較: 本文のテキスト(見出し、段落、リストの項目、手順の文字列、表のセル)の並びと、リンク先の URL、図の要素の数。図の要素は、`<英字><数字>` の id を持つ div(`cubePNG` の描画先)と、`<img>` である。
- 例外: spec.md の「現行の表記から直した箇所」の表にある組。
- 出力: ページごとの差分。差分が0件なら成功(終了コード 0)、それ以外は失敗(終了コード 1)。
- 実行: ローカルで手動で実行する。CI では実行しない(research.md の 5)。
