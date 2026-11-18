---

description: "Megaminx、Clock、Other のページの移植のタスク一覧"
---

# Tasks: Megaminx、Clock、Other のページの移植

**Input**: Design documents from `/specs/003-megaminx-clock-pages/`

**Prerequisites**: plan.md(必須)、spec.md(ユーザーストーリー)、research.md、data-model.md、contracts/pages.md、quickstart.md

**Tests**: Spec で自動テストを求めていないため、テストのタスクは作らない。品質ゲートは Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`、`scripts/verify-parity.mjs`(手動)と、現行サイトとの並べた撮影と目視である。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並行して実行できる(別ファイルで、未完了のタスクに依存しない)
- **[Story]**: タスクが属するユーザーストーリー(US1〜US4)
- 説明には、正確なファイルパスを含める

## Path Conventions

- アプリは、リポジトリのルートの `app/`(Nuxt 4 の構成)。スクリプトは `scripts/`
- 移植元は `legacy/pages/{megaminx,clock,other}/` と `legacy/components/MegaminxView.vue`。`legacy/` は読み取り専用で、変更しない(原則 VI)
- 共通の移植ルール(すべてのページのタスクに適用する):
  - 見出し、本文、手順の文字列、リンクは、移植元のファイルからそのまま写す。記号(`'`、`′`、括弧、全角記号)も変えない。直すのは spec.md の「現行の表記から直した箇所」にある修正だけ
  - テンプレートの Bulma のクラス名は、そのまま使う。必要なクラスは 002 で `app/assets/css/main.css` に再現済みで、CSS は追加しない(research.md の 3)
  - 移植中に、ほかの明らかな誤字を見つけた場合は、直して spec.md の表に追記する。判断に迷うものは、直さずに候補として表に追記する(FR-007)
  - データの変換スクリプトは、002 と同じく、リポジトリの外(scratchpad)で実行し、生成した `.ts` だけをコミットする

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 依存の追加

- [ ] T001 `pnpm add sr-puzzlegen@1.0.4` で、`sr-puzzlegen` を `package.json` の `dependencies` に追加し、`pnpm-lock.yaml` を更新する。`yarn.lock` や `package-lock.json` が作られていないことを確認する(原則 V)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Megaminx のページが使う、型、図のコンポーネント、確認のスクリプトの対象の追加

**⚠️ CRITICAL**: このフェーズが終わるまで、Megaminx のページの移植を始めない(Clock と Other のページは、T005 の後なら始めてよい)

- [ ] T002 [P] `app/data/megaminx/types.ts` を作成し、data-model.md の `MegaminxDiagram` を定義する。`sr-puzzlegen` の `PNGVisualizerOptions`(または `width`、`height` と `MegaminxOptions` の組み合わせ)をもとにし、データを素の値で書けるようにする。T001 に依存する
- [ ] T003 `app/components/MegaminxImage.vue` を作成する。props で描画先の `id` と `MegaminxDiagram` を受け取り、サーバー側では、その id を持つ空の div だけを出力する(大きさは確保しない)。`onMounted` で `sr-puzzlegen` を動的に `import` し、`PNG(要素, Type.MEGAMINX_TOP, diagram)` で描画する。図の指定がない場合と、描画に失敗した場合は、コンソールにエラーを出し、その要素を空のままにする(contracts/pages.md の「図」)。002 の `app/components/CubeImage.vue` と同じ形にする。T002 に依存する
- [ ] T004 `app/components/MegaminxView.vue` を作成する。テンプレートとクラス名は `legacy/components/MegaminxView.vue` と同一にし、描画先の `<div :id="image">` を `<MegaminxImage :id="image" :diagram="diagram" />` に置き換える。props は `image`(string)、`algorithm`(string[]。1 つ目を表示する)、`diagram`(MegaminxDiagram)。T003 に依存する
- [ ] T005 [P] `scripts/pages.mjs` に、この Spec の 8 パスを `puzzlePages`(megaminx 4、clock 1)と `otherPages`(other 3)として追加し、`migratedPages` に含める。`scripts/verify-parity.mjs` の `specFiles` に `specs/003-megaminx-clock-pages/spec.md` を追加する(research.md の 5)

