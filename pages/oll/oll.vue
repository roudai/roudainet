<template>
  <div class="content m-2">
    <h2>OLL手順</h2>
    <div v-for="(item, index) in oll" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'oll' + index"></div>
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
    mask: 'oll',
    view: 'plan',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    oll: {
      1: ["R U'2 R'2 F R F' U2 R' F R F'"],
      2: ["F R U R' U' F' Fw R U R' U' Fw'"],
      3: ["Fw R U R' U' Fw' U' F R U R' U' F'"],
      4: ["Fw R U R' U' Fw' U F R U R' U' F'"],
      5: ["Rw' U2 R U R' U Rw"],
      6: ["Rw U2 R' U' R U' Rw'"],
      7: ["Rw U R' U R U'2 Rw'"],
      8: ["Rw' U' R U' R' U2 Rw", "y2 R U2 R' U2 R' F R F'"],
      9: ["R U R' U' R' F R2 U R' U' F'"],
      10: ["R U R' U R' F R F' R U2 R'", "y2 L U L' y' R' F R U' R' F' R"],
      11: ["Rw' R2 U R' U R U2 R' U M'"],
      12: ["y' F R U R' U' F' U F R U R' U' F'"],
      13: ["F U R U' R'2 F' R U R U' R'"],
      14: ["R' F R U R' F' R F U' F'"],
      15: ["Rw' U' Rw R' U' R U Rw' U Rw"],
      16: ["R B R' L U L' U' R B' R'"],
      17: ["R U R' U R' F R F' U2 R' F R F'"],
      18: ["R U'2 R'2 F R F' U2 M' U R U' Rw'"],
      19: ["Rw' R U R U R' U' Rw R'2 F R F'"],
      20: ["Rw' R U R U R' U' M'2 U R U' Rw'"],
      21: ["R U2 R' U' R U R' U' R U' R'"],
      22: ["R U'2 R'2 U' R2 U' R'2 U2 R"],
      23: ["R'2 D' R U2 R' D R U2 R"],
      24: ["x' R U R' D R U' R' D' x"],
      25: ["x' R U' R' D R U R' D' x"],
      26: ["R U2 R' U' R U' R'"],
      27: ["R U R' U R U2 R'"],
      28: ["Rw U R' U' Rw' R U R U' R'"],
      29: ["Rw U R' U' x Rw'2 R U R U' R' L"],
      30: ["y Fw R U R2 U' R' U R2 U' R' Fw'"],
      31: ["R' U' F U R U' R' F' R"],
      32: ["x' R F U' F' R' F R U R' x", "S R U R' U' R' F R Fw'"],
      33: ["R U R' U' R' F R F'"],
      34: ["R U R' U' y' Rw' U' R U M'"],
      35: ["R U'2 R'2 F R F' R U'2 R'"],
      36: ["R U R' F' R U R' U' R' F R U' R' F R F'", "R' U' R U' R' U R U x' R U' R' U x"],
      37: ["F R U' R' U' R U R' F'", "F R' F' R U R U' R'"],
      38: ["R U R' U R U' R' U' R' F R F'"],
      39: ["L F' L' U' L U y' R U' F'", "y2 R U R' F' U' F U R U2 R'"],
      40: ["R' F R U R' U' F' U R"],
      41: ["R U R' U R U2′ R' F R U R' U' F'", "y2 R U' R' U'2 R U y R U' R' U' F'"],
      42: ["R' U' R U' R' U2 R F R U R' U' F'", "y R' U2 R U R' U R2 y R U R' U' F'"],
      43: ["R' U' F' U F R"],
      44: ["Fw R U R' U' Fw'", "y2 F U R U' R' F'"],
      45: ["F R U R' U' F'"],
      46: ["R' U' R' F R F' U R"],
      47: ["R' U' x R' U R U' R' U R U' x' U R"],
      48: ["F R U R' U' R U R' U' F'"],
      49: ["R B' R'2 F R2 B R'2 F' R"],
      50: ["Rw' U Rw2 U' Rw'2 U' Rw2 U Rw'", "y' R U2 R' U' R U' R' F R U R' U' F'"],
      51: ["Fw R U R' U' R U R' U' Fw'", "F U R U' R' U R U' R' F'"],
      52: ["R' U' R U' R' U y' R' U R B"],
      53: ["Rw' U' R U' R' U R U' R' U2 Rw"],
      54: ["Rw U R' U R U' R' U R U'2 Rw'"],
      55: ["y R' F R U R U' R2 F' R2 U' R' U R U R'", "R U'2 R2 U' R U' R' U'2 F R F'"],
      56: ["Rw' U' Rw U' R' U R U' R' U R Rw' U Rw", "F R U R' U' R F' Rw U R' U' Rw'"],
      57: ["R U R' U' M' U R U' Rw'"],
    },
  }),
  mounted() {
    const paramter = []
    for (const key in this.oll) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].view = this.view
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.oll[key][0]
      SRVisualizer.cubePNG(document.getElementById('oll' + key), paramter[key])
    }
  },
}
</script>
