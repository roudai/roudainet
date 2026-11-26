<script setup lang="ts">
import { PLL_CASES } from 'megaminx-image/cases'
import { pllBasics, pllBasicsIntro, type PllExample } from '~/data/megaminx/pll-basics'
import { pllMarks, pllRecognition, pllStageNotes } from '~/data/megaminx/pll-recognition'
import { pllGroupNotes, pllStages } from '~/data/megaminx/pll-stages'

/**
 * Megaminx PLL の判断基準のページ(006)。
 * 先頭の「基礎知識」と、覚える順の 27 段階をタブで切り替える。すべてのタブの中身を静的生成した HTML に含め、
 * 選んでいないタブは v-show で隠す。データの誤り(ケース名の打ち間違いなど)は、ここで例外にして静的生成を失敗させる。
 */

/**
 * データの誤りで静的生成を失敗させる。例外のメッセージは静的生成のログに出ず「[500] Server Error」だけになるため、
 * 同じメッセージをコンソールにも出す(ログに残る)
 */
function fail(message: string): never {
  console.error(message)
  throw new Error(message)
}

const caseByName = new Map(PLL_CASES.map((c) => [c.name, c]))

// 検証: 段階が 151 件をちょうど 1 回ずつ含む
const staged = pllStages.flatMap((s) => s.cases)
const unknownStaged = staged.filter((name) => !caseByName.has(name))
const duplicated = staged.filter((name, i) => staged.indexOf(name) !== i)
const missing = PLL_CASES.map((c) => c.name).filter((name) => !staged.includes(name))
if (unknownStaged.length || duplicated.length || missing.length) {
  fail(
    `pll-stages.ts の段階が PLL の 151 ケースと一致しません(不明: ${unknownStaged.join(', ') || 'なし'}、重複: ${duplicated.join(', ') || 'なし'}、不足: ${missing.join(', ') || 'なし'})`,
  )
}

// 検証: 判断基準のキーは PLL のケース名だけ
const unknownRecognition = Object.keys(pllRecognition).filter((name) => !caseByName.has(name))
if (unknownRecognition.length) {
  fail(`pll-recognition.ts に、PLL に無いケース名があります: ${unknownRecognition.join(', ')}`)
}

// 検証: 判断の図のキーは PLL のケース名だけ。show と arrows の番号は 0〜25 の整数。矢印の両端は別のステッカー
// (誤りはライブラリも例外にするが、どのケースかが分かるようにここで止める)
const isSticker = (n: number) => Number.isInteger(n) && n >= 0 && n <= 25
for (const [name, marks] of Object.entries(pllMarks)) {
  if (!caseByName.has(name)) fail(`pll-recognition.ts の pllMarks に、PLL に無いケース名があります: ${name}`)
  for (const mark of marks) {
    const bad = mark.show.filter((n) => !isSticker(n))
    if (bad.length)
      fail(`pll-recognition.ts の pllMarks の ${name} の show に、0〜25 でない番号があります: ${bad.join(', ')}`)
    const badArrows = (mark.arrows ?? []).filter(([from, to]) => !isSticker(from) || !isSticker(to) || from === to)
    if (badArrows.length)
      fail(
        `pll-recognition.ts の pllMarks の ${name} の arrows に、誤った組があります: ${badArrows.map((a) => `[${a.join(', ')}]`).join(', ')}`,
      )
  }
}

// 検証: 段階の一言のキーは段階の名前だけ
const unknownStageNotes = Object.keys(pllStageNotes).filter((label) => !pllStages.some((s) => s.label === label))
if (unknownStageNotes.length) {
  fail(`pll-recognition.ts の pllStageNotes に、段階に無い名前があります: ${unknownStageNotes.join(', ')}`)
}

/** タブ。hash は URL のハッシュに使う値(段階の名前の – を - に) */
const stages = pllStages.map((stage) => {
  const group = caseByName.get(stage.cases[0]!)!.group
  const note = pllGroupNotes[group]
  if (!note) fail(`pll-stages.ts の段階 ${stage.label} のグループ ${group} に、説明がありません`)
  return {
    label: stage.label,
    hash: stage.label.replaceAll('–', '-'),
    heading: `${stage.label} (${note})`,
    intro: pllStageNotes[stage.label] ?? '',
    cases: stage.cases.map((name) => ({
      name,
      alg: caseByName.get(name)!.alg,
      recognition: pllRecognition[name] ?? [],
      marks: pllMarks[name] ?? [],
    })),
  }
})

