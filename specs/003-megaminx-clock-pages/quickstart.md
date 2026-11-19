# Quickstart: Megaminx、Clock、Other のページの移植の検証

**Feature**: `003-megaminx-clock-pages` | **Date**: 2026-11-19

実装後に、この機能が動くことを確認する手順。実装コードは含めない。
データは [data-model.md](./data-model.md)、ページと出力の契約は [contracts/pages.md](./contracts/pages.md) を参照する。

## 前提

- 001 と 002 の前提(Node 24、pnpm 10)と同じ。
- 作業ブランチ: `003-megaminx-clock-pages`(`nuxt4-rebuild` へ PR でマージする)。PR が stack として扱われた場合は、マージ前に GitHub の画面で Unstack する(`main` への公開を防ぐため)。
- パリティの確認(手順 3)には、本番の現行サイト `https://roudai.net` へのネットワーク接続が必要。

## セットアップ

```sh
pnpm install --frozen-lockfile
```

期待結果: エラーなくインストールされる。`sr-puzzlegen` が `dependencies` に入っている。

## 1. 品質ゲート(SC-007)

```sh
pnpm lint
pnpm typecheck
pnpm generate
pnpm verify
```

期待結果: すべて終了コード 0。`pnpm verify` が、移植済みの 21 ページ(002 の 13 とこの Spec の 8)の存在を確認する。

## 2. 出力のパス(US3、SC-001)

`pnpm generate` の後、`.output/public` に、contracts/pages.md の表の 8 パスの `index.html` がある。各 HTML に、そのページの手順の文字列や本文が含まれる(例: `/megaminx/megaminx-cp/index.html` に `R' U2' R U' R' F' R U R' U' R' F R U2' R` が含まれる)。

## 3. パリティの確認(US1、US2、US4、SC-002、SC-005、SC-006)

```sh
pnpm verify:parity
```

期待結果: 21 ページのすべてで、本文のテキスト、リンク先、図の要素の数に、差分が0件。spec.md の「現行の表記から直した箇所」にある修正だけが、例外として報告される。

## 4. ブラウザーでの表示(US1、US2、US3、SC-003、SC-004)

```sh
pnpm preview
```

表示された URL で、次を確認する。

1. ヘッダーの Megaminx、Clock、Other のメニューの、内部ページの各項目を選び、対応するページが表示される。404 にならない。
2. Megaminx の 4 ページで、すべてのケースに図が表示され、空欄の図がない(SC-003、計 46)。
3. 各ページを、本番の現行サイトの同じパスと並べて、広い画面(1280px 程度)と狭い画面(375px 程度)で比較し、レイアウト、図(配色、マスク、矢印)、見出しの中のリンクの色に、気づく相違がない(SC-004)。
4. ページの URL を、アドレスバーへ直接入力して開いても、同じページが表示される。

## 5. CI(SC-007)

`nuxt4-rebuild` 宛ての PR で、`check` と `actionlint` が成功し、`deploy.yml` が実行されないことを確認する。
