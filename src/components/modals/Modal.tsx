import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-mountain-mid border border-slate-600 rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl tracking-wide text-white">{title}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Close">
            <X size={20} className="text-slate-400" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
