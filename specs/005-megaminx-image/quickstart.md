# Quickstart: Megaminx の図を自作ライブラリで描く

**Feature**: `005-megaminx-image` | **Date**: 2026-11-24

実装の後に、この順で確かめる。契約は [contracts/diagrams.md](./contracts/diagrams.md)、データは [data-model.md](./data-model.md)。

## 前提

- Node 24、pnpm 10(001 と同じ)。
- `pnpm install` 済み。

## 1. 品質ゲート

```sh
pnpm lint
pnpm typecheck
pnpm generate
pnpm verify
```

- すべて成功する(SC-007)。lint に `vue/no-v-html` の警告が出ない。

## 2. 図が HTML に含まれる

```sh
for p in cp co ep eo; do
  echo "$p $(grep -o '<svg xmlns' .output/public/megaminx/megaminx-$p/index.html | wc -l)"
done
```

- CP 15、CO 16、EP 12、EO 3(計 46)が出る(FR-002)。
- `grep -rl "megaminx-top" .output/public/_nuxt/` が何も出さない(`sr-puzzlegen` が出力に無い。FR-010)。
- `package.json` の `dependencies` に `megaminx-image` があり、`sr-puzzlegen` が無く、`sr-visualizer` がある。

## 3. スクリプトの有無による表示

```sh
pnpm preview
```

- ブラウザーで `/megaminx/megaminx-cp`、`-co`、`-ep`、`-eo` を開き、46 個すべての図が表示される。
- ブラウザーのスクリプトを無効にして同じ 4 ページを開き、46 個すべての図が表示される(SC-001)。
- スクリプトが有効なとき、コンソールに警告やエラー(ハイドレーションの不一致を含む)が出ない。
- 図は最初から表示されており、後から現れて手順の文字列の位置が動くことがない。
- `pnpm dev` でも、同じ 4 ページで図が表示され、コンソールに警告が出ない。

## 4. 見た目(目視)

- CP と EP:上面が薄い灰色、側面がライブラリの既定の色(水色、オレンジ、レモン、ライム、ピンク)。矢印が無い(SC-003)。
- CO と EO:上面の色のステッカーが薄い灰色、ほかが濃い灰色。矢印が無い。
- 図は幅 100px で、今と同じ欄に置かれ、手順の文字列と横に並ぶ。狭い画面(幅 375px 程度)と広い画面の両方で、並びが崩れない(SC-005)。
- キューブ系のページ(`/pll/pll` など)の図が、今までどおり表示される。
- 図の配置(どこがどの色か)は、spec の Assumptions のとおり、事前の調査で 46 個とも今の図と一致することを確かめている(SC-002)。実装の後は、データの `case` の値が書き換え前と同じであることを確かめる。
  - データを書き換える一度だけのスクリプトが、書き換え前と後の 46 個の `case` を読み直して比べ、一致した数(46)を出す(data-model.md)。
  - 書き換え後の 4 ファイルで、`oll: true` が CO と EO の図だけ(計 19 個)に付いている。

## 5. パリティの確認

```sh
pnpm verify:parity
```

- 本番サイトへのネットワーク接続が必要(CI では実行しない)。
- Megaminx の 4 ページで、図の要素の数の差分が出ない(SC-004)。
- 既知の差分:`/megaminx/megaminx-cp` の「記録された修正の現行の表記「並行交換(1)」「並行交換(2)」「コーナー2セットが並行移動」が、現行サイトに見つかりません」の 3 件は、main でも出る既にある問題で、この Spec の対象外(research.md の 5)。これ以外の差分が 0 件であること。
