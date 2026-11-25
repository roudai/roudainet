---

description: "Megaminx PLL の判断基準のページのタスク一覧"
---

# Tasks: Megaminx PLL の判断基準のページ

**Input**: Design documents from `/specs/006-megaminx-pll/`

**Prerequisites**: plan.md(必須)、spec.md(ユーザーストーリー)、research.md、data-model.md、contracts/page.md、quickstart.md

**Tests**: Spec で自動テストを求めていないため、テストのタスクは作らない。品質ゲートは Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs` と、ブラウザーでの確認(quickstart.md)である。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並行して実行できる(別ファイルで、未完了のタスクに依存しない)
- **[Story]**: タスクが属するユーザーストーリー(US1〜US3)
- 説明には、正確なファイルパスを含める

## Path Conventions

- アプリは、リポジトリのルートの `app/`(Nuxt 4 の構成)。スクリプトは `scripts/`
- エディターは `/Users/roudainet/GitHub/roudainet/MegaminxImageEditor`(読むだけ。変更しない)
- 一度だけの変換や確認のスクリプトは、リポジトリの外(scratchpad)で実行し、コミットしない
- 既存のページの本文、`MegaminxImage.vue`、`MegaminxView.vue`、`main.css`、`verify-parity.mjs`、`legacy/` は変えない

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 新しいページを出力の検証の対象にする

- [X] T001 `scripts/pages.mjs` に、本番に無い新しいページの一覧 `export const newPages = ['/megaminx/megaminx-pll']` を、「specs/006-megaminx-pll の新しいページ。本番に無いため、パリティの確認(verify-parity.mjs)の対象にしない」というコメントを付けて足す。`migratedPages` には含めない。`scripts/verify-output.mjs` は、`migratedPages` と `newPages` の両方の各パスの `index.html` があることを確かめ、成功のメッセージを「移植済みの N ページと新しい M ページ」の形にする(contracts/page.md の「確認のスクリプト」)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: ページと運営者が書くファイルのデータを用意する

**⚠️ CRITICAL**: このフェーズが終わるまで、ページの部品(US1 以降)に着手しない

- [X] T002 一度だけの変換スクリプト(scratchpad に置く)で、`app/data/megaminx/pll-stages.ts` と `app/data/megaminx/pll-recognition.ts` を書き出す(data-model.md、research.md の 1)
  - 読むもの:エディターの `data/pll/learn_order.json`(段階ごとのケース名)、`js/pll-data.js` と `js/case-sections.js`(`CaseSections.list(data, true)` の `label` を段階の名前にする)、`js/case-groups.js` の `CASE_GROUP_NOTES.pll`(`window` を立てて読み込むか、ファイルの中身から取り出す)
  - `pll-stages.ts`:`PllStage` の型、`pllStages`(27 件、覚える順。`label` と `cases`)、`pllGroupNotes`(25 件)を書き出す。先頭に「覚える順は、さむぶろぐ「Megaminx PLL 全手順会議議事録」前編(http://sumblog.net/archives/40859395.html)・後編(http://sumblog.net/archives/40977418.html)による。値は MegaminxImageEditor の data/pll/learn_order.json、js/case-sections.js、js/case-groups.js から写した(006)」という内容のコメントを書く
  - `pll-recognition.ts`:先頭に、書き方の説明のコメント(「ケース名ごとに、判断基準の段落を文字列の配列で書く。1 つの文字列が 1 段落。空の配列は「準備中」と表示する。HTML は書けない」)を書き、`export const pllRecognition: Record<string, string[]> = { … }` に 151 件のキーを覚える順に空の配列で並べる。各段階の前に `// <段階の名前> (<グループの説明>)` のコメントを置く
  - 書き出した後に `pnpm exec prettier --write` を当て、スクリプトの中で、27 段階のケースが `megaminx-image/cases` の `PLL_CASES` の 151 件とちょうど 1 回ずつ一致すること、各段階のケースが 1 つのグループだけであること、`pllRecognition` のキーが 151 件であることを確かめて結果を出す
