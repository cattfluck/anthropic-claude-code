interface CompassProps {
  bearingDeg: number
}

export function Compass({ bearingDeg }: CompassProps) {
  return (
    <span
      className="inline-block text-lg select-none"
      style={{ transform: `rotate(${bearingDeg}deg)`, display: 'inline-block' }}
      title={`${Math.round(bearingDeg)}°`}
    >
      ↑
    </span>
  )
}
