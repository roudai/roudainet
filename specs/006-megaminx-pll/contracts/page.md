# Contract: Megaminx PLL のページ

**Feature**: `006-megaminx-pll` | **Date**: 2026-11-25

## ページ

| パス | 出力のファイル | 見出し |
|---|---|---|
| `/megaminx/megaminx-pll` | `megaminx/megaminx-pll/index.html` | Megaminx PLL(h2) |

- 001 の共通レイアウト(ヘッダー、`.content.m-3` の本文、フッター)の中に表示する。
- ヘッダーの Megaminx のメニューの最後に `{ label: 'Megaminx PLL', to: '/megaminx/megaminx-pll' }`。

## タブ

- 並び:`基礎知識`、続けて `pllStages` の順の 27 個(F1 … X)。計 28 個。折り返して並べる。
- 各タブは `<button type="button" role="tab">`。並びの要素は `role="tablist"`。選んでいるタブは `aria-selected="true"`、見た目を変える(research.md の 6)。
- 中身の領域は `role="tabpanel"`、id は `pll-tab-<ハッシュ>`。選んでいない領域は `display: none`(`v-show`)。
- 静的生成した HTML には 28 個の領域をすべて含める。サーバー側は「基礎知識」を選んだ状態で出す。

### ハッシュ

| タブ | ハッシュ |
|---|---|
| 基礎知識 | `#basics` |
| 段階 | 名前の `–` を `-` にしたもの(`#F1`、`#F2-5`、`#K2`) |

- 読み込み時はルートのハッシュ(`useRoute().hash`。この時点の `location.hash` は Nuxt のルーターが一時的に外していて空のため)、`hashchange` では `location.hash` を読み、一致するタブを選ぶ。ハッシュ無し、または一致しないときは基礎知識。
- タブを押すと、`history.replaceState(history.state, '', '#<ハッシュ>')` でアドレスを変える。スクロールせず、履歴を増やさない。

## 基礎知識のタブ

`pllBasics` の節ごとに、書いた順で:

```html
<h3>偽ペア</h3>
<p>…</p>                       <!-- 段落ごと。空なら <p class="(灰色)">準備中</p> -->
<div>(例の図を横に並べ、折り返す)
  <figure>
    <div id="pll-basics-<節の番号>-<図の番号>"><svg …/></div>   <!-- MegaminxImage -->
    <figcaption>label</figcaption>                              <!-- label があるときだけ -->
  </figure>
</div>
```

- 例の図の手順:`pll` なら `PLL_CASES` のその名前の `alg`、`case` ならその値。`MegaminxImage` に `{ case: 手順 }` を渡す(既定の配色、100px)。

## 段階のタブ

```html
<h3>A (3 corner CP)</h3>        <!-- 段階の名前 (グループの説明) -->
<p>…</p>                        <!-- 段階の一言(pllStageNotes)。空なら <p class="text-[#7a7a7a]">準備中</p> -->
<!-- 段階のケースを覚える順に、MegaminxPllCase を並べる -->
```

### `MegaminxPllCase.vue`(1 ケース)

- 入力(props):`name`(ケース名)、`alg`(手順)、`recognition`(段落の配列)。
- 出力:

  ```html
  <h4>A1+</h4>
  <!-- MegaminxView:image="pll-A1+"、algorithm=[alg]、diagram={ case: alg }(003・005 と同じ 2 列) -->
  <p>…</p>                      <!-- 判断基準の段落ごと。空なら <p class="(灰色)">準備中</p> -->
  ```

- 段落は文字列として出す(`v-html` は使わない)。

## 誤りのとき

- data-model.md の「検証」のどれかに反するとき、例外を投げて静的生成を失敗させる。メッセージに、誤りのある値(ケース名など)を含める。
  - (実装時の追加)例外のメッセージは静的生成のログに出ず「[500] Server Error」だけになるため、同じメッセージを `console.error` でも出す(ログに ` ERROR  pll-recognition.ts に、PLL に無いケース名があります: Q9` のように出る)。
- 手順が読めないときは、`svg()` の `SyntaxError` で静的生成を失敗させる(005 と同じ)。

## 確認のスクリプト

- `scripts/pages.mjs`:`export const newPages = ['/megaminx/megaminx-pll']`(本番に無い新しいページ)。
- `scripts/verify-output.mjs`:`migratedPages` と `newPages` の各パスの `index.html` があることを確かめる。成功のメッセージのページ数も合わせる。
- `scripts/verify-parity.mjs`:変えない(`migratedPages` だけを比べる)。
