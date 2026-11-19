// 移植元: legacy/pages/f2l/f2l-advanced.vue
// data() の値と、mounted() で cubePNG に渡している値を、変換スクリプトでそのまま写した(FR-002、FR-003)。
import type { CubeDiagram } from './types'

export const advancedF2lth: Record<string, string[]> = {
  '1': ["Fw R Fw'"],
  '2': ["Fw R' Fw'"],
  '3': ["U R' F R F' R' U' R"],
  '4': ["U R2 U' R' U R U' R"],
  '5': ["U2 L2 U2 L U L' U L2"],
}

export const advancedF2loh: Record<string, string[]> = {
  '7': ["R U' R U2 R2 U' R2 U' R2"],
}

/** 図の指定。キーは、移植元の描画先の id */
export const diagrams: Record<string, CubeDiagram> = {
  advancedF2lth1: {
    mask: 'f2l',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    case: "Fw R Fw'",
  },
  advancedF2lth2: {
    mask: 'f2l',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    case: "Fw R' Fw'",
  },
  advancedF2lth3: {
    mask: 'f2l',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    case: "U R' F R F' R' U' R",
  },
  advancedF2lth4: {
    mask: 'f2l',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    case: "U R2 U' R' U R U' R",
  },
  advancedF2lth5: {
    mask: 'f2l',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    case: "U2 L2 U2 L U L' U L2",
  },
  advancedF2loh7: {
    mask: 'f2l',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    case: "R U' R U2 R2 U' R2 U' R2",
  },
}
