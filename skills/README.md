# skills

Claude アプリ(claude.ai)に入れるスキルの元。

## megaminx-pll-qa

メガミンクスの PLL の質問に、記事(`/megaminx/megaminx-pll`)の判断基準と計算に基づいて答えるスキル。

- `skills/megaminx-pll-qa/` は手で書く部分(SKILL.md、用語、計算のスクリプト)
- 記事のデータ(`app/data/megaminx/pll-*.ts`)から作る部分と、同梱する megaminx-image は、組み立てるときに足す

```sh
node scripts/build-pll-skill.mjs   # .skill-build/megaminx-pll-qa.zip ができる
```

できた zip を、Claude アプリのスキルの設定からアップロードする(コード実行をオンにしておくと、図と計算が使える)。
記事を直したら、組み立て直して入れ直す。

### 配布(サイト)

`pnpm generate` が、サイトを生成したあとにスキルも組み立てて、`/megaminx/megaminx-pll-qa.zip` に置く。
Megaminx PLL のページの見出しの下から、これを落とせる。main に push すれば、記事と同じ内容の zip が公開される(手で配る作業は要らない)。

### 配布(GitHub Releases。版を残したいとき)

1. 変更をコミットしてから組み立てる(未コミットだと、版に「+未コミット」と付く)
2. 出力の最後の行に出るタグ(`megaminx-pll-qa-<日付>`)で、zip を添付したリリースを作る

```sh
git push
gh release create megaminx-pll-qa-<日付> .skill-build/megaminx-pll-qa.zip --target main \
  --title "Megaminx PLL スキル <日付>" --notes "…"
```

使う人は、リリースの zip をダウンロードして、Claude アプリのスキルの設定からアップロードする。
同じ日に作り直したときは、`gh release upload <タグ> .skill-build/megaminx-pll-qa.zip --clobber` で差し替える。
