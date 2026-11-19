<script setup lang="ts">
// 移植元: legacy/pages/megaminx/megaminx-co.vue
import { megacase, diagrams } from '~/data/megaminx/co'
</script>

<template>
  <div>
    <h2>Megaminx CO</h2>
    <h3>2つ反転</h3>
    <MegaminxView image="megacase1" :algorithm="megacase[1]" :diagram="diagrams['megacase1']" />
    <MegaminxView image="megacase2" :algorithm="megacase[2]" :diagram="diagrams['megacase2']" />
    <MegaminxView image="megacase3" :algorithm="megacase[3]" :diagram="diagrams['megacase3']" />
    <MegaminxView image="megacase4" :algorithm="megacase[4]" :diagram="diagrams['megacase4']" />

    <h3>3つ反転</h3>
    <MegaminxView image="megacase5" :algorithm="megacase[5]" :diagram="diagrams['megacase5']" />
    <MegaminxView image="megacase6" :algorithm="megacase[6]" :diagram="diagrams['megacase6']" />
    <MegaminxView image="megacase7" :algorithm="megacase[7]" :diagram="diagrams['megacase7']" />
    <MegaminxView image="megacase8" :algorithm="megacase[8]" :diagram="diagrams['megacase8']" />

    <h3>4つ反転</h3>
    <MegaminxView image="megacase9" :algorithm="megacase[9]" :diagram="diagrams['megacase9']" />
    <MegaminxView image="megacase10" :algorithm="megacase[10]" :diagram="diagrams['megacase10']" />
    <MegaminxView image="megacase11" :algorithm="megacase[11]" :diagram="diagrams['megacase11']" />
    <MegaminxView image="megacase12" :algorithm="megacase[12]" :diagram="diagrams['megacase12']" />
    <MegaminxView image="megacase13" :algorithm="megacase[13]" :diagram="diagrams['megacase13']" />
    <MegaminxView image="megacase14" :algorithm="megacase[14]" :diagram="diagrams['megacase14']" />

    <h3>5つ反転</h3>
    <MegaminxView image="megacase15" :algorithm="megacase[15]" :diagram="diagrams['megacase15']" />
    <MegaminxView image="megacase16" :algorithm="megacase[16]" :diagram="diagrams['megacase16']" />
  </div>
</template>
