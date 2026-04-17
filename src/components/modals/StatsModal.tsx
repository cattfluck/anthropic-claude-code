import { Modal } from './Modal'
import { loadStats } from '../../lib/storage'

interface StatsModalProps {
  onClose: () => void
}

export function StatsModal({ onClose }: StatsModalProps) {
  const stats = loadStats()
  const winPct = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0

  const statItems = [
    { label: 'Played', value: stats.gamesPlayed },
    { label: 'Win %', value: winPct },
    { label: 'Current Streak', value: stats.currentStreak },
    { label: 'Max Streak', value: stats.maxStreak },
  ]

  const maxDist = Math.max(...Object.values(stats.guessDistribution), 1)

  return (
    <Modal title="STATISTICS" onClose={onClose}>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {statItems.map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      <p className="text-sm font-semibold text-slate-300 mb-3">Guess Distribution</p>
      <div className="space-y-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const count = stats.guessDistribution[n] ?? 0
          const width = `${Math.max((count / maxDist) * 100, count > 0 ? 10 : 4)}%`
          return (
            <div key={n} className="flex items-center gap-2 text-sm">
              <span className="text-slate-400 w-3 shrink-0">{n}</span>
              <div className="flex-1 bg-slate-700 rounded overflow-hidden h-6 flex items-center">
                <div
                  className="h-full bg-blue-600 rounded flex items-center justify-end pr-2 text-xs font-bold text-white transition-all duration-500"
                  style={{ width }}
                >
                  {count > 0 ? count : ''}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
