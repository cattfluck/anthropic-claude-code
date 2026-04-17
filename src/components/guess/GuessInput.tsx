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
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, suggestions.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (suggestions[highlighted]) select(suggestions[highlighted]) }
    else if (e.key === 'Escape') { setOpen(false) }
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'white',
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          disabled={disabled}
          className="rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 text-white/80"
          style={inputStyle}
          aria-label="Filter by country"
        >
          <option value="" style={{ background: '#0d1b35' }}>🌍 All</option>
          {countries.map(c => (
            <option key={c} value={c} style={{ background: '#0d1b35' }}>{c}</option>
          ))}
        </select>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            disabled={disabled}
            placeholder="Type a ski resort…"
            className="w-full rounded-xl px-4 py-2.5 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50"
            style={inputStyle}
            autoComplete="off"
            aria-label="Guess a ski resort"
            aria-autocomplete="list"
            aria-expanded={open}
          />

          {open && (
            <ul
              ref={listRef}
              className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-2xl"
              style={{ background: '#0d1b35', border: '1px solid rgba(255,255,255,0.15)' }}
              role="listbox"
            >
              {suggestions.map((resort, i) => (
                <li
                  key={resort.id}
                  role="option"
                  aria-selected={i === highlighted}
                  onMouseDown={() => select(resort)}
                  onMouseEnter={() => setHighlighted(i)}
                  className="px-4 py-2.5 cursor-pointer text-sm transition-colors"
                  style={{ background: i === highlighted ? 'rgba(96,165,250,0.2)' : 'transparent' }}
                >
                  <span className="font-medium text-white">{resort.name}</span>
                  <span className="text-white/40 ml-2 text-xs">{resort.region}, {resort.country}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
