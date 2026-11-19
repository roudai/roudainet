// 移植元: legacy/pages/megaminx/megaminx-cp.vue
// data() の値と、mounted() で PNG に渡している値を、変換スクリプトでそのまま写した(FR-002、FR-003)。
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
  megacase1: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R' U2' R U' R' F' R U R' U' R' F R U2' R",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
      ],
    },
  },
  megacase2: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R' U2 R' F' R U R U' R' F R U R' U2 R",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
      ],
    },
  },
  megacase3: {
    width: 120,
    height: 120,
    puzzle: {
      case: "U F' R' F R U' R' F' R2 U R' U' R' F R",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
      ],
    },
  },
  megacase4: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R' F' R U R U' R2' F R U R' F' R F U'",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
      ],
    },
  },
  megacase5: {
    width: 120,
    height: 120,
    puzzle: {
      case: "BR BL' BR' R BR BL BR' R' BR BL BR'  R BR BL' BR' R'",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
      ],
    },
  },
  megacase6: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R U R' U R' U' R F' R U R' U' R' F R2 U' R2' U R (U')",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
      ],
    },
  },
  megacase7: {
    width: 120,
    height: 120,
    puzzle: {
      case: "L' R U2 R' U' R U R' U' R U R' U' R U' R' L",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 2,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 2,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
      ],
    },
  },
  megacase8: {
    width: 120,
    height: 120,
    puzzle: {
      case: "(R2 U2' R2' U' R2 U2') (R' U R' U' R' F R2 U' R' U' R U R') F'",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
      ],
    },
  },
  megacase9: {
    width: 120,
    height: 120,
    puzzle: {
      case: "(R U R' U2' R U R' U2') (R U' R' U2') (R U2 R' U' R U2 R')",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
      ],
    },
  },
  megacase10: {
    width: 120,
    height: 120,
    puzzle: {
      case: "(R2 U2' R2' U') (R2 U R2' U' R2 U R2' U') (R2 U2' R2')",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 2,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
      ],
    },
  },
  megacase11: {
    width: 120,
    height: 120,
    puzzle: {
      case: "(R2 U2 R2' U) (R2 U' R2' U R2 U' R2' U) (R2 U2 R2')",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 2,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
      ],
    },
  },
  megacase12: {
    width: 120,
    height: 120,
    puzzle: {
      case: "(R U2 R' U2 R U' R' U' R U2 R') U (R' F' R U R U' R' F)",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 2,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 2,
          },
        },
      ],
    },
  },
  megacase13: {
    width: 120,
    height: 120,
    puzzle: {
      case: "(F' R U R' U' R' F R) U' (R U2' R' U R U R' U2' R U2' R')",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 2,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 2,
          },
        },
      ],
    },
  },
  megacase14: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R2' U2' R2 U R2' U R2 (BR2 U BR2' U BR2 U2' BR2' U)",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 2,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 2,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
      ],
    },
  },
  megacase15: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R2 U2 R2' U' R2 U' R2' (F2' U' F2 U' F2' U2 F2 U)",
      scheme: {
        U: {
          value: '#FFFFFF',
          name: 'WHITE',
        },
        F: {
          value: '#FF69B4',
          name: 'PINK',
        },
        R: {
          value: '#ffffb3',
          name: 'LIGHT_YELLOW',
        },
        L: {
          value: '#32CD32',
          name: 'LIGHT_GREEN',
        },
        BR: {
          value: '#00bfff',
          name: 'DEEPSKYBLUE',
        },
        BL: {
          value: '#FFA500',
          name: 'ORANGE',
        },
      },
      arrows: [
        {
          start: {
            face: 'U',
            sticker: 8,
          },
          end: {
            face: 'U',
            sticker: 2,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 10,
          },
          end: {
            face: 'U',
            sticker: 4,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 2,
          },
          end: {
            face: 'U',
            sticker: 6,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 4,
          },
          end: {
            face: 'U',
            sticker: 8,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 6,
          },
          end: {
            face: 'U',
            sticker: 10,
          },
        },
      ],
    },
  },
}
