import Anthropic from '@anthropic-ai/sdk'
import { SYSTEM_PROMPT, buildUserPrompt } from './prompts'
import type { RouteRequestParams, RunnerRoute } from '../types'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function generateRoute(params: RouteRequestParams): Promise<RunnerRoute> {
  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: buildUserPrompt(params) }],
  })

  const block = message.content[0]
  if (block.type !== 'text') throw new Error('Unexpected response type from Claude')

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(block.text.trim())
  } catch {
    throw new Error('Claude returned invalid JSON. Please try again.')
  }

  const waypoints = (parsed.waypoints as Array<Record<string, unknown>>).map((w) => ({
    position: { lat: w.lat as number, lng: w.lng as number },
    label: w.label as string,
    distanceFromStartKm: w.distanceFromStartKm as number,
    type: w.type as 'start' | 'turn' | 'landmark' | 'end',
  }))

  return {
    id: crypto.randomUUID(),
    generatedAt: new Date().toISOString(),
    requestParams: params,
    name: parsed.name as string,
    description: parsed.description as string,
    routeType: parsed.routeType as 'loop' | 'out-and-back' | 'point-to-point',
    totalDistanceKm: parsed.totalDistanceKm as number,
    estimatedMinutes: parsed.estimatedMinutes as number,
    elevationProfileNote: parsed.elevationProfileNote as string,
    highlights: parsed.highlights as string[],
    waypoints,
  }
}
