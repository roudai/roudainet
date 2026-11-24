---

description: "Megaminx の図を自作ライブラリで描くタスク一覧"
---

# Tasks: Megaminx の図を自作ライブラリで描く

**Input**: Design documents from `/specs/005-megaminx-image/`

**Prerequisites**: plan.md(必須)、spec.md(ユーザーストーリー)、research.md、data-model.md、contracts/diagrams.md、quickstart.md

**Tests**: Spec で自動テストを求めていないため、テストのタスクは作らない。品質ゲートは Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`、`scripts/verify-parity.mjs`(手動)と、スクリプトの有無を切り替えた表示の確認と目視である。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並行して実行できる(別ファイルで、未完了のタスクに依存しない)
- **[Story]**: タスクが属するユーザーストーリー(US1〜US3)
- 説明には、正確なファイルパスを含める

## Path Conventions

- アプリは、リポジトリのルートの `app/`(Nuxt 4 の構成)。スクリプトは `scripts/`
- `legacy/` は読み取り専用で、変更しない(原則 VI)。003 の文書(`specs/003-megaminx-clock-pages/`)も、過去の記録として変えない
- 一度だけの変換や確認のスクリプトは、リポジトリの外(scratchpad)で実行し、コミットしない
- 図以外(見出し、本文、手順の文字列 `megacase`・`megacase_view`、リンク、ページのテンプレート)は変えない(FR-009)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 新しいライブラリの追加

- [X] T001 `pnpm add megaminx-image@1.0.0` で、`megaminx-image` を `package.json` の `dependencies` に `1.0.0`(固定)で追加し、`pnpm-lock.yaml` を更新する。`@resvg/resvg-js` は入れない。`yarn.lock` や `package-lock.json` が作られていないことを確認する(原則 V、research.md の 7)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 図の指定のデータを、ライブラリの形(`{ case, oll? }`)に置き換える。図の部品は、この形を前提にする

**⚠️ CRITICAL**: このフェーズが終わるまで、図の部品(US1)に着手しない

- [X] T002 `app/data/megaminx/types.ts` の `MegaminxDiagram` を、data-model.md の形(`case: string`、`oll?: true`)に置き換える。`sr-puzzlegen` の型の import を消し、先頭の説明を「megaminx-image の `svg()` に渡す図の指定。配色と大きさは `MegaminxImage.vue` で決める(005)」という内容に改める
- [X] T003 一度だけの変換スクリプト(scratchpad に置く。Node 24 は `.ts` の型を取り除いて読める)で、`app/data/megaminx/{cp,co,ep,eo}.ts` の `diagrams` を書き換える。T002 に依存する
  - 書き換え前のファイルを import し、各図の `puzzle.case` をそのまま `case` に、`puzzle.mask` があれば `oll: true` にする。`width`、`height`、`scheme`、`mask`、`arrows` は書き出さない
  - `megacase` と `megacase_view` の部分、キー(`megacase1` など)とその順は変えない。文字列は今の書き方(単一引用符、`'` を含むものは二重引用符)に合わせ、Prettier の形にする
  - 各ファイルの先頭の説明は、「手順の文字列は移植元からそのまま写した(003)。図の指定は 005 で megaminx-image の形に書き換えた」という内容に改める
  - 書き換えた後のファイルを読み直し、46 個すべてで `case` が書き換え前と同じであること、`oll: true` が CO の 16 個と EO の 3 個(計 19 個)だけに付いていることを確かめ、結果(一致 46 / 46、OLL 型 19)を出す(data-model.md、quickstart の 4)

**Checkpoint**: データが新しい形になり、`sr-puzzlegen` の型に頼らなくなる(この時点では `MegaminxImage.vue` の型チェックが通らなくてよい。T004 で直す)

---

## Phase 3: User Story 1 - 図がページと同時に表示される (Priority: P1) 🎯 MVP

**Goal**: 46 個の図を、静的生成した HTML に SVG として含める。スクリプトが無くても表示され、レイアウトが動かない

**Independent Test**: `pnpm generate` の後、4 ページの HTML に SVG が計 46 個あり、スクリプトを無効にしたブラウザーで 46 個すべてが表示される(quickstart の 2、3)

