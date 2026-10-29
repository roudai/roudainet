# Research: サイト基盤

**Feature**: `001-site-foundation` | **Date**: 2026-10-30

Plan の Technical Context で未確定だった項目を調べた結果をまとめる。
spike(原則 VIII)は、リポジトリの外(scratchpad)で、`nuxt dev` と `nuxt generate` の両方を実際に実行して確認した。

## 1. フレームワークとバージョン

- **Decision**: Nuxt `4.6.3`(2026-10-30 時点の `latest`)、Vue 3、静的生成のみ(`nuxt generate`)。
- **Rationale**: 原則 I(最新の安定版、SSG のみ)。spike で `nuxt generate` が成功し、`.output/public` に静的ファイルが出力されることを確認した。
- **Alternatives considered**: Nuxt 3(`3x` タグ、3.21.x)。最新の安定版という原則 I に反するため採用しない。
- **注意**: Nuxt 4.6.3 は Node `^22.21.0 || ^24.11.0 || >=26.0.0` を要求する。手元の Node 22.15.0 では「未対応」の警告が出た(動作はした)。
  CI と開発環境は Node 24(LTS)に固定する(`.nvmrc` と `engines`)。

## 2. CSS: Buefy の代替(spike 結果)

- **Decision**: Tailwind CSS `4.3.3` を、Vite プラグイン(`@tailwindcss/vite`)経由で使う。UI コンポーネントライブラリは使わない。
- **Rationale**:
  - Buefy は Vue 2 向けで、Vue 3 / Nuxt 4 では動かない。
  - spike で、`nuxt dev`(CSS が配信される)と `nuxt generate`(`entry.*.css` にレスポンシブ用の `md:` やホバー用の `group-hover` が出力される)の両方で動くことを確認した。
  - ナビは、バーガーボタン、ドロップダウン、レスポンシブの切り替えだけなので、コンポーネントライブラリなしで自前の実装が現実的。
- **Alternatives considered**:
  - Bulma の CSS だけを導入する: 見た目の再現は最も楽。ただし、ユーザーの希望(Tailwind)と異なり、JS 連動部分は結局自前になるため採用しない。
  - Nuxt UI などのコンポーネントライブラリ: 見た目が現行から変わりやすく、原則 IV(パリティ優先)に反するおそれがある。
- **パリティに関わる調査結果**(現行の Bulma の挙動を、Tailwind で再現するための値):
  - **メニューの切り替え幅**: Bulma の `navbar` は 1024px 以上でバーガーボタンを隠し、メニューを横並びにする。Tailwind の `lg`(1024px)と一致する。
  - **本文の幅**: 現行レイアウトは `columns` + `column is-10` で、769px 以上ではビューポートの 10/12 幅になる(左寄せ)。Tailwind の `md`(768px)とは 1px ずれるため、必要なら独自のブレークポイントを定義する。
  - **Preflight**: Tailwind は見出しやリスト、リンクの既定スタイルを消す。現行の `.content`(Bulma の本文スタイル)で整形されているページ本体は、後続の Spec で移植するため、基盤では `.content` 相当のスタイルを自前の CSS で定義する。`@tailwindcss/typography` は見た目が Bulma と異なるため使わない。
  - **ドロップダウン**: 現行は `is-hoverable`(ポインターを重ねて開く)。Spec の Edge Cases に合わせて、`focus-within` でもキーボードやタッチで開けるようにする。

## 3. TypeScript と型チェック(spike 結果)

- **Decision**: TypeScript は `5.9.x` に固定し(`^5`)、型チェックは `nuxt typecheck`(`vue-tsc`)で行う。ルートに、`.nuxt/tsconfig.*.json` を参照する `tsconfig.json` を置く。
- **Rationale**: spike で次の2点が判明した。
  1. `typescript@7.0.2`(`latest`)は、`vue-tsc@3.3.13` と組み合わせると `ERR_PACKAGE_PATH_NOT_EXPORTED` で型チェックが動かない。TypeScript 7 は、`vue-tsc` が対応するまで採用しない。
  2. ルートに `tsconfig.json` がないと、`tsc` のヘルプが表示されるだけで型チェックが行われない(終了コード 1)。参照を追加すると成功し(終了コード 0)、意図的な型エラーでは終了コード 2 で失敗する(CI のゲートとして機能する)。
