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
    <header className="flex items-center justify-between py-4 border-b border-slate-700">
      <button onClick={onOpenHelp} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="How to play">
        <HelpCircle size={20} className="text-slate-400" />
      </button>

      <div className="text-center">
        <h1 className="font-display text-4xl tracking-widest text-white">SKIRDLE</h1>
        <p className="text-xs text-slate-400 mt-0.5">#{puzzleNumber} · Daily Ski Resort Puzzle</p>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleUnit}
          className="px-2 py-1 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
          aria-label="Toggle distance unit"
        >
          {unit.toUpperCase()}
        </button>
        <button onClick={onOpenStats} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Statistics">
          <BarChart2 size={20} className="text-slate-400" />
        </button>
      </div>
    </header>
  )
}
