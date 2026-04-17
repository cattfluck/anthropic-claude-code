import { useMemo } from 'react'
import type { Resort } from '../types'

export function useAutocomplete(
  allResorts: Resort[],
  query: string,
  countryFilter: string,
  alreadyGuessedIds: string[]
): Resort[] {
  return useMemo(() => {
    if (query.length < 2) return []
    const q = query.toLowerCase()
    return allResorts
      .filter((r) => !alreadyGuessedIds.includes(r.id))
      .filter((r) => countryFilter === '' || r.country === countryFilter)
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [allResorts, query, countryFilter, alreadyGuessedIds])
}
