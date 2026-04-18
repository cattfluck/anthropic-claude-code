import type { GameState, Resort } from '../types'

export function buildShareText(state: GameState, target: Resort): string {
  const rows = state.guesses.map((g, i) => {
    if (g.isCorrect) return `⛷️ Hint ${i + 1}: nailed it!`
    const d = g.distanceKm
    const distEmoji = d < 100 ? '🟩' : d < 300 ? '🟨' : d < 800 ? '🟧' : '🟥'
    const missIcon = (['🎿', '🏔️', '🌨️', '⛷️', '🚡'] as const)[i] ?? '❄️'
    return `${missIcon} Hint ${i + 1}: ${distEmoji} ${Math.round(d).toLocaleString()} km`
  })

  const guessCount = state.guesses.length
  const header = state.status === 'won'
    ? `🎿 Skirdle #${state.puzzleNumber} — ${guessCount}/5 hint${guessCount === 1 ? '' : 's'}!`
    : `🏔️ Skirdle #${state.puzzleNumber} — so close! It was ${target.name}`

  const url = window.location.href
  return [header, '', ...rows, '', `❄️ Play at ${url}`].join('\n')
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
