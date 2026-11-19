# Contract: トップページとパリティの確認

**Feature**: `004-top-page` | **Date**: 2026-11-19

002 の [contracts/pages.md](../../002-cube-solution-pages/contracts/pages.md) を前提とし、この Spec で追加、変更する分だけを定める。

## ページ

| パス | 移植元 | 出力のファイル | 外部リンク |
|---|---|---|---|
| `/` | `legacy/pages/index.vue` | `index.html` | 7(現行の 5 本のうち 2 本の先を更新し、2 本を追加) |

構成(見出しの順):

1. `roudai.netとは`(`h1`)。段落 3 つ。2 つ目の段落のリンクは「tribox はじめてのスピードキューブ」(`https://select.tribox.com/pages/start`)、3 つ目の段落のリンクは「Issues」(`https://github.com/roudai/roudainet/issues`)
2. `管理人について`(`h2`)。ハンドルネームと、ツイッター、Youtube、公式記録のリンク(現行のまま)
3. `主な公式記録（平均）`(`h2`)。8 種目。Megaminx は `1:02.42`
4. `主な成績`(`h2`)。現行の 4 件のまま
5. `シニアランキング（40歳以上、2026年11月時点）`(`h2`)。research.md の 2 の 2 項目

作り直し中の仮の案内文(「サイトを作り直しています。…」)は出力しない。

## 出力の検証(`scripts/verify-output.mjs`)

- `scripts/pages.mjs` の移植済みのページに `/` を加える。`index.html` が存在しない場合は失敗する(SC-001)。

## パリティの確認(`scripts/verify-parity.mjs`)

- 対象: `/` を含む 22 パス。
- `/` の現行サイトの URL は `https://roudai.net/` とする。
- spec.md の表の `テキスト(\`URL\`)` の形のセルは、テキストとリンク先の両方の例外として扱う。「現行の表記」に URL がなく、「修正後の表記」に URL がある行は、追加されたリンクとして、現行のリンクの一覧の末尾に足して比べる(research.md の 3)。
- 期待結果: 22 パスのすべてで、記録した修正と更新以外の差分が0件。既存の 21 パスの結果は変わらない。
