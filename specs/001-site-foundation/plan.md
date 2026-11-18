# Implementation Plan: サイト基盤

**Branch**: `001-site-foundation` | **Date**: 2026-10-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-site-foundation/spec.md`

## Summary

roudai.net の再構築の最初の機能として、共通レイアウト(ヘッダー、フッター)、メニュー、トップページの骨組み、
GitHub Pages へのデプロイ基盤、CI 品質ゲートを、Nuxt 4 + TypeScript の静的生成で作る。
CSS は Tailwind CSS(v4、Vite プラグイン)で、現行の Bulma の見た目と挙動を再現する。
Buefy は使わない。spike(`nuxt dev` と `nuxt generate`)で、Tailwind が両方で動くことを確認済みである([research.md](./research.md))。

主な設計判断は次のとおり。

- メニューは、型付きのデータ(`app/data/navigation.ts`)から描画し、現行の 9 カテゴリ、26 項目を同じ順序で持つ([contracts/navigation.md](./contracts/navigation.md))。
- 未移植ページへのリンクを残すため、`crawlLinks` を止め、存在するページだけを prerender する(spike で、止めないと `nuxt generate` が 404 で失敗することを確認)。
- 型チェックは、TypeScript 5.9 に固定した `vue-tsc` で行う(spike で、TypeScript 7 では動かないことを確認)。
- パッケージマネージャーは pnpm に統一する。CI は、PR 用(`ci.yml`、デプロイなし)と、`main` 用(`deploy.yml`、Pages へデプロイ)に分ける。

## Technical Context

**Language/Version**: TypeScript 5.9.x(`typescript@^5`、7 未満)、Node 24(LTS)

**Primary Dependencies**: Nuxt 4.6.3、Vue 3、Tailwind CSS 4.3.3(`@tailwindcss/vite`)、`@nuxt/eslint`、Prettier 3、`vue-tsc`

**Storage**: N/A(静的なデータ定義のみ。[data-model.md](./data-model.md))

**Testing**: 自動テストは作らない(Spec で必須としていない)。品質ゲートは Lint、型チェック、`nuxt generate`、出力の検証スクリプト(`scripts/verify-output.mjs`)。見た目は、現行サイトとの目視比較(quickstart)

**Target Platform**: 静的サイト。モダンなブラウザー(モバイルとデスクトップ)。配信は GitHub Pages(`https://roudai.net`)

**Project Type**: 静的 Web サイト(フロントエンドのみ。サーバーランタイムなし)

**Performance Goals**: 特別な目標はない。PR の CI は 15 分以内に結果が出る(SC-004)

**Constraints**:

- SSG のみ。サーバーランタイムを使わない(原則 I)
- `legacy/` は変更しない。ルートの Lint、整形、型チェックの対象から除外する(原則 VI)
- Web サイトに広告を含めない。`CNAME` と `app-ads.txt` は出力に含める(原則 III)
- デザインの刷新はしない。見た目は現行と同等(原則 IV、FR-005)

**Scale/Scope**: ページはトップの骨組みのみ。メニューは 9 カテゴリ、26 項目。コンポーネントは数個

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 判定 | 根拠 |
|------|------|------|
| I. 最新の安定版 Nuxt、TypeScript、静的生成のみ | ⚠ 逸脱(正当化あり) | Nuxt は 4.6.3(`latest`)、静的生成のみで、サーバーランタイムなし。ただし TypeScript は 5.9 に固定しており、最新の安定版(7.0.2)ではない。TypeScript 7 は `vue-tsc` 3.3.13 と非互換で、型チェックが動かないため(research.md の 3)。Complexity Tracking に理由と解除条件を記載した |
| II. URL の互換性 | ✅ 合格(この Spec では影響なし) | メニューのパスを現行と同一にした(contracts)。全ルートの突き合わせは、切り替え時のチェックリストで行う。この Spec の出力には、トップ以外のページがない |
| III. Web サイトに広告を含めない、配信用ファイルは CNAME と app-ads.txt | ✅ 合格 | AdSense モジュールを含めない。`ads.txt` はコピーしない。`CNAME` と `app-ads.txt` を `public/` に置き、検証スクリプトで確認する |
| IV. 機能パリティを最優先 | ✅ 合格 | 見た目と挙動を現行の Bulma に合わせる(切り替え幅 1024px、本文幅 10/12 など)。デザイン刷新と機能追加はしない |
| V. CI による品質ゲート | ✅ 合格 | `ci.yml` で Lint と型チェックを実行する。パッケージマネージャーとロックファイルは pnpm のみ |
| VI. `legacy/` は読み取り専用 | ✅ 合格 | `legacy/` を変更せず、ESLint、Prettier、`tsconfig` の対象から除外する |
| VII. 本番デプロイは `main` からのみ | ✅ 合格 | `deploy.yml` は `main` への push のみで起動。`ci.yml` はデプロイしない。ワークフローは Pages デプロイ方式へ書き直す |
| VIII. 依存ライブラリは spike で検証 | ✅ 合格 | Buefy の代替(Tailwind)を、`nuxt dev` と `nuxt generate` の両方で spike 検証した。`sr-puzzlegen` と `sr-visualizer` は、この Spec では使わず、使う Spec の Plan で検証する |

**事前ゲート**: 原則 I に逸脱が 1 件(TypeScript のバージョン)。Complexity Tracking に正当化を記載した。**Phase 1 後の再評価**: 同じ(新たな違反なし)。

## Project Structure

### Documentation (this feature)

