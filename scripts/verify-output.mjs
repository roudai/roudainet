// `nuxt generate` の出力(.output/public)が、公開物の要件を満たしているかを確認する。
// 要件: specs/001-site-foundation/spec.md の FR-013、FR-014(原則 III)
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const outputDir = '.output/public'
const legacyAppAds = 'legacy/pages/app-ads.txt'
// Web サイトに含めてはならない、Google 広告の痕跡
const adPatterns = [/adsbygoogle/i, /googlesyndication/i, /google[-_]adsense/i, /google_ad_client/i, /pagead2/i]

const errors = []

if (!existsSync(outputDir)) {
  console.error(`${outputDir} がありません。先に pnpm generate を実行してください。`)
  process.exit(1)
}

// CNAME: 独自ドメインの維持
const cnamePath = join(outputDir, 'CNAME')
if (!existsSync(cnamePath)) {
  errors.push('CNAME がありません')
} else if (readFileSync(cnamePath, 'utf8').trim() !== 'roudai.net') {
  errors.push('CNAME の内容が roudai.net ではありません')
}

// app-ads.txt: アプリの広告配信元の検証用。内容は変更しない
const appAdsPath = join(outputDir, 'app-ads.txt')
if (!existsSync(appAdsPath)) {
  errors.push('app-ads.txt がありません')
} else if (existsSync(legacyAppAds) && !readFileSync(appAdsPath).equals(readFileSync(legacyAppAds))) {
  // legacy/ が残っている間だけ、移植元との同一性を確認する(legacy/ は移行完了後に削除される)
  errors.push(`app-ads.txt が ${legacyAppAds} と一致しません`)
}

if (!existsSync(join(outputDir, 'favicon.ico'))) {
  errors.push('favicon.ico がありません')
}

// ads.txt: Web サイトの広告を廃止するため、含めない
if (existsSync(join(outputDir, 'ads.txt'))) {
  errors.push('ads.txt が含まれています(含めてはならない)')
}

// 広告のスクリプト、広告枠、広告用の meta タグが含まれていないこと
const textExtensions = new Set(['.html', '.js', '.mjs', '.css', '.json'])
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

for (const file of walk(outputDir).filter((f) => textExtensions.has(extname(f)))) {
  const text = readFileSync(file, 'utf8')
  for (const pattern of adPatterns) {
    if (pattern.test(text)) errors.push(`${file} に広告の痕跡があります(${pattern})`)
  }
}

if (errors.length > 0) {
  console.error('出力の検証に失敗しました:')
  for (const message of errors) console.error(`  - ${message}`)
  process.exit(1)
}

console.log('出力の検証に成功しました(CNAME、app-ads.txt、favicon.ico があり、ads.txt と広告の痕跡がない)')
