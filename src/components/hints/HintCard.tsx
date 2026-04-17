import { Mountain, Wine, Snowflake, BarChart2, MapPin, Lock } from 'lucide-react'
import type { HintSlot } from '../../types'

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Mountain,
  Wine,
  Snowflake,
  BarChart2,
  MapPin,
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
        <Lock size={16} className="text-slate-500 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{hint.label}</p>
          <p className="text-sm text-slate-500 mt-0.5">
            {isNext ? 'Unlocks after your next guess' : 'Locked'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="hint-card-revealed flex items-start gap-3">
      <Icon size={18} className="text-blue-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">{hint.label}</p>
        <p className="text-sm text-white mt-0.5 font-medium">{hint.value}</p>
      </div>
    </div>
  )
}
