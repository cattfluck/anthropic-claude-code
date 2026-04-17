import type { HintSlot } from '../../types'
import { HintCard } from './HintCard'

interface HintBoardProps {
  hints: HintSlot[]
  guessCount: number
}

export function HintBoard({ hints, guessCount }: HintBoardProps) {
  return (
    <div className="space-y-2">
      {hints.map((hint) => (
        <HintCard key={hint.id} hint={hint} guessCount={guessCount} />
      ))}
    </div>
  )
}