- [X] T004 [US1] `app/components/MegaminxImage.vue` を、contracts/diagrams.md の「図」の形に書き換える。T003 に依存する
  - `megaminx-image` から `svg` を import し、`computed` で `svg({ case: diagram.case, size: 100 })` の文字列を作り、`<div :id="id" v-html="markup"></div>` で出す(配色の切り替えは US2 の T006 で足す)
  - `diagram` が `undefined` のときは、空の文字列を出し、コンソールに `図(${id})の指定が見つかりません` のエラーを出す(今と同じ文言)。`svg()` の例外は捕まえない
  - `onMounted` と `sr-puzzlegen` の動的な import、try/catch を消す
  - `v-html` の行の直前に `<!-- eslint-disable-next-line vue/no-v-html -- 中身は megaminx-image が作る SVG で、入力はサイトのデータの手順だけ(訪問者の入力を含まない) -->` を置く(research.md の 6)
  - 先頭の説明を、「megaminx-image の `svg()` で SVG を作り、静的生成した HTML に含める。サーバー側とブラウザーで同じ文字列になる(005)」という内容に改める
- [X] T005 [US1] `pnpm typecheck` と `pnpm generate` を実行し、quickstart の 2 の数え方で、`.output/public/megaminx/megaminx-{cp,co,ep,eo}/index.html` に SVG が CP 15、CO 16、EP 12、EO 3(計 46)含まれることを確かめる。続けて `pnpm preview` と `pnpm dev` で 4 ページを開き、スクリプトの有効と無効の両方で 46 個すべてが表示され、コンソールに警告とエラー(ハイドレーションの不一致を含む)が無いことを確かめる(quickstart の 3)。T004 に依存する

**Checkpoint**: US1 だけで、図が HTML に含まれて表示される(CO と EO は、この時点ではまだ既定の配色)

---

## Phase 4: User Story 2 - 図がライブラリの見た目で、同じケースを示す (Priority: P1)

**Goal**: CO と EO を OLL 用の既定の配色にし、4 ページの図の見た目(配色、矢印なし、100px)を確かめる

**Independent Test**: 4 ページを開き、CP と EP がライブラリの既定の配色、CO と EO が上面は薄い灰色・ほかは濃い灰色で、矢印が無く、幅 100px であることを目で確かめる(quickstart の 4)

- [X] T006 [US2] `app/components/MegaminxImage.vue` で、`diagram.oll` が `true` のときだけ `scheme: ollScheme()`(引数なし)を `svg()` に渡す。`oll` が無いときは `scheme` を渡さない(`scheme: undefined` も渡さない)。`ollScheme` は `megaminx-image` から import する(contracts/diagrams.md の表)。T004 に依存する
- [X] T007 [US2] `pnpm generate` と `pnpm preview` の後、quickstart の 4 のとおり、4 ページの図の配色、矢印が無いこと、幅 100px、図と手順の文字列の並びを、狭い画面(幅 375px 程度)と広い画面の両方で目で確かめる。キューブ系のページ(`/pll/pll` など)の図が今までどおり表示されることも確かめる。T006 に依存する

**Checkpoint**: US1 と US2 で、訪問者に見える変更がすべてそろう

---

## Phase 5: User Story 3 - 運営者が変更を確かめ、使わないライブラリを外せる (Priority: P2)

**Goal**: `sr-puzzlegen` を外し、パリティの確認が SVG 入りの図を数えられるようにする

**Independent Test**: `pnpm verify:parity` で、Megaminx の 4 ページに図の数の差分が無く、既知の 3 件以外の差分が 0 件。`package.json` に `sr-puzzlegen` が無く、`sr-visualizer` がある(quickstart の 2、5)

