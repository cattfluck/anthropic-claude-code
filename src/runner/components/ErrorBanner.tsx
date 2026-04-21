import { AlertCircle, RefreshCw } from 'lucide-react'

interface Props {
  message: string
  onRetry: () => void
}

export function ErrorBanner({ message, onRetry }: Props) {
  return (
    <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-red-300">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors flex-shrink-0"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry
      </button>
    </div>
  )
}
