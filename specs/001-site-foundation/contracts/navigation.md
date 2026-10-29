# Contract: ナビゲーション(メニュー構成)

**Feature**: `001-site-foundation` | **Source of truth**: `legacy/components/NavBar.vue`

この Spec の公開インターフェースは、訪問者に見えるメニュー構成と、生成したサイトのルートファイルである。
メニューの表示名、リンク先、順序は、現行サイトと同一でなければならない(FR-002、FR-003、SC-001)。
表示名には、現行の表記(例: `Tooks`)をそのまま使う。誤記に見えても、直さない(パリティ優先、原則 IV)。

## ヘッダー

- 左端: サイト名リンク `roudai.net` → `/`
- メニュー(左から順に): F2L、OLL、PLL、BLD、Megaminx、FMC、Clock、Other、Tooks
- 右端: GitHub アイコン → `https://github.com/roudai/roudainet`(白)

## メニュー項目

| カテゴリ | 表示名 | リンク先 | 種別 |
|----------|--------|----------|------|
| F2L | F2L手順 | `/f2l/f2l` | 内部 |
| F2L | 発展形F2L | `/f2l/f2l-advanced` | 内部 |
| F2L | Winter Variation | `/f2l/winter-variation` | 内部 |
| OLL | OLL手順 | `/oll/oll` | 内部 |
| OLL | COLL | `/oll/coll` | 内部 |
| PLL | PLL一覧 | `/pll/pll-view` | 内部 |
| PLL | PLLの確率 | `/pll/pll-chances` | 内部 |
| PLL | PLL手順 | `/pll/pll` | 内部 |
| PLL | 2側面判断 | `/pll/two-sided-pll` | 内部 |
| BLD | ルービックキューブを目隠しで揃えるには | `/bld/bld-introduction` | 内部 |
| BLD | ルービックキューブ目隠しの解法 | `/bld/bld-method` | 内部 |
| BLD | Old Pochmann method(corner) | `/bld/old-pochmann-corner` | 内部 |
| Megaminx | Megaminx EO | `/megaminx/megaminx-eo` | 内部 |
| Megaminx | Megaminx CO | `/megaminx/megaminx-co` | 内部 |
| Megaminx | Megaminx EP | `/megaminx/megaminx-ep` | 内部 |
| Megaminx | Megaminx CP | `/megaminx/megaminx-cp` | 内部 |
| FMC | 最小手数競技の紹介 | `/fmc/intro-fmc` | 内部 |
| Clock | No-Flip Method | `/clock/clock-no-flip` | 内部 |
| Other | 各種解法 | `/other/3x3x3-method` | 内部 |
| Other | 知っておいてほしいこと | `/other/for-non-cubers` | 内部 |
| Other | 続ける意味について | `/other/advent-calendar2014` | 内部 |
| Other | ルービックキューブの世界 | `https://competition.roudai.net` | 外部 |
| Other | ブログ版ろーだいねっと | `https://blog.roudai.net` | 外部 |
| Tooks | VisualCube Editor | `https://visualcube.roudai.net/` | 外部 |
| Tooks | Megaminx Image editor | `https://roudai.github.io/MegaminxImageEditor/` | 外部 |
| Tooks | PLL Trainer | `https://roudai.github.io/PLLTrainer/` | 外部 |

合計: 9 カテゴリ、26 項目(内部 21、外部 5)。

## 挙動の契約

| 条件 | 挙動 |
|------|------|
| 画面幅 1024px 以上 | メニューは横並び。カテゴリにポインターを重ねる、またはキーボードのフォーカスが入ると、ドロップダウンが開く |
| 画面幅 1024px 未満 | メニューは閉じた状態で始まり、バーガーボタンで開閉する。開いたメニューでは、各カテゴリの項目が縦に並ぶ |
| バーガーボタン | `aria-label="menu"`。開閉の状態を `aria-expanded` で示す |
| 未移植ページへのリンク | 本番に公開されないため、404 を許容する(Spec の Edge Cases)。リンク先のパスは変えない |

## 検証

- 項目の過不足と順序: `legacy/components/NavBar.vue` と `app/data/navigation.ts` を突き合わせる(実装後の目視確認と、quickstart の手順 3)。
- 外部リンク: 現行サイトと同じ URL であること(上の表)。

---

# Contract: 生成したサイトのルート

| パス | 要件 |
|------|------|
| `/CNAME` | 存在する。内容は `roudai.net` |
| `/app-ads.txt` | 存在する。`legacy/pages/app-ads.txt` と内容が同一 |
| `/favicon.ico` | 存在する |
| `/ads.txt` | 存在しない(404) |
| `/` | トップページの骨組み。共通のヘッダーとフッターを含む |
| 全 HTML | AdSense のスクリプト、広告枠、広告用の meta タグを含まない |
