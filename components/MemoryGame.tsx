
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card as CardType, Difficulty, Theme } from '../types';
import { DIFFICULTY_CONFIG, THEME_DATA } from '../constants';
import Card from './Card';
import { getProjectInsights } from '../services/geminiService';

const MemoryGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [theme, setTheme] = useState<Theme>(Theme.EMOJIS);
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  // Fix: Use 'number' instead of 'NodeJS.Timeout' for browser environment compatibility
  const timerRef = useRef<number | null>(null);

  const initGame = useCallback(() => {
    const { pairs } = DIFFICULTY_CONFIG[difficulty];
    const themeValues = THEME_DATA[theme].slice(0, pairs);
    const cardPool = [...themeValues, ...themeValues];
    
    // Fisher-Yates Shuffle
    for (let i = cardPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPool[i], cardPool[j]] = [cardPool[j], cardPool[i]];
    }

    const newCards = cardPool.map((value, index) => ({
      id: `${index}-${value}`,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setIsComplete(false);
    setIsGameActive(true);
    setAiInsight(null);
  }, [difficulty, theme]);

  useEffect(() => {
    if (isGameActive && !isComplete) {
      // Fix: Use window.setInterval to ensure the returned type is a number
      timerRef.current = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) window.clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isGameActive, isComplete]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsComplete(true);
      setIsGameActive(false);
      handleFinish();
    }
  }, [cards]);

  const handleFinish = async () => {
    const insight = await getProjectInsights(timer, moves, difficulty);
    setAiInsight(insight);
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIndex, secondIndex] = newFlipped;

      if (cards[firstIndex].value === cards[secondIndex].value) {
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      {/* Game Header / Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8 gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isGameActive && !isComplete}
          >
            {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isGameActive && !isComplete}
          >
            {Object.values(Theme).map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <button 
            onClick={initGame}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md active:scale-95"
          >
            {isGameActive && !isComplete ? 'Restart' : 'Start Game'}
          </button>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Moves</p>
            <p className="text-2xl font-bold text-slate-800">{moves}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Time</p>
            <p className="text-2xl font-bold text-slate-800">{formatTime(timer)}</p>
          </div>
        </div>
      </div>

      {/* Game Grid */}
      <div className={`grid ${DIFFICULTY_CONFIG[difficulty].gridCols} gap-4 max-w-4xl mx-auto`}>
        {cards.length > 0 ? (
          cards.map((card, idx) => (
            <Card 
              key={card.id} 
              card={card} 
              onClick={() => handleCardClick(idx)} 
              disabled={!isGameActive || isComplete}
            />
          ))
        ) : (
          <div className="col-span-full h-96 flex flex-col items-center justify-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <span className="text-6xl mb-4">🧠</span>
            <p className="text-slate-400 font-medium text-lg">Select settings and start the challenge</p>
          </div>
        )}
      </div>

      {/* Completion Modal / Message */}
      {isComplete && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center transform scale-100 animate-in fade-in zoom-in duration-300">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-3xl font-bold text-slate-800 mb-2">Well Done!</h3>
            <p className="text-slate-500 mb-6">You matched all cards in {moves} moves and {formatTime(timer)}.</p>
            
            {aiInsight && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-6 text-left">
                <p className="text-xs text-indigo-400 font-bold uppercase mb-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                  Gemini AI Insight
                </p>
                <p className="text-indigo-800 text-sm italic leading-relaxed">
                  "{aiInsight}"
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={initGame}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
              >
                Play Again
              </button>
              <button 
                onClick={() => setIsComplete(false)}
                className="w-full text-slate-400 font-semibold py-2 hover:text-slate-600 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
