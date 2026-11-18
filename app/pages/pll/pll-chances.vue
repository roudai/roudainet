<script setup lang="ts">
// 移植元: legacy/pages/pll/pll-chances.vue
import { diagrams } from '~/data/cube/pll-chances'
</script>

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
      <CubeImage id="UPermarrow1" class="column is-3" :diagram="diagrams['UPermarrow1']" />
      <CubeImage id="UPermarrow2" class="column is-3" :diagram="diagrams['UPermarrow2']" />
      <CubeImage id="UPermarrow3" class="column is-3" :diagram="diagrams['UPermarrow3']" />
      <CubeImage id="UPermarrow4" class="column is-3" :diagram="diagrams['UPermarrow4']" />
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="UPermarrow5" class="column is-3" :diagram="diagrams['UPermarrow5']" />
      <CubeImage id="UPermarrow6" class="column is-3" :diagram="diagrams['UPermarrow6']" />
      <CubeImage id="UPermarrow7" class="column is-3" :diagram="diagrams['UPermarrow7']" />
      <CubeImage id="UPermarrow8" class="column is-3" :diagram="diagrams['UPermarrow8']" />
    </div>

    <h4>A-Perm 8ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="APermarrow1" class="column is-3" :diagram="diagrams['APermarrow1']" />
      <CubeImage id="APermarrow2" class="column is-3" :diagram="diagrams['APermarrow2']" />
      <CubeImage id="APermarrow3" class="column is-3" :diagram="diagrams['APermarrow3']" />
      <CubeImage id="APermarrow4" class="column is-3" :diagram="diagrams['APermarrow4']" />
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="APermarrow5" class="column is-3" :diagram="diagrams['APermarrow5']" />
      <CubeImage id="APermarrow6" class="column is-3" :diagram="diagrams['APermarrow6']" />
      <CubeImage id="APermarrow7" class="column is-3" :diagram="diagrams['APermarrow7']" />
      <CubeImage id="APermarrow8" class="column is-3" :diagram="diagrams['APermarrow8']" />
    </div>

    <h3>2. エッジ2点交換+コーナー2点交換 ミラーなし</h3>
    <p>V-Perm、F-Perm、Y-Perm、T-Perm</p>
    <p>それぞれ4方向4ケースがあります。</p>

    <h4>V-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="VPermarrow1" class="column is-3" :diagram="diagrams['VPermarrow1']" />
      <CubeImage id="VPermarrow2" class="column is-3" :diagram="diagrams['VPermarrow2']" />
      <CubeImage id="VPermarrow3" class="column is-3" :diagram="diagrams['VPermarrow3']" />
      <CubeImage id="VPermarrow4" class="column is-3" :diagram="diagrams['VPermarrow4']" />
    </div>

    <h4>F-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="FPermarrow1" class="column is-3" :diagram="diagrams['FPermarrow1']" />
      <CubeImage id="FPermarrow2" class="column is-3" :diagram="diagrams['FPermarrow2']" />
      <CubeImage id="FPermarrow3" class="column is-3" :diagram="diagrams['FPermarrow3']" />
      <CubeImage id="FPermarrow4" class="column is-3" :diagram="diagrams['FPermarrow4']" />
    </div>

    <h4>Y-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="YPermarrow1" class="column is-3" :diagram="diagrams['YPermarrow1']" />
      <CubeImage id="YPermarrow2" class="column is-3" :diagram="diagrams['YPermarrow2']" />
      <CubeImage id="YPermarrow3" class="column is-3" :diagram="diagrams['YPermarrow3']" />
      <CubeImage id="YPermarrow4" class="column is-3" :diagram="diagrams['YPermarrow4']" />
    </div>

    <h4>T-Perm 4ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="TPermarrow1" class="column is-3" :diagram="diagrams['TPermarrow1']" />
      <CubeImage id="TPermarrow2" class="column is-3" :diagram="diagrams['TPermarrow2']" />
      <CubeImage id="TPermarrow3" class="column is-3" :diagram="diagrams['TPermarrow3']" />
      <CubeImage id="TPermarrow4" class="column is-3" :diagram="diagrams['TPermarrow4']" />
    </div>

    <h3>3. エッジ2点交換+コーナー2点交換 ミラーあり</h3>
    <p>R-Perm、J-Perm</p>
    <p>それぞれ 4×2 = 8ケースとなります。</p>

    <h4>R-Perm 8ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="RPermarrow1" class="column is-3" :diagram="diagrams['RPermarrow1']" />
      <CubeImage id="RPermarrow2" class="column is-3" :diagram="diagrams['RPermarrow2']" />
      <CubeImage id="RPermarrow3" class="column is-3" :diagram="diagrams['RPermarrow3']" />
      <CubeImage id="RPermarrow4" class="column is-3" :diagram="diagrams['RPermarrow4']" />
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="RPermarrow5" class="column is-3" :diagram="diagrams['RPermarrow5']" />
      <CubeImage id="RPermarrow6" class="column is-3" :diagram="diagrams['RPermarrow6']" />
      <CubeImage id="RPermarrow7" class="column is-3" :diagram="diagrams['RPermarrow7']" />
      <CubeImage id="RPermarrow8" class="column is-3" :diagram="diagrams['RPermarrow8']" />
    </div>

    <h4>J-Perm 8ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="JPermarrow1" class="column is-3" :diagram="diagrams['JPermarrow1']" />
      <CubeImage id="JPermarrow2" class="column is-3" :diagram="diagrams['JPermarrow2']" />
      <CubeImage id="JPermarrow3" class="column is-3" :diagram="diagrams['JPermarrow3']" />
      <CubeImage id="JPermarrow4" class="column is-3" :diagram="diagrams['JPermarrow4']" />
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="JPermarrow5" class="column is-3" :diagram="diagrams['JPermarrow5']" />
      <CubeImage id="JPermarrow6" class="column is-3" :diagram="diagrams['JPermarrow6']" />
      <CubeImage id="JPermarrow7" class="column is-3" :diagram="diagrams['JPermarrow7']" />
      <CubeImage id="JPermarrow8" class="column is-3" :diagram="diagrams['JPermarrow8']" />
    </div>

    <h3>4. エッジ2点2点交換、コーナー2点2点交換</h3>
    <p>Z-Perm、E-Perm</p>
    180度回した時に同じものになる対称性(2回対称)があるため、それぞれ90度違いの2ケースがあります。

    <h4>Z-Perm 2ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="ZPermarrow1" class="column is-3" :diagram="diagrams['ZPermarrow1']" />
      <CubeImage id="ZPermarrow2" class="column is-3" :diagram="diagrams['ZPermarrow2']" />
    </div>

    <h4>E-Perm 2ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="EPermarrow1" class="column is-3" :diagram="diagrams['EPermarrow1']" />
      <CubeImage id="EPermarrow2" class="column is-3" :diagram="diagrams['EPermarrow2']" />
    </div>

    <h3>5. エッジ3点交換+コーナー3点交換</h3>
    <p>G-Perm</p>
    <p>
      エッジ交換とコーナー交換の組み合わせが4ケース、それぞれ対称性がないので4ケースずつの 4×4 = 16ケースがあります。
    </p>

    <h4>G-Perm 16ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="GPermarrow1" class="column is-3" :diagram="diagrams['GPermarrow1']" />
      <CubeImage id="GPermarrow2" class="column is-3" :diagram="diagrams['GPermarrow2']" />
      <CubeImage id="GPermarrow3" class="column is-3" :diagram="diagrams['GPermarrow3']" />
      <CubeImage id="GPermarrow4" class="column is-3" :diagram="diagrams['GPermarrow4']" />
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="GPermarrow5" class="column is-3" :diagram="diagrams['GPermarrow5']" />
      <CubeImage id="GPermarrow6" class="column is-3" :diagram="diagrams['GPermarrow6']" />
      <CubeImage id="GPermarrow7" class="column is-3" :diagram="diagrams['GPermarrow7']" />
      <CubeImage id="GPermarrow8" class="column is-3" :diagram="diagrams['GPermarrow8']" />
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="GPermarrow9" class="column is-3" :diagram="diagrams['GPermarrow9']" />
      <CubeImage id="GPermarrow10" class="column is-3" :diagram="diagrams['GPermarrow10']" />
      <CubeImage id="GPermarrow11" class="column is-3" :diagram="diagrams['GPermarrow11']" />
      <CubeImage id="GPermarrow12" class="column is-3" :diagram="diagrams['GPermarrow12']" />
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="GPermarrow13" class="column is-3" :diagram="diagrams['GPermarrow13']" />
      <CubeImage id="GPermarrow14" class="column is-3" :diagram="diagrams['GPermarrow14']" />
      <CubeImage id="GPermarrow15" class="column is-3" :diagram="diagrams['GPermarrow15']" />
      <CubeImage id="GPermarrow16" class="column is-3" :diagram="diagrams['GPermarrow16']" />
    </div>

    <h3>6. 4回対称性あり</h3>
    <p>H-Perm、PLL Skip</p>
    <p>90度ずつ回してもすべて同じものになる対称性(4回対称)を持っているため、それぞれ1ケースしかありません。</p>

    <h4>H-Perm 1ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="HPermarrow1" class="column is-3" :diagram="diagrams['HPermarrow1']" />
    </div>

    <h4>PLL Skip 1ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="Skiparrow1" class="column is-3" :diagram="diagrams['Skiparrow1']" />
    </div>

    <h3>7. 4回対称性あり(特殊ケース)</h3>
    <p>N-Perm</p>
    <p>
      これはとても特殊なパターンです。一見、180度回した時に同じものになる2回対称性があるように見えます。しかし、90度違いの2ケースを見てみると、実はこの2つは交換するパーツは違いますが、どちらをやっても同じようにPLLを揃えることができます(完成状態が180度異なる)。よって、4回対称性のものと同じ扱いになります。またN-Permにはミラー対称性があるため、2ケースになります。
    </p>

    <h4>N-Perm 2ケース</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <CubeImage id="NPermarrow1" class="column is-3" :diagram="diagrams['NPermarrow1']" />
      <CubeImage id="NPermarrow2" class="column is-3" :diagram="diagrams['NPermarrow2']" />
    </div>
  </div>
</template>
