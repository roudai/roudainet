# Implementation Plan: Megaminx、Clock、Other のページの移植

**Branch**: `003-megaminx-clock-pages` | **Date**: 2026-11-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-megaminx-clock-pages/spec.md`

## Summary

Megaminx の 4 ページ、Clock の 1 ページ、Other の 3 ページ(計 8 ページ)を、`legacy/pages/` から、001 と 002 で作った Nuxt 4 のサイトへ、同じパス、内容、見た目で移植する。

主な設計判断は次のとおり。

- **Megaminx の図**:現行と同じ `sr-puzzlegen` 1.0.4 の `PNG`(`megaminx-top`)を使う。描画はブラウザーでのみ行い、`MegaminxImage.vue` にまとめる。spike(`nuxt dev` と `nuxt generate`)で、本番とほぼ同一の図が描けることを確認した([research.md](./research.md) の 1)。
- **MegaminxView**:移植元の `MegaminxView.vue` を、同じテンプレートとクラス名で移し、図の指定を props で受け取る(research.md の 3)。必要な Bulma のクラスは 002 で再現済みで、CSS は追加しない。
- **図のデータ**:002 と同じく、移植元の `data()` と `mounted()` をスタブの上で実行する変換スクリプトで、手順の文字列と図の指定(46 個)を機械的に写す(research.md の 2)。
- **Clock と Other**:文章とリンクだけのため、テンプレートの本文をそのまま写す(research.md の 4)。
- **確認**:002 の `verify-output.mjs` と `verify-parity.mjs` を、対象のパスと読む spec.md を足して使う(research.md の 5)。

## Technical Context

**Language/Version**:TypeScript 5.9.x(001 と同じ。7 未満に固定)、Node 24(LTS)

**Primary Dependencies**:
- 001 と 002 から引き継ぐもの:Nuxt 4.6.3、Vue 3、Tailwind CSS 4.3.3、`sr-visualizer` 1.0.13
- 新しく追加するもの:`sr-puzzlegen` 1.0.4(ISC。依存パッケージなし)

**Storage**:N/A(静的なデータ定義のみ。[data-model.md](./data-model.md))

**Testing**:
- 自動テストは作らない(Spec で必須としていない)。
- 品質ゲート:Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`。
- パリティの確認:`scripts/verify-parity.mjs`(手動)と、現行サイトとの並べた撮影と目視([quickstart.md](./quickstart.md))。

**Target Platform**:静的サイト。モダンなブラウザー(モバイルとデスクトップ)。配信は GitHub Pages

**Project Type**:静的 Web サイト(フロントエンドのみ)

**Performance Goals**:特別な目標はない。CO の 16 ケースなど、1ページに多数の図があっても、現行サイトと比べて、運営者がスクロールや操作を体感で遅いと感じないこと(Spec の Edge Cases)

**Constraints**:
- SSG のみ(原則 I)。図はブラウザーで描画し、本文と手順の文字列は静的な HTML に含める(FR-008)。
- `legacy/` は変更しない(原則 VI)。
- デザインの刷新と機能の追加はしない(原則 IV)。明らかな誤字だけは、例外として直して記録する。

**Scale/Scope**:
- ページ 8(図のあるページ 4、文章のページ 4)。
- 図 46 個、外部リンク 21 本。画像ファイルはない。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 判定 | 根拠 |
|------|------|------|
| I. 最新の安定版 Nuxt、TypeScript、静的生成のみ | ⚠ 逸脱(001 から継続) | Nuxt 4.6.3、静的生成のみ。`sr-puzzlegen` はブラウザーでのみ動かす。TypeScript を 5.9 に固定している点は、001 の Complexity Tracking を引き継ぐ(新しい逸脱ではない) |
| II. URL の互換性 | ✅ 合格 | 8 パスを、現行と同じパスで出力する(contracts/pages.md)。末尾のスラッシュの扱いも 002 と同じ |
| III. Web サイトに広告を含めない | ✅ 合格 | 対象ページに広告はない。`scripts/verify-output.mjs` で、引き続き確認する |
| IV. 機能パリティを最優先 | ✅ 合格 | 本文、図の指定、クラス名を現行のまま移す。誤字の修正は、spec.md に記録する例外の手続きに従う |
| V. CI による品質ゲート | ✅ 合格 | 001 の `ci.yml` で、Lint、型チェック、生成、出力の検証を実行する。依存は pnpm で追加する |
| VI. `legacy/` は読み取り専用 | ✅ 合格 | `legacy/` から読み取って写すだけで、変更しない |
| VII. 本番デプロイは `main` からのみ | ✅ 合格 | ワークフローは変更しない。PR は `nuxt4-rebuild` 宛てで、stack になった場合は Unstack してからマージする |
| VIII. 依存ライブラリは spike で検証 | ✅ 合格 | `sr-puzzlegen` 1.0.4 を、`nuxt dev` と `nuxt generate` の出力の両方で spike 検証した(research.md の 1) |
| Technology & Delivery Constraints:解法画像 | ✅ 合格 | この Spec のページは、配信されている画像を使っていない。`legacy/assets/images/megaminx/` の 16 枚は、現行でも配信されていないため対象外(spec.md の Assumptions) |

