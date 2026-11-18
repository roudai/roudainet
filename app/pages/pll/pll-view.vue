<script setup lang="ts">
// 移植元: legacy/pages/pll/pll-view.vue
import { width, height, diagrams } from '~/data/cube/pll-view'
</script>

<template>
  <div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL01,02</div>
      <div class="column is-3">U-Perm</div>
      <div class="column is-3">PLL03,04</div>
      <div class="column is-3">A-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><CubeImage id="PLL1" :diagram="diagrams['PLL1']" /></div>
      <div class="column is-3"><img src="/images/pll/01_U-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><CubeImage id="PLL2" :diagram="diagrams['PLL2']" /></div>
      <div class="column is-3"><img src="/images/pll/02_A-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL05</div>
      <div class="column is-3">Z-Perm</div>
      <div class="column is-3">PLL06</div>
      <div class="column is-3">H-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><CubeImage id="PLL3" :diagram="diagrams['PLL3']" /></div>
      <div class="column is-3"><img src="/images/pll/03_Z-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><CubeImage id="PLL4" :diagram="diagrams['PLL4']" /></div>
      <div class="column is-3"><img src="/images/pll/04_H-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL07</div>
      <div class="column is-3">E-Perm</div>
      <div class="column is-3">PLL08</div>
      <div class="column is-3">T-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><CubeImage id="PLL5" :diagram="diagrams['PLL5']" /></div>
      <div class="column is-3"><img src="/images/pll/05_E-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><CubeImage id="PLL6" :diagram="diagrams['PLL6']" /></div>
      <div class="column is-3"><img src="/images/pll/06_T-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL09</div>
      <div class="column is-3">V-Perm</div>
      <div class="column is-3">PLL10</div>
      <div class="column is-3">F-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><CubeImage id="PLL7" :diagram="diagrams['PLL7']" /></div>
      <div class="column is-3"><img src="/images/pll/07_V-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><CubeImage id="PLL8" :diagram="diagrams['PLL8']" /></div>
      <div class="column is-3"><img src="/images/pll/08_F-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL11,12</div>
      <div class="column is-3">R-Perm</div>
      <div class="column is-3">PLL13,14</div>
      <div class="column is-3">J-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><CubeImage id="PLL9" :diagram="diagrams['PLL9']" /></div>
      <div class="column is-3"><img src="/images/pll/09_R-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><CubeImage id="PLL10" :diagram="diagrams['PLL10']" /></div>
      <div class="column is-3"><img src="/images/pll/10_J-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL15</div>
      <div class="column is-3">Y-Perm</div>
      <div class="column is-3">PLL16</div>
      <div class="column is-3">G-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><CubeImage id="PLL11" :diagram="diagrams['PLL11']" /></div>
      <div class="column is-3"><img src="/images/pll/11_Y-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><CubeImage id="PLL12" :diagram="diagrams['PLL12']" /></div>
      <div class="column is-3"><img src="/images/pll/12_G-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL20,21</div>
      <div class="column is-3">N-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><CubeImage id="PLL13" :diagram="diagrams['PLL13']" /></div>
      <div class="column is-3"><img src="/images/pll/13_N-Perm.gif" :width="width" :height="height" /></div>
    </div>
  </div>
</template>
