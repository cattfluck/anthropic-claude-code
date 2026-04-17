import { useState } from 'react'
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
import { HowToPlayModal } from './components/modals/HowToPlayModal'
import { WinModal } from './components/modals/WinModal'
import { LossModal } from './components/modals/LossModal'
import { StatsModal } from './components/modals/StatsModal'

const resorts = resortsData as Resort[]

type ModalType = 'help' | 'stats' | 'result' | null

export default function App() {
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
    <div className="min-h-screen bg-mountain-dark font-body">
      <div className="max-w-lg mx-auto px-4 pb-12">
        <Header
          puzzleNumber={puzzleNumber}
          unit={unit}
          onToggleUnit={() => setUnit((u) => (u === 'km' ? 'mi' : 'km'))}
          onOpenHelp={() => setModal('help')}
          onOpenStats={() => setModal('stats')}
        />

        <main className="mt-6 space-y-6">
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
                className="text-blue-400 underline text-sm hover:text-blue-300"
              >
                View result
              </button>
            </div>
          )}

          <GuessList guesses={state.guesses} unit={unit} />
        </main>

        <footer className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
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
