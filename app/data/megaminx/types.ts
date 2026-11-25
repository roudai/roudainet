/**
 * Megaminx の図の指定。megaminx-image の `svg()` に渡す(005)。
 * 配色と大きさは、データに持たず、`MegaminxImage.vue` で決める。
 */
export interface MegaminxDiagram {
  /** そのケースを揃える手順。`svg()` の `case` にそのまま渡す */
  case: string
  /** OLL 型の図(上面の色だけを示す)のとき true。無いときは、ライブラリの既定の配色の図 */
  oll?: true
  /** 上面を時計回りに回した回数(`svg()` の `rotate`)。図の向きを変えるとき(006) */
  rotate?: number
  /**
   * 色を残すステッカーの番号(megaminx-image の番号。0〜10 は上面、11〜25 は側面の上の列。rotate の後の位置)。
   * 指定すると、ここに無い側面のステッカーを濃い灰色にする。例の一部だけを見せるとき(006)。
   * `svg()` の `show`(megaminx-image 1.1.0)にそのまま渡す
   */
  show?: number[]
}
