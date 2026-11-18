---

description: "キューブ系の解法ページの移植のタスク一覧"
---

# Tasks: キューブ系の解法ページの移植

**Input**: Design documents from `/specs/002-cube-solution-pages/`

**Prerequisites**: plan.md(必須)、spec.md(ユーザーストーリー)、research.md、data-model.md、contracts/pages.md、quickstart.md

**Tests**: Spec で自動テストを求めていないため、テストのタスクは作らない。品質ゲートは Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`、`scripts/verify-parity.mjs`(手動)と、現行サイトとの目視比較である。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並行して実行できる(別ファイルで、未完了のタスクに依存しない)
- **[Story]**: タスクが属するユーザーストーリー(US1〜US4)
- 説明には、正確なファイルパスを含める

## Path Conventions

- アプリは、リポジトリのルートの `app/`(Nuxt 4 の構成)。静的ファイルは `public/`、スクリプトは `scripts/`
- 移植元は `legacy/pages/` と `legacy/assets/images/`。`legacy/` は読み取り専用で、変更しない(原則 VI)
- 共通の移植ルール(すべてのページのタスクに適用する):
  - 見出し、本文、手順の文字列、リンクは、移植元のファイルからそのまま写す。全角記号、タブ、`′`、`'2` などの表記も変えない。直すのは spec.md の「現行の表記から直した箇所」にある修正だけ
  - テンプレートの Bulma のクラス名(`columns`、`column is-3` など)は、そのまま使う(research.md の 3)
  - 図の指定は、移植元の `mounted()` で `cubePNG` に渡している値(`mask`、`view`、`width`、`height`、`arrows`、`colorScheme`、`case` など)を、そのまま `CubeDiagram` として写す(data-model.md)
  - 移植中に、ほかの明らかな誤字を見つけた場合は、直して spec.md の表に追記する。判断に迷うものは、直さずに候補として表に追記する(FR-008)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 依存と静的ファイルの準備

- [X] T001 `pnpm add sr-visualizer@1.0.13` で、`sr-visualizer` を `package.json` の `dependencies` に追加し、`pnpm-lock.yaml` を更新する。`yarn.lock` や `package-lock.json` が作られていないことを確認する(原則 V)
- [X] T002 [P] `legacy/assets/images/pll/` の 13 ファイルを、ファイル名を変えずに `public/images/pll/` へコピーする(research.md の 2)
- [X] T003 [P] `legacy/assets/images/two-sided/` の 46 ファイルを、ファイル名を変えずに `public/images/two-sided/` へコピーする(research.md の 2)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: すべてのページが使う、型、図のコンポーネント、レイアウトの CSS、確認のスクリプト

**実装時の変更(2026-11-19)**: T005 の「幅と高さを確保」は取りやめた(中央寄せが崩れるため)。US1、US2 のデータは、`AlgorithmCase` などに組み直さず、移植元の `data()` の構造のまま写した。詳細は data-model.md の「実装時の設計変更」と plan.md の「実装上の留意点」

**⚠️ CRITICAL**: このフェーズが終わるまで、ページの移植を始めない

