<template>
  <div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL01,02</div>
      <div class="column is-3">U-Perm</div>
      <div class="column is-3">PLL03,04</div>
      <div class="column is-3">A-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><div id="PLL1"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/01_U-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><div id="PLL2"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/02_A-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL05</div>
      <div class="column is-3">Z-Perm</div>
      <div class="column is-3">PLL06</div>
      <div class="column is-3">H-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><div id="PLL3"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/03_Z-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><div id="PLL4"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/04_H-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL07</div>
      <div class="column is-3">E-Perm</div>
      <div class="column is-3">PLL08</div>
      <div class="column is-3">T-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><div id="PLL5"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/05_E-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><div id="PLL6"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/06_T-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL09</div>
      <div class="column is-3">V-Perm</div>
      <div class="column is-3">PLL10</div>
      <div class="column is-3">F-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><div id="PLL7"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/07_V-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><div id="PLL8"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/08_F-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL11,12</div>
      <div class="column is-3">R-Perm</div>
      <div class="column is-3">PLL13,14</div>
      <div class="column is-3">J-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><div id="PLL9"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/09_R-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><div id="PLL10"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/10_J-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL15</div>
      <div class="column is-3">Y-Perm</div>
      <div class="column is-3">PLL16</div>
      <div class="column is-3">G-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><div id="PLL11"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/11_Y-Perm.gif" :width="width" :height="height" /></div>
      <div class="column is-3"><div id="PLL12"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/12_G-Perm.gif" :width="width" :height="height" /></div>
    </div>

    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3">PLL20,21</div>
      <div class="column is-3">N-Perm</div>
    </div>
    <div class="columns is-mobile has-text-centered is-marginless">
      <div class="column is-3"><div id="PLL13"></div></div>
      <div class="column is-3"><img src="~/assets/images/pll/13_N-Perm.gif" :width="width" :height="height" /></div>
    </div>
  </div>
</template>

<script>
import * as SRVisualizer from 'sr-visualizer'

export default {
  data: () => ({
    mask: 'oll',
    view: 'plan',
    width: 70,
    height: 70,
    colorScheme: { 0: '#ffffff', 1: '#ee0000', 2: '#00d800', 3: '#fefe00', 4: '#ffa100', 5: '#0000f2' },
    pllArrow: {
      1: 'U3U5-s7-red,U5U7-s7-red,U7U3-s7-red',
      2: 'U2U6-s8-red,U6U8-s8-red,U8U2-s8-red',
      3: 'U1U3-red,U3U1-red,U5U7-red,U7U5-red',
      4: 'U1U7-red,U7U1-red,U3U5-red,U5U3-red',
      5: 'U0U6-red,U6U0-red,U2U8-red,U8U2-red',
      6: 'U2U8-red,U8U2-red,U3U5-s8-red,U5U3-s8-red',
      7: 'U0U8-red,U8U0-red,U1U5-red,U5U1-red',
      8: 'U1U7-red,U7U1-red,U2U8-red,U8U2-red',
      9: 'U0U2-red,U2U0-red,U5U7-red,U7U5-red',
      10: 'U2U8-red,U8U2-red,U5U7-s8-red,U7U5-s8-red',
      11: 'U0U8-red,U8U0-red,U1U3-red,U3U1-red',
      12: 'U0U2-s8-red,U2U6-s8-red,U6U0-s8-red,U1U3-s6-blue,U3U7-s6-blue,U7U1-s6-blue',
      13: 'U2U6-red,U6U2-red,U3U5-red,U5U3-red',
    },
  }),
  mounted() {
    const parameter = {}
    parameter.mask = this.mask
    parameter.view = this.view
    parameter.width = this.width
    parameter.height = this.height
    parameter.colorScheme = this.colorScheme
    for (const key in this.pllArrow) {
      parameter.arrows = this.pllArrow[key]
      SRVisualizer.cubePNG(document.getElementById('PLL' + key), parameter)
    }
  },
  methods: {
    makeCase: function (alg) {
      return alg.substr(alg.indexOf('：') + 1)
    },
  },
}
</script>
