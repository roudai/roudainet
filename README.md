# roudainet

> **再構築中(Nuxt 2 → Nuxt 4)**: このリポジトリは、Nuxt 4 + TypeScript(静的生成のみ)へ作り直している最中です。
> 旧 Nuxt 2 のソースは `legacy/` にあり、移植元の参照用として読み取り専用です。
> 下の「Build Setup」以降は Nuxt 2 時代の内容で、切り替え時に書き換えます。

## 再構築の運用ルール

- **`main` へのマージは、全移植と切り替えチェックリストの完了まで行わない。** `main` へのマージが本番(`https://roudai.net`)への公開を起動するため。
- **`nuxt4-rebuild` を統合ブランチとする。** 機能ごとの作業ブランチ(`001-site-foundation` など)は、`nuxt4-rebuild` へ PR でマージする。
- **PR の CI**(`.github/workflows/ci.yml`。対象ブランチは `main` と `nuxt4-rebuild`)では、Lint、型チェック、静的生成のビルド確認、ワークフローの構文検査を行う。**デプロイはしない。**
- **本番への公開は `main` への push だけ**(`.github/workflows/deploy.yml`)。
- パッケージマネージャーは **pnpm**(`package.json` の `packageManager` で固定)、Node は `.nvmrc` のバージョンを使う。ロックファイルは `pnpm-lock.yaml` のみ。
- `legacy/` は変更しない。移行が完了して新サイトを公開したら削除する。

### 開発コマンド

```bash
corepack enable
pnpm install --frozen-lockfile

pnpm dev          # 開発サーバー(http://localhost:3000)
pnpm lint         # ESLint と Prettier の確認
pnpm typecheck    # 型チェック
pnpm generate     # 静的生成(出力は .output/public)
pnpm preview      # 生成結果の確認
```

### リポジトリの外で行う設定

次の設定は、リポジトリのコードでは変更できないため、運営者が GitHub の画面で行う。

1. **Settings > Pages > Source を「GitHub Actions」へ切り替える。** 現在の「Deploy from a branch(`gh-pages`)」のままだと、`deploy.yml` の公開が反映されない。**`main` の初回デプロイの直前**に行う。
2. **Custom domain が `roudai.net` のままであることを確認する。** Actions 方式では、出力の `CNAME` ファイルは Pages に使われず、独自ドメインは Settings の設定で決まる。
3. **ブランチ保護を設定する。** `main` と `nuxt4-rebuild` への PR で、`ci.yml` の `check` と `actionlint` を必須にする。Lint や型チェックに失敗した変更をマージさせないため。

設定済みの確認項目:

- [ ] Pages の Source が「GitHub Actions」になっている
- [ ] Custom domain が `roudai.net` になっている
- [ ] `main` と `nuxt4-rebuild` のブランチ保護で、`ci.yml` が必須になっている

> **注意**: `deploy.yml` は、`main` へのマージまで本番では動かせないため、初回のデプロイは失敗する可能性がある。
> 失敗した場合は、Actions のログを確認して直す。直前に公開されていたサイトは、そのまま残る。

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