- [X] T004 [P] `app/data/cube/types.ts` を作成し、data-model.md の `CubeDiagram`(`sr-visualizer` の `ICubeOptions` を使う)、`AlgorithmCase`、`AlgorithmSection`、`SolutionImage` の型を定義する
- [X] T005 `app/components/CubeImage.vue` を作成する。props で `CubeDiagram` と描画先の `id` を受け取り、サーバー側では、幅と高さを確保し、移植元の描画先と同じ `id`(`pll1`、`oll1`、`pochmann1` など)を持つ空の div だけを出力する。`onMounted` で `sr-visualizer` を動的に `import` し、`cubePNG` でその要素に描画する。描画の失敗は、その要素を空のままにして握りつぶし、ページの他の表示を妨げない(contracts/pages.md の「図の描画」)。T004 に依存する
- [X] T006 [P] `app/assets/css/main.css` の `@layer components` に、対象ページで使われている Bulma 0.9 のクラスだけを再現する: `columns`(769px 以上で flex、`margin: -0.75rem`、最後の要素以外は `margin-bottom: 0.75rem`)、`columns.is-mobile`(常に flex)、`is-vcentered`、`is-marginless`、`column`(`padding: 0.75rem`、`flex: 1 1 0`)、`column.is-1`〜`is-10`、`is-N-mobile`(768px 以下)、`is-N-tablet`(769px 以上)、`has-text-centered`、`p-0`、`box`、`table`、`is-striped`、`is-narrow`。値は Bulma 0.9 の CSS と同一にする(research.md の 3)。実際に使われている組み合わせは `grep -ohE 'class="[^"]*"' legacy/pages/{pll,oll,f2l,bld,fmc}/*.vue` で確認する
- [X] T007 [P] `scripts/verify-parity.mjs` を作成する(contracts/pages.md の「パリティの確認」)。13 パスについて、本番の `https://roudai.net/<パス>/` の HTML を `fetch` で取得し、`.output/public/<パス>/index.html` と比べる。比較の範囲は、両方とも本文の領域(`.content.m-3` の要素)の中だけで、ヘッダーとフッターは含めない。比較するのは、テキスト(見出し、段落、リストの項目、手順の文字列、表のセル。空白はまとめる)の並び、リンク先の URL、図の要素の数。図の要素は、`<英字><数字>` の id を持つ div(`cubePNG` の描画先)と、`<img>` として数える。spec.md の「現行の表記から直した箇所」の表を読み込み、その「現行の表記」→「修正後の表記」の差分は例外として報告し、失敗にしない。差分がなければ終了コード 0、あれば 1。`package.json` には `verify:parity` スクリプトとして追加する

**Checkpoint**: 型、図のコンポーネント、CSS、確認のスクリプトがそろい、ページの移植を始められる

---

## Phase 3: User Story 1 - 手順の一覧ページで、図と手順を見比べられる (Priority: P1) 🎯 MVP

**Goal**: 手順の一覧ページ 7 つを、現行と同じケース、図、手順の文字列で表示する

**Independent Test**: `/pll/pll`、`/pll/pll-view`、`/oll/oll`、`/oll/coll`、`/f2l/f2l`、`/f2l/f2l-advanced`、`/f2l/winter-variation` を開き、ケースの見出し、図、手順の文字列が、現行と同じ数、順序、内容で表示されることを確認する

### Implementation for User Story 1

- [X] T008 [P] [US1] `legacy/pages/pll/pll.vue` の `pllName`、`pll`、`pllArrow` と `mounted()` の指定から、21 ケースの `AlgorithmCase` を `app/data/cube/pll.ts` に作成する。図の `case` は、現行の `makeCase` と同じく、1つ目の手順の `：` より後ろの文字列にする
- [X] T009 [US1] `app/pages/pll/pll.vue` を作成し、`app/data/cube/pll.ts` から、見出し(h2「PLL手順」、各ケースの h3)、`CubeImage`、手順の文字列を、移植元と同じ `columns` の構造で描画する。T005、T006、T008 に依存する
- [X] T010 [P] [US1] `legacy/pages/pll/pll-view.vue` から、GIF 13 枚(`SolutionImage`、`src` は `/images/pll/<ファイル名>`)と `cubePNG` の指定を、`app/data/cube/pll-view.ts` に作成する
- [X] T011 [US1] `app/pages/pll/pll-view.vue` を作成し、移植元と同じ構造で、GIF と図を描画する。T005、T006、T010 に依存する
- [X] T012 [P] [US1] `legacy/pages/oll/oll.vue` のデータと `mounted()` の指定から、`app/data/cube/oll.ts` を作成する
- [X] T013 [US1] `app/pages/oll/oll.vue` を作成する。T005、T006、T012 に依存する
- [X] T014 [P] [US1] `legacy/pages/oll/coll.vue` の `COLLn21`〜`COLLn27` と 7 つの `cubePNG` の指定から、7 つの `AlgorithmSection` を `app/data/cube/coll.ts` に作成する
- [X] T015 [US1] `app/pages/oll/coll.vue` を作成し、7 つのまとまりを、見出し(`OLL n21 H Orientation` など)とともに描画する。T005、T006、T014 に依存する
- [X] T016 [P] [US1] `legacy/pages/f2l/f2l.vue` のデータと `mounted()` の指定から、`app/data/cube/f2l.ts` を作成する
- [X] T017 [US1] `app/pages/f2l/f2l.vue` を作成する。T005、T006、T016 に依存する
- [X] T018 [P] [US1] `legacy/pages/f2l/f2l-advanced.vue` の `advancedF2lth`(両手)、`advancedF2loh`(片手)と 2 つの `cubePNG` の指定から、2 つの `AlgorithmSection` を `app/data/cube/f2l-advanced.ts` に作成する
- [X] T019 [US1] `app/pages/f2l/f2l-advanced.vue` を作成する。ページの見出しは、spec.md の「現行の表記から直した箇所」に従い「発展形F2L」にする(現行は「発展系F2L」)。T005、T006、T018 に依存する
- [X] T020 [P] [US1] `legacy/pages/f2l/winter-variation.vue` の `winterVariation0`〜`winterVariation3` と 4 つの `cubePNG` の指定から、4 つの `AlgorithmSection` を `app/data/cube/winter-variation.ts` に作成する
- [X] T021 [US1] `app/pages/f2l/winter-variation.vue` を作成し、4 つのまとまり(コーナー反転なし〜3つ)を描画する。T005、T006、T020 に依存する
- [X] T022 [US1] US1 の 7 ページを確認する: `pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify:parity` を実行し、7 ページに差分がない(「発展形F2L」は例外として報告される)ことを確認する。`pnpm preview` で 7 ページを開き、すべてのケースに図が表示され(SC-003)、現行サイトと並べて、広い画面と狭い画面で見た目に気づく相違がない(SC-004)ことを確認する。図の多い `/pll/pll` では、現行サイトと比べて、スクロールや操作を体感で遅いと感じないことも確認する(Spec の Edge Cases)

