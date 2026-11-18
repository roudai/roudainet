# Implementation Plan: キューブ系の解法ページの移植

**Branch**: `002-cube-solution-pages` | **Date**: 2026-11-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-cube-solution-pages/spec.md`

## Summary

キューブ系の解法ページ 13 ページ(pll 4、oll 2、f2l 3、bld 3、fmc 1)を、`legacy/pages/` から、001 で作った Nuxt 4 のサイトへ、同じパス、内容、見た目で移植する。

主な設計判断は次のとおり。

- **キューブの図**:現行と同じ `sr-visualizer` 1.0.13 の `cubePNG` を使う。描画はブラウザーでのみ行い、`CubeImage.vue` にまとめる。spike(`nuxt dev` と `nuxt generate`)で動くことを確認した([research.md](./research.md) の 1)。
- **画像ファイル**:PLL の GIF 13 枚と、2側面判断の PNG 46 枚は、`public/images/` に同じファイル名で置き、固定の URL で配信する。現行のハッシュ付きの URL は、Constitution 1.1.1 で引き継ぎの対象外と明記した(research.md の 2)。
- **レイアウト**:対象ページで使われている Bulma のクラス(`columns` 系、`box`、`table` など)だけを、`main.css` に Bulma 0.9 の値で再現し、テンプレートは現行のクラス名のまま移す(research.md の 3)。
- **手順のデータ**:ケースの一覧を持つページのデータは、`app/data/cube/` に型付きで切り出す(research.md の 4)。
- **パリティの確認**:本番の現行サイトと生成した出力の本文を比べる `scripts/verify-parity.mjs` を作り、ローカルで実行する(research.md の 5)。
- **誤字の修正**:「発展系F2L」を「発展形F2L」に直す。spec.md の「現行の表記から直した箇所」に記録した。

## Technical Context

**Language/Version**:TypeScript 5.9.x(001 と同じ。7 未満に固定)、Node 24(LTS)

**Primary Dependencies**:
- 001 から引き継ぐもの:Nuxt 4.6.3、Vue 3、Tailwind CSS 4.3.3
- 新しく追加するもの:`sr-visualizer` 1.0.13(ISC。依存は `svg.js` 2.7.1、MIT)

**Storage**:N/A(静的なデータ定義のみ。[data-model.md](./data-model.md))

**Testing**:
- 自動テストは作らない(Spec で必須としていない)。
- 品質ゲート:Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`(001)。
- パリティの確認:`scripts/verify-parity.mjs`(手動)と、現行サイトとの目視比較([quickstart.md](./quickstart.md))。

**Target Platform**:静的サイト。モダンなブラウザー(モバイルとデスクトップ)。配信は GitHub Pages

**Project Type**:静的 Web サイト(フロントエンドのみ)

**Performance Goals**:特別な目標はない。PLL の 21 ケースなど、1ページに多数の図があっても、現行サイトと比べて、運営者がスクロールや操作を体感で遅いと感じないこと(Spec の Edge Cases。T022 で確認する)

**Constraints**:
- SSG のみ(原則 I)。図はブラウザーで描画し、本文は静的な HTML に含める(FR-009)。
- `legacy/` は変更しない(原則 VI)。
- デザインの刷新と機能の追加はしない(原則 IV)。明らかな誤字だけは、例外として直して記録する。

**Scale/Scope**:
- ページ 13、画像ファイル 59。
- `cubePNG` の呼び出しは、現行で約 50 か所(10 ページ)。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 判定 | 根拠 |
|------|------|------|
| I. 最新の安定版 Nuxt、TypeScript、静的生成のみ | ⚠ 逸脱(001 から継続) | Nuxt 4.6.3、静的生成のみ。`sr-visualizer` はブラウザーでのみ動かし、サーバーランタイムを使わない。TypeScript を 5.9 に固定している点は、001 の Complexity Tracking を引き継ぐ(新しい逸脱ではない) |
| II. URL の互換性 | ✅ 合格 | 13 パスを、現行と同じパスで出力する(contracts/pages.md)。末尾のスラッシュへのリダイレクトも、現行と同じ挙動になる(research.md の 6)。画像の URL は下の Technology & Delivery Constraints を参照 |
| III. Web サイトに広告を含めない | ✅ 合格 | 対象ページに広告はない。`scripts/verify-output.mjs`(001)で、引き続き確認する |
| IV. 機能パリティを最優先 | ✅ 合格 | 内容、図の指定、クラス名を現行のまま移す。ページごとの meta タグも追加しない(research.md の 7)。誤字の修正は、原則 IV の例外の手続き(spec.md に記録)に従う |
| V. CI による品質ゲート | ✅ 合格 | 001 の `ci.yml` で、Lint、型チェック、生成、出力の検証を実行する。依存は pnpm で追加し、ロックファイルは `pnpm-lock.yaml` だけにする |
| VI. `legacy/` は読み取り専用 | ✅ 合格 | `legacy/` から読み取ってコピーするだけで、変更しない |
| VII. 本番デプロイは `main` からのみ | ✅ 合格 | ワークフローは変更しない。PR は `nuxt4-rebuild` 宛てで、stack になった場合は Unstack してからマージする(quickstart.md) |
| VIII. 依存ライブラリは spike で検証 | ✅ 合格 | `sr-visualizer` を、`nuxt dev` と `nuxt generate` の出力の両方で spike 検証した(research.md の 1)。`sr-puzzlegen` は megaminx の Spec で検証する |
| Technology & Delivery Constraints:解法画像の URL | ✅ 合格 | 現行の画像の URL は、ビルドごとに変わるハッシュ付き(`/_nuxt/img/01_U-Perm.6cb9874.gif`)で、Constitution 1.1.1 で引き継ぎの対象外と明記した。同じファイル名のまま、固定の URL(`/images/pll/01_U-Perm.gif`)で配信する |

