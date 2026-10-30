<!--
Sync Impact Report
- Version change: (template, unversioned) → 1.0.0
- Modified principles: none (initial ratification; all placeholders replaced).
  Before the first commit, III was redefined from "keep deployment assets incl. ads" to
  "no Google ads on the site; keep CNAME and app-ads.txt", and II/IV got exceptions. Version stays 1.0.0 because
  1.0.0 was never committed or published.
- Added sections: Core Principles I–VIII, Technology & Delivery Constraints,
  Migration Workflow, Governance
- Removed sections: none
- Templates requiring updates:
  - .specify/templates/plan-template.md ✅ no change (Constitution Check is generic)
  - .specify/templates/spec-template.md ✅ no change
  - .specify/templates/tasks-template.md ✅ no change (tests stay OPTIONAL)
  - README.md ⚠ pending (still the Nuxt 2 boilerplate; rewrite after cutover)
  - CLAUDE.md ✅ language rule added (Spec Kit documents are written in Japanese)
- Follow-up TODOs: none
-->
# roudai.net Constitution

roudai.net は、ツイスティパズル(ルービックキューブ、メガミンクスなど)の解法メモを載せた
個人サイトで、GitHub Pages で公開している。この Constitution は、Nuxt 2 から最新の Nuxt への
再構築を対象とする。Nuxt 2 のソースは、移植元の参照用として `legacy/` に保存している。

## Core Principles

### I. 最新の安定版 Nuxt、TypeScript、静的生成のみ
サイトは最新の安定版 Nuxt と TypeScript で構築し、静的生成(SSG)のみで出力しなければならない
(MUST)。出力は GitHub Pages から配信するため、サーバーランタイムは使ってはならない。

### II. URL の互換性
現行サイトが配信している全 URL は、移行後も同じパスで到達できなければならない(MUST)。
切り替え前に新旧サイトのルート一覧を突き合わせ、404 を返すルートがあってはならない。
ルートを削除・変更する場合は、リダイレクトと理由の記録が必要である。
例外: `/ads.txt` は、原則 III により意図的に廃止するため、404 を許容する。
理由: 検索順位と既存の外部リンクを維持するため。

### III. Web サイトに広告を含めない、配信用ファイルは CNAME と app-ads.txt
サイトの表示には、Google 広告を一切含めてはならない(MUST NOT)。具体的には次のとおり。
- Google AdSense のモジュール、スクリプト、広告枠を含めない。
- `ads.txt` を、生成したサイトに含めない。
- 広告表示を前提にしたレイアウトの余白や、広告用の meta タグを残さない。

次の2つは、生成したサイトのルートに必ず含めなければならない(MUST)。
- `CNAME`(`roudai.net`)。移植元は `legacy/static/CNAME`。欠けると独自ドメインが外れる。
- `app-ads.txt`。setlist-memo アプリの広告配信元の検証に使うため、内容を変えずに残す。
  移植元は `legacy/pages/app-ads.txt` で、新サイトの `public/` へコピーする。

理由: Web サイトの広告を廃止する要件のため。ただし `app-ads.txt` はアプリ側の検証用なので、
Web サイトの広告とは切り離して維持する。AdSense の管理画面などの外部設定は、
リポジトリの外で別途対応する。

### IV. 機能パリティを最優先
最初の目標は、現行のページと挙動の再現である。対象ページのパリティを確認するまで、
デザイン刷新や機能追加に着手してはならない(MUST NOT)。それらは、パリティ確認後に
別の機能として Spec を作成する。広告の廃止(原則 III)は、パリティの対象外とする。

### V. CI による品質ゲート
Lint と TypeScript の型チェックを CI で実行し、`main` へのマージ前にパスしなければならない
(MUST)。パッケージマネージャーとロックファイルは、それぞれ1つだけにする。
現行の `yarn.lock` と `package-lock.json` の併存を引き継いではならない。

### VI. `legacy/` は読み取り専用
`legacy/` 配下のファイルを変更してはならない(MUST NOT)。移植のための参照にのみ使う。
移行が完了して新サイトを公開したら、`legacy/` を削除しなければならない。

### VII. 本番デプロイは `main` からのみ
本番(`gh-pages`)へのデプロイは、`main` からのみ行わなければならない(MUST)。
`main` へのマージがワークフローを起動するため、マージ前にワークフローを新サイト用に
書き直す(Node と Actions を現行版にし、Pages デプロイ方式にする)。PR のビルド確認は、
デプロイしてはならない。

### VIII. 依存ライブラリは spike で検証
Vue 3 や SSG で動かない可能性のある外部ライブラリ(Buefy の代替、`sr-puzzlegen`、
`sr-visualizer`)は、Plan で採用する前に、小さな spike で検証しなければならない(MUST)。
検証は、開発サーバーと `nuxt generate` の出力の両方で行う。検証に失敗した場合は、
その結果と、代わりに選んだ手段を記録する。

## Technology & Delivery Constraints

- 配信: `nuxt generate` の出力を、GitHub Pages の `https://roudai.net` で公開する。
- 言語: TypeScript。Node と Nuxt のバージョンは、ロックファイルと CI で固定する。
- コンテンツ: `legacy/assets/images` の解法画像は、原則 II のリダイレクト規則の対象でない限り、
  URL を変えずに引き継ぐ。
- テストは、各 Spec で求められた場合のみ作成する(任意)。ただし、原則 V の Lint と型チェックは
  任意ではない。

## Migration Workflow

- 作業は `nuxt4-rebuild` ブランチで行う。再構築前の状態には、タグ `v1-nuxt2` を付けている。
- 機能単位で移植する。順序は次のとおり。
  基盤(レイアウト、ナビ、フッター、デプロイ) → キューブ系ページ
  (`pll`、`oll`、`f2l`、`bld`、`fmc`) → `megaminx` と `clock` → `other` と `index`。
- `main` へマージする前に、次のチェックリストをすべて完了しなければならない(MUST)。
  原則 II のルート比較、原則 III の `CNAME` と `app-ads.txt` の配置および Web 広告の不在、
  原則 VII のワークフロー書き換え、`README.md` の更新、`legacy/` の削除。
- Spec Kit が作成するドキュメントは、日本語で記載する(詳細は `CLAUDE.md` の言語ルール)。

## Governance

この Constitution は、本プロジェクトにおける他の慣行よりも優先する。改訂は、このファイルを
編集して行い、Sync Impact Report の更新、バージョンの更新、`.specify/templates/` との
整合確認を伴わなければならない。

バージョニングはセマンティックバージョニングに従う。原則の削除・再定義は MAJOR、
原則の追加や指針の大幅な拡充は MINOR、文言の明確化は PATCH とする。

準拠状況は、各 Plan の Constitution Check と、切り替え時のチェックリストで確認する。
逸脱する場合は、Plan の複雑さの追跡(complexity tracking)に理由を記載しなければならない。

**Version**: 1.0.0 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-10-29
