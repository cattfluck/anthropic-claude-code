interface ProgressBarProps {
  revealed: number
  total: number
}

export function ProgressBar({ revealed, total }: ProgressBarProps) {
  const pct = (revealed / total) * 100
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-slate-400 mb-1">
        <span>Hints unlocked</span>
        <span>{revealed} / {total}</span>
      </div>
      <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
