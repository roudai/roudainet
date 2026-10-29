---

description: "サイト基盤の実装タスク一覧"
---

# Tasks: サイト基盤

**Input**: Design documents from `/specs/001-site-foundation/`

**Prerequisites**: plan.md(必須)、spec.md(ユーザーストーリー用)、research.md、data-model.md、contracts/navigation.md、quickstart.md

**Tests**: 自動テストは作らない(Spec で必須としていない)。品質ゲートは Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`、目視確認(quickstart)で行う。

**Organization**: タスクはユーザーストーリーごとにまとめ、各ストーリーを独立して実装、確認できるようにする。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 並行して実行できる(別ファイルで、未完了のタスクへの依存がない)
- **[Story]**: タスクが属するユーザーストーリー(US1〜US5)
- 説明には、正確なファイルパスを含める

## Path Conventions

- Nuxt 4 のアプリを、リポジトリのルートに置く(`app/`、`public/`、`scripts/`、`.github/`)。
- `legacy/` は読み取り専用。参照とコピー元にだけ使い、変更しない(FR-016)。
- パスはすべてリポジトリのルートからの相対パスで書く。

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: プロジェクトの初期化と、ツール設定(Node、pnpm、Nuxt、TypeScript、ESLint、Prettier)

- [X] T001 [P] Node 24 を固定する `.nvmrc` を作成する(内容は `24`)
- [X] T002 `package.json` を作成する。`name`、`private: true`、`type: "module"`、`packageManager: "pnpm@10.33.2"`、`engines.node`(`^24.15.0`)、scripts(`dev`、`generate`、`preview`、`postinstall: nuxt prepare`、`lint`: ESLint と `prettier --check .`、`typecheck`: `nuxt typecheck`)を定義する(research.md の 1、3、5、6)
- [X] T003 `pnpm add` で依存を入れ、`pnpm-lock.yaml` を生成する。`nuxt@4.6.3`、`vue`、`vue-router`、`tailwindcss@4.3.3`、`@tailwindcss/vite@4.3.3`、dev に `typescript@^5`(7 未満)、`vue-tsc`、`@nuxt/eslint`、`eslint`、`prettier`、`eslint-config-prettier`。pnpm のビルドスクリプトの警告(`esbuild`)が出たら、`pnpm-workspace.yaml` の `onlyBuiltDependencies` に明示する(T002 に依存)
- [X] T004 [P] `.gitignore` を作成する(`node_modules`、`.nuxt`、`.output`、`.data`、`.env*`、`dist`、ログ、OS の一時ファイル)
- [X] T005 [P] `nuxt.config.ts` を作成する。`compatibilityDate`、`ssr: true`、`nitro.prerender`(`crawlLinks: false`、`routes: ['/']`)、`css: ['~/assets/css/main.css']`、`vite.plugins: [tailwindcss()]`、`app.head`(`lang: ja`、title `roudainet`、description `roudai.net`、charset、viewport、`format-detection`、favicon)。AdSense 関連のモジュールは入れない(原則 III)
- [X] T006 [P] `tsconfig.json` を作成する。`files: []` と、`.nuxt/tsconfig.app.json`、`.nuxt/tsconfig.server.json`、`.nuxt/tsconfig.shared.json`、`.nuxt/tsconfig.node.json` への `references`。`legacy/` が型チェックの対象に入っていないことは、T012 で確認する(research.md の 3、5)
- [X] T007 [P] `eslint.config.mjs` を作成する。`@nuxt/eslint` のフラットコンフィグ + `eslint-config-prettier`。`ignores` に `legacy/`、`.output/`、`.nuxt/` を入れる(原則 VI)
- [X] T008 [P] `.prettierrc`(`semi: false`、`singleQuote: true`、`printWidth: 120`。`legacy/.prettierrc` を引き継ぐ)と、`.prettierignore`(`legacy/`、`.output/`、`.nuxt/`、`pnpm-lock.yaml`、`public/app-ads.txt`、`public/CNAME`、`specs/`、`.specify/`、`.claude/`、`CLAUDE.md`)を作成する。Spec Kit の文書と生成物は、整形の対象にしない

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: すべてのユーザーストーリーが載る、アプリの最小の骨格と共通スタイル

**⚠️ CRITICAL**: このフェーズが終わるまで、ユーザーストーリーの作業は始めない

- [X] T009 `app/assets/css/main.css` を作成する。`@import "tailwindcss"` と、Bulma の見た目を再現するための `@theme`(ナビの背景色 `#363636`、ナビの内側の余白 `0.5rem`、フッターの背景色 `#fafafa` など。値は、現行サイトの表示を確認して決める)、Bulma の `.content` 相当の自前スタイル(見出し、段落、リスト、リンク。Preflight が消す既定スタイルの補い。`@tailwindcss/typography` は使わない)を定義する(research.md の 2)
- [X] T010 [P] `app/app.vue` を作成する(`<NuxtLayout><NuxtPage /></NuxtLayout>`)
- [X] T011 [P] `app/pages/index.vue` を、空の骨組み(中身なし)で作成する。レイアウトの確認に、ルートのページが必要なため。内容は US5 で作る
- [X] T012 `pnpm lint`、`pnpm typecheck`、`pnpm generate` が、骨格の状態ですべて終了コード 0 になることを確認する。`legacy/` が検査対象に入っていないこと、`.output/public` に `index.html` が出力されることも確認する(T003〜T011 に依存)

