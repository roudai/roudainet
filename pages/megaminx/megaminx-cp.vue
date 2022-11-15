<template>
  <div>
    <h2>Megaminx CP</h2>
    <div>
      <h3>3点交換</h3>
      <b>離れた3点交換 時計回り</b><br />
      R' U'2 R U' R' F' R U R' U' R' F R U'2 R<br />
      <b>離れた3点交換 反時計回り</b><br />
      R' U2 R' F' R U R U' R' F R U R' U2 R<br />
      <b>隣り合った3点交換 時計回り</b><br />
      U F' R' F R U' R' F' R2 U R' U' R' F R<br />
      R'2 D2 R'2 B' R2 D'2 R'2 B R' (A-Perm)<br />
      <b>隣り合った3点交換 反時計回り</b><br />
      R' F' R U R U' R'2 F R U R' F' R F U'<br />
      R U R2 D2 R'2 B R2 D'2 R2 (A-Perm)

      <h3>2点-2点交換</h3>
      <b>並行交換(1)</b><br />
      R2 U R' U' y (R U R' U')×2 R U R' y' R U' R2'<br />
      R B' R' F R B R' F' R B R' F R B' R' F' (E-Perm)<br />
      <b>並行交換(2)</b><br />
      R U R' U R' U' R F' R U R' U' R' F R2 U' R2' U R (U')<br />
      R' U' R' D' R U' R' D R U R' D' R U R' D R2<br />
      <b>交差交換</b><br />
      L' R U2 R' U' (R U R' U')×2 R U' R' L<br />
      B' R' F R B R' F' R F R' F' L F R F' L'
    </div>
  </div>
</template>