- [X] T003 [P] `app/data/megaminx/pll-basics.ts` を作る。data-model.md の `PllExample`、`PllBasicsSection` の型と、`pllBasics`(`{ title: '偽ペア', paragraphs: [], examples: [] }`、`{ title: '偽バー', paragraphs: [], examples: [] }`)を書く。先頭に書き方の説明のコメント(節は書いた順に表示する。段落は 1 つの文字列が 1 段落で、空なら「準備中」。例の図は `pll`(PLL のケース名)か `case`(そのケースを揃える手順)のどちらか一方と、任意の `label`)を書く

**Checkpoint**: データがそろい、ページを組み立てられる

---

## Phase 3: User Story 1 - 覚える順の段階ごとに、PLL のケースを見る (Priority: P1) 🎯 MVP

**Goal**: タブで 27 段階を切り替え、各段階のケースを、名前・画像・手順で表示する

**Independent Test**: `pnpm generate` の後、ページの HTML に SVG が 151 個、タブが 28 個ある。ブラウザーで 27 個の段階のタブを押し、見出し(「A (3 corner CP)」など)と覚える順のケースが出る(quickstart の 2、3)

- [X] T004 [P] [US1] `app/components/MegaminxPllCase.vue` を作る。props は `name`(string)、`alg`(string)、`recognition`(string[])。`<h4>{{ name }}</h4>` と `<MegaminxView :image="\`pll-${name}\`" :algorithm="[alg]" :diagram="{ case: alg }" />` を並べる(判断基準の表示は US2 の T007 で足す。`recognition` は、この時点では受け取るだけ)。先頭に「Megaminx PLL のページの 1 ケース(006)」の説明を書く(contracts/page.md の `MegaminxPllCase.vue`)
- [X] T005 [US1] `app/pages/megaminx/megaminx-pll.vue` を作る。T002、T003、T004 に依存する(contracts/page.md、research.md の 3、4、6)
  - `<script setup>`:`PLL_CASES`(`megaminx-image/cases`)、`pllStages`、`pllGroupNotes`、`pllRecognition` を import し、表示用の値を組み立てる。段階ごとに `hash`(`label` の `–` を `-` に)、見出し(`${label} (${pllGroupNotes[先頭のケースのグループ]})`)、ケースの `name`、`alg`、`recognition` の配列
  - 組み立てるときに data-model.md の「検証」(段階が 151 件をちょうど 1 回ずつ含む、判断基準のキーが PLL_CASES の名前、段階のグループに説明がある)を確かめ、反するときは誤りの値を含むメッセージで `throw new Error(…)` する。基礎知識の例の図の検証は US2 の T008 で足す
  - タブ:`<div role="tablist">` に、先頭の「基礎知識」(`hash: 'basics'`)と 27 段階の `<button type="button" role="tab" :aria-selected>` を並べる。`const active = ref('basics')`、押すと `active` を変える(ハッシュの扱いは US3 の T011 で足す)。Tailwind のクラスで、折り返して並べ(`flex flex-wrap gap-1`)、枠は `border-bulma-border`、選んでいるタブは `bg-bulma-link text-white border-bulma-link`。上下に少し余白
  - 中身:`<h2>Megaminx PLL</h2>`、タブ、基礎知識の領域(`id="pll-tab-basics"`、この時点では `pllBasics` の節の見出し `<h3>` だけ)、段階ごとの領域(`id="pll-tab-<hash>"`、`role="tabpanel"`、`v-show="active === hash"`)。段階の領域には `<h3>` の見出しと、ケースごとの `<MegaminxPllCase>`
- [X] T006 [US1] `pnpm typecheck` と `pnpm generate` を実行し、`.output/public/megaminx/megaminx-pll/index.html` に `<svg xmlns` が 151 個、`role="tab"` が 28 個あることを確かめる。`pnpm preview` でページを開き、27 個の段階のタブを押して、各段階の見出しとケース(名前、画像、手順)が覚える順に出ること、ほかの段階が隠れることを確かめる(quickstart の 2、3)。T005 に依存する

**Checkpoint**: US1 だけで、151 ケースを段階ごとに見られる

---