**Checkpoint**: 骨格が動き、品質ゲートのコマンドがすべて通る。ユーザーストーリーの作業を始められる

---

## Phase 3: User Story 1 - 全ページ共通のヘッダーとフッターで移動できる (Priority: P1) 🎯 MVP

**Goal**: すべてのページで、現行と同じヘッダー(サイト名、9 カテゴリのメニュー、GitHub アイコン)とフッターが表示される。デスクトップ幅で、ドロップダウンから項目を選べる。

**Independent Test**: トップページを開き、ヘッダーとフッターが表示されること、メニューが現行と同じ 26 項目、同じ順序で並ぶこと(quickstart の 3 の 1、2、4)を確認する。

### Implementation for User Story 1

- [X] T013 [P] [US1] `app/data/navigation.ts` を作成する。`NavItem`(`label`、`to`)と `NavGroup`(`label`、`items`)の型と、9 カテゴリ、26 項目の定数を、[contracts/navigation.md](./contracts/navigation.md) の表と同じ文言、順序、リンク先で定義する(`legacy/components/NavBar.vue` が正)
- [X] T014 [P] [US1] `app/components/IconGithub.vue` を作成する。現行の SVG(`legacy/components/NavBar.vue` と `FooterBar.vue` のもの)を使い、`fill` の色を `prop` で指定できるようにする(ヘッダーは白、フッターは黒)
- [X] T015 [US1] `app/components/AppFooter.vue` を作成する。「© 2012-{年} roudai.net」と、`https://github.com/roudai/roudainet` へのリンクの GitHub アイコン(黒)を中央寄せで表示する。年は、ビルド時の年で描画し、マウント後に現在の年へ更新する(research.md の 9。T014 に依存)
- [X] T016 [US1] `app/components/AppHeader.vue` を作成する。ダーク背景のナビバーに、サイト名リンク(`/`)、`navigation.ts` から描画したカテゴリのドロップダウン(1024px 以上で横並び。ポインターを重ねる `group-hover` と、キーボードの `focus-within` で開く)、右端の GitHub アイコン(白)を置く。外部リンク(`https://` で始まる `to`)は通常の `<a>` で、内部リンクは `NuxtLink` で描画する。この時点では、1024px 未満の挙動は US2 で作る(T013、T014 に依存)
- [X] T017 [US1] `app/layouts/default.vue` を作成する。現行のレイアウトを再現する。769px 以上で中央寄せの 10/12 幅(最大幅は 960 / 1152 / 1344px)の本文領域に、ヘッダー、`<slot />` を入れた本文(余白付きの `.content`)、フッターを縦に並べる。幅の切り替えは、Tailwind の `md`(768px)との 1px の差が見た目に出るなら、`@theme` でブレークポイントを調整する(T015、T016 に依存)
- [X] T018 [US1] `pnpm dev` で、メニューを `legacy/components/NavBar.vue` と突き合わせる。9 カテゴリ、26 項目(内部 21、外部 5)の表示名、リンク先、順序に、過不足と相違がないことを確認する。Tab キーでドロップダウンが開くことも確認する(SC-001、SC-002)
- [X] T019 [US1] 幅 1440px で、`https://roudai.net`(現行)と並べて、ヘッダーとフッターの色、余白、ドロップダウンの挙動を比較し、気づく相違があれば `main.css` や各コンポーネントを直す(SC-003)。あわせて、広告表示を前提にした余白や枠が、レイアウトに残っていないことを確認する(FR-014、原則 III)。`pnpm lint` と `pnpm typecheck` も通す

