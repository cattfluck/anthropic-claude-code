import { useState, useCallback } from 'react'
import { loadRecentRoutes, saveRecentRoutes } from '../lib/routeStorage'
import type { RunnerRoute } from '../types'

export function useRecentRoutes() {
  const [routes, setRoutes] = useState<RunnerRoute[]>(() => loadRecentRoutes())

  const addRoute = useCallback((route: RunnerRoute) => {
    setRoutes((prev) => {
      const updated = [route, ...prev.filter((r) => r.id !== route.id)].slice(0, 10)
      saveRecentRoutes(updated)
      return updated
    })
  }, [])

  const removeRoute = useCallback((id: string) => {
    setRoutes((prev) => {
      const updated = prev.filter((r) => r.id !== id)
      saveRecentRoutes(updated)
      return updated
    })
  }, [])

  return { routes, addRoute, removeRoute }
}