## Phase 4: User Story 2 - 各ケースの判断基準と、基礎知識を読む (Priority: P1)

**Goal**: 判断基準と基礎知識の段落・例の図を表示し、空のところに「準備中」を出す

**Independent Test**: 最初の表示で基礎知識の「偽ペア」「偽バー」が「準備中」で出る。試しに書き足すと、その位置に表示される(quickstart の 4)

- [X] T007 [P] [US2] `app/components/MegaminxPllCase.vue` で、`MegaminxView` の下に、`recognition` の段落を `<p v-for>` で出す。空のときは `<p class="text-[#7a7a7a]">準備中</p>` を出す(contracts/page.md)。T004 に依存する
- [X] T008 [US2] `app/pages/megaminx/megaminx-pll.vue` の基礎知識の領域を仕上げる。T005 に依存する
  - `pllBasics` の節ごとに、`<h3>{{ title }}</h3>`、段落の `<p>`(空なら T007 と同じ「準備中」)、例の図を並べる
  - 例の図:`<div class="flex flex-wrap gap-4">` の中に、図ごとに `<figure class="text-center">`、`<MegaminxImage :id="\`pll-basics-${節}-${図}\`" :diagram="{ case: 手順 }" />`、`label` があれば `<figcaption>`。手順は `pll` なら `PLL_CASES` のその名前の `alg`、`case` ならその値
  - 組み立てるときに、例の図が `pll` と `case` のちょうど一方を持つこと、`pll` が `PLL_CASES` の名前であることを確かめ、反するときは誤りの値を含むメッセージで `throw` する(data-model.md の「検証」)
- [X] T009 [US2] quickstart の 4 のとおり、`pll-recognition.ts` の `'A1+'` に 2 段落、`pll-basics.ts` の「偽ペア」に段落 1 つと例の図 2 つ(`{ pll: 'A1+', label: '例' }`、`{ case: "R U R' U'" }`)を試しに書き、`pnpm generate` と `pnpm preview` でその位置に表示されることを確かめる。続けて、存在しないケース名 `'Q9'` を判断基準のキーに足すと `pnpm generate` が失敗し、メッセージに `Q9` が出ることを確かめる。確かめたら、書き足した内容をすべて戻し(`git diff app/data/megaminx/pll-recognition.ts app/data/megaminx/pll-basics.ts` が T002・T003 の後の状態と同じ)、`pnpm generate` し直す。T007、T008 に依存する

**Checkpoint**: US1 と US2 で、ページの中身がそろう

---

## Phase 5: User Story 3 - 段階を直接開き、メニューからたどる (Priority: P2)

**Goal**: ヘッダーのメニューからページを開け、タブを URL のハッシュで直接開ける

**Independent Test**: メニューの「Megaminx PLL」でページが開く。`#K2`、`#F2-5`、`#basics`、`#nothing` を直接開いたとき、タブを押したとき、再読み込みしたときに、契約どおりのタブが出る(quickstart の 3)

- [X] T010 [P] [US3] `app/data/navigation.ts` の Megaminx の `items` の最後(`Megaminx CP` の後)に `{ label: 'Megaminx PLL', to: '/megaminx/megaminx-pll' }` を足す。この配列の先頭のコメント(「現行サイトと同一にする」)の後に、「Megaminx PLL は 006 で足した新しいページ」という注記を足す
- [X] T011 [US3] `app/pages/megaminx/megaminx-pll.vue` に、ハッシュの扱いを足す(contracts/page.md の「ハッシュ」、research.md の 4)。T008 に依存する
  - `selectFromHash()`:`location.hash` から `#` を除いた値が、基礎知識か段階の `hash` のどれかと一致すれば `active` にし、一致しなければ `'basics'`
  - `onMounted` で `selectFromHash()` を呼び、`window.addEventListener('hashchange', selectFromHash)`。`onBeforeUnmount` で外す
  - タブを押したら、`active` を変え、`history.replaceState(history.state, '', \`#${hash}\`)` を呼ぶ
