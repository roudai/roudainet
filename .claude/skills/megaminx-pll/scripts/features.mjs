// ケースの図の中の特徴(バー・ペア・ブロック・ヘッドライト・偽物)と、それを見せる show の番号を出す(汎用)。
// 使い方:
//   node features.mjs A1+ A1-          ケース名を並べる
//   node features.mjs --group E        グループ(PLL_CASES の group)のケースすべて
//   node features.mjs --rotate 2 F1+   図の向きを変えて調べる(上面を時計回りに回す回数)
//   node features.mjs --json A1+       JSON で出す
import { PLL_CASES, VERTEX_NAMES, colorName, colorsOf, corner, faceRows, features } from './lib.mjs'

const args = process.argv.slice(2)
let rotate = 0
let json = false
const names = []
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--rotate') rotate = Number(args[++i])
  else if (args[i] === '--json') json = true
  else if (args[i] === '--group') {
    const g = args[++i]
    names.push(...PLL_CASES.filter((c) => c.group === g).map((c) => c.name))
  }
  else names.push(args[i])
}
if (!names.length) {
  console.error('使い方: node features.mjs [--rotate n] [--json] [--group G] <ケース名...>')
  process.exit(1)
}

const result = names.map((name) => {
  const s = colorsOf(name, rotate)
  return {
    name,
    rotate,
    faces: faceRows(s),
    corners: VERTEX_NAMES.map((n, v) => `${n}: ${corner(v).map((i) => `${colorName(s[i])}(${i})`).join('|')}`),
    features: features(s),
  }
})

if (json) console.log(JSON.stringify(result, null, 2))
else {
  for (const r of result) {
    console.log(`■ ${r.name}${r.rotate ? `(rotate ${r.rotate})` : ''}`)
    console.log('  面(左のコーナー・エッジ・右のコーナー)')
    for (const f of r.faces) console.log(`    ${f}`)
    console.log('  頂点のコーナー(面 v-1 側|面 v 側)')
    for (const c of r.corners) console.log(`    ${c}`)
    console.log('  特徴')
    for (const f of r.features) console.log(`    ${f.kind.padEnd(6, '　')} ${f.where}  show: [${f.show.join(', ')}]`)
    if (!r.features.length) console.log('    (なし)')
  }
}
