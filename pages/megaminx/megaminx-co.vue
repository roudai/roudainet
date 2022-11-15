<template>
  <div class="content m-2">
    <h2>Megaminx CO</h2>
    <h3>2つ反転</h3>
    <megaminx-view image="co1" :algorithm="co[1][0]"></megaminx-view>
    <megaminx-view image="co2" :algorithm="co[2][0]"></megaminx-view>
    <megaminx-view image="co3" :algorithm="co[3][0]"></megaminx-view>
    <megaminx-view image="co4" :algorithm="co[4][0]"></megaminx-view>

    <h3>3つ反転</h3>
    <megaminx-view image="co5" :algorithm="co[5][0]"></megaminx-view>
    <megaminx-view image="co6" :algorithm="co[6][0]"></megaminx-view>
    <megaminx-view image="co7" :algorithm="co[7][0]"></megaminx-view>
    <megaminx-view image="co8" :algorithm="co[8][0]"></megaminx-view>

    <h3>4つ反転</h3>
    <megaminx-view image="co9" :algorithm="co[9][0]"></megaminx-view>
    <megaminx-view image="co10" :algorithm="co[10][0]"></megaminx-view>
    <megaminx-view image="co11" :algorithm="co[11][0]"></megaminx-view>
    <megaminx-view image="co12" :algorithm="co[12][0]"></megaminx-view>
    <megaminx-view image="co13" :algorithm="co[13][0]"></megaminx-view>
    <megaminx-view image="co14" :algorithm="co[14][0]"></megaminx-view>

    <h3>5つ反転</h3>
    <megaminx-view image="co15" :algorithm="co[15][0]"></megaminx-view>
    <megaminx-view image="co16" :algorithm="co[16][0]"></megaminx-view>
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
    co: {
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
    for (const key in this.co) {
      this.options.puzzle.case = this.co[key][0]
      PNG('#co' + key, this.type, this.options)
    }
  },
}
</script>
