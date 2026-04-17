import type { Guess } from '../../types'
import { GuessRow } from './GuessRow'

interface GuessListProps {
  guesses: Guess[]
  unit: 'km' | 'mi'
}

export function GuessList({ guesses, unit }: GuessListProps) {
  if (guesses.length === 0) return null
  return (
    <div className="space-y-2">
      {guesses.map((g, i) => (
        <GuessRow key={i} guess={g} index={i} unit={unit} />
      ))}
    </div>
  )
}
