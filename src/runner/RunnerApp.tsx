import { useState } from 'react'
import { RouteForm } from './components/RouteForm'
import { MapView } from './components/MapView'
import { RouteCard } from './components/RouteCard'
import { WaypointList } from './components/WaypointList'
import { RecentRoutes } from './components/RecentRoutes'
import { ErrorBanner } from './components/ErrorBanner'
import { useRouteGenerator } from './hooks/useRouteGenerator'
import { useRecentRoutes } from './hooks/useRecentRoutes'
import type { RouteRequestParams, RunnerRoute } from './types'

const DEFAULT_CENTER = { lat: 51.5074, lng: -0.1278 } // London

interface Props {
  unit: 'km' | 'mi'
  onToggleUnit: () => void
}

export function RunnerApp({ unit, onToggleUnit }: Props) {
  const { state, generate, reset } = useRouteGenerator()
  const { routes: recentRoutes, addRoute, removeRoute } = useRecentRoutes()
  const [lastParams, setLastParams] = useState<RouteRequestParams | null>(null)
  const [displayedRoute, setDisplayedRoute] = useState<RunnerRoute | null>(null)

  const isLoading = state.status === 'loading'

  async function handleGenerate(params: RouteRequestParams) {
    setLastParams(params)
    const route = await generate(params)
    if (route) {
      addRoute(route)
      setDisplayedRoute(route)
    }
  }

  function handleSelectRecent(route: RunnerRoute) {
    setDisplayedRoute(route)
    reset()
  }

  function handleRetry() {
    if (lastParams) handleGenerate(lastParams)
  }

  const mapCenter =
    displayedRoute?.waypoints[0]?.position ??
    (lastParams?.startCoords ?? DEFAULT_CENTER)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white">
      <header className="px-4 pt-6 pb-4 max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-emerald-400">Route</span>Runner
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">AI-generated running routes</p>
        </div>
        <button
          onClick={onToggleUnit}
          className="px-3 py-1.5 text-sm font-medium border border-white/15 rounded-lg text-slate-300 hover:text-white hover:border-white/30 transition-all"
        >
          {unit === 'km' ? 'km' : 'mi'}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-10">
        <div className="lg:grid lg:grid-cols-[360px_1fr] lg:gap-6 space-y-6 lg:space-y-0">
          {/* Left column: form + recent routes */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
              <RouteForm unit={unit} onGenerate={handleGenerate} isLoading={isLoading} />
            </div>
            <RecentRoutes
              routes={recentRoutes}
              unit={unit}
              onSelect={handleSelectRecent}
              onRemove={removeRoute}
            />
          </div>

          {/* Right column: map + route details */}
          <div className="space-y-4">
            <div className="h-[380px] lg:h-[440px] rounded-xl overflow-hidden border border-white/10">
              <MapView route={displayedRoute} defaultCenter={mapCenter} />
            </div>

            {state.status === 'error' && (
              <ErrorBanner message={state.message} onRetry={handleRetry} />
            )}

            {displayedRoute && (
              <>
                <RouteCard route={displayedRoute} unit={unit} />
                <WaypointList route={displayedRoute} />
              </>
            )}

            {!displayedRoute && state.status === 'idle' && (
              <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
                <p className="text-4xl mb-3">🏃</p>
                <p className="text-sm">Enter your starting location and hit Generate.</p>
                <p className="text-xs mt-1">Claude will plan a real route for you.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