- [X] T008 [P] [US3] `pnpm remove sr-puzzlegen` で、`sr-puzzlegen` を `package.json` と `pnpm-lock.yaml` から外す。`app/` と `scripts/` に `sr-puzzlegen` の参照が残っていないことを `grep -rn sr-puzzlegen app scripts nuxt.config.ts` で確かめる。`sr-visualizer` は残す(FR-010)。T004 に依存する
- [X] T009 [P] [US3] `scripts/verify-parity.mjs` の `summarize()` の図の数え方を、id を持ち、中身が空か SVG 1 つだけの div を数える正規表現(`/<div\b[^>]*\bid="[^"]+"[^>]*>\s*(?:<svg\b[\s\S]*?<\/svg>\s*)?<\/div>/g`)に変え、直前のコメントを「図の描画先: id を持つ div。中身は空(cubePNG)か、SVG 1 つ(megaminx-image、005)」という内容に改める(contracts/diagrams.md の「パリティの確認」)
- [X] T010 [US3] `pnpm generate` の後、`pnpm verify:parity` を実行し、Megaminx の 4 ページで図の要素の数の差分が無いこと、差分が `/megaminx/megaminx-cp` の既知の 3 件(「並行交換(1)」「並行交換(2)」「コーナー2セットが並行移動」が現行サイトに見つからない)だけであることを確かめる(quickstart の 5)。`grep -rl "megaminx-top" .output/public/_nuxt/` が何も出さないことも確かめる。T008、T009 に依存する

**Checkpoint**: すべてのユーザーストーリーがそろう

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 品質ゲートと文書の仕上げ

- [X] T011 `pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify` を実行し、すべて成功し、lint に警告が無いことを確かめる(SC-007、quickstart の 1)
- [X] T012 [P] `specs/005-megaminx-image/spec.md` の **Status** を `Implemented` にし、実装中に契約や手順から変えた点があれば、`plan.md`、`contracts/diagrams.md`、`quickstart.md` に「(実装時の変更、日付)」として追記する

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup(Phase 1)**:依存なし
- **Foundational(Phase 2)**:T002 は T001 と独立だが、T003 は T002 に依存する。US1 をブロックする
- **US1(Phase 3)**:Phase 2 の後
- **US2(Phase 4)**:T004(US1 の部品)の後。同じファイルを変えるため、US1 と並行しない
- **US3(Phase 5)**:T008 は T004 の後(`sr-puzzlegen` の import が消えてから外す)。T009 は Phase 2 と独立に、いつでも始められる
- **Polish(Phase 6)**:すべてのストーリーの後

### User Story Dependencies

- **US1(P1)**:Foundational の後。ほかのストーリーに依存しない
- **US2(P1)**:US1 の `MegaminxImage.vue` に、配色の切り替えを足す
- **US3(P2)**:依存の削除は US1 の後。パリティの確認の直しは独立

### Parallel Opportunities

- T002 は T001 と並行できる(別ファイル)
- T008 と T009 は並行できる(別ファイル)
- T009 は、Phase 2 以降いつでも、US1・US2 と並行できる
- T012 は T011 と並行できる

---

## Parallel Example: User Story 3

```bash
# T004 が終わった後、次の 2 つを並行して進められる
Task: "T008 [P] [US3] pnpm remove sr-puzzlegen と参照の確認"
Task: "T009 [P] [US3] scripts/verify-parity.mjs の図の数え方を広げる"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1(T001)と Phase 2(T002、T003)を終える
2. Phase 3(T004、T005)で、図が HTML に含まれて表示されることを確かめる
3. **STOP and VALIDATE**:スクリプトを無効にして 46 個が表示されることを確かめる

### Incremental Delivery

1. Setup + Foundational → データが新しい形になる
2. US1 → 図が HTML に含まれる(MVP)
3. US2 → CO と EO が OLL 用の配色になり、見た目がそろう
4. US3 → `sr-puzzlegen` を外し、パリティの確認が通る
5. Polish → 品質ゲートと文書

公開(`main` へのマージ)は、US1〜US3 と Polish がすべて終わってから、一度に行う(運営者の決定:4 ページを一度に入れ替える)。

---

## Notes

- [P] のタスクは、別ファイルで、未完了のタスクに依存しない
- 各タスクまたは論理的なまとまりの後でコミットする(コミットメッセージは日本語)
- 事前の調査(research.md の 1)で、46 個すべての図で、ステッカーの面が今の図と一致することを確かめている。`sr-puzzlegen` を外した後は比べられないため、実装では `case` の値が変わっていないこと(T003)で担保する
