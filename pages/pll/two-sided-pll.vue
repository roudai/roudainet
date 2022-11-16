<template>
  <div class="content m-2">
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

    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-1 block variant="outline-primary">
            3-BAR<br />
            <img src="~/assets/images/two-sided/3-BAR.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <div class="p-1">
                <img src="~/assets/images/two-sided/3-BAR_1.png" :width="iwidth" :height="iheight" /><br />
                もう一面がLights = U
                <b-row>
                  <b-col><div id="pll_3BAR0"></div></b-col>
                  <b-col><div id="pll_3BAR1"></div></b-col>
                  <b-col><div id="pll_3BAR2"></div></b-col>
                  <b-col><div id="pll_3BAR3"></div></b-col>
                </b-row>
              </div>
              <div class="p-1">
                <img src="~/assets/images/two-sided/3-BAR_2.png" :width="iwidth" :height="iheight" /><br />
                もう一面が2-bar = J
                <b-row>
                  <b-col><div id="pll_3BAR4"></div></b-col>
                  <b-col><div id="pll_3BAR5"></div></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                </b-row>
              </div>
              <div class="p-1">
                <img src="~/assets/images/two-sided/3-BAR_3.png" :width="iwidth" :height="iheight" /><br />
                もう一面が2-bar = J
                <b-row>
                  <b-col><div id="pll_3BAR6"></div></b-col>
                  <b-col><div id="pll_3BAR7"></div></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                </b-row>
              </div>
              <div class="p-1">
                <img src="~/assets/images/two-sided/3-BAR_4.png" :width="iwidth" :height="iheight" /><br />
                4色 = F
                <b-row>
                  <b-col><div id="pll_3BAR8"></div></b-col>
                  <b-col><div id="pll_3BAR9"></div></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                </b-row>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-2 block variant="outline-primary">
            DOUBLE LIGHTS<br />（LIGHTSが2つ）<br />
            <img src="~/assets/images/two-sided/Double_Lights.png" :width="iwidth" :height="iheight"
          /></b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <div class="p-1">
                <img src="~/assets/images/two-sided/Double_Lights_1.png" :width="iwidth" :height="iheight" /><br />
                2色6チェッカー = Z
                <b-row>
                  <b-col><div id="pll_DoubleLights0"></div></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                </b-row>
              </div>
              <div class="p-1">
                <img src="~/assets/images/two-sided/Double_Lights_2.png" :width="iwidth" :height="iheight" /><br />
                エッジが隣接色かつ4色 = Z
                <b-row>
                  <b-col><div id="pll_DoubleLights1"></div></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                </b-row>
              </div>
              <div class="p-1">
                <img src="~/assets/images/two-sided/Double_Lights_3.png" :width="iwidth" :height="iheight" /><br />
                エッジが対面色 = H
                <b-row>
                  <b-col><div id="pll_DoubleLights2"></div></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                  <b-col></b-col>
                </b-row>
              </div>
              <div class="p-1">
                <img src="~/assets/images/two-sided/Double_Lights_4.png" :width="iwidth" :height="iheight" /><br />
                2:1になっているかつ3色 = U
                <b-row>
                  <b-col><div id="pll_DoubleLights3"></div></b-col>
                  <b-col><div id="pll_DoubleLights4"></div></b-col>
                  <b-col><div id="pll_DoubleLights5"></div></b-col>
                  <b-col><div id="pll_DoubleLights6"></div></b-col>
                </b-row>
              </div>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-3 block variant="outline-primary">
            LIGHTS + 2-BAR<br />
            <img src="~/assets/images/two-sided/Lights_2-BAR_A.png" :width="iwidth" :height="iheight" /><br />
            <img src="~/assets/images/two-sided/Lights_2-BAR_B.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <img src="~/assets/images/two-sided/Lights_2-BAR_1.png" :width="iwidth" :height="iheight" /><br />
              2-BARが内側かつ3色 = T
              <b-row>
                <b-col><div id="pll_Lights_2BAR0"></div></b-col>
                <b-col><div id="pll_Lights_2BAR1"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Lights_2-BAR_2.png" :width="iwidth" :height="iheight" /><br />
              2-BARが内側かつ4色 = R
              <b-row>
                <b-col><div id="pll_Lights_2BAR2"></div></b-col>
                <b-col><div id="pll_Lights_2BAR3"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Lights_2-BAR_3.png" :width="iwidth" :height="iheight" /><br />
              2-BARが外側かつ3色 = A
              <b-row>
                <b-col><div id="pll_Lights_2BAR4"></div></b-col>
                <b-col><div id="pll_Lights_2BAR5"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Lights_2-BAR_4.png" :width="iwidth" :height="iheight" /><br />
              2-BARが外側かつ4色 = Ga/c
              <b-row>
                <b-col><div id="pll_Lights_2BAR6"></div></b-col>
                <b-col><div id="pll_Lights_2BAR7"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-4 block variant="outline-primary">
            LONE LIGHTS<br />（LIGHTSがひとつ）<br />
            <img src="~/assets/images/two-sided/Lone_lights.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <img src="~/assets/images/two-sided/Lone_lights_1.png" :width="iwidth" :height="iheight" /><br />
              5つのチェック柄 = R
              <b-row>
                <b-col><div id="PLL_Lone_Lights0"></div></b-col>
                <b-col><div id="PLL_Lone_Lights1"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Lone_lights_2.png" :width="iwidth" :height="iheight" /><br />
              4つのチェック柄 = Ga/c
              <b-row>
                <b-col><div id="PLL_Lone_Lights2"></div></b-col>
                <b-col><div id="PLL_Lone_Lights3"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Lone_lights_3.png" :width="iwidth" :height="iheight" /><br />
              lightsの間に対面色 = Gb/d
              <b-row>
                <b-col><div id="PLL_Lone_Lights4"></div></b-col>
                <b-col><div id="PLL_Lone_Lights5"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Lone_lights_4.png" :width="iwidth" :height="iheight" /><br />
              lightsの間に隣接色かつチェック柄なし = A
              <b-row>
                <b-col><div id="PLL_Lone_Lights6"></div></b-col>
                <b-col><div id="PLL_Lone_Lights7"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-5 block variant="outline-primary">
            DOUBLE 2-BAR<br />（2-BARが2つ）<br />
            <img src="~/assets/images/two-sided/Double_2-BAR_A.png" :width="iwidth" :height="iheight" /><br />
            <img src="~/assets/images/two-sided/Double_2-BAR_B.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <img src="~/assets/images/two-sided/Double_2-BAR_1.png" :width="iwidth" :height="iheight" /><br />
              2-BARがどちらも外側 = Y
              <b-row>
                <b-col><div id="PLL_Double_2BAR0"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Double_2-BAR_2.png" :width="iwidth" :height="iheight" /><br />
              2-BARがどちらも内側かつbookend = A
              <b-row>
                <b-col><div id="PLL_Double_2BAR1"></div></b-col>
                <b-col><div id="PLL_Double_2BAR2"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Double_2-BAR_3.png" :width="iwidth" :height="iheight" /><br />
              2-BARがどちらも内側かつbookendなし = V
              <b-row>
                <b-col><div id="PLL_Double_2BAR3"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Double_2-BAR_4.png" :width="iwidth" :height="iheight" /><br />
              2-BARが同じ側に寄っているかつbookend = J
              <b-row>
                <b-col><div id="PLL_Double_2BAR4"></div></b-col>
                <b-col><div id="PLL_Double_2BAR5"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Double_2-BAR_5.png" :width="iwidth" :height="iheight" /><br />
              2-BARが同じ側に寄っているかつbookendなし = N
              <b-row>
                <b-col><div id="PLL_Double_2BAR6"></div></b-col>
                <b-col><div id="PLL_Double_2BAR7"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-6 block variant="outline-primary">
            OUTSIDE 2-BAR<br />（外側に2-BAR）<br />
            <img src="~/assets/images/two-sided/Outside_2-BAR.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <img src="~/assets/images/two-sided/Outside_2-BAR_1.png" :width="iwidth" :height="iheight" /><br />
              bookendなし = V
              <b-row>
                <b-col><div id="PLL_Outside_2BAR0"></div></b-col>
                <b-col><div id="PLL_Outside_2BAR1"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Outside_2-BAR_2.png" :width="iwidth" :height="iheight" /><br />
              隣接色が2つ = R
              <b-row>
                <b-col><div id="PLL_Outside_2BAR2"></div></b-col>
                <b-col><div id="PLL_Outside_2BAR3"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Outside_2-BAR_3.png" :width="iwidth" :height="iheight" /><br />
              対面色が2つ = Gb/d
              <b-row>
                <b-col><div id="PLL_Outside_2BAR4"></div></b-col>
                <b-col><div id="PLL_Outside_2BAR5"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Outside_2-BAR_4.png" :width="iwidth" :height="iheight" /><br />
              2-BARの隣が隣接色かつ4色 = T
              <b-row>
                <b-col><div id="PLL_Outside_2BAR6"></div></b-col>
                <b-col><div id="PLL_Outside_2BAR7"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Outside_2-BAR_5.png" :width="iwidth" :height="iheight" /><br />
              2-BARの隣が対面色かつ4色 = A
              <b-row>
                <b-col><div id="PLL_Outside_2BAR8"></div></b-col>
                <b-col><div id="PLL_Outside_2BAR9"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-7 block variant="outline-primary">
            INSIDE 2-BAR<br />（内側に2-BAR）<br />
            <img src="~/assets/images/two-sided/Inside_2-BAR.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <img src="~/assets/images/two-sided/Inside_2-BAR_1.png" :width="iwidth" :height="iheight" /><br />
              隣接色でbookend = Ga/c
              <b-row>
                <b-col><div id="PLL_Inside_2BAR0"></div></b-col>
                <b-col><div id="PLL_Inside_2BAR1"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Inside_2-BAR_2.png" :width="iwidth" :height="iheight" /><br />
              対面色でbookend = Gb/d
              <b-row>
                <b-col><div id="PLL_Inside_2BAR2"></div></b-col>
                <b-col><div id="PLL_Inside_2BAR3"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Inside_2-BAR_3.png" :width="iwidth" :height="iheight" /><br />
              bookendなし = Y
              <b-row>
                <b-col><div id="PLL_Inside_2BAR4"></div></b-col>
                <b-col><div id="PLL_Inside_2BAR5"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-8 block variant="outline-primary">
            BOOKENDS NO BAR<br />（BOOKENDSかつBARなし）<br />
            <img src="~/assets/images/two-sided/Bookends_NoBAR.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-8" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <img src="~/assets/images/two-sided/Bookends_NoBAR_1.png" :width="iwidth" :height="iheight" /><br />
              中間4つがチェック柄 = F
              <b-row>
                <b-col><div id="PLL_Bookends_NoBAR0"></div></b-col>
                <b-col><div id="PLL_Bookends_NoBAR1"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Bookends_NoBAR_2.png" :width="iwidth" :height="iheight" /><br />
              隣接色が2つ = R
              <b-row>
                <b-col><div id="PLL_Bookends_NoBAR2"></div></b-col>
                <b-col><div id="PLL_Bookends_NoBAR3"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/Bookends_NoBAR_3.png" :width="iwidth" :height="iheight" /><br />
              対面色が2つ = Ga/c
              <b-row>
                <b-col><div id="PLL_Bookends_NoBAR4"></div></b-col>
                <b-col><div id="PLL_Bookends_NoBAR5"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-9 block variant="outline-primary">
            NO BOOKENDS<br />（BOOKENDS無しかつBARなし）<br />
            <img src="~/assets/images/two-sided/No_bookends.png" :width="iwidth" :height="iheight" />
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-9" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>
              <img src="~/assets/images/two-sided/No_bookends_1.png" :width="iwidth" :height="iheight" /><br />
              中間4つがチェック柄 = V
              <b-row>
                <b-col><div id="PLL_No_Bookends0"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/No_bookends_2.png" :width="iwidth" :height="iheight" /><br />
              外側4つがチェック柄 = Y
              <b-row>
                <b-col><div id="PLL_No_Bookends1"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
              <img src="~/assets/images/two-sided/No_bookends_3.png" :width="iwidth" :height="iheight" /><br />
              5つで3色のチェック柄でその真ん中が対面色 = E
              <b-row>
                <b-col><div id="PLL_No_Bookends2"></div></b-col>
                <b-col><div id="PLL_No_Bookends3"></div></b-col>
                <b-col></b-col>
                <b-col></b-col>
              </b-row>
            </b-card-text>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import * as SRVisualizer from 'sr-visualizer'

