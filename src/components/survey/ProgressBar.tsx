import React from 'react';

interface ProgressBarProps {
  current: number; // 1-based step index
  total: number;
  label?: string; // accessible label and UI label
  showPercent?: boolean;
  compact?: boolean; // smaller height for tight spaces
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label = 'Progresso',
  showPercent = true,
  compact = false,
}) => {
  const clampedCurrent = Math.max(0, Math.min(current, total));
  const pct = total > 0 ? Math.round((clampedCurrent / total) * 100) : 0;
  const barHeight = compact ? 'h-2' : 'h-3';

  return (
    <div className="w-full" role="group" aria-label={label}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-500">{label}</span>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>
            {clampedCurrent}/{total}
          </span>
          {showPercent && (
            <span className="inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 font-medium text-slate-600 bg-white shadow-sm">
              {pct}%
            </span>
          )}
        </div>
      </div>
      <div
        className={`relative w-full ${barHeight} bg-slate-200 rounded-full overflow-hidden shadow-inner`}
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
      >
        {/* Track gradient progress */}
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600`}
          style={{ width: `${pct}%` }}
        />
        {/* Subtle shine overlay */}
        <div className="pointer-events-none absolute inset-0 bg-white/10" />
        {/* End handle indicator */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 translate-x-1/2 ${compact ? 'h-2.5 w-2.5' : 'h-3 w-3'} rounded-full bg-white shadow ring-2 ring-blue-500`}
          style={{ left: `${pct}%`, opacity: pct > 2 ? 1 : 0 }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
