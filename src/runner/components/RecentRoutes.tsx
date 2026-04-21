import { useState } from 'react'
import { Clock, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { formatDistance, formatDuration } from '../lib/routeUtils'
import type { RunnerRoute } from '../types'

interface Props {
  routes: RunnerRoute[]
  unit: 'km' | 'mi'
  onSelect: (route: RunnerRoute) => void
  onRemove: (id: string) => void
}

export function RecentRoutes({ routes, unit, onSelect, onRemove }: Props) {
  const [open, setOpen] = useState(false)

  if (routes.length === 0) return null

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
      >
        <span className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          Recent routes ({routes.length})
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {open && (
        <ul className="divide-y divide-white/5">
          {routes.map((r) => (
            <li key={r.id} className="flex items-center gap-3 px-5 py-3">
              <button
                onClick={() => onSelect(r)}
                className="flex-1 text-left hover:text-emerald-400 transition-colors"
              >
                <p className="text-sm font-medium text-white">{r.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatDistance(r.totalDistanceKm, unit)} · {formatDuration(r.estimatedMinutes)} ·{' '}
                  {r.requestParams.startLocation}
                </p>
              </button>
              <button
                onClick={() => onRemove(r.id)}
                className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
