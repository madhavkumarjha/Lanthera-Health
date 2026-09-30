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
  const sizeMap = {
    sm: { mark: 32, text: 'text-lg', height: 'h-8' },
    md: { mark: 42, text: 'text-2xl', height: 'h-11' },
    lg: { mark: 56, text: 'text-3xl', height: 'h-14' },
  };

  const { mark, text, height } = sizeMap[size];

  if (variant === 'mark') {
    return (
      <Link to="/" className={`inline-flex items-center gap-2 group focus:outline-none ${className}`} aria-label="Lanthera Health — Home">
        <svg width={mark} height={mark} viewBox="0 0 100 100" fill="none" className="transition-transform duration-300 group-hover:scale-105">
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
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none ${height} ${className}`} aria-label="Lanthera Health — Home">
      {/* Lantern Mark */}
      <div className="relative flex items-center justify-center">
        {variant === 'glow' && (
          <span className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-30 blur-md animate-pulse" />
        )}
        <svg width={mark} height={mark} viewBox="0 0 100 100" fill="none" className="relative transition-transform duration-300 group-hover:scale-105">
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
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-[var(--accent)]">
            HEALTH
          </span>
        </div>
      )}
    </Link>
  );
};
