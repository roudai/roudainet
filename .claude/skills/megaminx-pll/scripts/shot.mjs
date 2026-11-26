// roudai.net の Megaminx PLL のページを、確認用のサーバーから画像に撮る(サイト固有)。
// 先に pnpm generate と node scripts/preview.mjs <port> でサーバーを立ち上げておく。
// 使い方:
//   node shot.mjs E                      E のタブ全体を撮る
//   node shot.mjs E --case E2            E2 のケースの枠だけを撮る
//   node shot.mjs basics --width 375     基礎知識のタブを、スマホの幅で撮る
//   オプション:--port 3556(既定)、--width 1200(既定)、--out 保存先(既定は OS の一時フォルダの pll-<タブ>[-<ケース>].png)
// Playwright は、環境変数 PLAYWRIGHT_PATH(index.mjs のパス)か、既定の megaminx-image のリポジトリのものを使う。
import { homedir, tmpdir } from 'node:os'
import { pathToFileURL } from 'node:url'

const args = process.argv.slice(2)
let port = 3556
let width = 1200
let caseName
let out
const rest = []
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port') port = Number(args[++i])
  else if (args[i] === '--width') width = Number(args[++i])
  else if (args[i] === '--case') caseName = args[++i]
  else if (args[i] === '--out') out = args[++i]
  else rest.push(args[i])
}
const tab = rest[0]
if (!tab) {
  console.error('使い方: node shot.mjs <タブのハッシュ(basics, F1, E, F2-5 など)> [--case 名前] [--width n] [--port n] [--out 保存先]')
  process.exit(1)
}
out ??= `${tmpdir()}/pll-${tab}${caseName ? `-${caseName}` : ''}.png`

const pwPath = process.env.PLAYWRIGHT_PATH ?? `${homedir()}/GitHub/roudainet/megaminx-image/node_modules/playwright/index.mjs`
const { chromium } = await import(pathToFileURL(pwPath).href)
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 })
  await page.goto(`http://localhost:${port}/megaminx/megaminx-pll#${tab}`, { waitUntil: 'networkidle' })
  const panel = page.locator(`#pll-tab-${tab}`)
  const target = caseName ? panel.locator('div.rounded', { has: page.locator('h4', { hasText: new RegExp(`^${caseName.replace(/[+]/g, '\\+')}$`) }) }).first() : panel
  await target.screenshot({ path: out })
  console.log(out)
} finally {
  await browser.close()
}
