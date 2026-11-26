// ある特徴が、指定の位置に来るケースと向き(rotate)を探す(汎用)。基礎知識の例の図を選ぶときなどに使う。
// 使い方:
//   node search.mjs 偽バー                 下(手前)の面にある例(既定)
//   node search.mjs 偽ペア --where 右下    where の文字列を含む例(面・頂点の呼び方。references/stickers.md)
//   node search.mjs ブロック --only        その特徴のほかに、同じ種類の特徴が無い向きだけ
//   node search.mjs バー --group F --limit 5
//   node search.mjs Yペア --anywhere         位置を問わず、その特徴があるケースを全部(ケースの図の向きだけ。全ケースを横断して確かめるとき)
// ブロックの中のペアは、運営者の数え方ではペアでないので、ペアを探すときは除く(--with-block で含める)
import { PLL_CASES, colorsOf, features } from './lib.mjs'

const args = process.argv.slice(2)
const kind = args[0]
let where = '下(手前)'
let group
let limit = 10
let only = false
let anywhere = false
let withBlock = false
for (let i = 1; i < args.length; i++) {
  if (args[i] === '--where') where = args[++i]
  else if (args[i] === '--group') group = args[++i]
  else if (args[i] === '--limit') limit = Number(args[++i])
  else if (args[i] === '--only') only = true
  else if (args[i] === '--anywhere') anywhere = true
  else if (args[i] === '--with-block') withBlock = true
}
if (!kind) {
  console.error('使い方: node search.mjs <特徴> [--where 位置] [--group G] [--limit n] [--only] [--anywhere] [--with-block]')
  process.exit(1)
}

const hits = []
for (const c of PLL_CASES) {
  if (group && c.group !== group) continue
  if (anywhere) {
    const fs = features(colorsOf(c.name)).filter((f) => f.kind === kind && (withBlock || !f.inBlock))
    if (fs.length) hits.push(`${c.name}(${c.group}): ${fs.map((f) => `${f.where} [${f.show.join(', ')}]`).join(' / ')}`)
    continue
  }
  for (let r = 0; r < 5; r++) {
    const fs = features(colorsOf(c.name, r)).filter((f) => f.kind === kind && (withBlock || !f.inBlock))
    const at = fs.filter((f) => f.where.includes(where))
    if (!at.length || (only && fs.length > 1)) continue
    hits.push(`${c.name} rotate ${r}: ${at[0].where}  show: [${at[0].show.join(', ')}]`)
  }
}
console.log(`${kind}(${anywhere ? 'どこでも' : where})の例: ${hits.length} 件`)
for (const h of hits.slice(0, limit)) console.log(`  ${h}`)
