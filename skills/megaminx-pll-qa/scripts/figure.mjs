// ケースの図(SVG)を作る。特徴だけに色を残した図、ピースの動きの矢印、記事の判断の図も描ける。
// 使い方:
//   node figure.mjs A1+                          ケースの図(記事と同じ向き)
//   node figure.mjs A1+ --rotate 2               上面を時計回りに 2 回回した向き
//   node figure.mjs A1+ --feature ブロック        その種類の特徴だけに色を残す(何度でも書ける)
//   node figure.mjs A1+ --feature 偽ペア@右下     where に「右下」を含む偽ペアだけ
//   node figure.mjs A1+ --show 17,18,19          番号を指定して色を残す(references/stickers.md)
//   node figure.mjs A1+ --arrows corners         ピースの動きの矢印(corners・edges・all)
//   node figure.mjs A1+ --mark 0                 記事の判断の図(0 から数える。cases の「判断の図」の番号)
//   node figure.mjs --alg "R U R' ..."           手順で揃うケースの図(ケース名が分からないとき)
//   node figure.mjs --setup "R U R' ..."         揃った状態にこの手順を回した状態の図
//   --size 300(既定)、--out 出力先(既定は ./<名前>.svg)、--background なし にすると透明
import { readFileSync, writeFileSync } from 'node:fs'
import { E, algOf, caseOf, colorsOfAlg, features, permutationOfAlg, svg, toArrows, withoutLeadingAuf } from './lib.mjs'

const args = process.argv.slice(2)
let name
let caseAlg
let setupAlg
let rotate = 0
let mark
let show
const featureQueries = []
let arrowKind
let size = 300
let out
let background = '#ffffff'
for (let i = 0; i < args.length; i++) {
  const a = args[i]
  if (a === '--rotate') rotate = Number(args[++i])
  else if (a === '--mark') mark = Number(args[++i])
  else if (a === '--show')
    show = args[++i]
      .split(/[,\s]+/)
      .filter(Boolean)
      .map(Number)
  else if (a === '--feature') featureQueries.push(args[++i])
  else if (a === '--arrows') arrowKind = args[++i]
  else if (a === '--size') size = Number(args[++i])
  else if (a === '--out') out = args[++i]
  else if (a === '--background') background = args[++i] === 'なし' ? null : args[i]
  else if (a === '--alg') caseAlg = args[++i]
  else if (a === '--setup') setupAlg = args[++i]
  else name = a
}
if (!name && !caseAlg && !setupAlg) {
  console.error(
    '使い方: node figure.mjs <ケース名> [--rotate n] [--feature 種類[@位置]] [--show 番号,...] [--arrows corners|edges|all] [--mark i] [--size n] [--out file.svg]',
  )
  process.exit(1)
}
if (name) {
  name = caseOf(name).name
  caseAlg = algOf(name)
}

const options = { size, background }
const notes = []
let arrows = []

if (mark !== undefined) {
  // 記事の判断の図。data/article.json(記事から生成)の show・arrows・start をそのまま使う
  if (!name) throw new Error('--mark はケース名と一緒に使ってください')
  const article = JSON.parse(readFileSync(new URL('./data/article.json', import.meta.url), 'utf8'))
  const marks = article.cases[name]?.marks ?? []
  const m = marks[mark]
  if (!m) throw new Error(`${name} の記事の判断の図は ${marks.length} 枚です(0 から数える)`)
  options.case = m.start ? withoutLeadingAuf(caseAlg) : caseAlg
  options.show = m.show
  if (m.arrows) options.arrows = m.arrows
  notes.push(
    `記事の判断の図 ${mark}「${(m.label ?? '').replace(/\n/g, '')}」${m.start ? '(手順の先頭の AUF を回した後の向き)' : ''}`,
  )
} else {
  if (setupAlg) options.alg = setupAlg
  else options.case = caseAlg
  options.rotate = rotate
  if (featureQueries.length || show) {
    const s = setupAlg ? colorsOfAlgSetup(setupAlg, rotate) : colorsOfAlg(caseAlg, rotate)
    const all = features(s)
    const picked = new Set(show ?? [])
    for (const q of featureQueries) {
      const [kind, where] = q.split('@')
      const hits = all.filter((f) => f.kind === kind && (!where || f.where.includes(where)) && !f.inBlock)
      if (!hits.length) {
        throw new Error(
          `この向きの図に「${q}」はありません。ある特徴: ${[...new Set(all.map((f) => f.kind))].join('・') || 'なし'}`,
        )
      }
      for (const f of hits) {
        f.show.forEach((n) => picked.add(n))
        notes.push(`${f.kind}:${f.where}`)
      }
    }
    options.show = [...picked].sort((a, b) => a - b)
  }
  if (arrowKind) {
    if (setupAlg) throw new Error('--arrows はケース名か --alg と一緒に使ってください')
    // rotate の向きで数えるため、図の状態に U を rotate 回足した状態(手順の前に U' を置く)の動きを求める
    const p = permutationOfAlg(`${"U' ".repeat(((rotate % 5) + 5) % 5)}${caseAlg}`)
    if (arrowKind === 'corners' || arrowKind === 'all') arrows.push(...toArrows(p.corners, (v) => 1 + 2 * v))
    if (arrowKind === 'edges' || arrowKind === 'all') arrows.push(...toArrows(p.edges, E))
    if (arrows.length) options.arrows = arrows
    notes.push(
      `矢印:揃えるには矢印の元のピースが先へ行く${p.auf ? `(AUF を除いた動き。図のままでは、ほかに U を ${p.auf} 回分ずれている)` : ''}`,
    )
  }
}

function colorsOfAlgSetup(alg, r) {
  return colorsOfAlg(`(${alg})'`, r)
}

const file = out ?? `${(name ?? 'figure').replace(/[^\w+-]/g, '_')}${mark !== undefined ? `-mark${mark}` : ''}.svg`
writeFileSync(file, svg(options))
console.log(`書き出した: ${file}`)
if (rotate && mark === undefined) console.log(`向き: rotate ${rotate}`)
for (const n of notes) console.log(`  ${n}`)
