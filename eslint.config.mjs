import prettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // legacy/ は読み取り専用の移植元(原則 VI)。旧設定や旧コードで検査が落ちないように除外する
  { ignores: ['legacy/', '.output/', '.nuxt/', 'specs/', '.specify/', '.claude/'] },
  prettier,
)
