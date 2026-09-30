import { useState, useEffect } from 'react';
import { initialWaitTokens, boardStages } from '../data/board';
import { WaitToken } from '../types';
import { useLocale } from '../hooks/useLocale';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Tv,
  Search,
  RotateCcw,
  ShieldCheck,
  Clock,
  Play,
  Pause,
  AlertCircle,
  Radio,
} from 'lucide-react';

export default function BoardPage() {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  const [tokens, setTokens] = useState<WaitToken[]>(initialWaitTokens);
  const [searchTerm, setSearchTerm] = useState('');
  const [isTvMode, setIsTvMode] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);

  // Live Status Board Simulator
  useEffect(() => {
    if (!isSimulating) return;

    const stagesOrder: WaitToken['stage'][] = ['prep', 'procedure', 'recovery', 'ready'];

    const interval = setInterval(() => {
      setTokens((prevTokens) => {
        // Pick a random token to advance stage
        const randomIndex = Math.floor(Math.random() * prevTokens.length);
        return prevTokens.map((t, idx) => {
          if (idx === randomIndex) {
            const currentStageIdx = stagesOrder.indexOf(t.stage);
            const nextStage = stagesOrder[(currentStageIdx + 1) % stagesOrder.length] ?? 'prep';
            return {
              ...t,
              stage: nextStage,
              updatedAt: new Date().toISOString(),
            };
          }
          return t;
        });
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const filteredTokens = tokens.filter(
    (t) =>
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.note && (t.note.en.toLowerCase().includes(searchTerm.toLowerCase()) || t.note.hi.includes(searchTerm)))
  );

  const resetTokens = () => setTokens(initialWaitTokens);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isTvMode
          ? 'bg-black text-white p-6 sm:p-12 text-lg'
          : 'py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8'
      }`}
    >
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            {isHi ? 'वेटिंग रूम लाइव (फैमिली बोर्ड)' : 'Waiting Room Live (Status Board)'}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            {isHi ? 'परिजनों के लिए रियल-टाइम ट्रैकिंग बोर्ड' : 'Family Status Board — Real-Time Updates'}
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            {isHi
              ? 'गोपनीयता सुरक्षा के साथ टोकन नंबर द्वारा मरीज की स्थिति ट्रैक करें।'
              : 'Anonymised tokens ensure privacy while keeping families informed at every stage.'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSimulating(!isSimulating)}
            className="font-mono text-xs text-[var(--accent)]"
          >
            {isSimulating ? <Pause className="w-4 h-4 mr-1.5" /> : <Play className="w-4 h-4 mr-1.5" />}
            {isSimulating ? (isHi ? 'सिम्युलेटर रोकें' : 'Pause Live Board') : isHi ? 'सिम्युलेटर शुरू करें' : 'Live Board Active'}
          </Button>

          <Button
            variant={isTvMode ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setIsTvMode(!isTvMode)}
          >
            <Tv className="w-4 h-4 mr-1.5" />
            {isTvMode ? 'Exit TV Mode' : 'TV / Large-Screen Mode'}
          </Button>

          <Button variant="ghost" size="sm" onClick={resetTokens} title="Reset Tokens">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mandatory Privacy Disclaimer per File 01 & 04 */}
      {!isTvMode && (
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--sage)] shrink-0" />
            <p className="text-xs text-[var(--text-muted)]">
              <strong className="text-[var(--text)]">Privacy by Design:</strong> Tokens numbers only (e.g. L-204). No patient names or clinical diagnoses are displayed publicly.
            </p>
          </div>
        </div>
      )}

      {/* Token Search Bar */}
      <div className="flex items-center gap-3 bg-[var(--surface-2)] p-3 rounded-[var(--radius-md)] border border-[var(--line)]">
        <Search className="w-5 h-5 text-[var(--text-muted)] shrink-0" />
        <input
          type="text"
          placeholder={isHi ? 'टोकन नंबर खोजें (उदा. L-204)...' : 'Search your token number (e.g. L-204)...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-sm focus:outline-none text-[var(--text)] placeholder-[var(--text-muted)]"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="text-xs text-[var(--accent)] underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Stage Guide Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.values(boardStages).map((stage) => (
          <div
            key={stage.id}
            className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-1"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stage.accentColor }}
              />
              <span className="font-display font-semibold text-sm">
                {isHi ? stage.label.hi : stage.label.en}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              {isHi ? stage.typicalDuration.hi : stage.typicalDuration.en}
            </span>
          </div>
        ))}
      </div>

      {/* Live Status Board Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTokens.map((token) => {
          const stageInfo = boardStages[token.stage];
          const isMatched = searchTerm && token.id.toLowerCase().includes(searchTerm.toLowerCase());

          return (
            <Card
              key={token.id}
              shape="lantern"
              className={`p-6 flex flex-col justify-between gap-4 transition-all duration-300 ${
                isMatched
                  ? 'border-2 border-[var(--accent)] shadow-[var(--elevation-shadow)] ring-2 ring-[var(--accent)]/30'
                  : 'border-[var(--line)]'
              } ${isTvMode ? 'bg-zinc-900 border-zinc-700' : ''}`}
            >
              <div>
                {/* Token ID Header & Stage Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-2xl font-bold text-[var(--accent)] tracking-wider">
                    {token.id}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase"
                    style={{
                      backgroundColor: `${stageInfo.accentColor}25`,
                      color: stageInfo.accentColor,
                      border: `1px solid ${stageInfo.accentColor}`,
                    }}
                  >
                    {isHi ? stageInfo.label.hi : stageInfo.label.en}
                  </span>
                </div>

                {/* Stage Note */}
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {token.note ? (isHi ? token.note.hi : token.note.en) : (isHi ? stageInfo.description.hi : stageInfo.description.en)}
                </p>
              </div>

              {/* Timestamp & Duration */}
              <div className="pt-3 border-t border-[var(--line)]/50 flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Updated: {new Date(token.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span>{isHi ? stageInfo.typicalDuration.hi : stageInfo.typicalDuration.en}</span>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredTokens.length === 0 && (
        <div className="p-8 text-center text-sm text-[var(--text-muted)] rounded-[var(--radius-md)] border border-dashed border-[var(--line)]">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-[var(--accent)]" />
          No token found matching &quot;{searchTerm}&quot;. Please check your token receipt.
        </div>
      )}
    </div>
  );
}