- [X] T012 [US3] `pnpm generate` と `pnpm preview` で、quickstart の 3 のタブとハッシュの項目(直接開く、押す、再読み込み、存在しないハッシュ)と、ヘッダーのメニューの項目を確かめる。`pnpm dev` でも開き、コンソールに警告とエラー(ハイドレーションの不一致を含む)が無いことを確かめる。T010、T011 に依存する

**Checkpoint**: すべてのユーザーストーリーがそろう

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 品質ゲート、見た目、パリティ、文書の仕上げ

- [X] T013 `pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify` を実行し、すべて成功し、lint に警告が無いことを確かめる(SC-008、quickstart の 1)
- [X] T014 幅 375px 程度と広い画面で、基礎知識と、ケースの多い段階(S、C、I)を開き、タブが折り返して並び、ページが横にはみ出さず、画像と手順が重ならないことを確かめる。スクリプトを無効にして、見出しと基礎知識のタブの中身が表示されることを確かめる(quickstart の 3、SC-005)
- [X] T015 [P] `pnpm verify:parity` を実行し、結果が 005 の公開後と同じ(既知の差分の 9 ページだけで、図の要素の数と画像の差分が無い)ことを確かめる(quickstart の 5、SC-007)
- [X] T016 生成した `megaminx/megaminx-pll/index.html` の大きさ(圧縮前と gzip 後)を測り、`specs/006-megaminx-pll/quickstart.md` の 2 に「(実装時の記録、日付)」として書く。`specs/006-megaminx-pll/spec.md` の **Status** を `Implemented` にし、実装中に契約や手順から変えた点があれば、`plan.md`、`contracts/page.md`、`quickstart.md` に「(実装時の変更、日付)」として追記する

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup(Phase 1)**:依存なし
- **Foundational(Phase 2)**:T002 と T003 は並行できる。US1 をブロックする
- **US1(Phase 3)**:Phase 2 の後。T004 は T002・T003 と並行できる(データを import しない部品のため)
- **US2(Phase 4)**:T007 は T004 の後、T008 は T005 の後
- **US3(Phase 5)**:T010 はいつでも始められる。T011 は T008 の後(同じページのファイル)
- **Polish(Phase 6)**:すべてのストーリーの後

### User Story Dependencies

- **US1(P1)**:Foundational の後。ほかのストーリーに依存しない
- **US2(P1)**:US1 の部品とページに、判断基準と基礎知識の表示を足す
- **US3(P2)**:メニューは独立。ハッシュは US1 のページのタブに足す

### Parallel Opportunities

- T001、T002、T003、T004、T010 は、互いに別のファイルで、並行できる
- T007(部品)と T008(ページ)は別のファイルで、並行できる
- T015 は T013、T014 と並行できる

---

## Parallel Example: Foundational と US1 の部品

```bash
# 次の 4 つは、別のファイルで並行して進められる
Task: "T002 pll-stages.ts と pll-recognition.ts をエディターのデータから書き出す"
Task: "T003 [P] pll-basics.ts を作る"
Task: "T004 [P] [US1] MegaminxPllCase.vue を作る"
Task: "T010 [P] [US3] navigation.ts に Megaminx PLL を足す"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1(T001)と Phase 2(T002、T003)を終える
2. Phase 3(T004〜T006)で、151 ケースを段階のタブで見られることを確かめる
3. **STOP and VALIDATE**:27 段階のタブを順に押して、151 ケースが重複なく出ることを確かめる

### Incremental Delivery

1. Setup + Foundational → データと確認のスクリプトがそろう
2. US1 → 段階のタブで 151 ケースを見られる(MVP)
3. US2 → 判断基準と基礎知識の枠と「準備中」が出る
4. US3 → メニューとハッシュで直接開ける
5. Polish → 品質ゲート、見た目、パリティ、文書

公開(`main` へのマージ)は、運営者が確認用のサーバーで確かめ、指示してから行う。

---

## Notes

- [P] のタスクは、別ファイルで、未完了のタスクに依存しない
- 各タスクまたは論理的なまとまりの後でコミットする(コミットメッセージは日本語)。コミットは運営者の指示で行う
- 判断基準と基礎知識の文章は、この Spec では書かない(FR-013)。T009 で試しに書いたものは必ず戻す