**Checkpoint**: 図のコンポーネントと確認のスクリプトの対象がそろい、ページの移植を始められる

---

## Phase 3: User Story 1 - Megaminx の手順ページで、図と手順を見比べられる (Priority: P1) 🎯 MVP

**Goal**: Megaminx の 4 ページ(計 46 ケース)を、現行と同じ見出し、手順の文字列、図で表示する

**Independent Test**: `pnpm generate` の後、`pnpm verify:parity /megaminx/megaminx-eo /megaminx/megaminx-co /megaminx/megaminx-ep /megaminx/megaminx-cp` が差分0件で終わり、ブラウザーで 4 ページのすべての図が描画される

### Implementation for User Story 1

- [ ] T006 [US1] データの変換スクリプトを、scratchpad に作成して実行する(research.md の 2)。`legacy/pages/megaminx/*.vue` の 4 ファイルについて、`data()` と `mounted()` を、`sr-puzzlegen` の `PNG` と `Type` のスタブの上で実行し、`PNG` に渡された値を、呼び出しの時点でディープコピーして、セレクターから `#` を除いた id(`megacase1` など)ごとに記録する。手順の文字列(`megacase`、ある場合は `megacase_view`)は、移植元の構造と名前のまま出力する。出力先は `app/data/megaminx/eo.ts`、`co.ts`、`ep.ts`、`cp.ts`(data-model.md の対応表)。`diagrams` の数が EO 3、CO 16、EP 12、CP 15 であることを確認する。T002 に依存する
- [ ] T007 [P] [US1] `app/pages/megaminx/megaminx-eo.vue` を作成する。`legacy/pages/megaminx/megaminx-eo.vue` のテンプレートを写し、`<megaminx-view image="X" :algorithm="...">` を `<MegaminxView image="X" :algorithm="..." :diagram="diagrams['X']" />` に置き換える。データは `app/data/megaminx/eo.ts` から import する。T004、T006 に依存する
- [ ] T008 [P] [US1] `app/pages/megaminx/megaminx-co.vue` を、T007 と同じ方法で作成する(データは `co.ts`)。T004、T006 に依存する
- [ ] T009 [P] [US1] `app/pages/megaminx/megaminx-ep.vue` を、T007 と同じ方法で作成する(データは `ep.ts`。`megacase_view` を参照する箇所は移植元のまま)。T004、T006 に依存する
- [ ] T010 [P] [US1] `app/pages/megaminx/megaminx-cp.vue` を、T007 と同じ方法で作成する(データは `cp.ts`。`megacase_view` と `<h5>` は移植元のまま)。T004、T006 に依存する
- [ ] T011 [US1] US1 の確認: `pnpm lint`、`pnpm typecheck`、`pnpm generate` が成功し、`pnpm verify:parity` で 4 パスの差分が0件であることを確認する。preview を起動し、本番と並べた撮影(1280px と 375px)で、4 ページの高さが一致し、空欄の図が0件であることを確認する(SC-002、SC-003、SC-004)。CO の 16 ケースで、表示が体感で遅くないことも確認する(Edge Cases)

**Checkpoint**: Megaminx の 4 ページが、現行と同じに表示される

---

## Phase 4: User Story 2 - Clock と Other の文章のページを読める (Priority: P2)

**Goal**: Clock の 1 ページと Other の 3 ページを、現行と同じ見出し、本文、リンクで表示する

**Independent Test**: `pnpm generate` の後、`pnpm verify:parity /clock/clock-no-flip /other/3x3x3-method /other/for-non-cubers /other/advent-calendar2014` が、記録した修正以外の差分0件で終わる

### Implementation for User Story 2

