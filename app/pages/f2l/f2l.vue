<script setup lang="ts">
// 移植元: legacy/pages/f2l/f2l.vue
import { f2l, diagrams } from '~/data/cube/f2l'
</script>

<template>
  <div>
    <h2>F2L手順</h2>
    <div v-for="(item, index) in f2l" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'f2l' + index" :diagram="diagrams['f2l' + index]" />
      </div>
      <div class="column is-10-tablet is-9-mobile">
        <div>{{ item[0] }}</div>
        <div>{{ item[1] }}</div>
      </div>
    </div>
  </div>
</template>