**Checkpoint**: US1 が単独で動く。デスクトップ幅で、現行と同等のヘッダーとフッターが使える

---

## Phase 4: User Story 2 - モバイルでメニューを開閉できる (Priority: P2)

**Goal**: 1024px 未満の画面で、バーガーボタンによりメニューを開閉でき、項目とリンク先はデスクトップと同じになる。

**Independent Test**: 狭い画面幅でトップページを開き、バーガーボタンでメニューが開閉し、開いたメニューから各項目を選べることを確認する(quickstart の 3 の 3)。

### Implementation for User Story 2

- [X] T020 [US2] `app/components/AppHeader.vue` に、バーガーボタンと開閉の状態を追加する。1024px 未満でだけボタンを表示し、`aria-label="menu"` と `aria-expanded` を付ける。メニューは、閉じた状態で始まる(T016 に依存)
- [X] T021 [US2] `app/components/AppHeader.vue` に、1024px 未満の表示を追加する。メニューを開いたときに、各カテゴリの項目が縦に並んで常時表示される。画面幅が 1024px をまたいで変わっても、メニューが操作不能にならない(Edge Cases。T020 に依存)
- [X] T022 [US2] 幅 1024px 未満の実際の確認を行う。幅 390px と 1024px で、現行サイトと並べて比較する。メニューが閉じて始まる、バーガーボタンで開閉できる、開いたメニューの全項目が選べる、色や余白が現行と同等であることを確認する(SC-003)。1024px 以上のタッチ端末(タブレットの横向きなど)で、カテゴリをタップしてドロップダウンが開くことも確認する(Edge Cases)。`pnpm lint` と `pnpm typecheck` も通す

**Checkpoint**: US1 と US2 が、どちらも単独で動く

---

## Phase 5: User Story 3 - 運営者が安全に変更を統合し、公開できる (Priority: P2)

**Goal**: PR で Lint、型チェック、ビルド確認が自動実行され(デプロイなし)、`main` へのマージ時にだけ Pages へ公開される。運用ルールが文書に記載される。

**Independent Test**: `nuxt4-rebuild` 宛ての PR を作り、`ci.yml` が実行され、デプロイが走らないこと、失敗する変更でジョブが失敗することを確認する(quickstart の 4)。

### Implementation for User Story 3

