import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import { Mountain, Wine, Snowflake, MapPin, BarChart2, Lock, ChevronRight, ChevronLeft } from 'lucide-react'

interface HowToPlayModalProps {
  onClose: () => void
}

const steps = [
  {
    title: 'Welcome to Skirdle! ⛷️',
    content: (
      <div className="space-y-4">
        <p className="text-slate-300 text-sm leading-relaxed">
          A new mystery ski resort every day. Guess it from <span className="text-white font-semibold">5 hints</span> — each wrong guess unlocks the next clue.
        </p>
        <div className="bg-slate-800 rounded-xl p-4 space-y-2">
          {[
            { icon: Mountain, label: 'Hint 1', desc: 'Mountain range', color: 'text-blue-400' },
            { icon: Wine, label: 'Hint 2', desc: 'Après bars', color: 'text-blue-400' },
            { icon: Snowflake, label: 'Hint 3', desc: 'Famous runs', color: 'text-blue-400' },
            { icon: MapPin, label: 'Hint 4', desc: 'Country', color: 'text-blue-400' },
            { icon: BarChart2, label: 'Hint 5', desc: 'Mountain stats', color: 'text-blue-400' },
          ].map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <Icon size={15} className={`${color} shrink-0`} />
              <span className="text-slate-400 w-12 shrink-0 text-xs">{label}</span>
              <span className="text-white">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Reading the hints',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300 text-sm">Hint 1 is always visible. Locked hints look like this:</p>
        <div className="rounded-xl border border-slate-600 bg-mountain-mid p-4 opacity-60 flex items-center gap-3">
          <Lock size={15} className="text-slate-500 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Après Bars</p>
            <p className="text-sm text-slate-500">Unlocks after your next guess</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm">A revealed hint looks like this:</p>
        <div className="rounded-xl border border-slate-500 bg-slate-700 p-4 flex items-start gap-3">
          <Mountain size={17} className="text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Mountain Range</p>
            <p className="text-sm text-white font-medium mt-0.5">Rocky Mountains</p>
          </div>
        </div>
        <p className="text-slate-400 text-xs">Use the clues to narrow down your guess!</p>
      </div>
    ),
  },
  {
    title: 'Making a guess',
    content: (
      <div className="space-y-3">
        <p className="text-slate-300 text-sm">Type a resort name in the search box. Filter by country to narrow it down.</p>
        <div className="bg-slate-800 rounded-xl p-3 flex gap-2 items-center">
          <div className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-400">🌍 France</div>
          <div className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-400">Chamonix…</div>
        </div>
        <p className="text-slate-300 text-sm">After a wrong guess you'll see:</p>
        <div className="bg-slate-800 rounded-lg px-4 py-3 flex items-center gap-3">
          <span className="text-slate-500 text-sm w-4">1</span>
          <span className="flex-1 text-white text-sm font-medium">Chamonix Mont-Blanc</span>
          <span className="text-lg" style={{ display: 'inline-block', transform: 'rotate(45deg)' }}>↑</span>
          <span className="bg-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">643 km</span>
        </div>
        <p className="text-slate-400 text-xs">The arrow points toward the mystery resort from your guess. The colour shows how close you are.</p>
      </div>
    ),
  },
  {
    title: 'Distance colours',
    content: (
      <div className="space-y-4">
        <p className="text-slate-300 text-sm">The badge colour tells you how close your guess was:</p>
        <div className="space-y-2.5">
          {[
            { color: 'bg-green-500', label: 'Correct!', desc: 'That\'s the resort 🎿' },
            { color: 'bg-yellow-400', label: '< 200 km', desc: 'Very close — same region' },
            { color: 'bg-orange-400', label: '< 1,000 km', desc: 'Same country or nearby' },
            { color: 'bg-red-500', label: '1,000+ km', desc: 'Different part of the world' },
          ].map(({ color, label, desc }) => (
            <div key={label} className="flex items-center gap-3">
              <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full w-24 text-center shrink-0`}>{label}</span>
              <span className="text-slate-300 text-sm">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-xs mt-2">You have <span className="text-white font-semibold">5 guesses</span> — one per hint. Good luck! 🏔️</p>
      </div>
    ),
  },
]

export function HowToPlayModal({ onClose }: HowToPlayModalProps) {
  const [step, setStep] = useState(0)
  const isLast = step === steps.length - 1

  return (
    <Modal title={steps[step].title} onClose={onClose}>
      <div className="min-h-[220px]">
        {steps[step].content}
      </div>

      {/* Step dots */}
      <div className="flex justify-center gap-1.5 my-4">
        {steps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-blue-500' : 'bg-slate-600'}`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>

      <div className="flex gap-3">
        {step > 0 && (
          <Button variant="ghost" onClick={() => setStep(s => s - 1)} className="flex items-center gap-1">
            <ChevronLeft size={16} /> Back
          </Button>
        )}
        <Button
          className="flex-1 flex items-center justify-center gap-1"
          onClick={isLast ? onClose : () => setStep(s => s + 1)}
        >
          {isLast ? "Let's play!" : (<>Next <ChevronRight size={16} /></>)}
        </Button>
      </div>
    </Modal>
  )
}
