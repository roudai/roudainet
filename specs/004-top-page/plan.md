# Implementation Plan: トップページの移植と情報の更新

**Branch**: `004-top-page` | **Date**: 2026-11-19 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-top-page/spec.md`

## Summary

トップページ(`/`)を、`legacy/pages/index.vue` から新サイトへ移植し、001 で置いた仮の案内文を置き換える。あわせて、運営者の指示で、古くなった情報を更新する(Constitution 1.2.0 の原則 IV の例外)。

- **リンクの更新**:「TORIBO ファーストキューブセット」を「tribox はじめてのスピードキューブ」(`https://select.tribox.com/pages/start`)に、「Issues」のリンク先を `https://github.com/roudai/roudainet/issues` にする。
- **記録の更新**:「主な公式記録（平均）」の Megaminx を 1:02.42 にする。ほかの 7 種目と「主な成績」は、WCA で最新であることを確認し、変えない([research.md](./research.md) の 1)。
- **実績の追加**:「シニアランキング（40歳以上、2026年11月時点）」の見出しと、Megaminx の単発と平均(いずれも世界2位)の 2 項目を追加する(research.md の 2)。
- **確認**:`scripts/verify-parity.mjs` を拡張し、spec.md の表のリンクの更新と追加も、差分の例外として確かめる(research.md の 3)。

## Technical Context

**Language/Version**:TypeScript 5.9.x、Node 24(LTS)

**Primary Dependencies**:Nuxt 4.6.3、Vue 3、Tailwind CSS 4.3.3(001〜003 から引き継ぐ)。新しい依存はない

**Storage**:N/A(テンプレートに本文を書く。[data-model.md](./data-model.md))

**Testing**:
- 自動テストは作らない(Spec で必須としていない)。
- 品質ゲート:Lint、型チェック、`nuxt generate`、`scripts/verify-output.mjs`。
- パリティの確認:拡張した `scripts/verify-parity.mjs`(手動)と、現行サイトとの並べた撮影と目視([quickstart.md](./quickstart.md))。

**Target Platform**:静的サイト。モダンなブラウザー(モバイルとデスクトップ)。配信は GitHub Pages

**Project Type**:静的 Web サイト(フロントエンドのみ)

**Performance Goals**:特別な目標はない(本文だけのページ)

**Constraints**:
- SSG のみ(原則 I)。外部の情報を、ビルド時や表示時に取得しない(research.md の 1)。
- `legacy/` は変更しない(原則 VI)。
- 内容の変更は、spec.md の表に記録したものだけにする(原則 IV)。

**Scale/Scope**:ページ 1。更新 4 か所(リンク 2、記録 1、追加 1)。

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| 原則 | 判定 | 根拠 |
|------|------|------|
| I. 最新の安定版 Nuxt、TypeScript、静的生成のみ | ⚠ 逸脱(001 から継続) | 静的生成のみ。TypeScript を 5.9 に固定している点は、001 の Complexity Tracking を引き継ぐ |
| II. URL の互換性 | ✅ 合格 | `/` を現行と同じパスで出力する |
| III. Web サイトに広告を含めない | ✅ 合格 | 広告はない。`verify-output.mjs` で、引き続き確認する |
| IV. 機能パリティを最優先 | ✅ 合格 | 構成は現行のまま。内容の変更は、1.2.0 で追加した例外(運営者の指示による、古くなった情報の更新)に限り、spec.md に出典とともに記録した。見出しとリストの追加だけで、新しいスタイルや機能は作らない |
| V. CI による品質ゲート | ✅ 合格 | 001 の `ci.yml` で、Lint、型チェック、生成、出力の検証を実行する |
| VI. `legacy/` は読み取り専用 | ✅ 合格 | 読み取るだけで、変更しない |
| VII. 本番デプロイは `main` からのみ | ✅ 合格 | ワークフローは変更しない。PR は `nuxt4-rebuild` 宛て |
| VIII. 依存ライブラリは spike で検証 | ✅ 合格(対象なし) | 新しい依存はない |

**事前ゲート**:新しい逸脱はない。

**Phase 1 後の再評価**:同じ(新たな違反なし)。

## Project Structure

### Documentation (this feature)

```text
specs/004-top-page/
├── plan.md              # このファイル(/speckit-plan の出力)
├── research.md          # Phase 0 の出力
├── data-model.md        # Phase 1 の出力
├── quickstart.md        # Phase 1 の出力
├── contracts/
│   └── pages.md         # Phase 1 の出力(トップページの構成、出力の検証、パリティの確認の契約)
├── checklists/
│   └── requirements.md  # /speckit-specify の出力
└── tasks.md             # Phase 2 の出力(/speckit-tasks で作成。ここでは作らない)
```

### Source Code (repository root)

```text
app/pages/index.vue          # 変更: 仮の案内文を、移植元のテンプレートと更新に置き換える
scripts/
├── pages.mjs                # 変更: `/` を追加
└── verify-parity.mjs        # 変更: `/` の URL、セルの URL の読み取り、リンクの置き換えと追加、004 の spec.md
```

**Structure Decision**:002 と 003 の文章のページと同じく、テンプレートに本文を書く。

## 実装上の留意点

- **全角の括弧**:現行の見出しは「主な公式記録（平均）」のように全角の括弧を使う。追加する見出しも全角にする。spec.md の表で URL を示す `(\`URL\`)` は半角の括弧で、スクリプトはこの形だけを URL として読む。
- **`<br />`**:現行の 2 つ目の段落は、案内文とリンクの間に `<br />` を持つ。そのまま写す。
- **既存の 21 ページ**:`verify-parity.mjs` の拡張の後も、21 ページの結果が変わらないことを確かめる。

## Complexity Tracking

この Spec で新しく正当化が必要な逸脱はない。原則 I(TypeScript を 5.9 に固定)は、001 の Complexity Tracking を引き継ぐ。
