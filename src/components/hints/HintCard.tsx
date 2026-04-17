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
        <Lock size={15} className="text-white/20 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-white/25 uppercase tracking-widest">{hint.label}</p>
          <p className="text-sm text-white/20 mt-0.5">
            {isNext ? 'Unlocks after your next guess' : 'Locked'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="hint-card-revealed">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={15} className="text-blue-300 shrink-0" />
        <p className="text-xs font-semibold text-blue-300/80 uppercase tracking-widest">{hint.label}</p>
      </div>
      {hint.id === 'photo'
        ? <PhotoHintCard wikiTitle={hint.value} />
        : <p className="text-sm text-white font-medium">{hint.value}</p>
      }
    </div>
  )
}
