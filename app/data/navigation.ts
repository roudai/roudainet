export interface NavItem {
  /** 表示名 */
  label: string
  /** サイト内のパス(`/` で始まる)か、外部の URL(`https://` で始まる) */
  to: string
}

export interface NavGroup {
  /** カテゴリ名 */
  label: string
  /** ドロップダウンに並ぶ項目。順序に意味がある */
  items: NavItem[]
}

/**
 * ヘッダーのメニュー構成。表示名、リンク先、順序は現行サイト(legacy/components/NavBar.vue)と同一にする。
 * 契約は specs/001-site-foundation/contracts/navigation.md を参照。
 */
export const navigation: NavGroup[] = [
  {
    label: 'F2L',
    items: [
      { label: 'F2L手順', to: '/f2l/f2l' },
      { label: '発展形F2L', to: '/f2l/f2l-advanced' },
      { label: 'Winter Variation', to: '/f2l/winter-variation' },
    ],
  },
  {
    label: 'OLL',
    items: [
      { label: 'OLL手順', to: '/oll/oll' },
      { label: 'COLL', to: '/oll/coll' },
    ],
  },
  {
    label: 'PLL',
    items: [
      { label: 'PLL一覧', to: '/pll/pll-view' },
      { label: 'PLLの確率', to: '/pll/pll-chances' },
      { label: 'PLL手順', to: '/pll/pll' },
      { label: '2側面判断', to: '/pll/two-sided-pll' },
    ],
  },
  {
    label: 'BLD',
    items: [
      { label: 'ルービックキューブを目隠しで揃えるには', to: '/bld/bld-introduction' },
      { label: 'ルービックキューブ目隠しの解法', to: '/bld/bld-method' },
      { label: 'Old Pochmann method(corner)', to: '/bld/old-pochmann-corner' },
    ],
  },
  {
    label: 'Megaminx',
    items: [
      { label: 'Megaminx EO', to: '/megaminx/megaminx-eo' },
      { label: 'Megaminx CO', to: '/megaminx/megaminx-co' },
      { label: 'Megaminx EP', to: '/megaminx/megaminx-ep' },
      { label: 'Megaminx CP', to: '/megaminx/megaminx-cp' },
    ],
  },
  {
    label: 'FMC',
    items: [{ label: '最小手数競技の紹介', to: '/fmc/intro-fmc' }],
  },
  {
    label: 'Clock',
    items: [{ label: 'No-Flip Method', to: '/clock/clock-no-flip' }],
  },
  {
    label: 'Other',
    items: [
      { label: '各種解法', to: '/other/3x3x3-method' },
      { label: '知っておいてほしいこと', to: '/other/for-non-cubers' },
      { label: '続ける意味について', to: '/other/advent-calendar2014' },
      { label: 'ルービックキューブの世界', to: 'https://competition.roudai.net' },
      { label: 'ブログ版ろーだいねっと', to: 'https://blog.roudai.net' },
    ],
  },
  {
    // 表示名の `Tooks` は現行の表記のまま(パリティ優先)
    label: 'Tooks',
    items: [
      { label: 'VisualCube Editor', to: 'https://visualcube.roudai.net/' },
      { label: 'Megaminx Image editor', to: 'https://roudai.github.io/MegaminxImageEditor/' },
      { label: 'PLL Trainer', to: 'https://roudai.github.io/PLLTrainer/' },
    ],
  },
]

/** GitHub リポジトリの URL(ヘッダーとフッターのアイコンのリンク先) */
export const repositoryUrl = 'https://github.com/roudai/roudainet'