/** 例の図を手順に置き換える。PLL のケース名なら PLL_CASES の手順にする */
function resolveExamples(examples: PllExample[] | undefined, where: string) {
  return (examples ?? []).map((example) => {
    if ((example.pll === undefined) === (example.case === undefined)) {
      fail(`pll-basics.ts の${where}の例には、pll か case のどちらか一方だけを書いてください`)
    }
    const badShow = (example.show ?? []).filter((n) => !Number.isInteger(n) || n < 0 || n > 25)
    if (badShow.length)
      fail(`pll-basics.ts の${where}の例の show に、0〜25 でない番号があります: ${badShow.join(', ')}`)
    let alg = example.case!
    if (example.pll !== undefined) {
      const found = caseByName.get(example.pll)
      if (!found) fail(`pll-basics.ts の${where}の例に、PLL に無いケース名があります: ${example.pll}`)
      alg = found.alg
    }
    return { diagram: { case: alg, rotate: example.rotate, show: example.show }, label: example.label }
  })
}

/** 基礎知識の枠の行。例の図は手順に置き換える */
const basics = pllBasics.map((row) =>
  row.map((box) => ({
    title: box.title,
    paragraphs: box.paragraphs,
    examples: resolveExamples(box.examples, `枠「${box.title}」`),
  })),
)

const tabs = [{ label: '基礎知識', hash: 'basics' }, ...stages.map(({ label, hash }) => ({ label, hash }))]

/** 選んでいるタブ。サーバー側とハイドレーションの時点では、常に基礎知識 */
const active = ref('basics')

/** URL のハッシュ(`#K2` など)からタブを選ぶ。知らないハッシュなら基礎知識 */
function selectFromHash(hash: string) {
  const name = decodeURIComponent(hash.slice(1))
  active.value = tabs.some((tab) => tab.hash === name) ? name : 'basics'
}

function onHashChange() {
  selectFromHash(location.hash)
}

/** タブを押したとき。ページの先頭へ飛ばないよう、ハッシュは replaceState で書き換える */
function select(hash: string) {
  active.value = hash
  history.replaceState(history.state, '', `#${hash}`)
}

const route = useRoute()

onMounted(() => {
  // 読み込みの直後は、Nuxt のルーターが location のハッシュを一時的に外している。そのときは、残っているルートのハッシュを読む。
  // タブを押したときは location だけを書き換え(ルートは最初のハッシュのまま)なので、location にハッシュがあればそちらを優先する
  // (pnpm dev のホットリロードで作り直したときに、最初に開いたタブへ戻らないように)
  selectFromHash(location.hash || route.hash)
  window.addEventListener('hashchange', onHashChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', onHashChange)
})
</script>

<template>
  <div>
    <h2>Megaminx PLL</h2>

    <div role="tablist" aria-label="Megaminx PLL のタブ" class="my-4 flex flex-wrap gap-1">
      <button
        v-for="tab in tabs"
        :key="tab.hash"
        type="button"
        role="tab"
        :aria-selected="active === tab.hash"
        :aria-controls="`pll-tab-${tab.hash}`"
        class="cursor-pointer rounded border px-2 py-1 text-sm"
        :class="
          active === tab.hash
            ? 'border-bulma-link bg-bulma-link text-white'
            : 'border-bulma-border text-bulma-text hover:border-bulma-link'
        "
        @click="select(tab.hash)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div v-show="active === 'basics'" id="pll-tab-basics" role="tabpanel">
      <MegaminxPllBasicsBlock
        id-prefix="pll-basics-intro"
        :paragraphs="pllBasicsIntro"
        :examples="[]"
        :pending="true"
        class="mb-4"
      />
      <!-- 枠の行。広い画面で 2 列、狭い画面では縦に積む。枠が 1 つの行も、同じ幅の枠にする -->
      <div v-for="(row, i) in basics" :key="i" class="mb-4 grid gap-4 md:grid-cols-2">
        <div v-for="(box, c) in row" :key="box.title" class="rounded border border-bulma-border p-4">
          <h4>{{ box.title }}</h4>
          <MegaminxPllBasicsBlock
            :id-prefix="`pll-basics-${i}-${c}`"
            :paragraphs="box.paragraphs"
            :examples="box.examples"
            :pending="true"
          />
        </div>
      </div>
    </div>

    <div
      v-for="stage in stages"
      v-show="active === stage.hash"
      :id="`pll-tab-${stage.hash}`"
      :key="stage.hash"
      role="tabpanel"
    >
      <h3>{{ stage.heading }}</h3>
      <p v-if="stage.intro">{{ stage.intro }}</p>
      <p v-else class="text-[#7a7a7a]">準備中</p>
      <MegaminxPllCase
        v-for="c in stage.cases"
        :key="c.name"
        :name="c.name"
        :alg="c.alg"
        :recognition="c.recognition"
        :marks="c.marks"
      />
    </div>
  </div>
</template>
