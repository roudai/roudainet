/**
 * Megaminx PLL の覚える順の段階と、グループの説明(006)。
 * 覚える順は、さむぶろぐ「Megaminx PLL 全手順会議議事録」前編(http://sumblog.net/archives/40859395.html)・
 * 後編(http://sumblog.net/archives/40977418.html)による。
 * 値は MegaminxImageEditor の data/pll/learn_order.json(段階ごとのケース)、js/case-sections.js(段階の名前)、
 * js/case-groups.js(グループの説明)から、一度だけのスクリプトで写した。手で変えるときは、エディターと揃える。
 */
export interface PllStage {
  /** 段階の名前。タブと見出しに出す('F2–5' など) */
  label: string
  /** 段階のケースの名前を、覚える順に */
  cases: string[]
}

/** 覚える順の 27 段階 */
export const pllStages: PllStage[] = [
  { label: 'F1', cases: ['F1+', 'F1-'] },
  { label: 'A', cases: ['A1+', 'A1-', 'A2+', 'A2-'] },
  { label: 'E', cases: ['E1', 'E2', 'E3'] },
  { label: 'H', cases: ['H1+', 'H1-', 'H2+', 'H2-'] },
  { label: 'U', cases: ['U1+', 'U1-', 'U2+', 'U2-'] },
  { label: 'Z', cases: ['Z1', 'Z2', 'Z3'] },
  { label: 'Q', cases: ['Q1+', 'Q1-', 'Q2+', 'Q2-'] },
  { label: 'D', cases: ['D+', 'D-'] },
  { label: 'F2–5', cases: ['F3+', 'F2-', 'F2+', 'F3-', 'F4+', 'F5+', 'F4-', 'F5-'] },
  { label: 'J', cases: ['J1+', 'J1-', 'J2+', 'J3+', 'J2-', 'J3-'] },
  { label: 'M', cases: ['M'] },
  { label: 'N', cases: ['N1+', 'N1-', 'N2+', 'N2-'] },
  { label: 'T', cases: ['T1', 'T2+', 'T2-', 'T3+', 'T3-', 'T4+', 'T4-'] },
  { label: 'V', cases: ['V1+', 'V1-', 'V3+', 'V3-', 'V2+', 'V2-', 'V4+', 'V4-'] },
  { label: 'W', cases: ['W'] },
  { label: 'Y', cases: ['Y1+', 'Y1-', 'Y2+', 'Y2-', 'Y3+', 'Y3-'] },
  { label: 'B', cases: ['B1+', 'B1-', 'B2+', 'B2-'] },
  { label: 'R', cases: ['R1+', 'R3+', 'R2+', 'R4+', 'R1-', 'R3-', 'R2-', 'R4-'] },
  { label: 'P', cases: ['P1+', 'P2+', 'P1-', 'P2-', 'P3+', 'P4+', 'P3-', 'P4-'] },
  { label: 'S', cases: ['S1+', 'S1-', 'S2+', 'S2-', 'S3+', 'S3-', 'S4+', 'S4-', 'S5+', 'S5-', 'S6+', 'S6-'] },
  { label: 'C', cases: ['C1+', 'C1-', 'C2+', 'C2-', 'C3+', 'C3-', 'C4+', 'C4-', 'C5+', 'C5-', 'C6+', 'C6-'] },
  { label: 'G', cases: ['G1+', 'G1-', 'G2+', 'G2-'] },
  { label: 'I', cases: ['I1+', 'I2+', 'I1-', 'I2-', 'I3+', 'I3-', 'I4+', 'I5+', 'I4-', 'I5-', 'I6+', 'I6-'] },
  { label: 'K2', cases: ['K2+', 'K2-'] },
  { label: 'L', cases: ['L1', 'L2', 'L3+', 'L3-', 'L4+', 'L4-', 'L5+', 'L6+', 'L5-', 'L6-'] },
  { label: 'K1', cases: ['K1+', 'K1-'] },
  { label: 'X', cases: ['X1', 'X2', 'X3', 'X4', 'X5+', 'X5-', 'X6+', 'X6-', 'X7+', 'X7-'] },
]

/** グループ → 特徴の説明(段階の見出しに添える) */
export const pllGroupNotes: Record<string, string> = {
  A: '3 corner CP',
  B: 'Double R block',
  C: '2 2x1s touching',
  D: '3x1 and 2x2',
  E: '4 corner CP',
  F: '3x1 and 2x1(s)',
  G: '2x1 and headlights',
  H: '5 piece EP/CP',
  I: '2x1',
  J: 'J block',
  K: '5 corner CP',
  L: 'Double headlights, no blocks',
  M: '2 3x1s',
  N: '5 2x1s',
  P: 'R block',
  Q: '5 edge EP',
  R: 'R block and 2x1',
  S: '2 2x1s, not touching',
  T: '2, 3 or 4 2x1s',
  U: '3 edge EP',
  V: '2x2 and 2x1',
  W: '2 2x2s',
  X: 'No blocks or headlights',
  Y: '2 2x1s in Y pattern and other stuff',
  Z: '4 edge EP',
}
