---

description: "トップページの移植と情報の更新のタスク一覧"
---

# Tasks: トップページの移植と情報の更新

**Input**: Design documents from `/specs/004-top-page/`

**Prerequisites**: plan.md(必須)、spec.md(ユーザーストーリー)、research.md、data-model.md、contracts/pages.md、quickstart.md

**Tests**: Spec で自動テストを求めていないため、テストのタスクは作らない。品質ゲートは Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`、`scripts/verify-parity.mjs`(手動)と、現行サイトとの並べた撮影と目視である。

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並行して実行できる(別ファイルで、未完了のタスクに依存しない)
- **[Story]**: タスクが属するユーザーストーリー(US1、US2)
- 説明には、正確なファイルパスを含める

## Path Conventions

- 移植元は `legacy/pages/index.vue`。`legacy/` は読み取り専用で、変更しない(原則 VI)
- 本文は移植元からそのまま写す。変えるのは spec.md の「現行の内容から更新した箇所」の表にある更新だけ

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: 確認のスクリプトを、トップページとリンクの更新に対応させる

- [X] T001 `scripts/verify-parity.mjs` を拡張する(research.md の 3、contracts/pages.md の「パリティの確認」)。(1) パスが `/` のとき、現行サイトの URL を `https://roudai.net/` にする。(2) spec.md の表のセルから、`(\`URL\`)` の形の URL を取り出し、残りをテキストとして扱う。(3) 「現行の表記」と「修正後の表記」の両方に URL がある行は、現行のリンクの一覧の中で、順に置き換える。(4) 「現行の表記」に URL がなく「修正後の表記」に URL がある行は、追加されたリンクとして、現行のリンクの一覧の末尾に足す。(5) `specFiles` に `specs/004-top-page/spec.md` を追加する。リンクの例外を適用したときも、報告(`記録済みの修正`)に出す
- [X] T002 [P] `scripts/pages.mjs` に、`/` を `topPages` として追加し、`migratedPages` に含める
- [X] T003 T001 と T002 の後、`pnpm generate` と `pnpm verify:parity` を実行し、既存の 21 ページの結果が変わらない(差分0件)ことを確認する

**Checkpoint**: トップページの移植を始められる

---

## Phase 2: User Story 1 + User Story 2 - トップページの移植と情報の更新 (Priority: P1) 🎯 MVP

**Goal**: トップページを、現行と同じ構成で、記録した 4 か所の更新を反映して表示する

**Independent Test**: `pnpm verify:parity /` が、spec.md の表の更新だけを例外として報告し、差分0件で終わる

US1(移植)と US2(更新)は、同じファイル(`app/pages/index.vue`)を対象とするため、1 つのフェーズで行う。

- [X] T004 [US1] `app/pages/index.vue` を、`legacy/pages/index.vue` のテンプレートで置き換える(仮の案内文を削除する)。先頭に移植元のコメントを付け、スクリプトは持たない
- [X] T005 [US2] `app/pages/index.vue` に、spec.md の表の更新を反映する: tribox のリンク(文言と URL)、Issues のリンク先、Megaminx の平均(1:02.42)、「主な成績」の後のシニアランキングの見出しと 2 項目(research.md の 2 の文言。見出しの括弧は全角)。T004 に依存する
- [X] T006 [US1] [US2] `pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify` が成功し、`pnpm verify:parity` で 22 ページの差分が0件(`/` は表の更新だけが例外として報告される)であることを確認する。表の 1 行を一時的に外すと、`/` が失敗することも確認する(SC-002、SC-003、SC-004)。T005 に依存する
- [X] T007 [US1] [US2] preview を起動し、`/` を本番と並べて撮影(1280px と 375px)し、追加したシニアランキングの部分以外に、レイアウトの相違がないことを確認する。tribox、Issues、シニアランキングの 2 つのリンクの URL が指定どおりであること、ヘッダーのロゴから `/` に戻れることを確認する(SC-001、SC-005)。T006 に依存する

**Checkpoint**: トップページが移植され、更新が反映されている

---

## Phase 3: Polish & Cross-Cutting Concerns

- [X] T008 [P] `git diff --stat nuxt4-rebuild -- legacy/` の出力が空であることを確認する(FR-010)
- [X] T009 クリーンな環境(`rm -rf node_modules .nuxt .output && pnpm install --frozen-lockfile`)から、`pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify`、`pnpm verify:parity` を実行し、すべて成功することを確認する(SC-006)
- [X] T010 実装中に設計を変えた場合は、plan.md、research.md、contracts/pages.md を更新する
- [ ] T011 `004-top-page` を push し、`nuxt4-rebuild` 宛ての PR を作成する。`check` と `actionlint` が成功し、`deploy.yml` が実行されないこと、`stack` が `null` であることを確認する。push、PR の作成、マージは、運営者の確認を得てから行う

---

## Dependencies & Execution Order

- Phase 1: T001 と T002 は並行できる。T003 は両方の後
- Phase 2: T004 → T005 → T006 → T007 の順(同じファイルと、その確認)。T003 の後に始める
- Phase 3: Phase 2 の後。T008 は並行できる。T011 は運営者の確認の後

## Implementation Strategy

1. Phase 1 で、確認のスクリプトを先に拡張する(既存の 21 ページで壊れていないことを確かめる)
2. Phase 2 で、移植と更新を行い、スクリプトと撮影で確かめる(MVP)
3. Phase 3 で、全体を確認し、運営者の確認の後に PR を作る

## Notes

- フェーズごとに、日本語でコミットする
- `legacy/` と `main` には触れない。push、PR の作成、マージは、運営者の確認を得てから行う
