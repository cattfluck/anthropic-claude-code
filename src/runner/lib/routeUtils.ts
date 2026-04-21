export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = Math.round(minutes % 60)
  if (h === 0) return `${m}min`
  return m === 0 ? `${h}h` : `${h}h ${m}min`
}

export function formatDistance(km: number, unit: 'km' | 'mi'): string {
  if (unit === 'mi') return `${(km * 0.621371).toFixed(1)}mi`
  return `${km.toFixed(1)}km`
}
