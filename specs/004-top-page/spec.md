# Feature Specification: トップページの移植と情報の更新

**Feature Branch**: `004-top-page`

**Created**: 2026-11-19

**Status**: Draft

**Input**: User description: "トップページにはいくつか修正が必要です。まずTORIBO ファーストキューブセットはもう提供されていないので、次のリンクに変更してください。https://select.tribox.com/pages/start 主な成績は次のページから最新の情報に更新してください。https://www.worldcubeassociation.org/persons/2009ISHI01 シニアランキングに関する実績を追加してください https://wca-seniors.org/Senior_Rankings.html#minx-average https://wca-seniors.org/Senior_Rankings.html#minx"

**運営者の回答(2026-11-19)**:

- 内容の更新は、Constitution を 1.2.0 に改訂し、原則 IV の例外(運営者の指示による、古くなった情報の更新)として、この Spec で移植と同時に行う。
- 「主な成績」は、選手権(アジア大会、日本大会)の表彰台の 4 件のままとする。WCA の記録で、2016 年以降に新しい表彰台はなく、4 件は最新である。
- 「主な公式記録(平均)」は、載せている 8 種目のまま、WCA と異なる Megaminx だけを更新する。
- TORIBO のリンクの文言は、リンク先のページ名に合わせる。
- 「Issues」のリンクは、404 になっているため、現在のリポジトリ(`https://github.com/roudai/roudainet/issues`)に更新する。

## User Scenarios & Testing *(mandatory)*

### User Story 1 - トップページで、サイトと管理人の紹介を読める (Priority: P1)

訪問者は、トップページ(`/`)を開き、サイトの紹介、管理人の紹介とリンク、公式記録、主な成績を、現行サイトと同じ構成で読むことができる。現在の新サイトのトップページは、作り直し中の仮の案内で、これを置き換える。

**Why this priority**: トップページは、サイトの入口で、メニューから最後に残った未移植のページである。

**Independent Test**: `/` を開き、見出し、本文、リストが、現行サイトと同じ構成と順序で表示され、下の「現行の内容から更新した箇所」の表の更新だけが異なることを確認する。

**Acceptance Scenarios**:

1. **Given** 訪問者がトップページを開いている、**When** ページを読む、**Then** 「roudai.netとは」「管理人について」「主な公式記録(平均)」「主な成績」の見出しと本文が、現行と同じ順序で表示される。
2. **Given** 訪問者がトップページを開いている、**When** ヘッダーのロゴやメニューから戻る、**Then** 共通のヘッダーとフッターとともにトップページが表示される。
3. **Given** 作り直し中の仮の案内文がある、**When** トップページを移植する、**Then** 仮の案内文は表示されない。

---

### User Story 2 - トップページの古くなった情報が更新されている (Priority: P1)

訪問者は、トップページで、現在も提供されている初心者向けのページへのリンクと、最新の公式記録と実績を見ることができる。

**Why this priority**: 運営者が明示的に指示した更新で、提供が終わったリンクを案内し続けないために必要である。

**Independent Test**: 下の「現行の内容から更新した箇所」の各行について、新サイトが更新後の内容になっていて、リンクが指定の URL を指すことを確認する。

**Acceptance Scenarios**:

1. **Given** 訪問者が「ルービックキューブを揃えてみたい!」の案内を読む、**When** リンクを選ぶ、**Then** tribox の「はじめてのスピードキューブ」(`https://select.tribox.com/pages/start`)へ移動する。
2. **Given** 訪問者が「主な公式記録(平均)」を読む、**When** Megaminx の行を見る、**Then** WCA の現在の自己ベスト(平均 1:02.42)が表示される。
3. **Given** 訪問者が管理人の実績を読む、**When** シニアランキングの項目を見る、**Then** 40 歳以上の Megaminx の単発と平均の順位が、出典の Senior Rankings の該当箇所へのリンクとともに表示される。
4. **Given** 訪問者が「ご意見、ご要望」の案内の「Issues」のリンクを選ぶ、**When** リンクを開く、**Then** 現在のリポジトリの Issues(`https://github.com/roudai/roudainet/issues`)へ移動する。

---

### Edge Cases

