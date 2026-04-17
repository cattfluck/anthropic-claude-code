import { distanceColorClass, formatDistance } from '../../lib/distance'

interface BadgeProps {
  distanceKm: number
  unit: 'km' | 'mi'
}

export function Badge({ distanceKm, unit }: BadgeProps) {
  const colorClass = distanceColorClass(distanceKm)
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-white ${colorClass}`}>
      {distanceKm === 0 ? '🎿 Correct!' : formatDistance(distanceKm, unit)}
    </span>
  )
}
