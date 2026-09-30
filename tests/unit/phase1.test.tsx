import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Button } from '../../src/components/ui/Button';
import { EmergencyPill } from '../../src/components/shell/EmergencyPill';

describe('Phase 1 Foundation Components', () => {
  it('renders EmergencyPill with Emergency 24×7 label', () => {
    render(
      <MemoryRouter>
        <EmergencyPill />
      </MemoryRouter>
    );
    expect(screen.getByText(/Emergency 24×7/i)).toBeInTheDocument();
  });

  it('renders Button with primary variant', () => {
    render(<Button variant="primary">Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
});
