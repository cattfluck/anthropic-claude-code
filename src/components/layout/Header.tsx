import { HelpCircle, BarChart2 } from 'lucide-react'

interface HeaderProps {
  puzzleNumber: number
  unit: 'km' | 'mi'
  onToggleUnit: () => void
  onOpenHelp: () => void
  onOpenStats: () => void
}

export function Header({ puzzleNumber, unit, onToggleUnit, onOpenHelp, onOpenStats }: HeaderProps) {
  return (
    <header className="pt-6 pb-4 border-b border-white/10">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onOpenHelp} className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="How to play">
          <HelpCircle size={20} className="text-blue-300/70" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleUnit}
            className="px-2 py-1 text-xs font-semibold text-blue-300/70 hover:text-white hover:bg-white/10 rounded transition-colors"
            aria-label="Toggle distance unit"
          >
            {unit.toUpperCase()}
          </button>
          <button onClick={onOpenStats} className="p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Statistics">
            <BarChart2 size={20} className="text-blue-300/70" />
          </button>
        </div>
      </div>

      {/* Mountain peaks SVG */}
      <div className="flex justify-center mb-2">
        <svg width="120" height="36" viewBox="0 0 120 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left peak */}
          <path d="M10 34 L32 8 L54 34" fill="#1e40af" opacity="0.7" />
          <path d="M28 16 L32 8 L36 16 Z" fill="white" opacity="0.8" />
          {/* Middle peak (tallest) */}
          <path d="M30 34 L60 2 L90 34" fill="#1d4ed8" opacity="0.9" />
          <path d="M54 10 L60 2 L66 10 Z" fill="white" opacity="0.9" />
          {/* Right peak */}
          <path d="M66 34 L88 8 L110 34" fill="#1e40af" opacity="0.7" />
          <path d="M84 16 L88 8 L92 16 Z" fill="white" opacity="0.8" />
        </svg>
      </div>

      <div className="text-center">
        <h1 className="font-display tracking-widest text-white" style={{
          fontSize: '3.5rem',
          lineHeight: 1,
          textShadow: '0 0 40px rgba(96, 165, 250, 0.4), 0 2px 8px rgba(0,0,0,0.5)',
          letterSpacing: '0.15em',
        }}>
          SKIRDLE
        </h1>
        <p className="text-xs text-blue-300/60 mt-1.5 tracking-widest uppercase">
          Daily Ski Resort Puzzle · #{puzzleNumber}
        </p>
      </div>
    </header>
  )
}