- [X] T023 [P] [US3] 複合アクション `.github/actions/setup/action.yml` を作成する。`pnpm/action-setup`、`actions/setup-node`(`.nvmrc`、pnpm のキャッシュ)、`pnpm install --frozen-lockfile` を行う。アクションのバージョンは、実装時に最新のメジャー版を確認して固定する(research.md の 7)
- [X] T024 [US3] 現行の `.github/workflows/ci.yml`(名前は `cd`、`peaceiris/actions-gh-pages` を使うもの)を、`git mv` で `.github/workflows/deploy.yml` へ移し、中身を書き直す。トリガーは `push` の `main` のみ。`permissions` は `contents: read`、`pages: write`、`id-token: write`。`build` ジョブ(複合アクション、`pnpm generate`、`actions/upload-pages-artifact` で `.output/public` をアップロード)と、`deploy` ジョブ(`environment: github-pages`、`actions/deploy-pages`)に分ける(原則 VII。T023 に依存)
- [X] T025 [US3] PR 用の `.github/workflows/ci.yml` を新しく作成する。トリガーは `pull_request`(`branches: [main, nuxt4-rebuild]`)。複合アクションの後に、`pnpm lint`、`pnpm typecheck`、`pnpm generate` を実行する。さらに、ワークフローの構文を静的に検証する工程(`rhysd/actionlint`。バージョンは実装時に確認して固定)を加え、`deploy.yml` の誤りを、`main` へのマージ前に検出する。デプロイはしない(`pages` や `id-token` の権限も付けない。T024 で名前を空けた後に作る)
- [X] T026 [US3] `README.md` に、運用ルールの節を追加する。「全移植と切り替えチェックリストが完了するまで `main` へマージしない」「`nuxt4-rebuild` を統合ブランチとし、機能ごとの作業ブランチは `nuxt4-rebuild` へ PR でマージする」「PR の CI(Lint、型チェック、ビルド確認。デプロイなし)」を、日本語で書く。`README.md` の全面更新は、切り替え時のチェックリスト項目のため、ここではしない(FR-012)
- [X] T027 [US3] `README.md` に、リポジトリの外で行う設定の節を追加する。`main` の初回デプロイ前に Settings > Pages の Source を「GitHub Actions」へ切り替えること、Custom domain が `roudai.net` のままであることの確認、`main` と `nuxt4-rebuild` への PR で CI を必須にするブランチ保護(FR-010)。手順だけを書き、設定自体は運営者が行う(T026 に依存)。設定の完了を確認するため、README の節に「設定済みの確認項目」のチェックリスト(Pages の Source、Custom domain、ブランチ保護の 3 項目)を付ける。あわせて、「`main` の初回デプロイは、`deploy.yml` を本番では事前に試せないため、失敗しうる。失敗時は Actions のログを確認して直す」と一文を書く
- [ ] T028 [US3] `nuxt4-rebuild` 宛ての PR で `ci.yml` を確認する(quickstart の 4)。結果が PR に表示される、15 分以内に終わる(SC-004)、デプロイが実行されない(SC-005)、意図的に Lint か型チェックを失敗させた変更でジョブが失敗する。ブランチ保護が設定済みなら、失敗した PR がマージできないことも確認する(FR-010。未設定なら、設定後に確認する項目として残す)。`main` 宛ての PR は、誤ってマージするおそれがあるので作らず、`ci.yml` の `branches` に `main` が入っていることを目視で確認する。**ブランチの push と PR の作成は外部へ公開する操作なので、実行前にユーザーへ確認する**

**Checkpoint**: PR の CI が動き、デプロイが `main` のみになっている

---

## Phase 6: User Story 4 - 公開物に必要なファイルが含まれ、広告が含まれない (Priority: P3)

**Goal**: 生成したサイトのルートに `CNAME` と `app-ads.txt` が存在し、`ads.txt` と Google 広告の要素が含まれない。

**Independent Test**: `pnpm generate` の出力を調べ、`CNAME` と `app-ads.txt` が存在し、`app-ads.txt` が移植元と同一であること、`ads.txt` と広告関連の要素がないことを確認する(quickstart の 2)。

### Implementation for User Story 4

