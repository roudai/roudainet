<template>
  <div class="content m-2">
    <h2>発展系F2L</h2>
    <h3>両手手順</h3>
    <div v-for="(item, index) in advancedF2lth" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'advancedF2lth' + index"></div>
      </div>
      <div class="column is-10-tablet is-9-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>片手手順</h3>
    <div v-for="(item, index) in advancedF2loh" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'advancedF2loh' + index"></div>
      </div>
      <div class="column is-10-tablet is-9-mobile">
        <div>{{ item[0] }}</div>
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
    advancedF2lth: {
      1: ["Fw R Fw'"],
      2: ["Fw R' Fw'"],
      3: ["U R' F R F' R' U' R"],
      4: ["U R2 U' R' U R U' R"],
      5: ["U2 L2 U2 L U L' U L2"],
    },
    advancedF2loh: {
      7: ["R U' R U2 R2 U' R2 U' R2"],
    },
  }),
  mounted() {
    const paramter = []
    for (const key in this.advancedF2lth) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.advancedF2lth[key][0]
      SRVisualizer.cubePNG(document.getElementById('advancedF2lth' + key), paramter[key])
    }

    for (const key in this.advancedF2loh) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.advancedF2loh[key][0]
      SRVisualizer.cubePNG(document.getElementById('advancedF2loh' + key), paramter[key])
    }
  },
}
</script>