**Checkpoint**: 手順の一覧ページ 7 つが、単独で確認できる(MVP)

---

## Phase 4: User Story 2 - 解説ページを、図や表とともに読める (Priority: P2)

**Goal**: 解説ページ 6 つを、本文、表、図、画像、外部リンクとともに、現行と同じ内容で表示する

**Independent Test**: `/pll/pll-chances`、`/pll/two-sided-pll`、`/bld/bld-introduction`、`/bld/bld-method`、`/bld/old-pochmann-corner`、`/fmc/intro-fmc` を開き、見出し、本文、表、図、画像、リンクが、現行と同じ内容と順序で表示されることを確認する

### Implementation for User Story 2

- [X] T023 [P] [US2] `legacy/pages/pll/pll-chances.vue` の `data()` と、14 か所の `cubePNG` の指定(`UPermArrow` などの矢印、`colorScheme`)から、`app/data/cube/pll-chances.ts` を作成する
- [X] T024 [US2] `app/pages/pll/pll-chances.vue` を作成し、見出し(「PLLの確率」、「1. エッジ3点交換、コーナー3点交換」など)、本文、図、確率の表(`table is-striped is-narrow` など、移植元と同じクラス)を描画する。T005、T006、T023 に依存する
- [X] T025 [P] [US2] `legacy/pages/pll/two-sided-pll.vue` の画像 46 枚(`SolutionImage`、`src` は `/images/two-sided/<ファイル名>`、`alt` は移植元と同一)と、9 か所の `cubePNG` の指定から、`app/data/cube/two-sided-pll.ts` を作成する
- [X] T026 [US2] `app/pages/pll/two-sided-pll.vue` を作成し、本文、判断パターンの画像と説明文、図、外部リンク(`http://cubing.pt/wp-content/uploads/2017/03/pll2side-20140531.pdf`、`https://roudai.github.io/PLLTrainer/`)を、移植元と同じ順序で描画する。T005、T006、T025 に依存する
- [X] T027 [P] [US2] `legacy/pages/bld/old-pochmann-corner.vue` の 11 か所の `cubePNG` の指定から、`app/data/cube/old-pochmann-corner.ts` を作成する
- [X] T028 [US2] `app/pages/bld/old-pochmann-corner.vue` を作成し、見出し(「Old Pochmann method（corner）」、「基本」、「発展」、「M2 + Old Pochmann」)、本文、手順、図を描画する。T005、T006、T027 に依存する
- [X] T029 [P] [US2] `app/pages/bld/bld-introduction.vue` を作成し、`legacy/pages/bld/bld-introduction.vue` の本文と外部リンク(`https://togetter.com/li/135461`)をテンプレートにそのまま写す
- [X] T030 [P] [US2] `app/pages/bld/bld-method.vue` を作成し、`legacy/pages/bld/bld-method.vue` の本文と外部リンク(`https://www.stefan-pochmann.info/spocc/blindsolving/M2R2/`)をテンプレートにそのまま写す
- [X] T031 [P] [US2] `app/pages/fmc/intro-fmc.vue` を作成し、`legacy/pages/fmc/intro-fmc.vue` の本文と外部リンク(`https://cubevoyage.net/how-to-solve/intermediate/notation/`)をテンプレートにそのまま写す
- [X] T032 [US2] US2 の 6 ページを確認する: `pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify:parity` を実行し、6 ページに差分がないことを確認する。`pnpm preview` で 6 ページを開き、現行サイトと並べて、本文、表、図、画像に気づく相違がないこと、図の多い `/pll/pll-chances` の操作が、現行サイトと比べて体感で遅くないこと、外部リンクが contracts/pages.md の URL と一致すること(SC-005)を確認する