- **Alternatives considered**: TypeScript 7 の `tsgo` 系。Vue の SFC に未対応のため採用しない。

## 4. 静的生成と未移植ページへのリンク(spike 結果)

- **Decision**: `nitro.prerender.crawlLinks` を `false` にし、`routes` に、存在するページのパスを明示する。存在するページのパスは、Nuxt の `pages:extend` フックで集めて `routes` へ渡す方針とする(実装時に動作を確認する)。
- **Rationale**: 既定(`crawlLinks: true`)のままメニューに未移植パス(例: `/f2l/f2l`)を置くと、`nuxt generate` が `[404] Page not found: /f2l/f2l` で失敗した(`Exiting due to prerender errors`)。
  この Spec では、未移植ページへのリンクを残す前提(Spec の Assumptions)なので、リンクのクロールを止める必要がある。`crawlLinks: false` と `routes: ['/']` で、`nuxt generate` は成功し、`CNAME` を含む出力が得られた。
- **Alternatives considered**:
  - `nitro.prerender.failOnError: false`: 本物のエラーまで隠れるため採用しない。
  - メニューから未移植の項目を外す: Spec のメニュー構成の要件(現行と同じ項目)に反する。
- **フォローアップ**: 全移植後の切り替えチェックリスト(原則 II)で、メニューの全パスが出力に存在することを確認する。この確認は、出力の検証スクリプトで行う(下記 7)。

## 5. Lint と整形

- **Decision**: `@nuxt/eslint`(`1.17.0`、ESLint 9 / 10 のフラットコンフィグ)と、Prettier(`3.x`)を使う。Prettier の設定は、現行の `legacy/.prettierrc`(セミコロンなし、シングルクォート、`printWidth` 120)を引き継ぐ。`eslint-config-prettier` で両者の衝突を避ける。
- **Rationale**: 原則 V(Lint と型チェックの CI ゲート)。現行の整形ルールを引き継ぐことで、移植時の差分を減らせる。
- **重要**: ルートの ESLint、Prettier、`tsc` が `legacy/` を検査対象にしてはならない(原則 VI。`legacy/` は読み取り専用で、旧設定や旧コードで CI が落ちるため)。`eslint.config` の ignores、`.prettierignore`、`tsconfig` の `exclude` に `legacy/` を入れる。
- **Alternatives considered**: ESLint のみで整形する(`@nuxt/eslint` の stylistic)。現行が Prettier を使っているため、整形ルールの移行を避けて Prettier を継続する。

## 6. パッケージマネージャー

- **Decision**: `pnpm`(`10.x`)。`package.json` の `packageManager` で固定し、ロックファイルは `pnpm-lock.yaml` のみとする。
- **Rationale**: 原則 V(パッケージマネージャーとロックファイルを1つに統一)。手元に pnpm 10.33.2 があり、spike も問題なく動いた。Nuxt の公式ドキュメントも pnpm を基本に書かれている。
- **Alternatives considered**: yarn 1(現行のワークフローが使用)。クラシック版で保守の見込みが薄いため採用しない。npm(`package-lock.json`)も可能だが、依存の厳密さとインストール速度で pnpm を選ぶ。
- **注意**: pnpm 10 は、依存のビルドスクリプトを既定で実行しない(spike で `esbuild` の警告が出た)。必要な場合は `pnpm-workspace.yaml` の `onlyBuiltDependencies` に明示する。

## 7. デプロイと CI

