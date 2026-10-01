import React from 'react';
import { Link } from 'react-router';

interface LogoProps {
  variant?: 'primary' | 'mark' | 'stacked' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  showText = true,
}) => {
  const sizeClasses = {
    sm: { svg: 'w-6 h-6 sm:w-8 sm:h-8', text: 'text-base sm:text-xl' },
    md: { svg: 'w-7 h-7 sm:w-10 sm:h-10', text: 'text-lg sm:text-2xl' },
    lg: { svg: 'w-9 h-9 sm:w-12 sm:h-12', text: 'text-xl sm:text-3xl' },
  };
  const { svg, text } = sizeClasses[size];

  if (variant === 'mark') {
    return (
      <Link
        to="/"
        className={`inline-flex items-center gap-2 group focus:outline-none shrink-0 ${className}`}
        aria-label="Lanthera Health — Home"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className={`${svg} transition-transform duration-300 group-hover:scale-105 shrink-0`}
        >
          <circle cx="50" cy="50" r="42" fill="var(--accent)" opacity="0.18" />
          <path d="M 32 30 L 68 30 L 62 78 L 38 78 Z" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 40 30 L 50 20 L 60 30 Z" fill="var(--accent)" />
          <circle cx="50" cy="16" r="6" stroke="var(--accent)" strokeWidth="2.5" fill="none" />
          <path d="M 50 38 C 42 48 42 62 50 68 C 58 62 58 48 50 38 Z" fill="var(--accent)" />
          <path d="M 50 40 C 44 49 44 60 50 65 C 56 60 56 49 50 40 Z" fill="var(--surface)" />
          <line x1="34" y1="78" x2="66" y2="78" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </Link>
    );
  }

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0 ${className}`}
      aria-label="Lanthera Health — Home"
    >
      {/* Lantern Mark */}
      <div className="relative flex items-center justify-center shrink-0">
        {variant === 'glow' && (
          <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-30 blur-md animate-pulse" />
        )}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          className={`${svg} transition-transform duration-300 group-hover:scale-105 shrink-0`}
        >
          <circle cx="50" cy="50" r="42" fill="var(--accent)" opacity="0.2" />
          <path d="M 32 30 L 68 30 L 62 78 L 38 78 Z" fill="var(--surface)" stroke="var(--accent)" strokeWidth="3" strokeLinejoin="round" />
          <path d="M 40 30 L 50 20 L 60 30 Z" fill="var(--accent)" />
          <circle cx="50" cy="16" r="6" stroke="var(--accent)" strokeWidth="2.5" fill="none" />
          <path d="M 50 38 C 42 48 42 62 50 68 C 58 62 58 48 50 38 Z" fill="var(--accent)" />
          <path d="M 50 40 C 44 49 44 60 50 65 C 56 60 56 49 50 40 Z" fill="var(--surface)" />
          <line x1="34" y1="78" x2="66" y2="78" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Wordmark */}
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span className={`font-display font-semibold tracking-tight text-[var(--text)] ${text}`}>
            Lanthera
          </span>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--accent)]">
            HEALTH
          </span>
        </div>
      )}
    </Link>
  );
};
