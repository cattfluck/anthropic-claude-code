import { Modal } from './Modal'
import { Mountain, Wine, Snowflake, BarChart2, MapPin } from 'lucide-react'

interface HowToPlayModalProps {
  onClose: () => void
}

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
  return (
    <Modal title="HOW TO PLAY" onClose={onClose}>
      <p className="text-slate-300 text-sm mb-4">
        Guess today's mystery ski resort in 5 guesses. Each wrong guess reveals a new hint and shows how far away your guess was.
      </p>

      <div className="space-y-3 mb-5">
        {[
          { icon: Mountain, label: 'Hint 1', desc: 'Mountain range' },
          { icon: Wine, label: 'Hint 2', desc: 'Après bars' },
          { icon: Snowflake, label: 'Hint 3', desc: 'Famous runs' },
          { icon: MapPin, label: 'Hint 4', desc: 'Country' },
          { icon: BarChart2, label: 'Hint 5', desc: 'Mountain stats' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <Icon size={16} className="text-blue-400 shrink-0" />
            <span className="text-slate-400 w-14 shrink-0">{label}</span>
            <span className="text-white">{desc}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm border-t border-slate-600 pt-4">
        <p className="text-slate-300 font-semibold">Distance colours</p>
        <div className="flex gap-3 flex-wrap">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Correct!</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" /> &lt; 200 km</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> &lt; 1000 km</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> 1000+ km</span>
        </div>
        <p className="text-slate-400 text-xs mt-2">The arrow ↑ points toward the target resort from your guess.</p>
      </div>

      <p className="text-slate-400 text-xs mt-4 text-center">A new puzzle every day. Share your result!</p>
    </Modal>
  )
}
