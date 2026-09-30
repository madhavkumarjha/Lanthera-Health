import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helpText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'h-11 px-4 rounded-[var(--radius-sm)] bg-[var(--surface-2)] text-[var(--text)] border border-[var(--line)]',
            'focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]',
            'placeholder:text-[var(--text-muted)] text-sm transition-colors',
            error && 'border-[var(--emergency)] focus:border-[var(--emergency)] focus:ring-[var(--emergency)]',
            className
          )}
          {...props}
        />
        {helpText && !error && <span className="text-xs text-[var(--text-muted)]">{helpText}</span>}
        {error && <span className="text-xs text-[var(--emergency)]">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
