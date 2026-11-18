<script setup lang="ts">
// 移植元: legacy/pages/pll/two-sided-pll.vue
import { iwidth, iheight, diagrams } from '~/data/cube/two-sided-pll'
</script>

<template>
  <div>
    <h2>PLL 2側面判断</h2>
    <p>
      この記事は、<a href="http://cubing.pt/wp-content/uploads/2017/03/pll2side-20140531.pdf"
        >Mark49152’s Two-Sided PLL Recognition Guide</a
      >
      を日本語化、加筆したものです。
    </p>
    <p>
      判断基準で出現パターンを絞ることができる、<a href="https://roudai.github.io/PLLTrainer/">PLL Trainer</a
      >を開発しました。
    </p>
    <p>PLLの2側面判断は、下記の4つを判断基準とします。</p>
    <ol>
      <li>3-BAR : 1面に同じ色が3つ並んでいる</li>
      <li>LIGHTS : 1面の両コーナーが同じ色（車のヘッドライト）</li>
      <li>2-BAR : 1面に同じ色が2つ並んでいる</li>
      <li>BOOKEND : 2側面を見たとき、左面の左端と右面の右端が同じ色（本立てが本の両サイドを挟んでいるイメージ）</li>
    </ol>
    <p>下記9つのパターンから最初に当てはまるものを探し、その中でさらに最初に当てはまるケースを探します。</p>
    <p>各パターンには4色のパターン違い、さらに左右ミラーのパターンがあります。</p>
    <p>「対面色」は反対面の色（緑の場合青、等）、「隣接色」は隣面の色（緑の場合赤とオレンジ、等）を表します。</p>

    <div class="box">
      <div class="has-text-centered">
        <h4>3-BAR</h4>
        <img src="/images/two-sided/3-BAR.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>もう一面がLights = U</h5>
      <img src="/images/two-sided/3-BAR_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR0" :diagram="diagrams['pll_3BAR0']" /></div>
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR1" :diagram="diagrams['pll_3BAR1']" /></div>
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR2" :diagram="diagrams['pll_3BAR2']" /></div>
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR3" :diagram="diagrams['pll_3BAR3']" /></div>
      </div>

      <h5>もう一面が2-bar = J</h5>
      <img src="/images/two-sided/3-BAR_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR4" :diagram="diagrams['pll_3BAR4']" /></div>
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR5" :diagram="diagrams['pll_3BAR5']" /></div>
      </div>

      <h5>もう一面が2-bar = J</h5>
      <img src="/images/two-sided/3-BAR_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR6" :diagram="diagrams['pll_3BAR6']" /></div>
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR7" :diagram="diagrams['pll_3BAR7']" /></div>
      </div>

      <h5>4色 = F</h5>
      <img src="/images/two-sided/3-BAR_4.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR8" :diagram="diagrams['pll_3BAR8']" /></div>
        <div class="column is-3 has-text-centered"><CubeImage id="pll_3BAR9" :diagram="diagrams['pll_3BAR9']" /></div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>DOUBLE LIGHTS</h4>
        <h4>（LIGHTSが2つ）</h4>
        <img src="/images/two-sided/Double_Lights.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>2色6チェッカー = Z</h5>
      <img src="/images/two-sided/Double_Lights_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_DoubleLights0" :diagram="diagrams['pll_DoubleLights0']" />
        </div>
      </div>

      <h5>エッジが隣接色かつ4色 = Z</h5>
      <img src="/images/two-sided/Double_Lights_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_DoubleLights1" :diagram="diagrams['pll_DoubleLights1']" />
        </div>
      </div>

      <h5>エッジが対面色 = H</h5>
      <img src="/images/two-sided/Double_Lights_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_DoubleLights2" :diagram="diagrams['pll_DoubleLights2']" />
        </div>
      </div>

      <h5>2:1になっているかつ3色 = U</h5>
      <img src="/images/two-sided/Double_Lights_4.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_DoubleLights3" :diagram="diagrams['pll_DoubleLights3']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_DoubleLights4" :diagram="diagrams['pll_DoubleLights4']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_DoubleLights5" :diagram="diagrams['pll_DoubleLights5']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_DoubleLights6" :diagram="diagrams['pll_DoubleLights6']" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>LIGHTS + 2-BAR</h4>
        <img src="/images/two-sided/Lights_2-BAR_A.png" :width="iwidth" :height="iheight" /><br />
        <img src="/images/two-sided/Lights_2-BAR_B.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>2-BARが内側かつ3色 = T</h5>
      <img src="/images/two-sided/Lights_2-BAR_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR0" :diagram="diagrams['pll_Lights_2BAR0']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR1" :diagram="diagrams['pll_Lights_2BAR1']" />
        </div>
      </div>

      <h5>2-BARが内側かつ4色 = R</h5>
      <img src="/images/two-sided/Lights_2-BAR_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR2" :diagram="diagrams['pll_Lights_2BAR2']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR3" :diagram="diagrams['pll_Lights_2BAR3']" />
        </div>
      </div>

      <h5>2-BARが外側かつ3色 = A</h5>
      <img src="/images/two-sided/Lights_2-BAR_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR4" :diagram="diagrams['pll_Lights_2BAR4']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR5" :diagram="diagrams['pll_Lights_2BAR5']" />
        </div>
      </div>

      <h5>2-BARが外側かつ4色 = Ga/c</h5>
      <img src="/images/two-sided/Lights_2-BAR_4.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR6" :diagram="diagrams['pll_Lights_2BAR6']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="pll_Lights_2BAR7" :diagram="diagrams['pll_Lights_2BAR7']" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>LONE LIGHTS</h4>
        <h4>（LIGHTSがひとつ）</h4>
        <img src="/images/two-sided/Lone_lights.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>5つのチェック柄 = R</h5>
      <img src="/images/two-sided/Lone_lights_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights0" :diagram="diagrams['PLL_Lone_Lights0']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights1" :diagram="diagrams['PLL_Lone_Lights1']" />
        </div>
      </div>

      <h5>4つのチェック柄 = Ga/c</h5>
      <img src="/images/two-sided/Lone_lights_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights2" :diagram="diagrams['PLL_Lone_Lights2']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights3" :diagram="diagrams['PLL_Lone_Lights3']" />
        </div>
      </div>

      <h5>lightsの間に対面色 = Gb/d</h5>
      <img src="/images/two-sided/Lone_lights_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights4" :diagram="diagrams['PLL_Lone_Lights4']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights5" :diagram="diagrams['PLL_Lone_Lights5']" />
        </div>
      </div>

      <h5>lightsの間に隣接色かつチェック柄なし = A</h5>
      <img src="/images/two-sided/Lone_lights_4.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights6" :diagram="diagrams['PLL_Lone_Lights6']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Lone_Lights7" :diagram="diagrams['PLL_Lone_Lights7']" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>DOUBLE 2-BAR</h4>
        <h4>（2-BARが2つ）</h4>
        <img src="/images/two-sided/Double_2-BAR_A.png" :width="iwidth" :height="iheight" /><br />
        <img src="/images/two-sided/Double_2-BAR_B.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>2-BARがどちらも外側 = Y</h5>
      <img src="/images/two-sided/Double_2-BAR_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR0" :diagram="diagrams['PLL_Double_2BAR0']" />
        </div>
      </div>

      <h5>2-BARがどちらも内側かつbookend = A</h5>
      <img src="/images/two-sided/Double_2-BAR_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR1" :diagram="diagrams['PLL_Double_2BAR1']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR2" :diagram="diagrams['PLL_Double_2BAR2']" />
        </div>
      </div>

      <h5>2-BARがどちらも内側かつbookendなし = V</h5>
      <img src="/images/two-sided/Double_2-BAR_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR3" :diagram="diagrams['PLL_Double_2BAR3']" />
        </div>
      </div>

      <h5>2-BARが同じ側に寄っているかつbookend = J</h5>
      <img src="/images/two-sided/Double_2-BAR_4.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR4" :diagram="diagrams['PLL_Double_2BAR4']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR5" :diagram="diagrams['PLL_Double_2BAR5']" />
        </div>
      </div>

      <h5>2-BARが同じ側に寄っているかつbookendなし = N</h5>
      <img src="/images/two-sided/Double_2-BAR_5.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR6" :diagram="diagrams['PLL_Double_2BAR6']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Double_2BAR7" :diagram="diagrams['PLL_Double_2BAR7']" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>OUTSIDE 2-BAR</h4>
        <h4>（外側に2-BAR）</h4>
        <img src="/images/two-sided/Outside_2-BAR.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>bookendなし = V</h5>
      <img src="/images/two-sided/Outside_2-BAR_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR0" :diagram="diagrams['PLL_Outside_2BAR0']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR1" :diagram="diagrams['PLL_Outside_2BAR1']" />
        </div>
      </div>

      <h5>隣接色が2つ = R</h5>
      <img src="/images/two-sided/Outside_2-BAR_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR2" :diagram="diagrams['PLL_Outside_2BAR2']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR3" :diagram="diagrams['PLL_Outside_2BAR3']" />
        </div>
      </div>

      <h5>対面色が2つ = Gb/d</h5>
      <img src="/images/two-sided/Outside_2-BAR_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR4" :diagram="diagrams['PLL_Outside_2BAR4']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR5" :diagram="diagrams['PLL_Outside_2BAR5']" />
        </div>
      </div>

      <h5>2-BARの隣が隣接色かつ4色 = T</h5>
      <img src="/images/two-sided/Outside_2-BAR_4.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR6" :diagram="diagrams['PLL_Outside_2BAR6']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR7" :diagram="diagrams['PLL_Outside_2BAR7']" />
        </div>
      </div>

      <h5>2-BARの隣が対面色かつ4色 = A</h5>
      <img src="/images/two-sided/Outside_2-BAR_5.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR8" :diagram="diagrams['PLL_Outside_2BAR8']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Outside_2BAR9" :diagram="diagrams['PLL_Outside_2BAR9']" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>INSIDE 2-BAR</h4>
        <h4>（内側に2-BAR）</h4>
        <img src="/images/two-sided/Inside_2-BAR.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>隣接色でbookend = Ga/c</h5>
      <img src="/images/two-sided/Inside_2-BAR_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Inside_2BAR0" :diagram="diagrams['PLL_Inside_2BAR0']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Inside_2BAR1" :diagram="diagrams['PLL_Inside_2BAR1']" />
        </div>
      </div>

      <h5>対面色でbookend = Gb/d</h5>
      <img src="/images/two-sided/Inside_2-BAR_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Inside_2BAR2" :diagram="diagrams['PLL_Inside_2BAR2']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Inside_2BAR3" :diagram="diagrams['PLL_Inside_2BAR3']" />
        </div>
      </div>

      <h5>bookendなし = Y</h5>
      <img src="/images/two-sided/Inside_2-BAR_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Inside_2BAR4" :diagram="diagrams['PLL_Inside_2BAR4']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Inside_2BAR5" :diagram="diagrams['PLL_Inside_2BAR5']" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>BOOKENDS NO BAR</h4>
        <h4>（BOOKENDSかつBARなし）</h4>
        <img src="/images/two-sided/Bookends_NoBAR.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>中間4つがチェック柄 = F</h5>
      <img src="/images/two-sided/Bookends_NoBAR_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Bookends_NoBAR0" :diagram="diagrams['PLL_Bookends_NoBAR0']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Bookends_NoBAR1" :diagram="diagrams['PLL_Bookends_NoBAR1']" />
        </div>
      </div>

      <h5>隣接色が2つ = R</h5>
      <img src="/images/two-sided/Bookends_NoBAR_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Bookends_NoBAR2" :diagram="diagrams['PLL_Bookends_NoBAR2']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Bookends_NoBAR3" :diagram="diagrams['PLL_Bookends_NoBAR3']" />
        </div>
      </div>

      <h5>対面色が2つ = Ga/c</h5>
      <img src="/images/two-sided/Bookends_NoBAR_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Bookends_NoBAR4" :diagram="diagrams['PLL_Bookends_NoBAR4']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_Bookends_NoBAR5" :diagram="diagrams['PLL_Bookends_NoBAR5']" />
        </div>
      </div>
    </div>

    <div class="box">
      <div class="has-text-centered">
        <h4>NO BOOKENDS</h4>
        <h4>（BOOKENDS無しかつBARなし）</h4>
        <img src="/images/two-sided/No_bookends.png" :width="iwidth" :height="iheight" />
      </div>
      <h5>中間4つがチェック柄 = V</h5>
      <img src="/images/two-sided/No_bookends_1.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_No_Bookends0" :diagram="diagrams['PLL_No_Bookends0']" />
        </div>
      </div>

      <h5>外側4つがチェック柄 = Y</h5>
      <img src="/images/two-sided/No_bookends_2.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_No_Bookends1" :diagram="diagrams['PLL_No_Bookends1']" />
        </div>
      </div>

      <h5>5つで3色のチェック柄でその真ん中が対面色 = E</h5>
      <img src="/images/two-sided/No_bookends_3.png" :width="iwidth" :height="iheight" />
      <div class="columns is-mobile is-vcentered is-marginless">
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_No_Bookends2" :diagram="diagrams['PLL_No_Bookends2']" />
        </div>
        <div class="column is-3 has-text-centered">
          <CubeImage id="PLL_No_Bookends3" :diagram="diagrams['PLL_No_Bookends3']" />
        </div>
      </div>
    </div>
  </div>
</template>
