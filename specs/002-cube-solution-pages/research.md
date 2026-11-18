# Research: キューブ系の解法ページの移植

**Feature**: `002-cube-solution-pages` | **Date**: 2026-11-18

Plan の Technical Context で未確定だった項目を調べた結果をまとめる。
spike(原則 VIII)は、リポジトリの外(scratchpad の一時的な worktree)で、`nuxt dev` と `nuxt generate` の両方を実際に実行して確認した。

## 1. キューブの図の描画(spike 結果)

- **Decision**: 現行と同じ `sr-visualizer` `1.0.13`(`latest`、ISC ライセンス、依存は `svg.js` 2.7.1)を使い、`cubePNG` で描画する。描画はブラウザーでのみ行う(`onMounted` の中で動的 `import`)。共通のコンポーネント `CubeImage.vue` にまとめ、各ページは描画の指定(`ICubeOptions`)だけを渡す。
- **Rationale**:
  - 現行の 13 ページのうち 10 ページが、`SRVisualizer.cubePNG` で図を描いている(呼び出しは約 50 か所)。同じライブラリと同じ指定を使えば、視点、配色、マスク、矢印が現行と一致する(FR-003)。
  - spike で、Nuxt 4.6.3 のページに `cubePNG` を置き、次を確認した。
    - `nuxt generate` が成功し、`/pll/pll/index.html` に手順の文字列が含まれる(FR-009)。
    - 生成した出力を静的に配信し、headless Chrome で開くと、各ケースの要素に `<img width="80" height="80" src="data:image/png;base64,…">` が描画される。
    - `nuxt dev` でも同じく描画され、スクリーンショットで、PLL の図(上面、側面の色、矢印)が現行と同じ見た目で表示されることを確認した。
    - `nuxt typecheck` が成功する(パッケージに型定義 `dist/lib/index.d.ts` がある)。
  - `sr-visualizer` は DOM と canvas を使うため、サーバー側(prerender)では動かない。動的 `import` にすることで、サーバーのバンドルに入らず、静的生成が壊れない。
- **Alternatives considered**:
  - ビルド時に PNG を生成して、画像ファイルとして配信する: 本文の HTML に図が含まれ、スクリプトなしでも見える利点がある。しかし、Node には DOM と canvas がなく、headless ブラウザーなどの追加の仕組みが必要になる。現行の挙動(ブラウザーで描画)と同じでよいため、採用しない。
  - `cubeSVG` で SVG として描画する: 拡大に強いが、現行は PNG で、見た目(線の太さやアンチエイリアス)が変わるおそれがある。パリティ優先(原則 IV)のため採用しない。
  - 外部の画像生成サービス(VisualCube のサーバーなど)の URL を使う: 外部サービスへの依存が増え、現行の挙動と異なるため採用しない。
- **注意**: `sr-visualizer` は 2022-05 以降更新されていない。Vue 3 や Vite との相性問題は spike で見つからなかったが、将来、ビルドで問題が出た場合の代替は、上の「ビルド時に PNG を生成する」案とする。

## 2. 画像ファイル(PLL の GIF、2側面判断の PNG)

- **Decision**: `legacy/assets/images/pll/`(13 枚)と `legacy/assets/images/two-sided/`(46 枚)を、ファイル名を変えずに `public/images/pll/` と `public/images/two-sided/` へコピーし、`/images/pll/01_U-Perm.gif` のような固定の URL で参照する。
- **Rationale**:
  - 現行サイトでは、これらの画像は `~/assets` 経由でビルドされ、`/_nuxt/img/01_U-Perm.6cb9874.gif` のように、ハッシュ付きの URL で配信されている(本番の HTML で確認)。ハッシュはビルドごと、内容ごとに変わる値で、外部から直接参照される前提の URL ではない。
  - Nuxt 4(Vite)で `~/assets` から読み込むと、別のハッシュ付きの URL になり、現行の URL はどちらの方法でも再現できない。そのため、今後変わらない固定の URL にする。
- **Alternatives considered**:
  - `app/assets/` に置いて Vite に処理させる: 現行と同じ仕組みだが、URL はやはり変わり、ビルドのたびに変わる。固定の URL の方が、今後の URL の互換性(原則 II)を保ちやすいため採用しない。
  - 現行のハッシュ付きの URL(`/_nuxt/img/…`)と同じパスに、画像を置く: 再現はできるが、`/_nuxt/` は Nuxt 4 のビルド出力の置き場所と重なり、衝突や混乱のもとになるため採用しない。
- **Constitution との関係**: Technology & Delivery Constraints の「解法画像は URL を変えずに引き継ぐ」から外れる。plan.md の Complexity Tracking に理由を記載した。

## 3. レイアウト(Bulma の columns などの再現)