- [ ] T012 [P] [US2] `app/pages/clock/clock-no-flip.vue` を作成し、`legacy/pages/clock/clock-no-flip.vue` のテンプレートを写す(スクリプトなし)
- [ ] T013 [P] [US2] `app/pages/other/3x3x3-method.vue` を作成し、`legacy/pages/other/3x3x3-method.vue` のテンプレートを写す(見出しの中の外部リンク 18 本を含む)
- [ ] T014 [P] [US2] `app/pages/other/for-non-cubers.vue` を作成し、`legacy/pages/other/for-non-cubers.vue` のテンプレートを写す
- [ ] T015 [P] [US2] `app/pages/other/advent-calendar2014.vue` を作成し、`legacy/pages/other/advent-calendar2014.vue` のテンプレートを写す
- [ ] T016 [US2] US2 の確認: `pnpm generate` の後、`pnpm verify:parity` で 4 パスの差分が、記録した修正以外0件であることを確認する。本番と並べた撮影で、高さが一致し、`/other/3x3x3-method` の見出しの中のリンクの色が現行と同じであることを確認する(SC-002、SC-004、SC-005)

**Checkpoint**: Clock と Other の 4 ページが、現行と同じに表示される

---

## Phase 5: User Story 3 - メニューから全ページへ移動でき、404 にならない (Priority: P2)

**Goal**: 8 パスが静的生成の出力に含まれ、メニューと直接のアクセスの両方で表示される

**Independent Test**: `pnpm verify` が 21 ページの存在を確認して成功し、メニューの各項目からページへ移動できる

### Implementation for User Story 3

- [ ] T017 [US3] `pnpm verify` を実行し、`scripts/verify-output.mjs` が、`scripts/pages.mjs` の 21 パス(002 の 13 とこの Spec の 8)の `index.html` を確認して成功することを確認する。8 パスのうち 1 つの `index.html` を一時的に消すと失敗することも確認する(SC-001)
- [ ] T018 [US3] preview を起動し、ヘッダーの Megaminx、Clock、Other のメニューの内部ページの全 8 項目を、広い画面(ホバー)と狭い画面(バーガーメニュー)の両方で選び、対応するページが表示されることを確認する。8 パスを、末尾のスラッシュの有無の両方で直接開き、200 が返ることを確認する(US3 の Acceptance Scenarios)。T011、T016 に依存する

**Checkpoint**: Megaminx、Clock、Other のメニューの内部ページの項目が、すべて 404 でなくなる

---

## Phase 6: User Story 4 - 運営者が、直した誤字を確認できる (Priority: P3)

**Goal**: 移植の際に直した誤字と、直さなかった候補が、spec.md に記録されている

**Independent Test**: spec.md の表の各行について、新サイトが修正後の表記になっており、`pnpm verify:parity` が、表にある修正だけを例外として報告する

### Implementation for User Story 4

- [ ] T019 [US4] 8 ページの本文と見出しを読み、明らかな誤字・誤記を探す。直すものは、ページのファイル(`app/pages/{megaminx,clock,other}/*.vue`)を直し、`specs/003-megaminx-clock-pages/spec.md` の「現行の表記から直した箇所」の表に、ページ、場所、現行の表記、修正後の表記、理由を追記する。判断に迷うものは、直さずに「候補(直さない)」として追記する。spec.md の Assumptions にある「数字かできます」(`/clock/clock-no-flip`)は、ここで判断する。手順の文字列(`megacase`)は、記号の揺れを含め、直さない(FR-007)
- [ ] T020 [US4] `pnpm generate` の後、`pnpm verify:parity` を実行し、21 パスのすべてで、spec.md の表にある修正だけが例外として報告され、ほかの差分が0件であることを確認する(SC-006)。T019 に依存する

**Checkpoint**: 誤字の修正と候補が記録され、記録にない変更がない

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 全体の確認と仕上げ

