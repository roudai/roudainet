<template>
  <div class="content m-2">
    <h2>Megaminx CO</h2>
    <h3>2つ反転</h3>
    <megaminx-view image="megacase1" :algorithm="megacase[1][0]"></megaminx-view>
    <megaminx-view image="megacase2" :algorithm="megacase[2][0]"></megaminx-view>
    <megaminx-view image="megacase3" :algorithm="megacase[3][0]"></megaminx-view>
    <megaminx-view image="megacase4" :algorithm="megacase[4][0]"></megaminx-view>

    <h3>3つ反転</h3>
    <megaminx-view image="megacase5" :algorithm="megacase[5][0]"></megaminx-view>
    <megaminx-view image="megacase6" :algorithm="megacase[6][0]"></megaminx-view>
    <megaminx-view image="megacase7" :algorithm="megacase[7][0]"></megaminx-view>
    <megaminx-view image="megacase8" :algorithm="megacase[8][0]"></megaminx-view>

    <h3>4つ反転</h3>
    <megaminx-view image="megacase9" :algorithm="megacase[9][0]"></megaminx-view>
    <megaminx-view image="megacase10" :algorithm="megacase[10][0]"></megaminx-view>
    <megaminx-view image="megacase11" :algorithm="megacase[11][0]"></megaminx-view>
    <megaminx-view image="megacase12" :algorithm="megacase[12][0]"></megaminx-view>
    <megaminx-view image="megacase13" :algorithm="megacase[13][0]"></megaminx-view>
    <megaminx-view image="megacase14" :algorithm="megacase[14][0]"></megaminx-view>

    <h3>5つ反転</h3>
    <megaminx-view image="megacase15" :algorithm="megacase[15][0]"></megaminx-view>
    <megaminx-view image="megacase16" :algorithm="megacase[16][0]"></megaminx-view>
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
    megacase: {
      1: ["F R U2 R' U' R U' R' F'"],
      2: ["F R U R' U R U2' R' F'"],
      3: ["R U2' R' U' R U2' R'"],
      4: ["R U R' U R U R' U2' R U' R'"],
      5: ["R U R' U R U2' R'"],
      6: ["R' U' R U' R' U2 R"],
      7: ["R U2 R' U' R U' R'"],
      8: ["R' U2' R U R' U R"],
      9: ["(U) R' U2' R2 U R2' U R2 U2' R'"],
      10: ["(U') R U2 R2' U' R2 U' R2' U2 R"],
      11: ["(U') R U2 R' U' R U R' U' R U' R'"],
      12: ["(U') R U R' U R U' R' U R U2' R'"],
      13: ["(U) R U2' R' U2' R U2 R' U2' R U' R'"],
      14: ["R U R' U R U R' U' R U2' R'"],
      15: ["R U R' U2 R U2' R' U R U2' R'"],
      16: ["R U2 R' U' R U2 R' U2' R U' R'"],
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
