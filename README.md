# roudainet

[roudai.net](https://roudai.net) のソースです。ルービックキューブ、メガミンクス、ルービッククロックなどの手順と解法をまとめた個人サイトで、GitHub Pages で公開しています。

## 技術構成

- [Nuxt](https://nuxt.com) 4、Vue 3、TypeScript、静的生成(SSG)のみ。サーバーランタイムは使いません
- [Tailwind CSS](https://tailwindcss.com) 4
- キューブの図は [sr-visualizer](https://www.npmjs.com/package/sr-visualizer)、メガミンクスの図は [sr-puzzlegen](https://www.npmjs.com/package/sr-puzzlegen) で、ブラウザーで描画します
- パッケージマネージャーは pnpm(`package.json` の `packageManager` で固定)、Node は `.nvmrc` のバージョン。ロックファイルは `pnpm-lock.yaml` のみです

## 開発

```bash
corepack enable
pnpm install --frozen-lockfile

pnpm dev        # 開発サーバー(http://localhost:3000)
pnpm lint       # ESLint と Prettier の確認
pnpm typecheck  # 型チェック
pnpm generate   # 静的生成(出力は .output/public)
pnpm preview    # 生成結果の確認(http://localhost:3000、ポートは引数で変更可)
pnpm verify     # 生成結果の検証(必要なページとファイル、広告の痕跡がないこと)
```

## ディレクトリ構成

```text
app/
├── pages/            # ページ。ファイルの配置が URL のパスになる
├── components/       # ヘッダー、フッター、図の描画(CubeImage、MegaminxImage、MegaminxView)
├── data/             # 手順の文字列と図の指定(cube/、megaminx/)とメニュー(navigation.ts)
└── assets/css/       # スタイル
public/               # そのまま配信するファイル(CNAME、app-ads.txt、favicon.ico、解法の画像)
modules/              # 全ページを静的生成の対象にするモジュール
scripts/              # preview と検証のスクリプト。pages.mjs に配信するページの一覧がある
specs/                # 機能ごとの仕様、計画、タスク(Spec Kit)
legacy/               # 旧 Nuxt 2 のソース(参照用)
```

ページを追加したときは、`scripts/pages.mjs` の一覧にもパスを追加してください。`pnpm verify` が、一覧のページが出力されていることを確認します。

## 運用ルール

開発の原則は [`.specify/memory/constitution.md`](.specify/memory/constitution.md) にあります。主なものは次のとおりです。

- **`main` へ push すると、本番に公開されます**(`.github/workflows/deploy.yml`)。小さな変更は `main` へ直接 push して構いません。公開の前に、手元で `pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify` を実行してください。
- **CI**(`.github/workflows/ci.yml`)は、PR と `main` への push で、Lint、型チェック、静的生成、出力の検証、ワークフローの構文検査を行います。CI は公開を止めないため、`main` への push の後は、CI の結果も確認してください。
- **広告は載せません。** `pnpm verify` が、広告の痕跡がないことを確認します。`app-ads.txt` は、アプリ(setlist-memo)の広告配信元の検証に使うため、内容を変えずに配信しています。

## 公開と GitHub の設定

- GitHub Pages の配信元は「GitHub Actions」、独自ドメインは `roudai.net`(HTTPS を強制)です。独自ドメインは Settings > Pages の設定で決まります。
- `github-pages` 環境は、`main` からのデプロイを許可しています。
