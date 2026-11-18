<script setup lang="ts">
// 移植元: legacy/pages/oll/oll.vue
import { oll, diagrams } from '~/data/cube/oll'
</script>

<template>
  <div>
    <h2>OLL手順</h2>
    <div v-for="(item, index) in oll" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-1 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'oll' + index" :diagram="diagrams['oll' + index]" />
      </div>
      <div class="column is-10-tablet is-9-mobile">
        <div>{{ item[0] }}</div>
        <div>{{ item[1] }}</div>
      </div>
    </div>
  </div>
</template>
