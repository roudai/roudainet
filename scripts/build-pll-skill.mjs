// Claude アプリ用のスキル megaminx-pll-qa を組み立てて zip にする。
// 使い方: node scripts/build-pll-skill.mjs [出力先(既定は .skill-build)] [--site 静的サイトの出力(.output/public)]
//   --site を付けると、zip をサイトの /megaminx/megaminx-pll-qa.zip にも置く(pnpm generate が付けて動かす。記事のページから落とせる)
//
// - skills/megaminx-pll-qa/ の手で書いた部分(SKILL.md、用語、スクリプト)を写す
// - megaminx-image(node_modules の dist)を scripts/vendor/ に同梱する(アプリで npm install しなくても動くように)
// - 記事(app/data/megaminx/pll-*.ts)から、references/article/ の Markdown と scripts/data/article.json を作る。
//   ケースごとに、手順・記事の判断基準・判断の図に加えて、計算した特徴とピースの動きも書いておく
//   (アプリでコード実行がオフでも、正確に答えられるように)
// - 記事を直したら、これを動かし直して zip を入れ直す
import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pllBasics, pllBasicsIntro } from '../app/data/megaminx/pll-basics.ts'
import { pllMarks, pllRecognition, pllStageNotes } from '../app/data/megaminx/pll-recognition.ts'
import { pllGroupNotes, pllStages } from '../app/data/megaminx/pll-stages.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const siteIndex = args.indexOf('--site')
const site = siteIndex >= 0 ? resolve(args.splice(siteIndex, 2)[1]) : undefined
const outRoot = resolve(args[0] ?? join(root, '.skill-build'))
const name = 'megaminx-pll-qa'
const dir = join(outRoot, name)
const PAGE = 'https://roudai.net/megaminx/megaminx-pll'

rmSync(dir, { recursive: true, force: true })
rmSync(join(outRoot, `${name}.zip`), { force: true })
mkdirSync(outRoot, { recursive: true })
cpSync(join(root, 'skills', name), dir, { recursive: true })

// 版:記事のデータ・スキルの元・このスクリプトを最後に変えたコミットの日付とハッシュ。SKILL.md に書き込む
const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8' }).trim()
const inputs = ['app/data/megaminx', 'skills', 'scripts/build-pll-skill.mjs']
const last = git('log', '-1', '--format=%cs %h', '--', ...inputs)
// 履歴が浅い(git clone --depth 1)と、入力を変えたコミットが見つからない。版を正しく出せないので止める
if (!last) throw new Error('入力を最後に変えたコミットが見つかりません(履歴が浅い場合は、深く取り直してください)')
const [date, hash] = last.split(' ')
const dirty = git('status', '--porcelain', '--', ...inputs) !== ''
const release = `${date}${dirty ? '+未コミット' : ` (${hash})`}`
{
  const skillMd = join(dir, 'SKILL.md')
  const text = readFileSync(skillMd, 'utf8')
  const marker = '記事の内容は、このスキルを作った時点のもの。'
  if (!text.includes(marker)) throw new Error(`SKILL.md に「${marker}」が見つかりません`)
  writeFileSync(skillMd, text.replace(marker, `このスキルの版は ${release}。記事の内容は、この日付の時点のもの。`))
}

// megaminx-image を同梱する。PNG の書き出し(png.js)は別のパッケージが要るので外す
const lib = join(root, 'node_modules', 'megaminx-image')
const vendor = join(dir, 'scripts', 'vendor', 'megaminx-image')
cpSync(join(lib, 'dist'), vendor, {
  recursive: true,
  filter: (src) => !src.endsWith('.d.ts') && !/[\\/]png\.js$/.test(src),
})
cpSync(join(lib, 'LICENSE'), join(vendor, 'LICENSE'))
const { version } = JSON.parse(execFileSync('node', ['-p', 'JSON.stringify(require("./package.json"))'], { cwd: lib }))
writeFileSync(join(vendor, 'VERSION'), `megaminx-image ${version}(MIT。roudai/megaminx-image の dist を写したもの)\n`)

const {
  FACE_NAMES,
  PLL_CASES,
  VERTEX_NAMES,
  caseOf,
  colorsOfAlg,
  cycles,
  features,
  isSymmetric,
  permutationOfAlg,
  withoutLeadingAuf,
} = await import(pathToFileURL(join(dir, 'scripts', 'lib.mjs')).href)

/** 注釈の中で探す特徴の名前(長い順) */
const KINDS = [
  '偽3x2ブロック',
  '偽逆Jブロック',
  '偽Jブロック',
  '偽ヘッドライト',
  '3x2ブロック',
  '逆Jブロック',
  'Jブロック',
  '左Rブロック',
  '右Rブロック',
  'ヘッドライト',
  '偽ブロック',
  'Yペア',
  '偽バー',
  '偽ペア',
  'ブロック',
  'バー',
  'ペア',
]
const oneLine = (s) => s.replace(/\n/g, '')
const fileOf = (label) => `${label.replaceAll('–', '-')}.md`
const stageOf = new Map(pllStages.flatMap((st) => st.cases.map((c, i) => [c, { stage: st, index: i }])))
const warnings = []