- **Decision**: 対象ページで使われている Bulma のクラス(`columns`、`column`、`is-N`、`is-N-mobile`、`is-N-tablet`、`is-mobile`、`is-vcentered`、`is-marginless`、`has-text-centered`、`box`、`table`、`is-striped`、`is-narrow`、`p-0`)だけを、Bulma 0.9 の値で `app/assets/css/main.css` に定義する。ページのテンプレートは、現行のクラス名をそのまま使う。
- **Rationale**:
  - 13 ページで使われているクラスは上の十数種類だけで、`columns` 系が大半(`column` 256 か所、`is-3` 195 か所)。同じクラス名を再現すれば、テンプレートをほぼそのまま移せ、見た目のずれ(原則 IV)と移植の誤りを減らせる。
  - 001 で、ヘッダーとフッターは Tailwind のユーティリティで再現した。ページ本体は量が多く、クラス名を Tailwind に書き換えると、比較と確認の手間が大きい。
- **Alternatives considered**:
  - Bulma の CSS を丸ごと導入する: 001 で採用しなかった方針(Tailwind を使う)と矛盾し、Preflight とも衝突するため採用しない。
  - すべて Tailwind のユーティリティに書き換える: 見た目の再現は可能だが、約 400 か所の置き換えが必要で、誤りが入りやすいため採用しない。
- **値の例**(Bulma 0.9): `.columns` は `margin: -0.75rem`、`.column` は `padding: 0.75rem`。`.columns` は 769px 以上で `display: flex`、`.columns.is-mobile` は常に `flex`。`.column.is-3` は `flex: none; width: 25%`。`.is-marginless` は `margin: 0 !important`。`.box` は白背景、角丸 6px、影、`padding: 1.25rem`。

## 4. 手順データの置き場所

- **Decision**: ケースの一覧(名前、図の指定、手順の文字列)を持つページは、データを `app/data/cube/` の TypeScript ファイルに切り出し、型(`AlgorithmCase` など)を付ける。文章が中心のページ(BLD の入門と解法、FMC の紹介)は、テンプレートに本文をそのまま書く。
- **Rationale**:
  - 現行の手順のページは、`data()` に手順の文字列を、`mounted()` に図の指定を、別々に持っている。データとして1か所にまとめると、ケースと図の対応がずれにくく、型チェックで抜けを検出できる。
  - テンプレートとデータを分けておけば、パリティの確認(5)で、ケース数を数えやすい。
- **Alternatives considered**: 各ページの `<script setup>` にデータを直接書く。ファイル数は減るが、PLL の確率(441 行)や 2側面判断(560 行)のページが長くなりすぎるため、一覧を持つページは分ける。

## 5. パリティの確認方法

- **Decision**: 本番の現行サイト(`https://roudai.net`)の 13 ページの HTML と、新しく生成した `.output/public` の HTML から、本文のテキスト(見出し、段落、手順の文字列、表のセル)とリンク先を取り出して比較するスクリプト `scripts/verify-parity.mjs` を作る。spec.md の「現行の表記から直した箇所」にある修正は、差分から除く。このスクリプトは、ローカルで手動で実行する(CI では実行しない)。
- **Rationale**:
  - 現行サイトは、Nuxt 2 で静的生成されており、本番の HTML に手順の文字列が含まれている(`/pll/pll/` で確認)。`legacy/` の Nuxt 2 は、ローカルではもう動かないため、本番の HTML が、最も確実な比較対象になる。
  - SC-002(ケース数、手順の文字列、見出しの相違が0件)と SC-005(外部リンクの相違が0件)を、目視より確実に確認できる。
  - CI で実行しない理由: 本番サイトは、切り替え後に新サイトになるため、比較の対象として恒久的には使えない。また、PR の確認を外部のサイトの状態に依存させたくない。
- **Alternatives considered**:
  - 目視だけで比較する: 13 ページ、数百の手順の文字列を、目視で漏れなく確認するのは難しいため、補助として使う(SC-004 の見た目の確認)。
  - 現行の HTML をスナップショットとしてリポジトリに保存する: 比較は安定するが、移植元の正は `legacy/` と本番サイトであり、3つ目のコピーを持つ必要はないため採用しない。
- **図の確認**: 図は、ブラウザーで描画されるため、HTML の比較では確認できない。各ページの図の要素の数が現行と同じであること(スクリプト)と、見た目(目視、SC-004)で確認する。

## 6. ルートと prerender

- **Decision**: 追加の設定は不要。001 で作ったローカルモジュール `modules/prerender-pages.ts` が、`app/pages/` のページを自動で prerender の対象にする。
- **Rationale**: 001 の方式(`crawlLinks: false` と、解決済みのページからのパスの収集)は、ページを足すだけで対象に入る。spike でも、`app/pages/pll/pll.vue` を置くだけで `/pll/pll/index.html` が生成された。
- **URL の末尾のスラッシュ**: 現行の本番では、`/pll/pll` は `/pll/pll/` へリダイレクトされる(GitHub Pages のディレクトリの扱い)。新サイトも `pll/pll/index.html` を出力するため、同じ挙動になる。

## 7. ページごとの head(タイトル、meta)

- **Decision**: ページごとのタイトルや meta タグは追加しない。サイト共通の設定(001)のままにする。
- **Rationale**: 現行のページには `head()` がなく、タイトルはサイト共通である。追加は機能追加にあたり、原則 IV に反する(spec.md の Assumptions)。
