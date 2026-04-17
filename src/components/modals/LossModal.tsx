import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import type { GameState, Resort } from '../../types'
import { buildShareText, copyToClipboard } from '../../lib/sharing'

interface LossModalProps {
  state: GameState
  target: Resort
  onClose: () => void
}

export function LossModal({ state, target, onClose }: LossModalProps) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const text = buildShareText(state)
    const ok = await copyToClipboard(text)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Modal title="❄️ OUT OF GUESSES" onClose={onClose}>
      <p className="text-center text-slate-300 text-sm mb-1">The resort was</p>
      <p className="text-center text-2xl font-bold text-white mb-1">{target.name}</p>
      <p className="text-center text-slate-400 text-xs mb-6">
        {target.region}, {target.country} · {target.mountainRange}
      </p>

      <div className="bg-slate-800 rounded-xl p-4 text-sm text-slate-300 space-y-1.5 mb-6">
        <div className="flex justify-between"><span>Vertical drop</span><span className="text-white font-medium">{target.verticalDropM}m</span></div>
        <div className="flex justify-between"><span>Runs</span><span className="text-white font-medium">{target.numberOfRuns}</span></div>
        <div className="flex justify-between"><span>Annual snowfall</span><span className="text-white font-medium">{target.annualSnowfallCm} cm</span></div>
        <div className="flex justify-between"><span>Opened</span><span className="text-white font-medium">{target.yearOpened}</span></div>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>Close</Button>
        <Button className="flex-1" onClick={handleShare}>
          {copied ? '✓ Copied!' : 'Share Result'}
        </Button>
      </div>
    </Modal>
  )
}
