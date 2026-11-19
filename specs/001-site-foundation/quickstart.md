# Quickstart: サイト基盤の検証

**Feature**: `001-site-foundation` | **Date**: 2026-10-30

実装後に、この機能が動くことを確認する手順。実装コードは含めない。
データは [data-model.md](./data-model.md)、メニューと出力の契約は [contracts/navigation.md](./contracts/navigation.md) を参照する。

## 前提

- Node 24(LTS)。`.nvmrc` に固定している。Nuxt 4.6.x は Node `^22.21.0 || ^24.11.0 || >=26.0.0` を要求するため、古い Node では警告が出る。
- pnpm 10(`package.json` の `packageManager` で固定。`corepack enable` で有効になる)。
- 作業ブランチ: `001-site-foundation`(`nuxt4-rebuild` へ PR でマージする)。

## セットアップ

```sh
corepack enable
pnpm install --frozen-lockfile
```

期待結果: エラーなくインストールされ、`pnpm-lock.yaml` が変更されない。`yarn.lock` と `package-lock.json` がリポジトリのルートに存在しない(FR-015)。

## 1. 品質ゲート(US3、SC-007)

```sh
pnpm lint          # ESLint と Prettier の確認
pnpm typecheck     # nuxt typecheck
pnpm generate      # nuxt generate
node scripts/verify-output.mjs
```

期待結果: すべて終了コード 0。`legacy/` は、どのコマンドの検査対象にも入らない。

型チェックのゲートとして機能することを確認する場合は、`app/` 内に意図的な型エラー(例: `const a: number = 'x'`)を入れて `pnpm typecheck` が終了コード 0 以外になること、確認後に元へ戻すことを行う。

## 2. 出力の検証(US4、SC-006)

`pnpm generate` の後、`.output/public` を確認する。

```sh
ls .output/public                 # CNAME、app-ads.txt、favicon.ico、index.html がある
cat .output/public/CNAME          # roudai.net
cmp .output/public/app-ads.txt legacy/pages/app-ads.txt   # 差分なし
test ! -e .output/public/ads.txt  # ads.txt がない
grep -ril "adsbygoogle\|google-adsense\|google_ad_client" .output/public || echo "広告関連なし"
```

期待結果: コメントのとおり。`scripts/verify-output.mjs` が同じ内容を自動で確認する。

## 3. ヘッダーとメニュー(US1、US2、SC-001〜SC-003)

```sh
pnpm dev                          # http://localhost:3000
pnpm generate && pnpm preview     # generate の出力を静的に配信して、同じ確認をもう一度行う(http://localhost:3000)
```

ブラウザーで次を確認する。`dev` と `generate` の出力の両方で行う(原則 VIII)。

1. トップページに、ヘッダー(サイト名、9 カテゴリ、GitHub アイコン)とフッター(「© 2012-{年} roudai.net」と GitHub アイコン)が表示される。
2. 幅 1024px 以上: カテゴリにポインターを重ねるとドロップダウンが開く。Tab キーでフォーカスを移しても開く。項目が [contracts/navigation.md](./contracts/navigation.md) の表と一致する(26 項目)。
3. 幅 1024px 未満: メニューは閉じていて、バーガーボタンで開閉できる。開くと全項目が縦に並ぶ。
4. 外部リンク 5 件が、表のとおりの URL を指している。
5. 現行サイト(`https://roudai.net`)を並べて開き、色、余白、メニューの挙動に、気づく相違がない(SC-003)。幅 1440px、1024px、390px の 3 通りで比較する。

メニューの未移植パスは、この時点では 404 になる。これは想定どおりである。
`pnpm dev` では、未移植のリンクについて、vue-router の警告(`No match found for location with path ...`)がコンソールに出る。これも想定どおりで、生成した出力(`pnpm preview`)では出ない。

## 4. CI のワークフロー(US3、SC-004、SC-005)

`nuxt4-rebuild` 宛てに PR を作り、次を確認する。

1. `ci.yml`(Lint、型チェック、`nuxt generate`、出力の検証)が自動で実行され、結果が PR に表示される。実行時間が 15 分以内。
2. デプロイのジョブが実行されない。本番サイトが更新されない(SC-005)。
3. Lint または型チェックを意図的に失敗させた PR では、ジョブが失敗する。ブランチ保護を設定した後は、マージもできなくなる(FR-010)。
4. `main` 宛ての PR でも `ci.yml` が実行される(対象ブランチは `main` と `nuxt4-rebuild`)。

`deploy.yml`(`main` への push で起動)は、`main` へのマージまで本番では動かせない。
その代わり、`deploy.yml` のビルドと成果物のアップロードの工程は `ci.yml` と同じ複合アクションを使い、
デプロイ工程(`actions/deploy-pages`)だけが未検証になるようにする。
`main` への初回マージの前に、リポジトリの Settings > Pages の Source を「GitHub Actions」へ変更し、
Custom domain が `roudai.net` のままであることを確認する(リポジトリの外の操作)。

## 5. 文書(US3、FR-012)

- `README.md` またはリポジトリの文書に、「全移植と切り替えチェックリストの完了まで `main` へマージしない」運用と、`nuxt4-rebuild` を統合ブランチにする運用が書かれている。
  (`README.md` の全面更新は、切り替え時のチェックリスト項目。この Spec では、運用の記載だけを行う。)

## 完了の目安

- 上の 1〜5 がすべて期待どおり。
- Spec の Success Criteria SC-001〜SC-007 に、未達がない。
