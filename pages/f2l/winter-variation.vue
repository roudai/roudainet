<template>
  <div>
    <h2>Winter Variation</h2>
    <h3>コーナー反転なし</h3>
    <div v-for="(item, index) in winterVariation0" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'winterVariation0' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>コーナー反転1つ</h3>
    <div v-for="(item, index) in winterVariation1" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'winterVariation1' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>コーナー反転2つ</h3>
    <div v-for="(item, index) in winterVariation2" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'winterVariation2' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>コーナー反転3つ</h3>
    <div v-for="(item, index) in winterVariation3" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'winterVariation3' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as SRVisualizer from 'sr-visualizer'

export default {
  data: () => ({
    mask: 'wv',
    view: 'plan',
    width: 80,
    height: 80,
    winterVariation0: {
      WV1: ["U' L' U2 R U' R' U2 L"],
    },
    winterVariation1: {
      WV2: ["U R U' R'"],
      WV3: ["R' F R U R U' R' F'"],
      WV4: ["U R2 D R' U' R D' R2"],
      WV5: ["U R U' R' U R' U' R U' R' U2 R"],
      WV6: ["R U' R' U2 R U' R' U2 R U R'"],
      WV7: ["U R U R' U' R U' R'"],
    },
    winterVariation2: {
      WV8: ["U2 R U' R' U R U2 R'"],
      WV9: ["U2 F' R U2 R' U2 R' F R"],
      WV10: ["R' F R2 U R' U' R U R' U' F'"],
      WV11: ["U2 R' U' R2 U' R2 U2 R"],
      WV12: ["R' F2 R F2 U L' U L"],
      WV13: ["U2 R U2 R2 U' R U' R' U2 R"],
      WV14: ["U2 R2 D R' U2 R D' R2"],
      WV15: ["L' U R U' R' L"],
      WV16: ["U2 L' R U R' U' L R U2 R'"],
      WV17: ["U2 R U2 R'"],
      WV18: ["R' F' R U2 R U2 R' F"],
      WV19: ["R' F2 R2 U' R' U' R U R' F2"],
    },
    winterVariation3: {
      WV20: ["U R U' R' U' R U R' U R U2 R'"],
      WV21: ["U R U' R2 U2 R U R' U R"],
      WV22: ["U R2 D R' U R D' R' U2 R'"],
      WV23: ["R2 U R' U R' U' R U R U2 R2"],
      WV24: ["U2 R U' R' U R U' R' U R U2 R'"],
      WV25: ["U2 R U2 R2 U2 R U R' U R"],
      WV26: ["U R U' R2 U' R U' R' U2 R"],
      WV27: ["U R U R' U' R U R' U' R U' R'"],
    },
  }),
  mounted() {
    if (window.innerWidth >= 768) this.width = 80
    this.height = 80
    const paramter = []

    for (const key in this.winterVariation0) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].view = this.view
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.winterVariation0[key][0]
      SRVisualizer.cubePNG(document.getElementById('winterVariation0' + key), paramter[key])
    }

    for (const key in this.winterVariation1) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].view = this.view
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.winterVariation1[key][0]
      SRVisualizer.cubePNG(document.getElementById('winterVariation1' + key), paramter[key])
    }

    for (const key in this.winterVariation2) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].view = this.view
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.winterVariation2[key][0]
      SRVisualizer.cubePNG(document.getElementById('winterVariation2' + key), paramter[key])
    }

    for (const key in this.winterVariation3) {
      paramter[key] = {}
      paramter[key].mask = this.mask
      paramter[key].view = this.view
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.winterVariation3[key][0]
      SRVisualizer.cubePNG(document.getElementById('winterVariation3' + key), paramter[key])
    }
  },
}
</script>
