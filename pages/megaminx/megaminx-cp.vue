<template>
  <div class="content m-2">
    <h2>Megaminx CP</h2>
    <h3>3点交換</h3>
    <h4>離れた3点交換 時計回り</h4>
    <megaminx-view image="megacase1" :algorithm="megacase[1]"></megaminx-view>
    <h4>離れた3点交換 反時計回り</h4>
    <megaminx-view image="megacase2" :algorithm="megacase[2]"></megaminx-view>
    <h4>隣り合った3点交換 時計回り</h4>
    <megaminx-view image="megacase3" :algorithm="megacase[3]"></megaminx-view>
    <h4>隣り合った3点交換 反時計回り</h4>
    <megaminx-view image="megacase4" :algorithm="megacase[4]"></megaminx-view>

    <h3>2点-2点交換</h3>
    <h4>並行交換(1)</h4>
    <megaminx-view image="megacase5" :algorithm="megacase[5]"></megaminx-view>
    <h4>並行交換(2)</h4>
    <megaminx-view image="megacase6" :algorithm="megacase[6]"></megaminx-view>
    <h4>交差交換</h4>
    <megaminx-view image="megacase7" :algorithm="megacase[7]"></megaminx-view>
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
      1: ["R' U2' R U' R' F' R U R' U' R' F R U2' R"],
      2: ["R' U2 R' F' R U R U' R' F R U R' U2 R"],
      3: ["U F' R' F R U' R' F' R2 U R' U' R' F R"],
      4: ["R' F' R U R U' R2' F R U R' F' R F U'"],
      5: ["BR BL' BR' R BR BL BR' R' BR BL BR'  R BR BL' BR' R'"],
      6: ["R U R' U R' U' R F' R U R' U' R' F R2 U' R2' U R (U')"],
      7: ["L' R U2 R' U' R U R' U' R U R' U' R U' R' L"],
    },
    arrows: {
      1: [
        [
          { start: { face: 'U', sticker: 4 }, end: { face: 'U', sticker: 10 } },
          { start: { face: 'U', sticker: 10 }, end: { face: 'U', sticker: 8 } },
          { start: { face: 'U', sticker: 8 }, end: { face: 'U', sticker: 4 } },
        ],
      ],
      2: [
        [
          { start: { face: 'U', sticker: 4 }, end: { face: 'U', sticker: 8 } },
          { start: { face: 'U', sticker: 8 }, end: { face: 'U', sticker: 10 } },
          { start: { face: 'U', sticker: 10 }, end: { face: 'U', sticker: 4 } },
        ],
      ],
      3: [
        [
          { start: { face: 'U', sticker: 4 }, end: { face: 'U', sticker: 8 } },
          { start: { face: 'U', sticker: 8 }, end: { face: 'U', sticker: 6 } },
          { start: { face: 'U', sticker: 6 }, end: { face: 'U', sticker: 4 } },
        ],
      ],
      4: [
        [
          { start: { face: 'U', sticker: 4 }, end: { face: 'U', sticker: 6 } },
          { start: { face: 'U', sticker: 6 }, end: { face: 'U', sticker: 8 } },
          { start: { face: 'U', sticker: 8 }, end: { face: 'U', sticker: 4 } },
        ],
      ],
      5: [
        [
          { start: { face: 'U', sticker: 4 }, end: { face: 'U', sticker: 10 } },
          { start: { face: 'U', sticker: 10 }, end: { face: 'U', sticker: 4 } },
          { start: { face: 'U', sticker: 6 }, end: { face: 'U', sticker: 8 } },
          { start: { face: 'U', sticker: 8 }, end: { face: 'U', sticker: 6 } },
        ],
      ],
      6: [
        [
          { start: { face: 'U', sticker: 4 }, end: { face: 'U', sticker: 6 } },
          { start: { face: 'U', sticker: 6 }, end: { face: 'U', sticker: 4 } },
          { start: { face: 'U', sticker: 8 }, end: { face: 'U', sticker: 10 } },
          { start: { face: 'U', sticker: 10 }, end: { face: 'U', sticker: 8 } },
        ],
      ],
      7: [
        [
          { start: { face: 'U', sticker: 2 }, end: { face: 'U', sticker: 6 } },
          { start: { face: 'U', sticker: 6 }, end: { face: 'U', sticker: 2 } },
          { start: { face: 'U', sticker: 4 }, end: { face: 'U', sticker: 8 } },
          { start: { face: 'U', sticker: 8 }, end: { face: 'U', sticker: 4 } },
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