**Checkpoint**: 解説ページ 6 つが、単独で確認できる

---

## Phase 5: User Story 3 - メニューから全ページへ移動でき、404 にならない (Priority: P2)

**Goal**: F2L、OLL、PLL、BLD、FMC のメニューの全項目と、13 パスへの直接のアクセスで、ページが表示される

**Independent Test**: 静的生成の出力に 13 パスがすべて含まれ、各メニュー項目からページが表示されることを確認する

### Implementation for User Story 3

- [X] T033 [US3] `scripts/verify-output.mjs` に、13 パス(contracts/pages.md の表)の `index.html` が `.output/public` に存在することと、`.output/public/images/pll/`(13 ファイル)と `.output/public/images/two-sided/`(46 ファイル)が `legacy/assets/images/` の同名のファイルとバイト単位で一致することの確認を追加する。`legacy/` がない場合は、画像の一致の確認だけを省く(既存の `app-ads.txt` の確認と同じ扱い)。これにより、CI(`ci.yml` の「出力を検証」)でも確認される
- [X] T034 [US3] 13 パスへの到達を確認する: `pnpm generate` と `pnpm verify` が成功する。`pnpm preview` で、ヘッダーの F2L、OLL、PLL、BLD、FMC の全項目を選び、404 にならないこと、各パスをアドレスバーに直接入力しても表示されることを確認する(SC-001)

**Checkpoint**: 13 パスへの到達が、CI と手動の両方で確認できる

---

## Phase 6: User Story 4 - 運営者が、直した誤字を確認できる (Priority: P3)

**Goal**: 移植で直した誤字と、直さなかった候補が、spec.md に漏れなく記録されている

**Independent Test**: spec.md の「現行の表記から直した箇所」の各行について、新サイトが修正後の表記になっていること、`pnpm verify:parity` の差分が、表にある例外だけであることを確認する

### Implementation for User Story 4

- [X] T035 [US4] 移植中に追記した誤字の修正と候補を見直し、`specs/002-cube-solution-pages/spec.md` の「現行の表記から直した箇所」の表を確定する。各行に、ページ、場所、現行の表記、修正後の表記、理由があることを確認する。直さなかった候補は、理由に「候補(直さない)」と書く
- [X] T036 [US4] `pnpm verify:parity` を実行し、報告される例外が T035 の表と一致し、表にない差分が0件であることを確認する(SC-006)

**Checkpoint**: 誤字の修正が記録され、記録にない変更がない

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 全体の確認と統合

- [X] T037 [P] `legacy/` が変更されていないことを、`git diff --stat nuxt4-rebuild -- legacy/` の出力が空であることで確認する(FR-013)
- [X] T038 [quickstart.md](./quickstart.md) の手順 1〜4 を通しで実行し、SC-001〜SC-007 に未達がないことを確認する。クリーンな環境(`rm -rf node_modules .nuxt .output` の後の `pnpm install --frozen-lockfile`)で、`pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify` がすべて成功することも確認する
- [ ] T039 `002-cube-solution-pages` を push し、`nuxt4-rebuild` 宛ての PR を作る。`check` と `actionlint` が成功し、`deploy.yml` が実行されないことを確認する(quickstart の 5)。マージの前に、PR が stack として扱われていないことを API(`gh api repos/roudai/roudainet/pulls/<番号>` の `stack` が `null`)で確認する。stack になっていれば、運営者に GitHub の画面で Unstack してもらう。`merge-async` や「Merge stack」は使わない(`main` への公開を防ぐため)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 依存なし。すぐに始められる
- **Foundational (Phase 2)**: Setup の完了に依存(T005 は T001 の `sr-visualizer` を使う)。すべてのユーザーストーリーをブロックする
- **User Stories (Phase 3〜6)**: すべて Foundational の完了に依存
  - US1 と US2 は、ページとデータのファイルが別で、互いに独立している
  - US2 の T026 は、T003(2側面判断の画像)に依存する。US1 の T011 は、T002(PLL の GIF)に依存する
  - US3 は、US1 と US2 の全ページがそろってから確認する(T034)。T033 のスクリプトの変更は、先に始めてよい
  - US4 は、US1 と US2 の移植の後に行う(移植中に誤字が見つかるため)
