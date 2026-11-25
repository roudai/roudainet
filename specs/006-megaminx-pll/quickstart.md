# Quickstart: Megaminx PLL の判断基準のページ

**Feature**: `006-megaminx-pll` | **Date**: 2026-11-25

実装の後に、この順で確かめる。契約は [contracts/page.md](./contracts/page.md)、データは [data-model.md](./data-model.md)。

## 前提

- Node 24、pnpm 10。`pnpm install` 済み。

## 1. 品質ゲート

```sh
pnpm lint
pnpm typecheck
pnpm generate
pnpm verify
```

- すべて成功する(SC-008)。`pnpm verify` の成功のメッセージに、新しいページを含めたページ数が出る。

## 2. 出力

```sh
f=.output/public/megaminx/megaminx-pll/index.html
grep -o '<svg xmlns' $f | wc -l          # 151(基礎知識の例の図が無い状態)
grep -o 'role="tab"' $f | wc -l          # 28
grep -o '準備中' $f | wc -l              # 185(151 ケース + 段階の一言の 27 + 基礎知識の比べる欄の 6 とヘッドライトの 1)
wc -c < $f; gzip -c $f | wc -c           # 大きさを記録する
```

- (実装時の記録、2026-11-25)SVG は、図の 151 個のほかに、ヘッダーとフッターのアイコンの 2 個がある(`grep -o '<svg' $f` は 153)。上の `<svg xmlns` での数え方なら 151。
- (実装時の記録、2026-11-25)大きさは、圧縮前 486,559 バイト、gzip 後 15,201 バイト。151 個の SVG の形が同じで色だけが違うため、gzip でよく縮む。
- 151 ケースが段階に重複なく含まれることは、静的生成のときの検証(data-model.md)で確かめられる。生成が成功すれば満たしている。

## 3. ブラウザーでの確認

```sh
pnpm preview
```

`/megaminx/megaminx-pll` を開いて確かめる(SC-001〜SC-006):

- 最初に「基礎知識」のタブが選ばれ、「ペアと偽ペア」「バーと偽バー」「ブロックと偽ブロック」が左右の欄(狭い画面では縦)で、「ヘッドライト」が 1 列で、見出しと「準備中」で並ぶ。
- 27 個の段階のタブを順に押し、各段階の見出し(「A (3 corner CP)」など)と、覚える順のケース(名前、画像、手順、「準備中」)が出る。押してもページの先頭へ飛ばず、アドレスのハッシュが変わる。
- `/megaminx/megaminx-pll#K2`、`#F2-5`、`#basics` を直接開くと、そのタブが出る。`#nothing` は基礎知識。再読み込みでも同じタブが出る。
- 幅 375px 程度の画面と広い画面の両方で、タブが折り返して並び、ページが横にはみ出さない。画像と手順が重ならない。
- ヘッダーの Megaminx のメニューの最後に「Megaminx PLL」があり、選ぶとこのページが開く。
- コンソールに警告やエラー(ハイドレーションの不一致を含む)が出ない。`pnpm dev` でも同じ。
- スクリプトを無効にすると、見出しと基礎知識のタブの中身が表示される。

## 4. 運営者が書き足したときの表示(試して戻す)

- `app/data/megaminx/pll-recognition.ts` の `'A1+'` に 2 段落を書き、`app/data/megaminx/pll-basics.ts` の「偽ペア」に段落 1 つと例の図 2 つ(`{ pll: 'A1+', label: '例' }` と `{ case: "R U R' U'" }`)を書く。
- `pnpm generate` と `pnpm preview` で、A のタブの A1+ の下に 2 段落、基礎知識の偽ペアに段落と 2 つの図(1 つ目の下に「例」)が出ることを確かめる(SC-003)。
- 試しに `'Q9'`(存在しないケース名)を判断基準のキーに足すと、`pnpm generate` が失敗し、メッセージに `Q9` が出る。
- 確かめたら、書き足した内容を戻す。

## 5. パリティの確認

```sh
pnpm verify:parity
```

- 結果が 005 の公開後と同じ(既知の差分の 9 ページだけ。research.md の 7、005 の research.md の 5)。図の要素の数と画像の差分が無い(SC-007)。
