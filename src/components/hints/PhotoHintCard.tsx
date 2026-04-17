import { useResortImage } from '../../hooks/useResortImage'

interface PhotoHintCardProps {
  wikiTitle: string
}

export function PhotoHintCard({ wikiTitle }: PhotoHintCardProps) {
  const { imageUrl, loading, error } = useResortImage(wikiTitle)

  if (!wikiTitle) {
    return (
      <div className="w-full h-48 rounded-lg bg-white/5 flex items-center justify-center text-white/30 text-sm">
        No photo available
      </div>
    )
  }

  if (loading) {
    return (
      <div className="w-full h-48 rounded-lg bg-white/5 animate-pulse flex items-center justify-center">
        <span className="text-white/30 text-sm">Loading photo…</span>
      </div>
    )
  }

  if (error || !imageUrl) {
    return (
      <div className="w-full h-48 rounded-lg bg-white/5 flex items-center justify-center text-white/30 text-sm">
        Photo unavailable
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt="Mystery ski resort"
      className="w-full h-48 object-cover rounded-lg"
      style={{ objectPosition: 'center' }}
    />
  )
}