mkdirSync(join(dir, 'references', 'article'), { recursive: true })

// 基礎知識
{
  const lines = [
    '# 記事:基礎知識',
    '',
    `出典:roudai.net「Megaminx PLL」の「基礎知識」タブ(${PAGE}#basics)。記事のデータから生成したもの。`,
    '',
    ...pllBasicsIntro.flatMap((p) => [p, '']),
  ]
  for (const row of pllBasics) {
    for (const box of row) {
      lines.push(`## ${box.title}`, '', ...box.paragraphs.flatMap((p) => [p, '']))
      for (const ex of box.examples ?? []) {
        const what = ex.pll ? `${ex.pll} の図` : `手順「${ex.case}」で揃う図`
        const cmd = ex.pll
          ? `node scripts/figure.mjs ${ex.pll}${ex.rotate ? ` --rotate ${ex.rotate}` : ''}${ex.show ? ` --show ${ex.show.join(',')}` : ''}`
          : ''
        lines.push(
          `- 例の図:${what}${ex.rotate ? `(rotate ${ex.rotate})` : ''}${ex.show ? `、色を残すステッカー [${ex.show.join(', ')}]` : ''}${ex.label ? `、注釈「${oneLine(ex.label)}」` : ''}${cmd ? `。描くなら \`${cmd}\`` : ''}`,
        )
      }
      if (box.examples?.length) lines.push('')
    }
  }
  writeFileSync(join(dir, 'references', 'article', 'basics.md'), lines.join('\n'))
}

// 段階の一覧
{
  const lines = [
    '# 記事:覚える順の 27 段階',
    '',
    `出典:roudai.net「Megaminx PLL」(${PAGE})。覚える順は、さむぶろぐ「Megaminx PLL 全手順会議議事録」`,
    '前編(http://sumblog.net/archives/40859395.html)・後編(http://sumblog.net/archives/40977418.html)による。',
    '段階ごとの詳しい中身(ケースの手順・判断基準・計算した特徴)は cases/ の各ファイル。',
    '',
    '| 順 | 段階 | グループの説明 | ケース(覚える順) | ファイル |',
    '| --- | --- | --- | --- | --- |',
  ]
  pllStages.forEach((st, i) => {
    const group = caseOf(st.cases[0]).group
    lines.push(
      `| ${i + 1} | ${st.label} | ${pllGroupNotes[group]} | ${st.cases.join('・')} | cases/${fileOf(st.label)} |`,
    )
  })
  lines.push('', '## 段階の説明(記事の各タブの冒頭の文)', '')
  for (const st of pllStages) lines.push(`- **${st.label}**:${pllStageNotes[st.label] || '(記事に説明なし)'}`)
  writeFileSync(join(dir, 'references', 'article', 'stages.md'), lines.join('\n') + '\n')
}

// ケース
const article = { cases: {} }
const edgeNames = FACE_NAMES.map((n) => `${n}の面のエッジ`)
mkdirSync(join(dir, 'references', 'article', 'cases'), { recursive: true })
for (const st of pllStages) {
  const lines = [
    `# 段階 ${st.label}`,
    '',
    `出典:roudai.net「Megaminx PLL」の「${st.label}」タブ(${PAGE}#${st.label.replaceAll('–', '-')})。記事のデータから生成したもの。`,
    '「記事」の項は記事の文章そのまま、「計算」の項は megaminx-image で計算したもの(ケースの図と同じ向き、rotate 0)。',
    '',
    `段階の説明(記事):${pllStageNotes[st.label] || '(なし)'}`,
    '',
  ]
  for (const caseName of st.cases) {
    const c = caseOf(caseName)
    const { index } = stageOf.get(caseName)
    const marks = pllMarks[caseName] ?? []
    article.cases[caseName] = { stage: st.label, marks }
    const fs = features(colorsOfAlg(c.alg))
    const loose = fs.filter((f) => f.kind === 'ペア' && !f.inBlock).length
    const p = permutationOfAlg(c.alg)
    const fixedCorners = p.corners.map((h, v) => (h === v ? VERTEX_NAMES[v] : null)).filter(Boolean)
    const fixedEdges = p.edges.map((h, k) => (h === k ? FACE_NAMES[k] : null)).filter(Boolean)
    lines.push(
      `## ${caseName}`,
      '',
      `- グループ:${c.group}(${pllGroupNotes[c.group]})。段階 ${st.label} の ${index + 1} 番目に覚える`,
      `- 手順:\`${c.alg}\``,
      `- ケースを作る手順(揃った状態から):\`${c.setup}\``,
      // 確率は、ほとんどが 1/144 で答えに入れても意味が薄いので、1/720 の 5 回対称のケースだけ書く(ほかは基礎知識の豆知識の枠)
      ...(isSymmetric(c.alg) ? ['- 5 回対称(U で回しても同じ形)のため、出る確率は 1/720'] : []),
      '',
      '### 記事の判断基準',
      '',
      ...((pllRecognition[caseName] ?? []).length
        ? pllRecognition[caseName].flatMap((t) => [t, ''])
        : ['(記事に判断基準の文章なし)', '']),
    )
    if (marks.length) {
      lines.push('### 記事の判断の図', '')
      marks.forEach((m, i) => {
        const caseForMark = m.start ? withoutLeadingAuf(c.alg) : c.alg
        const shown = new Set(m.show)
        const inside = features(colorsOfAlg(caseForMark)).filter((f) => !f.inBlock && f.show.every((n) => shown.has(n)))
        lines.push(
          `${i}. 注釈「${oneLine(m.label ?? '')}」${m.start ? '(手順の先頭の AUF を回した後の向き)' : ''}。色を残すステッカー [${m.show.join(', ')}]` +
            `${m.arrows ? `、矢印 ${JSON.stringify(m.arrows)}` : ''}。` +
            `図に収まる特徴(計算):${inside.map((f) => `${f.kind}(${f.where})`).join('、') || 'なし(色を見る図)'}。` +
            `描くなら \`node scripts/figure.mjs ${caseName} --mark ${i}\``,
        )
        // 注釈に書いた特徴の名前が、図の中に本当にあるかを確かめる(記事の注釈と計算の食い違いを見つける)。
        // 長い名前から順に注釈の中を探す(「偽逆Jブロック」を「Jブロック」と読まないため)。
        // 「〜と絡まない」「〜の(形の・色の)」の部分は修飾なので、図に無くてよい(「Yペアの形の偽ペア」は偽ペアだけを見る)
        let rest = oneLine(m.label ?? '')
          .replace(/[^、\s]*と絡まない/g, '')
          .replace(/^.*の/, '')
        for (const kind of KINDS) {
          if (!rest.includes(kind)) continue
          rest = rest.replaceAll(kind, '|')
          if (!inside.some((f) => f.kind === kind)) {
            warnings.push(`${caseName} の図 ${i}「${oneLine(m.label ?? '')}」:図の中に ${kind} が見つからない`)
          }
        }
      })
      lines.push('')
    }
    lines.push(
      '### 計算:図の特徴',
      '',
      `ブロック・バーの外のペア:${loose} 個`,
      '',
      ...fs.map((f) => `- ${f.kind}:${f.where}  show [${f.show.join(', ')}]`),
      ...(fs.length ? [] : ['- (なし)']),
      '',
      '### 計算:ピースの動き',
      '',
      `揃えるには、手順のあと U を ${p.auf} 回分ずれている状態として数えた(AUF を除いた動き)。「X → Y」は、図で X にあるピースが揃ったときに Y へ行くこと。`,
      '',
      `- コーナー:${cycles(p.corners, VERTEX_NAMES).join('、') || '動かない'}${fixedCorners.length && fixedCorners.length < 5 ? `(動かない:${fixedCorners.join('・')})` : ''}`,
      `- エッジ:${cycles(p.edges, edgeNames).join('、') || '動かない'}${fixedEdges.length && fixedEdges.length < 5 ? `(動かない:${fixedEdges.join('・')})` : ''}`,
      '',
    )
  }
  writeFileSync(join(dir, 'references', 'article', 'cases', fileOf(st.label)), lines.join('\n'))
}
mkdirSync(join(dir, 'scripts', 'data'), { recursive: true })
writeFileSync(join(dir, 'scripts', 'data', 'article.json'), JSON.stringify(article, null, 1) + '\n')

// 全ケースが段階に入っているか
const missing = PLL_CASES.map((c) => c.name).filter((n) => !stageOf.has(n))
if (missing.length) warnings.push(`段階に入っていないケース: ${missing.join(', ')}`)
// 5 回対称のケースの数(記事の基礎知識では 9)
const symmetric = PLL_CASES.filter((c) => isSymmetric(c.alg)).map((c) => c.name)
console.log(`5 回対称(1/720)のケース: ${symmetric.length} 件(${symmetric.join('・')})`)

execFileSync('zip', ['-qr', `${name}.zip`, name, '-x', '*.DS_Store'], { cwd: outRoot })
const count = (d) => readdirSync(d, { recursive: true }).length
console.log(`組み立てた: ${dir}(${count(dir)} 個のファイル)`)
console.log(`zip: ${join(outRoot, `${name}.zip`)}`)
if (site) {
  mkdirSync(join(site, 'megaminx'), { recursive: true })
  cpSync(join(outRoot, `${name}.zip`), join(site, 'megaminx', `${name}.zip`))
  console.log(`サイトに置いた: ${join(site, 'megaminx', `${name}.zip`)}`)
}
console.log(`版: ${release}${dirty ? '(配布する前にコミットする)' : ''}`)
for (const w of warnings) console.warn(`注意: ${w}`)
