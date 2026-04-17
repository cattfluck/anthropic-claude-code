import { useState, useRef, useEffect } from 'react'
import type { Resort } from '../../types'
import { useAutocomplete } from '../../hooks/useAutocomplete'

interface GuessInputProps {
  allResorts: Resort[]
  alreadyGuessedIds: string[]
  onGuess: (resort: Resort) => void
  disabled: boolean
}

export function GuessInput({ allResorts, alreadyGuessedIds, onGuess, disabled }: GuessInputProps) {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('')
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const suggestions = useAutocomplete(allResorts, query, country, alreadyGuessedIds)
  const countries = [...new Set(allResorts.map((r) => r.country))].sort()

  useEffect(() => {
    setOpen(suggestions.length > 0)
    setHighlighted(0)
  }, [suggestions.length])

  function select(resort: Resort) {
    setQuery('')
    setOpen(false)
    onGuess(resort)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (suggestions[highlighted]) select(suggestions[highlighted])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={disabled}
          className="bg-slate-700 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          aria-label="Filter by country"
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            disabled={disabled}
            placeholder="Type a ski resort name…"
            className="w-full bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            autoComplete="off"
            aria-label="Guess a ski resort"
            aria-autocomplete="list"
            aria-expanded={open}
          />

          {open && (
            <ul
              ref={listRef}
              className="absolute z-50 w-full mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-xl overflow-hidden"
              role="listbox"
            >
              {suggestions.map((resort, i) => (
                <li
                  key={resort.id}
                  role="option"
                  aria-selected={i === highlighted}
                  onMouseDown={() => select(resort)}
                  onMouseEnter={() => setHighlighted(i)}
                  className={`px-4 py-2.5 cursor-pointer text-sm ${
                    i === highlighted ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-medium">{resort.name}</span>
                  <span className="text-slate-400 ml-2 text-xs">{resort.region}, {resort.country}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
