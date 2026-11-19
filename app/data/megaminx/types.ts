import type { MegaminxOptions } from 'sr-puzzlegen'

/**
 * Megaminx の図の指定。sr-puzzlegen の PNG に、描画の種類 `megaminx-top` とともに、そのまま渡す。
 * 値は、移植元(legacy/pages/megaminx/)の mounted() で PNG に渡している値と同一にする(FR-003)。
 * 配色には、移植元と同じく、sr-puzzlegen が使わない `name` も含む。
 */
export interface MegaminxDiagram {
  width: number
  height: number
  puzzle: Omit<MegaminxOptions, 'scheme'> & {
    scheme?: Record<string, { value: string; name?: string; stroke?: string }>
  }
}
