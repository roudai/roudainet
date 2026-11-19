<script setup lang="ts">
// 移植元: legacy/pages/megaminx/megaminx-eo.vue
import { megacase, diagrams } from '~/data/megaminx/eo'
</script>

<template>
  <div>
    <h2>Megaminx EO</h2>
    <h3>2つ反転</h3>
    <h4>隣り合った2つ反転</h4>
    <MegaminxView image="megacase1" :algorithm="megacase[1]" :diagram="diagrams['megacase1']" />
    <h4>離れた2つ反転</h4>
    <MegaminxView image="megacase2" :algorithm="megacase[2]" :diagram="diagrams['megacase2']" />
    <h2>4つ反転</h2>
    <MegaminxView image="megacase3" :algorithm="megacase[3]" :diagram="diagrams['megacase3']" />
  </div>
</template>
