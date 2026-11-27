# 英語で答えるときの訳

英語で聞かれたら、記事の言葉とスクリプトの出力(日本語)を、この表の訳で英語にする。答えるたびに訳を変えない。
表に無い言葉は、意味を保った訳を選び、記事独自の言葉なら日本語の名前を括弧で添える。
定義は `terms.md`。英語の答えでも、定義と数え方(ブロックの中のペアは数えない、など)は同じ。

## 用語

| 日本語                              | 英語                                                | 初めて出すときに添える説明                                                                                                            |
| ----------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ペア(2x1)                           | pair                                                | an edge and an adjacent corner sticker of the same color on one face                                                                  |
| バー(3x1)                           | bar                                                 | all three stickers of a face (corner, edge, corner) match                                                                             |
| ブロック(2x2)                       | block                                               | a 2x2 block across two adjacent faces                                                                                                 |
| 3x2ブロック                         | 3x2 block                                           |                                                                                                                                       |
| Jブロック・逆Jブロック              | J block / mirrored J block                          | a bar extended by a block on one side                                                                                                 |
| ヘッドライト                        | headlights                                          | both corners of a face match, the edge differs                                                                                        |
| Rブロック(左Rブロック・右Rブロック) | R block (left R block / right R block)              | headlights whose corner forms a pair with the neighboring face's edge; "left/right" is the side of that pair. A term from the article |
| Yペア                               | Y pair                                              | two outward-facing pairs on either side of one corner. A term from the article                                                        |
| 続くペア                            | consecutive pairs                                   |                                                                                                                                       |
| 偽ペア                              | fake pair                                           | the edge color appears on the adjacent corner's sticker on the neighboring face, not on the same face                                 |
| 偽バー                              | fake bar                                            | fake pairs on both sides of an edge                                                                                                   |
| 偽ブロック                          | fake block                                          |                                                                                                                                       |
| 偽3x2ブロック                       | fake 3x2 block                                      |                                                                                                                                       |
| 偽Jブロック・偽逆Jブロック          | fake J block / fake mirrored J block                |                                                                                                                                       |
| 偽ヘッドライト                      | fake headlights                                     | the two corners' stickers on the neighboring faces (not on the face itself) match. A term from the article                            |
| 段階                                | stage                                               | the article's learning-order group (F1, A, E, …, X)                                                                                   |
| 覚える順                            | learning order                                      |                                                                                                                                       |
| 判断・判断基準                      | recognition / recognition criteria                  |                                                                                                                                       |
| 判断の図                            | recognition diagram                                 |                                                                                                                                       |
| 手順                                | algorithm                                           |                                                                                                                                       |
| 対面                                | opposite (each other)                               |                                                                                                                                       |
| 隣接・隣り合う                      | adjacent                                            | the article sometimes means the Y-pair shape (one corner apart); check the context                                                    |
| 5 回対称                            | five-fold symmetric                                 | looks the same after any U turn; probability 1/720                                                                                    |
| 〇点交換                            | n-cycle / n-point swap(2 点 2 点交換は double swap) |                                                                                                                                       |

## 記事によく出る言い回し

| 日本語                           | 英語                                                 |
| -------------------------------- | ---------------------------------------------------- |
| 〜を手前に置いた時・持ってきた時 | with … at the front / when … is brought to the front |
| 広い方の間                       | the wider gap (between the two pairs)                |
| 連なっている・繋がった           | in a row / joined                                    |
| 離れた                           | apart                                                |
| 絡まない                         | not involved with / not touching                     |
| 付いている・付いていない         | attached / not attached                              |
| 挟んで                           | with … in between                                    |

記事の「縦」「横」(L5 など)は、五角形の上での意味を記事が決めていない。直訳(vertical / horizontal)せず、計算で求めた位置(どの面・どのコーナーか)で言い直す。

ケース名(A1+ など)、段階の名前、グループの説明(`3 corner CP` など。もとから英語)、手順、AUF はそのまま。

## 位置

上面を上から見た図(ケースの図)の位置。面と頂点(コーナー)を必ず言い分ける。

| 日本語                                               | 英語                                                                                     |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 左上の面・左下の面・下(手前)の面・右下の面・右上の面 | upper-left face, lower-left face, front face, lower-right face, upper-right face         |
| 上・左上・左下・右下・右上のコーナー(頂点)           | top corner, upper-left corner, lower-left corner, lower-right corner, upper-right corner |
| 〇〇の面の右側・左側                                 | right side / left side of the 〇〇 face                                                  |
| 〇〇の面のエッジ                                     | edge of the 〇〇 face (〇〇 edge)                                                        |
| 手前に置く                                           | put it at the front                                                                      |
| rotate n                                             | rotate the diagram n times clockwise (U)                                                 |

## スクリプトの出力の言葉

| 出力                                         | 英語                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 「X → Y」(ピースの動き)                      | the piece at X goes to Y when solved                                                        |
| 動かない                                     | stays in place                                                                              |
| 揃えるには、手順のあと U を n 回分ずれている | after the algorithm, n more U turns (AUF) are needed; the movement is shown without the AUF |
| 矢印                                         | to solve, the piece at the tail of the arrow goes to the head                               |
| ブロック・バーの外のペア                     | pairs outside blocks and bars                                                               |
