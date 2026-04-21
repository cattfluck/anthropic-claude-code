import { useState } from 'react'
import { Flag, ChevronRight, Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import type { RunnerRoute } from '../types'

const TYPE_ICONS = {
  start: <Flag className="w-3.5 h-3.5 text-emerald-400" />,
  turn: <ChevronRight className="w-3.5 h-3.5 text-slate-400" />,
  landmark: <Star className="w-3.5 h-3.5 text-yellow-400" />,
  end: <MapPin className="w-3.5 h-3.5 text-red-400" />,
}

interface Props {
  route: RunnerRoute
}

export function WaypointList({ route }: Props) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? route.waypoints : [route.waypoints[0], route.waypoints[route.waypoints.length - 1]]

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
      >
        <span>Waypoints ({route.waypoints.length})</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      <ul className="divide-y divide-white/5">
        {visible.map((wp, i) => {
          const idx = expanded ? i : i === 0 ? 0 : route.waypoints.length - 1
          return (
            <li key={idx} className="flex items-center gap-3 px-5 py-2.5">
              <span className="w-6 text-xs text-slate-500 text-right flex-shrink-0">{idx + 1}</span>
              <span className="flex-shrink-0">{TYPE_ICONS[wp.type]}</span>
              <span className="flex-1 text-sm text-slate-300">{wp.label}</span>
              <span className="text-xs text-slate-500 flex-shrink-0">
                {wp.distanceFromStartKm.toFixed(1)}km
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