- [X] T029 [P] [US4] `legacy/static/CNAME` を、バイト単位で同一のまま `public/CNAME` へコピーする(`cp`。内容は `roudai.net`)
- [X] T030 [P] [US4] `legacy/pages/app-ads.txt` を、バイト単位で同一のまま `public/app-ads.txt` へコピーする(`cp` で行い、整形や改行の追加をしない。`legacy/` は変更しない)
- [X] T031 [P] [US4] `legacy/static/favicon.ico` を `public/favicon.ico` へコピーする。`legacy/static/ads.txt` は、コピーしない(原則 III)
- [X] T032 [US4] `scripts/verify-output.mjs` を作成する。`.output/public` を調べ、`CNAME`(内容 `roudai.net`)、`app-ads.txt`、`favicon.ico` の存在、`ads.txt` の不在、全 HTML に `adsbygoogle`、`google-adsense`、`google_ad_client` などの広告関連の文字列がないこと、`legacy/` が存在する間は `app-ads.txt` が `legacy/pages/app-ads.txt` と同一であることを確認する。失敗時は理由を表示して終了コード 1 にする(research.md の 8)
- [X] T033 [US4] `package.json` の scripts に、`verify`(`node scripts/verify-output.mjs`)を追加する(T032 に依存)
- [X] T034 [P] [US4] `.github/workflows/ci.yml` の `pnpm generate` の後に、`pnpm verify` の工程を追加する(T025、T033 に依存)
- [X] T035 [P] [US4] `.github/workflows/deploy.yml` の `build` ジョブで、`pnpm generate` の後、アップロードの前に `pnpm verify` の工程を追加する(T024、T033 に依存)
- [X] T036 [US4] `pnpm generate && pnpm verify` が成功することを確認する。その後、確認のため `public/ads.txt` を一時的に置いて `pnpm verify` が失敗することを確認し、元に戻す(コミットしない)。`.output/public/app-ads.txt` が `legacy/pages/app-ads.txt` と `cmp` で一致することも確認する(SC-006)

**Checkpoint**: 出力の検証が自動化され、`CNAME`、`app-ads.txt`、広告なしが CI で保証される

---

## Phase 7: User Story 5 - トップページの骨組みを確認できる (Priority: P3)

**Goal**: `/` を開くと、共通のヘッダーとフッターに挟まれた、トップページの骨組みが表示される。静的生成が、存在するページだけを出力する。

**Independent Test**: `/` を開き、エラーなく表示され、ヘッダーとフッターが含まれることを確認する(quickstart の 3 の 1)。

### Implementation for User Story 5

- [X] T037 [US5] `app/pages/index.vue` に、トップページの骨組みを作る。サイト名の見出しと、「準備中」であることが分かる短い本文だけを置く。現行のコンテンツの移植は、後続の Spec で行う(FR-006)
- [X] T038 [US5] 存在するページだけを prerender する仕組みを作る。ローカルモジュール `modules/prerender-pages.ts` で、`pages:resolved` のフックで静的なページのパスを集め、`nitro:build:before` で `nitro.prerender.routes` へ足す。`nuxt.config.ts` の `crawlLinks` は `false` のままにする(未移植パスへのリンクがあっても `nuxt generate` が失敗しないため。research.md の 4)。一時的なページ(静的、入れ子、動的)で、静的と入れ子だけが出力されることを確認する(T005 に依存)
- [X] T039 [US5] `pnpm dev` と `pnpm generate`(出力は `pnpm preview` で配信)の両方で、`/` がエラーなく表示され、ヘッダーとフッターが含まれることを確認する。ブラウザーのコンソールにエラーが出ていないことも確認する

**Checkpoint**: すべてのユーザーストーリーが、単独で動く

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 全体の確認と、Constitution への準拠の最終確認

- [ ] T040 [P] リポジトリのルートに、`yarn.lock` と `package-lock.json` が存在しないことを確認する(FR-015、原則 V)。`git diff --stat nuxt4-rebuild...HEAD -- legacy` が空で、このブランチで `legacy/` が変更されていないことも確認する(FR-016、原則 VI。コミット済みの変更も対象にするため、ブランチの基点と比較する)
- [ ] T041 [quickstart.md](./quickstart.md) の手順 1〜5 を、通しで実行して確認する。Success Criteria SC-001〜SC-007 に未達がないこと、`pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify` が、クリーンな環境(`rm -rf node_modules .nuxt .output` の後の `pnpm install --frozen-lockfile`)で、すべて成功することを確認する

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 依存なし。すぐに始められる
- **Foundational (Phase 2)**: Setup の完了に依存。すべてのユーザーストーリーをブロックする
- **User Stories (Phase 3〜7)**: すべて Foundational の完了に依存
  - US1 → US2: 同じ `AppHeader.vue` を編集するため、順番に行う
  - US3 は US1、US2 と独立している(ファイルが別)。ただし、T028 の PR 確認の前に、アプリのコードが一通りあるほうがよい
  - US4 の T034、T035 は、US3 の T024、T025(ワークフローの作成)に依存する
  - US5 の T038 は、`nuxt.config.ts`(T005)の編集で、US1〜US4 とファイルが重ならない
