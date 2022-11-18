<template>
  <div>
    <h2>F2L手順</h2>
    <div v-for="(item, index) in f2l" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'f2l' + index"></div>
      </div>
      <div class="column is-10-tablet is-9-mobile">
        <div>{{ item[0] }}</div>
        <div>{{ item[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as SRVisualizer from 'sr-visualizer'
export default {
  data: () => ({
    mask: 'f2l',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    f2l: {
      1: ["U R U' R'"],
      2: ["F R' F' R", "y' U' R' U R"],
      3: ["F' U' F", "y' R' U'R"],
      4: ["R U R'"],
      5: ["U' R U R' U2 R U' R'"],
      6: ["U' Rw U' R' U R U Rw'", "y' U R' U' R U2 R' U R"],
      7: ["U' R U2 R' U2 R U' R'"],
      8: ["Rw' U2 R2 U R2' U Rw", "y' U R' U2 R U2 R' U R"],
      9: ["F R U R' U' F' R U' R'", "y' U R' U' R U' R' U' R"],
      10: ["U' R U R' U R U R'"],
      11: ["U' R U2 R' U F' U' F", "y' R' U R U' R' U R U'2 R' U R"],
      12: ["R U' R' U R U' R' U2 R U' R'"],
      13: ["M' U' R U R' U2 R U' Rw'", "y' U R' U R U' R' U' R"],
      14: ["U' R U' R' U R U R'"],
      15: ["R U R' U2 R U' R' U R U' R'", "R U2 R' U R U R' U R U' R'"],
      16: ["U R F R U R' U' F' R'"],
      17: ["R U2 R' U' R U R'"],
      18: ["R' F R F' R U' R' U R U' R'", "y' R' U2 R U R' U' R"],
      19: ["U R U2 R' U R U' R'"],
      20: ["U' R U' R2 F R F' R U' R'", "y' U' R' U2 R U' R' U R"],
      21: ["R U' R' U2 R U R'", "U2 R U R' U R U' R'"],
      22: ["Rw U' Rw' U2 Rw U Rw'", "y' U2 R' U' R U' R' U R"],
      23: ["U R U' R' U' R U' R' U R U' R'", "R U R' U2 R U R' U' R U R'"],
      24: ["F U R U' R' F' R U' R'"],
      25: ["U' R' F R F' R U R'"],
      26: ["U R U' R' U' F' U F"],
      27: ["R U' R' U R U' R'"],
      28: ["R U R' U' F R' F' R", "y' R' U R U' R' U R"],
      29: ["R' F R F' R' F R F'", "y' R' U' R U R' U' R"],
      30: ["R U R' U' R U R'"],
      31: ["U' R' F R F' R U' R'"],
      32: ["R U R' U' R U R' U' R U R'"],
      33: ["U' R U' R' U2 R U' R'"],
      34: ["U' R U2' R' U R U R'", "y' U R' U R U2' R' U R"],
      35: ["U2 R U R' F R' F' R", "U' R U R' U y' R' U' R"],
      36: ["U2 R' F R F' U2 R U R'"],
      37: ["R U' R' Rw' U2 R2 U R2' U Rw", "R U' R' U y' R' U2 R U2' R' U R"],
      38: ["R U R' U' R U2 R' U' R U R'"],
      39: ["R U R' U2 R U' R' U R U R'"],
      40: ["R F U R U' R' F' U' R'", "R U' R' F R U R' U' F' R U' R'"],
      41: ["R U F R U R' U' F' R'"],
    },
  }),
  mounted() {
    const paramter = []
    for (const key in this.f2l) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.f2l[key][0]
      SRVisualizer.cubePNG(document.getElementById('f2l' + key), paramter[key])
    }
  },
}
</script>