- **Polish (Phase 7)**: すべてのユーザーストーリーの完了後

### User Story Dependencies

- **US1 (P1)**: Foundational の後に開始できる。他のストーリーへの依存なし
- **US2 (P2)**: Foundational の後に開始できる。他のストーリーへの依存なし
- **US3 (P2)**: T033 は Foundational の後に開始できる。T034 は US1 と US2 に依存する
- **US4 (P3)**: US1 と US2 に依存する

### Within Each User Story

- データ(`app/data/cube/*.ts`) → ページ(`app/pages/**/*.vue`) → 確認の順
- 同じファイルを編集するタスクは、順番に行う(`app/assets/css/main.css`、`scripts/verify-output.mjs`、`spec.md`)
- ストーリーが完了してから、次の優先度へ進む

### Parallel Opportunities

- Phase 1: T002、T003 は並行できる(T001 とも、ファイルが別)
- Phase 2: T004、T006、T007 は並行できる。T005 は T004 の後
- US1: データのタスク T008、T010、T012、T014、T016、T018、T020 は並行できる。各ページのタスクは、対応するデータの後
- US2: T023、T025、T027 と、本文だけのページ T029、T030、T031 は並行できる
- US1 と US2 は、全体として並行できる
- Polish: T037 は、他のタスクと並行できる

---

## Parallel Example: User Story 1

```text
# US1 のデータを、一緒に作る:
Task: "app/data/cube/pll.ts を作成する(T008)"
Task: "app/data/cube/pll-view.ts を作成する(T010)"
Task: "app/data/cube/oll.ts を作成する(T012)"
Task: "app/data/cube/coll.ts を作成する(T014)"
Task: "app/data/cube/f2l.ts を作成する(T016)"
Task: "app/data/cube/f2l-advanced.ts を作成する(T018)"
Task: "app/data/cube/winter-variation.ts を作成する(T020)"

# その後、各ページを作り、T022 で確認する
```

## Parallel Example: User Story 2

```text
# データと、本文だけのページを、一緒に作る:
Task: "app/data/cube/pll-chances.ts を作成する(T023)"
Task: "app/data/cube/two-sided-pll.ts を作成する(T025)"
Task: "app/data/cube/old-pochmann-corner.ts を作成する(T027)"
Task: "app/pages/bld/bld-introduction.vue を作成する(T029)"
Task: "app/pages/bld/bld-method.vue を作成する(T030)"
Task: "app/pages/fmc/intro-fmc.vue を作成する(T031)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup を完了する
2. Phase 2: Foundational を完了する(重要。すべてをブロックする)
3. Phase 3: User Story 1 を完了する
4. **止めて確認する**: 手順の一覧ページ 7 つを、現行サイトと並べて確認する(T022)
5. 以降は、`main` へはマージせず、`nuxt4-rebuild` へ PR で統合する

### Incremental Delivery

1. Setup と Foundational を完了する → 図のコンポーネントと CSS が動く
2. US1 を追加する → 手順の一覧ページを確認する(MVP)
3. US2 を追加する → 解説ページを確認する
4. US3 を追加する → 13 パスへの到達が CI で確認される
5. US4 を追加する → 誤字の修正の記録が確定する
6. 各ストーリーは、前のストーリーを壊さずに価値を足す

---

## Notes

- [P] のタスクは、別ファイルで、未完了のタスクに依存しない
- [Story] のラベルで、タスクとユーザーストーリーを対応させる
- 各タスク、または論理的なまとまりごとにコミットする(コミットメッセージは日本語)
- 各チェックポイントで止めて、ストーリーを単独で確認できる
- `legacy/` は変更しない。`main` 宛ての PR は作らない
