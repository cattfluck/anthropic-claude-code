interface Props {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  emoji?: string
}

export function PreferenceToggle({ label, checked, onChange, emoji }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
        checked
          ? 'bg-emerald-500 border-emerald-400 text-white'
          : 'bg-white/5 border-white/15 text-slate-300 hover:border-white/30 hover:text-white'
      }`}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </button>
  )
}
