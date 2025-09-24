import React from 'react';

interface RatingStarsProps {
  value: number;
  onChange: (val: number) => void;
  max?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ value, onChange, max = 5 }) => {
  return (
    <div className="flex items-center gap-2" role="radiogroup" aria-label="Classificação em estrelas">
      {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
        const active = star <= value;
        return (
          <button
            key={star}
            type="button"
            className={`text-2xl transition-transform active:scale-95 ${active ? 'text-yellow-400' : 'text-slate-300'}`}
            onClick={() => onChange(star)}
            aria-checked={active}
            role="radio"
            aria-label={`${star} ${star === 1 ? 'estrela' : 'estrelas'}`}
          >
            {active ? '★' : '☆'}
          </button>
        );
      })}
    </div>
  );
};

export default RatingStars;
