# Research: Megaminx PLL の判断基準のページ

**Feature**: `006-megaminx-pll` | **Date**: 2026-11-25

確かめるために動かしたスクリプトは、リポジトリの外(作業用のフォルダー)で実行し、コミットしていない。

## 1. ケースのデータの出どころ

- **Decision**:ケースの名前と手順は、`megaminx-image/cases` の `PLL_CASES` から読む。覚える順の段階とグループの説明は、MegaminxImageEditor のデータの値を、サイトのデータのファイルに写す。
- **Rationale**:
  - エディターの `js/pll-data.js`(`data/pll/algs_info.json` から生成)と `PLL_CASES` を比べ、151 ケースすべてで `name`、`group`、`alg`、`setup` が一致した(2026-11-25)。そのため、名前と手順は写さずにライブラリから読める。
  - `PLL_CASES` には覚える順(エディターの `stage`、`order`)が無い。エディターの `data/pll/learn_order.json`(27 段階、151 件)を写す。出典は、さむぶろぐ「Megaminx PLL 全手順会議議事録」前編(http://sumblog.net/archives/40859395.html)・後編(http://sumblog.net/archives/40977418.html)。
  - 段階の名前は、エディターの `js/case-sections.js` の `CaseSections.list(data, true)` が出す名前(F1、A、E、H、U、Z、Q、D、F2–5、J、M、N、T、V、W、Y、B、R、P、S、C、G、I、K2、L、K1、X)を、そのまま値として写す(名前を作る処理は持ち込まない)。
  - グループの説明は、エディターの `js/case-groups.js` の `CASE_GROUP_NOTES.pll`(25 件)を写す。どの段階も、ケースが 1 つのグループだけから成る(F1、F2–5 は F、K2、K1 は K)ため、段階の見出しの説明は、その段階のケースのグループで引ける。
  - ブラウザーの JS:`megaminx-image/cases` から `PLL_CASES` だけを import すると、OLL のデータは取り除かれ、約 24KB(圧縮前)が入る。
- **Alternatives considered**:
  - エディターの `pll-data.js` ごと写す(`stage`、`order` を含む)。名前と手順を二重に持つことになるため採らない。
  - 段階の名前をサイトで計算する(`stageLabel` を移す)。27 個の固定の値を写すほうが単純で、読み手にも分かりやすい。

## 2. 運営者が書くファイルの形

- **Decision**:
  - 判断基準:`app/data/megaminx/pll-recognition.ts` に `Record<string, string[]>`(ケース名 → 段落の配列)。151 ケースのキーを、覚える順に、空の配列で用意し、段階ごとにコメント(`// A (3 corner CP)` など)で区切る。
  - 基礎知識:`app/data/megaminx/pll-basics.ts` に、節の配列(見出し、段落の配列、例の図の配列)。最初は「偽ペア」「偽バー」の 2 節を空で用意する。
- **Rationale**:運営者の選択(1 つの TS ファイル)。新しい依存が要らず、型チェックで書き方の誤りに気づける。段落は文字列 1 つで 1 段落とし、HTML は書かない(`v-html` を使わず、文字列として出すため、そのまま安全に表示される)。
- **Alternatives considered**:ケースごとの Markdown(`@nuxt/content` などの依存が増えるため、運営者が選ばなかった)。

## 3. データの誤りに気づく方法

- **Decision**:ページを組み立てるときに、次を確かめ、誤りがあれば例外を投げて静的生成を失敗させる。
  - 段階のケースが、`PLL_CASES` の 151 件とちょうど 1 回ずつ一致する
  - 判断基準のキーが、すべて `PLL_CASES` の名前である
  - 基礎知識の例の図の `pll` が、`PLL_CASES` の名前である。`pll` と `case` のちょうど一方だけがある
  - 段階のケースのグループに、説明がある
- **Rationale**:`PLL_CASES` の `name` は `string` の型のため、ケース名の打ち間違いを型チェックでは見つけられない。静的生成の時点で止めれば、誤ったページを公開しない(spec の Edge Cases)。手順が読めないときは、005 と同じく、ライブラリの `svg()` が `SyntaxError` を投げて静的生成が失敗する。
- **Alternatives considered**:ケース名の型(151 個の文字列の和集合)を作る。ライブラリの型に無く、151 個を書き写すことになるため採らない。

## 4. タブと URL のハッシュ

- **Decision**:
  - タブは `<button type="button">` を並べ、選んでいるタブを `ref` で持つ。選んでいない段階は `v-show` で隠す。
  - タブを押したら、`history.replaceState(history.state, '', '#<ハッシュ>')` でアドレスだけを変える(ページの先頭へ飛ばない。履歴は増やさない)。
  - 読み込み時(`onMounted`)はルートのハッシュ(`useRoute().hash`)を、`hashchange` では `location.hash` を読んでタブを選ぶ。知らないハッシュと、ハッシュ無しは「基礎知識」。
  - (実装時の変更)当初は読み込み時にも `location.hash` を読む予定だった。実装して確かめると、`onMounted` の時点では、Nuxt のルーターが初期化の途中で `history.replaceState` でアドレスからハッシュを一時的に外しており(直後に戻す)、`location.hash` が空だった。ルートのハッシュは残っているので、そちらを読むようにした。
  - ハッシュは、基礎知識が `basics`、段階は名前の `–` を `-` にしたもの(`F2-5`)。中身の領域の id は、ハッシュと別の値(`pll-tab-F2-5`)にする。
- **Rationale**:
  - vue-router でハッシュを変えると、Nuxt の既定のスクロールの動き(ハッシュと同じ id の要素へスクロール)が働く。同じ id の要素が無いと、開発時にコンソールの警告が出る。`history.replaceState` なら、スクロールも警告も起きない。(実装時の記録)ただし、ハッシュ付きのアドレスを直接開いたときと、ハッシュの変更で vue-router が動いたとき(戻る・進む、アドレスの書き換え)は、既定のスクロールの動きが働き、開発時(`pnpm dev`)だけコンソールに `VUE_ROUTER_R0042`(その id の要素が無い)の警告が出る。本番の出力(`pnpm preview`)では出ず、表示と動作にも影響しない。消すにはサイト全体のスクロールの動き(`app/router.options.ts`)を変える必要があるため、この Spec では変えず、運営者に判断を仰ぐ。`history.state` を渡すので、vue-router の履歴の情報も保たれる。
  - 領域の id をハッシュと同じにすると、読み込み時にブラウザーがその位置へスクロールする。別の値にすれば、ページの先頭から表示できる。
  - サーバー側(prerender)は常に「基礎知識」を選んだ状態で出し、ブラウザーでハイドレーションの後に切り替える。そのため、ハイドレーションで食い違わない。
  - 履歴を増やさないので、戻るとこのページの前のページに戻る(タブごとに戻るのではない)。再読み込みでは、アドレスのハッシュから同じタブを開く(spec の US3)。
- **Alternatives considered**:
  - 段階ごとに別のページ(`/megaminx/megaminx-pll/a` など)にする。運営者は「ページの中のタブ」を求めているため採らない。
  - `<a href="#K2">` のリンクと CSS の `:target`。スクリプトが無くても切り替えられるが、ハッシュ無しのときに基礎知識を出す、選んでいるタブを目立たせる、といった動きを CSS だけで作ると複雑になるため採らない。スクリプトが無いときは、基礎知識だけが見えればよい(spec の Edge Cases)。

## 5. 1 ケースの表示

- **Decision**:新しい部品 `MegaminxPllCase.vue` で、ケース名(h4)、既存の `MegaminxView.vue`(画像と手順の 2 列)、判断基準の段落(`<p>`。空なら「準備中」)を並べる。`MegaminxView` には、`image` に `pll-<ケース名>`、`algorithm` に `[手順]`、`diagram` に `{ case: 手順 }` を渡す。
- **Rationale**:既存の Megaminx のページ(CP、EP)と同じ見た目(画像 100px、狭い欄で縮む、手順と横に並ぶ)になる。`MegaminxImage.vue` の 005 の仕組み(SVG を HTML に含める)をそのまま使える。描画先の id(`pll-A1+`)は、ページの中で重ならない。
- **Alternatives considered**:部品を作らず、ページに直接書く。151 回の繰り返しの中身が長くなるため、部品に分ける。

## 6. 見た目

- **Decision**:タブと「準備中」の見た目は、Tailwind のユーティリティのクラスで、部品とページの中だけで作る。`main.css` には足さない。
  - タブ:折り返して並べる(`flex flex-wrap gap-1`)。枠は `--color-bulma-border`、選んでいるタブはサイトのリンクの色(`--color-bulma-link`)の背景と白い文字。
  - 「準備中」:Bulma の grey(`#7a7a7a`)の文字。
- **Rationale**:ヘッダー(`AppHeader.vue`)も Tailwind のユーティリティで作っている。`main.css` は Bulma の再現のためのファイルで、新しい見た目を混ぜない。
- **Alternatives considered**:Bulma の `.tabs` を `main.css` に再現する。現行サイトに無い部品で、再現の対象ではないため採らない。

## 7. 確認のスクリプト

- **Decision**:`scripts/pages.mjs` に、本番に無い新しいページの一覧 `newPages`(`/megaminx/megaminx-pll`)を足す。`verify-output.mjs` は `migratedPages` と `newPages` の両方を確かめる。`verify-parity.mjs` は `migratedPages` だけのまま。
- **Rationale**:新しいページは本番と比べられない(spec の FR-012)。ヘッダーは本文の領域(`.content.m-3`)の外にあり、パリティの確認の対象外のため、メニューに項目を足しても既存のページの結果は変わらない(SC-007)。
- **Alternatives considered**:`migratedPages` に足す。パリティの確認で、本番に無いページとして失敗するため採らない。

## 8. 大きさ

- 151 ケースの SVG(100px)は、1 つ約 2.5KB で、HTML は圧縮前で約 400KB 増える。図の形が同じで色だけが違うため、gzip 後は数十 KB 程度の見込み(005 の 4 ページの測定:46 枚で gzip 後 +数 KB)。実装の後に測って、quickstart に記録する。
- spike:新しい依存は無い(megaminx-image は 005 で検証済み。`megaminx-image/cases` は同じパッケージの別の入口)。原則 VIII の spike は不要。
