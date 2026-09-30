import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { evaluateGuideState } from '../../src/data/guide-rules';
import { useGuideStore } from '../../src/store/guideStore';
import GuidePage from '../../src/routes/GuidePage';

describe('Phase 3 Lantern Guide Logic & Components', () => {
  it('evaluates red flags as immediate emergency level', () => {
    const result = evaluateGuideState({
      redFlags: ['breathing'],
      forWhom: 'self',
      duration: '1-7d',
      impact: 1,
      conditions: [],
      locale: 'en',
    });

    expect(result.level).toBe('emergency');
    expect(result.departments).toContain('Emergency & Trauma');
  });

  it('evaluates child + high impact as urgent level minimum', () => {
    const result = evaluateGuideState({
      redFlags: [],
      forWhom: 'child',
      duration: '1-7d',
      impact: 2,
      conditions: [],
      locale: 'en',
    });

    expect(result.level).toBe('urgent');
    expect(result.departments).toContain('Pediatrics');
  });

  it('toggling a red flag in guideStore jumps currentStep to 4 (Result view)', () => {
    useGuideStore.getState().reset();
    expect(useGuideStore.getState().currentStep).toBe(0);

    useGuideStore.getState().toggleRedFlag('breathing');
    expect(useGuideStore.getState().currentStep).toBe(4);
    expect(useGuideStore.getState().getResult().level).toBe('emergency');
  });

  it('renders GuidePage with mandatory indicative disclaimer banner', () => {
    render(
      <MemoryRouter>
        <GuidePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Indicative • General information:/i)).toBeInTheDocument();
    expect(screen.getByText(/Find the right level of care/i)).toBeInTheDocument();
  });
});
