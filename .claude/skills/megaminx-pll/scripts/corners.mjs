// ケースで、どのコーナー・エッジがどこへ動くかを、図の向き(rotate 0)の位置で出す(汎用)。
// AUF のずれは打ち消す(U を足して、動くピースが最も少ない状態で数える)。
// 使い方:
//   node corners.mjs E1 E2 E3
//   node corners.mjs --group A
//   node corners.mjs --arrows H1+     矢印の組(megaminx-image 1.2.0 の arrows)も出す
import { E, FACE_NAMES, PLL_CASES, VERTEX_NAMES, cycles, permutation } from './lib.mjs'

const args = process.argv.slice(2)
const names = []
let withArrows = false
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--group') {
    const g = args[++i]
    names.push(...PLL_CASES.filter((c) => c.group === g).map((c) => c.name))
  } else if (args[i] === '--arrows') withArrows = true
  else names.push(args[i])
}
if (!names.length) {
  console.error('使い方: node corners.mjs [--arrows] [--group G] <ケース名...>')
  process.exit(1)
}

/** 置換から矢印の組を作る(動くピースだけ。向きは「揃えるには from のピースが to へ行く」) */
const toArrows = (perm, sticker) => perm.flatMap((h, i) => (h === i ? [] : [[sticker(i), sticker(h)]]))

const edgeNames = FACE_NAMES.map((n) => `${n}の面のエッジ`)
for (const name of names) {
  const p = permutation(name)
  const fixedCorners = p.corners.map((h, v) => (h === v ? VERTEX_NAMES[v] : null)).filter(Boolean)
  console.log(`■ ${name}(揃えるには、手順のあと U を ${p.auf} 回分ずれている状態として数えた)`)
  console.log(
    `  コーナー: ${cycles(p.corners, VERTEX_NAMES).join('、') || '動かない'}${fixedCorners.length && fixedCorners.length < 5 ? `(動かない: ${fixedCorners.join('・')})` : ''}`,
  )
  console.log(`  エッジ  : ${cycles(p.edges, edgeNames).join('、') || '動かない'}`)
  if (withArrows) {
    // コーナーは上面の角(頂点 v → 1 + 2v)、エッジは側面のエッジ(面 k → E(k))で示す
    const fmt = (as) => (as.length ? `[${as.map(([a, b]) => `[${a}, ${b}]`).join(', ')}]` : '(なし)')
    console.log(`  矢印(コーナー、上面の角): ${fmt(toArrows(p.corners, (v) => 1 + 2 * v))}`)
    console.log(`  矢印(エッジ、側面)      : ${fmt(toArrows(p.edges, E))}`)
    if (p.auf) console.log(`  ※ AUF を除いた動きの矢印。図のままでは、ほかに U を ${p.auf} 回分ずれている`)
  }
  console.log('  ※「X → Y」は、図で X の位置にあるピースが、揃ったときに Y の位置へ行くこと')
}
