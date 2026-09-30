import React from 'react';
import { Sparkles, ShieldCheck, HeartPulse, Clock, UserCheck } from 'lucide-react';
import { useLocale } from '../../hooks/useLocale';

export const HeroVisualCard: React.FC = () => {
  const { locale } = useLocale();
  const isHi = locale === 'hi';

  return (
    <div className="relative rounded-[var(--radius-lg)] overflow-hidden border border-[var(--accent)]/30 bg-[var(--surface-2)] shadow-2xl group hover-glow transition-all duration-500">
      {/* Ambient Pulsing Glow Backdrop */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)]/20 via-[var(--sage)]/10 to-[var(--accent)]/20 blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />

      {/* Main Graphic Container */}
      <div className="relative z-10 p-6 sm:p-8 min-h-[420px] sm:min-h-[480px] flex flex-col justify-between bg-gradient-to-b from-[var(--surface)] via-[var(--surface-2)] to-[var(--bg)]">
        {/* Top Status Header Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-2)] border border-[var(--accent)]/40 text-xs font-mono text-[var(--accent)] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage)] animate-ping" />
            <span className="font-bold">{isHi ? 'नाइट वॉच ट्राइएज लाइव' : 'Night Watch ER Live'}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--sage)]/10 border border-[var(--sage)]/30 text-[11px] font-mono text-[var(--sage)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Price Verified</span>
          </div>
        </div>

        {/* Central Graphic Visual Illustration */}
        <div className="my-6 relative flex flex-col items-center justify-center text-center">
          {/* Glowing Ambient Lantern Orb */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[var(--accent)]/30 to-[var(--accent)]/5 border-2 border-[var(--accent)]/50 flex items-center justify-center relative shadow-[0_0_50px_rgba(240,178,74,0.25)] animate-pulse">
            <div className="w-24 h-24 sm:w-30 sm:h-30 rounded-full bg-[var(--surface)] border border-[var(--accent)] flex items-center justify-center relative z-10">
              <HeartPulse className="w-12 h-12 text-[var(--accent)]" />
            </div>
            {/* Orbiting Satellite Rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-[var(--accent)]/40 animate-[spin_20s_linear_infinite]" />
          </div>

          {/* On-Duty Medical Specialists Badge Stack */}
          <div className="mt-6 flex items-center gap-3 bg-[var(--surface)]/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-[var(--line)] shadow-lg">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] font-bold font-display text-xs flex items-center justify-center border-2 border-[var(--surface)]">
                EL
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--sage)] text-white font-bold font-display text-xs flex items-center justify-center border-2 border-[var(--surface)]">
                AT
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] text-[var(--accent)] font-bold font-display text-xs flex items-center justify-center border-2 border-[var(--surface)]">
                MC
              </div>
            </div>
            <div className="text-left text-xs">
              <div className="font-bold text-[var(--text)] flex items-center gap-1">
                <span>Dr. Evelyn & Senior Team</span>
                <UserCheck className="w-3.5 h-3.5 text-[var(--sage)]" />
              </div>
              <div className="text-[10px] text-[var(--text-muted)] font-mono">24×7 Triage Command On Duty</div>
            </div>
          </div>
        </div>

        {/* Floating Bottom Card: Hospital Assurance Quote */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface)]/95 backdrop-blur-md border border-[var(--line)] shadow-lg hover-lift">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[var(--text)]">
                  {isHi ? 'लैंथेरा स्वास्थ्य गारंटी' : 'Lanthera Triage Assurance'}
                </h4>
                <span className="text-[10px] font-mono text-[var(--sage)] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> &lt; 3 mins wait
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">
                {isHi
                  ? 'मानवीय, संवेदनशील और पारदर्शी चिकित्सा देखभाल — हर पहर में रोशनी जलती है।'
                  : 'Empathetic, clear, and itemized medical care. The light stays on at any hour.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
