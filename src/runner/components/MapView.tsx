import { useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { RunnerRoute, LatLng } from '../types'

// Fix Leaflet's broken default icon in Vite builds
import markerIconUrl from 'leaflet/dist/images/marker-icon.png'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl: markerIconUrl, shadowUrl: markerShadowUrl })

const startIcon = new L.DivIcon({
  className: '',
  html: '<div style="width:14px;height:14px;border-radius:50%;background:#10b981;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.5)"></div>',
  iconAnchor: [7, 7],
})

const endIcon = new L.DivIcon({
  className: '',
  html: '<div style="width:14px;height:14px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.5)"></div>',
  iconAnchor: [7, 7],
})

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap()
  useEffect(() => {
    if (positions.length > 0) {
      map.fitBounds(positions, { padding: [40, 40] })
    }
  }, [map, positions])
  return null
}

interface Props {
  route: RunnerRoute | null
  defaultCenter: LatLng
}

export function MapView({ route, defaultCenter }: Props) {
  const positions: [number, number][] = route
    ? route.waypoints.map((w) => [w.position.lat, w.position.lng])
    : []

  const startWp = route?.waypoints[0]
  const endWp = route?.waypoints[route.waypoints.length - 1]

  return (
    <MapContainer
      key={route?.id ?? 'empty'}
      center={[defaultCenter.lat, defaultCenter.lng]}
      zoom={13}
      className="w-full h-full rounded-xl"
      style={{ minHeight: '380px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {positions.length > 0 && (
        <>
          <Polyline positions={positions} color="#10b981" weight={4} opacity={0.85} />
          <FitBounds positions={positions} />
          {startWp && (
            <Marker position={[startWp.position.lat, startWp.position.lng]} icon={startIcon}>
              <Popup>{startWp.label}</Popup>
            </Marker>
          )}
          {endWp && endWp !== startWp && (
            <Marker position={[endWp.position.lat, endWp.position.lng]} icon={endIcon}>
              <Popup>{endWp.label}</Popup>
            </Marker>
          )}
        </>
      )}
    </MapContainer>
  )
}