export default {
  data: () => ({
    iwidth: 120,
    iheight: 21,
    width: 100,
    height: 100,
    mask: 'll',
    pll_3BAR: [
      "R2 U R U R' U' R' U' R' U R' y2",
      "R U' R U R U R U' R' U' R2 y2",
      "R2 U R U R' U' R' U' R' U R' y",
      "R U' R U R U R U' R' U' R2 y",
      "y2 R' U L' U2 R U' R' U2 L R U'",
      "y' R U R' F' R U R' U' R' F R2 U' R' U' y2",
      "y' R U R' F' R U R' U' R' F R2 U' R' U' y'",
      "y2 R' U L' U2 R U' R' U2 L R U' y'",
      "y' R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R y'",
      "y' R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R y2",
    ],
    pll_3BAR_arrow: [
      'U1U3-s8,U3U5-s8,U5U1-s8',
      'U3U1-s8,U5U3-s8,U1U5-s8',
      'U1U3-s8,U3U7-s8,U7U1-s8',
      'U3U1-s8,U7U3-s8,U7U1-s8',
      'U0U2,U2U0,U1U3-s8,U3U1-s8',
      'U0U6,U6U0,U1U3-s8,U3U1-s8',
      'U0U2,U2U0,U1U5-s8,U5U1-s8',
      'U0U6,U6U0,U3U7-s8,U7U3-s8',
      'U0U2,U2U0,U3U5,U5U3',
      'U0U6,U6U0,U1U7,U7U1',
    ],
    pll_DoubleLights: [
      "y M' U M'2 U M'2 U M' U2 M'2",
      "y2 M' U M'2 U M'2 U M' U2 M'2 U'",
      "y2 M'2 U M'2 U2 M'2 U M2",
      "y2 R U' R U R U R U' R' U' R2",
      "y2 R2 U R U R' U' R' U' R' U R'",
      "y2 R U' R U R U R U' R' U' R2 y'",
      "y2 R2 U R U R' U' R' U' R' U R' y'",
    ],
    pll_DoubleLights_arrow: [
      'U1U3,U3U1,U5U7,U7U5',
      'U1U5,U5U1,U3U7,U7U3',
      'U1U7,U7U1,U3U5,U5U3',
      'U3U5-s8,U5U7-s8,U7U3-s8',
      'U5U3-s8,U7U5-s8,U3U7-s8',
      'U1U5-s8,U5U7-s8,U7U1,s8',
      'U5U1-s8,U7U5-s8,U1U7-s8',
    ],
    pll_Lights_2BAR: [
      "y' R U R' U' R' F R2 U' R' U' R U R' F' y'",
      "y' R U R' U' R' F R2 U' R' U' R U R' F' y2",
      "y' R U' R' U' R U R D R' U' R D' R' U'2 R' U' y'",
      "y2 R' U2 R U'2 R' F R U R' U' R' F' R2 U' y'",
      "y2 x' R U' R D2 R' U R D2 R2 x y",
      "y x' R2 D2 R' U' R D2 R' U R' x y'",
      "y' D R' U' R U D' R2 U R' U R U' R U' R2' U'",
      "y' D' R U R' U' D R2 U' R U' R' U R' U R2 U y",
    ],
    pll_Lights_2BAR_arrow: [
      'U0U2,U2U0,U1U7-s8,U7U1-s8',
      'U0U6,U6U0,U3U5-8,U5U3-8',
      'U0U2,U2U0,U3U7,U7U3',
      'U0U6,U6U0,U1U5,U5U1',
      'U0U8-s8,U8U6-s8,U6U0-s8',
      'U0U8-s8,U8U2-s8,U2U0-s8',
      'U0U8-s8,U8U6-s8,U6U0-s8,U1U3-s6,U3U7-s6,U7U1-s6',
      'U0U8-s8,U8U2-s8,U2U0-s8,U1U5-s6,U5U3-s6,U3U1-s6',
    ],
    PLL_Lone_Lights: [
      "y2 R' U2 R U'2 R' F R U R' U' R' F' R2 U'",
      "y' R U' R' U' R U R D R' U' R D' R' U'2 R' U' y2",
      "y' D' R U R' U' D R2 U' R U' R' U R' U R2 U y2",
      "y' D R' U' R U D' R2 U R' U R U' R U' R2' U' y'",
      "U' R2 U' R U' R U R' U R2 D' U R U' R' D y'",
      "y2 U R2 U R' U R' U'R U' R2 D U' R' U R D' y2",
      "y x' R2 D2 R' U' R D2 R' U R' x",
      "y2 x' R U' R D2 R' U R D2 R2 x",
    ],
    PLL_Lone_Lights_arrow: [
      'U0U2,U2U0,U5U7,U7U5',
      'U0U6,U6U0,U5U7,U7U5',
      'U2U6-s8,U6U8-s8,U8U2-s8,U1U5-s6,U5U7-s6,U7U1-s6',
      'U2U8-s8,U8U6-s8,U6U2-s8,U3U7-s6,U6U5-s6,U5U3-s6',
      'U0U8-s8,U8U6-s8,U6U0-s8,U3U7-s6,U7U5-s6,U5U3-s6',
      'U0U8-s8,U8U2-s8,U2U0-s8,U1U5-s6,U5U7-s6,U7U1-s6',
      'U2U6-s8,U6U8-s8,U8U2-s8',
      'U2U8-s8,U8U6-s8,U6U2-s8',
    ],
    PLL_Double_2BAR: [
      "y2 F R U' R' U' R U R' F' R U R' U' R' F R F'",
      "x' R U' R D2 R' U R D2 R2 x y2",
      "x' R2 D2 R' U' R D2 R' U R' x y2",
      "y' R' U R U' R' Fw' U' R U2 R' U' R U' R' Fw R y'",
      "y' R' U L' U2 R U' R' U2 L R U' y2",
      "y2 R U R' F' R U R' U' R' F R2 U' R' U'",
      "y2 R' U R U' R' F' U' F R U R' F R' F' R U' R",
      "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R' y",
    ],
    PLL_Double_2BAR_arrow: [
      'U0U8,U8U0,U1U3,U3U1',
      'U0U2-s8,U2U6-s8,U6U0-s8',
      'U2U0-s8,U6U2-s8,U0U6-s8',
      'U1U3,U3U1,U2U6,U6U2',
      'U6U8,U8U6,U5U7-s8,U7U5-s8',
      'U2U8,U8U2,U5U7-s8,U7U5-s8',
      'U0U8,U8U0,U3U5,U5U3',
      'U0U8,U8U0,U1U7,U7U1',
    ],
    PLL_Outside_2BAR: [
      "y2 R' U R U' R' Fw' U' R U2 R' U' R U' R' Fw R",
      "y' R' U R U' R' Fw' U' R U2 R' U' R U' R' Fw R y2",
      "y2 R U' R' U' R U R D R' U' R D' R' U'2 R' U'",
      "y' R' U2 R U'2 R' F R U R' U' R' F' R2 U' y2",
      "y U' R2 U' R U' R U R' U R2 D' U R U' R' D y",
      "y U R2 U R' U R' U'R U' R2 D U' R' U R D'",
      "y2 R U R' U' R' F R2 U' R' U' R U R' F'",
      "R U R' U' R' F R2 U' R' U' R U R' F' y",
      "y' x' R U' R D2 R' U R D2 R2 x y'",
      "x' R2 D2 R' U' R D2 R' U R' x y",
    ],
    PLL_Outside_2BAR_arrow: [
      'U0U8,U8U0,U1U5,U5U1',
      'U0U8,U8U0,U3U7,U7U3',
      'U1U3,U3U1,U2U8,U8U2',
      'U1U3,U3U1,U6U8,U8U6',
      'U0U2-s8,U2U8-s8,U8U0-s8,U1U3-s6,U3U5-s6,U5U1-s6',
      'U0U6-s8,U6U8-s8,U8U0-s8,U1U7-s6,U7U3-s6,U3U1-s6',
      'U2U8,U8U2,U3U5-s8,U5U3-s8',
      'U6U8,U8U6,U1U7-s8,U7U1-s8',
      'U0U2-s8,U2U8-s8,U8U0-s8',
      'U0U6-s8,U6U8-s8,U8U0-s8',
    ],
    PLL_Inside_2BAR: [
      "y D R' U' R U D' R2 U R' U R U' R U' R2' U' y",
      "y D' R U R' U' D R2 U' R U' R' U R' U R2 U",
      "y U R2 U R' U R' U'R U' R2 D U' R' U R D' y",
      "y U' R2 U' R U' R U R' U R2 D' U R U' R' D",
      "y F R U' R' U' R U R' F' R U R' U' R' F R F' y",
      "y2 F R U' R' U' R U R' F' R U R' U' R' F R F' y'",
    ],
    PLL_Inside_2BAR_arrow: [
      'U0U2-s8,U7U6-s8,U6U0-s8,U1U3-s6,U3U5-s6,U5U1-s6',
      'U0U6,s8,U6U2-s8,U2U0-s8,U1U7-s6,U7U3-s6,U3U1-s6',
      'U0U6-s8,U6U2-s8,U2U0-s8,U1U5-s6,U5U3-s6,U3U1-s6',
      'U0U2-s8,U2U6-s8,U6U0-s8,U1U3-s6,U3U7-s6,U7U1-s6',
      'U2U6,U6U2,U1U5,U5U1',
      'U2U6,U6U2,U3U7,U7U3',
    ],
    PLL_Bookends_NoBAR: [
      "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R y",
      "y2 R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R",
      "R U' R' U' R U R D R' U' R D' R' U'2 R' U' y",
      "y R' U2 R U'2 R' F R U R' U' R' F' R2 U' y",
      "y2 D' R U R' U' D R2 U' R U' R' U R' U R2 U y'",
      "D R' U' R U D' R2 U R' U R U' R U' R2' U' y2",
    ],
    PLL_Bookends_NoBAR_arrow: [
      'U3U5,U5U3,U6U8,U8U6',
      'U1U7,U7U1,U2U8,U8U2',
      'U1U5,U5U1,U6U8,U8U6',
      'U2U8,U8U2,U3U7,U7U3',
      'U0U6-s8,U6U8-s8,U8U0-s8,U3U5-s6,U5U7-s6,U7U3-s6',
      'U0U2-s8,U2U8-s8,U8U0-s8,U1U7-s6,U7U5-s6,U5U1-s6',
    ],
    PLL_No_Bookends: [
      "y' R' U R U' R' Fw' U' R U2 R' U' R U' R' Fw R y",
      "F R U' R' U' R U R' F' R U R' U' R' F R F' y2",
      "y2 x' R U' R' D R U R' D' R U R' D R U' R' D' x y'",
      "x' R U' R' D R U R' D' R U R' D R U' R' D' x y2",
    ],
    PLL_No_Bookends_arrow: ['U2U6,U6U2,U5U7,U7U5', 'U0U8,U8U0,U5U7,U7U5', 'U0U2,U2U0,U6U8,U8U6', 'U0U6,U6U0,U2U8,U2U8'],
  }),
  mounted() {
    const parameter = {}
    parameter.width = this.width
    parameter.height = this.height
    parameter.mask = this.mask
    for (const key in this.pll_3BAR) {
      parameter.algorithm = this.pll_3BAR[key]
      parameter.arrows = this.pll_3BAR_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('pll_3BAR' + key), parameter)
    }
    for (const key in this.pll_DoubleLights) {
      parameter.algorithm = this.pll_DoubleLights[key]
      parameter.arrows = this.pll_DoubleLights_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('pll_DoubleLights' + key), parameter)
    }
    for (const key in this.pll_Lights_2BAR) {
      parameter.algorithm = this.pll_Lights_2BAR[key]
      parameter.arrows = this.pll_Lights_2BAR_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('pll_Lights_2BAR' + key), parameter)
    }
    for (const key in this.PLL_Lone_Lights) {
      parameter.algorithm = this.PLL_Lone_Lights[key]
      parameter.arrows = this.PLL_Lone_Lights_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('PLL_Lone_Lights' + key), parameter)
    }
    for (const key in this.PLL_Double_2BAR) {
      parameter.algorithm = this.PLL_Double_2BAR[key]
      parameter.arrows = this.PLL_Double_2BAR_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('PLL_Double_2BAR' + key), parameter)
    }
    for (const key in this.PLL_Outside_2BAR) {
      parameter.algorithm = this.PLL_Outside_2BAR[key]
      parameter.arrows = this.PLL_Outside_2BAR_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('PLL_Outside_2BAR' + key), parameter)
    }
    for (const key in this.PLL_Inside_2BAR) {
      parameter.algorithm = this.PLL_Inside_2BAR[key]
      parameter.arrows = this.PLL_Inside_2BAR_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('PLL_Inside_2BAR' + key), parameter)
    }
    for (const key in this.PLL_Bookends_NoBAR) {
      parameter.algorithm = this.PLL_Bookends_NoBAR[key]
      parameter.arrows = this.PLL_Bookends_NoBAR_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('PLL_Bookends_NoBAR' + key), parameter)
    }
    for (const key in this.PLL_No_Bookends) {
      parameter.algorithm = this.PLL_No_Bookends[key]
      parameter.arrows = this.PLL_No_Bookends_arrow[key]
      SRVisualizer.cubePNG(document.getElementById('PLL_No_Bookends' + key), parameter)
    }
  },
}
</script>
