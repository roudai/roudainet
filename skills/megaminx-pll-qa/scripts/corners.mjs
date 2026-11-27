// ケースで、どのコーナー・エッジがどこへ動くかを、図の向き(rotate 0)の位置で出す。
// AUF のずれは打ち消す(U を足して、動くピースが最も少ない状態で数える)。
// 使い方:
//   node corners.mjs E1 E2 E3
//   node corners.mjs --group A
//   node corners.mjs --alg "R U R' ..."   手順で揃うケース
//   node corners.mjs --arrows H1+         矢印の組(figure.mjs の --arrows と同じもの)も出す
import { E, FACE_NAMES, PLL_CASES, VERTEX_NAMES, algOf, caseOf, cycles, permutationOfAlg, toArrows } from './lib.mjs'

const args = process.argv.slice(2)
const targets = []
let withArrows = false
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--group') {
    const g = args[++i]
    targets.push(...PLL_CASES.filter((c) => c.group === g).map((c) => ({ name: c.name, alg: c.alg })))
  } else if (args[i] === '--alg') {
    const alg = args[++i]
    targets.push({ name: `手順「${alg}」で揃うケース`, alg })
  } else if (args[i] === '--arrows') withArrows = true
  else targets.push({ name: caseOf(args[i]).name, alg: algOf(args[i]) })
}
if (!targets.length) {
  console.error('使い方: node corners.mjs [--arrows] [--group G] [--alg 手順] <ケース名...>')
  process.exit(1)
}

const edgeNames = FACE_NAMES.map((n) => `${n}の面のエッジ`)
for (const { name, alg } of targets) {
  const p = permutationOfAlg(alg)
  const fixedCorners = p.corners.map((h, v) => (h === v ? VERTEX_NAMES[v] : null)).filter(Boolean)
  const fixedEdges = p.edges.map((h, k) => (h === k ? FACE_NAMES[k] : null)).filter(Boolean)
  console.log(`■ ${name}(揃えるには、手順のあと U を ${p.auf} 回分ずれている状態として数えた)`)
  console.log(
    `  コーナー: ${cycles(p.corners, VERTEX_NAMES).join('、') || '動かない'}${fixedCorners.length && fixedCorners.length < 5 ? `(動かない: ${fixedCorners.join('・')})` : ''}`,
  )
  console.log(
    `  エッジ  : ${cycles(p.edges, edgeNames).join('、') || '動かない'}${fixedEdges.length && fixedEdges.length < 5 ? `(動かない: ${fixedEdges.join('・')})` : ''}`,
  )
  if (withArrows) {
    const fmt = (as) => (as.length ? `[${as.map(([a, b]) => `[${a}, ${b}]`).join(', ')}]` : '(なし)')
    console.log(`  矢印(コーナー、上面の角): ${fmt(toArrows(p.corners, (v) => 1 + 2 * v))}`)
    console.log(`  矢印(エッジ、側面)      : ${fmt(toArrows(p.edges, E))}`)
  }
  console.log('  ※「X → Y」は、図で X の位置にあるピースが、揃ったときに Y の位置へ行くこと')
}
