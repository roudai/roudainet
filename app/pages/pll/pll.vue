<script setup lang="ts">
// 移植元: legacy/pages/pll/pll.vue
import { pll, pllName, diagrams } from '~/data/cube/pll'
</script>

<template>
  <div>
    <h2>PLL手順</h2>
    <div v-for="n of 21" :key="n">
      <h3 v-text="pllName['name' + n]"></h3>
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-2-tablet is-3-mobile has-text-centered">
          <CubeImage :id="'pll' + n" :diagram="diagrams['pll' + n]" />
        </div>
        <div class="column is-10-tablet is-9-mobile p-0">
          <div v-for="item in pll[n]" :key="item">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
