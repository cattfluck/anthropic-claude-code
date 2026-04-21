export interface LatLng {
  lat: number
  lng: number
}

export interface Waypoint {
  position: LatLng
  label: string
  distanceFromStartKm: number
  type: 'start' | 'turn' | 'landmark' | 'end'
}

export interface RoutePreferences {
  avoidHills: boolean
  avoidMainRoads: boolean
  preferCanals: boolean
  preferParks: boolean
  preferTrails: boolean
  routeShape: 'loop' | 'out-and-back' | 'point-to-point'
}

export interface RouteRequestParams {
  startLocation: string
  startCoords: LatLng | null
  distanceKm: number
  unit: 'km' | 'mi'
  preferences: RoutePreferences
}

export interface RunnerRoute {
  id: string
  name: string
  description: string
  waypoints: Waypoint[]
  totalDistanceKm: number
  estimatedMinutes: number
  elevationProfileNote: string
  highlights: string[]
  routeType: 'loop' | 'out-and-back' | 'point-to-point'
  generatedAt: string
  requestParams: RouteRequestParams
}
