<template>
  <div>
    <h2>COLL</h2>
    <h3>OLL n21 H Orientation</h3>
    <div v-for="(item, index) in COLLn21" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'COLLn21' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n22 Pi Orientation</h3>
    <div v-for="(item, index) in COLLn22" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'COLLn22' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n23 U Orientation</h3>
    <div v-for="(item, index) in COLLn23" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'COLLn23' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n24 T Orientation</h3>
    <div v-for="(item, index) in COLLn24" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'COLLn24' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>
    <h3>OLL n25 L Orientation</h3>
    <div v-for="(item, index) in COLLn25" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'COLLn25' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n26 Sune Orientation</h3>
    <div v-for="(item, index) in COLLn26" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'COLLn26' + index"></div>
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n27 Anti-Sune Orientation</h3>
    <div v-for="(item, index) in COLLn27" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <div :id="'COLLn27' + index"></div>
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
    mask: 'coll',
    view: 'plan',
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
    rotate: '',
    COLLn21: {
      'n21-1': ["(U) F R U R' U' R U R' U' R U R' U' F'"],
      'n21-2': ["(U) R U2 R' U' R U R' U' R U' R'"],
      'n21-3': ["R U R' U R U L' U R' U' L"],
      'n21-4': ["F R U' R' U R U2 R' U' R U R' U' F'"],
    },
    COLLn22: {
      'n22-1': ["R U2 R2 U' R2 U' R2 U2 R"],
      'n22-2': ["R U D' R U R' D R2 U' R' U' R2 U2 R"],
      'n22-3': ["R U' Rw' F R' F Rw U Rw' F Rw"],
      'n22-4': ["(U) F U R U' R' U R U2 R' U' R U R' F'"],
      'n22-5': ["R U R' U' R' F R2 U R' U' R U R' U' F'"],
      'n22-6': ["R' F2 R U2 R U2 R' F2 U' R U' R'"],
    },
    COLLn23: {
      'n23-1': ["R' F R U' R' U' R U R' F' R U R' U' R' F R F' R"],
      'n23-2': ["(U) R U R2 U' R' F R U R2 U' R' F'"],
      'n23-3': ["R' U' R U' R' U2 R2 U R' U R U2 R'"],
      'n23-4': ["R' U2 R F U' R' U' R U F'"],
      'n23-5': ["R2 D' R U2 R' D R U2 R"],
      'n23-6': ["x' R U' R' D R U2 R' D' R U' R' x"],
    },
    COLLn24: {
      'n24-1': ["R U2 R' U' R U' R'2 U2 R U R' U R"],
      'n24-2': ["R' U R2 D Rw' U2 Rw D' R2 U' R"],
      'n24-3': ["R' U2 R U' R' F R U R' U' R' F' R U' R"],
      'n24-4': ["R' U R U2 L' R' U R U' L"],
      'n24-5': ["(U') Rw U R' U' Rw' F R F'"],
      'n24-6': ["(U2) x' R U R' D R U' R' D' x"],
    },
    COLLn25: {
      'n25-1': ["F R' F' Rw U R U' Rw'"],
      'n25-2': ["(U) F' Rw U R' U' Rw' F R"],
      'n25-3': ["(U') R' U2 R' D' R U2 R' D R2"],
      'n25-4': ["R U2 R D R' U2 R D' R2"],
      'n25-5': ["Rw U2 R'2 F R F' R U2 Rw'"],
      'n25-6': ["(U) R' U' R U' R' U R U' R' U R U' R' U2 R"],
    },
    COLLn26: {
      'n26-1': ["R U R' U R U2' R'"],
      'n26-2': ["F' R U2' R' U2 R' F2 R U R U' R' F'"],
      'n26-3': ["R U' L' U R' U' L"],
      'n26-4': ["L' R U R' U' L U2 R U2' R'"],
      'n26-5': ["L' U2 L U2' R U' L' U L R'"],
      'n26-6': ["(U') R U R' U R U' R D R' U' R D' R2'"],
    },
    COLLn27: {
      'n27-1': ["R' U' R U' R' U2 R"],
      'n27-2': ["R U' R' U2 R U' R' U2 R' D' R U R' D R"],
      'n27-3': ["R' U L U' R U L'"],
      'n27-4': ["L R' U' R U L' U2 R' U2 R"],
      'n27-5': ["R' U' R U R' F R U R' U' R' F' R2"],
      'n27-6': ["(U) R' U' R U' R' U R' D' R U R' D R2"],
    },
  }),
  mounted() {
    const paramter = []
    for (const key in this.COLLn21) {
      paramter[key] = {}
      paramter[key].view = this.view
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.COLLn21[key][0]
      SRVisualizer.cubePNG(document.getElementById('COLLn21' + key), paramter[key])
    }

    for (const key in this.COLLn22) {
      paramter[key] = {}
      paramter[key].view = this.view
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.COLLn22[key][0]
      SRVisualizer.cubePNG(document.getElementById('COLLn22' + key), paramter[key])
    }

    for (const key in this.COLLn23) {
      paramter[key] = {}
      paramter[key].view = this.view
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.COLLn23[key][0]
      SRVisualizer.cubePNG(document.getElementById('COLLn23' + key), paramter[key])
    }

    for (const key in this.COLLn24) {
      paramter[key] = {}
      paramter[key].view = this.view
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.COLLn24[key][0]
      SRVisualizer.cubePNG(document.getElementById('COLLn24' + key), paramter[key])
    }

    for (const key in this.COLLn25) {
      paramter[key] = {}
      paramter[key].view = this.view
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.COLLn25[key][0]
      SRVisualizer.cubePNG(document.getElementById('COLLn25' + key), paramter[key])
    }

    for (const key in this.COLLn26) {
      paramter[key] = {}
      paramter[key].view = this.view
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.COLLn26[key][0]
      SRVisualizer.cubePNG(document.getElementById('COLLn26' + key), paramter[key])
    }

    for (const key in this.COLLn27) {
      paramter[key] = {}
      paramter[key].view = this.view
      paramter[key].mask = this.mask
      paramter[key].viewportRotations = this.viewportRotations
      paramter[key].width = this.width
      paramter[key].height = this.height
      paramter[key].case = this.COLLn27[key][0]
      SRVisualizer.cubePNG(document.getElementById('COLLn27' + key), paramter[key])
    }
  },
}
</script>
