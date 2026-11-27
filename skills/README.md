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
