import { useReducer, useEffect } from 'react'
import type { GameState, GameAction, Resort } from '../types'
import { haversineKm, bearingDeg } from '../lib/distance'
import { saveGameState, loadGameState, loadStats, saveStats, updateStats } from '../lib/storage'

function makeInitialState(
  targetResortId: string,
  puzzleNumber: number,
  date: string
): GameState {
  return {
    status: 'playing',
    targetResortId,
    hintsRevealed: 1,
    guesses: [],
    puzzleNumber,
    date,
  }
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.state

    case 'RESET':
      return makeInitialState(state.targetResortId, state.puzzleNumber, state.date)

    case 'SUBMIT_GUESS': {
      const { resort, target } = action
      const distanceKm = haversineKm(resort.coordinates, target.coordinates)
      const bearing = bearingDeg(resort.coordinates, target.coordinates)
      const isCorrect = resort.id === target.id

      const newGuess = { resort, distanceKm, bearingDeg: bearing, isCorrect }
      const newGuesses = [...state.guesses, newGuess]
      const nextHints = Math.min(state.hintsRevealed + 1, 5)

      if (isCorrect) {
        return { ...state, guesses: newGuesses, status: 'won' }
      }
      if (newGuesses.length >= 5) {
        return { ...state, guesses: newGuesses, hintsRevealed: 5, status: 'lost' }
      }
      return { ...state, guesses: newGuesses, hintsRevealed: nextHints }
    }

    default:
      return state
  }
}

export function useGameState(target: Resort, puzzleNumber: number, date: string) {
  const [state, dispatch] = useReducer(
    reducer,
    null,
    () => {
      const saved = loadGameState(date)
      if (saved && saved.targetResortId === target.id) return saved
      return makeInitialState(target.id, puzzleNumber, date)
    }
  )

  useEffect(() => {
    saveGameState(state)
    if (state.status !== 'playing') {
      const stats = updateStats(loadStats(), state)
      saveStats(stats)
    }
  }, [state])

  return { state, dispatch }
}
