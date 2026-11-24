# Implementation Plan: Megaminx の図を自作ライブラリで描く

**Branch**: `005-megaminx-image` | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-megaminx-image/spec.md`

## Summary

Megaminx の 4 ページ(CP、CO、EP、EO)の 46 個の図を、`sr-puzzlegen` から、運営者の自作ライブラリ megaminx-image 1.0.0 に置き換える。003 の FR-003(現行と同じ配色、マスク、矢印)を、意図して変える。

主な設計判断は次のとおり。

- **描き方**:`MegaminxImage.vue` で、ライブラリの `svg()` を呼び、描画先の div に SVG を入れる。サーバー側とブラウザーで同じ文字列になるため、静的生成した HTML に図が含まれ、ハイドレーションで書き換わらない([research.md](./research.md) の 3)。
- **配色**:CP と EP はライブラリの既定の配色、CO と EO は `ollScheme()`(引数なし)。大きさは 100px。矢印は描かない([contracts/diagrams.md](./contracts/diagrams.md))。
- **データ**:`diagrams` を `{ case, oll? }` の形に書き換える。`case` の値はそのまま写す。事前の調査で、46 個すべてで、ステッカーの面が今の図と一致することを確かめた(research.md の 1、[data-model.md](./data-model.md))。
- **依存**:`sr-puzzlegen` を外し、`megaminx-image` を `1.0.0` で加える。`sr-visualizer` はキューブの図で使うため残す(research.md の 7)。
- **確認**:`verify-parity.mjs` の図の数え方を「id を持ち、中身が空か SVG 1 つだけの div」に広げる(research.md の 5)。
- **spike**:作業用の worktree で、`nuxt dev` と `nuxt generate` の出力の両方で、スクリプトの有効と無効の両方で 46 個が表示され、警告が 0 件であることを確かめた(research.md の 4)。

## Technical Context

**Language/Version**:TypeScript 5.9.x(001 と同じ。7 未満に固定)、Node 24(LTS)

**Primary Dependencies**:
- 引き継ぐもの:Nuxt 4.6.3、Vue 3、Tailwind CSS 4.3.3、`sr-visualizer` 1.0.13
- 新しく追加するもの:`megaminx-image` 1.0.0(MIT。必須の依存なし。ESM のみ。Node 22.12 以上)
- 外すもの:`sr-puzzlegen` 1.0.4

**Storage**:N/A(静的なデータ定義のみ。[data-model.md](./data-model.md))

**Testing**:
- 自動テストは作らない(Spec で必須としていない)。
- 品質ゲート:Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`。
- 確認:`scripts/verify-parity.mjs`(手動)と、スクリプトの有無を切り替えた表示の確認と目視([quickstart.md](./quickstart.md))。

**Target Platform**:静的サイト。モダンなブラウザー(モバイルとデスクトップ)。配信は GitHub Pages

**Project Type**:静的 Web サイト(フロントエンドのみ)

**Performance Goals**:
- Megaminx の 4 ページで読み込む JS を減らす(SC-006)。spike の値で、`sr-puzzlegen` のチャンク gzip 17.3KB → megaminx-image のチャンク gzip 4.9KB。
- HTML の増加は、gzip 後で 1 ページあたり約 2KB 以内。

**Constraints**:
- SSG のみ(原則 I)。
- `legacy/` は変更しない(原則 VI)。
- 図以外(見出し、本文、手順の文字列、リンク、レイアウト)は変えない(FR-009)。