- シニアランキングの順位は、今後の大会の結果で変わる。ページには、確認した時点の順位と、出典へのリンクを載せる。自動で更新する仕組みは作らない(機能の追加にあたるため)。
- 外部リンクの先が、今後また提供を終える場合: この Spec では、運営者が指示したリンクだけを更新する。それ以外のリンクの不具合は、候補として記録し、運営者の判断を待つ。

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: サイトは、トップページ(`/`)を、現行サイト(`legacy/pages/index.vue`)と同じ構成(見出し、段落、リスト)で提供しなければならない(MUST)。作り直し中の仮の案内文は削除する。
- **FR-002**: トップページの本文、リンク、リストは、現行サイトと同じ内容と順序でなければならない(MUST)。ただし、下の「現行の内容から更新した箇所」の表にある更新は除く。
- **FR-003**: 「TORIBO ファーストキューブセット」へのリンクは、文言を「tribox はじめてのスピードキューブ」、リンク先を `https://select.tribox.com/pages/start` に更新しなければならない(MUST)。
- **FR-004**: 「主な公式記録(平均)」の Megaminx は、WCA の現在の自己ベストの平均(1:02.42)に更新しなければならない(MUST)。ほかの 7 種目は、WCA の値と一致していることを確認し、変更しない。
- **FR-005**: 「主な成績」は、現行の 4 件のまま変更しない(運営者の回答)。
- **FR-006**: 管理人の実績に、WCA Senior Rankings(40 歳以上)の Megaminx の単発と平均の順位を追加しなければならない(MUST)。各項目は、出典の該当箇所(`https://wca-seniors.org/Senior_Rankings.html#minx`、`https://wca-seniors.org/Senior_Rankings.html#minx-average`)へリンクする。
- **FR-007**: 「Issues」のリンク先は、`https://github.com/roudai/roudainet/issues` に更新しなければならない(MUST)。文言(「Issues」)は変えない。
- **FR-008**: 更新した箇所は、この Spec の「現行の内容から更新した箇所」の表に、現行の内容、更新後の内容、出典(URL と確認日)を記録しなければならない(MUST、Constitution 1.2.0 の原則 IV)。
- **FR-009**: 見た目(レイアウト、余白、見出しとリストの表示)は、現行サイトと同等でなければならない(MUST)。デザインの刷新は行わない。
- **FR-010**: サイトは、引き続き静的生成のみで出力しなければならない(MUST)。
- **FR-011**: `legacy/` 配下のファイルを変更してはならない(MUST NOT)。

### Key Entities *(include if feature involves data)*

- **トップページ**: サイトの紹介、管理人の紹介、公式記録、主な成績、シニアランキングの実績を持つ。移植元は `legacy/pages/index.vue` である。
- **情報の更新の記録**: 更新した箇所の一覧。場所、現行の内容、更新後の内容、出典(URL と確認日)、理由を持つ。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: トップページが、静的生成の出力に含まれ、仮の案内文が0件である。
- **SC-002**: トップページの見出し、本文、リストが、現行サイトと比べて、記録した更新を除き、不足や相違が0件である。
- **SC-003**: 記録した更新のすべてが新サイトに反映されており、記録にない内容の変更が0件である。
- **SC-004**: トップページの外部リンクのすべてが、現行サイトと同じ URL、または記録した更新後の URL を指している。
- **SC-005**: 運営者が、狭い画面と広い画面の両方で、現行サイトと並べて比較したとき、追加した項目以外に、レイアウトの気づく相違がない。
- **SC-006**: Lint、型チェック、静的生成、出力の検証が、すべて成功する。

## Assumptions

- 公式記録と主な成績は、WCA の公開 API(`/api/v0/persons/2009ISHI01` と `/results`)で、2026-11-19 に確認した。シニアランキングは、`https://wca-seniors.org/data/Senior_Rankings.js`(2026-11-18 02:07 更新)で確認した。
- シニアランキングの実績の書き方(見出しの名前、項目の文言)は、既存の「主な成績」のリストに揃える。案は「シニアランキング(40歳以上)」の見出しの下に、「Megaminx 単発 世界2位(52.87)」「Megaminx 平均 世界2位(1:02.42)」の2項目とする。最終的な文言は Plan と実装で決め、運営者が確認する。
- 現行のトップページには、ページごとのタイトルや meta タグがない。この Spec でも追加しない。
- 現行の「Issues」のリンク(`https://github.com/roudai/roudai.net/issues`)は、2026-11-19 の確認で 404 である(リポジトリ名が `roudainet` に変わったため)。運営者の指示で、現在のリポジトリの Issues に更新する(FR-007)。

## 現行の内容から更新した箇所

Constitution 1.2.0 の原則 IV の例外(運営者の指示による、古くなった情報の更新)と、明らかな誤字の修正を記録する。理由に「候補(直さない)」とある行は、現行のまま残している。

| ページ | 場所 | 現行の表記 | 修正後の表記 | 理由 |
|---|---|---|---|---|
| `/` | 「roudai.netとは」の2つ目の段落のリンク | TORIBO ファーストキューブセット(`https://toribo.jp/`) | tribox はじめてのスピードキューブ(`https://select.tribox.com/pages/start`) | 提供が終わったため、運営者の指示で更新。出典: `https://select.tribox.com/pages/start`(2026-11-19 確認) |
| `/` | 「主な公式記録(平均)」 | Megaminx 1:14.18 | Megaminx 1:02.42 | 自己ベストの更新。出典: `https://www.worldcubeassociation.org/persons/2009ISHI01`(2026-11-19 確認、Ota Spring 2025) |
| `/` | 「主な成績」の後(追加) | (なし) | シニアランキング(40歳以上)の Megaminx の単発と平均の順位 | 運営者の指示で追加。出典: `https://wca-seniors.org/Senior_Rankings.html#minx`、`#minx-average`(2026-11-18 更新のデータで、単発 52.87、平均 1:02.42、いずれも世界2位) |
| `/` | 「roudai.netとは」の3つ目の段落のリンク | Issues(`https://github.com/roudai/roudai.net/issues`) | Issues(`https://github.com/roudai/roudainet/issues`) | リンク先が 404(リポジトリ名の変更による)のため、運営者の指示で更新。出典: `https://github.com/roudai/roudainet/issues`(2026-11-19 確認、200) |
