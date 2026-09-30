import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: 'standard' | 'lantern';
  glow?: boolean;
}

export function Card({ className, shape = 'standard', glow = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[var(--surface)] text-[var(--text)] border border-[var(--line)] p-6 transition-all duration-300',
        shape === 'lantern' ? 'rounded-[28px_28px_12px_12px]' : 'rounded-[var(--radius-md)]',
        glow && 'hover:border-[var(--accent)] hover:shadow-[0_10px_40px_-12px_rgba(240,178,74,0.25)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
