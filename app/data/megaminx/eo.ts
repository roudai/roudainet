// 移植元: legacy/pages/megaminx/megaminx-eo.vue
// 手順の文字列は、data() の値を変換スクリプトでそのまま写した(003 の FR-002)。図の指定は、005 で megaminx-image の形に書き換えた。
import type { MegaminxDiagram } from './types'

export const megacase: Record<string, string[]> = {
  '1': ["R' U' F' U F R"],
  '2': ["F R U R' U' F'"],
  '3': ["R BR BL U BL' U BR' U2' R'"],
}

/** 図の指定。キーは描画先の id */
export const diagrams: Record<string, MegaminxDiagram> = {
  megacase1: { case: "R' U' F' U F R", oll: true },
  megacase2: { case: "F R U R' U' F'", oll: true },
  megacase3: { case: "R BR BL U BL' U BR' U2' R'", oll: true },
}
