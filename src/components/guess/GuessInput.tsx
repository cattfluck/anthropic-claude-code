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
    background: 'rgba(255,255,255,0.8)',
    border: '1px solid rgba(148,196,255,0.4)',
    color: '#1a3a5c',
  }

  return (
    <div className="relative">
      <div className="flex gap-2">
        <select
          value={country}
          onChange={e => { setCountry(e.target.value); setOpen(true) }}
          disabled={disabled}
          className="rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:opacity-50"
          style={inputStyle}
          aria-label="Filter by country"
        >
          <option value="">🌍 All</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
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
            className="w-full rounded-xl px-4 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 disabled:opacity-50"
            style={inputStyle}
            autoComplete="off"
            aria-label="Guess a ski resort"
            aria-autocomplete="list"
            aria-expanded={open}
          />

          {open && (
            <ul
              ref={listRef}
              className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden shadow-xl max-h-64 overflow-y-auto"
              style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid rgba(148,196,255,0.4)', backdropFilter: 'blur(12px)' }}
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
                  style={{ background: i === highlighted ? 'rgba(125,191,255,0.25)' : 'transparent' }}
                >
                  <span className="font-semibold text-slate-800">{resort.name}</span>
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
