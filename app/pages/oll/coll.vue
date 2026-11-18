<script setup lang="ts">
// 移植元: legacy/pages/oll/coll.vue
import { COLLn21, COLLn22, COLLn23, COLLn24, COLLn25, COLLn26, COLLn27, diagrams } from '~/data/cube/coll'
</script>

<template>
  <div>
    <h2>COLL</h2>
    <h3>OLL n21 H Orientation</h3>
    <div v-for="(item, index) in COLLn21" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'COLLn21' + index" :diagram="diagrams['COLLn21' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n22 Pi Orientation</h3>
    <div v-for="(item, index) in COLLn22" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'COLLn22' + index" :diagram="diagrams['COLLn22' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n23 U Orientation</h3>
    <div v-for="(item, index) in COLLn23" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'COLLn23' + index" :diagram="diagrams['COLLn23' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n24 T Orientation</h3>
    <div v-for="(item, index) in COLLn24" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'COLLn24' + index" :diagram="diagrams['COLLn24' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>
    <h3>OLL n25 L Orientation</h3>
    <div v-for="(item, index) in COLLn25" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'COLLn25' + index" :diagram="diagrams['COLLn25' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n26 Sune Orientation</h3>
    <div v-for="(item, index) in COLLn26" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'COLLn26' + index" :diagram="diagrams['COLLn26' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>

    <h3>OLL n27 Anti-Sune Orientation</h3>
    <div v-for="(item, index) in COLLn27" :key="index" class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-2 has-text-centered">{{ index }}</div>
      <div class="column is-1-tablet is-2-mobile p-0">
        <CubeImage :id="'COLLn27' + index" :diagram="diagrams['COLLn27' + index]" />
      </div>
      <div class="column is-9-tablet is-8-mobile">
        <div>{{ item[0] }}</div>
      </div>
    </div>
  </div>
</template>
