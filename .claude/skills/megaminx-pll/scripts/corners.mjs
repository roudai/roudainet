// ケースで、どのコーナー・エッジがどこへ動くかを、図の向き(rotate 0)の位置で出す(汎用)。
// AUF のずれは打ち消す(U を足して、動くピースが最も少ない状態で数える)。
// 使い方:node corners.mjs E1 E2 E3   /   node corners.mjs --group A
import { FACE_NAMES, PLL_CASES, VERTEX_NAMES, cycles, permutation } from './lib.mjs'

const args = process.argv.slice(2)
const names = []
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--group') {
    const g = args[++i]
    names.push(...PLL_CASES.filter((c) => c.group === g).map((c) => c.name))
  }
  else names.push(args[i])
}
if (!names.length) {
  console.error('使い方: node corners.mjs [--group G] <ケース名...>')
  process.exit(1)
}

const edgeNames = FACE_NAMES.map((n) => `${n}の面のエッジ`)
for (const name of names) {
  const p = permutation(name)
  const fixedCorners = p.corners.map((h, v) => (h === v ? VERTEX_NAMES[v] : null)).filter(Boolean)
  console.log(`■ ${name}(揃えるには、手順のあと U を ${p.auf} 回分ずれている状態として数えた)`)
  console.log(`  コーナー: ${cycles(p.corners, VERTEX_NAMES).join('、') || '動かない'}${fixedCorners.length && fixedCorners.length < 5 ? `(動かない: ${fixedCorners.join('・')})` : ''}`)
  console.log(`  エッジ  : ${cycles(p.edges, edgeNames).join('、') || '動かない'}`)
  console.log('  ※「X → Y」は、図で X の位置にあるピースが、揃ったときに Y の位置へ行くこと')
}
