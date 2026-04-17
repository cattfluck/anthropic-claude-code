export interface Resort {
  id: string
  name: string
  country: string
  region: string
  mountainRange: string
  coordinates: { lat: number; lng: number }
  verticalDropM: number
  numberOfRuns: number
  skiableAreaHa: number
  annualSnowfallCm: number
  yearOpened: number
  famousRuns: string[]
  apresBars: string[]
  difficultyPct: { beginner: number; intermediate: number; expert: number }
  nearestCity: string
}

export interface HintSlot {
  id: string
  order: number
  label: string
  icon: string
  value: string
  revealed: boolean
}

export interface Guess {
  resort: Resort
  distanceKm: number
  bearingDeg: number
  isCorrect: boolean
}

export interface GameState {
  status: 'playing' | 'won' | 'lost'
  targetResortId: string
  hintsRevealed: number
  guesses: Guess[]
  puzzleNumber: number
  date: string
}

export interface StoredStats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: Record<number, number>
  lastPlayedDate: string
  lastGameState?: GameState
}

export type GameAction =
  | { type: 'SUBMIT_GUESS'; resort: Resort; target: Resort }
  | { type: 'LOAD_STATE'; state: GameState }
  | { type: 'RESET' }
