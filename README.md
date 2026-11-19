# roudainet

[roudai.net](https://roudai.net) のソースです。ルービックキューブ、メガミンクス、ルービッククロックなどの手順と解法をまとめた個人サイトで、GitHub Pages で公開しています。

2026-11-19 に、Nuxt 2 から Nuxt 4 + TypeScript(静的生成のみ)へ作り直したサイトを公開しました。

## 技術構成

- [Nuxt](https://nuxt.com) 4、Vue 3、TypeScript、静的生成(SSG)のみ。サーバーランタイムは使いません
- [Tailwind CSS](https://tailwindcss.com) 4。旧サイトで使っていた Bulma のクラスのうち、ページで使うものだけを `app/assets/css/main.css` で再現しています
- キューブの図は [sr-visualizer](https://www.npmjs.com/package/sr-visualizer)、メガミンクスの図は [sr-puzzlegen](https://www.npmjs.com/package/sr-puzzlegen) で、ブラウザーで描画します
- パッケージマネージャーは pnpm(`package.json` の `packageManager` で固定)、Node は `.nvmrc` のバージョン。ロックファイルは `pnpm-lock.yaml` のみです

## 開発

```bash
corepack enable
pnpm install --frozen-lockfile

pnpm dev            # 開発サーバー(http://localhost:3000)
pnpm lint           # ESLint と Prettier の確認
pnpm typecheck      # 型チェック
pnpm generate       # 静的生成(出力は .output/public)
pnpm preview        # 生成結果の確認(http://localhost:3000、ポートは引数で変更可)
pnpm verify         # 生成結果の検証(必要なページとファイル、広告の痕跡がないこと)
pnpm verify:parity  # 旧サイトとの本文の比較(手動。下の「旧サイトとの比較」を参照)
```

## ディレクトリ構成

```text
app/
├── pages/            # ページ。ファイルの配置が URL のパスになる
├── components/       # ヘッダー、フッター、図の描画(CubeImage、MegaminxImage、MegaminxView)
├── data/             # 手順の文字列と図の指定(cube/、megaminx/)とメニュー(navigation.ts)
└── assets/css/       # Tailwind と、Bulma のクラスの再現
public/               # そのまま配信するファイル(CNAME、app-ads.txt、favicon.ico、解法の画像)
modules/              # 全ページを静的生成の対象にするモジュール
scripts/              # preview と検証のスクリプト。pages.mjs に配信するページの一覧がある
specs/                # 機能ごとの仕様、計画、タスク(Spec Kit)
legacy/               # 旧 Nuxt 2 のソース(参照用。変更しない)
```

ページを追加したときは、`scripts/pages.mjs` の一覧にもパスを追加してください。`pnpm verify` が、一覧のページが出力されていることを確認します。

## 運用ルール

開発の原則は [`.specify/memory/constitution.md`](.specify/memory/constitution.md) にあります。主なものは次のとおりです。

- **本番への公開は、`main` への push だけです**(`.github/workflows/deploy.yml`)。作業は別のブランチで行い、`main` へ PR でマージします。
- **PR の CI**(`.github/workflows/ci.yml`)では、Lint、型チェック、静的生成、出力の検証、ワークフローの構文検査を行います。デプロイはしません。
- **URL は変えません。** 旧サイトで配信していたパスは、すべて同じパスで配信しています。
- **広告は載せません。** `pnpm verify` が、広告の痕跡がないことを確認します。`app-ads.txt` は、アプリ(setlist-memo)の広告配信元の検証に使うため、内容を変えずに配信しています。
- **`legacy/` は変更しません。**

## 旧サイトとの比較

移植では、旧サイトと同じ内容を表示することを優先しました。明らかな誤字の修正と、古くなった情報の更新だけは例外とし、各 Spec(`specs/00x-*/spec.md`)の「現行の表記から直した箇所」「現行の内容から更新した箇所」に記録しています。

`pnpm verify:parity` は、本番サイトの各ページの本文と、手元の生成結果を比べ、記録にない差分がないことを確認するスクリプトです。新サイトの公開後は、本番が新サイトになったため、比較の対象としての役目は終わっています。

## 公開と GitHub の設定

- GitHub Pages の配信元は「GitHub Actions」、独自ドメインは `roudai.net`(HTTPS を強制)です。独自ドメインは Settings > Pages の設定で決まります(出力の `CNAME` ファイルは、旧方式との互換のために残しています)。
- `github-pages` 環境は、`main` からのデプロイを許可しています。
- 問題が起きた場合は、Settings > Pages の配信元を「Deploy from a branch(`gh-pages`)」に戻すと、旧サイトのビルドの配信に戻せます(`gh-pages` ブランチを削除するまで)。
