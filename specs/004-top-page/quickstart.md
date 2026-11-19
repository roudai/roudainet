# Quickstart: トップページの移植と情報の更新の検証

**Feature**: `004-top-page` | **Date**: 2026-11-19

実装後に、この機能が動くことを確認する手順。実装コードは含めない。ページの契約は [contracts/pages.md](./contracts/pages.md) を参照する。

## 前提

- 002 と 003 の前提(Node 24、pnpm 10)と同じ。
- 作業ブランチ: `004-top-page`(`nuxt4-rebuild` へ PR でマージする)。PR が stack として扱われた場合は、マージ前に GitHub の画面で Unstack する。
- パリティの確認には、本番の現行サイト `https://roudai.net` へのネットワーク接続が必要。

## 1. 品質ゲート(SC-006)

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm generate
pnpm verify
```

期待結果: すべて終了コード 0。`pnpm verify` が 22 ページの存在を確認する。

## 2. パリティの確認(SC-002、SC-003、SC-004)

```sh
pnpm verify:parity
```

期待結果: 22 ページのすべてで差分が0件。`/` では、spec.md の表の更新(tribox、Issues、Megaminx、シニアランキング)だけが、例外として報告される。

## 3. ブラウザーでの表示(SC-001、SC-005)

```sh
pnpm preview
```

1. `/` を開き、仮の案内文がなく、contracts/pages.md の構成どおりに表示される。
2. tribox、Issues、シニアランキングの 2 つのリンクを選び、それぞれ指定の URL へ移動する。
3. 本番の現行サイトと並べて、広い画面(1280px 程度)と狭い画面(375px 程度)で比較し、追加したシニアランキングの部分以外に、レイアウトの相違がない。
4. ヘッダーのロゴを選ぶと、トップページに戻る。

## 4. CI

`nuxt4-rebuild` 宛ての PR で、`check` と `actionlint` が成功し、`deploy.yml` が実行されないことを確認する。
