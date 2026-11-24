// 本番の現行サイト(https://roudai.net)と、`nuxt generate` の出力(.output/public)の本文を比べる。
// 契約: specs/002-cube-solution-pages/contracts/pages.md の「パリティの確認」
// 使い方: pnpm generate の後に `pnpm verify:parity [パス...]`(パスを省くと、移植済みの全ページ)
// 本番サイトへのネットワーク接続が必要なため、CI では実行しない(research.md の 5)。
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { migratedPages } from './pages.mjs'

const origin = 'https://roudai.net'
const outputDir = '.output/public'
const specFiles = [
  'specs/002-cube-solution-pages/spec.md',
  'specs/003-megaminx-clock-pages/spec.md',
  'specs/004-top-page/spec.md',
]

/** spec.md の「現行の表記から直した箇所」(004 は「現行の内容から更新した箇所」)の表から、ページごとの修正(現行の表記 → 修正後の表記)を読む */
function loadCorrections() {
  const corrections = []
  for (const file of specFiles) {
    if (!existsSync(file)) continue
    const text = readFileSync(file, 'utf8')
    // 002、003 は「現行の表記から直した箇所」、004 は「現行の内容から更新した箇所」(Constitution 1.2.0)
    const start = Math.max(text.indexOf('## 現行の表記から直した箇所'), text.indexOf('## 現行の内容から更新した箇所'))
    if (start === -1) continue
    const section = text.slice(start).split(/\n## /)[0]
    for (const line of section.split('\n')) {
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim())
      if (cells.length < 5 || !cells[0].startsWith('`/')) continue
      const [page, , before, after, reason] = cells
      // 理由に「候補」とあるものは、直していないので例外にしない
      if (reason.includes('候補')) continue
      corrections.push({ page: page.replaceAll('`', ''), ...splitCell('before', before), ...splitCell('after', after) })
    }
  }
  return corrections
}

function unquote(cell) {
  return cell.replace(/^`(.*)`$/, '$1')
}

/**
 * 表のセルを、テキストとリンク先に分ける。`テキスト(\`URL\`)` の形の URL をリンク先として取り出す(004 の情報の更新)。
 * URL のないセルは、従来どおりテキストだけを返す。
 */
function splitCell(key, cell) {
  const urls = [...cell.matchAll(/\(`([^`]+)`\)/g)].map((m) => m[1])
  const text = unquote(cell.replace(/\(`[^`]+`\)/g, '').trim())
  return { [key]: text, [`${key}Urls`]: urls }
}

/** 本文の領域(class に content と m-3 を持つ div)の HTML を取り出す */
function extractContent(html) {
  const open = /<div[^>]*class="[^"]*\bcontent\b[^"]*\bm-3\b[^"]*"[^>]*>/.exec(html)
  if (!open) return null
  let depth = 1
  const tag = /<\/?div\b[^>]*>/g
  tag.lastIndex = open.index + open[0].length
  let match
  while ((match = tag.exec(html))) {
    depth += match[0].startsWith('</') ? -1 : 1
    if (depth === 0) return html.slice(open.index + open[0].length, match.index)
  }
  return null
}

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
function decode(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, name) => {
    if (name[0] === '#') {
      const code = name[1] === 'x' || name[1] === 'X' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10)
      return String.fromCodePoint(code)
    }
    return entities[name.toLowerCase()] ?? whole
  })
}

/** 本文の HTML から、比較する値(テキスト、リンク先、図の要素の数)を取り出す */
function summarize(contentHtml) {
  const html = contentHtml
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
  const text = decode(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
  const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]*)"/gi)].map((m) => decode(m[1]))
  // 図の描画先: id を持つ div。中身は空(cubePNG、静的な HTML では空)か、SVG 1 つ(megaminx-image、005)
  const diagrams = [...html.matchAll(/<div\b[^>]*\bid="[^"]+"[^>]*>\s*(?:<svg\b[\s\S]*?<\/svg>\s*)?<\/div>/g)].length
  const imageSources = [...html.matchAll(/<img\b[^>]*\bsrc="([^"]*)"/gi)].map((m) => decode(m[1]))
  return { text, links, diagrams, imageSources }
}

/**
 * 画像は、URL ではなく中身(SHA-256)で比べる(Constitution 1.1.1)。
 * 現行サイトは、小さい画像を data URI でインライン化し、それ以外をハッシュ付きの URL で配信している。
 * 新サイトは、/images/ 以下のファイルとして配信する。
 */
async function imageDigest(src, base) {
  let bytes
  if (src.startsWith('data:')) {
    const [, meta, payload] = /^data:([^,]*),(.*)$/s.exec(src) ?? []
    bytes = meta?.endsWith(';base64') ? Buffer.from(payload, 'base64') : Buffer.from(decodeURIComponent(payload ?? ''))
  } else if (base === 'output') {
    const file = join(outputDir, src)
    if (!existsSync(file)) return `(ファイルがありません: ${src})`
    bytes = readFileSync(file)
  } else {
    const response = await fetch(new URL(src, origin))
    if (!response.ok) return `(取得に失敗しました: ${src})`
    bytes = Buffer.from(await response.arrayBuffer())
  }
  const name = src.startsWith('data:') ? 'data URI' : src.split('/').pop()
  return `${createHash('sha256').update(bytes).digest('hex').slice(0, 12)} (${name})`
}