- **Decision**: GitHub Actions の Pages デプロイ方式を使う。`actions/upload-pages-artifact` と `actions/deploy-pages` を、`main` への push でのみ実行する。PR 用ワークフローは、Lint、型チェック、`nuxt generate`、出力の検証までを行い、デプロイしない。
  - `deploy.yml`: トリガーは `push` の `main`。`permissions` は `pages: write` と `id-token: write`、`environment: github-pages`。
  - `ci.yml`: トリガーは `pull_request`(対象は `main` と `nuxt4-rebuild`)。
  - 共通のセットアップ(Node 24、pnpm、依存のインストール)は、複合アクション(`.github/actions/setup`)にまとめる。
  - アクションのバージョンは、実装時に最新のメジャー版を確認して固定する(`gh` が手元になく、この調査では確認していない)。
- **Rationale**: 原則 VII(`main` からのみ本番デプロイ、PR ではデプロイしない)。`peaceiris/actions-gh-pages` で `gh-pages` ブランチへ push する現行の方式より、公式の方式のほうが保守しやすい。
- **重要な外部設定(リポジトリの外)**:
  - リポジトリの Settings > Pages の Source を、「Deploy from a branch(`gh-pages`)」から「GitHub Actions」へ切り替える必要がある。これは `main` の初回デプロイ(切り替え)の直前に行う。
  - Actions 方式では、出力の `CNAME` ファイルは Pages に使われない(独自ドメインは Settings の Custom domain で設定される)。ただし、原則 III が `CNAME` を出力に含めることを求めているため、ファイルは置く。Custom domain の設定が `roudai.net` のまま残っていることを、切り替え時に確認する。
  - ブランチ保護(`main` と `nuxt4-rebuild` への PR で CI を必須にする)は、リポジトリの設定で行う。
- **Alternatives considered**: 現行の `peaceiris/actions-gh-pages` を継続。`gh-pages` ブランチを持ち続けることになり、また Node 16 前提の古い構成のため、書き直す(原則 VII)。

## 8. 公開物のルートファイル

- **Decision**: `public/CNAME`(内容 `roudai.net`)、`public/app-ads.txt`(`legacy/pages/app-ads.txt` を内容そのままコピー)、`public/favicon.ico`(`legacy/static/favicon.ico` をコピー)を置く。`legacy/static/ads.txt` は、コピーしない。
- **Rationale**: 原則 III。現行の `app-ads.txt` は `legacy/pages/app-ads.txt` にあり、内容は `google.com, pub-3099989327540541, DIRECT, f08c47fec0942fa0` である(末尾の改行なし)。バイト単位で同一にコピーする。
- **出力の検証**: `scripts/verify-output.mjs` を作り、CI の `nuxt generate` の後で実行する。確認する内容は次のとおり。
  - `CNAME` と `app-ads.txt` が存在する。
  - `ads.txt` が存在しない。
  - HTML に、AdSense のスクリプトや広告用の meta タグが含まれない。
  - `legacy/` が存在する間は、`app-ads.txt` が `legacy/pages/app-ads.txt` と同一である。

## 9. フッターの内容

- **Decision**: 現行の `legacy/components/FooterBar.vue` の内容を再現する。「© 2012-{年} roudai.net」と、GitHub アイコン(黒、`https://github.com/roudai/roudainet` へのリンク)を、中央寄せで表示する。
- **Rationale**: Spec の Assumptions(フッターの内容は Plan で確認する)に対応する。現行は、年を `created()` で取得している。SSG では、ビルド時の年で出力され、クライアントで更新される。再現するときは、ビルド時の年を初期値にして、マウント後に現在の年へ更新する(新年のあと、再デプロイ前でも表示が合う)。
- **Alternatives considered**: ビルド時の年だけにする。新年以降、次回のデプロイまで年が古いままになるため採用しない。

## 10. 範囲外として確認した項目

- `sr-puzzlegen` と `sr-visualizer`(原則 VIII の対象)は、PLL、OLL などの解法ページを移植する Spec で使うため、この Spec の spike の対象外とする。それらの Spec の Plan で、同じ手順(dev と `nuxt generate` の両方)で検証する。
- `legacy/assets/images` の引き継ぎ(URL の維持)は、画像を使うページの Spec で扱う。
