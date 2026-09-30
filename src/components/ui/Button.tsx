import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { useMotionPref } from '../../hooks/useMotionPref';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const { isReduced } = useMotionPref();

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

    const variants = {
      primary:
        'bg-[var(--accent)] text-[var(--accent-ink)] hover:bg-[#d99d39] active:scale-[0.98] rounded-[var(--radius-pill)] shadow-md',
      secondary:
        'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--line)] rounded-[var(--radius-md)] border border-[var(--line)]',
      ghost:
        'bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)] rounded-[var(--radius-sm)]',
      emergency:
        'bg-[var(--emergency)] text-white hover:opacity-90 active:scale-[0.98] rounded-[var(--radius-pill)] font-semibold shadow-lg',
    };

    const sizes = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-11 px-5 text-sm',
      lg: 'h-13 px-7 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          !isReduced && 'transition-transform duration-180',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
