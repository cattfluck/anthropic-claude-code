import { Clock, Route, TrendingUp, Star, Share2 } from 'lucide-react'
import { formatDuration, formatDistance } from '../lib/routeUtils'
import type { RunnerRoute } from '../types'

interface Props {
  route: RunnerRoute
  unit: 'km' | 'mi'
}

export function RouteCard({ route, unit }: Props) {
  function handleShare() {
    const text = `${route.name} — ${formatDistance(route.totalDistanceKm, unit)} in ${formatDuration(route.estimatedMinutes)}\n${route.description}`
    if (navigator.share) {
      navigator.share({ title: route.name, text })
    } else {
      navigator.clipboard.writeText(text)
    }
  }

  const shapeLabel =
    route.routeType === 'loop' ? 'Loop' : route.routeType === 'out-and-back' ? 'Out & back' : 'Point-to-point'

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-bold text-white leading-tight">{route.name}</h2>
        <button
          onClick={handleShare}
          title="Share route"
          className="flex-shrink-0 p-1.5 text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed">{route.description}</p>

      <div className="flex flex-wrap gap-3">
        <Stat icon={<Route className="w-3.5 h-3.5" />} value={formatDistance(route.totalDistanceKm, unit)} />
        <Stat icon={<Clock className="w-3.5 h-3.5" />} value={formatDuration(route.estimatedMinutes)} />
        <Stat icon={<TrendingUp className="w-3.5 h-3.5" />} value={shapeLabel} />
      </div>

      <p className="text-xs text-slate-400 italic">{route.elevationProfileNote}</p>

      {route.highlights.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Highlights</p>
          <ul className="space-y-1">
            {route.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <Star className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Stat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-sm text-slate-200">
      <span className="text-emerald-400">{icon}</span>
      {value}
    </div>
  )
}
