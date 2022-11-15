<template>
  <div class="content m-2">
    <h2>Megaminx EO</h2>
    <h3>2つ反転</h3>
    <h4>隣り合った2つ反転</h4>
    <megaminx-view image="eo1" :algorithm="eo[1][0]"></megaminx-view>
    <h4>離れた2つ反転</h4>
    <megaminx-view image="eo2" :algorithm="eo[2][0]"></megaminx-view>
    <h2>4つ反転</h2>
    <megaminx-view image="eo3" :algorithm="eo[3][0]"></megaminx-view>
  </div>
</template>

<script>
import { PNG } from 'sr-puzzlegen'
export default {
  data: () => ({
    type: 'megaminx-top',
    options: {
      width: 120,
      height: 120,
      puzzle: {
        case: '',
        mask: {
          F: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          R: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          L: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          BR: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          BL: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          d: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          b: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          dl: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          dr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          bl: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          br: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        },
      },
    },
    eo: {
      1: ["R' U' F' U F R"],
      2: ["F R U R' U' F'"],
      3: ["R BR BL U BL' U BR' U2' R'"],
    },
  }),
  mounted() {
    for (const key in this.eo) {
      this.options.puzzle.case = this.eo[key][0]
      PNG('#eo' + key, this.type, this.options)
    }
  },
}
</script>
