<script setup lang="ts">
// 移植元: legacy/pages/f2l/f2l-advanced.vue
import { advancedF2lth, advancedF2loh, diagrams } from '~/data/cube/f2l-advanced'
</script>

<template>
  <div>
    <h2>発展形F2L</h2>
    <h3>両手手順</h3>
    <div v-for="(item, index) in advancedF2lth" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'advancedF2lth' + index" :diagram="diagrams['advancedF2lth' + index]" />
      </div>
      <div class="column is-10-tablet is-9-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>片手手順</h3>
    <div v-for="(item, index) in advancedF2loh" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'advancedF2loh' + index" :diagram="diagrams['advancedF2loh' + index]" />
      </div>
      <div class="column is-10-tablet is-9-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>
  </div>
</template>
