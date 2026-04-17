import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl" style={{
        background: 'linear-gradient(135deg, rgba(13,27,53,0.98) 0%, rgba(10,22,40,0.98) 100%)',
        border: '1px solid rgba(148,196,255,0.2)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl tracking-wide text-white" style={{ textShadow: '0 0 20px rgba(96,165,250,0.3)' }}>
            {title}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors" aria-label="Close">
            <X size={20} className="text-white/40" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
