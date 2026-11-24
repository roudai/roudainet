// 移植元: legacy/pages/megaminx/megaminx-cp.vue
// 手順の文字列は、data() の値を変換スクリプトでそのまま写した(003 の FR-002)。図の指定は、005 で megaminx-image の形に書き換えた。
import type { MegaminxDiagram } from './types'

export const megacase: Record<string, string[]> = {
  '1': ["R' U2' R U' R' F' R U R' U' R' F R U2' R"],
  '2': ["R' U2 R' F' R U R U' R' F R U R' U2 R"],
  '3': ["U F' R' F R U' R' F' R2 U R' U' R' F R"],
  '4': ["R' F' R U R U' R2' F R U R' F' R F U'"],
  '5': ["BR BL' BR' R BR BL BR' R' BR BL BR'  R BR BL' BR' R'"],
  '6': ["R U R' U R' U' R F' R U R' U' R' F R2 U' R2' U R (U')"],
  '7': ["L' R U2 R' U' R U R' U' R U R' U' R U' R' L"],
  '8': ["(R2 U2' R2' U' R2 U2') (R' U R' U' R' F R2 U' R' U' R U R') F'"],
  '9': ["(R U R' U2' R U R' U2') (R U' R' U2') (R U2 R' U' R U2 R')"],
  '10': ["(R2 U2' R2' U') (R2 U R2' U' R2 U R2' U') (R2 U2' R2')"],
  '11': ["(R2 U2 R2' U) (R2 U' R2' U R2 U' R2' U) (R2 U2 R2')"],
  '12': ["(R U2 R' U2 R U' R' U' R U2 R') U (R' F' R U R U' R' F)"],
  '13': ["(F' R U R' U' R' F R) U' (R U2' R' U R U R' U2' R U2' R')"],
  '14': ["R2' U2' R2 U R2' U R2 (BR2 U BR2' U BR2 U2' BR2' U)"],
  '15': ["R2 U2 R2' U' R2 U' R2' (F2' U' F2 U' F2' U2 F2 U)"],
}

export const megacase_view: Record<string, string[]> = {
  '5': ["F' R2' U2 (R U R' U' R U R' U' R U R') U2 R2 F"],
  '14': ["R2' U2' R2 U R2' U R2 y R2 U R2' U R2 U2' R2' U"],
  '15': ["R2 U2 R2' U' R2 U' R2' y' R2' U' R2 U' R2' U2 R2 U"],
}

/** 図の指定。キーは描画先の id */
export const diagrams: Record<string, MegaminxDiagram> = {
  megacase1: { case: "R' U2' R U' R' F' R U R' U' R' F R U2' R" },
  megacase2: { case: "R' U2 R' F' R U R U' R' F R U R' U2 R" },
  megacase3: { case: "U F' R' F R U' R' F' R2 U R' U' R' F R" },
  megacase4: { case: "R' F' R U R U' R2' F R U R' F' R F U'" },
  megacase5: { case: "BR BL' BR' R BR BL BR' R' BR BL BR'  R BR BL' BR' R'" },
  megacase6: { case: "R U R' U R' U' R F' R U R' U' R' F R2 U' R2' U R (U')" },
  megacase7: { case: "L' R U2 R' U' R U R' U' R U R' U' R U' R' L" },
  megacase8: { case: "(R2 U2' R2' U' R2 U2') (R' U R' U' R' F R2 U' R' U' R U R') F'" },
  megacase9: { case: "(R U R' U2' R U R' U2') (R U' R' U2') (R U2 R' U' R U2 R')" },
  megacase10: { case: "(R2 U2' R2' U') (R2 U R2' U' R2 U R2' U') (R2 U2' R2')" },
  megacase11: { case: "(R2 U2 R2' U) (R2 U' R2' U R2 U' R2' U) (R2 U2 R2')" },
  megacase12: { case: "(R U2 R' U2 R U' R' U' R U2 R') U (R' F' R U R U' R' F)" },
  megacase13: { case: "(F' R U R' U' R' F R) U' (R U2' R' U R U R' U2' R U2' R')" },
  megacase14: { case: "R2' U2' R2 U R2' U R2 (BR2 U BR2' U BR2 U2' BR2' U)" },
  megacase15: { case: "R2 U2 R2' U' R2 U' R2' (F2' U' F2 U' F2' U2 F2 U)" },
}
