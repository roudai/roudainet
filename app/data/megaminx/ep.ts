// 移植元: legacy/pages/megaminx/megaminx-ep.vue
// data() の値と、mounted() で PNG に渡している値を、変換スクリプトでそのまま写した(FR-002、FR-003)。
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
  megacase1: {
    width: 120,
    height: 120,
    puzzle: {
      case: "U R U R2' F' R U R U' R' F R U' R'",
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
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 3,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 3,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
      ],
    },
  },
  megacase2: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R U R' F' R U R' U' R' F R2 U' R' U'",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 3,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 3,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
      ],
    },
  },
  megacase3: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R' U' R U' R U R2' U R U' R U' R' U2",
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
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 3,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 3,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
      ],
    },
  },
  megacase4: {
    width: 120,
    height: 120,
    puzzle: {
      case: "U2' R U R' U R' U' R2 U' R' U R' U R",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 3,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 3,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
      ],
    },
  },
  megacase5: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R2 U2' R2' U' R2 U2' R2'",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
      ],
    },
  },
  megacase6: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R U R' U' R' F R2 U' R' U' R U R' F'",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
      ],
    },
  },
  megacase7: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R U R' U2 R' U' R U' R U R2' U R U' R U2' R'",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
      ],
    },
  },
  megacase8: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R U2 R' U R' U' R2 U' R' U R' U R U2' R U' R'",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
      ],
    },
  },
  megacase9: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R U R' F' R U R' U' R' F R U' R' F R2 U' R' U' R U R' F'",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 7,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 7,
          },
        },
      ],
    },
  },
  megacase10: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R' U' R' U' R F R' F' U R F' U' F U2 R",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 3,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 3,
          },
        },
      ],
    },
  },
  megacase11: {
    width: 120,
    height: 120,
    puzzle: {
      case: "R' U2' R' U' R F R' F' U R F' U' F U2' R",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 7,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 7,
          },
        },
      ],
    },
  },
  megacase12: {
    width: 120,
    height: 120,
    puzzle: {
      case: "L' R' U2 L U R F BR U2' BR' U' F'",
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
            sticker: 1,
          },
          end: {
            face: 'U',
            sticker: 5,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 5,
          },
          end: {
            face: 'U',
            sticker: 1,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 3,
          },
          end: {
            face: 'U',
            sticker: 9,
          },
        },
        {
          start: {
            face: 'U',
            sticker: 9,
          },
          end: {
            face: 'U',
            sticker: 3,
          },
        },
      ],
    },
  },
}
