import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Logo } from '../../src/components/brand/Logo';
import HomePage from '../../src/routes/HomePage';

describe('Phase 2 Brand & Home Hero Components', () => {
  it('renders Logo with Lanthera wordmark', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    expect(screen.getByText(/Lanthera/i)).toBeInTheDocument();
    expect(screen.getByText(/HEALTH/i)).toBeInTheDocument();
  });

  it('renders HomePage display XL headline and signature feature tiles', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/You are not alone in this\. Here is what happens next\./i)
    ).toBeInTheDocument();

    // Check key route tiles presence
    expect(screen.getByText(/Lantern Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/The Path/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear Ledger/i)).toBeInTheDocument();
  });
});
