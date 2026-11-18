<script setup lang="ts">
// 移植元: legacy/pages/f2l/winter-variation.vue
import {
  winterVariation0,
  winterVariation1,
  winterVariation2,
  winterVariation3,
  diagrams,
} from '~/data/cube/winter-variation'
</script>

<template>
  <div>
    <h2>Winter Variation</h2>
    <h3>コーナー反転なし</h3>
    <div v-for="(item, index) in winterVariation0" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'winterVariation0' + index" :diagram="diagrams['winterVariation0' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>コーナー反転1つ</h3>
    <div v-for="(item, index) in winterVariation1" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'winterVariation1' + index" :diagram="diagrams['winterVariation1' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>コーナー反転2つ</h3>
    <div v-for="(item, index) in winterVariation2" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'winterVariation2' + index" :diagram="diagrams['winterVariation2' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>コーナー反転3つ</h3>
    <div v-for="(item, index) in winterVariation3" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'winterVariation3' + index" :diagram="diagrams['winterVariation3' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>
  </div>
</template>