**事前ゲート**:
- 新しい逸脱はない。画像の URL は、当初は逸脱としていたが、Constitution を 1.1.1 に改訂し(`/speckit-analyze` の D1)、合格になった。
- 原則 I の TypeScript のバージョンは、001 から引き継いだ逸脱である。

**Phase 1 後の再評価**:同じ(新たな違反なし)。

## Project Structure

### Documentation (this feature)

```text
specs/002-cube-solution-pages/
├── plan.md              # このファイル(/speckit-plan の出力)
├── research.md          # Phase 0 の出力
├── data-model.md        # Phase 1 の出力
├── quickstart.md        # Phase 1 の出力
├── contracts/
│   └── pages.md         # Phase 1 の出力(13 ページ、出力、外部リンク、図、パリティの確認の契約)
├── checklists/
│   └── requirements.md  # /speckit-specify の出力
└── tasks.md             # Phase 2 の出力(/speckit-tasks で作成。ここでは作らない)
```

### Source Code (repository root)

001 の構成に、次を追加する。

```text
app/
├── assets/css/main.css            # 追加: Bulma の columns、box、table などの再現(research.md の 3)
├── components/
│   └── CubeImage.vue              # 新規: sr-visualizer の cubePNG をブラウザーで描画する
├── data/cube/
│   ├── types.ts                   # 新規: CubeDiagram、AlgorithmCase、AlgorithmSection、SolutionImage
│   ├── pll.ts                     # 新規: 以下、一覧を持つページのデータ(data-model.md の対応表)
│   ├── pll-view.ts
│   ├── pll-chances.ts
│   ├── two-sided-pll.ts
│   ├── oll.ts
│   ├── coll.ts
│   ├── f2l.ts
│   ├── f2l-advanced.ts
│   ├── winter-variation.ts
│   └── old-pochmann-corner.ts
└── pages/
    ├── pll/{pll-view,pll-chances,pll,two-sided-pll}.vue
    ├── oll/{oll,coll}.vue
    ├── f2l/{f2l,f2l-advanced,winter-variation}.vue
    ├── bld/{bld-introduction,bld-method,old-pochmann-corner}.vue
    └── fmc/intro-fmc.vue
public/images/
├── pll/                           # legacy/assets/images/pll/ と同一(13 枚)
└── two-sided/                     # legacy/assets/images/two-sided/ と同一(46 枚)
scripts/
└── verify-parity.mjs              # 新規: 本番の現行サイトと出力の本文を比較する(手動で実行)
package.json                       # sr-visualizer を dependencies に追加
```

**Structure Decision**:
- 001 の Nuxt 4 の `app/` ディレクトリ構成に、ページ、データ、図のコンポーネントを追加する。
- ページのパスは、`app/pages/` のファイルの配置で決まり、現行の `legacy/pages/` と同じ構成になる。
- prerender の対象は、001 のモジュール(`modules/prerender-pages.ts`)が自動で集めるため、設定の変更は不要である。

## 実装上の留意点

- **図の描画の順序**:`CubeImage.vue` は、各インスタンスが `onMounted` で `sr-visualizer` を動的に `import` する。モジュールは1回だけ読み込まれ、キャッシュされる。現行と同じく、ページの表示後に図が順に現れる。
- **図の領域の大きさ**:描画前に、要素の幅と高さ(`width`、`height`)を確保し、図が現れたときにレイアウトが動かないようにする。
- **`case` の作り方**:現行の `pll.vue` などは、1つ目の手順の文字列から、`：` より後ろを `case` に使っている(`makeCase`)。データに `case` を明示的に書くか、同じ処理を関数として持つかは実装時に選ぶ。どちらの場合も、結果の文字列は現行と同一にする。
- **文字列の保存**:手順の文字列にある全角記号、タブ、`′`(プライム記号)、`'2` などの表記は、誤字の修正として記録したもの以外、そのまま写す。Prettier による引用符の変更は構わないが、文字列の中身は変えない。
- **`.content` との関係**:001 の `.content` のスタイル(見出し、段落、リスト)は、ページ本体にも使う。現行のページは `.content` の中に描画されているため、同じ構造にする。
- **Bulma の再現の範囲**:実際に使われているクラスだけを定義する。使われていないクラスを、先回りして足さない。
- **パリティの確認のスクリプト**:本番の HTML の取得には、Node の `fetch` を使う。比較の前に、空白の連続を1つにまとめ、Nuxt が出力するコメントやスクリプトを除く。

## Complexity Tracking

この Spec で新しく正当化が必要な逸脱はない。原則 I(TypeScript を 5.9 に固定)は、001 の Complexity Tracking を引き継ぐ。
