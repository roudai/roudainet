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

    <megaminx-view image="megacase9" :algorithm="megacase_view[9]"></megaminx-view>

    <megaminx-view image="megacase10" :algorithm="megacase[10]"></megaminx-view>

    <megaminx-view image="megacase11" :algorithm="megacase[11]"></megaminx-view>
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
      9: ["R U2 R2' F R F' R U2' BR U' BR' U' BR U BR' R' U2"],
      10: ["R' U2' R' U' R F R' F' U R F' U' F U2' R"],
      11: ["R' L' U2 L U R BR F U2' BR' U' F'"],
    },
    megacase_view: {
      9: ["R U2 R2' F R F' R U2' y R U' R' U' R U R' F' U2"],
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
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 7 } },
          { start: { face: 'U', sticker: 7 }, end: { face: 'U', sticker: 5 } },
        ],
      ],
      10: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 7 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 7 } },
        ],
      ],
      11: [
        [
          { start: { face: 'U', sticker: 1 }, end: { face: 'U', sticker: 5 } },
          { start: { face: 'U', sticker: 5 }, end: { face: 'U', sticker: 1 } },
          { start: { face: 'U', sticker: 3 }, end: { face: 'U', sticker: 9 } },
          { start: { face: 'U', sticker: 9 }, end: { face: 'U', sticker: 3 } },
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
