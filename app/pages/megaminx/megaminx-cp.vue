<script setup lang="ts">
// 移植元: legacy/pages/megaminx/megaminx-cp.vue
import { megacase, megacase_view, diagrams } from '~/data/megaminx/cp'
</script>

<template>
  <div>
    <h2>Megaminx CP</h2>
    <h3>3点交換</h3>
    <h4>離れた3点交換 時計回り</h4>
    <MegaminxView image="megacase1" :algorithm="megacase[1]" :diagram="diagrams['megacase1']" />
    <h4>離れた3点交換 反時計回り</h4>
    <MegaminxView image="megacase2" :algorithm="megacase[2]" :diagram="diagrams['megacase2']" />
    <h4>隣り合った3点交換 時計回り</h4>
    <MegaminxView image="megacase3" :algorithm="megacase[3]" :diagram="diagrams['megacase3']" />
    <h4>隣り合った3点交換 反時計回り</h4>
    <MegaminxView image="megacase4" :algorithm="megacase[4]" :diagram="diagrams['megacase4']" />

    <h3>2点-2点交換</h3>
    <h4>並行交換(1)</h4>
    <MegaminxView image="megacase5" :algorithm="megacase_view[5]" :diagram="diagrams['megacase5']" />
    <h4>並行交換(2)</h4>
    <MegaminxView image="megacase6" :algorithm="megacase[6]" :diagram="diagrams['megacase6']" />
    <h4>交差交換</h4>
    <MegaminxView image="megacase7" :algorithm="megacase[7]" :diagram="diagrams['megacase7']" />

    <h3>5点交換</h3>
    <h4>側面コーナー同色が2つ</h4>
    <MegaminxView image="megacase8" :algorithm="megacase[8]" :diagram="diagrams['megacase8']" />
    <MegaminxView image="megacase9" :algorithm="megacase[9]" :diagram="diagrams['megacase9']" />
    <h4>コーナー2セットが並行移動</h4>
    <MegaminxView image="megacase10" :algorithm="megacase[10]" :diagram="diagrams['megacase10']" />
    <MegaminxView image="megacase11" :algorithm="megacase[11]" :diagram="diagrams['megacase11']" />
    <h4>隣のコーナーに一周移動</h4>
    <h5>時計回り</h5>
    <MegaminxView image="megacase12" :algorithm="megacase[12]" :diagram="diagrams['megacase12']" />
    <h5>反時計回り</h5>
    <MegaminxView image="megacase13" :algorithm="megacase[13]" :diagram="diagrams['megacase13']" />
    <h4>2つ隣のコーナーに一周移動</h4>
    <h5>時計回り</h5>
    <MegaminxView image="megacase14" :algorithm="megacase_view[14]" :diagram="diagrams['megacase14']" />
    <h5>反時計回り</h5>
    <MegaminxView image="megacase15" :algorithm="megacase_view[15]" :diagram="diagrams['megacase15']" />
  </div>
</template>