**Scale/Scope**:ページ 4、図 46 個(CP 15、CO 16、EP 12、EO 3)。変更するファイルは、部品 1、データ 5、スクリプト 1、`package.json` と lock、ドキュメント。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 判定 | 根拠 |
|------|------|------|
| I. 最新の安定版 Nuxt、TypeScript、静的生成のみ | ⚠ 逸脱(001 から継続) | 静的生成のみ。SVG は prerender のときに作る。TypeScript を 5.9 に固定している点は、001 の Complexity Tracking を引き継ぐ(新しい逸脱ではない) |
| II. URL の互換性 | ✅ 合格 | パスは変えない |
| III. Web サイトに広告を含めない | ✅ 合格 | 広告に関わる変更は無い。`scripts/verify-output.mjs` で引き続き確認する |
| IV. 機能パリティを最優先 | ✅ 合格 | 003 と 004 を公開し、パリティを確認した後の、別の Spec としての見た目の変更である。変更した箇所は spec.md の「現行の内容から変更した箇所」に記録した。本文は変えない |
| V. CI による品質ゲート | ✅ 合格 | 001 の `ci.yml` で、Lint、型チェック、生成、出力の検証を実行する。依存は pnpm で入れ替え、ロックファイルは `pnpm-lock.yaml` の 1 つのまま |
| VI. `legacy/` は読み取り専用 | ✅ 合格 | `legacy/` には触れない |
| VII. 本番デプロイは `main` からのみ | ✅ 合格 | ワークフローは変更しない |
| VIII. 依存ライブラリは spike で検証 | ✅ 合格 | megaminx-image 1.0.0 を、`nuxt dev` と `nuxt generate` の出力の両方で spike 検証した(research.md の 4) |
| Technology & Delivery Constraints:解法画像 | ✅ 合格 | 配信している画像ファイルは変えない。図は画像ファイルではなく HTML の中の SVG |

**事前ゲート**:新しい逸脱はない。

**Phase 1 後の再評価**:同じ(新たな違反なし)。

## Project Structure

### Documentation (this feature)

```text
specs/005-megaminx-image/
├── plan.md              # このファイル(/speckit-plan の出力)
├── research.md          # Phase 0 の出力
├── data-model.md        # Phase 1 の出力
├── quickstart.md        # Phase 1 の出力
├── contracts/
│   └── diagrams.md      # Phase 1 の出力(図の部品、依存、パリティの確認の契約)
├── checklists/
│   └── requirements.md  # /speckit-specify の出力
└── tasks.md             # Phase 2 の出力(/speckit-tasks で作成。ここでは作らない)
```

### Source Code (repository root)

```text
app/
├── components/
│   └── MegaminxImage.vue          # 変更: svg() で SVG を作り、div に入れる
└── data/megaminx/
    ├── types.ts                   # 変更: MegaminxDiagram を { case, oll? } に
    ├── cp.ts                      # 変更: diagrams を書き換え(megacase、megacase_view は変えない)
    ├── co.ts                      # 同上(oll: true)
    ├── ep.ts                      # 同上
    └── eo.ts                      # 同上(oll: true)
scripts/
└── verify-parity.mjs              # 変更: 図の要素の数え方を広げる
package.json, pnpm-lock.yaml       # 変更: megaminx-image を追加、sr-puzzlegen を削除
```

- 変えないもの:`app/components/MegaminxView.vue`(入力と出力の構造)、`app/pages/megaminx/*.vue`(`diagrams['megacaseN']` の参照のまま)、`scripts/pages.mjs`、`scripts/verify-output.mjs`。

**Structure Decision**:003 の構成(図の部品、`app/data/megaminx/` のデータ)をそのまま使い、中身だけを置き換える。

## 実装上の留意点

- **データの書き換え**:一度だけの変換スクリプト(コミットしない)で、今の `diagrams` を読み、`{ case, oll? }` で書き出す。書き出した後に読み直し、46 個の `case` が書き換え前と同じことを確かめる(data-model.md)。
- **型**:`MegaminxDiagram` は自前の型にし、`sr-puzzlegen` の型を import しない。`svg()` のオプションの型(`ImageOptions`)は、ライブラリが出している型を使う。
- **`v-html`**:`vue/no-v-html` を、その行だけ無効にし、理由をコメントに書く(research.md の 6)。
- **エラー**:`diagram` が無いときは今と同じくコンソールにエラーを出し、空の div を出す。`svg()` の例外は捕まえない(静的生成を失敗させる)。
- **コメントの更新**:`MegaminxImage.vue` と `types.ts`、各データのファイルの先頭の説明は、`sr-puzzlegen` と「移植元と同じ値」の記述を、この Spec の内容に改める。003 の文書(spec、plan、contracts)は過去の記録として変えない。
- **パリティの確認の既知の差分**:`/megaminx/megaminx-cp` の 3 件は、main でも出る既にある問題で、この Spec では直さない(research.md の 5)。

## Complexity Tracking

この Spec で新しく正当化が必要な逸脱はない。原則 I(TypeScript を 5.9 に固定)は、001 の Complexity Tracking を引き継ぐ。
