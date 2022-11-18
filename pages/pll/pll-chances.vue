<template>
  <div>
    <h2>PLLの確率</h2>
    <p>PLLの各Permの出現率は、次のようになります。</p>
    <table class="table is-striped is-narrow">
      <thead>
        <tr>
          <th>Perm名</th>
          <th>ケース数</th>
          <th>確率</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>G-Perm</td>
          <td>16</td>
          <td>16/72 ≒ 22.2%</td>
        </tr>
        <tr>
          <td>U-Perm</td>
          <td>8</td>
          <td>8/72 ≒ 11.1%</td>
        </tr>
        <tr>
          <td>A-Perm</td>
          <td>8</td>
          <td>8/72 ≒ 11.1%</td>
        </tr>
        <tr>
          <td>R-Perm</td>
          <td>8</td>
          <td>8/72 ≒ 11.1%</td>
        </tr>
        <tr>
          <td>J-Perm</td>
          <td>8</td>
          <td>8/72 ≒ 11.1%</td>
        </tr>
        <tr>
          <td>V-Perm</td>
          <td>4</td>
          <td>4/72 ≒ 5.6%</td>
        </tr>
        <tr>
          <td>F-Perm</td>
          <td>4</td>
          <td>4/72 ≒ 5.6%</td>
        </tr>
        <tr>
          <td>Y-Perm</td>
          <td>4</td>
          <td>4/72 ≒ 5.6%</td>
        </tr>
        <tr>
          <td>T-Perm</td>
          <td>4</td>
          <td>4/72 ≒ 5.6%</td>
        </tr>
        <tr>
          <td>Z-Perm</td>
          <td>2</td>
          <td>2/72 ≒ 2.8%</td>
        </tr>
        <tr>
          <td>E-Perm</td>
          <td>2</td>
          <td>2/72 ≒ 2.8%</td>
        </tr>
        <tr>
          <td>N-Perm</td>
          <td>2</td>
          <td>2/72 ≒ 2.8%</td>
        </tr>
        <tr>
          <td>H-Perm</td>
          <td>1</td>
          <td>1/72 ≒ 1.4%</td>
        </tr>
        <tr>
          <td>Skip</td>
          <td>1</td>
          <td>1/72 ≒ 1.4%</td>
        </tr>
      </tbody>
    </table>
    <p>以下が、その考察です。</p>

    <h3>1. エッジ3点交換、コーナー3点交換</h3>
    <p>U-Perm、A-Perm</p>
    <p>
      対称性が無い（90度ずつ回して行っても、すべて違うパターンになる）ため、それぞれ4方向の4ケースがあります。また、時計周り、反時計周りがあるので、更に倍になります。
    </p>
    <h4>U-Perm 8ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="UPermarrow1" class="column is-3"></div>
      <div id="UPermarrow2" class="column is-3"></div>
      <div id="UPermarrow3" class="column is-3"></div>
      <div id="UPermarrow4" class="column is-3"></div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="UPermarrow5" class="column is-3"></div>
      <div id="UPermarrow6" class="column is-3"></div>
      <div id="UPermarrow7" class="column is-3"></div>
      <div id="UPermarrow8" class="column is-3"></div>
    </div>

    <h4>A-Perm 8ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="APermarrow1" class="column is-3"></div>
      <div id="APermarrow2" class="column is-3"></div>
      <div id="APermarrow3" class="column is-3"></div>
      <div id="APermarrow4" class="column is-3"></div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="APermarrow5" class="column is-3"></div>
      <div id="APermarrow6" class="column is-3"></div>
      <div id="APermarrow7" class="column is-3"></div>
      <div id="APermarrow8" class="column is-3"></div>
    </div>

    <h3>2. エッジ2点交換+コーナー2点交換 ミラーなし</h3>
    <p>V-Perm、F-Perm、Y-Perm、T-Perm</p>
    <p>それぞれ4方向4ケースがあります。</p>

    <h4>V-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="VPermarrow1" class="column is-3"></div>
      <div id="VPermarrow2" class="column is-3"></div>
      <div id="VPermarrow3" class="column is-3"></div>
      <div id="VPermarrow4" class="column is-3"></div>
    </div>

    <h4>F-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="FPermarrow1" class="column is-3"></div>
      <div id="FPermarrow2" class="column is-3"></div>
      <div id="FPermarrow3" class="column is-3"></div>
      <div id="FPermarrow4" class="column is-3"></div>
    </div>

    <h4>Y-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="YPermarrow1" class="column is-3"></div>
      <div id="YPermarrow2" class="column is-3"></div>
      <div id="YPermarrow3" class="column is-3"></div>
      <div id="YPermarrow4" class="column is-3"></div>
    </div>

    <h4>T-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="TPermarrow1" class="column is-3"></div>
      <div id="TPermarrow2" class="column is-3"></div>
      <div id="TPermarrow3" class="column is-3"></div>
      <div id="TPermarrow4" class="column is-3"></div>
    </div>

    <h3>3. エッジ2点交換+コーナー2点交換 ミラーあり</h3>
    <p>R-Perm、J-Perm</p>
    <p>それぞれ 4×2 = 8ケースとなります。</p>

    <h4>R-Perm 8ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="RPermarrow1" class="column is-3"></div>
      <div id="RPermarrow2" class="column is-3"></div>
      <div id="RPermarrow3" class="column is-3"></div>
      <div id="RPermarrow4" class="column is-3"></div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="RPermarrow5" class="column is-3"></div>
      <div id="RPermarrow6" class="column is-3"></div>
      <div id="RPermarrow7" class="column is-3"></div>
      <div id="RPermarrow8" class="column is-3"></div>
    </div>

    <h4>J-Perm 8ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="JPermarrow1" class="column is-3"></div>
      <div id="JPermarrow2" class="column is-3"></div>
      <div id="JPermarrow3" class="column is-3"></div>
      <div id="JPermarrow4" class="column is-3"></div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="JPermarrow5" class="column is-3"></div>
      <div id="JPermarrow6" class="column is-3"></div>
      <div id="JPermarrow7" class="column is-3"></div>
      <div id="JPermarrow8" class="column is-3"></div>
    </div>

    <h3>4. エッジ2点2点交換、コーナー2点2点交換</h3>
    <p>Z-Perm、E-Perm</p>
    180度回した時に同じものになる対称性(2回対称)があるため、それぞれ90度違いの2ケースがあります。

    <h4>Z-Perm 2ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="ZPermarrow1" class="column is-3"></div>
      <div id="ZPermarrow2" class="column is-3"></div>
    </div>

    <h4>E-Perm 2ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="EPermarrow1" class="column is-3"></div>
      <div id="EPermarrow2" class="column is-3"></div>
    </div>

    <h3>5. エッジ3点交換+コーナー3点交換</h3>
    <p>G-Perm</p>
    <p>
      エッジ交換とコーナー交換の組み合わせが4ケース、それぞれ対称性がないので4ケースずつの 4×4 = 16ケースがあります。
    </p>

    <h4>G-Perm 16ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="GPermarrow1" class="column is-3"></div>
      <div id="GPermarrow2" class="column is-3"></div>
      <div id="GPermarrow3" class="column is-3"></div>
      <div id="GPermarrow4" class="column is-3"></div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="GPermarrow5" class="column is-3"></div>
      <div id="GPermarrow6" class="column is-3"></div>
      <div id="GPermarrow7" class="column is-3"></div>
      <div id="GPermarrow8" class="column is-3"></div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="GPermarrow9" class="column is-3"></div>
      <div id="GPermarrow10" class="column is-3"></div>
      <div id="GPermarrow11" class="column is-3"></div>
      <div id="GPermarrow12" class="column is-3"></div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="GPermarrow13" class="column is-3"></div>
      <div id="GPermarrow14" class="column is-3"></div>
      <div id="GPermarrow15" class="column is-3"></div>
      <div id="GPermarrow16" class="column is-3"></div>
    </div>

    <h3>6. 4回対称性あり</h3>
    <p>H-Perm、PLL Skip</p>
    <p>90度ずつ回してもすべて同じものになる対称性(4回対称)を持っているため、それぞれ1ケースしかありません。</p>

    <h4>H-Perm 1ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="HPermarrow1" class="column is-3"></div>
    </div>

    <h4>PLL Skip 1ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="Skiparrow1" class="column is-3"></div>
    </div>

    <h3>7. 4回対称性あり(特殊ケース)</h3>
    <p>N-Perm</p>
    <p>
      これはとても特殊なパターンです。一見、180度回した時に同じものになる2回対称性があるように見えます。しかし、90度違いの2ケースを見てみると、実はこの2つは交換するパーツは違いますが、どちらをやっても同じようにPLLを揃えることができます(完成状態が180度異なる)。よって、4回対称性のものと同じ扱いになります。またN-Permにはミラー対称性があるため、2ケースになります。
    </p>

    <h4>N-Perm 2ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div id="NPermarrow1" class="column is-3"></div>
      <div id="NPermarrow2" class="column is-3"></div>
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
    UPermArrow: {
      arrow1: 'U3U5-s6-red,U5U7-s6-red,U7U3-s6-red',
      arrow2: 'U1U7-s6-red,U7U3-s6-red,U3U1-s6-red',
      arrow3: 'U1U5-s6-red,U5U3-s6-red,U3U1-s6-red',
      arrow4: 'U1U5-s6-red,U5U7-s6-red,U7U1-s6-red',
      arrow5: 'U5U3-s6-red,U7U5-s6-red,U3U7-s6-red',
      arrow6: 'U7U1-s6-red,U3U7-s6-red,U1U3-s6-red',
      arrow7: 'U5U1-s6-red,U3U5-s6-red,U1U3-s6-red',
      arrow8: 'U5U1-s6-red,U7U5-s6-red,U1U7-s6-red',
    },
    APermArrow: {
      arrow1: 'U2U6-s8-red,U6U8-s8-red,U8U2-s7-red',
      arrow2: 'U0U6-s8-red,U6U8-s8-red,U8U0-s7-red',
      arrow3: 'U0U6-s8-red,U6U2-s8-red,U2U0-s7-red',
      arrow4: 'U0U8-s8-red,U8U2-s8-red,U2U0-s7-red',
      arrow5: 'U6U2-s8-red,U8U6-s8-red,U2U8-s7-red',
      arrow6: 'U6U0-s8-red,U8U6-s8-red,U0U8-s7-red',
      arrow7: 'U6U0-s8-red,U2U6-s8-red,U0U2-s7-red',
      arrow8: 'U8U0-s8-red,U2U8-s8-red,U0U2-s7-red',
    },
    VPermArrow: {
      arrow1: 'U0U8-red,U8U0-red,U1U5-red,U5U1-red',
      arrow2: 'U2U6-red,U6U2-red,U5U7-red,U7U5-red',
      arrow3: 'U0U8-red,U8U0-red,U3U7-red,U7U3-red',
      arrow4: 'U2U6-red,U6U2-red,U1U3-red,U3U1-red',
    },
    FPermArrow: {
      arrow1: 'U1U7-red,U7U1-red,U2U8-red,U8U2-red',
      arrow2: 'U3U5-red,U5U3-red,U6U8-red,U8U6-red',
      arrow3: 'U0U6-red,U6U0-red,U1U7-red,U7U1-red',
      arrow4: 'U0U2-red,U2U0-red,U3U5-red,U5U3-red',
    },
    YPermArrow: {
      arrow1: 'U0U8-red,U8U0-red,U1U3-red,U3U1-red',
      arrow2: 'U2U6-red,U6U2-red,U1U5-red,U5U1-red',
      arrow3: 'U0U8-red,U8U0-red,U5U7-red,U7U5-red',
      arrow4: 'U2U6-red,U6U2-red,U3U7-red,U7U3-red',
    },
    TPermArrow: {
      arrow1: 'U2U8-red,U8U2-red,U3U5-s8-red,U5U3-s8-red',
      arrow2: 'U6U8-red,U8U6-red,U1U7-s8-red,U7U1-s8-red',
      arrow3: 'U0U6-red,U6U0-red,U3U5-s8-red,U5U3-s8-red',
      arrow4: 'U0U2-red,U2U0-red,U1U7-s8-red,U7U1-s8-red',
    },
    RPermArrow: {
      arrow1: 'U0U2-red,U2U0-red,U5U7-red,U7U5-red',
      arrow2: 'U2U8-red,U8U2-red,U3U7-red,U7U3-red',
      arrow3: 'U1U3-red,U3U1-red,U6U8-red,U8U6-red',
      arrow4: 'U0U6-red,U6U0-red,U1U5-red,U5U1-red',
      arrow5: 'U0U2-red,U2U0-red,U3U7-red,U7U3-red',
      arrow6: 'U1U3-red,U3U1-red,U2U8-red,U8U2-red',
      arrow7: 'U1U5-red,U5U1-red,U6U8-red,U8U6-red',
      arrow8: 'U0U6-red,U6U0-red,U5U7-red,U7U5-red',
    },
    JPermArrow: {
      arrow1: 'U2U8-red,U8U2-red,U5U7-s8-red,U7U5-s8-red',
      arrow2: 'U6U8-red,U8U6-red,U3U7-s8-red,U7U3-s8-red',
      arrow3: 'U0U6-red,U6U0-red,U1U3-s8-red,U3U1-s8-red',
      arrow4: 'U0U2-red,U2U0-red,U1U5-s8-red,U5U1-s8-red',
      arrow5: 'U2U8-red,U8U2-red,U1U5-s8-red,U5U1-s8-red',
      arrow6: 'U6U8-red,U8U6-red,U5U7-s8-red,U7U5-s8-red',
      arrow7: 'U0U6-red,U6U0-red,U3U7-s8-red,U7U3-s8-red',
      arrow8: 'U0U2-red,U2U0-red,U1U3-s8-red,U3U1-s8-red',
    },
    ZPermArrow: {
      arrow1: 'U1U3-red,U3U1-red,U5U7-red,U7U5-red',
      arrow2: 'U1U5-red,U5U1-red,U3U7-red,U7U3-red',
    },
    EPermArrow: {
      arrow1: 'U0U6-red,U6U0-red,U2U8-red,U8U2-red',
      arrow2: 'U0U2-red,U2U0-red,U6U8-red,U8U6-red',
    },
    GPermArrow: {
      arrow1: 'U0U2-s8-red,U2U6-s8-red,U6U0-s8-red,U1U3-s6-blue,U3U7-s6-blue,U7U1-s6-blue',
      arrow2: 'U2U8-s8-red,U8U0-s8-red,U0U2-s8-red,U1U3-s6-blue,U3U5-s6-blue,U5U1-s6-blue',
      arrow3: 'U2U8-s8-red,U8U6-s8-red,U6U2-s8-red,U1U7-s6-blue,U7U5-s6-blue,U5U1-s6-blue',
      arrow4: 'U0U8-s8-red,U8U6-s8-red,U6U0-s8-red,U5U3-s6-blue,U3U7-s6-blue,U7U5-s6-blue',
      arrow5: 'U2U0-s8-red,U6U2-s8-red,U0U6-s8-red,U3U1-s6-blue,U7U3-s6-blue,U1U7-s6-blue',
      arrow6: 'U8U2-s8-red,U0U8-s8-red,U2U0-s8-red,U3U1-s6-blue,U5U3-s6-blue,U1U5-s6-blue',
      arrow7: 'U8U2-s8-red,U6U8-s8-red,U2U6-s8-red,U7U1-s6-blue,U5U7-s6-blue,U1U5-s6-blue',
      arrow8: 'U8U0-s8-red,U6U8-s8-red,U0U6-s8-red,U3U5-s6-blue,U7U3-s6-blue,U5U7-s6-blue',
      arrow9: 'U0U8-s8-red,U8U6-s8-red,U6U0-s8-red,U1U3-s6-blue,U3U7-s6-blue,U7U1-s6-blue',
      arrow10: 'U0U2-s8-red,U2U6-s8-red,U6U0-s8-red,U1U3-s6-blue,U3U5-s6-blue,U5U1-s6-blue',
      arrow11: 'U0U2-s8-red,U2U8-s8-red,U8U0-s8-red,U1U7-s6-blue,U7U5-s6-blue,U5U1-s6-blue',
      arrow12: 'U2U8-s8-red,U8U6-s8-red,U6U2-s8-red,U3U7-s6-blue,U7U5-s6-blue,U5U3-s6-blue',
      arrow13: 'U8U0-s8-red,U6U8-s8-red,U0U6-s8-red,U3U1-s6-blue,U7U3-s6-blue,U1U7-s6-blue',
      arrow14: 'U2U0-s8-red,U6U2-s8-red,U0U6-s8-red,U3U1-s6-blue,U5U3-s6-blue,U1U5-s6-blue',
      arrow15: 'U2U0-s8-red,U8U2-s8-red,U0U8-s8-red,U7U1-s6-blue,U5U7-s6-blue,U1U5-s6-blue',
      arrow16: 'U8U2-s8-red,U6U8-s8-red,U2U6-s8-red,U7U3-s6-blue,U5U7-s6-blue,U3U5-s6-blue',
    },
    HPermArrow: {
      arrow1: 'U1U7-red,U7U1-red,U3U5-red,U5U3-red',
    },
    SkipArrow: {
      arrow1: '',
    },
    NPermArrow: {
      arrow1: 'U0U8-red,U8U0-red,U3U5-red,U5U3-red',
      arrow2: 'U2U6-red,U6U2-red,U3U5-red,U5U3-red',
    },
  }),
  mounted() {
    const parameter = {}
    parameter.mask = this.mask
    parameter.view = this.view
    parameter.width = this.width
    parameter.height = this.height
    parameter.colorScheme = this.colorScheme
    for (const key in this.UPermArrow) {
      parameter.arrows = this.UPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('UPerm' + key), parameter)
    }
    for (const key in this.APermArrow) {
      parameter.arrows = this.APermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('APerm' + key), parameter)
    }
    for (const key in this.VPermArrow) {
      parameter.arrows = this.VPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('VPerm' + key), parameter)
    }
    for (const key in this.FPermArrow) {
      parameter.arrows = this.FPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('FPerm' + key), parameter)
    }
    for (const key in this.YPermArrow) {
      parameter.arrows = this.YPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('YPerm' + key), parameter)
    }
    for (const key in this.TPermArrow) {
      parameter.arrows = this.TPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('TPerm' + key), parameter)
    }
    for (const key in this.RPermArrow) {
      parameter.arrows = this.RPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('RPerm' + key), parameter)
    }
    for (const key in this.JPermArrow) {
      parameter.arrows = this.JPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('JPerm' + key), parameter)
    }
    for (const key in this.ZPermArrow) {
      parameter.arrows = this.ZPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('ZPerm' + key), parameter)
    }
    for (const key in this.EPermArrow) {
      parameter.arrows = this.EPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('EPerm' + key), parameter)
    }
    for (const key in this.GPermArrow) {
      parameter.arrows = this.GPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('GPerm' + key), parameter)
    }
    for (const key in this.HPermArrow) {
      parameter.arrows = this.HPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('HPerm' + key), parameter)
    }
    for (const key in this.SkipArrow) {
      parameter.arrows = this.SkipArrow[key]
      SRVisualizer.cubePNG(document.getElementById('Skip' + key), parameter)
    }
    for (const key in this.NPermArrow) {
      parameter.arrows = this.NPermArrow[key]
      SRVisualizer.cubePNG(document.getElementById('NPerm' + key), parameter)
    }
  },
}
</script>
