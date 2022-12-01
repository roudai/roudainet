<template>
  <div>
    <h2>Megaminx EP</h2>
    <h3>隣り合った3点交換</h3>
    <h4>時計回り（コーナー干渉あり）</h4>
    <megaminx-view image="megacase1" :algorithm="megacase[1]"></megaminx-view>
    <h4>反時計回り（コーナー干渉あり）</h4>
    <megaminx-view image="megacase2" :algorithm="megacase[2]"></megaminx-view>
    <h4>時計回り（コーナー干渉なし）</h4>
    <megaminx-view image="megacase3" :algorithm="megacase[3]"></megaminx-view>
    <h4>反時計回り（コーナー干渉なし）</h4>
    <megaminx-view image="megacase4" :algorithm="megacase[4]"></megaminx-view>

    <h3>離れた3点交換</h3>
    <h4>時計回り（コーナー干渉あり）</h4>
    <megaminx-view image="megacase5" :algorithm="megacase[5]"></megaminx-view>
    <h4>反時計回り（コーナー干渉あり）</h4>
    <megaminx-view image="megacase6" :algorithm="megacase[5]"></megaminx-view>
    <h4>時計回り（コーナー干渉なし）</h4>
    <megaminx-view image="megacase7" :algorithm="megacase[7]"></megaminx-view>
    <h4>反時計回り（コーナー干渉なし）</h4>
    <megaminx-view image="megacase8" :algorithm="megacase[8]"></megaminx-view>

    <h3>4点交換</h3>
    <h4>コーナー干渉あり</h4>
    <megaminx-view image="megacase9" :algorithm="megacase[9]"></megaminx-view>
    <h4>コーナー干渉なし</h4>
    <megaminx-view image="megacase10" :algorithm="megacase_view[10]"></megaminx-view>
    <megaminx-view image="megacase11" :algorithm="megacase[11]"></megaminx-view>
    <megaminx-view image="megacase12" :algorithm="megacase_view[12]"></megaminx-view>

    <h3>5点交換</h3>
    <megaminx-view image="megacase13" :algorithm="megacase_view[13]"></megaminx-view>
    <megaminx-view image="megacase14" :algorithm="megacase_view[14]"></megaminx-view>
    <megaminx-view image="megacase15" :algorithm="megacase[15]"></megaminx-view>
    <megaminx-view image="megacase16" :algorithm="megacase[16]"></megaminx-view>
  </div>
</template>

<script>
import { Type, PNG } from 'sr-puzzlegen'
export default {
  data: () => ({
    type: Type.MEGAMINX_TOP,
    options: {
      width: 120,
      height: 120,
      puzzle: {
        case: '',
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
        arrows: '',
      },
    },
    megacase: {
      1: ["U R U R2' F' R U R U' R' F R U' R'"],
      2: ["R U R' F' R U R' U' R' F R2 U' R' U'"],
      3: ["R' U' R U' R U R2' U R U' R U' R' U2"],
      4: ["U2' R U R' U R' U' R2 U' R' U R' U R"],
      5: ["R2 U2' R2' U' R2 U2' R2'"],
      6: ["R U R' U' R' F R2 U' R' U' R U R' F'"],
      7: ["R U R' U2 R' U' R U' R U R2' U R U' R U2' R'"],
      8: ["R U2 R' U R' U' R2 U' R' U R' U R U2' R U' R'"],
      9: ["R U R' F' R U R' U' R' F R U' R' F R2 U' R' U' R U R' F'"],
      10: ["R U2 R2' F R F' R U2' BR U' BR' U' BR U BR' R' U2"],
      11: ["R' U2' R' U' R F R' F' U R F' U' F U2' R"],
      12: ["L' R' U2 L U R F BR U2' BR' U' F'"],
      13: ["R2' U2 R2 U R2' U2 R2 U' R2' U2 R2 U R2' U2 R2 U'"],
      14: ["R2 U2' R2' U' R2 U2' R2' U R2 U2' R2' U' R2 U2' R2' U"],
      15: ["R' U2' R U' R' U2' R2 U2' R' U' R U2' R' U2'"],
      16: ["R U2' R' U' R U2' R' U2' R' U2' R U' R' U2' R"],
    },
    megacase_view: {
      10: ["R U2 R2' F R F' R U2' y R U' R' U' R U R' F' U2"],
      12: ["L' R' U2 L U R y L R U2' R' U' L'"],
      13: ["(R2' U2 R2 U R2' U2 R2 U' )x2"],
      14: ["(R2 U2' R2' U' R2 U2' R2' U)x2"],
    },
    arrows: {
      1: [
        [
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 3 } },
          { start: { face: 'U', sticker: 3 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
        ],
      ],
      2: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 3 } },
          { start: { face: 'U', sticker: 3 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
        ],
      ],
      3: [
        [
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 3 } },
          { start: { face: 'U', sticker: 3 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
        ],
      ],
      4: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 3 } },
          { start: { face: 'U', sticker: 3 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
        ],
      ],
      5: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
        ],
      ],
      6: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 1 } },
        ],
      ],
      7: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
        ],
      ],
      8: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 1 } },
        ],
      ],
      9: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 7 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 7 } },
        ],
      ],
      10: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 7 } },
          { start: { face: 'U', sticker: 7 }, end: { face: 'U', sticker: 5 } },
        ],
      ],
      11: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 7 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 7 } },
        ],
      ],
      12: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 3 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 3 } },
        ],
      ],
      13: [
        [
          { start: { face: 'U', sticker: 3 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 9 } },
        ],
      ],
      14: [
        [
          { start: { face: 'U', sticker: 7 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 1 } },
        ],
      ],
      15: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 3 } },
        ],
      ],
      16: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 3 } },
          { start: { face: 'U', sticker: 7 }, end: { face: 'U', sticker: 9 } },
        ],
      ],
    },
  }),
  mounted() {
    for (const key in this.megacase) {
      this.options.puzzle.case = this.megacase[key][0]
      this.options.puzzle.arrows = this.arrows[key][0]
      PNG('#megacase' + key, this.type, this.options)
    }
  },
}
</script>
