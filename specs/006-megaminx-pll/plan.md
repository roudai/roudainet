# Implementation Plan: Megaminx PLL の判断基準のページ

**Branch**: `006-megaminx-pll` | **Date**: 2026-11-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-megaminx-pll/spec.md`

## Summary

新しいページ `/megaminx/megaminx-pll` を作る。メガミンクスの PLL の 151 ケースを、先頭の「基礎知識」と、覚える順の 27 段階のタブで見せ、各ケースの画像と手順の下に、運営者が書き足していく判断基準を表示する。この Spec では文章は書かず、枠と「準備中」の表示を作る。

主な設計判断は次のとおり。

- **ケースのデータ**:名前と手順は `megaminx-image/cases` の `PLL_CASES` から読む(エディターのデータと 151 件で一致)。覚える順の段階(27)とグループの説明(25)は、エディターの値を `pll-stages.ts` に写す([research.md](./research.md) の 1)。
- **運営者が書くファイル**:判断基準は `pll-recognition.ts`(ケース名 → 段落)。151 件の空の欄を覚える順に用意する。基礎知識は `pll-basics.ts`(節 → 見出し・段落・例の図)。「偽ペア」「偽バー」を空で用意する(research.md の 2、[data-model.md](./data-model.md))。
- **誤りの検出**:ケース名の打ち間違いなどは、ページを組み立てるときに確かめ、静的生成を失敗させる(research.md の 3)。
- **タブ**:28 個の領域をすべて HTML に含め、`v-show` で切り替える。選択は URL のハッシュに `history.replaceState` で書き、読み込み時と `hashchange` で読む(research.md の 4、[contracts/page.md](./contracts/page.md))。
- **1 ケース**:新しい部品 `MegaminxPllCase.vue` が、ケース名、既存の `MegaminxView.vue`(画像と手順)、判断基準を並べる(research.md の 5)。
- **確認**:`scripts/pages.mjs` に `newPages` を足し、出力の検証の対象にする。パリティの確認の対象にはしない(research.md の 7)。

## Technical Context

**Language/Version**:TypeScript 5.9.x(001 と同じ。7 未満に固定)、Node 24(LTS)

**Primary Dependencies**:Nuxt 4.6.3、Vue 3、Tailwind CSS 4.3.3、megaminx-image 1.0.0(005 から。`megaminx-image/cases` を新たに使う)。新しい依存は無い

**Storage**:N/A(静的なデータ定義のみ。[data-model.md](./data-model.md))

**Testing**:
- 自動テストは作らない(Spec で必須としていない)。
- 品質ゲート:Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`。
- 確認:ブラウザーでのタブとハッシュの動き、書き足したときの表示、`scripts/verify-parity.mjs` の結果が変わらないこと([quickstart.md](./quickstart.md))。

**Target Platform**:静的サイト。モダンなブラウザー(モバイルとデスクトップ)。配信は GitHub Pages

**Project Type**:静的 Web サイト(フロントエンドのみ)

**Performance Goals**:タブの切り替えが体感で遅くない。HTML の大きさは実装の後に測って記録する(SVG 151 個。gzip 後で数十 KB の見込み。research.md の 8)

**Constraints**:
- SSG のみ(原則 I)。すべてのタブの中身を静的生成した HTML に含める(FR-011)。
- 既存のページの本文は変えない。ヘッダーのメニューに 1 項目を足すだけ(FR-010)。
- `legacy/` は変更しない(原則 VI)。

