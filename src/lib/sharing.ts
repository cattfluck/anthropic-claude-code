import type { GameState } from '../types'

export function buildShareText(state: GameState): string {
  const rows = state.guesses.map((g, i) => {
    const hintNum = i + 1
    if (g.isCorrect) return `Hint ${hintNum}: 🎿 Correct!`
    const d = g.distanceKm
    const emoji = d < 200 ? '🟨' : d < 1000 ? '🟧' : '🟥'
    return `Hint ${hintNum}: ${emoji} ${Math.round(d).toLocaleString()} km away`
  })

  const header =
    state.status === 'won'
      ? `⛷️ Skirdle #${state.puzzleNumber} — Solved in ${state.guesses.length}/5!`
      : `⛷️ Skirdle #${state.puzzleNumber} — Missed (X/5)`

  return [header, '', ...rows].join('\n')
}

export async function shareResult(text: string): Promise<'shared' | 'copied' | 'failed'> {
  if (navigator.share) {
    try {
      await navigator.share({ text })
      return 'shared'
    } catch {
      // user cancelled or share failed — fall through to clipboard
    }
  }
  try {
    await navigator.clipboard.writeText(text)
    return 'copied'
  } catch {
    return 'failed'
  }
}
