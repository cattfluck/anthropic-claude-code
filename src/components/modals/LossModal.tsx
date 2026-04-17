import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import type { GameState, Resort } from '../../types'
import { buildShareText, shareResult } from '../../lib/sharing'
import clueData from '../../data/clues.json'

const clueMap = clueData as Record<string, {
  mountainSystem: string; apresBars: string[];
  signatureHook: string; skiNetwork: string; geoTag: string
}>

interface LossModalProps {
  state: GameState
  target: Resort
  onClose: () => void
}

export function LossModal({ state, target, onClose }: LossModalProps) {
  const [label, setLabel] = useState('Share Result')
  const c = clueMap[target.id]

  async function handleShare() {
    const text = buildShareText(state, target)
    const result = await shareResult(text)
    if (result === 'copied') {
      setLabel('✓ Copied!')
      setTimeout(() => setLabel('Share Result'), 2000)
    }
  }

  return (
    <Modal title="❄️ OUT OF GUESSES" onClose={onClose}>
      <p className="text-center text-slate-300 text-sm mb-1">The resort was</p>
      <p className="text-center text-2xl font-bold text-white mb-1">{target.name}</p>
      <p className="text-center text-slate-400 text-xs mb-6">{target.region}, {target.country}</p>

      {c && (
        <div className="bg-slate-800 rounded-xl p-4 text-sm text-slate-300 space-y-1.5 mb-6">
          <div className="flex justify-between"><span>Mountain System</span><span className="text-white font-medium">{c.mountainSystem}</span></div>
          <div className="flex justify-between"><span>Ski Network</span><span className="text-white font-medium">{c.skiNetwork}</span></div>
          <div className="flex justify-between"><span>Location</span><span className="text-white font-medium">{c.geoTag}</span></div>
          <div className="flex justify-between"><span>Signature</span><span className="text-white font-medium text-right max-w-[55%]">{c.signatureHook}</span></div>
        </div>
      )}

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>Close</Button>
        <Button className="flex-1" onClick={handleShare}>{label}</Button>
      </div>
    </Modal>
  )
}
