<template>
  <div class="content m-2">
    <h2>Megaminx EO</h2>
    <h3>2つ反転</h3>
    <h4>隣り合った2つ反転</h4>
    <megaminx-view image="megacase1" :algorithm="megacase[1]"></megaminx-view>
    <h4>離れた2つ反転</h4>
    <megaminx-view image="megacase2" :algorithm="megacase[2]"></megaminx-view>
    <h2>4つ反転</h2>
    <megaminx-view image="megacase3" :algorithm="megacase[3]"></megaminx-view>
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
    megacase: {
      1: ["R' U' F' U F R"],
      2: ["F R U R' U' F'"],
      3: ["R BR BL U BL' U BR' U2' R'"],
    },
  }),
  mounted() {
    for (const key in this.megacase) {
      this.options.puzzle.case = this.megacase[key][0]
      PNG('#megacase' + key, this.type, this.options)
    }
  },
}
</script>
