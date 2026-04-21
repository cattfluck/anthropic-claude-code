import { useState } from 'react'
import { Map, Mountain } from 'lucide-react'
import resortsData from './data/resorts.json'
import type { Resort } from './types'
import { useDailyPuzzle } from './hooks/useDailyPuzzle'
import { useGameState } from './hooks/useGameState'
import { buildHints } from './lib/hints'
import { Header } from './components/layout/Header'
import { HintBoard } from './components/hints/HintBoard'
import { GuessInput } from './components/guess/GuessInput'
import { GuessList } from './components/guess/GuessList'
import { ProgressBar } from './components/ui/ProgressBar'
import { Snow } from './components/ui/Snow'
import { MountainSilhouette } from './components/ui/MountainSilhouette'
import { HowToPlayModal } from './components/modals/HowToPlayModal'
import { WinModal } from './components/modals/WinModal'
import { LossModal } from './components/modals/LossModal'
import { StatsModal } from './components/modals/StatsModal'
import { RunnerApp } from './runner/RunnerApp'

const resorts = resortsData as Resort[]

type ModalType = 'help' | 'stats' | 'result' | null
type AppMode = 'skirdle' | 'runner'

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>('runner')
  const [runnerUnit, setRunnerUnit] = useState<'km' | 'mi'>('km')

  const { resort: target, puzzleNumber, date } = useDailyPuzzle(resorts)
  const { state, dispatch } = useGameState(target, puzzleNumber, date)
  const [unit, setUnit] = useState<'km' | 'mi'>('km')
  const [modal, setModal] = useState<ModalType>(() =>
    loadFirstVisit() ? 'help' : null
  )

  const hints = buildHints(target, state.hintsRevealed)
  const guessedIds = state.guesses.map((g) => g.resort.id)
  const gameOver = state.status !== 'playing'

  function handleGuess(resort: Resort) {
    if (gameOver) return
    dispatch({ type: 'SUBMIT_GUESS', resort, target })
    if (resort.id === target.id || state.guesses.length + 1 >= 5) {
      setTimeout(() => setModal('result'), 600)
    }
  }

  function handleReset() {
    dispatch({ type: 'RESET' })
    setModal(null)
  }

  return (
    <>
      {appMode === 'runner' && (
        <RunnerApp
          unit={runnerUnit}
          onToggleUnit={() => setRunnerUnit((u) => (u === 'km' ? 'mi' : 'km'))}
        />
      )}

      {appMode === 'skirdle' && (
        <div className="relative min-h-screen font-body overflow-x-hidden">
          <Snow />
          <MountainSilhouette />

          <div className="relative z-10 max-w-lg mx-auto px-4 pb-32">
            <Header
              puzzleNumber={puzzleNumber}
              unit={unit}
              onToggleUnit={() => setUnit((u) => (u === 'km' ? 'mi' : 'km'))}
              onOpenHelp={() => setModal('help')}
              onOpenStats={() => setModal('stats')}
            />

            <main className="mt-6 space-y-4">
              <ProgressBar revealed={state.hintsRevealed} total={5} />
              <HintBoard hints={hints} guessCount={state.guesses.length} />

              {!gameOver && (
                <GuessInput
                  allResorts={resorts}
                  alreadyGuessedIds={guessedIds}
                  onGuess={handleGuess}
                  disabled={gameOver}
                />
              )}

              {gameOver && (
                <div className="text-center">
                  <button
                    onClick={() => setModal('result')}
                    className="text-blue-300 underline text-sm hover:text-blue-200"
                  >
                    View result
                  </button>
                </div>
              )}

              <GuessList guesses={state.guesses} unit={unit} />
            </main>

            <footer className="mt-10 text-center">
              <button
                onClick={handleReset}
                className="text-xs text-white/15 hover:text-white/40 transition-colors"
              >
                ↺ Reset today's puzzle
              </button>
            </footer>
          </div>

          {modal === 'help' && <HowToPlayModal onClose={() => setModal(null)} />}
          {modal === 'stats' && <StatsModal onClose={() => setModal(null)} />}
          {modal === 'result' && state.status === 'won' && (
            <WinModal state={state} target={target} onClose={() => setModal(null)} />
          )}
          {modal === 'result' && state.status === 'lost' && (
            <LossModal state={state} target={target} onClose={() => setModal(null)} />
          )}
        </div>
      )}

      {/* App switcher — always visible */}
      <button
        onClick={() => setAppMode((m) => (m === 'runner' ? 'skirdle' : 'runner'))}
        title={appMode === 'runner' ? 'Switch to Skirdle' : 'Switch to RouteRunner'}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2 bg-slate-800/90 backdrop-blur border border-white/15 rounded-full text-sm text-slate-300 hover:text-white hover:border-white/30 shadow-lg transition-all"
      >
        {appMode === 'runner' ? (
          <>
            <Mountain className="w-4 h-4" />
            Skirdle
          </>
        ) : (
          <>
            <Map className="w-4 h-4" />
            RouteRunner
          </>
        )}
      </button>
    </>
  )
}

function loadFirstVisit(): boolean {
  try {
    if (!localStorage.getItem('skirdle_visited')) {
      localStorage.setItem('skirdle_visited', '1')
      return true
    }
    return false
  } catch {
    return true
  }
}
