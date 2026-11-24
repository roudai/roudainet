/**
 * Megaminx の図の指定。megaminx-image の `svg()` に渡す(005)。
 * 配色と大きさは、データに持たず、`MegaminxImage.vue` で決める。
 */
export interface MegaminxDiagram {
  /** そのケースを揃える手順。`svg()` の `case` にそのまま渡す */
  case: string
  /** OLL 型の図(上面の色だけを示す)のとき true。無いときは、ライブラリの既定の配色の図 */
  oll?: true
}
