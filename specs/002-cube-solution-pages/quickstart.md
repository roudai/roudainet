# Quickstart: キューブ系の解法ページの移植の検証

**Feature**: `002-cube-solution-pages` | **Date**: 2026-11-18

実装後に、この機能が動くことを確認する手順。実装コードは含めない。
データは [data-model.md](./data-model.md)、ページと出力の契約は [contracts/pages.md](./contracts/pages.md) を参照する。

## 前提

- 001 の前提(Node 24、pnpm 10)と同じ。
- 作業ブランチ: `002-cube-solution-pages`(`nuxt4-rebuild` へ PR でマージする)。PR が stack として扱われた場合は、マージ前に GitHub の画面で Unstack する(`main` への公開を防ぐため)。
- パリティの確認(手順 3)には、本番の現行サイト `https://roudai.net` へのネットワーク接続が必要。

## セットアップ

```sh
pnpm install --frozen-lockfile
```

期待結果: エラーなくインストールされる。`sr-visualizer` が `dependencies` に入り、`pnpm-lock.yaml` だけが更新されている。

## 1. 品質ゲート(SC-007)

```sh
pnpm lint
pnpm typecheck
pnpm generate
pnpm verify
```

期待結果: すべて終了コード 0。

## 2. 出力のパスと画像(US3、SC-001)

`pnpm generate` の後、`.output/public` を確認する。

- 13 パス(contracts/pages.md の表)のそれぞれに `index.html` が存在する。
- `images/pll/` に 13 個、`images/two-sided/` に 46 個のファイルがあり、`legacy/assets/images/` の同名のファイルと同一である(例: `diff -r legacy/assets/images/pll .output/public/images/pll` の出力がない)。
- 各 HTML に、そのページの手順の文字列が含まれる(例: `/pll/pll/index.html` に `R2 U R U R' U' R' U' R' U R'` が含まれる)。

## 3. パリティの確認(US1、US2、US4、SC-002、SC-005、SC-006)

```sh
node scripts/verify-parity.mjs
```

期待結果: 13 ページのすべてで、本文のテキスト、リンク先、図の要素の数に、差分が0件。終了コード 0。
spec.md の「現行の表記から直した箇所」にある修正(例: 「発展系F2L」→「発展形F2L」)だけが、例外として報告される。

## 4. ブラウザーでの表示(US1、US2、US3、SC-003、SC-004)

```sh
pnpm preview
```

表示された URL で、次を確認する。

1. ヘッダーの F2L、OLL、PLL、BLD、FMC のメニューの各項目を選び、対応するページが表示される。404 にならない。
2. 手順の一覧ページ(`/pll/pll`、`/pll/pll-view`、`/oll/oll`、`/oll/coll`、`/f2l/f2l`、`/f2l/f2l-advanced`、`/f2l/winter-variation`)で、すべてのケースに図が表示され、空欄の図がない(SC-003)。
3. 各ページを、本番の現行サイトの同じパスと並べて、広い画面(1280px 程度)と狭い画面(375px 程度)で比較し、レイアウト、図(視点、配色、マスク、矢印)、表に、気づく相違がない(SC-004)。
4. 解説ページの外部リンクを選び、現行と同じ URL へ移動する。
5. ページの URL を、アドレスバーへ直接入力して開いても、同じページが表示される。

## 5. CI(SC-007)

`nuxt4-rebuild` 宛ての PR で、`check` と `actionlint` が成功し、`deploy.yml` が実行されないことを確認する。
