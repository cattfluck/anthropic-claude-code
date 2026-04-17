import { useMemo } from 'react'
import type { Resort } from '../types'
import { getDailyResort, getPuzzleNumber } from '../lib/puzzle'

export function useDailyPuzzle(resorts: Resort[]) {
  return useMemo(() => {
    const today = new Date()
    const resort = getDailyResort(resorts, today)
    const puzzleNumber = getPuzzleNumber(today)
    const date = today.toISOString().split('T')[0]
    return { resort, puzzleNumber, date }
  }, [resorts])
}
