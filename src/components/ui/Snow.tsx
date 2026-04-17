import { useMemo } from 'react'

export function Snow() {
  const flakes = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 10,
      duration: Math.random() * 8 + 8,
      opacity: Math.random() * 0.5 + 0.2,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flakes.map(f => (
        <div
          key={f.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${f.left}%`,
            top: '-10px',
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animation: `snowfall ${f.duration}s ${f.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  )
}
