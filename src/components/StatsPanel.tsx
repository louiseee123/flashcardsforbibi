import { Award, BookOpen, Eye, RotateCcw, Shuffle, Layers, TrendingUp } from 'lucide-react';

interface StatsPanelProps {
  stats: {
    total: number;
    mastered: number;
    learning: number;
    unseen: number;
  };
  mode: 'all' | 'learning' | 'mastered' | 'unseen';
  setMode: (mode: 'all' | 'learning' | 'mastered' | 'unseen') => void;
  onShuffle: () => void;
  onResetOrder: () => void;
  isShuffled: boolean;
  onResetProgress: () => void;
}

export default function StatsPanel({
  stats,
  mode,
  setMode,
  onShuffle,
  onResetOrder,
  isShuffled,
  onResetProgress,
}: StatsPanelProps) {
  const percent = Math.round((stats.mastered / stats.total) * 100);

  const modes: { key: 'all' | 'learning' | 'mastered' | 'unseen'; label: string; icon: typeof Award; count: number; color: string }[] = [
    { key: 'all', label: 'All Cards', icon: Layers, count: stats.total, color: 'hsl(20, 20%, 45%)' },
    { key: 'mastered', label: 'Mastered', icon: Award, count: stats.mastered, color: 'hsl(140, 35%, 40%)' },
    { key: 'learning', label: 'Learning', icon: BookOpen, count: stats.learning, color: 'hsl(35, 55%, 45%)' },
    { key: 'unseen', label: 'Unseen', icon: Eye, count: stats.unseen, color: 'hsl(220, 20%, 50%)' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      {/* Overall progress */}
      <div className="rounded-xl p-5 border"
        style={{ background: 'hsl(25, 28%, 94%)', borderColor: 'hsl(25, 20%, 85%)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: 'hsl(20, 25%, 35%)' }} />
            <span className="font-semibold text-sm" style={{ color: 'hsl(20, 25%, 25%)' }}>
              Overall Progress
            </span>
          </div>
          <span className="text-2xl font-bold" style={{ color: 'hsl(20, 25%, 35%)' }}>
            {percent}%
          </span>
        </div>
        <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${percent}%`,
              background: 'linear-gradient(90deg, hsl(20, 30%, 45%), hsl(20, 25%, 35%))',
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-stone-500">
          <span>{stats.mastered} mastered</span>
          <span>{stats.learning} learning</span>
          <span>{stats.unseen} unseen</span>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-medium transition-all duration-200 border ${
                isActive ? 'shadow-md scale-[1.02]' : 'hover:scale-[1.02]'
              }`}
              style={{
                background: isActive ? 'hsl(25, 25%, 92%)' : 'transparent',
                borderColor: isActive ? 'hsl(20, 20%, 70%)' : 'hsl(25, 20%, 88%)',
                color: isActive ? m.color : 'hsl(20, 15%, 50%)',
              }}
            >
              <Icon size={18} />
              <span>{m.label}</span>
              <span className="text-lg font-bold" style={{ color: m.color }}>{m.count}</span>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={isShuffled ? onResetOrder : onShuffle}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 border"
          style={{
            background: isShuffled ? 'hsl(25, 25%, 90%)' : 'transparent',
            borderColor: 'hsl(25, 20%, 85%)',
            color: 'hsl(20, 20%, 40%)',
          }}
        >
          <Shuffle size={16} />
          {isShuffled ? 'Reset Order' : 'Shuffle'}
        </button>
        <button
          onClick={onResetProgress}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 border"
          style={{
            background: 'transparent',
            borderColor: 'hsl(25, 20%, 85%)',
            color: 'hsl(0, 30%, 50%)',
          }}
        >
          <RotateCcw size={16} />
          Reset Progress
        </button>
      </div>
    </div>
  );
}
