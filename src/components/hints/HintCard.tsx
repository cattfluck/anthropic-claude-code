import { Mountain, Wine, Snowflake, BarChart2, MapPin, Lock, Camera } from 'lucide-react'
import type { HintSlot } from '../../types'
import { PhotoHintCard } from './PhotoHintCard'

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Mountain, Wine, Snowflake, BarChart2, MapPin, Camera,
}

interface HintCardProps {
  hint: HintSlot
  guessCount: number
}

export function HintCard({ hint, guessCount }: HintCardProps) {
  const Icon = ICONS[hint.icon] ?? Mountain

  if (!hint.revealed) {
    const isNext = hint.order === guessCount + 1
    return (
      <div className="hint-card-locked flex items-center gap-3">
        <Lock size={14} className="text-slate-400 shrink-0" />
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{hint.label}</p>
          <p className="text-sm text-slate-400 mt-0.5">
            {isNext ? 'Unlocks after your next guess' : 'Locked'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="hint-card-revealed">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-orange-400 shrink-0" />
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest">{hint.label}</p>
      </div>
      {hint.id === 'photo'
        ? <PhotoHintCard wikiTitle={hint.value} />
        : <p className="text-sm text-slate-800 font-semibold">{hint.value}</p>
      }
    </div>
  )
}