async function imageDigests(sources, base) {
  const digests = []
  for (const src of sources) digests.push(await imageDigest(src, base))
  return digests
}

/** 最初に食い違う位置の前後を示す */
function firstDifference(a, b) {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i++
  const from = Math.max(0, i - 40)
  return `  位置 ${i}\n    現行: …${a.slice(from, i + 60)}…\n    新  : …${b.slice(from, i + 60)}…`
}

function compareLists(label, current, next) {
  const errors = []
  if (current.length !== next.length) errors.push(`${label}の数が違います(現行 ${current.length}、新 ${next.length})`)
  const missing = current.filter((item) => !next.includes(item))
  const extra = next.filter((item) => !current.includes(item))
  if (missing.length) errors.push(`${label}が新サイトにありません: ${missing.join(', ')}`)
  if (extra.length) errors.push(`${label}が現行にありません: ${extra.join(', ')}`)
  if (!errors.length && current.join('\n') !== next.join('\n')) errors.push(`${label}の順序が違います`)
  return errors
}

async function verifyPage(page, corrections) {
  const errors = []
  const notes = []

  const outputFile = join(outputDir, page, 'index.html')
  if (!existsSync(outputFile)) return { errors: [`${outputFile} がありません`], notes }
  const nextContent = extractContent(readFileSync(outputFile, 'utf8'))
  if (nextContent === null) return { errors: ['新サイトの本文の領域が見つかりません'], notes }

  const response = await fetch(page === '/' ? `${origin}/` : `${origin}${page}/`)
  if (!response.ok) return { errors: [`現行サイトの取得に失敗しました(HTTP ${response.status})`], notes }
  const currentContent = extractContent(await response.text())
  if (currentContent === null) return { errors: ['現行サイトの本文の領域が見つかりません'], notes }

  const current = summarize(currentContent)
  const next = summarize(nextContent)

  // 記録済みの誤字の修正は、現行の表記を修正後の表記に置き換えてから比べる
  for (const { page: target, before, after, beforeUrls, afterUrls } of corrections) {
    if (target !== page) continue
    if (current.text.includes(before)) {
      current.text = current.text.replaceAll(before, after)
      if (before !== after) notes.push(`記録済みの修正: 「${before}」→「${after}」`)
    } else {
      errors.push(`記録された修正の現行の表記「${before}」が、現行サイトに見つかりません`)
    }
    // リンク先の更新: 両方に URL があれば順に置き換え、修正後だけにあれば末尾に追加する
    if (beforeUrls.length && beforeUrls.length === afterUrls.length) {
      beforeUrls.forEach((url, i) => {
        const index = current.links.indexOf(url)
        if (index === -1) {
          errors.push(`記録されたリンク先「${url}」が、現行サイトに見つかりません`)
        } else {
          current.links[index] = afterUrls[i]
          notes.push(`記録済みのリンク先の更新: ${url} → ${afterUrls[i]}`)
        }
      })
    } else if (!beforeUrls.length && afterUrls.length) {
      current.links.push(...afterUrls)
      for (const url of afterUrls) notes.push(`記録済みのリンクの追加: ${url}`)
    } else if (beforeUrls.length) {
      errors.push(`記録されたリンク先の数が、現行と修正後で一致しません(「${before}」)`)
    }
  }

  if (current.text !== next.text) errors.push(`本文のテキストが違います\n${firstDifference(current.text, next.text)}`)
  errors.push(...compareLists('リンク先', current.links, next.links))
  const currentImages = await imageDigests(current.imageSources, 'origin')
  const nextImages = await imageDigests(next.imageSources, 'output')
  // 表示名(ファイル名や data URI)は配信方法で変わるため、中身のハッシュだけで比べる
  const hashOnly = (list) => list.map((item) => item.split(' ')[0])
  errors.push(...compareLists('画像(中身)', hashOnly(currentImages), hashOnly(nextImages)))
  if (current.diagrams !== next.diagrams) {
    errors.push(`図の要素の数が違います(現行 ${current.diagrams}、新 ${next.diagrams})`)
  }
  return { errors, notes }
}

if (!existsSync(outputDir)) {
  console.error(`${outputDir} がありません。先に pnpm generate を実行してください。`)
  process.exit(1)
}

const pages = process.argv.slice(2).length ? process.argv.slice(2) : migratedPages
const corrections = loadCorrections()
let failed = 0

for (const page of pages) {
  const { errors, notes } = await verifyPage(page, corrections)
  if (errors.length) {
    failed++
    console.error(`✗ ${page}`)
    for (const error of errors) console.error(`  - ${error}`)
  } else {
    console.log(`✓ ${page}`)
  }
  for (const note of notes) console.log(`  · ${note}`)
}

if (failed) {
  console.error(`\n${failed} / ${pages.length} ページに差分があります。`)
  process.exit(1)
}
console.log(`\n${pages.length} ページすべてで、現行サイトとの差分はありません(記録済みの修正を除く)。`)
