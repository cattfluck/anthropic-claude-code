function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

export function haversineKm(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): number {
  const R = 6371
  const dLat = toRad(to.lat - from.lat)
  const dLng = toRad(to.lng - from.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function bearingDeg(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): number {
  const dLng = toRad(to.lng - from.lng)
  const y = Math.sin(dLng) * Math.cos(toRad(to.lat))
  const x =
    Math.cos(toRad(from.lat)) * Math.sin(toRad(to.lat)) -
    Math.sin(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.cos(dLng)
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

export function formatDistance(km: number, unit: 'km' | 'mi' = 'km'): string {
  const val = unit === 'mi' ? km * 0.621371 : km
  return `${Math.round(val).toLocaleString()} ${unit}`
}

export function distanceColorClass(km: number): string {
  if (km === 0) return 'bg-green-500'
  if (km < 200) return 'bg-yellow-400'
  if (km < 1000) return 'bg-orange-400'
  return 'bg-red-500'
}
