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
    <header className="pt-6 pb-4 border-b border-white/50">
      <div className="flex items-center justify-between mb-3">
        <button onClick={onOpenHelp} className="p-2 hover:bg-white/50 rounded-xl transition-colors" aria-label="How to play">
          <HelpCircle size={20} className="text-sky-600" />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleUnit}
            className="px-2.5 py-1 text-xs font-bold text-sky-600 hover:bg-white/50 rounded-lg transition-colors"
          >
            {unit.toUpperCase()}
          </button>
          <button onClick={onOpenStats} className="p-2 hover:bg-white/50 rounded-xl transition-colors" aria-label="Statistics">
            <BarChart2 size={20} className="text-sky-600" />
          </button>
        </div>
      </div>

      {/* Mountain peaks */}
      <div className="flex justify-center mb-1">
        <svg width="130" height="42" viewBox="0 0 130 42" fill="none">
          <path d="M12 40 L36 6 L60 40" fill="#1e4d8c" opacity="0.5" />
          <path d="M32 14 L36 6 L40 14 Z" fill="white" opacity="0.9" />
          <path d="M34 40 L65 2 L96 40" fill="#1e4d8c" opacity="0.75" />
          <path d="M59 10 L65 2 L71 10 Z" fill="white" />
          <path d="M70 40 L94 6 L118 40" fill="#1e4d8c" opacity="0.5" />
          <path d="M90 14 L94 6 L98 14 Z" fill="white" opacity="0.9" />
        </svg>
      </div>

      <div className="text-center">
        <h1
          className="font-display tracking-widest"
          style={{
            fontSize: '3.8rem',
            lineHeight: 1,
            letterSpacing: '0.18em',
            color: '#1a3a5c',
            textShadow: '0 2px 12px rgba(30,80,160,0.15)',
          }}
        >
          SKIRDLE
        </h1>
        <p className="text-xs font-semibold text-sky-500 mt-1.5 tracking-widest uppercase">
          Daily Ski Resort Puzzle · #{puzzleNumber}
        </p>
      </div>
    </header>
  )
}
