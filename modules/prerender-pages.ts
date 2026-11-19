import { defineNuxtModule } from 'nuxt/kit'

/**
 * 存在する静的ページだけを prerender の対象にする。
 *
 * メニューには、移植前でまだ存在しないページへのリンクがある。リンクを辿る prerender(crawlLinks)のままだと、
 * それらが 404 になって `nuxt generate` が失敗する。そのため crawlLinks は止め、
 * ページを足すたびに routes を手で書かなくて済むように、解決済みのページから静的なパスを集めて渡す。
 */
export default defineNuxtModule({
  meta: { name: 'prerender-pages' },
  setup(_options, nuxt) {
    const paths = new Set<string>()

    nuxt.hook('pages:resolved', (pages) => {
      paths.clear()
      const collect = (routes: typeof pages, base: string) => {
        for (const route of routes) {
          const path = route.path.startsWith('/') ? route.path : `${base.replace(/\/$/, '')}/${route.path}`
          // 動的なルート(`:id` や `[...slug]` など)は、パスを列挙できないため対象にしない
          if (route.path !== '' && !/[:*()[\]]/.test(path)) paths.add(path)
          if (route.path === '' && base) paths.add(base)
          if (route.children) collect(route.children, path)
        }
      }
      collect(pages, '')
    })

    // pages:resolved は nitro:config より後に走るため、Nitro のビルド直前に routes へ足す
    nuxt.hook('nitro:build:before', (nitro) => {
      nitro.options.prerender.routes = [...new Set([...nitro.options.prerender.routes, ...paths])]
    })
  },
})