**事前ゲート**:新しい逸脱はない。原則 I の TypeScript のバージョンは、001 から引き継いだ逸脱である。

**Phase 1 後の再評価**:同じ(新たな違反なし)。

## Project Structure

### Documentation (this feature)

```text
specs/003-megaminx-clock-pages/
├── plan.md              # このファイル(/speckit-plan の出力)
├── research.md          # Phase 0 の出力
├── data-model.md        # Phase 1 の出力
├── quickstart.md        # Phase 1 の出力
├── contracts/
│   └── pages.md         # Phase 1 の出力(8 ページ、図、出力の検証、パリティの確認の契約)
├── checklists/
│   └── requirements.md  # /speckit-specify の出力
└── tasks.md             # Phase 2 の出力(/speckit-tasks で作成。ここでは作らない)
```

### Source Code (repository root)

002 までの構成に、次を追加する。

```text
app/
├── components/
│   ├── MegaminxImage.vue          # 新規: sr-puzzlegen の PNG をブラウザーで描画する
│   └── MegaminxView.vue           # 新規: 図と手順の 1 行を横に並べる(移植元と同じテンプレート)
├── data/megaminx/
│   ├── types.ts                   # 新規: MegaminxDiagram
│   ├── eo.ts                      # 新規: 以下、各ページのデータ(data-model.md の対応表)
│   ├── co.ts
│   ├── ep.ts
│   └── cp.ts
└── pages/
    ├── megaminx/{megaminx-eo,megaminx-co,megaminx-ep,megaminx-cp}.vue
    ├── clock/clock-no-flip.vue
    └── other/{3x3x3-method,for-non-cubers,advent-calendar2014}.vue
scripts/
├── pages.mjs                      # 変更: この Spec の 8 パスを追加
└── verify-parity.mjs              # 変更: 読む spec.md に 003 を追加
package.json                       # sr-puzzlegen を dependencies に追加
```

**Structure Decision**:
- 002 の構成(図のコンポーネント、`app/data/<種類>/` のデータ、`app/pages/` のページ)に揃える。
- prerender の対象は、001 のモジュールが自動で集めるため、設定の変更は不要である。

## 実装上の留意点

- **共有のオプションの書き換え**:移植元の `mounted()` は、1つのオプションのオブジェクトを書き換えながら `PNG` を呼ぶ。変換スクリプトでは、呼び出しの時点の値をディープコピーして記録する(参照のまま記録すると、全ケースが最後の値になる)。
- **`megacase_view`**:EP と CP の一部のケースは、表示する手順に `megacase_view` を使い、図には `megacase` を使う。テンプレートの参照のしかたを、移植元のまま写す。
- **大文字のタグとケバブケース**:移植元のテンプレートの `<megaminx-view>` は、`<MegaminxView>` に置き換える。002 の `<P>` のように、Vue 3 で出力されなくなるタグがないかを、移植後に `verify:parity` で確認する。
- **`h5`**:CP のページは `<h5>` を使う。001 の `.content` に `h5` のスタイルがあることは確認済み。
- **文字列の保存**:手順の文字列の記号(`'`、`′`、括弧、全角記号)は、誤字の修正として記録したもの以外、そのまま写す。

## Complexity Tracking

この Spec で新しく正当化が必要な逸脱はない。原則 I(TypeScript を 5.9 に固定)は、001 の Complexity Tracking を引き継ぐ。
