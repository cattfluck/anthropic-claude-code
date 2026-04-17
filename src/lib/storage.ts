import type { GameState, StoredStats } from '../types'

function stateKey(date: string): string {
  return `skirdle_state_${date}`
}

const STATS_KEY = 'skirdle_stats'

export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(stateKey(state.date), JSON.stringify(state))
  } catch {
    // private browsing or storage full
  }
}

export function loadGameState(date: string): GameState | null {
  try {
    const raw = localStorage.getItem(stateKey(date))
    return raw ? (JSON.parse(raw) as GameState) : null
  } catch {
    return null
  }
}

export function loadStats(): StoredStats {
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (raw) return JSON.parse(raw) as StoredStats
  } catch {
    // ignore
  }
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {},
    lastPlayedDate: '',
  }
}

export function saveStats(stats: StoredStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch {
    // ignore
  }
}

export function updateStats(stats: StoredStats, state: GameState): StoredStats {
  const today = state.date
  if (stats.lastPlayedDate === today) return stats

  const won = state.status === 'won'
  const guessCount = state.guesses.length
  const prevStreak = stats.lastPlayedDate
    ? isConsecutiveDay(stats.lastPlayedDate, today)
      ? stats.currentStreak
      : 0
    : 0

  const newStreak = won ? prevStreak + 1 : 0
  const dist = { ...stats.guessDistribution }
  if (won) dist[guessCount] = (dist[guessCount] ?? 0) + 1

  return {
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + (won ? 1 : 0),
    currentStreak: newStreak,
    maxStreak: Math.max(stats.maxStreak, newStreak),
    guessDistribution: dist,
    lastPlayedDate: today,
  }
}

function isConsecutiveDay(prev: string, curr: string): boolean {
  const ms = new Date(curr).getTime() - new Date(prev).getTime()
  return ms === 86400000
}
