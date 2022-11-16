<template>
  <div class="content m-2">
    <h2>PLL手順</h2>
    <div v-for="n of 21" :key="n">
      <h3 v-text="pllName['name' + n]"></h3>
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-2-tablet is-3-mobile has-text-centered"><div :id="'pll' + n"></div></div>
        <div class="column is-10-tablet is-9-mobile p-0">
          <div v-for="item in pll[n]" :key="item">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as SRVisualizer from 'sr-visualizer'

export default {
  data: () => ({
    mask: 'pll',
    view: 'plan',
    width: 80,
    height: 80,
    pll: {
      1: [
        "両手：R2 U R U R' U' R' U' R' U R'",
        "両手：R' U R' U' R' U' R' U R U R2",
        "片手：z U' R U' R' U' R' U' R U R U'2",
        "片手：z U2 R U R U' R' U' R' U' R U'",
        "最少：F2 U M' U2 M U F2（9手）",
      ],
      2: [
        "両手、片手：R U' R U R U R U' R' U' R2",
        "両手、片手：R2 U' R' U' R U R U R U' R",
        "最少：F2 U' M' U2 M U' F2（9手）",
      ],
      3: ["両手、片手、最少：x' R U' R D2 R' U R D2 R2 x（9手）", "両手：x R2′ D2 R U R' D2 R U' R"],
      4: [
        "両手、片手、最少：x' R2 D2 R' U' R D2 R' U R' x（9手）",
        "両手：R U R' F' Rw U R' U' Rw' F R2 U' R'",
        "両手：x R' U R' D2 R U' R' D2 R2",
      ],
      5: [
        "両手：M' U M'2 U M'2 U M' U2 M'2 U'",
        "両手、片手：(U) U R' U' R U' R U R U' R' U R U R2 U' R' U",
        "最少：M2 U' x M2 U2 M2 U2 x' U M2（12手）",
      ],
      6: [
        "両手：M'2 U M'2 U2 M'2 U M2",
        '片手、多分割：R2 U2 R U2 R2 U2 R2 U2 R U2 R2',
        "最少：L R U2 L' R' F' B' U2 F B（10手）",
      ],
      7: [
        "両手、片手：x' R U' R' D R U R' D' R U R' D R U' R' D' x",
        "多分割：R2 U R' U' y R U R' U' R U R' U' R U R' F U' F2",
        "最少：R' U L' D2 L U' R L' U R' D2 R U' L（14手）",
      ],
      8: [
        "両手、片手：R U R' U' R' F R2 U' R' U' R U R' F'",
        "両手：L' U' L U Rw U' Rw'2 F Rw U L' U' Rw U",
        "両手、最少：	z U2 R' U2 R U2 x U2 R U2 Rw' U2 Rw（11手）",
      ],
      9: [
        "両手：R' U R U' R' Fw' U' R U2 R' U' R U' R' Fw R",
        "両手、最少：R' U R' U' y R' F' R2 U' R' U R' F R F（14手）",
        "両手：L' U L' U' y' R' F' R2 U' R' U R' F R F",
        "片手：y R U'2 R' U'2 L' U R U' L U' L' U R' U' L",
      ],
      10: [
        "両手：R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
        "両手：R' U2 R' U' y R' F' R2 U' R' U R' F R U' F",
        "片手：x R2 U R U' R' y R' U' R U x U'2 R U' R' U R",
        "最少：L B2 F' D2 B R' B' D2 F2 L' F' L B2 L'（14手）",
      ],
      11: ["両手、片手、最少：R' U2 R U'2 R' F R U R' U' R' F' R2 U'（14手）"],
      12: [
        "両手、片手：R U' R' U' R U R D R' U' R D' R' U'2 R' U'",
        "両手、最少：L U2 L' U2 L F' L' U' L U Rw U Rw'2 F（14手）",
        "両手：	x' R' U' F' U R' U' x U R' U' R' U R B R'2",
      ],
      13: [
        "両手：R U R' F' R U R' U' R' F R2 U' R' U'",
        "片手：R U'2 R' U' R U'2 ",
        "最少：B2 L U L' B2 R D' R D R2（10手）",
      ],
      14: [
        "両手：R' U L' U2 R U' R' U2 L R U'",
        "両手：L' U R' z R2 U R' U' R2 U D R'",
        "片手：L' U2 L U L' U2 R U' L U R'",
        "最少：B2 R' U' R B2 L' D L' D' L2（10手）",
      ],
      15: [
        "両手：F R U' R' U' R U R' F' R U R' U' R' F R F'",
        "片手：R2 U' R' U R U' x' U' R' D R' D' R' U R",
        "最少：R2 U' R2 U' R2 U F U F' R2 F U' F'（13手）",
      ],
      16: [
        "両手：D' R U R' U' D R2 U' R U' R' U R' U R2 U",
        "両手、片手、最少：R U R' y' R2 Uw' R U' R' U R' Uw R2（12手）",
      ],
      17: [
        "両手：U' R2 U' R U' R U R' U R2 D' U R U' R' D",
        "両手、片手、最少：R'2 Uw' R U' R U R' Uw R2 y R U' R'（12手）",
        "両手：R'2 F2 R U2 R U2 R' F R U R' U' R' F R2",
      ],
      18: [
        "両手：U R2 U R' U R' U' R U' R2 D U' R' U R D'",
        "両手、最少：R2 Uw R' U R' U' R U'w R'2 F' U F（12手）",
        "片手：	z U'2 Rw U' R U' R' U Rw' U'2 x' U' R U",
      ],
      19: [
        "両手：D R' U' R U D' R2 U R' U R U' R U' R2' U'",
        "両手、最少：L' U' L y' R2 Uw R' U R U' R Uw' R'2（12手）",
        "両手、片手：R' U' R y R2 Uw R' U R U' R Uw' R'2",
      ],
      20: [
        "両手：R' U R U' R' F' U' F R U R' F R' F' R U' R",
        "片手、最少：R' U L' U2 R U' R' L U L' U2 R U' L（14手）",
      ],
      21: [
        "両手：R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'",
        "両手：R U' R' U Lw U F U' R' F' R U' R U Lw' U R'",
        "片手、最少：L U' R U'2 L' U L R' U' R U2 L U R'（14手）",
      ],
    },
    pllArrow: {
      arrow1: 'U3U5-s7-red,U5U7-s7-red,U7U3-s7-red',
      arrow2: 'U5U3-s7-red,U7U5-s7-red,U3U7-s7-red',
      arrow3: 'U2U6-s8-red,U6U8-s8-red,U8U2-s8-red',
      arrow4: 'U6U2-s8-red,U8U6-s8-red,U2U8-s8-red',
      arrow5: 'U1U5-red,U5U1-red,U3U7-red,U7U3-red',
      arrow6: 'U1U7-red,U7U1-red,U3U5-red,U5U3-red',
      arrow7: 'U0U6-red,U6U0-red,U2U8-red,U8U2-red',
      arrow8: 'U2U8-red,U8U2-red,U3U5-s8-red,U5U3-s8-red',
      arrow9: 'U0U8-red,U8U0-red,U1U5-red,U5U1-red',
      arrow10: 'U1U7-red,U7U1-red,U2U8-red,U8U2-red',
      arrow11: 'U0U2-red,U2U0-red,U5U7-red,U7U5-red',
      arrow12: 'U2U8-red,U8U2-red,U1U3-red,U3U1-red',
      arrow13: 'U2U8-red,U8U2-red,U5U7-s8-red,U7U5-s8-red',
      arrow14: 'U0U2-red,U2U0-red,U1U3-s8-red,U3U1-s8-red',
      arrow15: 'U0U8-red,U8U0-red,U1U3-red,U3U1-red',
      arrow16: 'U0U2-s8-red,U2U6-s8-red,U6U0-s8-red,U1U3-s6-blue,U3U7-s6-blue,U7U1-s6-blue',
      arrow17: 'U2U0-s8-red,U6U2-s8-red,U0U6-s8-red,U3U1-s6-blue,U7U3-s6-blue,U1U7-s6-blue',
      arrow18: 'U0U8-s8-red,U8U6-s8-red,U6U0-s8-red,U1U3-s6-blue,U3U7-s6-blue,U7U1-s6-blue',
      arrow19: 'U8U0-s8-red,U6U8-s8-red,U0U6-s8-red,U3U1-s6-blue,U7U3-s6-blue,U1U7-s6-blue',
      arrow20: 'U0U8-red,U8U0-red,U3U5-red,U5U3-red',
      arrow21: 'U2U6-red,U6U2-red,U3U5-red,U5U3-red',
    },
    pllName: {
      name1: 'U.a Permutation',
      name2: 'U.b Permutation',
      name3: 'A.a Permutation',
      name4: 'A.b Permutation',
      name5: 'Z Permutation',
      name6: 'H Permutation',
      name7: 'E Permutation',
      name8: 'T Permutation',
      name9: 'V Permutation',
      name10: 'F Permutation',
      name11: 'R.a Permutation',
      name12: 'R.b Permutation',
      name13: 'J.b Permutation',
      name14: 'J.a Permutation',
      name15: 'Y Permutation',
      name16: 'G.a Permutation',
      name17: 'G.b Permutation',
      name18: 'G.d Permutation',
      name19: 'G.c Permutation',
      name20: 'N.b Permutation',
      name21: 'N.a Permutation',
    },
  }),
  mounted() {
    const parameter = {}
    parameter.view = this.view
    parameter.width = this.width
    parameter.height = this.height
    for (const key in this.pll) {
      parameter.case = this.makeCase(this.pll[key][0])
      parameter.arrows = this.pllArrow['arrow' + key]
      SRVisualizer.cubePNG(document.getElementById('pll' + key), parameter)
    }
  },
  methods: {
    makeCase: function (alg) {
      return alg.substr(alg.indexOf('：') + 1)
    },
  },
}
</script>