```text
specs/001-site-foundation/
├── plan.md              # このファイル(/speckit-plan の出力)
├── research.md          # Phase 0 の出力
├── data-model.md        # Phase 1 の出力
├── quickstart.md        # Phase 1 の出力
├── contracts/
│   └── navigation.md    # Phase 1 の出力(メニュー構成と出力ルートの契約)
├── checklists/
│   └── requirements.md  # /speckit-specify の出力
└── tasks.md             # Phase 2 の出力(/speckit-tasks で作成。ここでは作らない)
```

### Source Code (repository root)

Nuxt 4 のアプリを、リポジトリのルートに置く。`legacy/` は、そのまま残す。

```text
app/
├── app.vue
├── assets/css/main.css        # Tailwind の読み込みと、Bulma の .content 相当の自前スタイル
├── components/
│   ├── AppHeader.vue          # ヘッダー(ブランド、メニュー、バーガーボタン、GitHub アイコン)
│   ├── AppFooter.vue          # フッター(© 2012-{年}、GitHub アイコン)
│   └── IconGithub.vue         # GitHub アイコン(色を指定できる SVG)
├── data/navigation.ts         # NavGroup / NavItem の型と、メニューの定義
├── layouts/default.vue        # ヘッダー + 本文(10/12 幅、中央寄せ) + フッター
└── pages/index.vue            # トップページの骨組み
public/
├── CNAME                      # roudai.net
├── app-ads.txt                # legacy/pages/app-ads.txt と同一
└── favicon.ico                # legacy/static/favicon.ico と同一
scripts/
├── verify-output.mjs          # 出力の検証(CNAME、app-ads.txt、ads.txt の不在、広告関連の不在)
└── preview.mjs                # 生成結果の静的配信(nuxt preview は静的生成のみの出力では使えない)
.github/
├── actions/setup/action.yml   # 共通のセットアップ(Node 24、pnpm、依存のインストール)
└── workflows/
    ├── ci.yml                 # PR 用(Lint、型チェック、generate、出力の検証。デプロイなし)
    └── deploy.yml             # main への push 用(generate → Pages へデプロイ)
modules/
└── prerender-pages.ts         # 存在する静的ページだけを prerender の対象にする
nuxt.config.ts                 # SSG、Tailwind、prerender 設定、head
tsconfig.json                  # .nuxt/tsconfig.*.json を参照。legacy/ を除外
eslint.config.mjs              # @nuxt/eslint + eslint-config-prettier。legacy/ を無視
.prettierrc                    # 現行を引き継ぐ(セミコロンなし、シングルクォート、printWidth 120)
.prettierignore                # legacy/、.output/、.nuxt/ など
.nvmrc                         # Node 24
package.json                   # packageManager、engines、scripts(lint、typecheck、generate、dev、preview)
pnpm-lock.yaml                 # ロックファイルはこれ1つ
pnpm-workspace.yaml            # 必要な場合のみ(onlyBuiltDependencies で esbuild などのビルドを許可)
legacy/                        # 読み取り専用(変更しない)
```

**Structure Decision**: アプリを、リポジトリのルートに置く(Nuxt 4 の `app/` ディレクトリ構成)。
`legacy/` に旧ソースを残すため、ルートのツール(ESLint、Prettier、`tsc`)は `legacy/` を明示的に除外する。
旧 `.github/workflows/ci.yml`(名前は `cd`)は、`deploy.yml` へ書き直し、PR 用の `ci.yml` を新しく作る。
現行のワークフローは、`legacy/` への移動後は、ルートに `package.json` がなく、そのままでは動かない。

## 実装上の留意点

- **メニューの切り替え幅**: Bulma の `navbar` は 1024px で切り替わる。ブレークポイントは、px の独自名(`tablet` 769px、`desktop` 1024px、`widescreen` 1216px、`fullhd` 1408px)で定義し、Tailwind 既定の `lg`(`64rem`)は使わない(単位が混在すると出力順が崩れるため。research.md の 2)。本文の 10/12 幅は `tablet` 以上で、中央寄せ、最大幅は幅に応じて 960 / 1152 / 1344px。
- **ドロップダウン**: ポインターの重ね(`group-hover`)に加えて `focus-within` でも開く(Spec の Edge Cases)。1024px 未満では、各カテゴリの項目を縦に並べて常時表示する(現行の Bulma と同じ)。
- **prerender の対象ページ**: `crawlLinks: false`。存在するページのパスは、ローカルモジュール `modules/prerender-pages.ts` が `routes` に追加する(research.md の 4)。
- **フッターの年**: ビルド時の年で描画し、マウント後に現在の年へ更新する(research.md の 9)。
- **外部の設定(リポジトリの外)**: Settings > Pages の Source を「GitHub Actions」へ変更する(`main` の初回デプロイの前)。Custom domain が `roudai.net` のままであることを確認する。ブランチ保護で、`main` と `nuxt4-rebuild` への PR の CI を必須にする。これらは、リポジトリのコードでは変更できない。
- **アクションのバージョン**: `actions/checkout`、`actions/setup-node`、`pnpm/action-setup`、`actions/upload-pages-artifact`、`actions/deploy-pages` は、実装時に最新のメジャー版を確認して固定する。

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 原則 I: TypeScript を最新の安定版(7.0.2)ではなく 5.9.x に固定する | `vue-tsc` 3.3.13 が TypeScript 7 と非互換で(`ERR_PACKAGE_PATH_NOT_EXPORTED`)、`nuxt typecheck` が動かない。型チェックは原則 V の必須ゲートである(spike で確認。research.md の 3) | TypeScript 7 を使うと、原則 V の型チェックを満たせない。型チェックを外す案は、原則 V に反する |

**解除条件**: `vue-tsc` が TypeScript 7 に対応した時点で、TypeScript を 7 系へ上げ、この行を削除する。確認は、`vue-tsc` のリリースごとに行う。
