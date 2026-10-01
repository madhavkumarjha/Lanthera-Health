import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Search, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';
import { EmergencyPill } from './EmergencyPill';
import { Logo } from '../brand/Logo';
import { usePrefsStore } from '../../store/prefs';
import { useLocale } from '../../hooks/useLocale';
import { mainNav } from '../../config/nav';
import { Button } from '../ui/Button';

export function Header({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const { locale, changeLocale } = useLocale();
  const { theme, setTheme, textSize, setTextSize, calmMode, setCalmMode } = usePrefsStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const cycleTextSize = () => {
    if (textSize === 100) setTextSize(115);
    else if (textSize === 115) setTextSize(130);
    else setTextSize(100);
  };

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg)]/90 backdrop-blur-md border-b border-[var(--line)] w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1 sm:gap-4 overflow-hidden">
        {/* Brand Logo */}
        <div className="shrink-0 origin-left flex items-center">
          <Logo variant="primary" size="sm" className="sm:hidden" />
          <Logo variant="primary" size="md" className="hidden sm:inline-flex" />
        </div>

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
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Emergency Pill — Always Visible */}
          <EmergencyPill />

          {/* Command Palette Button (⌘K) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenCommand}
            className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)]"
            aria-label="Open command palette"
          >
            <Search className="w-4 h-4" />
            <span>⌘K</span>
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => changeLocale(locale === 'en' ? 'hi' : 'en')}
            className="font-mono text-xs uppercase px-1.5 sm:px-2 h-8 sm:h-9"
            aria-label="Toggle language"
          >
            {locale === 'en' ? 'HI' : 'EN'}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-1 sm:p-2 h-8 w-8 sm:h-9 sm:w-9"
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
            className="font-mono text-xs px-2 hidden lg:inline-flex"
            aria-label={`Text size ${textSize}%. Click to change.`}
          >
            {textSize}%
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 h-8 w-8 sm:h-9 sm:w-9"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-[var(--line)] bg-[var(--surface)] p-4 flex flex-col gap-3 shadow-xl">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-[var(--radius-sm)] text-sm font-medium hover:bg-[var(--surface-2)] flex items-center justify-between"
            >
              <span>{item.label[locale]}</span>
            </Link>
          ))}
          {/* Mobile Controls in Menu */}
          <div className="pt-3 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
            <span>Calm Mode:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCalmMode(!calmMode)}
              className={`text-xs border border-[var(--line)] ${calmMode ? 'text-[var(--sage)] border-[var(--sage)] font-bold' : ''}`}
            >
              {calmMode ? 'Active' : 'Off'}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
