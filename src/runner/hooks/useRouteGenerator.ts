import { useState, useCallback } from 'react'
import { generateRoute } from '../lib/claudeClient'
import type { RouteRequestParams, RunnerRoute } from '../types'

type GeneratorState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; route: RunnerRoute }
  | { status: 'error'; message: string }

export function useRouteGenerator() {
  const [state, setState] = useState<GeneratorState>({ status: 'idle' })

  const generate = useCallback(async (params: RouteRequestParams) => {
    setState({ status: 'loading' })
    try {
      const route = await generateRoute(params)
      setState({ status: 'success', route })
      return route
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setState({ status: 'error', message })
      return null
    }
  }, [])

  const reset = useCallback(() => setState({ status: 'idle' }), [])

  return { state, generate, reset }
}
