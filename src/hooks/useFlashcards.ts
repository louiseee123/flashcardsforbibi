import { useState, useCallback, useEffect } from 'react';
import type { Flashcard } from '../data/flashcards';
import { flashcards } from '../data/flashcards';

export type CardStatus = 'unseen' | 'learning' | 'mastered';

export interface CardProgress {
  status: CardStatus;
  attempts: number;
  correct: number;
}

export interface StudySession {
  [cardId: number]: CardProgress;
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function useFlashcards() {
  const [cards, setCards] = useState<Flashcard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<StudySession>(() => {
    const saved = localStorage.getItem('educ9-progress');
    return saved ? JSON.parse(saved) : {};
  });
  const [mode, setMode] = useState<'all' | 'learning' | 'mastered' | 'unseen'>('all');
  const [isShuffled, setIsShuffled] = useState(false);

  useEffect(() => {
    localStorage.setItem('educ9-progress', JSON.stringify(progress));
  }, [progress]);

  const filteredCards = cards.filter((card) => {
    if (mode === 'all') return true;
    const cardProgress = progress[card.id];
    if (mode === 'unseen') return !cardProgress || cardProgress.status === 'unseen';
    if (mode === 'learning') return cardProgress?.status === 'learning';
    if (mode === 'mastered') return cardProgress?.status === 'mastered';
    return true;
  });

  const currentCard = filteredCards[currentIndex] || null;

  const markCard = useCallback((status: CardStatus) => {
    if (!currentCard) return;
    setProgress((prev) => ({
      ...prev,
      [currentCard.id]: {
        status,
        attempts: (prev[currentCard.id]?.attempts || 0) + 1,
        correct: status === 'mastered' 
          ? (prev[currentCard.id]?.correct || 0) + 1 
          : (prev[currentCard.id]?.correct || 0),
      },
    }));
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev >= filteredCards.length - 1) return 0;
        return prev + 1;
      });
    }, 300);
  }, [currentCard, filteredCards.length]);

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev >= filteredCards.length - 1) return 0;
        return prev + 1;
      });
    }, 300);
  }, [filteredCards.length]);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        if (prev <= 0) return filteredCards.length - 1;
        return prev - 1;
      });
    }, 300);
  }, [filteredCards.length]);

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const shuffle = useCallback(() => {
    setIsFlipped(false);
    setCards((prev) => shuffleArray(prev));
    setIsShuffled(true);
    setCurrentIndex(0);
  }, []);

  const resetOrder = useCallback(() => {
    setIsFlipped(false);
    setCards([...flashcards]);
    setIsShuffled(false);
    setCurrentIndex(0);
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({});
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const stats = {
    total: flashcards.length,
    mastered: Object.values(progress).filter((p) => p.status === 'mastered').length,
    learning: Object.values(progress).filter((p) => p.status === 'learning').length,
    unseen: flashcards.length - Object.keys(progress).length + Object.values(progress).filter((p) => p.status === 'unseen').length,
  };

  const currentProgress = currentCard ? progress[currentCard.id] : null;

  return {
    cards: filteredCards,
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
    progress,
    currentProgress,
    stats,
    mode,
    setMode,
    resetProgress,
  };
}
