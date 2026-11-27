// ケースの図の中の特徴(バー・ペア・ブロック・ヘッドライト・偽ペア・偽バーなど)と、それを見せる show の番号を出す。
// 使い方:
//   node features.mjs A1+ A1-            ケース名を並べる
//   node features.mjs --group E          グループのケースすべて
//   node features.mjs --rotate 2 F1+     図の向きを変えて調べる(上面を時計回りに回す回数)
//   node features.mjs --alg "R U R' ..." 手順で揃うケースを調べる(ケース名が分からないとき)
//   node features.mjs --brief --group Y  特徴だけを出す(面の色・頂点のコーナーの一覧を省く)
//   node features.mjs --json A1+         JSON で出す
import { PLL_CASES, VERTEX_NAMES, algOf, caseOf, colorName, colorsOfAlg, corner, faceRows, features } from './lib.mjs'

const args = process.argv.slice(2)
let rotate = 0
let json = false
let brief = false
const targets = []
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--rotate') rotate = Number(args[++i])
  else if (args[i] === '--json') json = true
  else if (args[i] === '--brief') brief = true
  else if (args[i] === '--alg') {
    const alg = args[++i]
    targets.push({ name: `手順「${alg}」で揃うケース`, alg })
  } else if (args[i] === '--group') {
    const g = args[++i]
    targets.push(...PLL_CASES.filter((c) => c.group === g).map((c) => ({ name: c.name, alg: c.alg })))
  } else targets.push({ name: caseOf(args[i]).name, alg: algOf(args[i]) })
}
if (!targets.length) {
  console.error('使い方: node features.mjs [--rotate n] [--json] [--brief] [--group G] [--alg 手順] <ケース名...>')
  process.exit(1)
}

const result = targets.map(({ name, alg }) => {
  const s = colorsOfAlg(alg, rotate)
  return {
    name,
    rotate,
    faces: faceRows(s),
    corners: VERTEX_NAMES.map(
      (n, v) =>
        `${n}: ${corner(v)
          .map((i) => `${colorName(s[i])}(${i})`)
          .join('|')}`,
    ),
    features: features(s),
  }
})

if (json) console.log(JSON.stringify(result, null, 2))
else {
  for (const r of result) {
    console.log(`■ ${r.name}${r.rotate ? `(rotate ${r.rotate})` : ''}`)
    if (!brief) {
      console.log('  面(左のコーナー・エッジ・右のコーナー)')
      for (const f of r.faces) console.log(`    ${f}`)
      console.log('  頂点のコーナー(面 v-1 側|面 v 側)')
      for (const c of r.corners) console.log(`    ${c}`)
    }
    const loose = r.features.filter((f) => f.kind === 'ペア' && !f.inBlock).length
    console.log(`  特徴(ブロック・バーの外のペア: ${loose} 個)`)
    for (const f of r.features) console.log(`    ${f.kind.padEnd(6, '　')} ${f.where}  show: [${f.show.join(', ')}]`)
    if (!r.features.length) console.log('    (なし)')
  }
}
