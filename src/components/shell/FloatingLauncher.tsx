import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Flame, Compass, Calendar, Globe, X } from 'lucide-react';
import { useLocale } from '../../hooks/useLocale';

export function FloatingLauncher() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { locale, changeLocale } = useLocale();

  useEffect(() => {
    let pendingG = false;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        pendingG = true;
        setTimeout(() => (pendingG = false), 1500);
      } else if (pendingG && e.key === 'l') {
        setOpen((o) => !o);
        pendingG = false;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {open && (
        <div className="mb-3 flex flex-col gap-2 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius-lg)] p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={() => {
              navigate('/emergency');
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--emergency)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)] font-semibold"
          >
            <Flame className="w-4 h-4" /> Emergency 24×7
          </button>
          <button
            onClick={() => {
              navigate('/guide');
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)]"
          >
            <Compass className="w-4 h-4" /> Find where to go
          </button>
          <button
            onClick={() => {
              navigate('/book');
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)]"
          >
            <Calendar className="w-4 h-4" /> Book Appointment
          </button>
          <button
            onClick={() => {
              changeLocale(locale === 'en' ? 'hi' : 'en');
              setOpen(false);
            }}
            className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)]"
          >
            <Globe className="w-4 h-4" /> Language: {locale === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label="Quick launch menu"
        className="w-12 h-12 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
      >
        {open ? <X className="w-6 h-6" /> : <Flame className="w-6 h-6" />}
      </button>
    </div>
  );
}
