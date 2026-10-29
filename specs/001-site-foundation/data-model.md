# Data Model: サイト基盤

**Feature**: `001-site-foundation` | **Date**: 2026-10-30

この機能のデータは、ビルド時に決まる静的な定義だけである。データベースや外部 API は使わない。

## NavItem(メニュー項目)

| フィールド | 型 | 説明 |
|------------|----|------|
| `label` | 文字列 | 表示名(例: `F2L手順`)。現行の `NavBar.vue` と同じ文言 |
| `to` | 文字列 | リンク先。サイト内のパス(`/` で始まる)か、外部の URL(`https://` で始まる) |

- 検証ルール:
  - `to` が `/` で始まる場合は、サイト内リンクとして扱う。
  - `to` が `https://` で始まる場合は、外部リンクとして扱う(現行と同じく、同じタブで開く。現行に `target` の指定はない)。
  - 現行サイトのパスを、変更してはならない(原則 II、FR-003)。

## NavGroup(メニューのカテゴリ)

| フィールド | 型 | 説明 |
|------------|----|------|
| `label` | 文字列 | カテゴリ名(`F2L`、`OLL`、`PLL`、`BLD`、`Megaminx`、`FMC`、`Clock`、`Other`、`Tooks`) |
| `items` | `NavItem` の配列 | そのカテゴリのドロップダウンに並ぶ項目。順序に意味がある |

- 関係: ヘッダーは、`NavGroup` の配列(順序固定)から作られる。1つの `NavGroup` は、1つ以上の `NavItem` を持つ。
- 定義の場所: `app/data/navigation.ts`(型付きの定数)。全項目は [contracts/navigation.md](./contracts/navigation.md) に一覧がある。

## SiteMeta(サイトの共通情報)

| フィールド | 値 | 備考 |
|------------|----|------|
| サイト名 | `roudai.net` | ヘッダーのブランドリンク(`/`)とフッターの著作権表記 |
| `<title>` の既定値 | `roudainet` | 現行の `nuxt.config.js` と同じ |
| `lang` | `ja` | |
| `description` | `roudai.net` | 現行と同じ |
| リポジトリ URL | `https://github.com/roudai/roudainet` | ヘッダーとフッターの GitHub アイコンのリンク先 |
| 著作権の開始年 | `2012` | フッターの「© 2012-{年}」 |

## 公開物のルートファイル

データではなく成果物だが、Spec の Key Entities に挙げているため記載する。

| ファイル | 置き場所 | 内容 |
|----------|----------|------|
| `CNAME` | `public/CNAME` | `roudai.net` |
| `app-ads.txt` | `public/app-ads.txt` | `legacy/pages/app-ads.txt` と同一(変更しない) |
| `favicon.ico` | `public/favicon.ico` | `legacy/static/favicon.ico` と同一 |

状態遷移は、ない。
