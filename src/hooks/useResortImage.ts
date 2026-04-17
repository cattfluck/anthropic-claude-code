import { useState, useEffect } from 'react'

interface WikiSummary {
  thumbnail?: { source: string }
  originalimage?: { source: string }
}

export function useResortImage(wikipediaTitle: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setImageUrl(null)
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikipediaTitle)}`
    fetch(url)
      .then(r => r.json())
      .then((data: WikiSummary) => {
        const src = data.originalimage?.source ?? data.thumbnail?.source ?? null
        setImageUrl(src)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [wikipediaTitle])

  return { imageUrl, loading, error }
}
