// 静的生成の出力に含まれなければならない、移植済みのページのパス。
// 後続の Spec でページを移植したら、ここに追記する(scripts/verify-output.mjs と scripts/verify-parity.mjs が使う)。

/** specs/002-cube-solution-pages の 13 ページ */
export const cubePages = [
  '/pll/pll-view',
  '/pll/pll-chances',
  '/pll/pll',
  '/pll/two-sided-pll',
  '/oll/oll',
  '/oll/coll',
  '/f2l/f2l',
  '/f2l/f2l-advanced',
  '/f2l/winter-variation',
  '/bld/bld-introduction',
  '/bld/bld-method',
  '/bld/old-pochmann-corner',
  '/fmc/intro-fmc',
]

/** specs/003-megaminx-clock-pages の 8 ページ */
export const puzzlePages = [
  '/megaminx/megaminx-eo',
  '/megaminx/megaminx-co',
  '/megaminx/megaminx-ep',
  '/megaminx/megaminx-cp',
  '/clock/clock-no-flip',
]

export const otherPages = ['/other/3x3x3-method', '/other/for-non-cubers', '/other/advent-calendar2014']

export const migratedPages = [...cubePages, ...puzzlePages, ...otherPages]
