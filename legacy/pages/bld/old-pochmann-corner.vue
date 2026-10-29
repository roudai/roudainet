<template>
  <div>
    <h2>Old Pochmann method（corner）</h2>
    <h3>基本</h3>
    <P> コーナーのOld Pochmann法の基本は、PLLのY-Permの手順になります。 </P>
    <p>Y-Permは、下図のような交換をするPLLです。</p>

    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-3 has-text-centered">
        <div id="pochmann1"></div>
      </div>
      <div class="column is-9">F R U' R' U' R U R' F' R U R' U' R' F R F'</div>
    </div>

    <p>Old Pochmannでの基本手順は、このY-Permから最初のFと最後のF'を省略したものになります。</p>

    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-3 has-text-centered">
        <div id="pochmann2"></div>
      </div>
      <div class="column is-9">R U' R' U' R U R' F' R U R' U' R' F R</div>
    </div>

    <p>
      Old
      Pochmannでは、ULB（上左奥）をバッファ（基準）として、RDF（右下手前）との交換を繰り返していきます。その際、UBとULの2つのエッジも交換されますが、気にしません。（偶数回で終わればキャンセルされ、奇数回で終わるときはパリティ）
    </p>
    <p>
      することは、<br />
      <b>セットアップ → Old Pochmann手順（Y-Permの変形）→逆セットアップ</b><br />
      だけです。ひたすらこれを繰り返していきます。
    </p>
    <p>
      注意事項としては、セットアップの際には、F、R、Dの回転しか使ってはいけません。U、L、Bの回転をしてしまうと、バッファ(ULB)と常に入れ替わる2つのエッジ(UB、UL)の位置が変わってしまうので、当然のことです。
    </p>
    <p>
      セットアップのパターンは全部で20ありますが、すべてを丸暗記する必要はありません。どの場所からでも、2手以内でセットアップできます。
    </p>

    <h4>例1 : スクランブル D F' U2 F D' F' U2 F</h4>
    （画像はU面を黄色、F面を赤としてスクランブルしています）
    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column">
        <div id="pochmann3"></div>
      </div>
    </div>

    <p>1回目 : ULB → RDFに移動します。これはOld Pochmannの基本系なので、そのまま手順をします。</p>
    <p><b>R U' R' U' R U R' F' R U R' U' R' F R</b></p>
    <p>このとき、エッジのUBとULも交換されています。</p>
    <p>2回目 : ULB → FLDに移動します。FLDは、DをすることでRDFにセットアップすることができます。</p>
    <p>セットアップ → Old Pochmann手順 → 逆セットアップ</p>
    <p><b>D (R U' R' U' R U R' F' R U R' U' R' F R) D'</b></p>
    <p>1回目で交換されていたUBとULが再度交換され、もとに戻ります。</p>

    <h4>例2 : スクランブル R' F2 R B' R' F2 R B</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column">
        <div id="pochmann4"></div>
      </div>
    </div>

    <p>1回目 : ULB → RUBに移動します。セットアップ : R2</p>
    <p><b>R2 (R U' R' U' R U R' F' R U R' U' R' F R) R2</b></p>
    <p>2回目 : ULB → LDFに移動します。セットアップ : D2 R</p>
    <p><b>D2 R (R U' R' U' R U R' F' R U R' U' R' F R) R' D2</b></p>
    <p>
      途中でループが途切れる（バッファであるULBにそのブロックが来てしまう）場合は、一度どこか適当なまだ揃っていないコーナーに移動して、再度ループを作ります（このあたりの考えはM2法と同じです）。
    </p>

    <h3>発展</h3>
    <p>
      上ではY-Permを基本としましたが、UBとULのエッジが交換され、ULBとどこかのコーナーが交換されるものであれば、Y-Permに限らず使うことができます。それは、J-Permです。
    </p>

    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column">Y-Perm</div>
      <div class="column">J.a-Perm</div>
      <div class="column">J.b-Perm</div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column"><div id="pochmann5"></div></div>
      <div class="column"><div id="pochmann6"></div></div>
      <div class="column"><div id="pochmann7"></div></div>
    </div>

    <p>
      基本形では、RDFにセットアップしてY-Permの変形手順をしましたが、URB、ULFにそれぞれセットアップして、下記の手順をすることでも同じことができます。
    </p>

    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-3 has-text-centered">
        <div id="pochmann8"></div>
      </div>
      <div class="column is-9">R' U L' U2 R U' R' U2 L R U'</div>
    </div>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column is-3 has-text-centered">
        <div id="pochmann9"></div>
      </div>
      <div class="column is-9">U2 R U R' F' R U R' U' R' F R2 U' R' U</div>
    </div>

    <h4>例3 : スクランブル B D' R2 D L D' R2 D L' B'</h4>
    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column">
        <div id="pochmann10"></div>
      </div>
    </div>

    <p>
      1回目 : ULB → FURに移動します。基本に従ってRDFにセットアップするにはR2
      D'ですが、RでURBにセットアップして、J.a-Permでも処理できます。
    </p>
    <p>セットアップ → J.a-Perm → 逆セットアップ</p>
    <p><b>R (R' U L' U2 R U' R' U2 L R U') R'</b></p>
    <p>
      2回目 : ULB → LDFに移動します。基本に従ってRDFにセットアップするにはD2
      Rですが、FでULFにセットアップして、J.b-Permでも処理できます。
    </p>
    <p>セットアップ → J.b-Perm → 逆セットアップ</p>
    <p><b>F (U2 R U R' F' R U R' U' R' F R2 U' R' U) F'</b></p>

    <h3>M2 + Old Pochmann</h3>
    <p>
      エッジをM2法で、コーナーをOld
      Pochmann法で解く場合、パリティ処理を非常に簡単にすることができます。先にM2法でエッジを解き、パリティになった場合（奇数回目で処理が終わってしまった場合）、下記のような状態になります。（コーナーは無視してください）
    </p>

    <div class="columns is-mobile is-vcentered is-marginless">
      <div class="column">
        <div id="pochmann11"></div>
      </div>
    </div>
    <p>
      M2+COCPの場合、ここでU2 M' U2 M'をして、DFとDBの交換を残したりしますが、Old
      Pochmannと組み合わせる場合には、UBとULの交換を残すようにしてやれば、その後の奇数回のOld
      Pochmannで打ち消すことができます。その手順は、
    </p>
    <p>
      <b>D' L2 D M2 D' L2 D</b>
    </p>
    <p>です。</p>
    <p>
      これは、DF → UB →
      ULのCommutatorの、最後のM2をしない状態です（この説明についてはよく分からなくても構いません）。こうすることで、M2で残るパリティを解消しつつ、UBとULの交換を残すことができます。
    </p>
    <p>あとは奇数回のOld Pochmannをすることで、パリティを意識せず解くことができます。</p>
  </div>
</template>

<script>
import * as SRVisualizer from 'sr-visualizer'

export default {
  data: () => ({
    viewportRotations: [
      [1, 30],
      [0, -34],
      [2, 0],
    ],
    width: 80,
    height: 80,
  }),
  mounted() {
    const parameter = {}
    parameter.width = this.width
    parameter.height = this.height
    parameter.view = 'plan'
    parameter.arrows = 'U0U8-red,U8U0-red,U1U3-red,U3U1-red'
    parameter.case = "F R U' R' U' R U R' F' R U R' U' R' F R F'"
    SRVisualizer.cubePNG(document.getElementById('pochmann1'), parameter)

    parameter.view = ''
    parameter.arrows = ''
    parameter.viewportRotations = this.viewportRotations
    parameter.case = "R U' R' U' R U R' F' R U R' U' R' F R"
    SRVisualizer.cubePNG(document.getElementById('pochmann2'), parameter)

    parameter.colorScheme = { 0: '#fefe00', 1: '#00d800', 2: '#ee0000', 3: '#ffffff', 4: '#0000f2', 5: '#ffa100' }
    parameter.case = ''
    parameter.algorithm = "D F' U2 F D' F' U2 F"
    SRVisualizer.cubePNG(document.getElementById('pochmann3'), parameter)

    parameter.algorithm = "R' F2 R B' R' F2 R B"
    SRVisualizer.cubePNG(document.getElementById('pochmann4'), parameter)

    parameter.view = 'plan'
    parameter.arrows = 'U0U8-red,U8U0-red,U1U3-red,U3U1-red'
    parameter.case = "F R U' R' U' R U R' F' R U R' U' R' F R F'"
    SRVisualizer.cubePNG(document.getElementById('pochmann5'), parameter)

    parameter.arrows = 'U0U2-red,U2U0-red,U1U3-s8-red,U3U1-s8-red'
    parameter.case = "R' U L' U2 R U' R' U2 L R U'"
    SRVisualizer.cubePNG(document.getElementById('pochmann6'), parameter)

    parameter.arrows = 'U0U6-red,U6U0-red,U1U3-s8-red,U3U1-s8-red'
    parameter.case = "y2 R U R' F' R U R' U' R' F R2 U' R' U' y2"
    SRVisualizer.cubePNG(document.getElementById('pochmann7'), parameter)

    parameter.arrows = 'U0U2-red,U2U0-red,U1U3-s8-red,U3U1-s8-red'
    parameter.case = "R' U L' U2 R U' R' U2 L R U'"
    SRVisualizer.cubePNG(document.getElementById('pochmann8'), parameter)

    parameter.arrows = 'U0U6-red,U6U0-red,U1U3-s8-red,U3U1-s8-red'
    parameter.case = "y2 R U R' F' R U R' U' R' F R2 U' R' U' y2"
    SRVisualizer.cubePNG(document.getElementById('pochmann9'), parameter)

    parameter.view = ''
    parameter.arrows = ''
    parameter.viewportRotations = this.viewportRotations
    parameter.case = ''
    parameter.algorithm = "B D' R2 D L D' R2 D L' B'"
    SRVisualizer.cubePNG(document.getElementById('pochmann10'), parameter)

    parameter.algorithm = "D' L2 D M2 D' L2 D"
    SRVisualizer.cubePNG(document.getElementById('pochmann11'), parameter)
  },
}
</script>