**Scale/Scope**:ページ 1、タブ 28、ケース 151。新しいファイル:ページ 1、部品 1、データ 3。変更:メニュー 1、確認のスクリプト 2。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 判定 | 根拠 |
|------|------|------|
| I. 最新の安定版 Nuxt、TypeScript、静的生成のみ | ⚠ 逸脱(001 から継続) | 静的生成のみ。タブの切り替えだけをブラウザーで行う。TypeScript を 5.9 に固定している点は、001 の Complexity Tracking を引き継ぐ(新しい逸脱ではない) |
| II. URL の互換性 | ✅ 合格 | 既存のパスは変えない。新しいパスを 1 つ足すだけ |
| III. Web サイトに広告を含めない | ✅ 合格 | 広告に関わる変更は無い。`scripts/verify-output.mjs` で新しいページも確かめる |
| IV. 機能パリティを最優先 | ✅ 合格 | 003 と 004 を公開し、パリティを確認した後の、別の Spec としての機能の追加である。既存のページへの変更(メニューの 1 項目)は spec.md の「現行の内容から変更した箇所」に記録した。本文は変えない |
| V. CI による品質ゲート | ✅ 合格 | 001 の `ci.yml` で、Lint、型チェック、生成、出力の検証を実行する。依存は変えない |
| VI. `legacy/` は読み取り専用 | ✅ 合格 | `legacy/` には触れない |
| VII. 本番デプロイは `main` からのみ | ✅ 合格 | ワークフローは変更しない |
| VIII. 依存ライブラリは spike で検証 | ✅ 合格 | 新しい依存は無い。megaminx-image は 005 で検証済み(research.md の 8) |
| Technology & Delivery Constraints:解法画像 | ✅ 合格 | 画像ファイルは足さない。図は HTML の中の SVG |

**事前ゲート**:新しい逸脱はない。

**Phase 1 後の再評価**:同じ(新たな違反なし)。

## Project Structure

### Documentation (this feature)

```text
specs/006-megaminx-pll/
├── plan.md              # このファイル(/speckit-plan の出力)
├── research.md          # Phase 0 の出力
├── data-model.md        # Phase 1 の出力
├── quickstart.md        # Phase 1 の出力
├── contracts/
│   └── page.md          # Phase 1 の出力(ページ、タブ、ハッシュ、部品、確認のスクリプトの契約)
├── checklists/
│   └── requirements.md  # /speckit-specify の出力
└── tasks.md             # Phase 2 の出力(/speckit-tasks で作成。ここでは作らない)
```

### Source Code (repository root)

```text
app/
├── components/
│   └── MegaminxPllCase.vue        # 新規: ケース名、MegaminxView、判断基準
├── data/
│   ├── navigation.ts              # 変更: Megaminx の最後に「Megaminx PLL」
│   └── megaminx/
│       ├── pll-stages.ts          # 新規: 27 段階とグループの説明(エディターから写す)
│       ├── pll-recognition.ts     # 新規: 判断基準(運営者が書く。151 件の空の欄)
│       └── pll-basics.ts          # 新規: 基礎知識(運営者が書く。偽ペア・偽バーの空の節)
└── pages/megaminx/
    └── megaminx-pll.vue           # 新規: タブ、基礎知識、段階
scripts/
├── pages.mjs                      # 変更: newPages を足す
└── verify-output.mjs              # 変更: newPages も確かめる
```

- 変えないもの:`MegaminxImage.vue`、`MegaminxView.vue`、既存のページ、`main.css`、`verify-parity.mjs`。

**Structure Decision**:003・005 の構成(`app/data/megaminx/` のデータ、Megaminx の図の部品)に揃える。ページとケースの部品を新しく足す。

## 実装上の留意点

- **データを写す**:`pll-stages.ts` と `pll-recognition.ts` の中身は、エディターの `data/pll/learn_order.json`、`js/case-sections.js`、`js/case-groups.js` を読む一度だけのスクリプト(scratchpad、コミットしない)で書き出す。手で写さない。
- **検証の場所**:ページの `<script setup>` で、表示用の値(段階ごとのケースの名前・手順・判断基準、基礎知識の例の図の手順)を組み立てるときに確かめる。サーバー側(prerender)で例外になれば静的生成が失敗する。
- **ハイドレーション**:選んでいるタブは、サーバー側とハイドレーションの時点では常に基礎知識にし、`onMounted` でハッシュ(ルートのハッシュ。research.md の 4 の実装時の変更)を読んで切り替える。`hashchange` の受け取りは `onBeforeUnmount` で外す。
- **id**:ケースの描画先は `pll-<ケース名>`、基礎知識の例の図は `pll-basics-<節>-<図>`、タブの領域は `pll-tab-<ハッシュ>`。どれもハッシュ(`basics`、`F1` など)と重ならないようにする(読み込み時に、ブラウザーがその要素までスクロールしないように)。
- **大きさの記録**:生成した HTML の大きさ(圧縮前と gzip 後)を測り、quickstart に「(実装時の記録)」として書く。

## Complexity Tracking

この Spec で新しく正当化が必要な逸脱はない。原則 I(TypeScript を 5.9 に固定)は、001 の Complexity Tracking を引き継ぐ。
