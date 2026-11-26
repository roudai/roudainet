// Megaminx PLL の解析の共通の処理(汎用。megaminx-image が必要)。
// 番号と呼び方の決まりは references/stickers.md、用語の定義は references/terms.md。
import { DEFAULT_SCHEME, stickerColors } from 'megaminx-image'
import { PLL_CASES } from 'megaminx-image/cases'

export { PLL_CASES }

/** 5 を法とした面・頂点の番号 */
export const mod = (k) => (((k % 5) + 5) % 5)

/** 側面 k の上の列の番号:左のコーナー・エッジ・右のコーナー */
export const L = (k) => 11 + 3 * mod(k)
export const E = (k) => 12 + 3 * mod(k)
export const R = (k) => 13 + 3 * mod(k)

/** 面 k の呼び方(図の上での位置) */
export const FACE_NAMES = ['左上', '左下', '下(手前)', '右下', '右上']
/** 頂点 v の呼び方。頂点 v のコーナーは、面 v-1 の右(R(v-1))と面 v の左(L(v)) */
export const VERTEX_NAMES = ['上', '左上', '左下', '右下', '右上']

/** 頂点 v のコーナーの 2 枚(面 v-1 側、面 v 側) */
export const corner = (v) => [R(v - 1), L(v)]

/** 色コードの呼び方(既定の配色の側面の 5 色) */
const COLOR_NAMES = { p: 'ピンク', c: 'クリーム', a: '水色', o: 'オレンジ', l: '緑' }
export const colorName = (c) => COLOR_NAMES[c] ?? c

/** 既定の配色で、側面の面 k の色(揃った状態) */
export const homeColor = (k) => DEFAULT_SCHEME[['BL', 'L', 'F', 'R', 'BR'][mod(k)]]

/** ケース名から手順を引く。無ければ例外 */
export function algOf(name) {
  const found = PLL_CASES.find((c) => c.name === name)
  if (!found) throw new Error(`PLL に無いケース名です: ${name}`)
  return found.alg
}

/** ケース(名前)の図の 26 色。rotate は図の向き(上面を時計回りに回す回数) */
export function colorsOf(name, rotate = 0) {
  return stickerColors({ case: algOf(name), rotate })
}

/**
 * 図の中の特徴をすべて挙げる(references/terms.md の定義)。
 * 返す要素:{ kind, where, show }。show は、その特徴を図で見せるときに色を残す番号
 * (基礎知識の図と同じく、隣のコーナーの反対側の面のステッカーまで含める)
 */
export function features(s) {
  const out = []
  const same = (...ids) => ids.every((i) => s[i] === s[ids[0]])
  const bar = (k) => same(L(k), E(k), R(k))
  const blockRight = (k) => same(E(k), R(k)) && same(L(k + 1), E(k + 1)) // 面 k と面 k+1 にまたがる(頂点 k+1)
  for (let k = 0; k < 5; k++) {
    const face = `${FACE_NAMES[k]}の面`
    const five = [R(k - 1), L(k), E(k), R(k), L(k + 1)]
    if (bar(k)) out.push({ kind: 'バー', where: face, show: five })
    if (bar(k) && blockRight(k - 1) && blockRight(k)) {
      out.push({
        kind: '3x2ブロック',
        where: `${face}を中心に、${FACE_NAMES[mod(k - 1)]}・${FACE_NAMES[mod(k + 1)]}の面まで`,
        show: [E(k - 1), R(k - 1), L(k), E(k), R(k), L(k + 1), E(k + 1)],
      })
    }
    if (blockRight(k)) {
      out.push({
        kind: 'ブロック',
        where: `${VERTEX_NAMES[mod(k + 1)]}の頂点(${FACE_NAMES[k]}と${FACE_NAMES[mod(k + 1)]}の面)`,
        show: [E(k), R(k), L(k + 1), E(k + 1)],
      })
    }
    // ペア。ブロックの一部のペアは、運営者の数え方ではペアと数えない(ブロックと呼ぶ)ので、inBlock の印を付ける
    if (!bar(k)) {
      if (same(E(k), R(k))) {
        const inBlock = blockRight(k)
        out.push({ kind: 'ペア', where: `${face}の右側${inBlock ? '(ブロックの中)' : ''}`, show: [E(k), R(k), L(k + 1)], inBlock })
      }
      if (same(E(k), L(k))) {
        const inBlock = blockRight(k - 1)
        out.push({ kind: 'ペア', where: `${face}の左側${inBlock ? '(ブロックの中)' : ''}`, show: [R(k - 1), L(k), E(k)], inBlock })
      }
    }
    const headlight = (j) => same(L(j), R(j)) && !same(L(j), E(j))
    if (headlight(k)) {
      out.push({ kind: 'ヘッドライト', where: face, show: five })
      // Rブロック:ヘッドライトの片方のコーナーが、隣の面のエッジとペアになっている。ペアのある側で左・右と呼ぶ
      if (same(R(k - 1), E(k - 1)) && !bar(k - 1)) {
        out.push({ kind: '左Rブロック', where: `${face}のヘッドライトと、${FACE_NAMES[mod(k - 1)]}の面のペア`, show: [E(k - 1), R(k - 1), L(k), E(k), R(k), L(k + 1)] })
      }
      if (same(L(k + 1), E(k + 1)) && !bar(k + 1)) {
        out.push({ kind: '右Rブロック', where: `${face}のヘッドライトと、${FACE_NAMES[mod(k + 1)]}の面のペア`, show: [R(k - 1), L(k), E(k), R(k), L(k + 1), E(k + 1)] })
      }
    }
    // Yペア(運営者の言葉):1 つのコーナー(頂点 k+1)を挟んで、面 k の左側と面 k+1 の右側にペアがある。どちらもブロック・バーの一部でない
    const loosePairLeft = (j) => same(E(j), L(j)) && !bar(j) && !blockRight(j - 1)
    const loosePairRight = (j) => same(E(j), R(j)) && !bar(j) && !blockRight(j)
    if (loosePairLeft(k) && loosePairRight(k + 1)) {
      out.push({
        kind: 'Yペア',
        where: `${VERTEX_NAMES[mod(k + 1)]}の頂点を挟む(${FACE_NAMES[k]}の面の左側と${FACE_NAMES[mod(k + 1)]}の面の右側)`,
        show: [R(k - 1), L(k), E(k), E(k + 1), R(k + 1), L(k + 2)],
      })
    }
    const fakeLeft = same(E(k), R(k - 1)) && !same(E(k), L(k))
    const fakeRight = same(E(k), L(k + 1)) && !same(E(k), R(k))
    if (fakeLeft && fakeRight) out.push({ kind: '偽バー', where: face, show: five })
    else {
      if (fakeRight) out.push({ kind: '偽ペア', where: `${face}の右側(${VERTEX_NAMES[mod(k + 1)]}の頂点)`, show: [E(k), R(k), L(k + 1)] })
      if (fakeLeft) out.push({ kind: '偽ペア', where: `${face}の左側(${VERTEX_NAMES[k]}の頂点)`, show: [R(k - 1), L(k), E(k)] })
    }
    if (same(E(k), L(k + 1)) && same(E(k + 1), R(k)) && !same(E(k), R(k))) {
      out.push({
        kind: '偽ブロック',
        where: `${VERTEX_NAMES[mod(k + 1)]}の頂点(${FACE_NAMES[k]}と${FACE_NAMES[mod(k + 1)]}の面)`,
        show: [E(k), R(k), L(k + 1), E(k + 1)],
      })
    }
  }
  return out
}

