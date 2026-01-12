
import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: () => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  return (
    <div 
      className={`relative w-full aspect-square cursor-pointer perspective-1000 group ${disabled ? 'pointer-events-none' : ''}`}
      onClick={onClick}
    >
      <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}>
        {/* Front of Card (Hidden) */}
        <div className="absolute inset-0 flex items-center justify-center bg-white border-2 border-slate-200 rounded-xl shadow-sm backface-hidden">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
            <span className="text-indigo-300 font-bold">?</span>
          </div>
        </div>

        {/* Back of Card (Visible when flipped) */}
        <div className={`absolute inset-0 flex items-center justify-center border-2 rounded-xl shadow-inner rotate-y-180 backface-hidden ${card.isMatched ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
          <span className="text-4xl select-none">{card.value}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
