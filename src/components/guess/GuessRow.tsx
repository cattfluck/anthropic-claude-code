import type { Guess } from '../../types'
import { Badge } from '../ui/Badge'
import { Compass } from '../ui/Compass'

interface GuessRowProps {
  guess: Guess
  index: number
  unit: 'km' | 'mi'
}

export function GuessRow({ guess, index, unit }: GuessRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3 animate-fade-slide-in" style={{
      background: 'rgba(255,255,255,0.65)',
      border: '1px solid rgba(148,196,255,0.3)',
    }}>
      <span className="text-slate-400 text-sm w-4 shrink-0">{index + 1}</span>
      <span className="flex-1 font-semibold text-slate-800 text-sm">{guess.resort.name}</span>
      {!guess.isCorrect && <Compass bearingDeg={guess.bearingDeg} />}
      <Badge distanceKm={guess.distanceKm} unit={unit} />
    </div>
  )
}