- **Polish (Phase 8)**: 対象のユーザーストーリーがすべて完了してから

### User Story Dependencies

- **US1 (P1)**: Foundational の後に開始できる。他のストーリーへの依存なし
- **US2 (P2)**: US1 の `AppHeader.vue`(T016)に依存する
- **US3 (P2)**: Foundational の後に開始できる。他のストーリーへの依存なし(T028 の確認は、US1、US2 の後が望ましい)
- **US4 (P3)**: ファイルの配置(T029〜T033)は Foundational の後に開始できる。T034、T035 は US3 に依存する
- **US5 (P3)**: Foundational の後に開始できる。T039 の確認は、US1(ヘッダーとフッター)が済んでいることが前提

### Within Each User Story

- データ、アイコンなどの部品 → コンポーネント → レイアウト → 確認の順
- 同じファイルを編集するタスクは、順番に行う(`AppHeader.vue`、`ci.yml`、`deploy.yml`、`README.md`、`nuxt.config.ts`)
- ストーリーが完了してから、次の優先度へ進む

### Parallel Opportunities

- Phase 1: T001、T004、T005、T006、T007、T008 は並行できる(T002 → T003 は順番)
- Phase 2: T010、T011 は並行できる(T009 とも、ファイルが別)
- US1: T013、T014 は並行できる
- US3 と US4 の配置タスク: T023 と、T029、T030、T031 は、ファイルが別なので並行できる
- T034 と T035 は、別ファイルなので並行できる
- Polish: T040 は、他のタスクと並行できる

---

## Parallel Example: User Story 1

```text
# US1 の部品を、一緒に作る:
Task: "app/data/navigation.ts を作成する(T013)"
Task: "app/components/IconGithub.vue を作成する(T014)"

# その後、順番に:
T015 AppFooter.vue → T016 AppHeader.vue → T017 layouts/default.vue → T018、T019 の確認
```

## Parallel Example: User Story 4

```text
# 公開物のファイルを、一緒に配置する:
Task: "public/CNAME をコピーする(T029)"
Task: "public/app-ads.txt をコピーする(T030)"
Task: "public/favicon.ico をコピーする(T031)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1: Setup を完了する
2. Phase 2: Foundational を完了する(重要。すべてをブロックする)
3. Phase 3: User Story 1 を完了する
4. **止めて確認する**: デスクトップ幅で、ヘッダー、メニュー、フッターが現行と同等であることを確認する
5. 以降は、`main` へはマージせず、`nuxt4-rebuild` へ PR で統合する

### Incremental Delivery

1. Setup と Foundational を完了する → 骨格が動く
2. US1 を追加する → 単独で確認する(MVP)
3. US2 を追加する → モバイルのメニューを確認する
4. US3 を追加する → PR の CI が動く。以降の変更は、CI を通して統合する
5. US4 を追加する → 出力の検証が CI に入る
6. US5 を追加する → トップの骨組みと、prerender の設定が整う
7. 各ストーリーは、前のストーリーを壊さずに価値を足す

### 推奨する進め方

- 1人で進めるので、Phase の順(US1 → US2 → US3 → US4 → US5)で行う。
- US3 の T028(PR の作成)は、外部へ公開する操作のため、US1 と US2 の動作確認が済んでから、ユーザーに確認して行う。
- 各タスク、または論理的なまとまりごとに、日本語のメッセージでコミットする。

---

## Notes

- [P] のタスクは、別ファイルで、依存がない
- [Story] のラベルで、タスクを特定のユーザーストーリーに対応づける
- 各ユーザーストーリーは、単独で完了し、確認できる
- 見た目の比較は、現行の `https://roudai.net` を並べて開いて行う(幅 1440px、1024px、390px)
- `legacy/` は変更しない。コピーするときは `cp` で行い、内容を加工しない
- 避けること: あいまいなタスク、同じファイルの競合、ストーリー間の依存による独立性の崩れ
