import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Search, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import { EmergencyPill } from './EmergencyPill';
import { usePrefsStore } from '../../store/prefs';
import { useLocale } from '../../hooks/useLocale';
import { mainNav } from '../../config/nav';
import { Button } from '../ui/Button';

export function Header({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const { t } = useTranslation();
  const { locale, changeLocale } = useLocale();
  const { theme, setTheme, textSize, setTextSize, calmMode, setCalmMode } = usePrefsStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('auto');
    else setTheme('dark');
  };

  const cycleTextSize = () => {
    if (textSize === 100) setTextSize(115);
    else if (textSize === 115) setTextSize(130);
    else setTextSize(100);
  };

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12 2L15 8H9L12 2ZM12 22C7.58 22 4 18.42 4 14C4 11.5 5.15 9.27 7 7.82V14C7 16.76 9.24 19 12 19C14.76 19 17 16.76 17 14V7.82C18.85 9.27 20 11.5 20 14C20 18.42 16.42 22 12 22Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-lg leading-none tracking-tight">
              {t('brandName', 'Lanthera Health')}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase mt-1">
              {t('tagline', 'The light stays on.')}
            </span>
          </div>
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `transition-colors hover:text-[var(--accent)] ${
                  isActive ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-muted)]'
                }`
              }
            >
              {item.label[locale]}
            </NavLink>
          ))}
        </nav>

        {/* Controls & Emergency Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency Pill — Always Visible */}
          <EmergencyPill />

          {/* Command Palette Button (⌘K) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenCommand}
            className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]"
            aria-label="Open command palette"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">⌘K</span>
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => changeLocale(locale === 'en' ? 'hi' : 'en')}
            className="font-mono text-xs uppercase px-2"
            aria-label="Toggle language"
          >
            {locale === 'en' ? 'HI' : 'EN'}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-2 h-9 w-9"
            aria-label={`Current theme: ${theme}. Click to change.`}
          >
            {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Calm Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCalmMode(!calmMode)}
            className={`p-2 h-9 w-9 hidden md:inline-flex ${calmMode ? 'text-[var(--sage)]' : ''}`}
            aria-label="Toggle Calm Mode"
            title="Calm Mode"
          >
            <Sparkles className="w-4 h-4" />
          </Button>

          {/* Text Size Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleTextSize}
            className="font-mono text-xs px-2 hidden sm:inline-flex"
            aria-label={`Text size ${textSize}%. Click to change.`}
          >
            {textSize}%
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 h-9 w-9"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-[var(--line)] bg-[var(--surface)] p-4 flex flex-col gap-3">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-[var(--radius-sm)] text-sm font-medium hover:bg-[var(--surface-2)]"
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