/** 面ごとの 3 枚の色の 1 行(例:「左上 クリーム・クリーム・クリーム」) */
export function faceRows(s) {
  return FACE_NAMES.map((n, k) => `${n}: ${[L(k), E(k), R(k)].map((i) => colorName(s[i])).join('・')}  (番号 ${L(k)}・${E(k)}・${R(k)})`)
}

/**
 * 図の向きで、どのピースがどこへ動くかを求める(AUF のずれを打ち消す)。
 * U を t 回足した状態のうち、動くピースが最も少ないものを選び、図の上の位置に戻して返す。
 * 返す値:{ auf, corners, edges }。corners・edges は、図の位置 → 揃ったときの位置(図の上の位置)
 */
export function permutation(name) {
  const solved = stickerColors({})
  const key = (s, v) => `${s[R(v - 1)]}${s[L(v)]}`
  const cornerHome = new Map([0, 1, 2, 3, 4].map((v) => [key(solved, v), v]))
  const edgeHome = new Map([0, 1, 2, 3, 4].map((k) => [solved[E(k)], k]))
  let best
  for (let t = 0; t < 5; t++) {
    // 図の状態に U を t 回足した状態。case は手順の逆を回すので、手順の前に U' を t 回置く(y の打ち消しも case に任せる)。
    // U を t 回回すと、位置 w に、もとは位置 w+t にあったピースが来る(README の rotate と同じ向き)
    const s = stickerColors({ case: `${"U' ".repeat(t)}${algOf(name)}` })
    const corners = [0, 1, 2, 3, 4].map((v) => mod(cornerHome.get(key(s, mod(v - t))) + t))
    const edges = [0, 1, 2, 3, 4].map((k) => mod(edgeHome.get(s[E(mod(k - t))]) + t))
    const moved = corners.filter((h, v) => h !== v).length + edges.filter((h, k) => h !== k).length
    if (!best || moved < best.moved) best = { auf: t, corners, edges, moved }
  }
  return best
}

/** 置換を巡回の文字列にする(例:「上 ↔ 左上」「上 → 左上 → 右下 → 上」) */
export function cycles(perm, names) {
  const seen = new Set()
  const out = []
  for (let i = 0; i < perm.length; i++) {
    if (seen.has(i) || perm[i] === i) continue
    const cyc = []
    for (let j = i; !seen.has(j); j = perm[j]) {
      seen.add(j)
      cyc.push(names[j])
    }
    out.push(cyc.length === 2 ? `${cyc[0]} ↔ ${cyc[1]}` : `${cyc.join(' → ')} → ${cyc[0]}`)
  }
  return out
}
