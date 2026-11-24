// 移植元: legacy/pages/megaminx/megaminx-co.vue
// 手順の文字列は、data() の値を変換スクリプトでそのまま写した(003 の FR-002)。図の指定は、005 で megaminx-image の形に書き換えた。
import type { MegaminxDiagram } from './types'

export const megacase: Record<string, string[]> = {
  '1': ["F R U2 R' U' R U' R' F'"],
  '2': ["F R U R' U R U2' R' F'"],
  '3': ["R U2' R' U' R U2' R'"],
  '4': ["R U R' U R U R' U2' R U' R'"],
  '5': ["R U R' U R U2' R'"],
  '6': ["R' U' R U' R' U2 R"],
  '7': ["R U2 R' U' R U' R'"],
  '8': ["R' U2' R U R' U R"],
  '9': ["(U) R' U2' R2 U R2' U R2 U2' R'"],
  '10': ["(U') R U2 R2' U' R2 U' R2' U2 R"],
  '11': ["(U') R U2 R' U' R U R' U' R U' R'"],
  '12': ["(U') R U R' U R U' R' U R U2' R'"],
  '13': ["(U) R U2' R' U2' R U2 R' U2' R U' R'"],
  '14': ["R U R' U R U R' U' R U2' R'"],
  '15': ["R U R' U2 R U2' R' U R U2' R'"],
  '16': ["R U2 R' U' R U2 R' U2' R U' R'"],
}

/** 図の指定。キーは描画先の id */
export const diagrams: Record<string, MegaminxDiagram> = {
  megacase1: { case: "F R U2 R' U' R U' R' F'", oll: true },
  megacase2: { case: "F R U R' U R U2' R' F'", oll: true },
  megacase3: { case: "R U2' R' U' R U2' R'", oll: true },
  megacase4: { case: "R U R' U R U R' U2' R U' R'", oll: true },
  megacase5: { case: "R U R' U R U2' R'", oll: true },
  megacase6: { case: "R' U' R U' R' U2 R", oll: true },
  megacase7: { case: "R U2 R' U' R U' R'", oll: true },
  megacase8: { case: "R' U2' R U R' U R", oll: true },
  megacase9: { case: "(U) R' U2' R2 U R2' U R2 U2' R'", oll: true },
  megacase10: { case: "(U') R U2 R2' U' R2 U' R2' U2 R", oll: true },
  megacase11: { case: "(U') R U2 R' U' R U R' U' R U' R'", oll: true },
  megacase12: { case: "(U') R U R' U R U' R' U R U2' R'", oll: true },
  megacase13: { case: "(U) R U2' R' U2' R U2 R' U2' R U' R'", oll: true },
  megacase14: { case: "R U R' U R U R' U' R U2' R'", oll: true },
  megacase15: { case: "R U R' U2 R U2' R' U R U2' R'", oll: true },
  megacase16: { case: "R U2 R' U' R U2 R' U2' R U' R'", oll: true },
}
