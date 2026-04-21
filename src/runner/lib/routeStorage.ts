import type { RunnerRoute } from '../types'

const ROUTES_KEY = 'runner_recent_routes'
const MAX_SAVED = 10

export function loadRecentRoutes(): RunnerRoute[] {
  try {
    const raw = localStorage.getItem(ROUTES_KEY)
    return raw ? (JSON.parse(raw) as RunnerRoute[]) : []
  } catch {
    return []
  }
}

export function saveRecentRoutes(routes: RunnerRoute[]): void {
  try {
    localStorage.setItem(ROUTES_KEY, JSON.stringify(routes.slice(0, MAX_SAVED)))
  } catch {
    // localStorage unavailable or full — silently skip
  }
}
