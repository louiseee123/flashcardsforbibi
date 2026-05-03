import { useState } from 'react';
import { useFlashcards } from '../hooks/useFlashcards';
import FlashcardView from '../components/FlashcardView';
import StatsPanel from '../components/StatsPanel';
import { GraduationCap, LayoutGrid, List, Award } from 'lucide-react';
import { flashcards as allFlashcards } from '../data/flashcards';

function AllCardsView() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3 animate-fade-in">
      {allFlashcards.map((card, idx) => (
        <div
          key={card.id}
          className="rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer"
          style={{
            background: openCard === card.id ? 'hsl(25, 25%, 92%)' : 'hsl(25, 28%, 96%)',
            borderColor: openCard === card.id ? 'hsl(20, 20%, 70%)' : 'hsl(25, 20%, 88%)',
          }}
          onClick={() => setOpenCard(openCard === card.id ? null : card.id)}
        >
          <div className="p-4 sm:p-5 flex items-start gap-3">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'hsl(20, 25%, 35%)', color: 'hsl(25, 30%, 96%)' }}
            >
              {idx + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium text-stone-800 leading-relaxed">
                {card.question}
              </p>
              {card.acronym && (
                <span
                  className="inline-block mt-1.5 px-2 py-0.5 rounded text-xs font-semibold tracking-wider"
                  style={{ background: 'hsl(20, 20%, 88%)', color: 'hsl(20, 25%, 30%)' }}
                >
                  {card.acronym}
                </span>
              )}
            </div>
          </div>

          {openCard === card.id && (
            <div
              className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 border-t animate-slide-up"
              style={{ borderColor: 'hsl(25, 20%, 85%)' }}
            >
              <div className="pl-11">
                {card.answers.length === 1 ? (
                  <p className="text-base font-semibold text-stone-700">{card.answers[0]}</p>
                ) : (
                  <ul className="space-y-2">
                    {card.answers.map((answer, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{ background: 'hsl(20, 20%, 80%)', color: 'hsl(20, 25%, 35%)' }}
                        >
                          {i + 1}
                        </span>
                        {answer}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState<'study' | 'browse'>('study');
  const {
    currentCard,
    currentIndex,
    isFlipped,
    flipCard,
    markCard,
    nextCard,
    prevCard,
    shuffle,
    resetOrder,
    isShuffled,
    stats,
    mode,
    setMode,
    currentProgress,
    resetProgress,
    cards,
  } = useFlashcards();

  return (
    <div className="min-h-screen w-full" style={{ background: 'hsl(25, 30%, 97%)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          background: 'rgba(250, 247, 244, 0.85)',
          borderColor: 'hsl(25, 20%, 88%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'hsl(20, 25%, 35%)' }}
            >
              <GraduationCap size={22} style={{ color: 'hsl(25, 30%, 96%)' }} />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight" style={{ color: 'hsl(20, 25%, 20%)' }}>
                EDUC 9 Flashcards
              </h1>
              <p className="text-xs text-stone-500">Final Oral Recitation Reviewer</p>
            </div>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'hsl(25, 20%, 90%)' }}>
            <button
              onClick={() => setTab('study')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                tab === 'study' ? 'shadow-sm' : 'hover:opacity-70'
              }`}
              style={{
                background: tab === 'study' ? 'hsl(25, 28%, 96%)' : 'transparent',
                color: tab === 'study' ? 'hsl(20, 25%, 25%)' : 'hsl(20, 15%, 50%)',
              }}
            >
              <LayoutGrid size={16} />
              Study
            </button>
            <button
              onClick={() => setTab('browse')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                tab === 'browse' ? 'shadow-sm' : 'hover:opacity-70'
              }`}
              style={{
                background: tab === 'browse' ? 'hsl(25, 28%, 96%)' : 'transparent',
                color: tab === 'browse' ? 'hsl(20, 25%, 25%)' : 'hsl(20, 15%, 50%)',
              }}
            >
              <List size={16} />
              Browse
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {tab === 'study' ? (
          <div className="space-y-8">
            <StatsPanel
              stats={stats}
              mode={mode}
              setMode={setMode}
              onShuffle={shuffle}
              onResetOrder={resetOrder}
              isShuffled={isShuffled}
              onResetProgress={resetProgress}
            />

            {cards.length > 0 && currentCard ? (
              <FlashcardView
                card={currentCard}
                isFlipped={isFlipped}
                onFlip={flipCard}
                onMark={markCard}
                onNext={nextCard}
                onPrev={prevCard}
                currentIndex={currentIndex}
                totalCards={cards.length}
                cardProgress={currentProgress}
              />
            ) : (
              <div
                className="text-center py-16 rounded-2xl border"
                style={{ background: 'hsl(25, 28%, 94%)', borderColor: 'hsl(25, 20%, 88%)' }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'hsl(25, 20%, 90%)' }}
                >
                  <Award size={28} style={{ color: 'hsl(20, 20%, 50%)' }} />
                </div>
                <h3 className="text-lg font-semibold text-stone-700 mb-1">
                  {mode === 'mastered' ? 'All cards mastered!' : mode === 'learning' ? 'No cards in learning mode' : 'No cards to show'}
                </h3>
                <p className="text-sm text-stone-500">
                  {mode === 'mastered' ? 'Great job! Try another mode to keep studying.' : 'Try switching to a different mode.'}
                </p>
                <button
                  onClick={() => setMode('all')}
                  className="mt-4 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                  style={{ background: 'hsl(20, 25%, 35%)', color: 'hsl(25, 30%, 96%)' }}
                >
                  Show All Cards
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: 'hsl(20, 25%, 20%)' }}>
                All {allFlashcards.length} Cards
              </h2>
              <span className="text-sm text-stone-500">Click to expand answers</span>
            </div>
            <AllCardsView />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 py-6 text-center">
        <p className="text-xs text-stone-400">
          EDUC 9 Final Oral Recitation Reviewer — Study smart!
        </p>
      </footer>
    </div>
  );
}
