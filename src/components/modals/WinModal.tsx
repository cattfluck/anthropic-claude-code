import { useState } from 'react'
import { Modal } from './Modal'
import { Button } from '../ui/Button'
import type { GameState, Resort } from '../../types'
import { buildShareText, copyToClipboard } from '../../lib/sharing'

interface WinModalProps {
  state: GameState
  target: Resort
  onClose: () => void
}

export function WinModal({ state, target, onClose }: WinModalProps) {
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
    <Modal title="🎿 YOU GOT IT!" onClose={onClose}>
      <p className="text-center text-slate-300 text-sm mb-2">
        The resort was <span className="font-bold text-white">{target.name}</span>
      </p>
      <p className="text-center text-slate-400 text-xs mb-6">
        {target.region}, {target.country} · {target.mountainRange}
      </p>

      <div className="bg-slate-800 rounded-xl p-4 text-center mb-6">
        <p className="text-4xl font-display tracking-widest text-white">{state.guesses.length}<span className="text-slate-400">/5</span></p>
        <p className="text-slate-400 text-sm mt-1">guesses used</p>
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" className="flex-1" onClick={onClose}>Continue</Button>
        <Button className="flex-1" onClick={handleShare}>
          {copied ? '✓ Copied!' : 'Share Result'}
        </Button>
      </div>
    </Modal>
  )
}
