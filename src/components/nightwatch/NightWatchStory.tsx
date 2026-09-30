import React, { useState, useEffect } from 'react';
import { nightWatchBeats } from '../../data/nightwatch';
import { HospitalBuilding } from './HospitalBuilding';
import { useLocale } from '../../hooks/useLocale';
import { usePrefsStore } from '../../store/prefs';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Clock, Play, Pause, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';

export const NightWatchStory: React.FC = () => {
  const { locale } = useLocale();
  const { calmMode } = usePrefsStore();
  const isHi = locale === 'hi';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const reducedMotion = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const showStaticFallback = calmMode || reducedMotion;

  // Auto-play timer (4s per beat)
  useEffect(() => {
    if (!isPlaying || showStaticFallback) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nightWatchBeats.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, showStaticFallback]);

  const fallbackBeat = {
    hour: '18:00',
    roomId: 'triage',
    role: { en: 'Evening Triage Lead', hi: 'संध्या ट्राइएज प्रमुख' },
    department: { en: 'Emergency & Trauma', hi: 'इमरजेंसी व ट्रॉमा' },
    story: { en: 'Shift handover begins...', hi: 'शिफ्ट हैंडओवर...' },
    art: '/img/nightwatch/18.svg',
    activeWindows: [1, 2, 3, 4],
  };
  const currentBeat = nightWatchBeats[activeIndex] ?? nightWatchBeats[0] ?? fallbackBeat;

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col gap-10">
      {/* Section Title & Story Intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs font-mono text-[var(--accent)] uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            {isHi ? 'द नाइट वॉच (24×7 एक्टिव केयर)' : 'The Night Watch (24×7 Active Care)'}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text)]">
            {isHi ? 'रात के 2 बजे भी रोशनी जलती है' : 'Who is awake for you at 3 a.m.'}
          </h2>
        </div>

        {/* Controls & Skip Link */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#nightwatch-cta"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] underline focus:not-sr-only"
          >
            {isHi ? 'कहानी छोड़ें (Skip story)' : 'Skip story'}
          </a>

          {!showStaticFallback && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause 24-hour cycle' : 'Play 24-hour cycle'}
              className="font-mono text-xs text-[var(--accent)]"
            >
              {isPlaying ? <Pause className="w-4 h-4 mr-1.5" /> : <Play className="w-4 h-4 mr-1.5" />}
              {isPlaying ? (isHi ? 'रोकें' : 'Pause Cycle') : isHi ? 'ऑटो-प्ले शुरू करें' : 'Play Cycle'}
            </Button>
          )}
        </div>
      </div>

      {/* STATIC ACCESSIBLE ORDERED LIST FALLBACK (Calm Mode / Reduced Motion) */}
      {showStaticFallback ? (
        <div className="flex flex-col gap-6">
          <p className="text-sm text-[var(--text-muted)]">
            {isHi
              ? 'शांत मोड या सीमित मोशन सक्रिय है। नीचे 24 घंटे की नाइट वॉच की सूची दी गई है:'
              : 'Calm mode or reduced motion is active. Here is the full 24-hour Night Watch schedule:'}
          </p>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 list-decimal pl-5">
            {nightWatchBeats.map((beat) => (
              <li key={beat.hour} className="pl-2">
                <Card shape="lantern" className="p-5 flex flex-col gap-3 h-full">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-bold text-lg text-[var(--accent)]">{beat.hour}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-muted)]">
                      {beat.activeWindows.length} lit windows
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-base text-[var(--text)]">
                    {isHi ? beat.role.hi : beat.role.en}
                  </h3>
                  <div className="text-xs text-[var(--accent)] font-medium">
                    {isHi ? beat.department.hi : beat.department.en}
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {isHi ? beat.story.hi : beat.story.en}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        /* INTERACTIVE GSAP / STEPPER SCROLL STORY */
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Building Silhouette Visual with Lit Windows */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <HospitalBuilding
              activeHour={currentBeat.hour}
              activeWindows={currentBeat.activeWindows}
              className="w-full"
            />
          </div>

          {/* Active Beat Story Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Hour Timeline Selector Tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {nightWatchBeats.map((beat, idx) => (
                <button
                  key={beat.hour}
                  type="button"
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                    activeIndex === idx
                      ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md scale-105'
                      : 'bg-[var(--surface-2)] text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {beat.hour}
                </button>
              ))}
            </div>

            {/* Active Story Details Card */}
            <Card shape="lantern" className="p-6 flex flex-col gap-4 animate-fade-in border-[var(--accent)]/40 shadow-[var(--elevation-shadow)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--sage)] animate-pulse" />
                  <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase">
                    {isHi ? currentBeat.department.hi : currentBeat.department.en}
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-[var(--text-muted)]">
                  {currentBeat.hour} Beat
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-[var(--text)]">
                {isHi ? currentBeat.role.hi : currentBeat.role.en}
              </h3>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {isHi ? currentBeat.story.hi : currentBeat.story.en}
              </p>

              {/* Vignette Illustration Graphic */}
              <div className="mt-2 rounded-[var(--radius-md)] overflow-hidden border border-[var(--line)] bg-[var(--surface-2)] p-4 flex items-center justify-center">
                <img
                  src={currentBeat.art}
                  alt={isHi ? currentBeat.role.hi : currentBeat.role.en}
                  className="max-h-36 object-contain"
                />
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Story End CTA Section */}
      <div id="nightwatch-cta" className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--surface)] border border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-[var(--text)]">
              {isHi ? 'क्या आप आगमन की प्रक्रिया देखना चाहते हैं?' : 'Want to see what happens when you arrive?'}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              {isHi
                ? 'द पाथ के 5 चरणबद्ध मार्गों को एक्सप्लोर करें (इमरजेंसी, सर्जरी, वार्ड व रिकवरी)।'
                : 'Explore step-by-step patient journeys across emergency, surgery, maternity, and ICU.'}
            </p>
          </div>
        </div>

        <Link to="/path" className="shrink-0">
          <Button variant="primary" size="lg">
            {isHi ? 'द पाथ एक्सप्लोर करें' : 'Explore The Path'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
