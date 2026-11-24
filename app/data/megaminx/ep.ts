// 移植元: legacy/pages/megaminx/megaminx-ep.vue
// 手順の文字列は、data() の値を変換スクリプトでそのまま写した(003 の FR-002)。図の指定は、005 で megaminx-image の形に書き換えた。
import type { MegaminxDiagram } from './types'

export const megacase: Record<string, string[]> = {
  '1': ["U R U R2' F' R U R U' R' F R U' R'"],
  '2': ["R U R' F' R U R' U' R' F R2 U' R' U'"],
  '3': ["R' U' R U' R U R2' U R U' R U' R' U2"],
  '4': ["U2' R U R' U R' U' R2 U' R' U R' U R"],
  '5': ["R2 U2' R2' U' R2 U2' R2'"],
  '6': ["R U R' U' R' F R2 U' R' U' R U R' F'"],
  '7': ["R U R' U2 R' U' R U' R U R2' U R U' R U2' R'"],
  '8': ["R U2 R' U R' U' R2 U' R' U R' U R U2' R U' R'"],
  '9': ["R U R' F' R U R' U' R' F R U' R' F R2 U' R' U' R U R' F'"],
  '10': ["R' U' R' U' R F R' F' U R F' U' F U2 R"],
  '11': ["R' U2' R' U' R F R' F' U R F' U' F U2' R"],
  '12': ["L' R' U2 L U R F BR U2' BR' U' F'"],
}

export const megacase_view: Record<string, string[]> = {
  '12': ["(R' L' U2 L U R) (BR F U2' BR' U' F')"],
}

/** 図の指定。キーは描画先の id */
export const diagrams: Record<string, MegaminxDiagram> = {
  megacase1: { case: "U R U R2' F' R U R U' R' F R U' R'" },
  megacase2: { case: "R U R' F' R U R' U' R' F R2 U' R' U'" },
  megacase3: { case: "R' U' R U' R U R2' U R U' R U' R' U2" },
  megacase4: { case: "U2' R U R' U R' U' R2 U' R' U R' U R" },
  megacase5: { case: "R2 U2' R2' U' R2 U2' R2'" },
  megacase6: { case: "R U R' U' R' F R2 U' R' U' R U R' F'" },
  megacase7: { case: "R U R' U2 R' U' R U' R U R2' U R U' R U2' R'" },
  megacase8: { case: "R U2 R' U R' U' R2 U' R' U R' U R U2' R U' R'" },
  megacase9: { case: "R U R' F' R U R' U' R' F R U' R' F R2 U' R' U' R U R' F'" },
  megacase10: { case: "R' U' R' U' R F R' F' U R F' U' F U2 R" },
  megacase11: { case: "R' U2' R' U' R F R' F' U R F' U' F U2' R" },
  megacase12: { case: "L' R' U2 L U R F BR U2' BR' U' F'" },
}
