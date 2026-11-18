# Research: Megaminx、Clock、Other のページの移植

**Feature**: `003-megaminx-clock-pages` | **Date**: 2026-11-19

Plan の Technical Context で未確定だった項目を調べた結果をまとめる。
spike(原則 VIII)は、リポジトリの外(scratchpad の一時的な worktree)で、`nuxt dev` と `nuxt generate` の両方を実際に実行して確認した。

## 1. Megaminx の図の描画(spike 結果)

- **Decision**: 現行と同じ `sr-puzzlegen` `1.0.4`(`latest`、ISC ライセンス、依存パッケージなし)を使い、`PNG(要素, 'megaminx-top', オプション)` で描画する。描画はブラウザーでのみ行う(`onMounted` の中で動的 `import`)。002 の `CubeImage.vue` と同じ形の `MegaminxImage.vue` にまとめる。
- **Rationale**:
  - 現行の megaminx の 4 ページは、すべて `sr-puzzlegen` の `PNG` と `Type.MEGAMINX_TOP` で図を描いている(46 か所)。同じライブラリと同じオプションを使えば、配色、マスク、矢印が現行と一致する(FR-003)。
  - spike で、現行の `/megaminx/megaminx-cp`(15 ケース、配色と矢印あり)と `/megaminx/megaminx-co`(16 ケース、マスクあり)のデータと描画の手順を、そのまま Nuxt 4.6.3 のページに移して、次を確認した。
    - `nuxt generate` が成功し、HTML に手順の文字列と描画先の div(`megacase1` など)が含まれる(FR-008)。
    - 生成した出力を配信し、本番と並べて撮影した。1280px と 375px の両方で、ページの高さが一致し、画素の差は 0.02〜0.39%(文字のアンチエイリアス程度)。描画されない図は0件。
    - `nuxt dev` でも、2 ページの計 31 個の図がすべて描画され、コンソールのエラーは0件。
    - `nuxt typecheck` が成功する(パッケージに型定義 `dist/lib/index.d.ts` がある)。
  - `PNG` は、描画先として、セレクターの文字列だけでなく要素(`Element`)も受け取る。コンポーネントの `ref` を直接渡せる。
  - DOM と canvas を使うため、サーバー側(prerender)では動かない。動的 `import` にすることで、サーバーのバンドルに入らず、静的生成が壊れない(002 の `sr-visualizer` と同じ)。
- **Alternatives considered**:
  - 現行サイトに残っている未使用の画像(`legacy/assets/images/megaminx/co/` の 16 枚)を使う: 現行の表示はこの画像ではなく `sr-puzzlegen` の描画で、見た目が異なりうるため採用しない(spec.md の Assumptions)。
  - ビルド時に PNG を生成する: 002 の research.md の 1 と同じ理由(DOM と canvas が必要)で採用しない。
- **注意**: `sr-puzzlegen` は 2022-05 以降更新されていない。代替が必要になった場合の方針は、002 の `sr-visualizer` と同じ(ビルド時の生成)とする。

## 2. 図のデータの写し方

- **Decision**: 002 と同じく、移植元の `data()` と `mounted()` を、`sr-puzzlegen` の `PNG` のスタブの上で実行する変換スクリプトで写す。`PNG` に渡された値を、呼び出しの時点でディープコピーし、描画先の id(`megacase1` など)ごとに記録して、`app/data/megaminx/<ページ名>.ts` の `diagrams` に出力する。手順の文字列(`megacase`、`megacase_view`)は、移植元の構造と名前のまま出力する。
- **Rationale**:
  - 移植元の `mounted()` は、1つのオプションのオブジェクトを書き換えながら `PNG` を呼んでいる(`case` と `arrows` を毎回上書き)。呼び出しの時点の値を記録すれば、ケースごとの完全な指定が得られる。`PNG` は同期で描画するため(spike で、書き換えながら呼んでも本番と同じ図になった)、記録した値と現行の表示は一致する。
  - 手で写すと、46 ケースの配色、マスク、矢印の転記ミスが起こりうる。002 で同じ方法を 355 個の図に使い、誤りがなかった。
- **Alternatives considered**: ページの `<script setup>` で、移植元と同じく書き換えながら `PNG` を呼ぶ。spike ではこの方法で動いたが、型が付けにくく、002 の構成(データとコンポーネントの分離)と揃わないため採用しない。

## 3. MegaminxView の移植

- **Decision**: `legacy/components/MegaminxView.vue` を `app/components/MegaminxView.vue` に移す。テンプレートとクラス名(`columns is-mobile is-vcentered is-marginless`、`column is-2-tablet is-3-mobile has-text-centered`、`column is-10-tablet is-9-mobile p-0`)は現行のまま使う。現行は空の div を出して親のページが描画していたが、新サイトでは、図の指定を props で受け取り、中の `MegaminxImage.vue` が描画する。
- **Rationale**: 出力する HTML の構造(描画先の id を持つ空の div、手順の文字列)は現行と同じになり、パリティの確認(5)の対象もそのまま比べられる。描画を部品の中に閉じることで、ページ側に描画の処理が残らない。
- **Bulma のクラス**: 必要なクラスは、すべて 002 で `main.css` に再現済みである(`grep` で確認。spike の撮影でも、レイアウトの差はなかった)。この Spec では CSS を追加しない。

## 4. Clock と Other のページ

- **Decision**: テンプレートの本文を、そのまま `app/pages/clock/` と `app/pages/other/` の `.vue` に写す。スクリプトとデータは持たない。
- **Rationale**: 4 ページは、見出し、段落、リスト、リンク、`<b>` だけで、クラス、図、画像、スクリプトを使っていない(移植元のタグを数えて確認)。002 の BLD と FMC の文章のページと同じ扱いで足りる。
- **見出しのリンク**: `/other/3x3x3-method` は、`<h3>` の中に外部リンクを持つ(18 本)。001 の `.content` のスタイルで、見出しの中のリンクの色が現行と同じになるかは、目視で確認する(quickstart.md)。

## 5. パリティの確認と出力の検証

- **Decision**: 002 の `scripts/verify-parity.mjs` と `scripts/verify-output.mjs` を使う。変更は次の2点だけにする。
  - `scripts/pages.mjs` に、この Spec の 8 パスを追加する(両方のスクリプトが読む)。
  - `verify-parity.mjs` が誤字の修正を読む spec.md の一覧(`specFiles`)に、`specs/003-megaminx-clock-pages/spec.md` を追加する。
- **Rationale**:
  - `verify-parity.mjs` の比較(本文のテキスト、リンク先、id を持つ空の div の数、画像の中身)は、この Spec のページにもそのまま当てはまる。画像はないため、画像の比較は0件になる。
  - 誤字の修正の例外は、`specFiles` に並べた spec.md の表から読む。現在は 002 の spec.md だけを読むため、この Spec の spec.md を加える。
- **見た目の確認**: 002 と同じく、本番と並べた撮影(1280px と 375px)で、高さと画素の差を比べる(SC-004)。

## 6. ページごとの head とルート

- **Decision**: 002 と同じ。ページごとのタイトルや meta タグは追加せず、prerender の対象は 001 のモジュールが自動で集める。
