import { useState, useEffect } from 'react';
import type { CardStatus } from '../hooks/useFlashcards';
import type { Flashcard } from '../data/flashcards';
import { Check, X, RotateCw, ChevronLeft, ChevronRight, Award, BookOpen, Eye } from 'lucide-react';

interface FlashcardViewProps {
  card: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
  onMark: (status: CardStatus) => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalCards: number;
  cardProgress: { status: CardStatus; attempts: number; correct: number } | null;
}

export default function FlashcardView({
  card,
  isFlipped,
  onFlip,
  onMark,
  onNext,
  onPrev,
  currentIndex,
  totalCards,
  cardProgress,
}: FlashcardViewProps) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setShowHint(false);
  }, [card.id]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onFlip();
    } else if (e.key === 'ArrowRight') {
      onNext();
    } else if (e.key === 'ArrowLeft') {
      onPrev();
    } else if (e.key === '1' && isFlipped) {
      onMark('mastered');
    } else if (e.key === '2' && isFlipped) {
      onMark('learning');
    }
  };

  const statusBadge = () => {
    if (!cardProgress) return null;
    const config = {
      mastered: { icon: Award, text: 'Mastered', class: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
      learning: { icon: BookOpen, text: 'Learning', class: 'bg-amber-100 text-amber-800 border-amber-200' },
      unseen: { icon: Eye, text: 'Unseen', class: 'bg-stone-100 text-stone-600 border-stone-200' },
    };
    const cfg = config[cardProgress.status];
    const Icon = cfg.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.class}`}>
        <Icon size={12} />
        {cfg.text}
      </span>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Progress bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-stone-600">
            Card {currentIndex + 1} of {totalCards}
          </span>
          {statusBadge()}
        </div>
        <div className="w-32 h-2 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-stone-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Card container with flip */}
      <div className="perspective-1000 relative h-[420px] sm:h-[380px] cursor-pointer" onClick={onFlip}>
        <div
          className={`preserve-3d w-full h-full relative transition-transform duration-600 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front - Question */}
          <div
            className="backface-hidden absolute inset-0 w-full h-full rounded-2xl shadow-lg border border-stone-200/60 flex flex-col items-center justify-center p-8"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, hsl(25, 30%, 96%) 0%, hsl(25, 25%, 92%) 100%)',
            }}
          >
            <div className="absolute top-5 left-6">
              <span className="text-xs font-semibold tracking-wider text-stone-400 uppercase">Question</span>
            </div>
            
            {card.acronym && (
              <div className="mb-4">
                <span 
                  className="px-4 py-2 rounded-lg text-sm font-bold tracking-widest cursor-help"
                  style={{ 
                    background: 'hsl(20, 20%, 88%)', 
                    color: 'hsl(20, 25%, 30%)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHint(!showHint);
                  }}
                  title="Click for hint"
                >
                  {card.acronym}
                </span>
              </div>
            )}

            <h2 className="text-xl sm:text-2xl font-semibold text-center text-stone-800 leading-relaxed">
              {card.question}
            </h2>

            <div className="absolute bottom-6 flex items-center gap-2 text-stone-400 text-sm">
              <RotateCw size={16} />
              <span>Click or press Space to flip</span>
            </div>
          </div>

          {/* Back - Answer */}
          <div
            className="backface-hidden absolute inset-0 w-full h-full rounded-2xl shadow-lg border flex flex-col p-8 overflow-y-auto"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, hsl(20, 22%, 88%) 0%, hsl(20, 18%, 84%) 100%)',
              borderColor: 'hsl(20, 18%, 78%)',
            }}
          >
            <div className="flex-shrink-0 mb-4">
              <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase">Answer{card.answers.length > 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex-1 flex flex-col justify-center">
              {card.answers.length === 1 ? (
                <p className="text-xl sm:text-2xl font-semibold text-stone-800 text-center leading-relaxed">
                  {card.answers[0]}
                </p>
              ) : (
                <ul className="space-y-3">
                  {card.answers.map((answer: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-base sm:text-lg text-stone-700 leading-relaxed animate-slide-up"
                      style={{ animationDelay: `${idx * 80}ms` }}
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold mt-0.5"
                        style={{ background: 'hsl(20, 25%, 35%)', color: 'hsl(25, 30%, 96%)' }}
                      >
                        {idx + 1}
                      </span>
                      <span>{answer}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {card.acronym && (
              <div className="flex-shrink-0 mt-4 pt-3 border-t border-stone-300/50">
                <p className="text-sm text-stone-500 text-center">
                  <span className="font-semibold">Acronym:</span> {card.acronym}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Rating buttons */}
        {isFlipped && (
          <div className="flex gap-3 animate-slide-up">
            <button
              onClick={(e) => { e.stopPropagation(); onMark('mastered'); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'hsl(140, 30%, 88%)', color: 'hsl(140, 40%, 25%)', border: '1px solid hsl(140, 25%, 80%)' }}
            >
              <Check size={18} strokeWidth={2.5} />
              Got it! (1)
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMark('learning'); }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'hsl(35, 40%, 90%)', color: 'hsl(30, 50%, 30%)', border: '1px solid hsl(35, 30%, 82%)' }}
            >
              <X size={18} strokeWidth={2.5} />
              Needs work (2)
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: 'hsl(25, 20%, 90%)', color: 'hsl(20, 20%, 35%)' }}
          >
            <ChevronLeft size={18} />
            Prev
          </button>

          <button
            onClick={onFlip}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            style={{ background: 'hsl(20, 25%, 35%)', color: 'hsl(25, 30%, 96%)' }}
          >
            <RotateCw size={16} />
            {isFlipped ? 'Show Question' : 'Show Answer'}
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: 'hsl(25, 20%, 90%)', color: 'hsl(20, 20%, 35%)' }}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
