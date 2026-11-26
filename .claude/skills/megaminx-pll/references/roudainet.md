# roudai.net の Megaminx PLL のページ(サイト固有)

roudai.net のリポジトリ(Nuxt 4 の静的生成、pnpm)の `/megaminx/megaminx-pll` のページで作業するときの決まり。
ほかのサイトに持ち出すときは、このファイルだけを差し替える。

## ファイル

| ファイル | 中身 | 誰が書くか |
| --- | --- | --- |
| `app/data/megaminx/pll-recognition.ts` の `pllStageNotes` | 各段階(タブ)の見出しの下の一言。キーは段階の名前(`'F2–5'` は全角ダッシュ) | 運営者 |
| 同 `pllMarks` | 各ケースの判断の図(`{ show, arrows?, start?, label }` の配列、0–2 個。`start: true` の図は、手順の先頭の括弧の AUF を回した後の向きで描き、番号もその向きで数える) | 運営者の指示で Claude が作る |
| 同 `pllRecognition` | 各ケースの判断基準の段落(文字列の配列) | 運営者 |
| `app/data/megaminx/pll-basics.ts` | 基礎知識のタブ(`pllBasicsIntro` と、枠の行 `pllBasics`) | 運営者(例の図は Claude が選ぶことがある) |
| `app/data/megaminx/pll-stages.ts` | 覚える順の 27 段階とグループの説明 | 変えない |
| `app/pages/megaminx/megaminx-pll.vue` | ページ。キーや show・arrows の番号の誤りは、生成のときに例外で止まる | ― |

文章は運営者が書く。Claude は頼まれない限り、判断基準の文章(`pllRecognition`・`pllStageNotes`・基礎知識の段落)を書かない。
直すのは、レビューで指摘して了承をもらったところだけ。

## 判断の図(pllMarks)の作り方

1. 運営者が言った判断基準を、`scripts/features.mjs <ケース>`(`--group` でグループごと)で確かめる。
   言葉と計算が合わないとき(例:「偽バー」と言われたが偽ペアしかない)は、図を作る前に運営者に確かめる。推測で合わせない
2. show は `references/terms.md` の取り方にそろえる。`features.mjs` の show をそのまま使えることが多い
3. 同じ種類の特徴が複数あって判断に両方使うときは、1 枚の図にまとめる(E1 の 2 つの偽バー、E3 の 2 つのヘッドライト)
4. ラベルは短い名詞(`'バー'`、`'偽ペア'`、`'3x2ブロック'`、`'コーナーの色'`)
5. 段階のコメント(`// E (4 corner CP)`)の下に、覚える順で足す
6. 足したら Prettier をかけ(`pnpm exec prettier --write app/data/megaminx/pll-recognition.ts`)、図を目で確かめる(下の「確かめ方」)

## レビューの仕方

運営者が「レビューして」と言ったら、書かれた文章を図と計算で確かめる。

- 位置(左上・右下など)、色、コーナーの動き(どこからどこへ)を、`features.mjs`・`corners.mjs` で確かめてから指摘する。
  見た目の印象で書かない
- 文章と図が食い違うとき、どちらが正しいかを推測で決めない。計算の結果を見せて運営者に聞く
- 指摘は「誤り(事実と違う)」と「提案(読みやすさ・言葉の統一)」を分け、番号を振る。おすすめにはそう書く
- 用語は基礎知識のタブの定義(`terms.md`)にそろっているかも見る
- 直すのは、運営者が選んだものだけ。直したら Prettier をかける

## 確かめ方

- `pnpm lint`、`pnpm typecheck`、`pnpm generate`、`pnpm verify`
- 図の見た目は、生成した出力を `node scripts/preview.mjs 3556` で配信し、`scripts/shot.mjs <タブ> --case <ケース>` で撮って見る。
  生成し直さないと、撮った画像は古いまま
- 開発中のサーバー(`pnpm dev`)の再読み込みでタブが先頭に戻るときは、ページの `onMounted` のハッシュの読み方(`location.hash || route.hash`)を確かめる

## コミット

- 運営者が「コミットして」と言ったときだけコミットする。push は頼まれたときだけ(main へ直接)
- メッセージは日本語。例:`Megaminx PLLのEの判断基準を書き、判断の図を足す`
- 006 は公開済み。中身の書き足しや小さな直しは、Spec を直さずにコミットだけする
