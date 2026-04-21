import { useState } from 'react'
import { MapPin, Navigation, Loader2 } from 'lucide-react'
import { PreferenceToggle } from './PreferenceToggle'
import { useGeolocation } from '../hooks/useGeolocation'
import type { RouteRequestParams, RoutePreferences } from '../types'

interface Props {
  unit: 'km' | 'mi'
  onGenerate: (params: RouteRequestParams) => void
  isLoading: boolean
}

const DEFAULT_PREFS: RoutePreferences = {
  avoidHills: false,
  avoidMainRoads: false,
  preferCanals: false,
  preferParks: false,
  preferTrails: false,
  routeShape: 'loop',
}

export function RouteForm({ unit, onGenerate, isLoading }: Props) {
  const [location, setLocation] = useState('')
  const [startCoords, setStartCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [distance, setDistance] = useState(5)
  const [prefs, setPrefs] = useState<RoutePreferences>(DEFAULT_PREFS)
  const { state: geoState, request: requestGeo } = useGeolocation()

  function setPref<K extends keyof RoutePreferences>(key: K, value: RoutePreferences[K]) {
    setPrefs((p) => ({ ...p, [key]: value }))
  }

  async function handleGps() {
    const result = await requestGeo()
    if (result) {
      setLocation(result.address)
      setStartCoords(result.coords)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!location.trim()) return
    const distKm = unit === 'mi' ? distance / 0.621371 : distance
    onGenerate({
      startLocation: location,
      startCoords,
      distanceKm: distKm,
      unit,
      preferences: prefs,
    })
  }

  const distLabel = unit === 'km' ? 'km' : 'miles'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">Starting location</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                setStartCoords(null)
              }}
              placeholder="e.g. Hackney, London"
              required
              className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleGps}
            disabled={geoState.status === 'loading'}
            title="Use my location"
            className="flex items-center justify-center w-10 h-10 bg-white/5 border border-white/15 rounded-lg text-slate-300 hover:text-emerald-400 hover:border-emerald-500 transition-all disabled:opacity-50"
          >
            {geoState.status === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
          </button>
        </div>
        {geoState.status === 'error' && (
          <p className="mt-1 text-xs text-red-400">{geoState.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          Distance: <span className="text-emerald-400 font-semibold">{distance} {distLabel}</span>
        </label>
        <input
          type="range"
          min={1}
          max={unit === 'km' ? 42 : 26}
          step={0.5}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full accent-emerald-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>1{distLabel}</span>
          <span>{unit === 'km' ? '42km' : '26mi'}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Route shape</label>
        <div className="flex gap-2">
          {(['loop', 'out-and-back', 'point-to-point'] as const).map((shape) => (
            <button
              key={shape}
              type="button"
              onClick={() => setPref('routeShape', shape)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                prefs.routeShape === shape
                  ? 'bg-emerald-500 border-emerald-400 text-white'
                  : 'bg-white/5 border-white/15 text-slate-300 hover:border-white/30'
              }`}
            >
              {shape === 'loop' ? 'Loop' : shape === 'out-and-back' ? 'Out & back' : 'Point-to-point'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Preferences</label>
        <div className="flex flex-wrap gap-2">
          <PreferenceToggle
            label="Avoid hills"
            emoji="⛰️"
            checked={prefs.avoidHills}
            onChange={(v) => setPref('avoidHills', v)}
          />
          <PreferenceToggle
            label="Avoid main roads"
            emoji="🚗"
            checked={prefs.avoidMainRoads}
            onChange={(v) => setPref('avoidMainRoads', v)}
          />
          <PreferenceToggle
            label="Canals & rivers"
            emoji="🛶"
            checked={prefs.preferCanals}
            onChange={(v) => setPref('preferCanals', v)}
          />
          <PreferenceToggle
            label="Parks"
            emoji="🌳"
            checked={prefs.preferParks}
            onChange={(v) => setPref('preferParks', v)}
          />
          <PreferenceToggle
            label="Trails"
            emoji="🥾"
            checked={prefs.preferTrails}
            onChange={(v) => setPref('preferTrails', v)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !location.trim()}
        className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Plotting your route...
          </>
        ) : (
          'Generate Route'
        )}
      </button>
    </form>
  )
}
