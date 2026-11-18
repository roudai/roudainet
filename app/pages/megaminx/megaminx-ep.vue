<script setup lang="ts">
// 移植元: legacy/pages/megaminx/megaminx-ep.vue
import { megacase, megacase_view, diagrams } from '~/data/megaminx/ep'
</script>

<template>
  <div>
    <h2>Megaminx EP</h2>
    <h3>隣り合った3点交換</h3>
    <h4>時計回り（コーナー干渉あり）</h4>
    <MegaminxView image="megacase1" :algorithm="megacase[1]" :diagram="diagrams['megacase1']" />
    <h4>反時計回り（コーナー干渉あり）</h4>
    <MegaminxView image="megacase2" :algorithm="megacase[2]" :diagram="diagrams['megacase2']" />
    <h4>時計回り（コーナー干渉なし）</h4>
    <MegaminxView image="megacase3" :algorithm="megacase[3]" :diagram="diagrams['megacase3']" />
    <h4>反時計回り（コーナー干渉なし）</h4>
    <MegaminxView image="megacase4" :algorithm="megacase[4]" :diagram="diagrams['megacase4']" />

    <h3>離れた3点交換</h3>
    <h4>時計回り（コーナー干渉あり）</h4>
    <MegaminxView image="megacase5" :algorithm="megacase[5]" :diagram="diagrams['megacase5']" />
    <h4>反時計回り（コーナー干渉あり）</h4>
    <MegaminxView image="megacase6" :algorithm="megacase[5]" :diagram="diagrams['megacase6']" />
    <h4>時計回り（コーナー干渉なし）</h4>
    <MegaminxView image="megacase7" :algorithm="megacase[7]" :diagram="diagrams['megacase7']" />
    <h4>反時計回り（コーナー干渉なし）</h4>
    <MegaminxView image="megacase8" :algorithm="megacase[8]" :diagram="diagrams['megacase8']" />

    <h3>4点交換</h3>
    <h4>コーナー干渉あり</h4>
    <MegaminxView image="megacase9" :algorithm="megacase[9]" :diagram="diagrams['megacase9']" />
    <h4>コーナー干渉なし</h4>
    <MegaminxView image="megacase10" :algorithm="megacase[10]" :diagram="diagrams['megacase10']" />
    <MegaminxView image="megacase11" :algorithm="megacase[11]" :diagram="diagrams['megacase11']" />
    <MegaminxView image="megacase12" :algorithm="megacase_view[12]" :diagram="diagrams['megacase12']" />
  </div>
</template>
