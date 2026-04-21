import type { RouteRequestParams } from '../types'

export const SYSTEM_PROMPT = `You are a precise running route planning assistant. Your sole job is to generate running routes as valid JSON objects.

Rules:
- Output ONLY a single JSON object. No markdown, no code fences, no explanatory text before or after.
- Waypoints must be real, navigable locations. Use actual street names, path names, or landmarks.
- Provide at least 8 waypoints for routes under 5km, at least 15 for routes 5–15km, and at least 20 for longer routes. More waypoints = smoother polyline on a map.
- Waypoints must form a coherent geographic sequence. Each lat/lng must advance logically along the route.
- totalDistanceKm must reflect the actual route distance calculated from consecutive waypoints (±5% tolerance).
- estimatedMinutes uses a 6 min/km pace for flat routes; adjust upward for hilly terrain.
- highlights: 2–5 notable points of interest the runner passes.
- elevationProfileNote: one sentence describing the terrain profile.
- routeType: "loop" if start ≈ end within 200m, "out-and-back" if it retraces, else "point-to-point".
- name: a memorable, local-flavoured route name (e.g. "Highbury Fields Figure-8").
- description: 2–3 sentences describing the run vividly, in second person ("You'll start at...").

Required JSON schema (output only this, nothing else):
{
  "name": string,
  "description": string,
  "routeType": "loop" | "point-to-point" | "out-and-back",
  "totalDistanceKm": number,
  "estimatedMinutes": number,
  "elevationProfileNote": string,
  "highlights": string[],
  "waypoints": [
    {
      "lat": number,
      "lng": number,
      "label": string,
      "distanceFromStartKm": number,
      "type": "start" | "turn" | "landmark" | "end"
    }
  ]
}`

export function buildUserPrompt(params: RouteRequestParams): string {
  const distDisplay =
    params.unit === 'mi'
      ? `${(params.distanceKm * 0.621371).toFixed(1)} miles (${params.distanceKm.toFixed(1)}km)`
      : `${params.distanceKm.toFixed(1)}km`

  const coordClue = params.startCoords
    ? ` (GPS coordinates: ${params.startCoords.lat.toFixed(5)}, ${params.startCoords.lng.toFixed(5)})`
    : ''

  const prefs = params.preferences
  const prefLines = [
    prefs.avoidHills && '- Avoid significant hills; keep terrain as flat as possible',
    prefs.avoidMainRoads && '- Avoid main roads and busy traffic; prefer quiet streets, paths, or trails',
    prefs.preferCanals && '- Route along canal towpaths and riverside paths where available',
    prefs.preferParks && '- Route through parks and green spaces where possible',
    prefs.preferTrails && '- Prefer off-road trails and footpaths over tarmac',
  ]
    .filter(Boolean)
    .join('\n')

  return `Generate a ${prefs.routeShape} running route.
Starting location: ${params.startLocation}${coordClue}
Target distance: ${distDisplay}

Preferences:
${prefLines || '- No specific preferences; balance variety and practicality'}

Return the route as a JSON object matching the required schema exactly.`
}