- [ ] T021 [P] `git diff --stat nuxt4-rebuild -- legacy/` の出力が空であることを確認する(FR-012、原則 VI)
- [ ] T022 クリーンな環境(`rm -rf node_modules .nuxt .output && pnpm install --frozen-lockfile`)から、`pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify`、`pnpm verify:parity` を実行し、すべて成功することを確認する(quickstart.md の 1〜3、SC-007)
- [ ] T023 実装中に設計を変えた場合は、plan.md、research.md、data-model.md、contracts/pages.md を、実装に合わせて更新する
- [ ] T024 `003-megaminx-clock-pages` を push し、`nuxt4-rebuild` 宛ての PR を作成する。`check` と `actionlint` が成功し、`deploy.yml` が実行されないことを確認する。`gh api repos/roudai/roudainet/pulls/<番号>` で `stack` が `null` であることを確認し、stack の場合は、マージ前に GitHub の画面で Unstack してもらう(原則 VII)。push、PR の作成、マージは、運営者の確認を得てから行う

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 依存なし。すぐに始められる
- **Foundational (Phase 2)**: T002〜T004 は T001 の `sr-puzzlegen` を使う。T005 は依存なし
- **User Stories (Phase 3〜6)**:
  - US1 は、T002〜T005 の完了に依存する
  - US2 は、T005 だけに依存する(図のコンポーネントを使わない)
  - US3 の T017 は T005 の後に始めてよい。T018 は US1 と US2 に依存する
  - US4 は、US1 と US2 の移植の後に行う(移植中に誤字が見つかるため)
- **Polish (Phase 7)**: すべてのユーザーストーリーの完了後

### User Story Dependencies

- **US1 (P1)**: Foundational の後に開始できる。他のストーリーへの依存なし
- **US2 (P2)**: T005 の後に開始できる。他のストーリーへの依存なし
- **US3 (P2)**: T018 は US1 と US2 に依存する
- **US4 (P3)**: US1 と US2 に依存する

### Within Each User Story

- データ(`app/data/megaminx/*.ts`) → ページ(`app/pages/**/*.vue`) → 確認の順
- 同じファイルを編集するタスクは、順番に行う(`spec.md`、`scripts/pages.mjs`)
- ストーリーが完了してから、次の優先度へ進む

### Parallel Opportunities

- Phase 2: T002 と T005 は並行できる。T003、T004 は順番に行う
- US1: T007〜T010 は、T006 の後に並行できる
- US2: T012〜T015 は並行できる
- US1 と US2 は、全体として並行できる
- Polish: T021 は、他のタスクと並行できる

---

## Parallel Example: User Story 1

```text
# T006 でデータを生成した後、4 ページを一緒に作る:
Task: "app/pages/megaminx/megaminx-eo.vue を作成する(T007)"
Task: "app/pages/megaminx/megaminx-co.vue を作成する(T008)"
Task: "app/pages/megaminx/megaminx-ep.vue を作成する(T009)"
Task: "app/pages/megaminx/megaminx-cp.vue を作成する(T010)"
```

## Parallel Example: User Story 2

```text
# 文章の 4 ページを、一緒に作る:
Task: "app/pages/clock/clock-no-flip.vue を作成する(T012)"
Task: "app/pages/other/3x3x3-method.vue を作成する(T013)"
Task: "app/pages/other/for-non-cubers.vue を作成する(T014)"
Task: "app/pages/other/advent-calendar2014.vue を作成する(T015)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup を完了する
2. Phase 2: Foundational を完了する
3. Phase 3: US1(Megaminx の 4 ページ)を完了する
4. **STOP and VALIDATE**: T011 で、本番と並べて確認する

### Incremental Delivery

1. Setup と Foundational → 図のコンポーネントがそろう
2. US1 → Megaminx の 4 ページ(MVP)
3. US2 → Clock と Other の 4 ページ
4. US3 → メニューと直接のアクセスの確認
5. US4 → 誤字の修正と記録
6. Polish → クリーンな環境での確認、PR(T024 は運営者の確認後)

---

## Notes

- [P] のタスクは、別ファイルで、未完了のタスクに依存しない
- [Story] のラベルで、タスクとユーザーストーリーを対応付ける
- フェーズごとに、日本語でコミットする
- `legacy/` と `main` には触れない。push、PR の作成、マージは、運営者の確認を得てから行う
