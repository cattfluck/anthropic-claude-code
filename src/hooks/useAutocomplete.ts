import { useMemo } from 'react'
import type { Resort } from '../types'

export function useAutocomplete(
  allResorts: Resort[],
  query: string,
  countryFilter: string,
  alreadyGuessedIds: string[]
): Resort[] {
  return useMemo(() => {
    const base = allResorts
      .filter((r) => !alreadyGuessedIds.includes(r.id))
      .filter((r) => countryFilter === '' || r.country === countryFilter)

    if (query.length === 0) {
      // Show all resorts from selected country; nothing if no filter
      return countryFilter !== '' ? base : []
    }

    const q = query.toLowerCase()
    return base
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.country.toLowerCase().includes(q)
      )
      .slice(0, 8)
  }, [allResorts, query, countryFilter, alreadyGuessedIds])
}
