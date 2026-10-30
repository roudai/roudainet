// `nuxt generate` の出力(.output/public)を、静的ファイルとして配信して確認する。
// `nuxt preview` は Node サーバー形式の出力を前提にしているため、静的生成のみのこのサイトでは使えない。
// GitHub Pages に近い挙動にする: ディレクトリは index.html を返し、存在しないパスは 404.html を 404 で返す。
import { existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const root = '.output/public'
const port = Number(process.env.PORT ?? process.argv[2] ?? 3000)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

if (!existsSync(root)) {
  console.error(`${root} がありません。先に pnpm generate を実行してください。`)
  process.exit(1)
}

const resolveFile = (pathname) => {
  // `..` で出力の外へ出られないようにする
  const path = normalize(join(root, decodeURIComponent(pathname)))
  if (!path.startsWith(root)) return null
  if (existsSync(path) && statSync(path).isFile()) return path
  const index = join(path, 'index.html')
  return existsSync(index) ? index : null
}

createServer((request, response) => {
  const { pathname } = new URL(request.url ?? '/', 'http://localhost')
  const file = resolveFile(pathname)
  const status = file ? 200 : 404
  const target = file ?? join(root, '404.html')
  response.writeHead(status, { 'content-type': types[extname(target)] ?? 'application/octet-stream' })
  response.end(readFileSync(target))
}).listen(port, () => console.log(`${root} を http://localhost:${port} で配信しています`))
